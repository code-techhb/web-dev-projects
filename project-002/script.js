const slider = document.querySelector(".slider");
const sliderList = slider.querySelector(".slider .list");
const thumbnail = slider.querySelector(".slider .thumbnail");
const nextBtn = slider.querySelector(".next");
const prevBtn = slider.querySelector(".prev");

// ------------- Function for nav <> button ----------
nextBtn.addEventListener("click", function () {
  if (slider.classList.contains("next") || slider.classList.contains("prev")) {
    return;
  }
  moveSlider("next");
});

prevBtn.addEventListener("click", function () {
  if (slider.classList.contains("next") || slider.classList.contains("prev")) {
    return;
  }
  moveSlider("prev");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    moveSlider("next");
  } else if (e.key === "ArrowLeft") {
    moveSlider("prev");
  }
});

// ------------- Main slider function ------------------
function moveSlider(direction) {
  let sliderItems = sliderList.querySelectorAll(".item");
  let thumbnailItems = thumbnail.querySelectorAll(".item");

  if (direction === "next") {
    // Move first item to the end
    sliderList.appendChild(sliderItems[0]);
    thumbnail.appendChild(thumbnailItems[0]);
    slider.classList.add("next");
  } else {
    // Move last item to the beginning
    sliderList.prepend(sliderItems[sliderItems.length - 1]);
    thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
    slider.classList.add("prev");
  }

  slider.addEventListener(
    "animationend",
    function () {
      if (direction === "next") {
        slider.classList.remove("next");
      } else {
        slider.classList.remove("prev");
      }
    },
    { once: true }
  );
}

//simple touch swipe support
function addTouchSupport() {
  let touchStartX = 0;

  slider.addEventListener(
    "touchstart",
    function (e) {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    function (e) {
      const touchEndX = e.changedTouches[0].clientX;
      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          // Swipe left (next)
          moveSlider("next");
        } else {
          // Swipe right (prev)
          moveSlider("prev");
        }
      }
    },
    { passive: true }
  );
}
addTouchSupport();

//------------ Audio functionality-------------------
document.addEventListener("DOMContentLoaded", function () {
  const backgroundMusic = document.getElementById("background-music");
  const musicToggle = document.getElementById("music-toggle");

  if (backgroundMusic && musicToggle) {
    const musicIcon = musicToggle.querySelector(".music-icon");
    let musicStarted = false;

    function startBackgroundMusic() {
      backgroundMusic.volume = 0.2;
      // Play sound
      backgroundMusic
        .play()
        .then(() => {
          musicStarted = true;
          musicIcon.textContent = "🔊";
        })
        .catch((error) => {
          console.error("Audio playback failed:", error);
        });
    }

    function setupAutoPlay() {
      if (!musicStarted) {
        startBackgroundMusic();
      }
      document.removeEventListener("click", setupAutoPlay);
      document.removeEventListener("keydown", setupAutoPlay);
      document.removeEventListener("touchstart", setupAutoPlay);
    }

    document.addEventListener("click", setupAutoPlay);
    document.addEventListener("keydown", setupAutoPlay);
    document.addEventListener("touchstart", setupAutoPlay);

    musicToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (backgroundMusic.paused) {
        backgroundMusic
          .play()
          .then(() => {
            musicIcon.textContent = "🔊";
          })
          .catch((error) => {
            console.error("Failed to play audio:", error);
          });
      } else {
        backgroundMusic.pause();
        musicIcon.textContent = "🔇";
      }
    });
  } else {
    console.error("Audio elements not found in the DOM");
  }
});
