// remove active class btn and toggle active class
function removeActiveClass() {
  const activeButtons = document.querySelectorAll(".active");
  activeButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
}

// show loader function
function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("words-main-container").classList.add("hidden");
}
// hide loader function
function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("words-main-container").classList.remove("hidden");
}

// call the vocabulary section by clicking learn button
function callLearn() {
  document
    .getElementById("learn-section")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}
document.getElementById("learn-btn").addEventListener("click", callLearn);

// call faq section by clicking learn button
function callFaq() {
  document
    .getElementById("faq")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}
document.getElementById("faq_btn").addEventListener("click", callFaq);

// check password section
function checkPassword() {
  let password = document.getElementById("password").value;
  if (password == 123456) {
    document.getElementById("hero").style.display = "none";
    document.getElementById("nav").style.display = "block";
    document.getElementById("learn-section").style.display = "block";
  } else {
    alertMessage();
  }
}

//show alert card if password in incorrect
function alertMessage() {
  document.getElementById("alert-card").style.display = "block";
}
// hide alert card after onclicking the window
function hideMessage() {
  document.getElementById("alert-card").style.display = "none";
  document.getElementById("password").value = "";
  document.getElementById("name").value = "";
}

// check name section if value is empty
function checkName(params) {
  let name = document.getElementById("name").value;
  if (name === "") {
    alertMessageForName();
  }
}
// alert function for name
function alertMessageForName() {
  document.getElementById("alert-card-for-name").style.display = "block";
}
// hide alert card after onclicking the window
function hideMessageForName() {
  document.getElementById("alert-card-for-name").style.display = "none";
  document.getElementById("name").value = "";
}

// logout function and show login page after logout
function logInPage() {
  document.getElementById("hero").style.display = "block";
  document.getElementById("nav").style.display = "none";
  document.getElementById("learn-section").style.display = "none";
  document.getElementById("footer").style.display = "block";
  document.getElementById("faq").style.display = "none";
  document.getElementById("password").value = "";
  document.getElementById("name").value = "";
}

// successful login alert
document.getElementById("sweet-alert").classList.add("hidden");

function succesfulLogin() {
  document.getElementById("footer").classList.add("hidden");
  document.getElementById("faq").style.display = "block";

  const faqSection = document.getElementById("faq");
  faqSection.classList.remove("hidden");
  const n = document.getElementById("name").value;
  const p = document.getElementById("password").value;
  if (n != "" && p == 123456) {
    document.getElementById("sweet-alert").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("sweet-alert").classList.add("hidden");
    }, 1500);
  } else {
    logInPage();
  }
}

// loadLevels() and displayLevels() functions
function loadLevels() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => {
      displayLevels(data.data);
    });
}

function displayLevels(data) {
  const lessonContainer = document.getElementById("lesson-container");
  data.forEach((element) => {
    const createLessonDiv = document.createElement("div");
    createLessonDiv.innerHTML = `
             <button id="${element.id}" onclick='loadWords(${element.level_no},${element.id}),error(${element.level_no})'
                class="btn btn-outline  text-[#422AD5] font-semibold text-sm  text-center"
              >
                <img 
                  src="./assets/fa-book-open.png"
                  alt=""
                />
                
                Level-${element.level_no}
              </button>
            
            `;

    lessonContainer.appendChild(createLessonDiv);
  });
}
loadLevels();

// function showing no vocabulary error
function error(btnNumber) {
  if (btnNumber == 4 || btnNumber == 7) {
    document.getElementById("no-vocabulary").style.display = "block";
    document.getElementById("no-lesson").style.display = "none";
    document.getElementById("words-main-container").style.display = "none";
  } else {
    document.getElementById("no-vocabulary").style.display = "none";
  }
}

// loadWords() and displayWords() functions
function loadWords(levelNo, id) {
  showLoader();
  fetch(`https://openapi.programming-hero.com/api/level/${levelNo}`)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      const clickedBtn = document.getElementById(`${id}`);
      clickedBtn.classList.add("active");

      displayWOrds(data.data);
    });
}

