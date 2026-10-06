// 儲存所有測驗題目
const questions = [
  {
    // 設定第一題題目
    question: "在 JavaScript 中，哪一個指令可以在主控台顯示文字？",

    // 設定第一題的四個選項
    options: [
      "console.log()",
      "print.text()",
      "show.message()",
      "display.console()"
    ],

    // 設定正確答案的索引值
    answer: 0
  },

  {
    // 設定第二題題目
    question: "在 p5.js 中，哪一個函式只會在程式開始時執行一次？",

    // 設定第二題的四個選項
    options: [
      "draw()",
      "setup()",
      "start()",
      "begin()"
    ],

    // 設定正確答案的索引值
    answer: 1
  },

  {
    // 設定第三題題目
    question: "在 JavaScript 中，哪一個關鍵字可以宣告常數？",

    // 設定第三題的四個選項
    options: [
      "var",
      "let",
      "const",
      "constant"
    ],

    // 設定正確答案的索引值
    answer: 2
  },

  {
    // 設定第四題題目
    question: "在 p5.js 中，哪一個函式會持續重複執行？",

    // 設定第四題的四個選項
    options: [
      "setup()",
      "draw()",
      "loopStart()",
      "repeat()"
    ],

    // 設定正確答案的索引值
    answer: 1
  },

  {
    // 設定第五題題目
    question: "哪一個運算子可以判斷兩個值是否完全相等？",

    // 設定第五題的四個選項
    options: [
      "=",
      "+=",
      "===",
      "=>"
    ],

    // 設定正確答案的索引值
    answer: 2
  }
];

// 儲存目前題目編號
let currentQuestion = 0;

// 儲存答對題數
let correctCount = 0;

// 儲存使用者選取的選項編號
let selectedOption = -1;

// 記錄目前題目是否已作答
let hasAnswered = false;

// 記錄使用者是否答錯
let isWrong = false;

// 儲存選項的水平位置
let optionX = 0;

// 儲存選項的寬度
let optionWidth = 0;

// 設定選項高度
let optionHeight = 55;

// 設定選項之間的間距
let optionGap = 12;

// 設定第一個選項的垂直位置
let optionStartY = 220;

// 儲存下一題按鈕的水平位置
let nextX = 0;

// 儲存下一題按鈕的垂直位置
let nextY = 0;

// 設定下一題按鈕寬度
let nextWidth = 180;

// 設定下一題按鈕高度
let nextHeight = 50;

// 儲存重新開始按鈕的水平位置
let restartX = 0;

// 儲存重新開始按鈕的垂直位置
let restartY = 0;

// 設定重新開始按鈕寬度
let restartWidth = 210;

// 設定重新開始按鈕高度
let restartHeight = 50;

// p5.js 初始化函式
function setup() {
  // 建立符合瀏覽器視窗大小的畫布
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平與垂直置中
  textAlign(CENTER, CENTER);

  // 設定文字字型
  textFont("Arial");

  // 設定畫面更新速度
  frameRate(60);

  // 計算所有版面位置
  updateLayout();
}

// p5.js 主要繪圖函式
function draw() {
  // 重新計算版面位置
  updateLayout();

  // 設定畫布背景顏色
  background(244, 245, 251);

  // 判斷是否完成所有題目
  if (currentQuestion >= questions.length) {
    // 顯示結果畫面
    drawResult();

    // 結束這一次繪圖
    return;
  }

  // 顯示測驗標題
  drawHeader();

  // 顯示題目
  drawQuestion();

  // 顯示所有選項
  drawOptions();

  // 判斷是否已經作答
  if (hasAnswered === true) {
    // 顯示下一題按鈕
    drawNextButton();
  }
}

// 計算畫面版面配置
function updateLayout() {
  // 設定選項最大寬度，並限制左右邊界
  optionWidth = Math.min(width - 80, 720);

  // 將選項水平置中
  optionX = width / 2 - optionWidth / 2;

  // 判斷畫面高度是否較小
  if (height < 650) {
    // 設定較小的選項高度
    optionHeight = 45;

    // 設定較小的選項間距
    optionGap = 8;

    // 將選項往上移動
    optionStartY = 185;
  } else {
    // 設定一般選項高度
    optionHeight = 55;

    // 設定一般選項間距
    optionGap = 12;

    // 設定一般選項起始位置
    optionStartY = 220;
  }

  // 將下一題按鈕水平置中
  nextX = width / 2 - nextWidth / 2;

  // 計算下一題按鈕的垂直位置
  nextY =
    optionStartY +
    4 * (optionHeight + optionGap) +
    10;
}

