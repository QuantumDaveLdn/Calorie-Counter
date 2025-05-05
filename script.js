const calorieCounter = document.getElementById('calorie-counter'); // the whole form thingy
const budgetNumberInput = document.getElementById('budget'); // where u put ur budget
const entryDropdown = document.getElementById('entry-dropdown'); // the dropdown menu (breakfast, lunch etc)
const addEntryButton = document.getElementById('add-entry'); // the button to add a new food/exercise
const clearButton = document.getElementById('clear'); // clear button
const output = document.getElementById('output'); // where the result shows up
let isError = false; // just a flag to check if something went wrong, starts as false

// function to clean up the input string, removes spaces and + or - signs
function cleanInputString(str) {
  const regex = /[+-\s]/g; // regex to find those chars
  return str.replace(regex, ''); // replace them with nothing
}

// checks if the input is like "1e5" which is annoying
function isInvalidInput(str) {
  const regex = /\d+e\d+/i; // regex for the 'e' notation thing
  return str.match(regex); // returns the match if found, otherwise null
}

// function to add a new row for food/exercise entry
function addEntry() {
  // find the right section (breakfast, lunch etc) based on the dropdown
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  // figure out the number for the new entry (like Entry 1, Entry 2)
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;

  // the HTML for the new input fields (name and calories)
  // uses the css classes from styles.css
  // hiding the labels now cause placeholders are good enough
  const HTMLString = `
  <div class="entry-item">
    <div>
      <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
      <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Item Name" />
    </div>
    <div>
      <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
      <input
        type="number"
        min="0"
        id="${entryDropdown.value}-${entryNumber}-calories"
        placeholder="Calories"
      />
    </div>
  </div>`;

  // stick the new HTML into the target section
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

// this function does the main calculation when you submit the form
function calculateCalories(e) {
  e.preventDefault(); // stop the page from reloading
  isError = false; // reset the error flag just in case

  // grab all the number inputs from each section
  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");

  // get the total calories for each section using the helper function below
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  // budget is just one input, but the function expects a list, so put it in []
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  // if getCaloriesFromInputs found an error, just stop here
  if (isError) {
    return;
  }

  // do the math: total consumed and remaining calories
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  // figure out if it's a surplus or deficit
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';

  // update the output div with the results
  // uses the css classes like 'surplus' or 'deficit' for colors
  output.innerHTML = `
  <div class="space-y-2">
    <p class="${surplusOrDeficit.toLowerCase()}">
      ${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}
    </p>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned (Exercise)</p>
  </div>
  `;

  // make the output section visible (it starts hidden)
  output.classList.remove('hide');
}

// helper function to get total calories from a list of inputs
// also checks for bad input
function getCaloriesFromInputs(list) {
  let calories = 0; // start calorie count at 0
  // loop through each input in the list provided
  for (const item of list) {
    const value = item.value || '0'; // get the value, or use '0' if it's empty
    const currVal = cleanInputString(value); // clean it up
    const invalidInputMatch = isInvalidInput(currVal); // check for 'e' thing

    // if the input is bad (like '1e5')
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]} is not allowed.`); // tell the user off
      isError = true; // set the error flag
      return null; // stop and return null to signal an error
    }
    // if input is good, add it to the total (make sure it's a number first)
    calories += Number(currVal);
  }
  // return the total calories for this list
  return calories;
}

// function to clear the whole form
function clearForm() {
  // get all the containers where we added dynamic inputs
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));
  // loop through them and empty them out
  for (const container of inputContainers) {
    container.innerHTML = '';
  }
  // clear the budget input
  budgetNumberInput.value = '';
  // clear the output text
  output.innerText = '';
  // hide the output section again
  output.classList.add('hide');
}

// --- Event Listeners ---
// these make the buttons and form actually do stuff when clicked/submitted

// when 'Add Entry' button is clicked, run addEntry function
addEntryButton.addEventListener("click", addEntry);
// when the form is submitted (Calculate button), run calculateCalories function
calorieCounter.addEventListener("submit", calculateCalories);
// when 'Clear All' button is clicked, run clearForm function
clearButton.addEventListener("click", clearForm);


// --- Three.js Background Animation ---
// this is for the fancy background particles

let scene, camera, renderer, particles, particleMaterial; // variables for the 3d stuff

// sets up the whole 3d scene
function initThreeJS() {
    // find the canvas element in the html
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) {
        console.error("Background canvas not found!"); // uh oh, didn't find it
        return;
    }

    // make a new scene
    scene = new THREE.Scene();

    // set up the camera (like our eyes)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5; // move camera back a bit so we can see stuff

    // set up the renderer (draws the scene onto the canvas)
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true }); // alpha: true makes background transparent
    renderer.setSize(window.innerWidth, window.innerHeight); // make it fill the window
    renderer.setPixelRatio(window.devicePixelRatio); // looks sharper on high-res screens
    renderer.setClearColor(0x000000, 0); // transparent background for the renderer itself

    // make the particles
    const particleCount = 500; // how many particles
    const particlesGeometry = new THREE.BufferGeometry(); // geometry to hold particle positions
    const positions = new Float32Array(particleCount * 3); // array for x, y, z for each particle

    // loop to create random positions for each particle
    for (let i = 0; i < particleCount * 3; i++) {
        // random position between -7.5 and 7.5
        positions[i] = (Math.random() - 0.5) * 15;
    }
    // add the positions to the geometry
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // material for the particles (how they look)
    particleMaterial = new THREE.PointsMaterial({
        color: 0x5555ff, // kinda blueish color
        size: 0.03,     // how big the particles are
        transparent: true, // make them see-through
        opacity: 0.6,      // how see-through
        blending: THREE.AdditiveBlending // makes them glow a bit when they overlap
    });

    // create the particle system (Points object)
    particles = new THREE.Points(particlesGeometry, particleMaterial);
    // add the particles to the scene
    scene.add(particles);

    // make sure it resizes correctly if the window size changes
    window.addEventListener('resize', onWindowResize, false);

    // start the animation!
    animateThreeJS();
}

// function to handle window resize
function onWindowResize() {
    if (!camera || !renderer) return; // safety check
    // update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // apply the change
    // update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// the animation loop - runs over and over
function animateThreeJS() {
    if (!scene || !camera || !renderer || !particles) return; // safety check

    requestAnimationFrame(animateThreeJS); // ask the browser to run this again smoothly

    // make the particles rotate slowly
    const time = Date.now() * 0.0001; // get time, slow it down a lot
    particles.rotation.x = time * 0.2; // rotate on x-axis
    particles.rotation.y = time * 0.1; // rotate on y-axis

    // render the scene with the camera view
    renderer.render(scene, camera);
}

// need to wait for the page (and three.js script) to load before running initThreeJS
window.onload = function() {
    // check if THREE (the three.js library) actually loaded
    if (typeof THREE === 'undefined') {
        console.error("Three.js library not loaded!"); // problem if this shows up
    } else {
        initThreeJS(); // okay, safe to start the 3d stuff
    }
};