function displayWOrds(data) {
  const wordsContainer = document.getElementById("words-container");
  wordsContainer.innerHTML = "";

  data.forEach((element) => {
    document.getElementById("no-lesson").style.display = "none";
    document.getElementById("words-main-container").style.display = "block";

    const createWordsContainerDiv = document.createElement("div");
    let meaningText = "";

    if (
      element.meaning &&
      typeof element.meaning === "string" &&
      element.meaning.trim() !== ""
    ) {
      meaningText = element.meaning;
    } else {
      meaningText = "অর্থ নেই";
    }
    createWordsContainerDiv.innerHTML = `

<div class="card bg-white shadow-md transition-transform duration-300 ease-out hover:scale-105 hover:bg-gray-100 hover:shadow-xl  h-[240px]">
              <div class="card-body">
                <div class="flex flex-col justify-center gap-4 mb-4">
                  <h2 class="text-center text-xl font-bold">${element.word}</h2>
                  <h1 class="text-center text-base font-normal">
                    Meaning /Pronounciation
                  </h1>
                  <h1 class="text-center text-[#18181B] font-semibold text-xl ">
                    "${meaningText}/${element.pronunciation}"
                  </h1>
                </div>
                <div class="flex justify-between">
                  <button class="hover:bg-gray-200 transition-transform duration-300 ease-out hover:scale-125  hover:shadow-xl cursor-pointer"><img id="details" onclick="loadDetailsOfWords(${element.id})" onclick="my_modal_1.showModal()" class="w-7" src="./assets/details.png" alt="" /></button>

                  <button id="sound" onclick="pronounceWord('${element.word}')" class="hover:bg-gray-200 cursor-pointer transition-transform duration-300 ease-out hover:scale-125  hover:shadow-xl"><img class="w-7" src="./assets/sound.png" alt="" /></button>
                </div>
              </div>
            </div>

`;
    wordsContainer.appendChild(createWordsContainerDiv);
  });
  hideLoader();
}

// pronounce word
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
}
// loadDetailsOfWords() function setup

function loadDetailsOfWords(id) {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((response) => response.json())
    .then((data) => {
      displayDetailsOfWords(data.data);
    });
}

function displayDetailsOfWords(data) {
  document.getElementById("my_modal_1").showModal();

  const wordDetailsContainer = document.getElementById("word-details");
  wordDetailsContainer.innerHTML = "";
  let synonymsButtons = "";
  let meaningText = "";
  if (data.meaning && data.meaning.trim() !== "") {
    meaningText = data.meaning;
  } else {
    meaningText = "No meaning found";
  }
  if (data.synonyms && data.synonyms.length > 0) {
    synonymsButtons = data.synonyms
      .map(
        (synonym) =>
          `<button class="btn btn-active bg-[#EDF7FF] border-[#EDF7FF] btn-sm mr-2 mb-2">${synonym}</button>`
      )
      .join("");
  } else {
    synonymsButtons = "No Synonyms Found ";
  }
  const createWordDetailsContainer = document.createElement("div");
  createWordDetailsContainer.innerHTML = `
<div class="mb-4">
  <h2 class="card-title text-3xl font-bold break-words">${data.word}</h2>
  <div class="flex items-center gap-2 mt-2">
  <img class="cursor-pointer transition-transform duration-300 ease-out hover:scale-125  hover:shadow-xl  w-6 h-6" 
         onclick="pronounceWord('${data.word}')" 
         src="./assets/icons8-microphone-48.png" alt="Mic">
    <span class="text-lg text-gray-600">${data.pronunciation}</span>
    
  </div>
</div>
    <h2 class="card-title text-2xl  font-semibold">Meaning</h2>
    <h2 class="card-title mb-4 text-sm font-medium text-[#000000] font-[hind-siliguri]">${meaningText}</h2>
    <h2 class="card-title text-base font-semibold">Example</h2>
    <h2 class="card-title text-base font-normal text-[#000000] mb-4">${data.sentence}</h2>

        <h2 class="card-title text-sm font-semibold text-[hind-siliguri] mb-1">সমার্থক শব্দ গুলো</h2>
     <div class="flex flex-wrap">
            ${synonymsButtons}
          </div>

        



`;
  wordDetailsContainer.appendChild(createWordDetailsContainer);
}
