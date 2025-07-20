const app = document.getElementById('app');

let players = [];
let currentPlayerIndex = 0;
const questionsPerPlayer = 25; // هذا للحساب فقط ما نستخدمه بشكل مباشر

// أسئلة المثال
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
  "ما هو أجمل موقف حصل معك في حياتك؟",
  "هل سبق وأحببت شخصًا في السر؟",
  "ما الشيء الذي تخاف أن يخسره منك الناس؟",
"هل تندم على قرار اتخذته مؤخرًا؟",
" ما أكثر صفة تحبها في نفسك؟",
" هل تؤمن بالحب من أول نظرة؟",
" ما هو أكثر سر تحتفظ به حتى الآن؟",
" هل سبق وأن كسرت قلب أحدهم؟",
" ما هو الشيء الذي يجعلك تبتسم فورًا؟",
"هل تخاف من الفشل؟",
" ما أجمل مكان زرته في حياتك؟",
"هل تحب أن تكون محط أنظار الآخرين؟",
" ما أكثر شيء يجعلك تغضب بسرعة؟",
" هل لديك حلم تتمنى تحقيقه؟",
". ما هو أكثر شيء تحبه في أصدقائك؟",
" هل أنت شخص صبور أم سريع الغضب؟",
" ما أغرب عادة تقوم بها؟",
" هل تفضل الوحدة أم الصحبة؟",
" ما هو موقف محرج لا تنساه؟",
" هل تفضل أن تعيش في الماضي أم المستقبل؟",
" ما هي أفضل نصيحة حصلت عليها؟",
" هل تستطيع أن تسامح بسهولة؟",
"ما الشيء الذي لا يمكنك التنازل عنه في حياتك؟",
"هل تؤمن أن الإنسان يتغير؟",
" ما هي أكثر لحظة شعرت فيها بالسعادة؟",
" هل تخاف من المجهول؟",
"ما هو أكثر شيء تعلمته من تجربة فاشلة؟",
" هل سبق وأن حلمت حلمًا تحقق؟",
"ما الشيء الذي تتمنى أن تفعله ولم تفعل بعد؟",
"هل تود أن تغير شيء في شخصيتك؟",
"هل تفضل أن تعيش حياة هادئة أم مليئة بالمغامرات؟",
" ما أكثر شيء يزعجك في الآخرين؟",
" هل تؤمن بالصداقة بين الرجل والمرأة؟",
"ما هو أكبر تحدي واجهته في حياتك؟",
"هل سبق وأن تعرضت لخيانة؟",
" هل أنت من النوع الذي يسامح بسرعة أم يصعب عليه ذلك؟",
"ما أكثر مكان تود زيارته ولم تزرها بعد؟",
"هل تؤمن بالقدر أم ترى أن الإنسان يصنع مستقبله بنفسه؟",
"ما هي اللحظة التي غيرت حياتك؟",
" هل لديك سر تود مشاركته؟",
" ما هو أكثر شيء تخشاه في الحياة؟",
" هل أنت راضٍ عن نفسك الآن؟",
" ما هو أجمل هدية تلقيتها؟",
"هل تفضل العيش في المدينة أم في الريف؟",
"هل سبق وأن تركت صديقًا بسبب مشكلة صغيرة؟",
" هل تعتقد أن المال يصنع السعادة؟",
"ما هو أسوأ موقف تعرضت له في المدرسة أو العمل؟",
" هل تحب أن تخطط لكل شيء أم تترك الأمور تأخذ مجراها؟",
"ما هي أكثر كلمة تؤلمك إذا سمعتها؟",
"هل سبق وأن وقفت مع شخص في موقف صعب؟",
"هل تفضل أن تكون مشهورًا أم سعيدًا؟",
" ما هو الشيء الذي يجعلك تشعر بالأمان؟",
" هل تحب التحدث عن مشاكلك مع الآخرين؟",
" هل سبق وأن شعرت بالغيرة من نجاح شخص ما؟",
"ما هو أجمل حلم حلمته؟",
" هل تؤمن أن الناس تتغير للأفضل أم للأسوأ؟",
"ما هو الشيء الذي تفتخر به في نفسك؟",
" هل تحب المفاجآت أم تكرهها؟",
" ما هي أكثر صفة تحب أن تراها في شريك حياتك؟",
"هل أنت من النوع الذي يحب المخاطرة؟",
"هل سبق وأن خسرت شيئًا عزيزًا عليك؟",
" هل تحب أن تكون مركز الاهتمام؟",
"ما هو أكثر شيء تفتقده الآن؟",
"هل تؤمن بالحب الحقيقي؟",
" ما هو أسوأ كذبة سمعتها؟",
" هل تفضل الحياة الهادئة أم المثيرة؟",
" ما هو أكثر موقف جعلك تضحك بشدة؟",
"هل لديك عادة تود التخلص منها؟",
" ما هو الشيء الذي يجعلك تبكي بدون سبب واضح؟",
" هل تفضل أن تعيش مع عائلتك أم بمفردك؟",
" ما هو الشيء الذي تحبه في أصدقائك؟",
" هل سبق وأن خسرت صديقًا عزيزًا؟",
"هل تؤمن بالصداقة بين الجنسين؟",
"ما هي أكثر نصيحة أعطيتك قيمة؟",
"هل تحب أن تكون صادقًا دائمًا حتى لو تسبب في جرح الآخرين؟",
"هل أنت شخص متفائل أم متشائم؟",
"ما هو أكثر شيء تعلمته من تجربة صعبة؟",
" هل تحب السفر؟ وما هو أفضل مكان زرته؟",
" هل تخاف من التغيير؟",
" هل تفضل البقاء في منطقة الراحة أم المغامرة؟",
"ما هو أكثر شيء يجعلك سعيدًا؟",
" هل لديك حلم لم تتحقق بعد؟",
" ما هو الشيء الذي تود تغييره في حياتك؟",
" هل سبق وأن أخفيت مشاعرك عن أحد؟",
" ما هو أكثر سر تحتفظ به؟",
" هل تحب أن تعبر عن مشاعرك بصراحة؟",
" ما هي أكثر لحظة شعرت فيها بالفخر؟",
". هل تحب القراءة؟ وما هو كتابك المفضل؟",
" هل أنت شخص اجتماعي أم تفضل الوحدة؟",
" ما هو أكثر شيء يجعلك تغضب؟",
"هل لديك عادة غريبة؟",
"هل تفضل العمل ضمن فريق أم بمفردك؟",
" ما هو الشيء الذي يجعلك تشعر بالراحة النفسية؟",
" هل تفضل الصراحة أم المجاملة؟",
" هل سبق وأن غفرت لشخص أهانك؟",
" ما هو أكثر موقف جعلك تتعلم درسًا مهمًا؟",
"هل تحب المفاجآت؟ وما هي أفضل مفاجأة حصلت عليها؟",
" هل تؤمن بأن كل شيء يحدث لسبب؟",
" ما هو الشيء الذي لا تستطيع العيش بدونه؟",
  "ما هو الشيء الذي لا يمكنك العيش بدونه؟"
];

