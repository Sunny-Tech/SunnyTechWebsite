function drawFrog(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scale, scale)

    const green = `hsl(${120 + Math.random() * 20}, ${55 + Math.random() * 15}%, ${35 + Math.random() * 15}%)`
    const darkGreen = `hsl(${125 + Math.random() * 15}, 50%, 25%)`

    // Body (wide ellipse)
    ctx.fillStyle = green
    ctx.beginPath()
    ctx.ellipse(0, 0, 50, 35, 0, 0, Math.PI * 2)
    ctx.fill()

    // Head (overlapping circle)
    ctx.beginPath()
    ctx.ellipse(0, -30, 38, 28, 0, 0, Math.PI * 2)
    ctx.fill()

    // Eyes (two bulging circles on top of head)
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(-18, -52, 14, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(18, -52, 14, 0, Math.PI * 2)
    ctx.fill()

    // Pupils
    ctx.fillStyle = '#1a1a1a'
    ctx.beginPath()
    ctx.arc(-16, -53, 7, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(20, -53, 7, 0, Math.PI * 2)
    ctx.fill()

    // Mouth (wide smile)
    ctx.strokeStyle = darkGreen
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.arc(0, -22, 25, 0.15, Math.PI - 0.15)
    ctx.stroke()

    // Front legs
    ctx.fillStyle = green
    ctx.strokeStyle = darkGreen
    ctx.lineWidth = 2
    // Left front leg
    ctx.beginPath()
    ctx.moveTo(-35, 5)
    ctx.quadraticCurveTo(-60, 20, -55, 35)
    ctx.lineTo(-65, 38)
    ctx.moveTo(-55, 35)
    ctx.lineTo(-55, 42)
    ctx.moveTo(-55, 35)
    ctx.lineTo(-45, 40)
    ctx.stroke()
    // Right front leg
    ctx.beginPath()
    ctx.moveTo(35, 5)
    ctx.quadraticCurveTo(60, 20, 55, 35)
    ctx.lineTo(65, 38)
    ctx.moveTo(55, 35)
    ctx.lineTo(55, 42)
    ctx.moveTo(55, 35)
    ctx.lineTo(45, 40)
    ctx.stroke()

    // Back legs (folded)
    ctx.lineWidth = 3
    // Left back leg
    ctx.beginPath()
    ctx.moveTo(-40, 15)
    ctx.quadraticCurveTo(-70, 10, -65, 35)
    ctx.quadraticCurveTo(-60, 50, -45, 45)
    ctx.stroke()
    // Right back leg
    ctx.beginPath()
    ctx.moveTo(40, 15)
    ctx.quadraticCurveTo(70, 10, 65, 35)
    ctx.quadraticCurveTo(60, 50, 45, 45)
    ctx.stroke()

    ctx.restore()
}

function applyRainyTheme() {
    const now = new Date()

    if (now.getMonth() !== 3 || now.getDate() !== 1) return

    // Override CSS custom properties
    const root = document.documentElement
    root.style.setProperty('--pink-1', '#7bafd4')
    root.style.setProperty('--pink-2', '#4a7fa5')
    root.style.setProperty('--pink-3', '#2d5f82')

    // Replace text nodes
    const replacements: [string | RegExp, string][] = [
        ['Sunny Tech', 'Rainy Tech'],
        ['SunnyTech', 'RainyTech'],
        ['#SeaTechAndSun', '#SeaTechAndRain'],
        ['\u2600\uFE0F', '\uD83C\uDF27\uFE0F'],
        ['flamant rose', 'grenouille'],
    ]

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const textNodes: Text[] = []
    let node: Text | null
    while ((node = walker.nextNode() as Text | null)) {
        textNodes.push(node)
    }
    for (const textNode of textNodes) {
        let text = textNode.nodeValue || ''
        for (const [from, to] of replacements) {
            text = text.replaceAll(from, to)
        }
        if (text !== textNode.nodeValue) {
            textNode.nodeValue = text
        }
    }

    // Swap hero background image
    const bgHome = document.getElementById('backgroundHome')
    if (bgHome) {
        const rainySrc = bgHome.dataset.rainySrc
        if (rainySrc) {
            const picture = bgHome.closest('picture')
            if (picture) {
                picture.querySelectorAll('source').forEach((s) => s.remove())
                const img = picture.querySelector('img')
                if (img) {
                    img.src = rainySrc
                    img.removeAttribute('srcset')
                    img.removeAttribute('sizes')
                }
            } else if (bgHome instanceof HTMLImageElement) {
                bgHome.src = rainySrc
            }
        }
    }

    // Swap hero logo to rainy PNG
    const heroLogo = document.querySelector<HTMLImageElement>('.content img[src*="/logos-sunnytech/logo"]')
    if (heroLogo) {
        heroLogo.src = '/logos-sunnytech/logo_medium_rain.png'
    }

    // Swap menu logo (CSS mask) to rainy PNG
    const menuLogo = document.querySelector<HTMLElement>('.toolbar-logo')
    if (menuLogo) {
        menuLogo.style.mask = "url('/logos-sunnytech/logo_medium_rain.png') no-repeat"
        menuLogo.style.maskSize = 'contain'
        menuLogo.style.backgroundColor = 'transparent'
        menuLogo.style.backgroundImage = "url('/logos-sunnytech/logo_medium_rain.png')"
        menuLogo.style.backgroundSize = 'contain'
        menuLogo.style.backgroundRepeat = 'no-repeat'
    }

    // Update document title
    document.title = document.title.replaceAll('Sunny Tech', 'Rainy Tech').replaceAll('SunnyTech', 'RainyTech')

    // Replace flamingo canvas with frogs on 404 page
    const artCanvas = document.getElementById('artCanvas') as HTMLCanvasElement | null
    if (artCanvas) {
        const ctx = artCanvas.getContext('2d')
        if (ctx) {
            ctx.clearRect(0, 0, artCanvas.width, artCanvas.height)
            const dpr = window.devicePixelRatio || 1
            const numFrogs = 5
            for (let i = 0; i < numFrogs; i++) {
                const x = (80 + Math.random() * 440) * dpr
                const y = (80 + Math.random() * 240) * dpr
                const scale = (0.6 + Math.random() * 0.6) * dpr
                drawFrog(ctx, x, y, scale)
            }
        }
    }

    // Skip rain overlay if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Add rain overlay (only once per style + overlay)
    if (!document.getElementById('rainy-tech-style')) {
        const style = document.createElement('style')
        style.id = 'rainy-tech-style'
        style.textContent = `
            @keyframes rainy-fall {
                0% { transform: translateY(-100vh) rotate(12deg); opacity: 1; }
                70% { opacity: 0.8; }
                100% { transform: translateY(100vh) rotate(12deg); opacity: 0; }
            }
            #rainy-tech-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 9999;
                overflow: hidden;
            }
            .rainy-drop {
                position: absolute;
                top: -30px;
                width: 3px;
                background: linear-gradient(transparent, rgba(100, 160, 210, 0.8));
                border-radius: 0 0 2px 2px;
                animation: rainy-fall linear infinite;
            }
        `
        document.head.appendChild(style)
    }

    if (!document.getElementById('rainy-tech-overlay')) {
        const overlay = document.createElement('div')
        overlay.id = 'rainy-tech-overlay'

        for (let i = 0; i < 120; i++) {
            const drop = document.createElement('div')
            drop.className = 'rainy-drop'
            drop.style.left = `${Math.random() * 100}%`
            drop.style.animationDuration = `${0.5 + Math.random() * 0.6}s`
            drop.style.animationDelay = `${Math.random() * 2}s`
            drop.style.height = `${15 + Math.random() * 20}px`
            drop.style.opacity = `${0.5 + Math.random() * 0.5}`
            overlay.appendChild(drop)
        }

        document.body.appendChild(overlay)
    }
}

// Run on initial load and on Astro View Transitions navigation
applyRainyTheme()
document.addEventListener('astro:page-load', applyRainyTheme)
