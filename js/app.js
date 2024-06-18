const btnDay = document.getElementById("sel-day");
const btnWeek = document.getElementById("sel-week");
const btnMonth = document.getElementById("sel-month");
const btnAddProp = document.getElementById("add-prop");
const iconAddProp = document.getElementById("add-prop-icon");
const btnHideProp = document.getElementById("hide-prop");
const btnCalendar = document.getElementById("calendar");
const currentDate = document.querySelector("p.current-select-date");
const extra = document.querySelector("div.income-extensive-extra");
const addPropBlock = document.querySelector("div.transaction-property");
//const btnAddProp = document.querySelector("svg.svg-icon-adding");
let date = new Date();
let showCalendar = false;

let display;
let previous;
let next;
let days;
let selected;

let dateCal;
let year ;
let month;

btnCalendar.onclick = function (event) {
    event.preventDefault();

    showCalendar = ~showCalendar;
    extra.classList.toggle("calendar-block");

    if (showCalendar) {
        extra.innerHTML = `<div class="calendar-container">
            <div class="calendar-calendar">
                <div class="calendar-header">
                    <pre class="left">◀</pre>
                    <div class="calendar-header-display">
                        <p id="display" class="display">""</p>
                    </div>
                    <pre class="right">▶</pre>
                </div>
                <div class="calendar-week">
                    <div>Su</div>
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                </div>
                <div class="calendar-days">
                </div>
            </div>
        </div>`;

     display = document.querySelector("p.display");
     //let display = document.getElementById("display");
     previous = document.querySelector(".left");
     next = document.querySelector(".right");
     days = document.querySelector(".calendar-days");
     //  selected = document.querySelector(".selected");

     dateCal = new Date();
     year = dateCal.getFullYear();
     month = dateCal.getMonth();
        
        displayCalendar();

        displaySelected();

        previous.addEventListener("click", () => {
        days.innerHTML = "";
        //   selected.innerHTML = "";
        if (month < 0) {
            month = 11;
            year = year - 1;
        }
        month = month - 1;
        console.log(month);
        dateCal.setMonth(month);
        displayCalendar();
        displaySelected();
        });

        next.addEventListener("click", () => {
        days.innerHTML = "";
        //   selected.innerHTML = "";
        if (month > 11) {
            month = 0;
            year = year + 1;
        }
        month = month + 1;
        dateCal.setMonth(month);
        displayCalendar();
        displaySelected();
        });
    }
    else {
        extra.innerHTML = ``;
    }
}



btnAddProp.onclick = function (event) {
    event.preventDefault();

    addPropBlock.classList.toggle("display-none");
    btnAddProp.classList.toggle("display-none");
    btnHideProp.classList.toggle("display-none");
}

btnHideProp.onclick = function (event) {
    event.preventDefault();

    addPropBlock.classList.toggle("display-none");
    btnHideProp.classList.toggle("display-none");
    btnAddProp.classList.toggle("display-none");
}

btnDay.onclick = function (event) {
    event.preventDefault();

    clearSelect();  
    selectDay();
    btnDay.classList.add("date-selected");

    btnAddProp.removeAttribute("disabled");
    iconAddProp.style.fill = "blueviolet";
}

btnWeek.onclick = function (event) {
    event.preventDefault();

    clearSelect();
    selectWeek();
    btnWeek.classList.add("date-selected");

    btnAddProp.setAttribute("disabled", "disabled");
    iconAddProp.style.fill = "#c3c3c3";
}

btnMonth.onclick = function (event) {
    event.preventDefault();

    clearSelect();
    selectMonth();
    btnMonth.classList.add("date-selected");

    btnAddProp.setAttribute("disabled", "disabled");
    iconAddProp.style.fill = "#c3c3c3";
}


function clearSelect() {
    const list = document.querySelectorAll("button.btn-select-date.date-selected");
    list.forEach((button) => {
        button.classList.remove("date-selected");
    });
}

function selectDay() {
    //const date = new Date();
    //const date = new Date("03-Jun-2024");
    dateFormatted = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    currentDate.innerText = dateFormatted;
    console.log(date.toLocaleString("en-US", { day: 'numeric', month: 'long', year: 'numeric' }));
}

selectDay();

function selectWeek() {
    //const date = new Date();
    console.log(date);
    const day = date.getDay();
    const firstday = new Date(date.getTime() - 60 * 60 * 24 * (day - 1) * 1000);
    const lastday = new Date(firstday.getTime() + 60 * 60 * 24 * 6 * 1000);
    currentDate.innerText = firstday.toString().slice(4,10) + ' - ' + lastday.toString().slice(4,10) + ', ' + lastday.toString().slice(11,15);
}

function selectMonth() {
    dateFormatted = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    console.log(dateFormatted);
    //currentdate.innerText = dateFormatted;
    const words = dateFormatted.split(' ');
    currentDate.innerText = words[0] + ', ' + words[2];
}


/************************************************** */


function displayCalendar() {

    let formattedDate = dateCal.toLocaleString("en-US", {
        month: "long",
        year: "numeric"
    });
    display.innerHTML = `${formattedDate}`;

    const firstDay = new Date(year, month, 1);
    const firstDayIndex = firstDay.getDay();

    for (let x = 1; x <= firstDayIndex; x++) {
        let div = document.createElement("div");
        div.innerHTML += "";
        days.appendChild(div);
    }

    const lastDay = new Date(year, month + 1, 0);
    const numberOfDays = lastDay.getDate();

    for (let i = 1; i <= numberOfDays; i++) {
        let div = document.createElement("div");
        let currentDate = new Date(year, month, i);
        div.dataset.dateCal = currentDate.toDateString().slice(4);
        //div.dataset.dateCal = currentDate.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });
        div.innerHTML += i;
        days.appendChild(div);
        if (
            currentDate.getFullYear() === new Date().getFullYear() &&
            currentDate.getMonth() === new Date().getMonth() &&
            currentDate.getDate() === new Date().getDate()
        ) {
            div.classList.add("calendar-current-date");
            console.log("Current Day");
        }
    }
}

//displayCalendar();

function displaySelected() {
    const dayElements = document.querySelectorAll(".calendar-days div");
  dayElements.forEach((day) => {
    day.addEventListener("click", (e) => {
      const selectedDate = e.target.dataset.dateCal;
        //   selected.innerHTML = `Selected Date : ${selectedDate}`;
        console.log(selectedDate);
        let mas = selectedDate.split(' ');

        date = new Date(mas[1] + '-' + mas[0] + '-' + mas[2]);
        //date = selectedDate;
        clearSelect();
        selectDay();
        btnDay.classList.add("date-selected");

        showCalendar = false;
        extra.classList.toggle("calendar-block");
        extra.innerHTML = ``;
    });
  });
}
//displaySelected();

// previous.addEventListener("click", () => {
//   days.innerHTML = "";
//   selected.innerHTML = "";
//   if (month < 0) {
//     month = 11;
//     year = year - 1;
//   }
//   month = month - 1;
//   console.log(month);
//   dateCal.setMonth(month);
//   displayCalendar();
//   //displaySelected();
// });

// next.addEventListener("click", () => {
//   days.innerHTML = "";
//   selected.innerHTML = "";
//   if (month > 11) {
//     month = 0;
//     year = year + 1;
//   }
//   month = month + 1;
//   dateCal.setMonth(month);
//   displayCalendar();
//   //displaySelected();
// });

