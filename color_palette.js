"use strict";

window.addEventListener("DOMContentLoaded", start);

// start program when DOM content is loaded
function start() {
  document.querySelector("#color").addEventListener("input", changeColor);
  document.querySelector("#harmony").addEventListener("change", changeHarmony);
  setRandomColor();
}

// create object for storing chosen color and harmony
const palette = {
  color: "#000000",
  harmony: "Analogous",
};

const Color = {
  hex: "",
  rgb: "",
  hsl: "",
};

// generate random color and change the palette object
function setRandomColor() {
  const color = randomColor();
  const cssColor = getHexString(color);
  palette.color = cssColor;
  document.querySelector("#color").value = palette.color;
  // initialize calculations and changes on page load
  init();
}

// assemble object of random colors
function randomColor() {
  return {
    r: randomNumber(),
    g: randomNumber(),
    b: randomNumber(),
  };
}

// generate random color
function randomNumber() {
  return Math.floor(Math.random() * 255);
}

// update the palette object with newly chosen color
function changeColor(e) {
  palette.color = e.target.value;
  // initialize calculations and changes on user's choice
  init();
}

// update the palette object with newly chosen harmony
function changeHarmony(e) {
  palette.harmony = e.target.value;
  // initialize calculations and changes on user's choice
  init();
}

// initialize calculations and changes
function init() {
  // convert chosen color to hsl
  const hslChosen = rgbToHsl(hexToRgb(palette.color));

  // calculate other colors for color palette
  const colorsArray = calculateColors(hslChosen);

  // add color values in hex and rgb to the array
  addHexAndRgbValues(colorsArray);

  // output result of calculations
  displayChanges(colorsArray);
}

// hex to rgb function
function hexToRgb(hex) {
  const hexStr = hex.slice(1);
  const red = parseInt(hexStr.substring(0, 2), 16);
  const green = parseInt(hexStr.substring(2, 4), 16);
  const blue = parseInt(hexStr.substring(4, 6), 16);

  return {
    r: red,
    g: green,
    b: blue,
  };
}

// rgb to hsl function
function rgbToHsl(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

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

  return {
    h: `${h.toFixed(0)}`,
    s: `${s.toFixed(0)}`,
    l: `${l.toFixed(0)}`,
  };
}

function calculateColors(hsl) {
  let colorsArray = [];
  switch (palette.harmony) {
    case "Analogous":
      colorsArray = calculateAnalogousColors(hsl);
      break;
    case "Monochromatic":
      colorsArray = calculateMonochromaticColors(hsl);
      break;
    case "Triad":
      colorsArray = calculateTriadColors(hsl);
      break;
    case "Complementary":
      colorsArray = calculateComplementaryColors(hsl);
      break;
    case "Compound":
      colorsArray = calculateCompoundColors(hsl);
      break;
    case "Shades":
      colorsArray = calculateShadesColors(hsl);
      break;
  }
  return colorsArray;
}

// get array of analogous colors
function calculateAnalogousColors(hsl) {
  const color1 = calculateAnalogousColor(hsl, 20);
  const color2 = calculateAnalogousColor(hsl, 40);
  const color3 = calculateAnalogousColor(hsl, 60);
  const color4 = calculateAnalogousColor(hsl, 80);
  const color5 = createBaseColorObject(hsl);
  return [color1, color2, color3, color4, color5];
}

// get one analogous color
function calculateAnalogousColor(hsl, num) {
  const color = Object.create(Color);
  let hue = parseInt(hsl.h) + num;
  if (hue >= 360) {
    hue -= 360;
  }
  color.hsl = `${hue},${hsl.s},${hsl.l}`;
  return color;
}

// turn chosen color into object like other colors
function createBaseColorObject(hsl) {
  const color = Object.create(Color);
  color.hsl = `${hsl.h},${hsl.s},${hsl.l}`;
  return color;
}

// get array of monochromatic colors
function calculateMonochromaticColors(hsl) {
  const color1 = calculateMonochromaticColor(hsl, 10);
  const color2 = calculateMonochromaticColor(hsl, 20);
  const color3 = calculateMonochromaticColor(hsl, 30);
  const color4 = calculateMonochromaticColor(hsl, 40);
  const color5 = createBaseColorObject(hsl);
  return [color1, color2, color3, color4, color5];
}

// get one monochromatic color
function calculateMonochromaticColor(hsl, num) {
  const color = Object.create(Color);
  let saturation = parseInt(hsl.s) + num;
  if (parseInt(hsl.s) + num >= 100) {
    saturation = parseInt(hsl.s) - num;
  }
  color.hsl = `${hsl.h},${saturation},${hsl.l}`;
  return color;
}

// get array of triad colors
function calculateTriadColors(hsl) {
  const color1 = calculateTriadColor(hsl, 120, 0);
  const color2 = calculateTriadColor(hsl, 240, 0);
  const color3 = calculateTriadColor(hsl, 120, 10);
  const color4 = calculateTriadColor(hsl, 240, 20);
  const color5 = createBaseColorObject(hsl);
  return [color1, color2, color3, color4, color5];
}

