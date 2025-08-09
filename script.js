document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const loginContainer = document.getElementById("loginContainer");
  const loadingScreen = document.getElementById("loadingScreen");
  const questionContainer = document.getElementById("questionContainer");
  const questionText = document.getElementById("questionText");
  const customInput = document.getElementById("customInput");
  const submitCustom = document.getElementById("submitCustom");
  const resultContainer = document.getElementById("resultContainer");
  const resultText = document.getElementById("resultText");
  const progress = document.getElementById("progress");

  const validUsername = "EMYEUANH";
  const validPassword = "ForeverLove@";
  const questions = [
    "Em có thích anh không?",
    "Anh có thể làm gì để em vui hơn?",
    "Em có muốn đi chơi cùng anh không?",
    "Em có muốn hẹn hò với anh không?",
    "Anh có thể giúp em điều gì không?",
  ];

  let currentQuestion = 0;
  let answers = [];
  let score = 0;
  let noCount = 0; // đếm số lần "Không"

  // Xử lý đăng nhập
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === validUsername && pass === validPassword) {
      loginContainer.classList.add("hidden");
      loadingScreen.classList.remove("hidden");
      setTimeout(showQuiz, 2000);
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  });

  // Hiển thị quiz
  function showQuiz() {
    loadingScreen.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  // Hiển thị câu hỏi
  function showQuestion() {
    if (currentQuestion >= questions.length) {
      showResult();
      return;
    }
    questionText.textContent = questions[currentQuestion];
    progress.style.width = ((currentQuestion) / questions.length) * 100 + "%";
    customInput.value = "";
    customInput.style.display = "none";
    submitCustom.classList.add("hidden");
  }

  // Khi chọn câu trả lời
  window.answerQuestion = function (choice) {
    // Điều kiện 1: "Không" ở câu đầu
    if (currentQuestion === 0 && choice === "Không") {
      window.location.href = "../the_end/index.html";
      return;
    }

    // Đếm số lần "Không"
    if (choice === "Không") {
      noCount++;
      if (noCount >= 3) {
        window.location.href = "../the_end/index.html";
        return;
      }
    }

    // Ghi lại câu trả lời
    answers.push(choice);

    // Tính điểm
    score += choice === "Có" ? 10 : choice === "Không" ? -5 : 5;

    // Sang câu tiếp theo
    currentQuestion++;
    setTimeout(showQuestion, 300);
  };

  // Khi chọn "Khác"
  window.showCustomInput = function () {
    customInput.style.display = "block";
    submitCustom.classList.remove("hidden");
  };

  // Gửi câu trả lời custom
  window.submitCustomAnswer = function () {
    const customAnswer = customInput.value.trim();
    if (customAnswer !== "") {
      answers.push(customAnswer);
      score += 5;
      currentQuestion++;
      showQuestion();
    }
  };

  // Kết quả cuối
  function showResult() {
    // Điều kiện 3: đạt điểm tối đa
    if (score >= questions.length * 10) {
      window.location.href = "../happy_ending/index.html";
      return;
    }

    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    let resultHTML = "";
    for (let i = 0; i < questions.length; i++) {
      resultHTML += `<p><b>${questions[i]}</b>: ${answers[i]}</p>`;
    }

    resultHTML += `<p><strong>Tổng điểm của em:</strong> ${score}</p>`;

    // Kết thúc khác
    let endingMessage = "";
    if (score >= 30) {
      endingMessage = `<p class="ending romantic">🌈 Mình có thể bắt đầu một hành trình nhẹ nhàng cùng nhau không? 😚</p>`;
    } else if (score >= 15) {
      endingMessage = `<p class="ending unsure">☁️ Vẫn còn nhiều điều chưa rõ... Nhưng anh không bỏ cuộc đâu!</p>`;
    } else if (score >= 0) {
      endingMessage = `<p class="ending effort">😥 Anh sẽ cố gắng hơn nữa để em mỉm cười mỗi ngày...</p>`;
    } else {
      endingMessage = `<p class="ending sad">💔 Em chê anh rồi... Nhưng anh vẫn luôn ở đây 😢</p>`;
    }

    resultHTML += endingMessage;
    resultText.innerHTML = resultHTML;
  }
});
