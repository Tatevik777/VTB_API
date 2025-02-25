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

  const progressPercent = Math.min((target.progress / target.amount) * 100, 100);
  const progressPercentRound = Math.round(progressPercent);
  let progressColor = "rgba(223, 34, 22, 1)";
  if (progressPercent >= 20) progressColor = "rgba(182, 204, 45, 1)";
  if (progressPercent >= 80) progressColor = "rgba(80, 219, 58, 1)";

  const remainingAmount = Math.max(target.amount - target.progress, 0);

targetElement.innerHTML = `
       <div class="greeting__items-item__top">
       <h3 class="greeting__items-item__top-title">${target.name}</h3>
        </div>
        <div class="progress-bar__wrapper">
            <div class="progress-bar" style="width: ${progressPercent}%; background-color: ${progressColor};"><p>${progressPercentRound}%</p></div>
        </div>   
        <div class="progress-info__amount">
        <span class="progress-info__label">Осталось собрать:</span>
        <span class="progress-info__remaining">${remainingAmount} ₽</span>

        <div class="target__items-item__top-link__wrapper">
        <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.02968 3.88318L9.43938 7.29287C9.8299 7.6834 9.8299 8.31656 9.43938 8.70709L6.02968 12.1168"
                stroke="#292929"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </div>
    </div>`;

greetingItemsContainer.appendChild(targetElement);


    // Получаем элемент иконки редактирования цели внутри карточки цели
    const editIconWrapper = targetElement.querySelector('.target__items-item__top-link__wrapper');
    editIconWrapper.addEventListener('click', function () {
        const targetId = targetElement.getAttribute('data-id');
        localStorage.setItem('editingTargetId', String(targetId));
        window.location.href = './targetchange.html'
    })
};

function targetToChart(){
  const ctx1 = document.getElementById('chart1').getContext('2d');
  const ctx2 = document.getElementById('chart2').getContext('2d');

  const data1 = {
    type: 'line',
    labels: ['05.11.22', '06.11.22', '07.11.22', '08.11.22', '09.11.22', '10.11.22'],
    datasets: [{
        label: 'Всего средств',
        data: [20, 50, 80, 40, 100, 120],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4
    }]
  };

  const data2 = {
      labels: ['05.11.22', '06.11.22', '07.11.22', '08.11.22', '09.11.22', '10.11.22'],
      datasets: [{
          label: 'Всего целей',
          data: [5, 15, 10, 25, 30, 50],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
          tension: 0.4
      }]
  };

  const config1 = {
      type: 'line',
      data: data1,
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  };

  const config2 = {
      type: 'line',
      data: data2,
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  };

  const myChart1 = new Chart(ctx1, config1);
  const myChart2 = new Chart(ctx2, config2);

};
targetToChart();



