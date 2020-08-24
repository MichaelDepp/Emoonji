const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./js/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./js/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./js/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    document.body.append(canvas)
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        console.log(detections)
        if (detections) {

            var expression = (detections.expressions)
            const values = Object.values(expression)
            exp_inx = values.indexOf(Math.max.apply(Math, values))
            const exp = Object.getOwnPropertyNames(expression)[exp_inx]
            console.log(exp)
            imgname = "./assets/" + exp + ".png";

            const resized = faceapi.resizeResults(detections, displaySize)

            if (resized.alignedRect.box) {

                let x = resized.alignedRect.box.x
                let y = resized.alignedRect.box.y
                let width = resized.alignedRect.box.width
                var img = new Image();

                img.src = imgname;
                var ctx = canvas.getContext('2d')
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, x, y, width, width);
                // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                // faceapi.draw.drawDetections(canvas, resizedDetections)
            }
        } else{
            console.log("no logs")
        }
    }, 500)
})