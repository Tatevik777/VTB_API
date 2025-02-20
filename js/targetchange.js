document.addEventListener('DOMContentLoaded', function () {
    const targetId = localStorage.getItem('editingTargetId'); // Получаем ID цели
    // console.log('Цель', targetId)
    // Загружаем все цели
    const targets = JSON.parse(localStorage.getItem('targets')) || []; 
    // Ищем нужную цель
    const target = targets.find(t => String(t.id) === targetId); // 

    if (!target) {
        alert('Цель не найдена!');
        return;
    }

// Находим элементы на странице. А именно отображаемый сразу и инпут, на который элемент заменится при редактировании
    const targetTitle = document.getElementById("targetTitle");
    const targetTitleInput = document.getElementById('targetTitleInput');

    const targetSum = document.getElementById("targetSum");
    const targetSumInput = document.getElementById('targetSumInput')

    const priorityLevel = document.getElementById("priorityLevel");
    const priorityLevelSelect = document.getElementById('priorityLevelSelect')

    const priorityTime = document.getElementById('priorityTime');
    const priorityTimeSelect = document.getElementById('priorityTimeSelect');
    
    const startDate = document.getElementById("startDate");
    const startDateInput = document.getElementById('startDateInput');

    const endDate = document.getElementById("endDate");
    const endDateInput = document.getElementById('endDateInput');

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


    // Заполняем данными страницу цели, а также заполняем этими же данными инпуты, которые откроются при редактировании
    targetTitle.textContent = target.name;
    targetTitleInput.textContent = target.name;
    targetSum.textContent = `${target.amount} ₽;`
    targetSumInput.textContent = `${target.amount} ₽;`
    priorityLevel.textContent = target.priorityLevel || 'Не указан';
    priorityTime.textContent = target.priorityTime || 'Не указан'
    startDate.textContent = formatDate(target.startDate);
    endDate.textContent = formatDate(target.endDate);
    targetImage.src = target.image;

    // Вычисляем процент прогресса
    function updateProgressBar() {
        const progressPercent = Math.min((target.progress / target.amount) * 100, 100);
        const progressPercentRound = Math.round(progressPercent);
        let progressColor = "rgba(223, 34, 22, 1)";
        if (progressPercent >= 20) progressColor = "rgba(182, 204, 45, 1)";
        if (progressPercent >= 80) progressColor = "rgba(80, 219, 58, 1)";

        progressBar.innerHTML = `<div class="progress-bar" style="width: ${progressPercent}%; background-color: ${progressColor};"><p>${progressPercentRound}%</p></div>`
    }
    
    updateProgressBar();

    let isEditing = false;

    // Вешаем слушателя события клик на кнопку редактировать
    editButton.addEventListener('click', () => {
        if (!isEditing) {
    // Выключаем статичные поля, подключаем динамические инпуты для введения отредактированной информации
            targetTitle.style.display = 'none';
            targetTitleInput.style.display = 'inline-block';
            targetSum.style.display = 'none';
            targetSumInput.style.display = 'inline-block';
            priorityLevel.style.display = 'none';
            priorityLevelSelect.style.display = 'inline-block';
            priorityTime.style.display = 'none';
            priorityTimeSelect.style.display = 'inline-block';
            startDate.style.display = 'none';
            startDateInput.style.display = 'inline-block';
            endDate.style.display = 'none';
            endDateInput.style.display = 'inline-block';
            progressBar.style.display = 'none';
    // Меняем кнопку Редактировать на кнопку Сохранить
            editButton.textContent = 'Сохранить';
            resetButton.style.display = 'inline-block';
        } else {
            const newTitle = targetTitleInput.value.trim();
            const newSum = targetSumInput.value.trim();
            const newStartDate = startDateInput.value;
            const newEndDate = endDateInput.value;
            const newPriorityLevel = priorityLevelSelect.options[priorityLevelSelect.selectedIndex].text;
            const newPriorityTime = priorityTimeSelect.options[priorityTimeSelect.selectedIndex].text;
    // Валидация базовая введённых данных
            if(!newTitle) {
                alert('Введите название цели!');
                return;
            }
            if(!newSum || isNaN(newSum) || Number(newSum) <= 0) {
                alert('Сумма цели должна быть числом больше 0!')
                return;
            }
    // Обновляем данные при клике на Сохранить
            targetTitle.textContent = newTitle;
            targetSum.textContent = newSum;
            priorityLevel.textContent = newPriorityLevel;
            priorityTime.textContent = newPriorityTime;
            startDate.textContent = formatDate(newStartDate);
            endDate.textContent = formatDate(newEndDate);

    // Обновляем объект цели
            target.name = newTitle;
            target.amount = newSum;
            target.startDate = newStartDate;
            target.endDate = newEndDate;
            target.priorityTime = newPriorityTime;
            target.priorityLevel = newPriorityLevel;
    // Сохраняем изменения в массиве в localStorage
            const targetIndex = targets.findIndex(t => t.id == targetId)
            if (targetIndex !== -1) {
                targets[targetIndex] = target;
                localStorage.setItem('targets', JSON.stringify(targets));
            }
    // Выходим из режима редактирования, скрываем инпуты
            targetTitle.style.display = 'inline-block';
            targetTitleInput.style.display = 'none'
            targetSum.style.display = 'inline-block';
            targetSumInput.style.display = 'none';
            priorityLevel.style.display = 'inline-block';
            priorityLevelSelect.style.display = 'none';
            priorityTime.style.display = 'inline-block';
            priorityTimeSelect.style.display = 'none';
            startDate.style.display = 'inline-block';
            startDateInput.style.display = 'none';
            endDate.style.display = 'inline-block';
            endDateInput.style.display = 'none';
            progressBar.style.display = 'inline-block'
    // Обновляем прогресс-бар
            updateProgressBar();
        }
    // Отключаем режим редактирования, используем логическое отрицание. Во время редактирования было true, станет опять false
        isEditing = !isEditing
    })


});