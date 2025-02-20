let goalName = document.getElementById("creatingGoalGoalName");
let goalSum = document.getElementById("creatingGoalGoalSum");
let goalPriority = document.getElementById("creatingGoalGoalPriority");
let goalTime = document.getElementById("creatingGoalGoalTime");
let goalStartDate = document.getElementById("creatingGoalGoalStartDate");
let goalFinishDate = document.getElementById("creatingGoalGoalFinishDate");
let goalImage = document.getElementById("creatingGoalGoalImageDownload");
let goalsList = [];
const creatingGoalButton = document.getElementById("creatingGoalButton");

// document.addEventListener("DOMContentLoaded", function setMinGoalFinishDate() {
//   const today = new Date();
//   const todayYear = today.getFullYear();
//   const todayMonth = today.getMonth() + 1;
//   const todayDay = today.getDate();
//   const minGoalFinishDate = `${todayDay}.${todayMonth}.${todayYear}`;
//   creatingGoalGoalFinishDate.setAttribute("min", minGoalFinishDate);
// });

function GoalItem(goalName, goalSum, goalPriority, goalTime, goalStartDate, goalFinishDate, goalImage) {
  this.goalName = goalName;
  this.goalSum = goalSum;
  this.goalPriority = goalPriority;
  this.goalTime = goalTime;
  this.goalStartDate = goalStartDate;
  this.goalFinishDate = goalFinishDate;
  this.goalImage = goalImage;
}

function createNewGoal() {
  if (
    creatingGoalGoalName.value === "" ||
    creatingGoalGoalSum.value === "" ||
    creatingGoalGoalPriority.value === "" ||
    creatingGoalGoalTime.value === "" ||
    creatingGoalGoalStartDate.value === "" ||
    creatingGoalGoalFinishDate.value === ""
  ) {
    alert("Заполните все поля");
  } else {
    let goalItem = new GoalItem(
      goalName.value,
      goalSum.value,
      goalPriority.value,
      goalTime.value,
      goalStartDate.value,
      goalFinishDate.value,
      goalImage.src
    );
    goalsList.push(goalItem);
  }
  localStorage.setItem("goalsList", JSON.stringify(goalsList));
}
creatingGoalButton.addEventListener("click", createNewGoal);
