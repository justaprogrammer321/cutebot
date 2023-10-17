let circle1;
let circle2;
let mouth;
let mouthInput; // Reference to the input textarea

function positionCirclesAndMouth() {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const circleDiameter = 100  
  const gapBetweenCircles = (windowWidth - 2 * circleDiameter) / 3;

  const leftPosition = gapBetweenCircles;
  const rightPosition = 2 * gapBetweenCircles + circleDiameter;
  const eyePositionY = (windowHeight - circleDiameter * 3) / 2;
  const mouthPositionX = (leftPosition + rightPosition + circleDiameter) / 2;
  const mouthPositionY = eyePositionY + circleDiameter * 2 + 30; // Adjust this value to change the distance below the eyes
  
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

  mouthInput.classList.add('mouth-input'); // Add a class to style the input element if needed

  mouthInput.addEventListener('blur', () => {
    // When the input element loses focus, replace it back with the mouth div
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
      console.log(charactersWithoutSpaces)
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
    "I used to play piano by ear, but now I use my hands.",
    // Add more jokes here
  ];

  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
}

function handleCommand(command) {
  if (command === 'joke') {
    const joke = getRandomJoke();
    // Append the joke to the input textarea
    mouthInput.value += `\nBot: ${joke}`;
    mouthInput.scrollTop = mouthInput.scrollHeight; // Scroll to the bottom
  }
  else if (command.toLowerCase() === 'hi') {
    // Display an image when the user enters "Hi"
    const imageContainer = document.createElement('div');
    const image = new Image();
    image.src = 'hi.svg'; // Replace with the actual path to your image
    imageContainer.appendChild(image);
    document.body.appendChild(imageContainer);

    // Append a response to the input textarea
    mouthInput.value += "\nBot: Hi! Here's an image for you.";
    mouthInput.scrollTop = mouthInput.scrollHeight;
  }
  else if (command === 'cursor') {
    // Change the cursor style to the custom cursor
    document.body.style.cursor = 'url(cursor.svg), auto';

    // Append a response to the input textarea
    mouthInput.value += "\nBot: Cursor style changed to custom cursor.";
    mouthInput.scrollTop = mouthInput.scrollHeight;
  }
   else {
    const unknownResponse = "Bot: Sorry, I don't understand that command.";
    // Append the unknown response to the input textarea
    mouthInput.value += `\n${unknownResponse}`;
    mouthInput.scrollTop = mouthInput.scrollHeight; // Scroll to the bottom
  }
}

window.addEventListener('DOMContentLoaded', () => {
  circle1 = document.getElementById('circle1');
  circle2 = document.getElementById('circle2');
  mouth = document.getElementById('mouth');

  positionCirclesAndMouth();

  window.addEventListener('resize', positionCirclesAndMouth);

  mouth.addEventListener('click', replaceMouthWithInput);
});
