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
let growthRate: number = 0;

// Build upgrade buttons HTML
const upgradesHTML = upgrades
  .map(
    (u) =>
      `<button id="upgrade-${u.id}" disabled>
      Buy ${u.name} (+${u.rate}/sec, Cost: <span id="${u.id}Cost">${u.cost}</span>)
    </button>`,
  )
  .join("\n");

document.body.innerHTML = `
  <div id="body">
    <h1>Help me feed my axolotl so that he can grow big and strong and become president of the galaxy</h1>
    <p>Fed <span id="counter">0</span> times</p>
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
      counterElement.textContent = counter.toString();
      costSpan.textContent = u.cost.toString();
      updateUpgradeButtons();
      console.log(
        `Upgrade purchased: ${u.name}! Growth rate is now ${growthRate} per second.`,
      );
    }
  });
});

let lastTime = performance.now();

function grow(now: number) {
  const deltaSeconds = (now - lastTime) / 1000;
  counter += deltaSeconds;
  counterElement.textContent = counter.toFixed(0);
  lastTime = now;
  updateUpgradeButtons();
  requestAnimationFrame(grow);
}

requestAnimationFrame(grow);

console.log("RUNNING");