// لكل لاعب نسجل الأسئلة اللي جاوبها لتجنب التكرار
let askedQuestions = {};

// لكل لاعب عدد مرات استخدام زر العكس (حد مرتين)
let reverseCount = {};

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
    reverseCount = {};
    players.forEach(p => {
      askedQuestions[p] = [];
      reverseCount[p] = 0; // صفر مرات استخدام العكس في البداية
    });
    showGameExplanationScreen();
  };
}

// شاشة شرح اللعبة
function showGameExplanationScreen() {
  app.innerHTML = `
    <h2>شرح اللعبة</h2>
    <p>
      - كل لاعب يحصل على سؤال واحد في دوره.<br />
      - تظهر الأسئلة عشوائي لكل لاعب بدون تكرار.<br />
      - يمكنه الإجابة أو التمرير.<br />
      - يمكنه إعطاء السؤال لأي لاعب آخر مرتين كحد أقصى باستخدام زر العكس.<br />
      - بعد الانتهاء من الجميع تنتهي اللعبة.<br />
    </p>
    <button id="startGameBtn">ابدأ اللعبة</button>
  `;

  document.getElementById('startGameBtn').onclick = () => {
    currentPlayerIndex = 0;
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
      <button id="reverseBtn">🔁 عكس (${2 - reverseCount[players[currentPlayerIndex]]})</button>
    </div>
    <div id="reverseSelect" style="display:none;"></div>
    <div>الأسئلة التي تم الإجابة عليها من هذا اللاعب: <span id="answeredCount"></span></div>
  `;

  const questionBox = document.getElementById('questionBox');
  const reverseSelect = document.getElementById('reverseSelect');
  const answeredCountSpan = document.getElementById('answeredCount');

  const currentPlayer = players[currentPlayerIndex];

  // فلترة الأسئلة اللي ما استُخدمت مع هذا اللاعب
  const availableQuestions = questions.filter(q => !askedQuestions[currentPlayer].includes(q));

  if (availableQuestions.length === 0) {
    alert(`انتهت أسئلة اللاعب ${currentPlayer}.`);

    // بعد ما يخلص اللاعب، ننتقل للاعب التالي
    nextTurn();
    return;
  }

  // اختر سؤال عشوائي
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const currentQuestion = availableQuestions[randomIndex];
  questionBox.textContent = currentQuestion;

  answeredCountSpan.textContent = askedQuestions[currentPlayer].length;

  // تحديث حالة زر العكس (إذا استعمل 2 مرات نخفي الزر)
  const reverseBtn = document.getElementById('reverseBtn');
  if (reverseCount[currentPlayer] >= 2) {
    reverseBtn.disabled = true;
    reverseBtn.style.opacity = 0.5;
  } else {
    reverseBtn.disabled = false;
    reverseBtn.style.opacity = 1;
    reverseBtn.textContent = `🔁 عكس (${2 - reverseCount[currentPlayer]})`;
  }

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
  reverseBtn.onclick = () => {
    reverseSelect.style.display = 'block';
    reverseSelect.innerHTML = '';

    players.forEach((player) => {
      if (player !== currentPlayer) {
        const btn = document.createElement('button');
        btn.textContent = player;
        btn.onclick = () => {
          alert(`السؤال انعكس على ${player}!`);
          // سجل السؤال عند اللاعب الجديد
          askedQuestions[player].push(currentQuestion);
          // زيد عدد استخدام العكس للاعب الحالي
          reverseCount[currentPlayer]++;
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
  // انتقل للاعب التالي بشكل دائري
  currentPlayerIndex++;
  if (currentPlayerIndex >= players.length) currentPlayerIndex = 0;

  // تحقق إذا انتهت كل الأسئلة لكل اللاعبين (إذا جميع اللاعبين أجبوا على كل الأسئلة أو ما عندهم أسئلة)
  const allDone = players.every(p => {
    return askedQuestions[p].length >= questionsPerPlayer || askedQuestions[p].length >= questions.length;
  });

  if (allDone) {
    showGameOverScreen();
  } else {
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
