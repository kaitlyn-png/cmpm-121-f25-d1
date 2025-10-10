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

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  console.log("Times fed: ", button, counterElement, counter);
});

console.log("RUNNING");
