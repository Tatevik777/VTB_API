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

    const currentUrl = window.location.pathname.split('/').pop();
    const navIcons = document.querySelectorAll('.common-icon-wrapper');
    navIcons.forEach(icon => {
        const iconUrl = icon.getAttribute('data-url');
        console.log(iconUrl);
        console.log(currentUrl);
        if (iconUrl && currentUrl === iconUrl) {
            icon.classList.add('active');
        }
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
    const progressPercentRound = Math.round(progressPercent);
    let progressColor = "rgba(223, 34, 22, 1)";
    if (progressPercent >= 20) progressColor = "rgba(182, 204, 45, 1)";
    if (progressPercent >= 80) progressColor = "rgba(80, 219, 58, 1)";

    // Вычисляем количество оставшихся дней
    const daysLeft = target.endDate ? Math.ceil((new Date(target.endDate) - new Date()) / (1000 * 60 * 60 * 24)) : "—";
    // Вычисляем оставшуюся сумму
    const remainingAmount = Math.max(target.amount - target.progress, 0);

    const progressHTML = progressPercent === 100 
    ? `<img class="missionComplete" src="./assets/images/img/mission-complete.png" alt="Цель выполнена">` 
    : `<div class="progress-info__time">
            <span class="progress-info__label">Конец сбора через:</span>
            <span class="progress-info__days">${daysLeft} дней</span>
        </div>
        <div class="progress-info__amount">
            <span class="progress-info__label">Осталось собрать:</span>
            <span class="progress-info__remaining">${remainingAmount} ₽</span>
        </div>`
    

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
            <div class="target__items-item__body-image">
                <img
                    src="${target.image}"
                    alt="Изображение цели"
                    class="target-img"
                />
            </div>
            <div class="target__items-item__body-progressinfo">
            ${progressHTML}
            </div>
        </div>
        <div class="target__items-item__bottom">
            <div class="progress-text">
                <span class="progress-label">Прогресс цели:</span>
                <span class="progress-value">${target.progress}</span>
                <span class="progress-preposition">из</span>
                <span class="progress-total">${target.amount}</span>
            </div>
        <div class="progress-bar__wrapper">
            <div class="progress-bar" style="width: ${progressPercent}%; background-color: ${progressColor};"><p>${progressPercentRound}%</p></div>
        </div>
        
    </div>
    `;

    targetsContainer.appendChild(targetElement);

    // Получаем элемент иконки редактирования цели внутри карточки цели
    const editIconWrapper = targetElement.querySelector('.target__items-item__top-link__wrapper');
    editIconWrapper.addEventListener('click', function () {
        const targetId = targetElement.getAttribute('data-id');
        localStorage.setItem('editingTargetId', String(targetId));
        window.location.href = './targetchange.html'
    })
    

};

