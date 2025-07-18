const app = document.getElementById('app');

let players = [];
let currentPlayerIndex = 0;
const questionsPerPlayer = 25;

// أسئلة مثال (تقدر تغيرها أو تزيد)
const questions = [
  "ما هو أكثر شيء تخاف منه؟",
  "ما هو أجمل ذكرى لديك؟",
  "هل سبق وكذبت على صديق؟",
  "ما هو سر لا تعرفه أي أحد؟",
  "من هو الشخص الذي تثق به أكثر؟",
  "هل تحب المفاجآت؟",
  "ما هو أكثر شيء تحبه في نفسك؟",
  "ما هو أسوأ عيب لديك؟",
  "هل سبق وحسدت أحدًا؟",
  "ما هو حلمك الأكبر؟",
  "ما هو أكثر شيء يجعلك سعيد؟",
  "هل تفضل العزلة أم الصحبة؟",
  "هل سبق وخسرت صديق بسبب كلمة؟",
  "ما هي طريقتك للتعامل مع الغضب؟",
  "هل تحب المغامرات؟",
  "ما هو أفضل شيء حدث لك هذا الأسبوع؟",
  "هل تؤمن بالحب من أول نظرة؟",
  "ما هو الشيء الذي تتمنى تغييره في حياتك؟",
  "هل تفضل العمل لوحدك أم ضمن فريق؟",
  "ما هو أكثر شيء تندم عليه؟",
  "هل تخاف من الفشل؟",
  "ما هو الشيء الذي يجعلك تشعر بالراحة؟",
  "هل سبق وفقدت شيئًا مهمًا؟",
  "ما هي أكبر نصيحة تلقيتها؟",
  "ما هو الشيء الذي يميزك عن الآخرين؟",
  "هل تحب المفاجآت؟",
  "ما هو الشيء الذي تكرهه في نفسك؟",
  "هل سبق وندمت على شيء فعلته؟",
  "ما هو أسوأ كذبة سمعتها؟",
  "ما هو الشيء الذي لا يمكنك العيش بدونه؟"
];

// سيحفظ الأسئلة التي تم توجيهها لكل لاعب لمنع التكرار
let askedQuestions = {};

// شاشة البداية
function showStartScreen() {
  app.innerHTML = `
    <h1>لعبة الصراحة</h1>
    <button id="nextBtn">التالي</button>
  `;

  document.getElementById('nextBtn').onclick = () => {
    showPlayerCountScreen();
  };
}

// شاشة اختيار عدد اللاعبين
function showPlayerCountScreen() {
  app.innerHTML = `
    <h2>حدد عدد اللاعبين</h2>
    <div id="playerCountContainer">
      <button id="minusBtn" aria-label="نقص">-</button>
      <span id="playerCount">1</span>
      <button id="plusBtn" aria-label="زيادة">+</button>
      <button id="confirmCountBtn" title="تأكيد العدد">✔️</button>
    </div>
    <div id="namesContainer"></div>
  `;

  let playerCount = 1;
  const minPlayers = 1;
  const maxPlayers = 10;

  const playerCountSpan = document.getElementById('playerCount');
  const minusBtn = document.getElementById('minusBtn');
  const plusBtn = document.getElementById('plusBtn');
  const confirmCountBtn = document.getElementById('confirmCountBtn');

  function updateCount(newCount) {
    if (newCount < minPlayers) newCount = minPlayers;
    if (newCount > maxPlayers) newCount = maxPlayers;
    playerCount = newCount;
    playerCountSpan.textContent = playerCount;
  }

  minusBtn.onclick = () => updateCount(playerCount - 1);
  plusBtn.onclick = () => updateCount(playerCount + 1);

  confirmCountBtn.onclick = () => {
    showNamesInputScreen(playerCount);
  };
}

// شاشة إدخال أسماء اللاعبين
function showNamesInputScreen(count) {
  app.innerHTML = `
    <h2>أدخل أسماء اللاعبين (${count})</h2>
    <div id="namesInputs"></div>
    <button id="confirmNamesBtn">✔️ تأكيد الأسماء</button>
  `;

  const namesInputsDiv = document.getElementById('namesInputs');
  for (let i = 1; i <= count; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `اسم اللاعب ${i}`;
    input.autocomplete = 'off';
    input.classList.add('nameInput');
    namesInputsDiv.appendChild(input);
  }

  document.getElementById('confirmNamesBtn').onclick = () => {
    const inputs = document.querySelectorAll('.nameInput');
    players = [];
    for (const input of inputs) {
      const val = input.value.trim();
      if (!val) {
        alert('يرجى إدخال جميع الأسماء');
        return;
      }
      players.push(val);
    }
    askedQuestions = {};
    showGameExplanationScreen();
  };
}

