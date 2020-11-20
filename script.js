const TikTacToe = document.querySelector("#TicTacToe");
const Start = document.querySelector("#start");
const startBox = document.querySelector("#startBox");
const Box = document.querySelector("#box");
const Select = document.querySelector("#select");
const Back = document.querySelector("#back");
const pNameBox = document.querySelector("#pName");
const pvcBox = document.querySelector("#pvc");
const result = document.querySelectorAll(".result");
const input = document.querySelectorAll(".input");
const p = document.querySelectorAll(".p");
let text, whoWin, random;
let count = 0;
let arr = [];

function start(mode, p1, p2, pvcMode) {
    startBox.style.display = "none";
    for (let i = 0; i < 9; i++) { TikTacToe.appendChild(document.createElement("div")).className = `box ${i}` }
    window.boxes = document.querySelectorAll(".box");
    if (mode == "pvp") {
        let bool = true;
        p[0].textContent = p1;
        p[2].textContent = p2;
        boxes.forEach(e => {
            e.addEventListener("click", () => {
                text == "X" ? text = "O" : text = "X";
                e.textContent = text;
                count++;
                checkWin();
                if (whoWin || count == 9) {
                    Back.setAttribute("onclick", "");
                    if (whoWin == "X") { if (bool) { result[0].textContent++; bool = false } whoWin = `Win:${p1}!` }
                    else if (whoWin == "O") { if (bool) { result[2].textContent++; bool = false } whoWin = `Win:${p2}!` }
                    else { whoWin = "Draw!" }
                    result[1].textContent = whoWin;
                    setTimeout(() => { result[1].textContent = ""; clear(); start("pvp", p1, p2); Back.setAttribute("onclick", "back()"); }, 1000);
                }

            }, { once: true })
        })
    }
    else if (mode == "pvc") {
        let bool = true;
        p[0].textContent = p1;
        p[2].textContent = `${pvcMode}`;
        boxes.forEach(e => {
            e.addEventListener("click", () => {
                text == "X" ? text = "O" : text = "X";
                e.textContent = text;
                count++;
                checkWin();
                if (text == "X") {
                    if (pvcMode == "Easy") { easy(e).click() }
                    else if (pvcMode == "Medium") { medium(e).click() }
                    else if (pvcMode == "Hard") { hard(e, count).click() }
                }
                checkWin();
                if (whoWin || count == 9) {
                    Back.setAttribute("onclick", "");
                    if (whoWin == "X") { if (bool) { result[0].textContent++; bool = false } whoWin = `Win:${p1}!` }
                    else if (whoWin == "O") { if (bool) { result[2].textContent++; bool = false } whoWin = `Win:${pvcMode}!` }
                    else { whoWin = "Draw!" }
                    result[1].textContent = whoWin;
                    setTimeout(() => { result[1].textContent = ""; clear(); start("pvc", p1, "", pvcMode); Back.setAttribute("onclick", "back()"); }, 1000);
                }
            }, { once: true })
        })
    }
}

