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