// شاشة شرح اللعبة
function showGameExplanationScreen() {
  app.innerHTML = `
    <h2>شرح اللعبة</h2>
    <p>
      - عند كل لاعب 25 سؤال<br />
      - تظهر الأسئلة عشوائي لكل لاعب بدون تكرار<br />
      - يقدر يجاوب أو يمرر السؤال<br />
      - يمكن يعطي السؤال لأي لاعب آخر باستخدام زر العكس<br />
      - عند انتهاء الأسئلة تنتهي اللعبة
    </p>
    <button id="startGameBtn">ابدأ اللعبة</button>
  `;

  document.getElementById('startGameBtn').onclick = () => {
    currentPlayerIndex = 0;
    askedQuestions = {};
    players.forEach(p => askedQuestions[p] = []);
    showQuestionScreen();
  };
}

// شاشة عرض السؤال
function showQuestionScreen() {
  app.innerHTML = `
    <h2>اللاعب الحالي: ${players[currentPlayerIndex]}</h2>
    <div id="questionBox">جارٍ تحميل السؤال...</div>
    <div id="questionControls">
      <button id="answerBtn">✅ جاوب</button>
      <button id="skipBtn">❌ تمرير</button>
      <button id="reverseBtn">🔁 عكس</button>
    </div>
    <div id="reverseSelect" style="display:none;"></div>
    <div>الأسئلة المتبقية: <span id="remainingCount"></span></div>
  `;

  const questionBox = document.getElementById('questionBox');
  const remainingCountSpan = document.getElementById('remainingCount');
  const reverseSelect = document.getElementById('reverseSelect');

  const currentPlayer = players[currentPlayerIndex];

  // احصل على سؤال عشوائي لم يعطه هذا اللاعب بعد
  const availableQuestions = questions.filter((q) => !askedQuestions[currentPlayer].includes(q));

  if (availableQuestions.length === 0) {
    alert(`انتهت أسئلة اللاعب ${currentPlayer}.`);

    // انتقل للاعب التالي أو نهاية اللعبة
    if (currentPlayerIndex + 1 < players.length) {
      currentPlayerIndex++;
      showQuestionScreen();
    } else {
      showGameOverScreen();
    }
    return;
  }

  // خذ سؤال عشوائي
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const currentQuestion = availableQuestions[randomIndex];
  questionBox.textContent = currentQuestion;
  remainingCountSpan.textContent = questionsPerPlayer - askedQuestions[currentPlayer].length;

  // زر الجواب
  document.getElementById('answerBtn').onclick = () => {
    askedQuestions[currentPlayer].push(currentQuestion);
    alert(`شكرًا لك على الإجابة!`);
    nextTurn();
  };

  // زر التمرير
  document.getElementById('skipBtn').onclick = () => {
    askedQuestions[currentPlayer].push(currentQuestion);
    alert(`تم تخطي السؤال.`);
    nextTurn();
  };

  // زر العكس (اختيار لاعب آخر)
  document.getElementById('reverseBtn').onclick = () => {
    reverseSelect.style.display = 'block';
    reverseSelect.innerHTML = '';

    players.forEach((player, idx) => {
      if (player !== currentPlayer) {
        const btn = document.createElement('button');
        btn.textContent = player;
        btn.onclick = () => {
          alert(`السؤال انعكس على ${player}!`);
          // نسجل السؤال عند اللاعب الجديد
          askedQuestions[player].push(currentQuestion);
          reverseSelect.style.display = 'none';
          nextTurn();
        };
        reverseSelect.appendChild(btn);
      }
    });

    if (reverseSelect.innerHTML === '') {
      reverseSelect.textContent = 'لا يوجد لاعبين آخرين للعكس.';
    }
  };
}

// انتقل للدور التالي
function nextTurn() {
  if (askedQuestions[players[currentPlayerIndex]].length >= questionsPerPlayer) {
    // اللاعب انتهى من أسئلته، انتقل للاعب التالي
    if (currentPlayerIndex + 1 < players.length) {
      currentPlayerIndex++;
      showQuestionScreen();
    } else {
      showGameOverScreen();
    }
  } else {
    // استمر مع نفس اللاعب
    showQuestionScreen();
  }
}

// شاشة انتهاء اللعبة
function showGameOverScreen() {
  app.innerHTML = `
    <h2>انتهت اللعبة</h2>
    <p>شكرًا للعب! يمكنك إعادة تشغيل اللعبة.</p>
    <button id="restartBtn">إعادة تشغيل</button>
  `;

  document.getElementById('restartBtn').onclick = () => {
    showStartScreen();
  };
}

// بدء اللعبة عند تحميل الصفحة
showStartScreen();
