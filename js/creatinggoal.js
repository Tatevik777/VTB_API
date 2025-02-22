let initialDeposit = 0;

document.addEventListener("DOMContentLoaded", function setMinGoalFinishDate() {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const minEndDate = `${todayYear}-0${todayMonth}-${todayDay}`;
  endDate.setAttribute("min", minEndDate);
});

document.getElementById("backButton").addEventListener("click", function () {
  window.history.back();
});

document.addEventListener("DOMContentLoaded", () => {
  const saveGoalBtn = document.getElementById("saveGoalBtn");
  saveGoalBtn.addEventListener("click", saveGoal);
  const cancelGoalBtn = document.getElementById("cancelGoalBtn");
  if (cancelGoalBtn) {
    cancelGoalBtn.addEventListener("click", cancelGoal);
  }
});

function cancelGoal() {
  // Подтверждение перед удалением
  const confirmCancel = confirm("Вы уверены, что хотите отменить цель? Данные будут удалены.");
  if (!confirmCancel) return;

  // Очищаем поля формы (если есть)
  document.getElementById("targetForm").reset();
}

// let initialDeposit = document.getElementById("initialDeposit").value.trim();
// initialDeposit = initialDeposit ? Number(initialDeposit) : 0;

function saveGoal() {
  const targetName = document.getElementById("targetName").value.trim();
  const targetAmount = document.getElementById("targetAmount").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const targetImageInput = document.getElementById("targetImage");
  const priorityTimeSelect = document.getElementById("priorityTime");
  const priorityLevelSelect = document.getElementById("priorityLevel");
  const priorityTime = priorityTimeSelect.options[priorityTimeSelect.selectedIndex].text;
  const priorityLevel = priorityLevelSelect.options[priorityLevelSelect.selectedIndex].text;

  if (!targetName || !targetAmount) {
    alert("Введите название и сумму цели!");
    return;
  }

  const targetAmountNum = Number(targetAmount);

  // Создаём объект новой цели. По дефолту устанавливаем картинку, если пользователь не добавит картинку цели
  let newTarget = {
    id: Date.now(),
    name: targetName,
    amount: targetAmountNum,
    priorityLevel: priorityLevel,
    priorityTime: priorityTime,
    progress: initialDeposit,
    startDate: startDate,
    endDate: endDate,
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

        let targets = JSON.parse(localStorage.getItem("targets")) || [];
        targets.push(newTarget);
        localStorage.setItem("targets", JSON.stringify(targets));

        alert("Цель сохранена!");

        window.location.href = "./targets.html";
      };
    };

    reader.readAsDataURL(file);
  } else {
    let targets = JSON.parse(localStorage.getItem("targets")) || [];
    targets.push(newTarget);
    localStorage.setItem("targets", JSON.stringify(targets));
    document.getElementById("targetForm").reset();
    alert("Цель сохранена!");
    window.location.href = "./targets.html";
  }
}

// function saveGoal() {
//     // Получаем данные из формы
//     const targetName = document.getElementById("targetName").value.trim();
//     const targetAmount = document.getElementById("targetAmount").value.trim();
//     let initialDeposit = document.getElementById("initialDeposit").value.trim();
//     const startDate = document.getElementById("startDate").value;
//     const endDate = document.getElementById("endDate").value;
//     const targetImageFile = document.getElementById("targetImage").files[0]; // Загруженное изображение

//     // Проверка обязательных полей
//     if (!targetName || !targetAmount) {
//         alert("Введите название и сумму цели!");
//         return;
//     }

//     if (isNaN(targetAmount) || targetAmount <= 0) {
//         alert("Сумма цели должна быть положительным числом!");
//         return;
//     }

//     if (initialDeposit === "") {
//         initialDeposit = 0;
//     } else if (isNaN(initialDeposit) || initialDeposit < 0) {
//         alert("Сумма первого взноса должна быть числом и не меньше 0!");
//         return;
//     }

//     initialDeposit = Number(initialDeposit);
//     const targetAmountNum = Number(targetAmount);

//     if (initialDeposit > targetAmountNum) {
//         alert("Первый взнос не может превышать сумму цели!");
//         return;
//     }

//     // Выбираем изображение: либо файл, либо default
//     let imageUrl = "./assets/images/img/default-image.png"; // Картинка по умолчанию

//     if (targetImageFile) {
//         imageUrl = URL.createObjectURL(targetImageFile); // Создаём временный URL
//     }

//     // Создаём объект цели
//     const target = {
//         id: Date.now(),
//         name: targetName,
//         amount: targetAmountNum,
//         progress: initialDeposit,
//         startDate,
//         endDate,
//         image: imageUrl, // Сохраняем URL картинки
//     };

//     // Читаем существующие цели, добавляем новую
//     let targets = JSON.parse(localStorage.getItem("targets")) || [];
//     targets.push(target);
//     localStorage.setItem("targets", JSON.stringify(targets));

//     alert("Цель сохранена!");
//     window.location.href = "./targets.html";
// }
