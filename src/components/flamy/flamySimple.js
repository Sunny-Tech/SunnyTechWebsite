export const flamySimple = (
    ctx,
    {
        headRadius = 20,
        beakSizeFactor = 0.5, // Beak size as a factor of headRadius
        neckLength = 100,
        neckAngle = Math.PI / 4,
        bodyRadius = 50,
        legLength = 120,
        leftLegAngle = Math.PI / 6,
        rightLegAngle = Math.PI / 8,
        offsetX = 0,
        offsetY = 0,
        color = '#D63F49',
    }
) => {
    // Calculate actual beakSize based on headRadius and beakSizeFactor
    const beakSize = headRadius * beakSizeFactor
    ctx.strokeStyle = color
    ctx.fillStyle = color // Add orange-red color for the beak

    // Head (circle)
    const headCenterX = 0 + offsetX + (Math.random() * 40 - 20) // Add ±10px random offset
    const headCenterY = 80 + offsetY + (Math.random() * 20 - 10)
    ctx.beginPath()
    ctx.arc(headCenterX, headCenterY + 5, headRadius, 0, Math.PI * 2)
    ctx.fill()

    // Neck (lines)
    // Start of neck, from bottom of head or overridden
    const neckStartX = headCenterX
    const neckStartY = headCenterY + headRadius

    ctx.beginPath()
    ctx.moveTo(neckStartX, neckStartY) // Adjusted to start from bottom of the head

    // Calculate end of first segment of neck
    const neckMidX = neckStartX - (neckLength / 2) * Math.cos(neckAngle)
    const neckMidY = neckStartY + (neckLength / 2) * Math.sin(neckAngle) - 7
    ctx.lineTo(neckMidX, neckMidY)

    // Calculate end of second segment of neck (body connection point)
    // Let's make the second segment angle slightly different for a more natural curve
    const neckEndX = neckMidX * Math.cos(neckAngle - Math.PI / 6)
    const neckEndY = neckMidY + (neckLength / 1) * Math.sin(neckAngle - Math.PI / 6)
    ctx.lineWidth = 8
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(neckMidX + 1, neckMidY - 1)
    ctx.lineTo(neckEndX, neckEndY)

    ctx.lineWidth = 8
    ctx.stroke()

    // Body (circle) - position relative to the end of the neck
    const bodyCenterX = neckEndX - bodyRadius * Math.cos(neckAngle - Math.PI / 6 - Math.PI / 2) + 10 // Offset perpendicular to last neck segment
    const bodyCenterY = neckEndY - bodyRadius * Math.sin(neckAngle - Math.PI / 6 - Math.PI / 2)

    ctx.beginPath()
    ctx.arc(bodyCenterX, bodyCenterY, bodyRadius, 0, Math.PI * 2)
    ctx.fill()

    // Legs (lines)
    ctx.lineWidth = 6
    // Left leg
    const leftLegStartX = bodyCenterX - (bodyRadius / 2.5) * Math.cos(leftLegAngle + Math.PI / 2)
    const leftLegStartY = bodyCenterY + (bodyRadius / 2.5) * Math.sin(leftLegAngle + Math.PI / 2)
    const leftLegMidX = leftLegStartX + (legLength / 2) * Math.sin(leftLegAngle)
    const leftLegMidY = leftLegStartY + (legLength / 2) * Math.cos(leftLegAngle)
    const leftLegEndX = leftLegMidX - (legLength / 3) * Math.sin(leftLegAngle - Math.PI / 4) // Bend the leg a bit
    const leftLegEndY = leftLegMidY + (legLength / 3) * Math.cos(leftLegAngle - Math.PI / 4)

    ctx.beginPath()
    ctx.moveTo(leftLegStartX, leftLegStartY)
    ctx.lineTo(leftLegMidX, leftLegMidY)
    ctx.lineTo(leftLegEndX, leftLegEndY)
    ctx.stroke()

    // Right leg
    const rightLegStartX = bodyCenterX + (bodyRadius / 2.5) * Math.cos(rightLegAngle + Math.PI / 2)
    const rightLegStartY = bodyCenterY + (bodyRadius / 2.5) * Math.sin(rightLegAngle + Math.PI / 2)
    const rightLegEndX = rightLegStartX + legLength * Math.sin(rightLegAngle)
    const rightLegEndY = rightLegStartY + legLength * Math.cos(rightLegAngle)

    ctx.beginPath()
    ctx.moveTo(rightLegStartX, rightLegStartY)
    ctx.lineTo(rightLegEndX, rightLegEndY)
    ctx.stroke()

    // Triangle (beak) - position relative to head center and size by beakSize
    const beakTipX = headCenterX + headRadius + beakSize
    const beakTipY = headCenterY + 5
    const beakBaseUpperX = headCenterX + headRadius - 5
    const beakBaseUpperY = headCenterY - beakSize / 2
    const beakBaseLowerX = headCenterX + headRadius
    const beakBaseLowerY = headCenterY + beakSize / 2 + 5

    ctx.beginPath()
    ctx.moveTo(beakBaseUpperX, beakBaseUpperY) // Top base of beak
    ctx.lineTo(beakTipX, beakTipY) // Tip of beak
    ctx.lineTo(beakBaseLowerX, beakBaseLowerY) // Bottom base of beak
    ctx.fill()
}
