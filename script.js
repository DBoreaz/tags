"use strict";
const setting = {
  minSize: 3,
  maxSize: 7,
  defaultSize: 4,
  urlLB: "https://stupeni.kiev.ua/ff/ajax.php",
  numBallons: 70,
  perBallonWidthFromFieldWidth: 20,
};
const elContainer = document.querySelector(".container");
const elClock = document.querySelector(".timer");
const elBtnStart = document.querySelector(".start__btn");
const elBtnDownSize = document.querySelector(".size-grid__btn-left");
const currentSize = document.querySelector(".size-grid__text");
const elBtnUpSize = document.querySelector(".size-grid__btn-right");
const elWinMsgResult = document.querySelector(".results");
const elBtnMonthDown = document.querySelector(".results__month__btn-left");
const elDateMonth = document.querySelector(".results__date__month");
const elDateYear = document.querySelector(".results__date__year");
const elBtnMonthUp = document.querySelector(".results__month__btn-right");
const elWrap = document.querySelector(".results__grid");
const elWinMsgCongrat = document.querySelector(".msg-congrat");
const elBtnSaveRes = document.querySelector(".winner__form__btn");
const elInputWin = document.querySelector(".winner__form");
const elInputName = document.querySelector(".winner__form__input");
const elStrRes = document.querySelector(".string-res_link");
const elOverlay = document.querySelector(".overlay");
const elBtnCloseWin = document.querySelectorAll(".modal__btn-close");
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let timer;
class LeaderBoard {
  curMonthResults;
  hero = { nickName: "", score: "" };

  showLB() {
    const today = new Date();
    elOverlay.classList.remove("hidden");
    elWinMsgResult.classList.remove("hidden");
    this._showMonth(today.getMonth() + 1, today.getFullYear());
  }

  async getLeaderBoardCurrentMonth() {
    const today = new Date();
    const strQueryLB = `?y=${today.getFullYear()}&m=${
      "" + (today.getMonth() + 1).toString().padStart(2, "0")
    }&sz=${playCourt.sizeField}`;
    try {
      const respLB = await fetch(setting.urlLB + strQueryLB);
      const dataLB = await respLB.json();
      this.curMonthResults = dataLB;
    } catch (err) {}
  }

  _currentMonth(month, year) {
    const today = new Date();
    if (month == +today.getMonth() + 1 && year == today.getFullYear()) {
      return true;
    } else {
      return false;
    }
  }

  _showMonth(month, year) {
    if (this._currentMonth(month, year)) {
      elBtnMonthUp.classList.add("inactive");
    } else {
      elBtnMonthUp.classList.remove("inactive");
    }
    elDateMonth.textContent = monthNames[+month - 1];
    elDateYear.textContent = year;
    const strQueryLB = `?y=${year}&m=${month.toString().padStart(2, "0")}&sz=${
      playCourt.sizeField
    }`;
    let htmlLB = "";
    // elWrap.innerHTML = "wait..";
    fetch(setting.urlLB + strQueryLB)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((curLeader, i) => {
          let ifHero;
          leaderBoard.hero.nickName === curLeader.name
            ? (ifHero = "results__grid__cell--hero")
            : (ifHero = "");
          htmlLB += `
            <div class='flex-cell results__grid__cell--num ${ifHero}'>${
            i + 1
          }</div>
            <div class='flex-cell results__grid__cell--name ${ifHero}'>${
            curLeader.name
          }</div>
            <div class='flex-cell results__grid__cell--time ${ifHero}'>${
            curLeader.score
          }</div>`;
        });
        elWrap.innerHTML = htmlLB;
      })
      .catch((err) => {
        htmlLB += `
            <div class='flex-cell err'>There are some problems with getting results</div>
            <div class='flex-cell err'>Try again...</div>`;
        elWrap.innerHTML = htmlLB;
      });
  }

  prevMonth(month, year) {
    if (+month === 1) {
      month = 12;
      +year--;
    } else {
      +month--;
    }
    this._showMonth(month, year);
  }

  nextMonth(month, year) {
    if (+month === 12) {
      month = 1;
      +year++;
    } else {
      +month++;
    }
    this._showMonth(month, year);
  }
}