// 繪製標題與題數
function drawHeader() {
  // 設定標題顏色
  fill(37, 40, 73);

  // 設定標題文字大小
  textSize(28);

  // 設定標題文字粗細
  textStyle(BOLD);

  // 設定文字水平置中
  textAlign(CENTER, CENTER);

  // 顯示測驗標題
  text("程式設計簡易指令測驗", width / 2, 40);

  // 設定題數文字顏色
  fill(104, 107, 136);

  // 設定題數文字大小
  textSize(16);

  // 設定題數文字為正常粗細
  textStyle(NORMAL);

  // 顯示目前題數
  text(
    "第 " + (currentQuestion + 1) + " 題 / 共 " + questions.length + " 題",
    width / 2,
    78
  );
}

// 繪製題目
function drawQuestion() {
  // 取得目前題目資料
  let q = questions[currentQuestion];

  // 設定題目文字顏色
  fill(37, 40, 73);

  // 設定題目文字大小
  textSize(20);

  // 設定題目文字粗細
  textStyle(BOLD);

  // 設定題目文字區域寬度
  let questionWidth = Math.min(width - 80, 720);

  // 計算題目文字區域的左側位置
  let questionX = width / 2 - questionWidth / 2;

  // 設定題目文字區域的垂直位置
  let questionY = 110;

  // 將題目限制在畫布中央區域並自動換行
  text(
    q.question,
    questionX,
    questionY,
    questionWidth,
    80
  );
}

// 繪製四個選項
function drawOptions() {
  // 取得目前題目資料
  let q = questions[currentQuestion];

  // 逐一繪製四個選項
  for (let i = 0; i < q.options.length; i++) {
    // 計算目前選項的垂直位置
    let y = optionStartY + i * (optionHeight + optionGap);

    // 設定選項跳動的位移量
    let jump = 0;

    // 判斷是否讓正確選項上下跳動
    if (
      hasAnswered === true &&
      isWrong === true &&
      i === q.answer
    ) {
      // 使用正弦函式產生上下跳動效果
      jump = Math.sin(millis() * 0.01) * 8;
    }

    // 將跳動位移量加入選項位置
    y += jump;

    // 設定選項預設背景顏色
    fill(255, 255, 255);

    // 如果答對，將正確選項顯示為綠色
    if (
      hasAnswered === true &&
      isWrong === false &&
      i === selectedOption
    ) {
      // 設定答對顏色
      fill(88, 184, 137);
    }

    // 如果答錯，將正確選項設定為 #6d72c3
    if (
      hasAnswered === true &&
      isWrong === true &&
      i === q.answer
    ) {
      // 設定正確答案背景色
      fill("#6d72c3");
    }

    // 如果答錯，將使用者選錯的選項設定為紅色
    if (
      hasAnswered === true &&
      isWrong === true &&
      i === selectedOption
    ) {
      // 設定錯誤答案背景色
      fill(229, 139, 139);
    }

    // 設定選項外框顏色
    stroke(201, 203, 224);

    // 設定選項外框粗細
    strokeWeight(2);

    // 繪製選項圓角矩形
    rect(optionX, y, optionWidth, optionHeight, 10);

    // 設定選項文字顏色
    fill(37, 40, 73);

    // 設定選項文字大小
    textSize(17);

    // 設定文字為正常粗細
    textStyle(NORMAL);

    // 讓選項文字保持水平置中
    textAlign(CENTER, CENTER);

    // 顯示選項文字
    text(
      q.options[i],
      width / 2,
      y + optionHeight / 2
    );
  }
}

// 繪製下一題按鈕
function drawNextButton() {
  // 設定按鈕背景顏色
  fill(37, 40, 73);

  // 設定按鈕外框顏色
  stroke(37, 40, 73);

  // 設定按鈕外框粗細
  strokeWeight(2);

  // 繪製下一題按鈕
  rect(nextX, nextY, nextWidth, nextHeight, 10);

  // 設定按鈕文字顏色
  fill(255, 255, 255);

  // 設定按鈕文字大小
  textSize(17);

  // 設定按鈕文字粗細
  textStyle(BOLD);

  // 判斷目前是否為最後一題
  if (currentQuestion === questions.length - 1) {
    // 顯示查看結果文字
    text(
      "查看結果",
      width / 2,
      nextY + nextHeight / 2
    );
  } else {
    // 顯示下一題文字
    text(
      "下一題",
      width / 2,
      nextY + nextHeight / 2
    );
  }
}

