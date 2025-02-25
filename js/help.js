document.getElementById("helpClose").addEventListener("click", function () {
  window.history.back();
});

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".help__gallery__card");
  const dots = document.querySelectorAll(".dot");
  const gallery = document.querySelector(".help__gallery");
  let currentIndex = 0;

  function showCards() {
    const screenWidth = window.innerWidth;

    let shownCards;
    if (screenWidth >= 1840) {
      shownCards = 4;
      cards.forEach((card) => (card.style.display = "block"));
      dots.forEach((dot) => (dot.style.display = "none"));
    } else if (screenWidth >= 1500) {
      shownCards = 3;
    } else if (screenWidth >= 1200) {
      shownCards = 2;
    } else {
      shownCards = 1;
      gallery.style.justifyContent = "center";
    }

    cards.forEach((card) => {
      card.style.display = "none";
    });

    for (let i = 0; i < shownCards && currentIndex + i < cards.length; i++) {
      cards[currentIndex + i].style.display = "block";
    }

    dots.forEach((dot) => {
      dot.style.display = "inline-block";
      dot.classList.remove("active");
    });

    if (currentIndex < dots.length) {
      dots[currentIndex].classList.add("active");
    }
  }

  showCards();

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", function () {
      currentIndex = dotIndex;
      showCards();
    });
  });

  window.addEventListener("resize", showCards);
});
