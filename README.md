# Emoonji 🤖
Emoonji is an AI based Single Page Application, which tracks your facial expressions in real time and draw a suitable emoji.

Emoonji Link : https://bit.ly/Emoonji

The web application is fully developed in Next Js (React Js's framework). The application uses Tensorflow models for the facial expression recognition. 
I used 3 models in this simple project,
1. TinyFaceDetector = which is a fast face detection option model compare to the ssdMobileNetv (from my opinion)
2. FaceLandmark68Net = a model which very lightweight and fast, yet accurate 68 point face landmark detector
3. FaceExpressionNet =  which is lightweight, fast model and provides reasonable accuracy. It has been trained on a variety of images from publicly available datasets.

The application triggers the camera of the browser to send the video input. The video input will be drawn on a canvas, and the frames will be analysed and process the current expression of the user in real time. Then a suitable emoji will be drawn on top of the user's face.
The application name Emoonji is derived from 2 words, which is Emoji (english) + Moonji (tamil word for face). 

<p align="center">
  <img width="800" src="screenshots/web-2.jpg">
</p>
<p align="center">
  <img width="800" src="/screenshots/web-1.jpg">
</p>

<p align="center">
  <img width="800" src="/screenshots/mobile.jpg">
</p>

The entire application is fully responsive. You can view the app in any viewport. This is the sample interface for the mobile view.

The application has a darkmode option on the right corner. This IconButton can switch the entire Ui to dark and light in real time.
The application is deployed to Vercel, and it works perfectly in the Vercel environment. You are most welcome to fork this repository and contribute to this simple project.

<p align="left">
  (Make sure, you have Node Js and Npm installed in your machine)
  <br>
  Installation :
</p>
<p align="left">
  <p> 1. git clone https://github.com/MichaelDepp/Emoonji </p>
  <p> 2. cd Emoonji </p>
  <p> 3. npm install </p>
  <p> 4. npm run dev </p>
</p>
