import axolotlURL from "./axolotl.png";
import "./style.css";
import wormURL from "./worm.png";

let counter: number = 0;

document.body.innerHTML = `
  <div id="body">
    <h1>Help me feed my axolotl so that he can grow big and strong and become president of the galaxy</h1>
    <p>Fed <span id="counter">0</span> times</p>
    <div id="main">
    
      <img id= "axolotl" src=${axolotlURL} alt="axolotl icon">

      <button id="increment">
          <img id= "worm" src=${wormURL} alt="worm icon">
      </button>

    </div>
  </div>
`;

// step 1

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

// step 2

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
});

// step 3

setInterval(() => {
  counter += 1;
  counterElement.textContent = counter.toString();
}, 1000);

console.log("RUNNING");
