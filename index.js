const CONNECT_ID = 'connect';
const PAUSE_ID = 'pause';
let socket;

// ----------- HTML Stuff ----------- //
let isPaused = false;


document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const skipLogin = document.querySelector("#canvasContainer");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });
    
    document.querySelector("#skipLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        skipLogin.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});



const updateButton = (id, value, isLoading=false) => {
    button = document.getElementById(id);
    button.innerHTML = value;
    if (isLoading) button.disabled = true;
    else button.disabled = false;
}

const connect = () => {
    switch (socket.readyState) {
        case 0:  // connecting
            updateButton(CONNECT_ID, 'connecting...', true);
            break;
        case 1:  // open
            updateButton(CONNECT_ID, 'disconnecting...', true);
            socket.close();
            break;
        case 2:  // closing
            updateButton(CONNECT_ID, 'disconnecting...', true);
            break;
        case 3:  // closed
            updateButton(CONNECT_ID, 'connecting...', true);
            startWebSocket();
            break;
    }
}

const pause = () => {
    if (isPaused) {
        updateButton(PAUSE_ID, 'pause');
        isPaused = false;
    } else {
        updateButton(PAUSE_ID, 'unpause');
        isPaused = true;
    }
}

const sendAlert = (color, msg) => {
    let alert = document.createElement('div');
    let alerts = document.getElementById('alerts');
    alert.textContent = msg;
    alert.style.backgroundColor = getComputedStyle(document.body).getPropertyValue('--'+color);
    alerts.insertBefore(alert, alerts.firstChild);
}



// ----------- Chart js Stuff ----------- //
const ctx = document.getElementById('myChart');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            borderColor: 'rgb(165, 82, 52)',
        }]
    },
    options: {
        animation: false,
        plugins: {
            legend: { display: false },
            title: { 
                display: true,
                align: 'start',
                text: 'Chart',
                font: { size: 22 }
            }
        }
    }
});








// ----------- Socket Stuff ----------- //
const startWebSocket = () => {
    socket = new WebSocket("ws://localhost:8080");

    socket.onopen = event => {
        updateButton(CONNECT_ID, 'disconnect');
        sendAlert('green', '[connected]: engaged');
    };

    socket.onmessage = event => {
        [time, water] = event.data.split(':').map(x => parseInt(x));

        // If chartjs can't keep up you can improve performance
        // https://www.chartjs.org/docs/latest/general/performance.html
        chart.data.labels.push(time);
        chart.data.datasets[0].data.push(water);
        if (!isPaused) chart.update();
    };

    socket.onclose = event => {
        updateButton(CONNECT_ID, 'Connect');
        if (event.wasClean) {
            sendAlert('blue', '[closed]: Connection closed cleanly');
        } else {
            sendAlert('red', '[closed]: Connection failed');
        }
    };

    socket.onerror = error => sendAlert('red', `[error]: ${error.message}`);
};

updateButton(CONNECT_ID, 'connecting...', true);
startWebSocket();

