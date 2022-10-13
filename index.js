const CONNECT_ID = 'connect';
const PAUSE_ID = 'pause';
let socket;
var userArray = [];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'];
  
var dataStore ='';
    document.getElementById('inputfile')
             .addEventListener('change', function() {
              
             var fr=new FileReader();
             fr.onload=function(){
                 document.getElementById('output')
                         .textContent=fr.result;
                          dataStore = fr.result;
             }
             
             fr.readAsText(this.files[0]);
             console.log(dataStore);
         })

//const dataCopy = dayChart.data.datasets[0].data;

// ----------- HTML Stuff ----------- //
let isPaused = false;

function writeToDataStore() {

var txtFile = new File([""],'dataStore.txt');
  txtFile.writeln(document.getElementById('textStuff').value);
  txtFile.close();

console.log(document.getElementById('textStuff').value);

}


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add('form__message--${type}');
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}



document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const graphs = document.querySelector("#graphs");
    const dayGraph = document.querySelector("#dayContainer");
    const monthGraph = document.querySelector("#monthContainer");
    const yearGraph = document.querySelector("#yearContainer");
    const customGraph = document.querySelector("#customContainer");
    const createAccountForm = document.querySelector("#createAccount");
    const settingsPage = document.querySelector("#settings");
    const dashboard = document.querySelector("#dashboard");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.add("form--hidden");
        dayGraph.classList.add("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.add("form--hidden");
        dayGraph.classList.add("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
        
    });
    
    document.querySelector("#saveButton").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.remove("form--hidden");
        dayGraph.classList.remove("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
    });
    
    document.querySelector("#cancelButton").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.remove("form--hidden");
        dayGraph.classList.remove("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
    });
        
    document.querySelector("#gotoGraph").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.remove("form--hidden");
        dayGraph.classList.remove("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
    });
    
    document.querySelector("#dayGraph").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.remove("form--hidden");
        dayGraph.classList.remove("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
    });
    
    document.querySelector("#monthGraph").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.remove("form--hidden");
        dayGraph.classList.add("form--hidden");
        monthGraph.classList.remove("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
    });
    
    document.querySelector("#yearGraph").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.remove("form--hidden");
        dayGraph.classList.add("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.remove("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
    });

    
    document.querySelector("#customGraph").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.remove("form--hidden");
        dayGraph.classList.add("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.remove("form--hidden");
        dashboard.classList.add("form--hidden");
    });
    
		document.querySelector("#gotoLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.add("form--hidden");
        dayGraph.classList.add("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
    });
    
    document.querySelector("#gotoSettings").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.remove("form--hidden");
        graphs.classList.add("form--hidden");
        dayGraph.classList.add("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
    });
    
    document.querySelector("#gotoDashboard").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.add("form--hidden");
        dayGraph.classList.add("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.remove("form--hidden");
    });
    
    
    document.querySelector("#continue").addEventListener("click", e => {
        
        
//        let newUser = {Username: 'name'};
//        let arr =['0'];
//        console.log(localStorage.getItem("userArrayKey"));
//        if (localStorage.getItem("userArrayKey")) {
//        	arr = localStorage.getItem("userArrayKey");
//          console.log('qwe');
//        }
//        else {
//        	
//        }
//        console.log(arr);
//        arr.push(newUser);
//        userArray = arr;
//        localStorage.setItem("userArrayKey", userArray);
//        console.log(userArray);
				e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.add("form--hidden");
        settingsPage.classList.add("form--hidden");
        graphs.classList.remove("form--hidden");
        dayGraph.classList.remove("form--hidden");
        monthGraph.classList.add("form--hidden");
        yearGraph.classList.add("form--hidden");
        customGraph.classList.add("form--hidden");
        dashboard.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
        
        
        
        
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, someVarName + " Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

   //     localStorage.setItem("userArrayKey", userArray);
    //    var someVarName = localStorage.getItem("someVarKey");

  // ----------- Chart js Stuff ----------- //
//const ctx = document.getElementById('dayChart');
//const dayChart = new Chart(ctx);

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
   // alerts.insertBefore(alert, alerts.firstChild);
}





function updateGraphType() {
 var chartType = document.getElementById("chartType").value;
 
 //dayChart.config._config.type = chartType;
 dayChart.config.type = chartType;
 monthChart.config.type = chartType;
 yearChart.config.type = chartType;
 customChart.config.type = chartType;
 dayChart.update();
 monthChart.update();
 yearChart.update();
 customChart.update();
}

function updateDayGraph() {
 var day = document.getElementById("dayDate").value;
 console.log(day);
}

function updateMonthGraph() {
 var month = document.getElementById("monthDate").value;
 console.log(month);
}

function updateYearGraph() {
 var year = document.getElementById("yearDate").value;
 console.log(year);
}

function updateCustomGraph() {
 var start = document.getElementById("customDateStart").value;
 var end = document.getElementById("customDateEnd").value;
 console.log(start);
 console.log(end);
}

function updateGraph() {  
  var startingMonth = document.getElementById("startingMonth").value;
  var endingMonth = document.getElementById("endingMonth").value;
  var startingYear = parseInt(document.getElementById("startingYear").value);
  var endingYear = parseInt(document.getElementById("endingYear").value);
 

console.log(dayChart.data);
  dayChart.data.labels = months.slice(months.indexOf(startingMonth), months.indexOf(endingMonth) + 1);
  
  dayChart.data.datasets[0].data = dataCopy.slice(months.indexOf(startingMonth), months.indexOf(endingMonth) + 1);

  dayChart.update();  
}


//Daily    shows up to 24 hours for a given day
//Month    shows up to 30 day for a given month (Select 1 month, choose day range
//Yearly   shows up to 12 months for a given year












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