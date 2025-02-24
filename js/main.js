function startOnce(fn, context) {
  let result = false;

  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = null;
    }
    return result;
  };
}

function checkAuth() {
  if (!localStorage.getItem("buttonClicked")) {
    window.location.href = "./authorization.html";
  }
}

const start = startOnce(checkAuth);

start();

document.addEventListener("DOMContentLoaded", function () {
  const iconWrappers = document.querySelectorAll(".icon-wrapper");
  iconWrappers.forEach((wrapper) => {
    wrapper.addEventListener("click", function () {
      const url = this.getAttribute("data-url");
      if (url) {
        window.location.href = url;
      }
    });
  });
  renderTargets();
});

function renderTargets() {
  let targets = JSON.parse(localStorage.getItem("targets")) || [];

  targets.forEach((target) => {
    // Проверяем, нет ли уже такой цели в контейнере
    if (!document.querySelector(`[data-id="${target.id}"]`)) {
      addTargetToDOM(target);
    }
  });
}

function addTargetToDOM(target) {
  const greetingItemsContainer = document.getElementById("greeting__items");
  const targetElement = document.createElement("div");
  targetElement.classList.add("greeting_items-item");
  targetElement.setAttribute("data-id", target.id);
}

targetElement.innerHTML = `
       <div class="greeting__items-item__top">
       <h2 class="greeting__items-item__top-title">${target.name}</h2>
        </div>
        <div class="progress-bar__wrapper">
            <div class="progress-bar" style="width: ${progressPercent}%; background-color: ${progressColor};"><p>${progressPercentRound}%</p></div>
        </div>   
        <div class="progress-info__amount">
        <span class="progress-info__label">Осталось собрать:</span>
        <span class="progress-info__remaining">${remainingAmount} ₽</span>
    </div>`

greetingItemsContainer.appendChild(targetElement);