// Define the logical size of the canvas
const logicalWidth = 600 // Approximate width based on drawing commands
const logicalHeight = 1000 // Approximate height based on drawing commands

// Get the device pixel ratio, falling back to 1
const dpr = window.devicePixelRatio || 1

// Set the display size of the canvas (CSS pixels)
canvas.style.width = logicalWidth + 'px'
canvas.style.height = logicalHeight + 'px'

// Set the actual size of the drawing buffer
canvas.width = logicalWidth * dpr
canvas.height = logicalHeight * dpr

// Scale the context to ensure drawing commands are in logical pixels
ctx.scale(7, 7)

ctx.strokeStyle = 'rgba(0,0,0,0)'
ctx.fillStyle = 'black'
ctx.beginPath()
ctx.moveTo(23.1644, 97.7363)
ctx.lineTo(23.1644, 81.863)
ctx.lineTo(11.6458, 77.4416)
ctx.lineTo(9.54466, 76.6482)
ctx.lineTo(18.4309, 60.6169)
ctx.bezierCurveTo(15.7242, 59.4918, 12.9041, 57.9225, 10.1197, 56.4498)
ctx.bezierCurveTo(9.04153, 55.8794, 7.97, 55.5946, 6.90562, 55.5946)
ctx.bezierCurveTo(4.57007, 55.5946, 2.26836, 56.9672, 0, 59.712)
ctx.bezierCurveTo(2.33602, 42.346, 9.1392, 32.9905, 20.4091, 31.6445)
ctx.bezierCurveTo(21.3562, 31.5311, 22.3344, 31.4749, 23.3445, 31.4749)
ctx.bezierCurveTo(23.5036, 31.4749, 23.6642, 31.4759, 23.8247, 31.4787)
ctx.bezierCurveTo(40.8158, 31.776, 41.3308, 44.6291, 43.0598, 44.6277)
ctx.bezierCurveTo(43.3643, 44.6272, 43.7059, 44.2294, 44.1819, 43.2951)
ctx.bezierCurveTo(46.3011, 39.1324, 44.1738, 34.3274, 37.7989, 28.8807)
ctx.bezierCurveTo(31.4402, 23.6769, 29.0556, 18.213, 30.6455, 12.489)
ctx.bezierCurveTo(31.9929, 7.63685, 35.1494, 4.37367, 40.1144, 2.69991)
ctx.bezierCurveTo(41.2617, 1.06904, 43.1785, 0.000365358, 45.3496, 0.000365358)
ctx.bezierCurveTo(48.8615, 0.000365358, 51.7083, 2.79616, 51.7083, 6.24468)
ctx.bezierCurveTo(51.7083, 6.89026, 51.6087, 7.51345, 51.4234, 8.099)
ctx.bezierCurveTo(54.1396, 10.91, 55.2945, 13.4142, 54.8876, 15.6111)
ctx.bezierCurveTo(54.4393, 18.0329, 53.9909, 19.2436, 53.5426, 19.2436)
ctx.bezierCurveTo(53.4611, 19.2436, 53.3797, 19.2035, 53.2982, 19.1235)
ctx.bezierCurveTo(52.3177, 15.0308, 50.3161, 12.7205, 47.2935, 12.1922)
ctx.bezierCurveTo(46.6808, 12.3846, 46.0276, 12.489, 45.3496, 12.489)
ctx.bezierCurveTo(42.8359, 12.489, 40.6628, 11.0563, 39.6308, 8.97758)
ctx.bezierCurveTo(32.8543, 14.0336, 37.0947, 21.1546, 40.5809, 24.1972)
ctx.bezierCurveTo(44.1576, 27.3193, 54.4774, 37.2699, 48.335, 49.2035)
ctx.bezierCurveTo(42.3704, 60.7921, 25.4437, 63.0028, 25.4437, 63.0028)
ctx.lineTo(25.4437, 80.2606)
ctx.lineTo(32.0768, 82.842)
ctx.bezierCurveTo(33.5247, 83.5001, 34.2051, 85.1909, 33.6024, 86.6822)
ctx.bezierCurveTo(33.1302, 87.8514, 32.0048, 88.5614, 30.8166, 88.5614)
ctx.bezierCurveTo(30.4897, 88.5614, 30.1577, 88.5074, 29.8332, 88.3946)
ctx.lineTo(31.2225, 84.956)
ctx.lineTo(25.4437, 82.7378)
ctx.lineTo(25.4437, 94.9696)
ctx.bezierCurveTo(25.6748, 94.9123, 25.9158, 94.8823, 26.1646, 94.8823)
ctx.bezierCurveTo(27.7726, 94.8823, 29.0861, 96.1467, 29.1643, 97.7358)
ctx.lineTo(25.4437, 97.7358)
ctx.lineTo(23.1644, 97.7363)
ctx.closePath()
ctx.moveTo(20.5825, 61.4162)
ctx.lineTo(12.814, 75.3461)
ctx.lineTo(23.1644, 79.374)
ctx.lineTo(23.1644, 62.0475)
ctx.bezierCurveTo(22.3249, 61.9161, 21.462, 61.6987, 20.5825, 61.4162)
ctx.closePath()
ctx.fill()
