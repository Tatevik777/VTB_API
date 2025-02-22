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
    const targetName = document.getElementById("targetName").value.trim();
    const targetAmount = document.getElementById("targetAmount").value.trim();
    // let initialDeposit = document.getElementById("initialDeposit").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const targetImageInput = document.getElementById("targetImage");
    const priorityTimeSelect = document.getElementById('priorityTime');
    const priorityLevelSelect = document.getElementById('priorityLevel');
    const priorityTimeText = priorityTimeSelect.options[priorityTimeSelect.selectedIndex].text;
    const priorityLevelText = priorityLevelSelect.options[priorityLevelSelect.selectedIndex].text;
    const priorityTime = priorityTimeSelect.value;
    const priorityLevel = priorityLevelSelect.value;

    if (!targetName || !targetAmount) {
        alert("Введите название и сумму цели!");
        return;
    }

    const targetAmountNum = Number(targetAmount);
    const initialDeposit = 0;


    // Создаём объект новой цели. По дефолту устанавливаем картинку, если пользователь не добавит картинку цели
    let newTarget = {
        id: Date.now(),
        name: targetName,
        amount: targetAmountNum,
        progress: initialDeposit,
        startDate,
        endDate,
        priorityTime,
        priorityLevel,
        priorityTimeText,
        priorityLevelText,
        image: "./assets/images/img/default-image.png",  
    };

    if (targetImageInput.files.length > 0) {
        const file = targetImageInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;

            img.onload = function () {
                // Сжимаем картинку с помощью canvas
                const canvas = document.createElement("canvas");
                // Прописываем контекст рисования для рисования 2d графики
                const ctx = canvas.getContext("2d");

                const maxWidth = 270; // Максимальная ширина
                const maxHeight = 275; // Максимальная высота
                let width = img.width;
                let height = img.height;

                // Сохраняем пропорции
                if (width > maxWidth || height > maxHeight) {
                    const scale = Math.min(maxWidth / width, maxHeight / height);
                    width *= scale;
                    height *= scale;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // Преобразуем в сжатый base64 (JPEG, 80% качества)
                newTarget.image = canvas.toDataURL("image/jpeg", 0.8);

                saveToLocalStorage(newTarget)
            };
        };

        reader.readAsDataURL(file);
    } 
    else {
        saveToLocalStorage(newTarget)
    }
}

function saveToLocalStorage(target) {
    let targets = JSON.parse(localStorage.getItem("targets")) || [];
    targets.push(target);
    localStorage.setItem("targets", JSON.stringify(targets));
    alert("Цель сохранена!");
    window.location.href = "./targets.html";
}