const CONNECT_ID = 'connect';
const PAUSE_ID = 'pause';
let socket;

// ----------- HTML Stuff ----------- //
let isPaused = false;

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
const mikeybutholeChart = new Chart(ctx, {
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
                text: 'Mikey\'s Buthole',
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
        sendAlert('green', '[connected]: Mikey buthole engaged');
    };

    socket.onmessage = event => {
        [time, waterInMyBalls] = event.data.split(':').map(x => parseInt(x));

        // If chartjs can't keep up you can improve performance
        // https://www.chartjs.org/docs/latest/general/performance.html
        mikeybutholeChart.data.labels.push(time);
        mikeybutholeChart.data.datasets[0].data.push(waterInMyBalls);
        if (!isPaused) mikeybutholeChart.update();
    };

    socket.onclose = event => {
        updateButton(CONNECT_ID, 'connect deez nutz in your mouth');
        if (event.wasClean) {
            sendAlert('blue', '[closed]: Connection closed cleanly');
        } else {
            sendAlert('red', '[closed]: Connection trolling and ded');
        }
    };

    socket.onerror = error => sendAlert('red', `[error]: ${error.message}`);
};

updateButton(CONNECT_ID, 'connecting...', true);
startWebSocket();
