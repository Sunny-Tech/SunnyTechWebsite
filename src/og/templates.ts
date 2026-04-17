/**
 * Satori JSX templates expressed as plain objects.
 * Colors align with site tokens (src/layouts/Layout.astro):
 *   pink-2 #d63f49, pink-3 #901f26, pink-1 #e89399, white.
 */

const BG_GRADIENT = 'linear-gradient(135deg, #f4724e 0%, #d63f49 55%, #901f26 100%)'
const WHITE = '#ffffff'
const TEXT_SHADOW = '0 2px 8px rgba(0,0,0,0.25)'

type Node = any

function el(type: string, props: Record<string, any> = {}, children: any = null): Node {
    return {
        type,
        props: {
            ...props,
            ...(children !== null ? { children } : {}),
        },
    }
}

/**
 * Deterministic flamingo tile pattern. Absolute-positioned <img> nodes
 * across the 1200×630 canvas, below main content, low opacity.
 */
function flamingoPattern(flamingoUri: string): Node {
    const W = 1200
    const H = 630
    const SIZE = 95
    const GAP = 55
    const STEP = SIZE + GAP
    const cols = Math.ceil(W / STEP) + 2
    const rows = Math.ceil(H / STEP) + 1
    const OPACITY = 0.05
    const gridW = cols * STEP
    const gridH = rows * STEP
    const baseOffsetX = (W - gridW) / 2
    const offsetY = (H - gridH) / 2
    const tiles: Node[] = []
    for (let row = 0; row < rows; row++) {
        const rowOffsetX = row % 2 === 0 ? 0 : STEP / 2
        for (let col = 0; col < cols; col++) {
            const x = baseOffsetX + col * STEP + rowOffsetX
            const y = offsetY + row * STEP
            tiles.push(
                el('img', {
                    src: flamingoUri,
                    width: SIZE,
                    height: SIZE,
                    style: {
                        position: 'absolute',
                        left: `${x}px`,
                        top: `${y}px`,
                        opacity: OPACITY,
                    },
                })
            )
        }
    }
    return el(
        'div',
        {
            style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${W}px`,
                height: `${H}px`,
                display: 'flex',
            },
        },
        tiles
    )
}

function frame(children: Node[], flamingoUri?: string): Node {
    const content: Node[] = []
    if (flamingoUri) content.push(flamingoPattern(flamingoUri))
    content.push(
        el(
            'div',
            {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    padding: '60px 72px',
                    position: 'relative',
                },
            },
            children
        )
    )
    return el(
        'div',
        {
            style: {
                width: '1200px',
                height: '630px',
                display: 'flex',
                backgroundImage: BG_GRADIENT,
                color: WHITE,
                fontFamily: 'Roboto',
                position: 'relative',
            },
        },
        content
    )
}

function brandFooter(monoLogoUri: string): Node {
    return el(
        'div',
        {
            style: {
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
                marginTop: 'auto',
                width: '100%',
            },
        },
        [
            el('img', {
                src: monoLogoUri,
                width: 142,
                height: 120,
            }),
            el(
                'div',
                {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                    },
                },
                [
                    el(
                        'div',
                        {
                            style: {
                                fontSize: '28px',
                                fontWeight: 700,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                opacity: 0.95,
                            },
                        },
                        '2 & 3 juillet 2026'
                    ),
                    el(
                        'div',
                        {
                            style: {
                                fontSize: '22px',
                                opacity: 0.85,
                                marginTop: '4px',
                            },
                        },
                        'Montpellier · sunny-tech.io'
                    ),
                ]
            ),
        ]
    )
}

export function defaultTemplate(logoUri: string, flamingoUri?: string): Node {
    return frame(
        [
            el(
                'div',
                {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        justifyContent: 'center',
                    },
                },
                [
                    el(
                        'div',
                        {
                            style: {
                                fontSize: '28px',
                                fontWeight: 700,
                                letterSpacing: '6px',
                                textTransform: 'uppercase',
                                opacity: 0.9,
                            },
                        },
                        'La conférence Tech de Montpellier'
                    ),
                    el(
                        'div',
                        {
                            style: {
                                fontSize: '120px',
                                fontWeight: 700,
                                lineHeight: 1,
                                marginTop: '20px',
                                textShadow: TEXT_SHADOW,
                            },
                        },
                        'Sunny Tech 2026'
                    ),
                    el(
                        'div',
                        {
                            style: {
                                fontSize: '34px',
                                marginTop: '24px',
                                opacity: 0.95,
                                maxWidth: '900px',
                            },
                        },
                        'Une conférence annuelle des technologies du numérique, créée par des passionnés, pour des passionnés.'
                    ),
                ]
            ),
            brandFooter(logoUri),
        ],
        flamingoUri
    )
}

export function pageTemplate(
    logoUri: string,
    opts: { eyebrow?: string; title: string; description?: string },
    flamingoUri?: string
): Node {
    return frame(
        [
            el(
                'div',
                {
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        justifyContent: 'center',
                    },
                },
                [
                    opts.eyebrow
                        ? el(
                              'div',
                              {
                                  style: {
                                      fontSize: '26px',
                                      fontWeight: 700,
                                      letterSpacing: '5px',
                                      textTransform: 'uppercase',
                                      opacity: 0.9,
                                  },
                              },
                              opts.eyebrow
                          )
                        : null,
                    el(
                        'div',
                        {
                            style: {
                                fontSize: '96px',
                                fontWeight: 700,
                                lineHeight: 1.05,
                                marginTop: '16px',
                                textShadow: TEXT_SHADOW,
                                maxWidth: '1050px',
                            },
                        },
                        opts.title
                    ),
                    opts.description
                        ? el(
                              'div',
                              {
                                  style: {
                                      fontSize: '30px',
                                      marginTop: '28px',
                                      opacity: 0.95,
                                      maxWidth: '1000px',
                                      lineHeight: 1.3,
                                  },
                              },
                              opts.description
                          )
                        : null,
                ].filter(Boolean)
            ),
            brandFooter(logoUri),
        ],
        flamingoUri
    )
}

export function speakerTemplate(
    logoUri: string,
    opts: { name: string; jobTitle?: string; company?: string; photoUrl?: string },
    flamingoUri?: string
): Node {
    const photo = opts.photoUrl
        ? el('img', {
              src: opts.photoUrl,
              width: 340,
              height: 340,
              style: {
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '8px solid rgba(255,255,255,0.85)',
              },
          })
        : el(
              'div',
              {
                  style: {
                      width: '340px',
                      height: '340px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '140px',
                      fontWeight: 700,
                  },
              },
              opts.name.charAt(0).toUpperCase()
          )

    const textBlock = el(
        'div',
        {
            style: {
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                justifyContent: 'center',
            },
        },
        [
            el(
                'div',
                {
                    style: {
                        fontSize: '26px',
                        fontWeight: 700,
                        letterSpacing: '5px',
                        textTransform: 'uppercase',
                        opacity: 0.9,
                    },
                },
                'Speaker'
            ),
            el(
                'div',
                {
                    style: {
                        fontSize: '78px',
                        fontWeight: 700,
                        lineHeight: 1.05,
                        marginTop: '16px',
                        textShadow: TEXT_SHADOW,
                    },
                },
                opts.name
            ),
            opts.jobTitle
                ? el(
                      'div',
                      {
                          style: {
                              fontSize: '32px',
                              marginTop: '18px',
                              opacity: 0.95,
                          },
                      },
                      opts.jobTitle
                  )
                : null,
            opts.company
                ? el(
                      'div',
                      {
                          style: {
                              fontSize: '28px',
                              marginTop: '6px',
                              opacity: 0.85,
                          },
                      },
                      opts.company
                  )
                : null,
        ].filter(Boolean)
    )

    return frame(
        [
            el(
                'div',
                {
                    style: {
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '56px',
                        flexGrow: 1,
                    },
                },
                [photo, textBlock]
            ),
            brandFooter(logoUri),
        ],
        flamingoUri
    )
}
