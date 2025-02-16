document.addEventListener('DOMContentLoaded', function () {
    const iconWrappers = document.querySelectorAll('.icon-wrapper');
    iconWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function () {
            const url = this.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });
    renderTargets() 
});

function renderTargets() {
    let targets = JSON.parse(localStorage.getItem("targets")) || [];

    targets.forEach(target => {
    // Проверяем, нет ли уже такой цели в контейнере
        if (!document.querySelector(`[data-id="${target.id}"]`)) {
            addTargetToDOM(target);
        }
    });
}

function addTargetToDOM(target) {
    const targetsContainer = document.getElementById("targetsContainer");
    const targetElement = document.createElement("div");
    targetElement.classList.add("target__items-item");
    targetElement.setAttribute("data-id", target.id);

    // Вычисляем процент прогресса
    const progressPercent = Math.min((target.progress / target.amount) * 100, 100);
    let progressColor = "red";
    if (progressPercent >= 50) progressColor = "yellow";
    if (progressPercent === 100) progressColor = "green";

    // Вычисляем количество оставшихся дней
    const daysLeft = target.endDate ? Math.ceil((new Date(target.endDate) - new Date()) / (1000 * 60 * 60 * 24)) : "—";

    const progressHTML = progressPercent === 100 
    ? `<img class="missionComplete" src="./assets/images/img/mission-complete.png" alt="Цель выполнена">` 
    : `<span>Осталось дней: ${daysLeft}</span>`

    targetElement.innerHTML = `
        <div class="target__items-item__top">
            <h2 class="target__items-item__top-title">${target.name}</h2>
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
        </div>
        <div class="target__items-item__body">
            ${progressHTML}
        </div>
        <div class="target__items-item__bottom">
            <div class="progress-text">
                <span class="progress-label">Прогресс цели:</span>
                <span class="progress-value">${target.progress}</span>
                <span class="progress-preposition">из</span>
                <span class="progress-total">${target.amount}</span>
            </div>
        <div class="progress-bar__wrapper">
            <div class="progress-bar" style="width: ${progressPercent}%; background-color: ${progressColor};"></div>
        </div>
        
    </div>
    `;

    targetsContainer.appendChild(targetElement);

};

