"use strict";

const colorPicker = document.querySelector("#colorId");

colorPicker.addEventListener("input", displayChanges);

function displayChanges(e) {
  updateOutput(e.target.value);
  updateHex(e.target.value);
  const rgb = updateRgb(e.target.value);
  updateHsl(rgb);
}

function updateOutput(color) {
  document.querySelector(".output").style.backgroundColor = color;
}

function updateHex(hex) {
  document.querySelector(".hex > span").textContent = hex;
}

function updateRgb(hex) {
  let rgb = {};
  const hexStr = hex.slice(1);
  const red = parseInt(hexStr.substring(0, 2), 16);
  const green = parseInt(hexStr.substring(2, 4), 16);
  const blue = parseInt(hexStr.substring(4, 6), 16);
  document.querySelector(
    ".rgb > span"
  ).textContent = `${red}, ${green}, ${blue}`;
  return (rgb = {
    r: red,
    g: green,
    b: blue,
  });
}

function updateHsl(rgbObject) {
  let r = rgbObject.r;
  let g = rgbObject.g;
  let b = rgbObject.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  //console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing

  document.querySelector(".hsl > span").textContent = `${h.toFixed(
    0
  )}, ${s.toFixed(0)}%, ${l.toFixed(0)}%`;
}
