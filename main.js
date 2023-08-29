let inputTask = document.getElementById("task");
let Submit = document.getElementById("submit");
let tasksDiv = document.getElementById("div");
let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromStorage()

Submit.onclick = function () {
    if (inputTask.value !== "") {
        arrayOfTasksFunc(inputTask.value);
        inputTask.value = "";
        inputTask.focus();
    }
}

function arrayOfTasksFunc(value) {
    const objOfTask = {
        id: Date.now(),
        task: value,
        done: false,
    };
    arrayOfTasks.push(objOfTask);
    addElementsToDiv(arrayOfTasks);
    addDataToStorage(arrayOfTasks);
}

function addElementsToDiv(array) {
    tasksDiv.innerHTML = "";
    array.forEach(function (element) {
        let Div = document.createElement("div");
        Div.appendChild(document.createTextNode(element.task))
        Div.setAttribute("id", element.id)
        Div.setAttribute("class", "taskEle")
        let ele = document.createElement("div")
        let btn = document.createElement("button");
        btn.className = "del"
        btn.appendChild(document.createTextNode("Delete"))
        ele.appendChild(btn)
        let check = document.createElement("input")
        check.setAttribute("type", "checkbox")
        ele.appendChild(check)
        Div.appendChild(ele)
        check.onclick = function () {
            sweetAlert.setAttribute("style","display: block")
            setTimeout(() => {
                sweetAlert.setAttribute("style","display: none")
            }, 2000);
            check.parentElement.parentElement.classList.toggle("done");
        }
        tasksDiv.appendChild(Div);
        deleteButton(btn);
    });
   
}

function deleteButton(btn) {
    btn.onclick = function () {
        deleteFromStorage(btn.parentElement.parentElement.id);
        btn.parentElement.parentElement.remove();
    }
    
    
}

function addDataToStorage(data) {
    window.localStorage.setItem("tasks", JSON.stringify(data));
}

function getDataFromStorage() {
    let Data = localStorage.getItem("tasks")
    if (Data) {
        let tasks = JSON.parse(Data);
        addElementsToDiv(tasks);
    }
    
}

function deleteFromStorage(el) {
    arrayOfTasks = arrayOfTasks.filter(function (ele) {
        return ele.id != el;
    })
    addDataToStorage(arrayOfTasks)
}


let sweetAlert = document.createElement("div");
sweetAlert.classList = "alert"
let header = document.createElement("h1");
header.innerHTML = "Good Job ! "
header.classList = "header"
let message = document.createElement("p");
message.innerHTML = "Task Is Done Successfully";
message.classList = "msg"
let icon = document.createElement("i");
icon.classList = "fa-regular fa-circle-check fa-beat-fade fa-2xl";
sweetAlert.appendChild(icon)
sweetAlert.appendChild(header)
sweetAlert.appendChild(message)


document.body.appendChild(sweetAlert);

localStorage.setItem("color1", "#fff");
localStorage.setItem("color2", "rgb(55, 6, 101)");
let mode = document.getElementById("mode");
mode.onclick = function () {
    if (mode.classList == "fa-solid fa-sun") {
        mode.setAttribute("class", "fa-regular fa-sun")
                document.body.style.background = localStorage.getItem("color2")
        mode.style.color = "#fff"
    } else {
        mode.setAttribute("class", "fa-solid fa-sun")
        document.body.style.background = localStorage.getItem("color1")
        mode.style.color = "rgb(55, 6, 101)"
    }
}