function easy(e) {
    random = Math.floor(Math.random() * 8);
    arr.push(e.classList[1]);
    random = randomMove();
    arr.push(random);
    return boxes[random];
}
function medium(e) {
    random = Math.floor(Math.random() * 8);
    arr.push(e.classList[1]);
    random = randomMove();
    random = AI(arr, "string");

    arr.push(random);
    return boxes[random];
}
function hard(e, count) {
    let hard = [0, 2, 6, 8];
    arr.push(e.classList[1]);
    if (count == 1) {
        if (!arr.includes("4")) { random = 4; center = false } else { random = hard[Math.floor(Math.random() * 4)]; center = true; }
    }
    else if (count == 3) {
        if (center) {
            random = AI(arr, "string");
            if (arr.includes(Number(random))) {
                if (arr.includes(0) || arr.includes("0")) { random = 2 }
                if (arr.includes(2) || arr.includes("2")) { random = 0 }
            }
        }
        else {
            random = randomMove();
            if ((arr.includes("1") && arr.includes("3")) || (arr.includes("8") && (arr.includes("1") || arr.includes("3")))) { random = 0 }
            else if ((arr.includes("1") && arr.includes("5")) || (arr.includes("6") && (arr.includes("1") || arr.includes("5")))) { random = 2 }
            else if ((arr.includes("3") && arr.includes("7")) || (arr.includes("2") && (arr.includes("3") || arr.includes("7")))) { random = 6 }
            else if ((arr.includes("5") && arr.includes("7")) || (arr.includes("0") && (arr.includes("5") || arr.includes("7")))) { random = 8 }
            else if (arr.includes("0") && arr.includes("8")) { random = 3 }
            else if (arr.includes("2") && arr.includes("6")) { random = 5 }
            random = AI(arr, "string");
            random = AI(arr, "number");
        }
    }
    else if (count == 5) {
        if (center) {
            random = randomMove();
            random = AI(arr, "string");
            random = AI(arr, "number");
        }
        else {
            random = randomMove();
            random = AI(arr, "string");
            random = AI(arr, "number");
        }
    }
    else if (count == 7) {
        if (center) {
            random = randomMove();
            random = AI(arr, "string");
            random = AI(arr, "number");
        }
        else {
            random = randomMove();
            random = AI(arr, "string");
            random = AI(arr, "number");
        }
    }
    arr.push(random);
    return boxes[random];
}
function checkWin() {
    if (boxes[0].textContent !== "" && ((boxes[0].textContent === boxes[1].textContent && boxes[0].textContent === boxes[2].textContent)
        || (boxes[0].textContent === boxes[3].textContent && boxes[0].textContent === boxes[6].textContent)
        || (boxes[0].textContent === boxes[4].textContent && boxes[0].textContent === boxes[8].textContent))) { return whoWin = boxes[0].textContent }
    else if (boxes[4].textContent !== "" && ((boxes[3].textContent === boxes[4].textContent && boxes[3].textContent === boxes[5].textContent)
        || (boxes[1].textContent === boxes[4].textContent && boxes[1].textContent === boxes[7].textContent)
        || (boxes[2].textContent === boxes[4].textContent && boxes[2].textContent === boxes[6].textContent))) { return whoWin = boxes[4].textContent }
    else if (boxes[8].textContent !== "" && ((boxes[6].textContent === boxes[7].textContent && boxes[6].textContent === boxes[8].textContent)
        || (boxes[2].textContent === boxes[5].textContent && boxes[2].textContent === boxes[8].textContent))) { return whoWin = boxes[8].textContent }
}
function select() {
    Start.style.display = "none";
    Select.style.display = "block";
}
function clear() {
    boxes.forEach(e => e.remove());
    pNameBox.style.display = "none";
    startBox.style.display = "none";
    text = "";
    whoWin = "";
    random = "";
    count = 0;
    arr = [];
}
function chooseName(mode) {
    if (mode == "pvp") {
        Select.style.display = "none";
        pNameBox.style.display = "flex";

        document.querySelector("#begin").addEventListener("click", () => {
            p1Name = document.querySelector("#p1").value;
            p2Name = document.querySelector("#p2").value;
            if (p1Name && p2Name) {
                input.forEach(e => e.classList.remove("null"))
                Box.style.display = "flex";
                Back.style.display = "block";
                start(mode, p1Name, p2Name);
            }
            else { input.forEach(e => e.classList.add("null")) }
        })
    }
    else if (mode == "pvc") {
        Select.style.display = "none";
        pvcBox.style.display = "flex";
    }
}
function startPvc(pvcMode) {
    pvcName = document.querySelector("#pvcName");
    if (pvcName.value) {
        pvcName.classList.remove("null");
        pvcBox.style.display = "none";
        Box.style.display = "flex";
        Back.style.display = "block";
        start("pvc", pvcName.value, "", pvcMode)
    }
    else { pvcName.classList.add("null") }
}
function back() {
    clear();
    Box.style.display = "none";
    Back.style.display = "none";
    startBox.style.display = "flex";
    Start.style.display = "block";
    result[0].textContent = 0;
    result[2].textContent = 0;
}
function randomMove() {
    if (arr.includes(random) || arr.includes(random.toString())) {
        if (arr.length < 8) {
            while (arr.includes(random) || arr.includes(random.toString())) { random = Math.floor(Math.random() * 8) }
        }
    }
    return random
}
function AI(arr, modeAI) {

    if ((!arr.includes("0") && !arr.includes(0)) && ((arr.includes(f("1", modeAI)) && arr.includes(f("2", modeAI))) || (arr.includes(f("3", modeAI)) && arr.includes(f("6", modeAI))) || (arr.includes(f("4", modeAI)) && arr.includes(f("8", modeAI))))) { random = 0 }
    else if ((!arr.includes("1") && !arr.includes(1)) && ((arr.includes(f("0", modeAI)) && arr.includes(f("2", modeAI))) || (arr.includes(f("4", modeAI)) && arr.includes(f("7", modeAI))))) { random = 1 }
    else if ((!arr.includes("2") && !arr.includes(2)) && ((arr.includes(f("0", modeAI)) && arr.includes(f("1", modeAI))) || (arr.includes(f("4", modeAI)) && arr.includes(f("6", modeAI))) || (arr.includes(f("5", modeAI)) && arr.includes(f("8", modeAI))))) { random = 2 }
    else if ((!arr.includes("3") && !arr.includes(3)) && (arr.includes(f("0", modeAI)) && arr.includes(f("6", modeAI)) || (arr.includes(f("4", modeAI)) && arr.includes(f("5", modeAI))))) { random = 3 }
    else if ((!arr.includes("4") && !arr.includes(4)) && (arr.includes(f("1", modeAI)) && arr.includes(f("7", modeAI)) || (arr.includes(f("3", modeAI)) && arr.includes(f("5", modeAI))) || (arr.includes(f("0", modeAI)) && arr.includes(f("8", modeAI))) || (arr.includes(f("2", modeAI)) && arr.includes(f("6", modeAI))))) { random = 4 }
    else if ((!arr.includes("5") && !arr.includes(5)) && (arr.includes(f("2", modeAI)) && arr.includes(f("8", modeAI)) || (arr.includes(f("3", modeAI)) && arr.includes(f("4", modeAI))))) { random = 5 }
    else if ((!arr.includes("6") && !arr.includes(6)) && ((arr.includes(f("0", modeAI)) && arr.includes(f("3", modeAI))) || (arr.includes(f("2", modeAI)) && arr.includes(f("4", modeAI))) || (arr.includes(f("7", modeAI)) && arr.includes(f("8", modeAI))))) { random = 6 }
    else if ((!arr.includes("7") && !arr.includes(7)) && ((arr.includes(f("1", modeAI)) && arr.includes(f("4", modeAI))) || (arr.includes(f("6", modeAI)) && arr.includes(f("8", modeAI))))) { random = 7 }
    else if ((!arr.includes("8") && !arr.includes(8)) && ((arr.includes(f("0", modeAI)) && arr.includes(f("4", modeAI))) || (arr.includes(f("2", modeAI)) && arr.includes(f("5", modeAI))) || (arr.includes(f("6", modeAI)) && arr.includes(f("7", modeAI))))) { random = 8 }
    return random
}
function f(number, mode) {
    if (mode == "string") { return number.toString() }
    else if (mode == "number") { return Number(number) }
}