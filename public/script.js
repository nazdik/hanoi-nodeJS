"use strict";
import * as d3 from "https://cdn.skypack.dev/d3@7";
//First of all, hamash taghsire Vahide, Then, Love you Sadegh :)

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const reset = document.querySelector(".reset");
const targetStep = document.querySelector(".target");
const disksInput = document.querySelector("#disks-no");
let dn;
let Disks;
let stp;
let target;
prev.disabled = true;

function hanoi(n) {
  let steps = ["SE"];
  for (let i = 1; i < n; i++) {
    steps = [...changeEnd(steps), "SE", ...changeStart(steps)];
  }
  return steps;

  function changeStart(steps) {
    return steps
      .join()
      .replace(/S/g, "X")
      .replace(/T/g, "S")
      .replace(/X/g, "T")
      .split(",");
  }
  function changeEnd(steps) {
    return steps
      .join()
      .replace(/E/g, "X")
      .replace(/T/g, "E")
      .replace(/X/g, "T")
      .split(",");
  }
}

const canvas = d3.select(".canvas");
const svg = canvas
  .append("svg")
  .attr("width", 990)
  .attr("height", 500)
  .style("background-color", "#EEF3FA")
  .style("margin", 0)
  .style("padding", 0);

const bars = svg.append("g");
const prog = svg.append("g");
const text = svg.append("g");
const svgDisk = svg.append("g");
bars
  .append("rect")
  .attr("width", 12)
  .attr("height", 300)
  .attr("fill", "#14437D")
  .attr("x", 160)
  .attr("y", 130)
  .attr("rx", 4);
bars
  .append("rect")
  .attr("width", 12)
  .attr("height", 300)
  .attr("fill", "#14437D")
  .attr("x", 490)
  .attr("y", 130)
  .attr("rx", 4);
bars
  .append("rect")
  .attr("width", 12)
  .attr("height", 300)
  .attr("fill", "#14437D")
  .attr("x", 820)
  .attr("y", 130)
  .attr("rx", 4);

bars
  .append("rect")
  .attr("width", 950)
  .attr("height", 50)
  .attr("fill", "#14437D")
  .attr("x", 20)
  .attr("y", 420)
  .attr("rx", 8);
prog
  .append("rect")
  .attr("width", 975)
  .attr("height", 11)
  .attr("fill", "#e6ffff")
  .attr("x", 5)
  .attr("y", 5)
  .attr("rx", 8);
prog
  .append("rect")
  .attr("width", 0)
  .attr("height", 11)
  .attr("fill", "#33ccff")
  .attr("x", 5)
  .attr("y", 5)
  .attr("rx", 8)
  .attr("id", "prog");
text
  .append("text")
  .attr("y", 452)
  .attr("x", 132)
  .attr("fill", "white")
  .text("START")
  .style("font-family", "Montserrat")
  .style("font-size", 22);

text
  .append("text")
  .attr("y", 452)
  .attr("x", 805)
  .attr("fill", "white")
  .text("END")
  .style("font-family", "Montserrat")
  .style("font-size", 22)
  .attr("class", "end");
text
  .append("text")
  .attr("y", 452)
  .attr("x", 468)
  .attr("fill", "white")
  .text("TEMP")
  .style("font-family", "Montserrat")
  .style("font-size", 22);
svgDisk.append();

class Disk {
  constructor(width, height, x, y, fill, rx, clas, pos) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.rx = 12;
    this.fill = fill;
    this.class = clas;
    this.pos = "S";
  }
  move(step) {
    switch (step) {
      case "SE":
        this.x += 660;
        this.pos = "E";
        break;

      case "ST":
        this.x += 330;
        this.pos = "T";
        break;

      case "TE":
        this.x += 330;
        this.pos = "E";
        break;

      case "TS":
        this.x -= 330;
        this.pos = "S";
        break;

      case "ET":
        this.x -= 330;
        this.pos = "T";
        break;

      case "ES":
        this.x -= 660;
        this.pos = "S";
        break;
    }
  }
}
function generateDisks(n) {
  Disks = [];

  Disks.push(
    // generation the first disc
    new Disk(
      260,
      260 / n,
      33,
      419 - 260 / n,
      "red",
      12,
      `disk--${n - 1} disk`,
      "S"
    )
  );
  for (let i = 0; i < n - 1; i++) {
    //generating the rest disks
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    Disks.push(
      new Disk(
        Disks[i].width - Disks[i].width / n,
        Disks[0].width / n,
        Disks[i].x + Disks[i].width / (2 * n),
        Disks[i].y - Disks[i].height - 0.1,
        randomColor,
        12,
        `disk--${n - i - 2} disk`,
        "S"
      )
    );
  }
  // Disks.reverse();
  return Disks;
}
//

