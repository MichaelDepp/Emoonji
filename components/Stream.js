import * as faceapi from '@vladmandic/face-api';
import { useEffect, useState } from 'react';
import { Flex, Center, Stack, Container, Heading, Box, Wrap, AspectRatio, Spinner } from '@chakra-ui/react';
import FadeLoader from 'react-spinners/FadeLoader';

const Stream = (prop) => {
	const [foundexp, setfoundexp] = useState('');
	const [videoStarted, setVideoStarted] = useState(false);

	useEffect(() => {
		Webcam();
	}, []);
	async function Webcam() {
		Promise.all([
			faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
			faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
			faceapi.nets.faceExpressionNet.loadFromUri('./models'),
		]).then(startVideo);
		const video = document.getElementById('video');
		function startVideo() {
			navigator.getUserMedia =
				navigator.getUserMedia ||
				navigator.webkitGetUserMedia ||
				navigator.mozGetUserMedia ||
				navigator.msGetUserMedia ||
				navigator.oGetUserMedia ||
				navigator.mediaDevices.getUserMedia;
			if (navigator.getUserMedia) {
				navigator.getUserMedia(
					{ video: {} },
					(stream) => (video.srcObject = stream),
					(err) => console.error(err),
				);
			}
		}

		video.addEventListener('play', () => {
			// const canvas = faceapi.createCanvasFromMedia(video)
			// document.body.append(canvas)
			setVideoStarted(true);
			let canvas = document.getElementById('canvas');
			let displaySize = {
				width: video.videoWidth,
				height: video.videoHeight,
			};
			if (canvas) {
				faceapi.matchDimensions(canvas, displaySize);
			}
			setInterval(async () => {
				const detections = await faceapi
					.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
					.withFaceLandmarks()
					.withFaceExpressions();

				var ctx = canvas.getContext('2d');
				// ctx.globalAlpha = 1
				ctx.clearRect(0, 0, video.videoWidth, video.videoHeight);
				ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
				if (detections) {
					var expression = detections.expressions;
					const values = Object.values(expression);
					var exp_inx = values.indexOf(Math.max.apply(Math, values));
					const exp = Object.getOwnPropertyNames(expression)[exp_inx];
					setfoundexp(exp);

					var imgname = './assets/' + exp + '.png';

					const resized = faceapi.resizeResults(detections, displaySize);

					if (resized.alignedRect.box) {
						let x = resized.alignedRect.box.x;
						let y = resized.alignedRect.box.y;
						let width = resized.alignedRect.box.width;

						var img = new Image();

						img.src = imgname;
						// ctx.globalAlpha = 0.8
						ctx.drawImage(img, x, y, width, width);
						// canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
						// faceapi.draw.drawDetections(canvas, resizedDetections)
					}
				} else {
					console.log('no logs');
				}
			}, 1000 / 10);
		});
	}
	return (
		<Box>
			<Center>
				<Box bg="red" width={['100%', '70%']} height={['100%', '50%']}>
					<Box>
						<canvas id="canvas" />
						{/* {videoStarted ? (
							<canvas id="canvas" />
						) : (
							<Box bg="green" w={'40px'} h={'40px'} my={20}>
								<FadeLoader color={'#2196F3'} loading={!videoStarted} size={150} />
							</Box>
						)} */}
					</Box>
					<video style={{ background: 'red' }} id="video" width="100%" height="auto" autoplay muted playsinline />
				</Box>
			</Center>
			<Container pt="1em">
				<Center>
					<Heading color={prop.color}>{foundexp.charAt(0).toUpperCase() + foundexp.slice(1)}</Heading>
				</Center>
			</Container>

			<style jsx>
				{`
					#canvas {
						width: 100%;
						transform: rotateY(180deg);
						-webkit-transform: rotateY(180deg);
						-moz-transform: rotateY(180deg);
					}

					#video {
						position: fixed;
						opacity: 0;
					}
				`}
			</style>
		</Box>
	);
};

export default Stream;
