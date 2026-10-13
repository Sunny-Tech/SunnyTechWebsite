# Sunny Tech 2026 — Talk Recording Post-Production Process

Pipeline used to turn raw room recordings into publish-ready videos with cleaned, normalized audio, named by their conference session ID.

## Overview

```
Raw recording (REC <TRACK> - DD juillet 2026 - HH-MM-SS .mp4)
        │  (manual, video editor)
        ▼
intermediaire/   ← trimmed talk + sponsor intro/ending bumpers baked in
        │  (automated, this process)
        ▼
finals/<sessionId>.mp4   ← audio cleaned + normalized, video untouched
```

- **Manual step (editing)**: trim the mic-test cold open and the post-applause tail, prepend the sponsor intro and append the sponsor ending, export to `/Users/hugogresse/Downloads/st-video/intermediaire/` keeping the original-style filename.
- **Automated step (audio)**: everything below.

## Assets (all in `~/Downloads/Captation/`)

| File                                              | Role                                                                                |
| ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `auto_process.py`                                 | One-command processor for everything in `intermediaire/`                            |
| `bd.rnnn`                                         | RNNoise model (GregorR/rnnoise-models, "beguiling-drafter") used by ffmpeg `arnndn` |
| `event.json`                                      | OpenPlanner export of the event (sessions, speakers, tracks)                        |
| `ST 2026 sponsors Youtube.mp4` / `... ending.mp4` | Sponsor bumpers (baked in at the manual editing step)                               |

## Quick usage

```bash
# Drop exports into intermediaire/, then:
python3 ~/Downloads/Captation/auto_process.py
```

The script, per file: skips in-flight copies (`.sb-*`), matches the session, detects the mic configuration, runs the locked audio chain, verifies duration (±3s), writes `finals/<sessionId>.mp4`, and deletes the intermediaire source on success. Idempotent — re-run anytime.

## The locked audio chain

Decided after extensive A/B testing (see "Lessons learned"). Order matters:

1. **`adeclick`** — removes intermittent broadband click bursts (wireless-mic dropouts/RF), which a denoiser can't fix.
2. **`arnndn`** (RNNoise ML denoiser) — removes the varying room/mic noise floor. Beat every spectral option tried (`afftdn`, `anlmdn`, `dynaudnorm`, gates).
3. **`loudnorm=I=-15:TP=-2:LRA=11`** — EBU R128 loudness to −15 LUFS.

Video is always **stream-copied** (`-c:v copy`) — never re-encoded.

### Solo speaker (one hot mic channel)

The room feed is 2-channel with mics hard-panned; usually only one channel carries speech.

```bash
# Find the hot channel (repeat at 2-3 timestamps; hot ≈ -15..-40 dB, idle ≈ -45..-91 dB)
ffmpeg -ss <T> -i "in.mp4" -t 12 -af "pan=mono|c0=c0,volumedetect" -f null -   # left
ffmpeg -ss <T> -i "in.mp4" -t 12 -af "pan=mono|c0=c1,volumedetect" -f null -   # right

# Process (cN = hot channel: c0 or c1)
ffmpeg -y -i "in.mp4" -filter_complex \
  "[0:a]pan=stereo|c0=cN|c1=cN,adeclick,arnndn=model=/Users/hugogresse/Downloads/Captation/bd.rnnn,loudnorm=I=-15:TP=-2:LRA=11[aout]" \
  -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -movflags +faststart "finals/<sessionId>.mp4"
```

If both channels are identical (L==R at every probe point), the feed is pre-mixed mono — use `c0`.

### Two speakers on alternating mics (both channels hot at different times)

Denoise **each channel separately first**, then mix. RNNoise turns the idle mic's hiss into silence before the sum, so the mix stays clean:

```bash
ffmpeg -y -i "in.mp4" -filter_complex \
  "[0:a]channelsplit=channel_layout=stereo[L][R];\
[L]adeclick,arnndn=model=/Users/hugogresse/Downloads/Captation/bd.rnnn[Ld];\
[R]adeclick,arnndn=model=/Users/hugogresse/Downloads/Captation/bd.rnnn[Rd];\
[Ld][Rd]amix=inputs=2:duration=longest:normalize=0,pan=stereo|c0=c0|c1=c0,loudnorm=I=-15:TP=-2:LRA=11[aout]" \
  -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k -movflags +faststart "finals/<sessionId>.mp4"
```

### Verify + clean up

```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "finals/<sessionId>.mp4"
# duration must match the intermediaire source within ~3s; then:
rm "intermediaire/<source>.mp4"
```

## Session ID naming

Output filename = the session's `id` in `event.json` (`sessions[]`), matched by:

1. **Track** from filename prefix: `REC-COQ` → `amphi-120-2` (Coquelicot), `REC LAVANDE` → `amphi-120-1`, `REC OLIVIER` → `amphi-120-3`, `REC THYM` → `amphi-180`.
2. **Time** from filename `HH-MM-SS`: recorder uses a 12-hour clock in local time (CEST = UTC+2). Hours 1–6 are afternoon (+12h). So UTC = (HH [+12 if HH≤6]) − 2. Match to the nearest session `dateStart` on that track (within ~25 min).
3. Odd names (e.g. `lavande - zig.mp4`) → keyword-match against session titles.

Event JSON source:
`https://storage.googleapis.com/conferencecenterr.appspot.com/events/YFlN9koUK0qPuYkvbqQg/1f8cd1c0-b0ed-4f24-811d-d8b64718ea29.json`

## Lessons learned (why the pipeline looks like this)

- **The noise had two distinct components**: transient click bursts (fixed by `adeclick`) and a varying room-noise floor (fixed by RNNoise). Spectral denoisers tuned on one section of a talk failed on other sections; RNNoise adapted everywhere.
- **Never merge raw mic channels.** Summing L+R adds the idle mic's constant hiss, which loudness normalization then amplifies. Pick the hot channel (solo) or denoise-per-channel-then-mix (duo).
- **Never reprocess audio after the approved pass.** Re-normalizing already-normalized audio, or letting a filtergraph silently resample (ffmpeg's `concat` _filter_ did this — forced loudnorm's 192 kHz internal output down to 48 kHz), audibly degrades the result. If parts must be joined, encode them with identical parameters and join with the concat **demuxer** + `-c copy`.
- **Continuous vs segmented processing is identical** — a full 52-minute single-pass run was byte-comparable to 18 fresh 3-minute segments. No long-run filter drift; earlier "long output sounds worse" symptoms were always pipeline differences, never duration.
- **Validate A/B tests on the user's ears at multiple points in the recording** — the noise floor varies over a talk, and spectrogram eyeballing misled more than once. When two outputs "should" be the same, diff their MD5s.
- Shell gotcha: `$VAR` expansion inside a multi-line `-filter_complex` string silently produced an empty `arnndn` model path once — use literal paths in filtergraphs.

## Loudness target

−15 LUFS integrated, −2 dBTP true peak (user preference; ffmpeg-normalize's default −23 LUFS was judged too quiet for YouTube).
