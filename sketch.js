let inputBox; // 宣告輸入框變數
let slider; // 宣告滑桿變數
let jumpButton; // 宣告按鈕變數
let dropdown; // 宣告下拉式選單變數
let isJumping = false; // 控制是否跳動的變數
let offsets = []; // 儲存每行文字的跳動偏移量

function setup() { //這是一個設定函數，只會執行一次
  // 產生一個畫布，充滿整個視窗，背景顏色為#ffc8dd
  createCanvas(windowWidth, windowHeight);
  background("#ffc8dd");

  // 建立輸入文字框
  inputBox = createInput("💖🐸🌹"); // 預設文字
  inputBox.position(10, 10); // 設定位置
  inputBox.size(300, 50); // 設定寬度和高度
  inputBox.style("font-size", "24px"); // 設定文字大小

  // 建立滑桿
  slider = createSlider(12, 120, 12); // 滑桿範圍從 12 到 120，預設值為 12
  slider.position(450, 25); // 設定滑桿位置
  slider.size(100); // 設定滑桿寬度

  // 建立按鈕
  jumpButton = createButton("跳動"); // 按鈕文字
  jumpButton.position(600, 20); // 設定按鈕位置
  jumpButton.size(100, 40); // 設定按鈕大小
  jumpButton.style("font-size", "18px"); // 設定按鈕文字大小
  jumpButton.mousePressed(toggleJump); // 設定按鈕按下時的行為

  // 建立下拉式選單
  dropdown = createSelect(); // 建立選單
  dropdown.position(800, 10); // 設定選單位置
  dropdown.size(100); // 設定選單寬度
  dropdown.option("淡江大學"); // 選項一
  dropdown.option("教育科技學系"); // 選項二
  dropdown.changed(handleDropdownChange); // 當選單改變時執行函數
}

function draw() { //這是一個設定函數，會一直執行
  background("#ffc8dd"); // 每次重繪背景，避免文字重疊
  fill(0); // 設定文字顏色
  textSize(24); // 設定文字大小
  text("文字大小", 350, 35); // 顯示文字

  let textSizeValue = slider.value(); // 根據滑桿的值設定文字大小
  textSize(textSizeValue); // 設定文字大小
  textAlign(LEFT, CENTER); // 設定文字對齊方式
  fill(0);
  stroke(0);
  strokeWeight(1);

  let textContent = inputBox.value(); // 取得輸入框的文字內容
  let textWidthWithSpace = textWidth(textContent) + 10; // 計算文字加字串間距的寬度
  let textHeight = textAscent() + textDescent() + 20; // 計算文字加行間距的高度
  let startY = 100; // 起始的 y 座標

  // 初始化偏移量陣列
  if (offsets.length === 0 || offsets.length !== Math.ceil(height / textHeight)) {
    offsets = Array(Math.ceil(height / textHeight)).fill(0).map(() => random(-5, 5));
  }

  for (let y = startY, row = 0; y < height; y += textHeight, row++) { // 從 y 座標開始，逐行顯示
    for (let x = 0; x < width; x += textWidthWithSpace) { // 從 x 座標開始，逐列顯示
      let yOffset = isJumping ? offsets[row] : 0; // 如果跳動，使用偏移量
      text(textContent, x, y + yOffset); // 顯示文字
    }
    if (isJumping) {
      offsets[row] = random(-5, 5); // 更新每行的跳動偏移量
    }
  }
}

function toggleJump() {
  isJumping = !isJumping; // 切換跳動狀態
}

function handleDropdownChange() {
  let selectedOption = dropdown.value(); // 取得選單的選擇值
  if (selectedOption === "淡江大學") {
    window.open("https://www.tku.edu.tw", "_blank"); // 開啟淡江大學官方網站
  }
}