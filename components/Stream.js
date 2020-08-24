import * as faceapi from 'face-api.js';
import { useEffect, useState } from "react"
import { Center, Container, Heading, Box } from "@chakra-ui/core"

const Stream = (prop) => {
    useEffect(() => {
        Webcam()
    }, [])
    const [foundexp, setfoundexp] = useState('');
    async function Webcam() {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
            faceapi.nets.faceExpressionNet.loadFromUri('./models'),
        ]).then(startVideo)
        const video = document.getElementById('video')
        function startVideo() {
            navigator.getUserMedia(
                { video: {} },
                stream => video.srcObject = stream,
                err => console.error(err)
            )
        }
        video.addEventListener('play', () => {
            // const canvas = faceapi.createCanvasFromMedia(video)
            // document.body.append(canvas)
            const canvas = document.getElementById('canvas')
            const displaySize = { width: video.width, height: video.height }
            faceapi.matchDimensions(canvas, displaySize)
            setInterval(async () => {
                const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                if (detections) {

                    var expression = (detections.expressions)
                    const values = Object.values(expression)
                    var exp_inx = values.indexOf(Math.max.apply(Math, values))
                    const exp = Object.getOwnPropertyNames(expression)[exp_inx]
                    setfoundexp(exp)
                    console.log(exp)
                    var imgname = "./assets/" + exp + ".png";

                    const resized = faceapi.resizeResults(detections, displaySize)

                    if (resized.alignedRect.box) {
                        let x = resized.alignedRect.box.x
                        let y = resized.alignedRect.box.y
                        let width = resized.alignedRect.box.width

                        var img = new Image();

                        img.src = imgname;
                        console.log(img)
                        var ctx = canvas.getContext('2d')
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(img, x, y, width, width);
                        console.log("drawn")
                        // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                        // faceapi.draw.drawDetections(canvas, resizedDetections)
                    }
                } else {
                    console.log("no logs")
                }
            }, 500)
        })

    }
    return (
        <Box>
            <Box>
                <canvas id="canvas" />
                <video id="video" width="310px" height="400px" autoPlay muted />
            </Box>
            <Container
                pt="1em"
                >
                <Center
                >
                    <Heading color={prop.color}>{foundexp.charAt(0).toUpperCase() + foundexp.slice(1)}</Heading>
                </Center>
            </Container>
            <style jsx>
                {
                    `canvas {
                    position: fixed;
                    }`
                }
            </style>
        </Box>
    )
}

export default Stream