// 繪製測驗結果
function drawResult() {
  // 設定結果標題顏色
  fill(37, 40, 73);

  // 設定結果標題大小
  textSize(34);

  // 設定結果標題粗細
  textStyle(BOLD);

  // 設定文字水平置中
  textAlign(CENTER, CENTER);

  // 顯示完成文字
  text("測驗完成！", width / 2, height / 2 - 100);

  // 設定答對題數顏色
  fill("#6d72c3");

  // 設定答對題數文字大小
  textSize(28);

  // 顯示答對題數
  text(
    "你答對了 " + correctCount + " / " + questions.length + " 題",
    width / 2,
    height / 2 - 40
  );

  // 計算重新開始按鈕的水平位置
  restartX = width / 2 - restartWidth / 2;

  // 計算重新開始按鈕的垂直位置
  restartY = height / 2 + 30;

  // 設定重新開始按鈕背景顏色
  fill(37, 40, 73);

  // 設定重新開始按鈕外框顏色
  stroke(37, 40, 73);

  // 繪製重新開始按鈕
  rect(
    restartX,
    restartY,
    restartWidth,
    restartHeight,
    10
  );

  // 設定按鈕文字顏色
  fill(255, 255, 255);

  // 設定按鈕文字大小
  textSize(17);

  // 設定按鈕文字粗細
  textStyle(BOLD);

  // 顯示重新開始文字
  text(
    "重新開始測驗",
    width / 2,
    restartY + restartHeight / 2
  );
}

// 判斷滑鼠是否在指定矩形內
function isInside(x, y, w, h) {
  // 回傳滑鼠是否位於指定範圍
  return (
    mouseX >= x &&
    mouseX <= x + w &&
    mouseY >= y &&
    mouseY <= y + h
  );
}

// 處理滑鼠點擊事件
function mousePressed() {
  // 判斷是否已完成所有題目
  if (currentQuestion >= questions.length) {
    // 判斷是否點擊重新開始按鈕
    if (
      isInside(
        restartX,
        restartY,
        restartWidth,
        restartHeight
      )
    ) {
      // 回到第一題
      currentQuestion = 0;

      // 將答對題數歸零
      correctCount = 0;

      // 清除選取的答案
      selectedOption = -1;

      // 設定尚未作答
      hasAnswered = false;

      // 清除答錯狀態
      isWrong = false;
    }

    // 結束滑鼠事件
    return;
  }

  // 取得目前題目資料
  let q = questions[currentQuestion];

  // 如果尚未作答，檢查是否點擊選項
  if (hasAnswered === false) {
    // 逐一檢查四個選項
    for (let i = 0; i < q.options.length; i++) {
      // 計算目前選項位置
      let y = optionStartY + i * (optionHeight + optionGap);

      // 判斷滑鼠是否點擊目前選項
      if (
        isInside(
          optionX,
          y,
          optionWidth,
          optionHeight
        )
      ) {
        // 記錄使用者選取的選項
        selectedOption = i;

        // 設定目前題目已作答
        hasAnswered = true;

        // 判斷使用者是否答錯
        isWrong = selectedOption !== q.answer;

        // 如果答對，將答對題數加一
        if (isWrong === false) {
          // 增加答對題數
          correctCount++;
        }

        // 結束選項檢查
        break;
      }
    }

    // 結束滑鼠事件
    return;
  }

  // 如果已經作答，判斷是否點擊下一題按鈕
  if (
    isInside(
      nextX,
      nextY,
      nextWidth,
      nextHeight
    )
  ) {
    // 移至下一題
    currentQuestion++;

    // 清除選取的選項
    selectedOption = -1;

    // 設定尚未作答
    hasAnswered = false;

    // 清除答錯狀態
    isWrong = false;
  }
}

// 當瀏覽器視窗大小改變時執行
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 重新計算畫面版面
  updateLayout();
}