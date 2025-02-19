document.addEventListener('DOMContentLoaded', function () {
    const targetId = localStorage.getItem('editingTargetId'); // Получаем ID цели
    console.log('Цель', targetId)
    const targets = JSON.parse(localStorage.getItem('targets')) || []; // Загружаем все цели
    const target = targets.find(t => String(t.id) === targetId); // Ищем нужную цель

    if (!target) {
        alert('Цель не найдена!');
        return;
    }

    const targetTitle = document.getElementById("targetTitle");
    const targetSum = document.getElementById("targetSum");
    const priorityLevel = document.getElementById("priorityLevel");
    const priorityTime = document.getElementById('priorityTime')
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const targetImage = document.getElementById("targetImage");
    const progressBar = document.querySelector(".progress-bar__wrapper");
    const addAmountInput = document.getElementById("addAmount");
    const addAmountBtn = document.getElementById("addAmountBtn");
    const editButton = document.querySelector(".edit-button");
    const resetButton = document.querySelector(".reset-button");

    function formatDate(dateString) {
        if(!dateString) return 'Не указана';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }


    // Заполняем данными страницу цели
    targetTitle.textContent = target.name;
    targetSum.textContent = `${target.amount} ₽;`
    priorityLevel.textContent = target.priorityLevel || 'Не указан';
    priorityTime.textContent = target.priorityTime || 'Не указан'
    startDate.textContent = formatDate(target.startDate);
    endDate.textContent = formatDate(target.endDate);
    targetImage.src = target.image;

    // Вычисляем процент прогресса
    const progressPercent = Math.min((target.progress / target.amount) * 100, 100);
    const progressPercentRound = Math.round(progressPercent);
    let progressColor = "rgba(223, 34, 22, 1)";
    if (progressPercent >= 20) progressColor = "rgba(182, 204, 45, 1)";
    if (progressPercent >= 80) progressColor = "rgba(80, 219, 58, 1)";

    progressBar.innerHTML = `<div class="progress-bar" style="width: ${progressPercent}%; background-color: ${progressColor};"><p>${progressPercentRound}%</p></div>`




    // Заполняем страницу данными цели
    // document.getElementById('targetTitle').textContent = target.name;
    // document.getElementById('targetImage').src = target.image;
    // document.getElementById('targetSum').textContent = target.amount;


});