function renderDisk(Disks) {
  const svg = d3.select("svg");
  const rectDisk = svg
    .selectAll("rect.disk")
    .data(Disks)
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height)
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("rx", (d) => d.rx)
    .attr("fill", (d) => d.fill)
    .attr("class", (d) => d.class);

  rectDisk
    .enter()
    .append("rect")
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.height)
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("rx", (d) => d.rx)
    .attr("fill", (d) => d.fill)
    .attr("class", (d) => d.class);
}
//
function depictDisks(n) {
  generateDisks(n);
  renderDisk(Disks);
}

//
disksInput.addEventListener("input", (e) => {
  svg.selectAll(".disk").remove();
  svg.selectAll(".warnning").remove();
  targetStep.classList.remove("target-over");

  e.preventDefault();
  svg.select("#prog").attr("width", 0);
  next.disabled = false;
  stp = 0;
  dn = disksInput.value;

  depictDisks(dn);

  target = 2 ** dn - 1;
  targetStep.innerText = Number(target - stp).toLocaleString("en");
});

next.addEventListener("click", (e) => {
  e.preventDefault();
  if (dn <= 20) {
    prev.disabled = false;
    targetStep.innerText = 2 ** dn - 1 - stp - 1;
    const diskHeight = 260 / dn;
    const step = hanoi(dn)[stp];
    const from = step.slice(0, 1);
    const to = step.slice(1, 2);

    const movingDisk = Disks.filter((d) => d.pos === from).reduce(function (
      prev,
      current
    ) {
      return prev.y < current.y ? prev : current;
    });

    const alreadyAtTo = Disks.filter((d) => d.pos === to).length;

    movingDisk.move(step);
    const newY = 419 - (alreadyAtTo + 1) * diskHeight;
    movingDisk.y = newY;

    svg.selectAll(".disk").remove();

    renderDisk(Disks);

    stp === target ? stp : stp++;
    stp === target ? (next.disabled = true) : (next.disabled = false);
    let prog = disksInput.value != "" ? stp / target : 0;
    targetStep.innerText = target - stp;
    svg.select("#prog").attr("width", `${prog * 975}`);
  } else {
    targetStep.classList.add("target-over");
    svg
      .append("svg:image")
      .attr("xlink:href", "img/shocked.svg")
      .attr("width", 400)
      .attr("class", "warnning")
      .attr("height", 400)
      .attr("x", 290)
      .attr("y", 40);
    text
      .append("text")
      .attr("class", "warnning")
      .attr("y", 40)
      .attr("x", 65)
      .attr("fill", "red")
      .text("Look at steps! It takes years. Max disks is 20.")
      .style("font-family", "Montserrat")
      .style("font-size", 35)
      .style("font-weight", 550);
  }
});

prev.addEventListener("click", (e) => {
  e.preventDefault();

  const diskHeight = 260 / dn;
  let step = hanoi(dn)[stp - 1];
  const to = step.slice(0, 1);
  const from = step.slice(1, 2);
  const nstep = from + to;

  console.log(
    "step",
    nstep,
    "from:",
    from,
    "postion from",
    Disks.filter((d) => d.pos === from)
  );

  const movingDisk = Disks.filter((d) => d.pos === from).reduce(function (
    prev,
    current
  ) {
    return prev.y < current.y ? prev : current;
  });

  const alreadyAtTo = Disks.filter((d) => d.pos === to).length;

  movingDisk.move(nstep);
  const newY = 419 - (alreadyAtTo + 1) * diskHeight;
  movingDisk.y = newY;

  svg.selectAll(".disk").remove();

  stp === 1 ? (prev.disabled = true) : (prev.disabled = false);
  // stp === 1 ? (prev.disabled = true) : stp--;

  stp--;
  let prog = disksInput.value != "" ? stp / target : 0;
  targetStep.innerText = target - stp;
  svg.select("#prog").attr("width", `${prog * 975}`);
  renderDisk(Disks);
});
next.disabled = true;
reset.addEventListener("click", (e) => {
  e.preventDefault();
  targetStep.innerText = "?";
  disksInput.value = "";
  next.disabled = true;
  prev.disabled = true;
  targetStep.classList.remove("target-over");
  svg.selectAll(".disk").remove();
  svg.selectAll(".warnning").remove();
  svg.select("#prog").attr("width", 0);
  Disks = [];
  dn = stp = 0;
});
