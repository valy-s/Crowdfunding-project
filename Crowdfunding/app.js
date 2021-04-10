// Navbar functionality
const menuBar = document.querySelector(".menu__icons");
const menuImgs = document.querySelectorAll(".menu__icons img");
const menuLinks = document.querySelector(".menu__links");

menuBar.addEventListener("click", () => {
  menuImgs.forEach((menuImg) => {
    menuImg.classList.toggle("hide");
  });
  menuLinks.classList.toggle("hide");
});

//###############################################

// Main page buttons functionality

const mainContainer = document.querySelector("main");
const mainModal = document.querySelector(".modal__main");
const overlayModal = document.querySelector(".modal__overlay");
const bookmark = document.querySelector(".bookmark");

mainContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("btn-blue") ||
    e.target.classList.contains("card__title")
  ) {
    overlayModal.classList.remove("hide");
    mainModal.classList.remove("hide");
    const modalCards = document.querySelectorAll(".modal__main .card");
    let cardPos = 0;
    modalCards.forEach((modalCard) => {
      if (
        e.target.parentElement.parentElement.dataset.label ===
        modalCard.dataset.label
      ) {
        const checkBox = modalCard.querySelector("input[type='radio']");
        const inputBox = modalCard.querySelector("input[type='number']");
        const cardBtns = modalCard.querySelector(".card__bottom");
        checkBox.checked = true;
        inputBox.value = inputBox.min;
        cardBtns.classList.add("card__bottom-active");
        modalCard.classList.add("active");
        cardPos = modalCard;
      } else {
        const checkBox = modalCard.querySelector("input[type='radio']");
        const inputBox = modalCard.querySelector("input[type='number']");
        const cardBtns = modalCard.querySelector(".card__bottom");
        checkBox.checked = false;
        if (inputBox) {
          inputBox.value = inputBox.min;
        }
        cardBtns.classList.remove("card__bottom-active");
        modalCard.classList.remove("active");
      }
    });
    if (cardPos) {
      cardPos.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    } else {
      mainModal.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    }
  }
});

bookmark.addEventListener("click", () => {
  const btnBookmark = bookmark.querySelector(".btn");
  const iconBookmark = bookmark.querySelector(".bookmark__icon");
  btnBookmark.style.background = "var(--clr--lightGray)";
  btnBookmark.style.color = "var(--clr-cyanDark)";
  btnBookmark.textContent = "Bookmarked";
  iconBookmark.style.backgroundImage = ` url("./images/icon-bookmark1.svg")`;
});

//###############################################

// Modal functionality

const closeBtn = document.querySelector(".modal__main .main__modal__close");
const btnsModal = document.querySelectorAll(".modal__main .btn-blue");
const inputs = document.querySelectorAll(".modal__main input[type='number']");
const completedModal = document.querySelector(".modal__completed");
const btnsModalCompleted = document.querySelectorAll(".modal__completed .btn");

closeBtn.addEventListener("click", () => {
  overlayModal.classList.add("hide");
  mainModal.classList.add("hide");
});

mainModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("card__title") || e.target.type == "radio") {
    const cardActive = e.target.parentElement.parentElement.parentElement;
    btnsModal.forEach((btnModal) => {
      if (
        cardActive.dataset.label ===
        btnModal.parentElement.parentElement.parentElement.dataset.label
      ) {
        btnModal.parentElement.parentElement.parentElement.classList.add(
          "active"
        );
        btnModal.parentElement.parentElement.parentElement.querySelector(
          "input[type='radio']"
        ).checked = true;
        btnModal.parentElement.parentElement.classList.add(
          "card__bottom-active"
        );
      } else {
        btnModal.parentElement.parentElement.parentElement.classList.remove(
          "active"
        );
        btnModal.parentElement.parentElement.classList.remove(
          "card__bottom-active"
        );
      }
    });
  }
});

btnsModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    const inputValue = btn.parentElement.querySelector("input[type='number']");
    const progressBar = document.getElementById("progress");
    const backersAmount = document.getElementById("totalAmount");
    const backers = document.getElementById("totalBackers");
    if (inputValue) {
      if (Number(inputValue.value) < Number(inputValue.min)) {
        checkAmount(inputValue, `The minimum pledge is: $${inputValue.min}`);

        return;
      } else if (Number(inputValue.value) > Number(inputValue.max)) {
        checkAmount(inputValue, `The maximum pledge is: $${inputValue.max}`);
        return;
      } else {
        backersAmount.textContent = formatCurrency.format(
          formatNumber(backersAmount.textContent) + Number(inputValue.value)
        );
        progressBar.value =
          formatNumber(backersAmount.textContent) + Number(inputValue.value);
      }
    }
    backers.textContent = formatCurrency
      .format(formatNumber(backers.textContent) + 1)
      .substring(1);
    mainModal.classList.add("hide");
    completedModal.classList.remove("hide");
    completedModal.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  });
});

btnsModalCompleted.forEach((btn) => {
  btn.addEventListener("click", () => {
    overlayModal.classList.add("hide");
    mainModal.classList.add("hide");
    completedModal.classList.add("hide");
  });
});

const formatNumber = (str) => {
  return Number(str.replace(/[_\W]/g, ""));
};

const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function checkAmount(element, msg) {
  const elem = document.querySelector(".message");
  const elementPos = element.getBoundingClientRect();
  const center = elementPos.left - elementPos.width - 20;
  const top = elementPos.bottom + window.pageYOffset;
  elem.style.left = `${center}px`;
  elem.style.top = `${top}px`;
  elem.innerText = msg;
  elem.classList.remove("hide");
  setInterval(() => {
    elem.classList.add("hide");
  }, 5000);
}
