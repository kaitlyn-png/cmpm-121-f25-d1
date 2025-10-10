import axolotlURL from "./axolotl.png";
import "./style.css";
import wormURL from "./worm.png";

let counter: number = 0;
let growthRate: number = 0;
let hatCost: number = 10;

document.body.innerHTML = `
  <div id="body">
    <h1>Help me feed my axolotl so that he can grow big and strong and become president of the galaxy</h1>
    <p>Fed <span id="counter">0</span> times</p>
    <div id="main">
    
      <img id= "axolotl" src=${axolotlURL} alt="axolotl icon">

      <button id="increment">
          <img id= "worm" src=${wormURL} alt="worm icon">
      </button>
      <button id="upgrade" disabled>
          Buy Hat (+1/sec, Cost: <span id="hatCost">10</span>)
      </button>

    </div>
  </div>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const upgradeButton = document.getElementById("upgrade")!;
const hatCostElement = document.getElementById("hatCost")!;

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  updateUpgradeButton();
});

function updateUpgradeButton() {
  upgradeButton.disabled = counter < hatCost;
}

upgradeButton.addEventListener("click", () => {
  if (counter >= hatCost) {
    counter -= hatCost;
    growthRate += 1;
    hatCost += 10;
    counterElement.textContent = counter.toString();
    hatCostElement.textContent = hatCost.toString();
    updateUpgradeButton();
    console.log(
      "Upgrade purchased! Growth rate is now " + growthRate + " per second.",
    );
  }
});

let lastTime = performance.now();

function grow(now: number) {
  const deltaSeconds = (now - lastTime) / 1000;
  counter += growthRate * deltaSeconds;
  counterElement.textContent = counter.toFixed(0);
  lastTime = now;
  updateUpgradeButton();
  requestAnimationFrame(grow);
}

requestAnimationFrame(grow);

console.log("RUNNING");