// get one color where hue and lightness change
function calculateTriadColor(hsl, hueInc, lightInc) {
  const color = Object.create(Color);
  let hue = parseInt(hsl.h) + hueInc;
  if (hue >= 360) {
    hue -= 360;
  }
  let lightness = parseInt(hsl.l) + lightInc;
  if (parseInt(hsl.l) + lightInc >= 100) {
    lightness = parseInt(hsl.l) - lightInc;
  } else if (parseInt(hsl.l) + lightInc <= 0) {
    lightness = parseInt(hsl.l) + lightInc;
  }
  color.hsl = `${hue},${hsl.s},${lightness}`;
  return color;
}

// get array of complementary colors
function calculateComplementaryColors(hsl) {
  const color1 = calculateTriadColor(hsl, 180, 0);
  const color2 = calculateTriadColor(hsl, 180, 20);
  const color3 = calculateTriadColor(hsl, 0, 20);
  const color4 = calculateTriadColor(hsl, 0, 10);
  const color5 = createBaseColorObject(hsl);
  return [color1, color2, color3, color4, color5];
}

// get array of compound colors
function calculateCompoundColors(hsl) {
  const color1 = calculateTriadColor(hsl, 180, 0);
  const color2 = calculateTriadColor(hsl, 180, 20);
  const color3 = calculateAnalogousColor(hsl, 30);
  const color4 = calculateAnalogousColor(hsl, 60);
  const color5 = createBaseColorObject(hsl);
  return [color1, color2, color3, color4, color5];
}

// get array of shades colors
function calculateShadesColors(hsl) {
  const color1 = calculateShadesColor(hsl, 10);
  const color2 = calculateShadesColor(hsl, 20);
  const color3 = calculateShadesColor(hsl, 30);
  const color4 = calculateShadesColor(hsl, 40);
  const color5 = createBaseColorObject(hsl);
  return [color1, color2, color3, color4, color5];
}

// get one shades color
function calculateShadesColor(hsl, num) {
  const color = Object.create(Color);
  let lightness = parseInt(hsl.l) + num;
  if (lightness >= 100) {
    lightness -= 100;
  }
  color.hsl = `${hsl.h},${hsl.s},${lightness}`;
  return color;
}

// add rgb, hex and hsl like object
function addHexAndRgbValues(colorsArray) {
  colorsArray.forEach((color) => {
    const hsl = getColorObjectHsl(color.hsl);
    const rgb = getColorObjectRgb(hsl);
    const hex = getHexString(rgb);
    color.hex = hex;
    color.rgb = rgb;
    color.hsl = hsl;
  });
}

// color string into color object conversion
function getColorObjectHsl(string) {
  const hue = string.substring(0, string.indexOf(","));
  const saturation = string.substring(
    string.indexOf(",") + 1,
    string.lastIndexOf(",")
  );
  const lightness = string.slice(string.lastIndexOf(",") + 1);
  return {
    h: parseInt(hue),
    s: parseInt(saturation),
    l: parseInt(lightness),
  };
}

// hsl to rgb function
function getColorObjectRgb(hsl) {
  const h = hsl.h;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  const red = Math.round((r + m) * 255);
  const green = Math.round((g + m) * 255);
  const blue = Math.round((b + m) * 255);

  return {
    r: red,
    g: green,
    b: blue,
  };
}

// rgb to hex function
function getHexString(rgb) {
  let hex = "#";

  hex += getBasicHexColor(rgb.r);
  hex += getBasicHexColor(rgb.g);
  hex += getBasicHexColor(rgb.b);

  return hex;
}

// get two hex numbers for every color (reg, green, and blue)
function getBasicHexColor(rgbNumber) {
  let twoOfHex = "";
  const char1 = Math.floor(rgbNumber / 16);
  twoOfHex += getHexChar(char1);
  const char2 = rgbNumber % 16;
  twoOfHex += getHexChar(char2);
  return twoOfHex;
}

// turn hex number to hex character
function getHexChar(num) {
  if (num >= 0 && num <= 9) {
    return num;
  } else if (num === 10) {
    return "A";
  } else if (num === 11) {
    return "B";
  } else if (num === 12) {
    return "C";
  } else if (num === 13) {
    return "D";
  } else if (num === 14) {
    return "E";
  } else if (num === 15) {
    return "F";
  }
}

// output result of calculations function
function displayChanges(colorsArray) {
  const colorFields = document.querySelectorAll(".color_wrapper");
  colorFields.forEach((field, index) => {
    field.querySelector(".color").style.backgroundColor =
      colorsArray[index].hex;
    field.querySelector(
      ".hex > span"
    ).textContent = `(${colorsArray[index].hex})`;
    field.querySelector(
      ".rgb > span"
    ).textContent = `(${colorsArray[index].rgb.r}, ${colorsArray[index].rgb.g}, ${colorsArray[index].rgb.b})`;
    field.querySelector(
      ".hsl > span"
    ).textContent = `(${colorsArray[index].hsl.h}, ${colorsArray[index].hsl.s}%, ${colorsArray[index].hsl.l}%)`;
  });
}
