const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipPerPerson = document.getElementById("tip-amount");
const totalPerPerson = document.getElementById("total-amount");
const tips = document.querySelectorAll(".tip-btn");
const tipCustom = document.querySelector(".custom-input");
const resetBtn = document.querySelector(".reset-btn");
const error = document.querySelector(".error");

billInput.addEventListener("input", addBillTotal);
peopleInput.addEventListener("input", addPeople);
tips.forEach(function (val) {
  val.addEventListener("click", handleClick);
});
tipCustom.addEventListener("input", customInput);
resetBtn.addEventListener("click", reset);

billInput.value = "";
peopleInput.value = "1";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0.0;
let peopleValue = 1;
let tipValue = 0.15;

function addBillTotal() {
  billValue = parseFloat(billInput.value);
  calculateTip();
}

function addPeople() {
  peopleValue = parseInt(peopleInput.value);

  if (peopleValue < 1) {
    error.style.display = "block";
    peopleInput.style.border = "2px solid red";
  } else {
    error.style.display = "none";
    peopleInput.style.border = "none";
    calculateTip();
  }
}

function customInput() {
  tipValue = parseFloat(tipCustom.value) / 100;
  tips.forEach(function (val) {
    val.classList.remove("active-btn");
  });

  calculateTip();
}

function handleClick(event) {
  tips.forEach(function (val) {
    val.classList.remove("active-btn");
    if (event.target.innerHTML === val.innerHTML) {
      val.classList.add("active-btn");
      tipValue = parseFloat(val.innerHTML) / 100;
    }
  });
  calculateTip();
}

function calculateTip() {
  billValue = parseFloat(billInput.value) || 0.0; // default to 0.0 if NaN
  peopleValue = parseInt(peopleInput.value) || 1; // default to 1 if NaN

  if (peopleValue >= 1) {
    let totalTip = billValue * tipValue;
    let tipAmount = totalTip / peopleValue;
    let total = (billValue + totalTip) / peopleValue;
    tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
    totalPerPerson.innerHTML = "$" + total.toFixed(2);
  }
}

function reset() {
  billInput.value = "0.0";
  addBillTotal();
  peopleInput.value = "1";
  addPeople();
  tipCustom.value = "";
}
