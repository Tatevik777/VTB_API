const superPriority = document.getElementById("superPriority");
const goalName = document.getElementById("selectItem");
const goalPriority = document.getElementsByName("goalPriority");
const goalTime = document.getElementsByName("goalTime");
const saveButtonSettings = document.getElementById("saveButtonSettings");
// let goalsList = [];

// function GoalItem(goalName, superpriority, chousenPriority, chousenTime) {
//   this.goalName = goalName;
//   this.superpriority = superpriority;
//   this.chousenPriority = chousenPriority;
//   this.chousenTime = chousenTime;
//  }

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

document.addEventListener("DOMContentLoaded", () => {
  localStorageLoading();
});

function localStorageLoading() {
  let storedGoals = localStorage.getItem("goalsList");
  if (storedGoals) {
    goalsList = JSON.parse(storedGoals);
  } else {
    goalsList = [];
  }
}
