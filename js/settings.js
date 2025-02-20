document.addEventListener('DOMContentLoaded', () => {
  loadTargets();
  addTargetNamesToDropdown();
})

const superPriority = document.getElementById("superPriority");
const goalName = document.getElementById("selectItem");
const goalPriority = document.getElementsByName("goalPriority");
const goalTime = document.getElementsByName("goalTime");
const saveButtonSettings = document.getElementById("saveButtonSettings");

let targets = []

function loadTargets() {
  const storedTargets = localStorage.getItem('targets');
  targets = storedTargets ? JSON.parse(storedTargets) : [];
}

function addTargetNamesToDropdown() {
  goalName.innerHTML = '<option hidden value="">Выберите цель</option>'
  if(targets.length === 0) {
    goalName.innerHTML += '<option value="">Нет доступных целей</option>';
    return;
  }
  targets.forEach(target => {
    let option = document.createElement('option');
    option.value = target.id;
    option.textContent = target.name;
    goalName.appendChild(option);
  })
}

// let goalsList = [];

// function GoalItem(goalName, superpriority, chousenPriority, chousenTime) {
//   this.goalName = goalName;
//   this.superpriority = superpriority;
//   this.chousenPriority = chousenPriority;
//   this.chousenTime = chousenTime;
// }

// function saveGoalSettings() {
//   const chousenPriority = Array.from(goalPriority).find((radio) => radio.checked).value;
//   const chousenTime = Array.from(goalTime).find((radio) => radio.checked).value;
//   let updatedGoal = new GoalItem(goalName.value, superPriority.checked, chousenPriority, chousenTime);
//   let oldGoalIndex = goalsList.findIndex((goal) => goal.goalName === updatedGoal.goalName);
//   if (oldGoalIndex !== -1) {
//     goalsList[oldGoalIndex] = updatedGoal;
//   } else {
//     goalsList.push(updatedGoal);
//   }
//   localStorage.setItem("goalsList", JSON.stringify(goalsList));
// }
// saveButtonSettings.addEventListener("click", saveGoalSettings);

// document.addEventListener("DOMContentLoaded", () => {
//   localStorageLoading();
// });

// function localStorageLoading() {
//   let storedGoals = localStorage.getItem("goalsList");
//   if (storedGoals) {
//     goalsList = JSON.parse(storedGoals);
//   } else {
//     goalsList = [];
//   }
// }



