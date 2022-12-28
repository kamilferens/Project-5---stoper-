/*Pobrane wszystkie przyciski i elementy */
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const archiveBtn = document.querySelector(".archive");

const timeList = document.querySelector(".time-list");

const stopWatch = document.querySelector(".stopwatch");
const time = document.querySelector(".time");

const infoBtn = document.querySelector(".info");
const modalShadow = document.querySelector(".modal-shadow");
const closeModalBtn = document.querySelector(".close");

/*Przycisk START */
startBtn.addEventListener("click", handleStart);

let countTime;
let minutes = 0;
let decySeconds = 0; // użyte tylko w moim rozwiązaniu
let seconds = 0;

let timesArr = [];

function handleStart() {
    clearInterval(countTime);

    countTime = setInterval(() => {
        if (seconds < 9) {
            seconds++;
            stopWatch.textContent = `${minutes}:0${seconds}`;
        } else if ((seconds >= 9) & (seconds < 59)) {
            seconds++;
            stopWatch.textContent = `${minutes}:${seconds}`;
        } else if (seconds === 59) {
            minutes++;
            seconds = 0;
            stopWatch.textContent = `${minutes}:0${seconds}`;
        }

        // Moje rozwiązanie - działające ale namieszałem
        /* 
        stopWatch.textContent = `${minutes}:${decySeconds}${seconds}`;
        
        
        if (seconds < 9) {
            seconds++;
        } else if (seconds === 9) {
            decySeconds++;
            seconds = 0;
        }

        if ((decySeconds === 5) & (seconds === 9)) {
            decySeconds = 0;
            seconds = 0;
            minutes++;
        } */
    }, 1000);
}

/*Przycisk PAUSE */
pauseBtn.addEventListener("click", handlePause);
function handlePause() {
    clearInterval(countTime);
}

/*Przycisk STOP */
stopBtn.addEventListener("click", handleStop);

function handleStop() {
    time.innerHTML = `Ostatni czas: ${stopWatch.textContent}`;

    if (stopWatch.textContent !== "0:00") {
        time.style.visibility = "visible";
        timesArr.push(stopWatch.textContent);
        console.log(timesArr);
    }

    clearStuff();
}

/* Przycisk RESET */
resetBtn.addEventListener("click", handleReset);

function handleReset() {
    time.style.visibility = "hidden";
    timesArr = [];

    clearStuff();
}

// funkcja wyciągnięta poza nawias żeby "oczyścić" kod
function clearStuff() {
    clearInterval(countTime);
    stopWatch.textContent = "0:00";
    // timeList.textContent = "";       // wyłączyłem, gdyż bardziej mi się podoba aplikacja bez tej funkcjonalności
    minutes = 0;
    seconds = 0;
    showHistory();
}

/* Przycisk ARCHIWUM */
archiveBtn.addEventListener("click", showHistory);

function showHistory() {
    timeList.textContent = "";

    let num = 1;

    timesArr.forEach((time) => {
        const newTime = document.createElement("li");
        newTime.innerHTML = `Pomiar nr ${num}: <span> ${time} </span>`;

        timeList.appendChild(newTime);
        num++;
    });
}

/*Przycisk MODAL */
infoBtn.addEventListener("click", showModal);

function showModal() {
    if (modalShadow.style.display !== "block") {
        modalShadow.style.display = "block";
    } else {
        modalShadow.style.display = "none";
    }

    //animacja
    modalShadow.classList.toggle("modal-animation");
}

/*Przycisk ZAMKNIJ w MODAL */
closeModalBtn.addEventListener("click", showModal); //żeby oszczędząc kod

/* Zamykanie modala poprzez kliknięcie w tło */
// najczęściej spotykany ZAPIS
window.addEventListener("click", (event) => {
    event.target === modalShadow ? showModal() : false;
});

/*Funkcja zmieniająca motyw stopera w zależności o koloru, który wybierze użytkownik na colorpickerze */
let colorBtn = document.querySelector("#colorpicker");
let firstColor = colorBtn.addEventListener("change", () => {
    console.log(colorBtn.value);
    changeColor();
});

function changeColor() {
    document.documentElement.style.setProperty("--first-color", colorBtn.value);
}
