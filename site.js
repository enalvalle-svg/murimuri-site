const menuFiles = [
  "assets/menu_1.pdf",
  "assets/menu_2.pdf",
  "assets/menu_3.pdf",
  "assets/cafes_lista_typewriter_pages2 copy.pdf"
];

const modal = document.querySelector("#menuModal");
const frame = document.querySelector("#menuFrame");
const openButtons = document.querySelectorAll("[data-open-menu]");
const closeButton = document.querySelector("#modalClose");
const prevButton = document.querySelector("#modalPrev");
const nextButton = document.querySelector("#modalNext");
const year = document.querySelector("#year");

let menuIndex = 0;

function showMenu(index) {
  menuIndex = (index + menuFiles.length) % menuFiles.length;
  frame.src = `${encodeURI(menuFiles[menuIndex])}#zoom=page-fit&view=Fit&toolbar=0&navpanes=0`;
}

function openMenu(startIndex = 0) {
  showMenu(startIndex);
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeMenu() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
  frame.src = "about:blank";
}

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const start = Number(button.dataset.menuIndex || 0);
    openMenu(start);
  });
});

closeButton.addEventListener("click", closeMenu);
prevButton.addEventListener("click", () => showMenu(menuIndex - 1));
nextButton.addEventListener("click", () => showMenu(menuIndex + 1));

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("open")) return;
  if (event.key === "Escape") closeMenu();
  if (event.key === "ArrowLeft") showMenu(menuIndex - 1);
  if (event.key === "ArrowRight") showMenu(menuIndex + 1);
});

if (year) year.textContent = new Date().getFullYear();
