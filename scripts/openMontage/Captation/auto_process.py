#!/usr/bin/env python3
"""Auto-process Sunny Tech intermediaire files -> finals/<sessionId>.mp4
Locked chain: adeclick + arnndn(RNNoise) + loudnorm I=-15. Video stream-copy.
Solo: hot channel duplicated. Duo (alternating mics): per-channel denoise then amix.
"""
import json, os, re, subprocess, sys
from datetime import datetime, timedelta

IN = "/Users/hugogresse/Downloads/st-video/intermediaire"
OUT = "/Users/hugogresse/Downloads/st-video/finals"
MODEL = "/Users/hugogresse/Downloads/Captation/bd.rnnn"
EVENT = "/Users/hugogresse/Downloads/Captation/event.json"

TRACKS = {"REC-COQ": "amphi-120-2", "REC LAVANDE": "amphi-120-1",
          "REC OLIVIER": "amphi-120-3", "REC THYM": "amphi-180"}

def probe_duration(p):
    r = subprocess.run(["ffprobe","-v","error","-show_entries","format=duration",
                        "-of","default=noprint_wrappers=1:nokey=1",p],capture_output=True,text=True)
    try: return float(r.stdout.strip())
    except ValueError: return None

def mean_vol(p, t, ch):
    r = subprocess.run(["ffmpeg","-y","-ss",str(int(t)),"-i",p,"-t","12",
                        "-af",f"pan=mono|c0={ch},volumedetect","-f","null","-"],capture_output=True,text=True)
    for line in r.stderr.splitlines():
        if "mean_volume" in line:
            return float(line.split("mean_volume:")[1].replace("dB","").strip())
    return None

def match_session(fn, sessions):
    m = re.match(r"(REC-COQ|REC LAVANDE|REC OLIVIER|REC THYM) - (\d{2}) juillet 2026 - (\d{2})-(\d{2})-(\d{2})", fn)
    if not m: return None, "no filename pattern"
    track = TRACKS[m.group(1)]
    day, hh, mm = int(m.group(2)), int(m.group(3)), int(m.group(4))
    local_h = hh + 12 if 1 <= hh <= 6 else hh          # 12h clock: 1-6 = afternoon
    utc = datetime(2026, 7, day, local_h, mm) - timedelta(hours=2)  # CEST -> UTC
    best = None
    for s in sessions:
        if s.get("trackId") != track or not s.get("speakerIds"): continue
        st = datetime.fromisoformat(s["dateStart"][:19])
        diff = abs((utc - st).total_seconds())
        if best is None or diff < best[0]: best = (diff, s)
    if best and best[0] <= 1500: return best[1], None
    return None, f"no session within 25min (utc={utc})"

def process(path, sid, mode, ch):
    dst = f"{OUT}/{sid}.mp4"
    if mode == "duo":
        fc = (f"[0:a]channelsplit=channel_layout=stereo[L][R];"
              f"[L]adeclick,arnndn=model={MODEL}[Ld];[R]adeclick,arnndn=model={MODEL}[Rd];"
              f"[Ld][Rd]amix=inputs=2:duration=longest:normalize=0,pan=stereo|c0=c0|c1=c0,"
              f"loudnorm=I=-15:TP=-2:LRA=11[aout]")
    else:
        fc = (f"[0:a]pan=stereo|c0={ch}|c1={ch},adeclick,arnndn=model={MODEL},"
              f"loudnorm=I=-15:TP=-2:LRA=11[aout]")
    r = subprocess.run(["ffmpeg","-y","-i",path,"-filter_complex",fc,"-map","0:v","-map","[aout]",
                        "-c:v","copy","-c:a","aac","-b:a","192k","-movflags","+faststart",
                        "-loglevel","error",dst])
    if r.returncode != 0:
        if os.path.exists(dst): os.remove(dst)
        return "FAIL_ENC"
    d1, d2 = probe_duration(path), probe_duration(dst)
    if d1 and d2 and abs(d1-d2) < 3:
        os.remove(path)
        return "OK"
    return "FAIL_VERIFY"

def main():
    sessions = json.load(open(EVENT))["sessions"]
    done_any = False
    for fn in sorted(os.listdir(IN)):
        if not fn.endswith(".mp4"): continue
        path = os.path.join(IN, fn)
        if any(x.startswith(fn + ".sb-") for x in os.listdir(IN)):
            print(f"COPYING  | {fn}"); continue
        dur = probe_duration(path)
        if not dur:
            print(f"UNREADABLE | {fn}"); continue
        sess, err = match_session(fn, sessions)
        if not sess:
            print(f"UNMATCHED | {fn} | {err}"); continue
        sid = sess["id"]
        # channel probe at 25/50/75%
        probes = []
        for frac in (0.25, 0.5, 0.75):
            L, R = mean_vol(path, dur*frac, "c0"), mean_vol(path, dur*frac, "c1")
            probes.append((L, R))
        if all(l is not None and r is not None and abs(l-r) < 1.5 for l, r in probes):
            mode, ch = "solo", "c0"          # premixed
        else:
            l_hot = [l > -45 and (r is None or l - r > 8) for l, r in probes]
            r_hot = [r > -45 and (l is None or r - l > 8) for l, r in probes]
            if all(l_hot): mode, ch = "solo", "c0"
            elif all(r_hot): mode, ch = "solo", "c1"
            else: mode, ch = "duo", None
        nspk = len(sess.get("speakerIds", []))
        print(f"PROCESS  | {fn} -> {sid} | {mode} {ch or ''} | {nspk}spk | {sess['title'][:50]} | probes={probes}")
        res = process(path, sid, mode, ch)
        print(f"{res}       | {sid}")
        done_any = True
    if not done_any:
        print("NOTHING_TO_DO")

if __name__ == "__main__":
    main()
