export const flamySimple = (
    ctx,
    {
        headRadius = 12,
        neckLength = 100,
        bodyRadiusX = 45,
        bodyRadiusY = 30,
        legLength = 120,
        offsetX = 0,
        offsetY = 0,
        color = '#D63F49',
        facing = 1, // 1 = right, -1 = left
        oneLeg = false,
    }
) => {
    ctx.save()
    ctx.translate(offsetX, offsetY)
    ctx.scale(facing, 1)

    const bodyX = 0
    const bodyY = 0

    // --- Body (oval) ---
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.ellipse(bodyX, bodyY, bodyRadiusX, bodyRadiusY, -0.15, 0, Math.PI * 2)
    ctx.fill()

    // --- Small tail feathers ---
    ctx.beginPath()
    const tailX = bodyX - bodyRadiusX + 5
    const tailY = bodyY - 5
    ctx.moveTo(tailX + 10, tailY + 5)
    ctx.quadraticCurveTo(tailX - 15, tailY - 15, tailX - 8, tailY + 8)
    ctx.quadraticCurveTo(tailX - 20, tailY - 5, tailX + 10, tailY + 5)
    ctx.fill()

    // --- Neck (S-curve using cubic bezier) ---
    const neckBaseX = bodyX + bodyRadiusX * 0.6
    const neckBaseY = bodyY - bodyRadiusY * 0.7
    const neckTopX = neckBaseX + neckLength * 0.15
    const neckTopY = neckBaseY - neckLength

    // Control points for S-curve
    const cp1x = neckBaseX + neckLength * 0.5
    const cp1y = neckBaseY - neckLength * 0.15
    const cp2x = neckTopX - neckLength * 0.35
    const cp2y = neckTopY + neckLength * 0.2

    // Draw neck as a thick path (two offset beziers filled)
    const neckWidth = headRadius * 0.7
    ctx.beginPath()
    ctx.moveTo(neckBaseX - neckWidth, neckBaseY)
    ctx.bezierCurveTo(cp1x - neckWidth, cp1y, cp2x - neckWidth * 0.6, cp2y, neckTopX - neckWidth * 0.4, neckTopY)
    ctx.lineTo(neckTopX + neckWidth * 0.4, neckTopY)
    ctx.bezierCurveTo(cp2x + neckWidth * 0.6, cp2y, cp1x + neckWidth, cp1y, neckBaseX + neckWidth, neckBaseY)
    ctx.closePath()
    ctx.fill()

    // --- Head (circle at top of neck) ---
    const headX = neckTopX + headRadius * 0.3
    const headY = neckTopY
    ctx.beginPath()
    ctx.arc(headX, headY, headRadius, 0, Math.PI * 2)
    ctx.fill()

    // --- Beak (curved downward hook - characteristic flamingo beak) ---
    const beakLength = headRadius * 1.8
    const beakStartX = headX + headRadius * 0.8
    const beakStartY = headY - headRadius * 0.1

    // Dark tip of beak
    ctx.fillStyle = '#1a1a1a'
    ctx.beginPath()
    ctx.moveTo(beakStartX, beakStartY - headRadius * 0.35)
    ctx.quadraticCurveTo(
        beakStartX + beakLength * 0.8,
        beakStartY - headRadius * 0.1,
        beakStartX + beakLength * 0.5,
        beakStartY + headRadius * 0.6
    )
    ctx.quadraticCurveTo(
        beakStartX + beakLength * 0.2,
        beakStartY + headRadius * 0.5,
        beakStartX,
        beakStartY + headRadius * 0.35
    )
    ctx.closePath()
    ctx.fill()

    // --- Eye ---
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.arc(headX + headRadius * 0.35, headY - headRadius * 0.15, headRadius * 0.22, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#1a1a1a'
    ctx.beginPath()
    ctx.arc(headX + headRadius * 0.38, headY - headRadius * 0.15, headRadius * 0.12, 0, Math.PI * 2)
    ctx.fill()

    // --- Legs ---
    ctx.strokeStyle = color
    ctx.lineWidth = 3.5
    ctx.lineCap = 'round'

    const drawLeg = (startX, startY, kneeOffsetX, spread) => {
        const kneeX = startX + kneeOffsetX
        const kneeY = startY + legLength * 0.55
        const footX = kneeX - kneeOffsetX * 0.3 + spread
        const footY = kneeY + legLength * 0.45

        // Upper leg
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(kneeX, kneeY)
        ctx.stroke()

        // Lower leg (slightly forward)
        ctx.beginPath()
        ctx.moveTo(kneeX, kneeY)
        ctx.lineTo(footX, footY)
        ctx.stroke()

        // Foot (small horizontal line)
        ctx.beginPath()
        ctx.moveTo(footX - 4, footY)
        ctx.lineTo(footX + 8, footY)
        ctx.stroke()
    }

    const legStartY = bodyY + bodyRadiusY * 0.6

    // Left leg (back)
    drawLeg(bodyX + bodyRadiusX * 0.05, legStartY, -3, -2)

    if (!oneLeg) {
        // Right leg (front)
        drawLeg(bodyX + bodyRadiusX * 0.25, legStartY, 2, 3)
    }

    // --- Wing detail (subtle line on body) ---
    ctx.strokeStyle = shadeColor(color, -20)
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(bodyX + bodyRadiusX * 0.3, bodyY - bodyRadiusY * 0.5)
    ctx.quadraticCurveTo(
        bodyX - bodyRadiusX * 0.2,
        bodyY + bodyRadiusY * 0.3,
        bodyX - bodyRadiusX * 0.8,
        bodyY - bodyRadiusY * 0.1
    )
    ctx.stroke()

    ctx.restore()
}

function shadeColor(hex, amount) {
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)
    r = Math.max(0, Math.min(255, r + amount))
    g = Math.max(0, Math.min(255, g + amount))
    b = Math.max(0, Math.min(255, b + amount))
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
