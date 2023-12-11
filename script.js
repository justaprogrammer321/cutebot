let circle1;
let circle2;
let mouth;
let circlesmall1;
let circlesmall2;
let mouth1;
let mouthInput;

function positionCirclesAndMouth() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const circleDiameter = 100;
  const gapBetweenCircles = (windowWidth - 2 * circleDiameter) / 3;

  const leftPosition = gapBetweenCircles;
  const rightPosition = 2 * gapBetweenCircles + circleDiameter;
  const eyePositionY = (windowHeight - circleDiameter * 3) / 2;
  const mouthPositionX = (leftPosition + rightPosition + circleDiameter) / 2;
  const mouthPositionY = eyePositionY + circleDiameter * 2 + 30;

  circle1.style.left = `${leftPosition}px`;
  circle1.style.top = `${eyePositionY}px`;

  circle2.style.left = `${rightPosition}px`;
  circle2.style.top = `${eyePositionY}px`;

  mouth.style.left = `${mouthPositionX}px`;
  mouth.style.top = `${mouthPositionY}px`;
}


function replaceMouthWithInput() {
  mouthInput = document.createElement('textarea');
  mouthInput.setAttribute('placeholder', 'Enter command...');
  mouthInput.setAttribute('id', 'mouth-input');

  mouthInput.style.width = mouth.style.width;
  mouthInput.style.height = mouth.style.height;
  mouthInput.style.top = mouth.style.top;
  mouthInput.style.left = mouth.style.left;

  mouthInput.classList.add('mouth-input');

  mouthInput.addEventListener('blur', () => {
    mouthInput.replaceWith(mouth);
    mouth.addEventListener('click', replaceMouthWithInput);
  });

  mouthInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const command = mouthInput.value.toLowerCase();
      const lastPeriodIndex = command.lastIndexOf('.');
      const charactersAfterLastPeriod = command.substring(lastPeriodIndex + 1);
      const charactersWithoutSpaces = charactersAfterLastPeriod.replace(/\s/g, '');
      handleCommand(charactersWithoutSpaces);
    }
  });

  mouth.removeEventListener('click', replaceMouthWithInput);
  mouth.replaceWith(mouthInput);

  mouthInput.focus();
}

function getRandomJoke() {
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Parallel lines have so much in common. It's a shame they'll never meet.",
    "I used to play piano by ear, but now I use my hands."
  ];

  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
}

function handleCommand(command) {
  if (command === 'joke') {
    const joke = getRandomJoke();
    mouthInput.value += `\nBot: ${joke}`;
    mouthInput.scrollTop = mouthInput.scrollHeight;
  } else if (command.toLowerCase() === 'hi') {
    const videoContainer = document.createElement('div');
    const video = document.createElement('video');
    video.src = 'hi_video.mp4'; // Replace 'hi_video.mp4' with your video URL or source
    video.autoplay = true;
    video.loop = false; // Play once without looping
    video.muted = true; // Mute the video to prevent potential audio issues
    videoContainer.appendChild(video);
    document.body.appendChild(videoContainer);
    mouthInput.value += "\nBot: Hi! Here's a video for you.";
    mouthInput.scrollTop = mouthInput.scrollHeight;

    // Remove the video element after it finishes playing
    video.onended = function() {
      videoContainer.remove();
    };
  } else if (command === 'cursor') {
    document.body.style.cursor = 'url(cursor.svg), auto';
    mouthInput.value += "\nBot: Cursor style changed to custom cursor.";
    mouthInput.scrollTop = mouthInput.scrollHeight;
  } else if (command === 'record') {
    startCamera();
    mouthInput.value += "\nBot: Camera turned on. You are being recorded.";
    mouthInput.scrollTop = mouthInput.scrollHeight;
  } else {
    const unknownResponse = "Bot: Sorry, I don't understand that command.";
    mouthInput.value += `\n${unknownResponse}`;
    mouthInput.scrollTop = mouthInput.scrollHeight;
  }
}


function startCamera() {
  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var video = document.createElement('video');
  video.style.width = "100%"; // Adjust the width as needed
  video.style.height = "100%"; // Adjust the height as needed
  video.setAttribute('autoplay', 'true');

  document.body.appendChild(video);

    video.addEventListener('loadedmetadata', function() {
        canvas.width = this.videoWidth;
        canvas.height = this.videoHeight;
    });

    var draw = function() {
        ctx.drawImage(video, 90, 0, canvas.width, canvas.height);

        // Draw the box
        var x = 10;
        var y = 10;
        var width = 70;
        var height = 70;
        ctx.fillStyle = '#FF0000'; // Set box color
        ctx.fillRect(x, y, width, height); // Draw the box
    };

    video.addEventListener('play', function() {
        var start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            draw();
            if (progress < 10000) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    });

    var stream;
    var chunks = [];
    var mediaRecorder;

    function startRecording() {
        stream = canvas.captureStream();
        mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'video/webm'
        });
        mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
        };
        mediaRecorder.onstop = function() {
            var blob = new Blob(chunks, { 'type': 'video/webm' });
            chunks = [];
            var videoURL = URL.createObjectURL(blob);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = videoURL;
            a.download = 'canvasRecording.webm';
            a.click();
            window.URL.revokeObjectURL(videoURL);
        };
        mediaRecorder.start();
        setTimeout(function() {
            mediaRecorder.stop();
        }, 10000);
    }


    mouthInput.style.display = 'none';
    circle1.style.display='none';
    circle2.style.display='none'
    mouth.style.display='none'
  
    const form = document.createElement('form');
    const computedStyle = window.getComputedStyle(mouthInput);
  
    const userInput = document.createElement('input');
    userInput.setAttribute('type', 'text');
    userInput.setAttribute('placeholder', 'Your Answer');
  
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
  
    form.appendChild(userInput);
    form.appendChild(submitButton);
    document.body.appendChild(form);
  
    submitButton.addEventListener('click', function (event) {
      event.preventDefault();
      const nickname = generateNickname();
      const bestThing = userInput.value;
      alert(`Your nickname is: ${nickname}\n\nThe best thing about you: ${bestThing}`);
      form.style.display = 'none';
    });
    
        startRecording();
    

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
          video.srcObject = stream;
      })
      .catch(function (err) {
          console.log("An error occurred: " + err);
      });
  }
}

function generateNickname() {
  const adjectives = ['Awesome', 'Fantastic', 'Incredible', 'Brilliant', 'Marvelous'];
  const nouns = ['Friend', 'Warrior', 'Champion', 'Hero', 'Legend'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return randomAdjective + ' ' + randomNoun;
}

window.addEventListener('DOMContentLoaded', () => {
  circle1 = document.getElementById('circle1');
  circle2 = document.getElementById('circle2');
  mouth = document.getElementById('mouth');


  positionCirclesAndMouth();

  window.addEventListener('resize', positionCirclesAndMouth);

  mouth.addEventListener('click', replaceMouthWithInput);
});

