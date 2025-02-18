document.addEventListener('DOMContentLoaded', function () {
    const targetId = localStorage.getItem('editingTargetId'); // Получаем ID цели
    console.log('Цель', targetId)
    const targets = JSON.parse(localStorage.getItem('targets')) || []; // Загружаем все цели
    const target = targets.find(t => String(t.id) === targetId); // Ищем нужную цель

    if (!target) {
        alert('Цель не найдена!');
        return;
    }

    // Заполняем страницу данными цели
    document.getElementById('targetTitle').textContent = target.name;
    document.getElementById('targetImage').src = target.image;
    document.getElementById('targetSum').textContent = target.amount;

});