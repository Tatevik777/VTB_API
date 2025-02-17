document.addEventListener('DOMContentLoaded', () => {
    const saveGoalBtn = document.getElementById('saveGoalBtn');
    saveGoalBtn.addEventListener('click', saveGoal);
    const cancelGoalBtn = document.getElementById("cancelGoalBtn");
    if (cancelGoalBtn) {
        cancelGoalBtn.addEventListener('click', cancelGoal)
    }
});

function cancelGoal() {
    // Подтверждение перед удалением
    const confirmCancel = confirm("Вы уверены, что хотите отменить цель? Данные будут удалены.");
    if (!confirmCancel) return;

    // Очищаем поля формы (если есть)
    document.getElementById("targetForm").reset();
}

function saveGoal() {
    // Получаем данные из формы
    const targetName = document.getElementById("targetName").value.trim();
    const targetAmount = document.getElementById("targetAmount").value.trim();
    let initialDeposit = document.getElementById("initialDeposit").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const targetImage = document.getElementById("targetImage").files[0];

    
    // Проверка обязательных полей
    if (!targetName || !targetAmount) {
        alert("Введите название и сумму цели!");
        return;
    }

    if (targetImage) {
        const reader = new FileReader();
        reader.readAsDataURL(targetImage);
        reader.onload = function () {

        }
    }

    // Проверяем, что сумма цели — это положительное число
    if (isNaN(targetAmount) || targetAmount <= 0) {
        alert("Сумма цели должна быть положительным числом!");
        return;
    }

    // Проверяем, что начальный вклад — число (если пусто, то 0)
    if (initialDeposit === "") {
        initialDeposit = 0;
    } else if (isNaN(initialDeposit) || initialDeposit < 0) {
        alert("Сумма первого взноса должна быть числом и не меньше 0!");
        return;
    }

    // Приводим значения к числу
    initialDeposit = Number(initialDeposit);
    const targetAmountNum = Number(targetAmount);

    // Проверяем, чтобы первый взнос не превышал сумму цели
    if (initialDeposit > targetAmountNum) {
        alert("Первый взнос не может превышать сумму цели!");
        return;
    }

    // Получаем текущую дату в формате YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];

    // Проверка: дата начала не может быть в прошлом
    if (startDate && startDate < today) {
        alert("Дата начала накопления не может быть в прошлом!");
        return;
    }

    // Проверка: дата окончания не может быть раньше даты начала
    if (endDate && startDate && endDate < startDate) {
        alert("Дата окончания не может быть раньше даты начала!");
        return;
    }

    // Читаем существующие цели из localStorage, если их там нет, то создаём пустой массив
    // let targets = JSON.parse(localStorage.getItem("targets")) || [];

    // Создаём новую цель
    const newTarget = {
        id: Date.now(),
        name: targetName,
        amount: targetAmountNum,
        progress: initialDeposit,
        startDate,
        endDate,
        image: './assets/images/img/default-image.png'
    };

    if (targetImage) {
        const reader = new FileReader();
        reader.readAsDataURL(targetImage);
        reader.onload = function () {
            newTarget.image = reader.result;
            savetoLocalStorage(newTarget);
        }
    }
}

    // Добавляем цель в массив и сохраняем
function savetoLocalStorage(target) {
    let targets = JSON.parse(localStorage.getItem("targets")) || [];
    targets.push(target);
    localStorage.setItem("targets", JSON.stringify(targets)); 
    window.location.href = "./targets.html";
}
    
