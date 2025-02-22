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
