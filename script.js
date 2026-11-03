// ============ Constants ============
const STORAGE_KEY = "markdownSlidesContent";

const DEFAULT_MD = `# Welcome to Markdown Slides
## Slide 01
Ye pehli slide hai. Left side mein Markdown likho, right side mein preview dekho.

---

# Slide 02
## Features
- Create slides
- Edit slides
- Save slides
- Present slides

---

# Slide 03
## Thank you
Presentation khatam!
`;

// ============ Elements ============
const mdInput = document.getElementById("mdInput");
const saveBtn = document.getElementById("saveBtn");
const presentBtn = document.getElementById("presentBtn");
const saveStatus = document.getElementById("saveStatus");

const editorScreen = document.getElementById("editorScreen");
const presentScreen = document.getElementById("presentScreen");

const previewSlide = document.getElementById("previewSlide");
const previewCounter = document.getElementById("previewCounter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const fsBtn = document.getElementById("fsBtn");

const presentSlide = document.getElementById("presentSlide");
const presentCounter = document.getElementById("presentCounter");
const presPrevBtn = document.getElementById("presPrevBtn");
const presNextBtn = document.getElementById("presNextBtn");
const presFsBtn = document.getElementById("presFsBtn");

// ============ State ============
let slides = [];
let currentIndex = 0;
let isPresenting = false;
let statusTimer = null;

// ============ Markdown -> slides ============
function parseSlides(markdown) {
  // sirf wo line jo poori tarah '---' ho, usse split karo
  const parts = markdown
    .split(/^[ \t]*---[ \t]*$/m)
    .map((part) => part.trim())
    .filter((part) => part !== "");

  return parts.length > 0 ? parts : [""];
}

// ============ Render ============
function render() {
  slides = parseSlides(mdInput.value);

  // slides kam ho jayen to index ko limit mein rakho
  if (currentIndex > slides.length - 1) currentIndex = slides.length - 1;
  if (currentIndex < 0) currentIndex = 0;

  const html = marked.parse(slides[currentIndex]);
  const counterText = `${currentIndex + 1} / ${slides.length}`;
  const atFirst = currentIndex === 0;
  const atLast = currentIndex === slides.length - 1;

  // editor ka preview
  previewSlide.innerHTML = html;
  previewCounter.textContent = counterText;
  prevBtn.disabled = atFirst;
  nextBtn.disabled = atLast;

  // presentation screen
  presentSlide.innerHTML = html;
  presentCounter.textContent = counterText;
  presPrevBtn.disabled = atFirst;
  presNextBtn.disabled = atLast;
}

// ============ Navigation ============
function goNext() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    render();
  }
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    render();
  }
}

// ============ Presentation / Full screen ============
function enterPresentation() {
  isPresenting = true;
  presentScreen.classList.remove("hidden");
  fsBtn.textContent = "Exit Full Screen";

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {
      // fullscreen block ho jaye to bhi presentation screen chalti rahegi
    });
  }
  render();
}

function exitPresentation() {
  isPresenting = false;
  presentScreen.classList.add("hidden");
  fsBtn.textContent = "Full Screen";

  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {});
  }
  render();
}

function togglePresentation() {
  if (isPresenting) {
    exitPresentation();
  } else {
    enterPresentation();
  }
}

// Esc dabane se browser fullscreen band ho to presentation bhi band karo
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement && isPresenting) {
    isPresenting = false;
    presentScreen.classList.add("hidden");
    fsBtn.textContent = "Full Screen";
    render();
  }
});

// ============ Save / Load (localStorage) ============
function saveSlides() {
  try {
    localStorage.setItem(STORAGE_KEY, mdInput.value);
    showStatus("Saved \u2713");
  } catch (error) {
    showStatus("Save failed");
    console.error("Save error:", error);
  }
}

function loadSlides() {
  const saved = localStorage.getItem(STORAGE_KEY);
  mdInput.value = saved !== null ? saved : DEFAULT_MD;
}

function showStatus(message) {
  saveStatus.textContent = message;
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => {
    saveStatus.textContent = "";
  }, 2000);
}

// ============ Button events ============
mdInput.addEventListener("input", render);

saveBtn.addEventListener("click", saveSlides);
presentBtn.addEventListener("click", enterPresentation);

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);
fsBtn.addEventListener("click", togglePresentation);

presPrevBtn.addEventListener("click", goPrev);
presNextBtn.addEventListener("click", goNext);
presFsBtn.addEventListener("click", exitPresentation);

// ============ Keyboard shortcuts ============
document.addEventListener("keydown", (event) => {
  // Ctrl+S (Mac par Cmd+S) => save
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    saveSlides();
    return;
  }

  // F11 => full screen / presentation toggle
  if (event.key === "F11") {
    event.preventDefault();
    togglePresentation();
    return;
  }

  // Arrow keys: typing ke waqt cursor move hona chahiye, slide change nahi
  const typingInEditor = !isPresenting && document.activeElement === mdInput;
  if (typingInEditor) return;

  if (event.key === "ArrowRight") {
    event.preventDefault();
    goNext();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    goPrev();
  }
});

// ============ Start ============
loadSlides();
render();