class CW {
  colors;
  constructor() {
    this.colors = [
      "#e03131",
      "#c2255c",
      "#9c36b5",
      "#6741d9",
      "#3b5bdb",
      "#1971c2",
      "#0c8599",
      "#099268",
      "#2f9e44",
      "#66a80f",
      "#f08c00",
      "#e8590c",
    ];
    this.elWrapBallon = document.querySelector(".winner");
    this.elWrapTextWin = document.querySelector(".winner__text");
  }
  loadBallons() {
    this.elWrapTextWin.classList.add("winner__text--min");
    this.elWrapTextWin.classList.remove("winner__text--max");
    // console.log(this.elWrapTextWin);
    for (let i = 0; i < setting.numBallons; i++) {
      let iElImg = document.createElement("div");
      let iColor = this.colors[this._rnd(0, this.colors.length - 1)];
      iElImg.classList.add("box-baloon");
      iElImg.style.left = `${this._rnd(
        0 - setting.perBallonWidthFromFieldWidth,
        100
      )}%`;
      iElImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166 264" class="img-baloon" >
    
      <path style="fill:${iColor}" d="M0,83c0,45.84,37.16,119,83,119s83-73.16,83-119S128.84,0,83,0S0,37.16,0,83z"/>
    <path class="img-balloon-thread" d="M79.93,204.95c10.43,3.59,12.93,17.81,9.34,28.25s-11.19,19.08-15.01,29.43"/>
    <path style="fill:${iColor}" d="M75,210c5.33-3.42,10.67-3.42,16,0v-16H75V210z"/>
    <path class="img-balloon-loop" d="M90.96,201.66c-1.05,1-2.35,1.71-3.72,2.18c-1.38,0.48-2.84,0.72-4.31,0.72c-1.47,0-2.93-0.26-4.3-0.75
    c-1.37-0.49-2.66-1.21-3.7-2.21c1.42,0.26,2.75,0.52,4.07,0.7c1.32,0.17,2.63,0.25,3.94,0.27c1.31,0,2.62-0.07,3.94-0.23
    C88.21,202.17,89.54,201.92,90.96,201.66z"/>
    <ellipse class="img-balloon-highlight" cx="48.5" cy="48" rx="17.5" ry="21"/>
    </svg>`;
      this.elWrapBallon.append(iElImg);
    }
  }

  goWin() {
    const elBoxBallons = document.querySelectorAll(".box-baloon");
    const coordsField = this.elWrapBallon.getBoundingClientRect();
    const wField = coordsField.width;
    const hField = coordsField.height;

    elBoxBallons.forEach(
      function (el) {
        el.style.width = setting.perBallonWidthFromFieldWidth + "%";
        const hBaloon = el.getBoundingClientRect().height;
        el.style.transition =
          `all ${this._rnd(2, 4)}s` +
          ` cubic-bezier(${this._rnd(0, 5) / 10}, ${this._rnd(2, 5) / 10},` +
          `${this._rnd(5, 10) / 10},${this._rnd(5, 8) / 10})`;
        const intLeft = (parseInt(el.style.left, 10) / 100) * wField;
        el.style.transform = `translate(${this._rnd(
          -intLeft - wField / 2,
          wField - intLeft - setting.perBallonWidthFromFieldWidth + wField / 2
        )}px,${-hField - hBaloon}px)`;
        el.addEventListener("transitionend", function () {
          el.remove();
        });
      }.bind(this)
    );
    this.elWrapTextWin.classList.remove("winner__text--min");
    this.elWrapTextWin.classList.add("winner__text--max");
    elInputWin.style.opacity = "1";
    // elInputWin.focus();
  }
  _rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

class Court {
  sizeField;
  elCells;
  emptyCell;
  elBox;
  stepCheet = "";
  run = false;
  constructor(size) {
    elBtnStart.textContent = "START";
    elBtnDownSize.classList.remove("inactive");
    elBtnUpSize.classList.remove("inactive");
    elClock.textContent = "00:00";

    size ? (this.sizeField = size) : (this.sizeField = setting.defaultSize);
    this.emptyCell = "" + this.sizeField + this.sizeField;
    elContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="tags-grid"></div>`
    );
    this.elBox = document.querySelector(".tags-grid");
    this.elBox.style.gridTemplateColumns = `repeat(${this.sizeField}, 1fr);`;

    let varNum = 1;
    for (let i = 1; i <= this.sizeField; i++) {
      for (let j = 1; j <= this.sizeField; j++) {
        if (i != this.sizeField || j != this.sizeField) {
          this.elBox.insertAdjacentHTML(
            "beforeend",
            `<div class="item" ` +
              `data-num="${varNum}" ` +
              `data-home="${i}${j}" ` +
              `data-cell="${i}${j}" ` +
              `style="grid-area:${i}/${j}/${+i + 1}/${+j + 1};` +
              `background-image: url(img/${varNum}.svg);"></div>`
          );
          varNum++;
        }
      }
    }
    this.elCells = this.elBox.querySelectorAll(".item");
    //-- events
    this.elBox.addEventListener("click", this._pressCell.bind(this));
  }

