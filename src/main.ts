import axolotlURL from "./axolotl.png";
import "./style.css";
import wormURL from "./worm.png";

// Upgrade definitions
const upgrades = [
  { name: "Hat", cost: 10, rate: 0.1, id: "hat" },
  { name: "Shirt", cost: 100, rate: 1, id: "shirt" },
  { name: "Pants", cost: 1000, rate: 10, id: "pants" },
];

let counter: number = 0;
let growthRate: number = 1;

// Build upgrade buttons HTML
const upgradesHTML = upgrades
  .map(
    (u) =>
      `<button id="upgrade-${u.id}" class="buttons" disabled>
      Buy ${u.name} (+${u.rate}/sec, Cost: <span id="${u.id}Cost">${u.cost}</span>)
    </button>`,
  )
  .join("\n");

document.body.innerHTML = `
  <div id="body">
    <p id ="help">Help me feed my axolotl so that he can grow big and strong and become president of the galaxy</p>
    <p class = "text">Fed <span id="counter">0</span> times <br />
    Growth Rate: <span id="growthRate">0</span> per second</p>
    <div id="main">
      <img id="axolotl" src=${axolotlURL} alt="axolotl icon">
      <button id="increment">
        <img id="worm" src=${wormURL} alt="worm icon">
      </button>
      ${upgradesHTML}
    </div>
  </div>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growthRate")!;

growthRateElement.textContent = growthRate.toFixed(2);

// Update all upgrade buttons based on current counter
function updateUpgradeButtons() {
  upgrades.forEach((u) => {
    const btn = document.getElementById(`upgrade-${u.id}`) as HTMLButtonElement;
    btn.disabled = counter < u.cost;
  });
}

// Feed button
button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  updateUpgradeButtons();
});

// Event listeners for each upgrade
upgrades.forEach((u) => {
  const btn = document.getElementById(`upgrade-${u.id}`) as HTMLButtonElement;
  const costSpan = document.getElementById(`${u.id}Cost`)!;
  btn.addEventListener("click", () => {
    if (counter >= u.cost) {
      counter -= u.cost;
      growthRate += u.rate;
      u.cost += u.cost * 1.15; // Increase cost by 15%
      u.cost = parseFloat(u.cost.toFixed(2));
      counterElement.textContent = counter.toString();
      costSpan.textContent = u.cost.toFixed(2);
      updateUpgradeButtons();
      growthRateElement.textContent = growthRate.toFixed(2);
      console.log(
        `Upgrade purchased: ${u.name}! Growth rate is now ${growthRate} per second.`,
      );
    }
  });
});

let lastTime = performance.now();

function grow() {
  const now = performance.now();
  const deltaSeconds = (now - lastTime) / 1000;
  counter += deltaSeconds * growthRate;
  counterElement.textContent = counter.toFixed(0);
  growthRateElement.textContent = growthRate.toFixed(2);
  lastTime = now;
  updateUpgradeButtons();
  requestAnimationFrame(grow);
}

requestAnimationFrame(grow);

console.log("RUNNING");
