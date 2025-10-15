import axolotlURL from "./axolotl.png";
import "./style.css";
import wormURL from "./worm.png";

// Upgrade definitions
const upgrades = [
  { name: "Hat", cost: 10, rate: 1, id: "hat" },
  { name: "Shirt", cost: 100, rate: 10, id: "shirt" },
  { name: "Pants", cost: 1000, rate: 100, id: "pants" },
  { name: "Shoes", cost: 10000, rate: 1000, id: "shoes" },
  { name: "Watch", cost: 100000, rate: 10000, id: "watch" },
  { name: "Car", cost: 1000000, rate: 100000, id: "car" },
  { name: "Rocket Ship", cost: 10000000, rate: 1000000, id: "rocket" },
  { name: "Nuke", cost: 100000000, rate: 10000000, id: "nuke" },
];

let counter: number = 0;
let growthRate: number = 1;

// Build upgrade buttons HTML (now using upgrade-btn and details)
const upgradesHTML = upgrades
  .map(
    (u) =>
      `<button id="upgrade-${u.id}" class="upgrade-btn" disabled>
        <span class="upgrade-title">${u.name} <span class="upgrade-count" id="${u.id}Count">0</span></span>
        <span class="upgrade-details">
          <span>Cost: <span id="${u.id}Cost">${u.cost}</span></span>
          <span>Rate: +${u.rate}/sec</span>
        </span>
      </button>`,
  )
  .join("\n");

document.body.innerHTML = `
  <div id="body" style="display: flex; flex-direction: row; min-height: 100vh;">
    <div id="main">
      <p id="help">Help me feed my axolotl so that he can grow big and strong and become president of the galaxy</p>
      <p class="text">Fed <span id="counter">0</span> times <br />
      Growth Rate: <span id="growthRate">0</span> per second</p>
      <img id="axolotl" src=${axolotlURL} alt="axolotl icon">
      <button id="increment">
        <img id="worm" src=${wormURL} alt="worm icon">
      </button>
    </div>
    <div id="upgrades-panel">
      <div class="upgrade-list">
        ${upgradesHTML}
      </div>
    </div>
  </div>
`;

const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;
const growthRateElement = document.getElementById("growthRate")!;

growthRateElement.textContent = growthRate.toFixed(1);

// Track upgrade counts
const upgradeCounts: Record<string, number> = {};
upgrades.forEach((u) => (upgradeCounts[u.id] = 0));

// Update all upgrade buttons based on current counter
function updateUpgradeButtons() {
  upgrades.forEach((u) => {
    const btn = document.getElementById(`upgrade-${u.id}`) as HTMLButtonElement;
    btn.disabled = counter < u.cost;
    const countSpan = document.getElementById(`${u.id}Count`);
    if (countSpan) countSpan.textContent = upgradeCounts[u.id].toString();
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
      upgradeCounts[u.id] += 1;
      counterElement.textContent = counter.toString();
      costSpan.textContent = u.cost.toFixed(2);
      updateUpgradeButtons();
      growthRateElement.textContent = growthRate.toFixed(1);
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
  growthRateElement.textContent = growthRate.toFixed(1);
  lastTime = now;
  updateUpgradeButtons();
  requestAnimationFrame(grow);
}

requestAnimationFrame(grow);

console.log("RUNNING");