  delete() {
    this.elBox.remove();
  }

  _checkCollected() {
    let res = true;
    this.elCells.forEach(function (el) {
      if (el.dataset.home != el.dataset.cell) {
        res = false;
      }
    });
    return res;
  }

  shuffle() {
    const sz = this.sizeField;
    const mixArr = this._randomArray(sz ** 2);
    // console.log(mixArr);
    this.elCells.forEach(function (el, i) {
      el.style.backgroundImage = `url("img/${mixArr[i]}.svg")`;
      el.dataset.home =
        `${Math.ceil(mixArr[i] / sz)}` +
        `${mixArr[i] % sz ? mixArr[i] % sz : sz}`;
    });
    return this;
  }

  // change place cells and animate them
  _pressCell(el) {
    const curEl = el.target;
    if (!curEl.classList.contains("item")) return;
    if (!this.run) {
      elBtnStart.style.backgroundColor = "#845ef7";
      elBtnStart.style.color = "#f3f0ff";
      setTimeout(function () {
        elBtnStart.style.backgroundColor = "";
        elBtnStart.style.color = "";
      }, 300);
      return;
    }
    if (this._checkNext(curEl)) {
      // press to correct cell
      this.stepCheet = "";
      const row = this.emptyCell[0];
      const col = this.emptyCell[1];
      this.emptyCell = curEl.dataset.cell;
      curEl.dataset.cell = row + col;
      //-- animation
      curEl.style.transition = "all 0.4s ";
      curEl.style.transform = `translate(${this._checkNext(curEl)})`;
      setTimeout(function () {
        curEl.style.gridArea = `${row}/${col}/${+row + 1}/${+col + 1}`;
        curEl.style.transition = "";
        curEl.style.transform = "";
      }, 400);
      this._paint(curEl);

      if (this._checkCollected()) {
        //- win event
        winEvent();
      }
    } else {
      // press to wrong cell
      curEl.style.transition = "all 0.1s";
      curEl.style.transform = `translate(0,0.5rem)`;
      setTimeout(function () {
        curEl.style.transform = "";
      }, 100);

      if (this.stepCheet && el.ctrlKey) {
        // just cheet  - only for administrator :)
        const elPrevCell = document.querySelector(
          `.item[data-cell='${this.stepCheet}']`
        );
        const c = curEl.dataset.cell;
        const s = curEl.style.gridArea;
        curEl.dataset.cell = elPrevCell.dataset.cell;
        curEl.style.gridArea = elPrevCell.style.gridArea;
        this._paint(curEl);
        elPrevCell.dataset.cell = c;
        elPrevCell.style.gridArea = s;
        this._paint(elPrevCell);
        this.stepCheet = "";
      }
      this.stepCheet = curEl.dataset.cell;
    }
  }
  //-- change color when right placed
  _paint(el) {
    if (el.dataset.home === el.dataset.cell) {
      el.style.backgroundColor = "#40c057";
    } else {
      el.style.backgroundColor = "#845ef7";
    }
  }

  // check if current cell next to emty cell
  _checkNext(el) {
    const numCell = el.dataset.cell;
    let res = "";
    const difR = +numCell[0] - +this.emptyCell[0];
    const difC = +numCell[1] - +this.emptyCell[1];
    if (Math.abs(difR) + Math.abs(difC) === 1)
      res = `${difC * (100 + this.sizeField)}%, ${
        difR * (100 + this.sizeField)
      }%`;
    return res;
  }

  _randomArray(size) {
    const arr = [];
    for (let i = 1; i < size; i++) arr.push(i);
    let tmpEl,
      rndIndx,
      i = arr.length;
    while (i !== 0) {
      rndIndx = Math.floor(Math.random() * i);
      i -= 1;
      tmpEl = arr[i];
      arr[i] = arr[rndIndx];
      arr[rndIndx] = tmpEl;
    }
    return arr;
  }
}
//-----------------------------------
//----- Begin body -----
//-----------------------------------

let playCourt = new Court();
const leaderBoard = new LeaderBoard();
const winCongrat = new CW();

// -- increase grid
elBtnUpSize.addEventListener("click", function () {
  let sizeGrid = +currentSize.textContent;
  if (elBtnUpSize.classList.contains("inactive")) return;
  sizeGrid++;
  reCreateCourt(sizeGrid);
  elBtnDownSize.classList.remove("inactive");
  if (sizeGrid === setting.maxSize) {
    elBtnUpSize.classList.add("inactive");
  }
});

// -- decrease grid
elBtnDownSize.addEventListener("click", function () {
  let sizeGrid = +currentSize.textContent;
  if (elBtnDownSize.classList.contains("inactive")) return;
  sizeGrid--;
  reCreateCourt(sizeGrid);
  elBtnUpSize.classList.remove("inactive");
  if (sizeGrid === setting.minSize) {
    elBtnDownSize.classList.add("inactive");
  }
});

// press START / PAUSE / GO
elBtnStart.addEventListener("click", function () {
  leaderBoard.getLeaderBoardCurrentMonth();
  if (elBtnStart.textContent === "START") {
    playCourt.run = true;
    elBtnDownSize.classList.add("inactive");
    elBtnUpSize.classList.add("inactive");
    const timeStart = Date.now();
    timer = window.setInterval(function () {
      const timeLast = new Date(Date.now() - timeStart);
      elClock.textContent = new Intl.DateTimeFormat("en-GB", {
        minute: "2-digit",
        second: "2-digit",
      }).format(timeLast);
    }, 1000);
    playCourt.shuffle();
    elBtnStart.textContent = "PAUSE";
  } else if (elBtnStart.textContent === "PAUSE") {
    playCourt.run = false;
    clearInterval(timer);
    elBtnStart.textContent = "GO";
  } else {
    // GO
    playCourt.run = true;
    elBtnStart.textContent = "PAUSE";
    const timeCur = new Date(0);
    timeCur.setMinutes(elClock.textContent.slice(0, 2));
    timeCur.setSeconds(elClock.textContent.slice(-2));
    const timeStart = new Date() - timeCur;
    timer = window.setInterval(function () {
      const timeLast = new Date(Date.now() - timeStart);
      // console.log(timeLast);
      elClock.textContent = new Intl.DateTimeFormat("en-GB", {
        minute: "2-digit",
        second: "2-digit",
      }).format(timeLast);
    }, 1000);
  }
});

//- press save button
elBtnSaveRes.addEventListener("click", function () {
  console.log(elInputName.textContent, "---", elInputName.value);
  const strQueryLB = `?n=${elInputName.value}&sc=${leaderBoard.hero.score}&sz=${currentSize.textContent}`;
  console.log(setting.urlLB + strQueryLB);
  fetch(setting.urlLB + strQueryLB)
    .then((response) => response.json)
    .then((data) => {
      leaderBoard.hero.nickName = elInputName.value;
      closeWin();
      leaderBoard.showLB();
    })
    .catch((err) => {
      console.log(err);
    });
});

//-- open leaderboard windows
elStrRes.addEventListener("click", function () {
  leaderBoard.showLB();
});
elBtnMonthDown.addEventListener("click", function () {
  // leaderBoard.changeMonth(-1);
  leaderBoard.prevMonth(
    monthToNum(elDateMonth.textContent),
    elDateYear.textContent
  );
});
elBtnMonthUp.addEventListener("click", function () {
  if (elBtnMonthUp.classList.contains("inactive")) return;
  // leaderBoard.changeMonth(1);
  leaderBoard.nextMonth(
    monthToNum(elDateMonth.textContent),
    elDateYear.textContent
  );
});

//-- close modal window
elBtnCloseWin.forEach((el) => el.addEventListener("click", closeWin));
elOverlay.addEventListener("click", closeWin);

//-- functions

function reCreateCourt(sizeGrid) {
  currentSize.textContent = sizeGrid;
  playCourt.delete();
  playCourt = new Court(sizeGrid);
}

function winEvent() {
  clearInterval(timer);
  leaderBoard.hero.score = elClock.textContent;
  elOverlay.classList.remove("hidden");
  elWinMsgCongrat.classList.remove("hidden");
  if (checkIfYouLeader(elClock.textContent)) {
    elInputWin.classList.remove("hidden");
  }
  winCongrat.loadBallons();
  winCongrat.goWin();
  reCreateCourt(+currentSize.textContent);
}

function checkIfYouLeader(time) {
  let res = false;
  if (leaderBoard.curMonthResults) {
    leaderBoard.curMonthResults.forEach(function (el) {
      if (el.score > time) res = true;
    });
    return res;
  }
}

function closeWin() {
  elOverlay.classList.add("hidden");
  elWinMsgCongrat.classList.add("hidden");
  elWinMsgResult.classList.add("hidden");
  elInputWin.classList.add("hidden");
  elInputWin.style.opacity = "0";
}

function monthToStr(month) {
  return monthNames[+month - 1];
}
function monthToNum(monthStr) {
  return monthNames.indexOf(monthStr) + 1;
}

document.addEventListener("keydown", function (ev) {
  if (ev.key === "." && ev.ctrlKey === true) {
    ev.preventDefault();
    winEvent();
  }
});
