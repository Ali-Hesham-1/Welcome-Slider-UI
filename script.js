document.addEventListener("DOMContentLoaded", function() {
  let swiper = null;

  function initSwiper() {
    if (swiper) {
      swiper.destroy(true, true);
    }
    
    swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 150,
        modifier: 2.5,
        slideShadows: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
    });
  }

  // Initialize Swiper
  initSwiper();

  const accordionBtn = document.querySelector(".accordion-button");
  const accordionBody = document.querySelector("#collapseOne");

  // Function to check if an element is visible
  function isVisible(elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  }

  accordionBtn.addEventListener("click", function() {
    // Use MutationObserver to detect when the accordion animation is complete
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (isVisible(accordionBody)) {
            setTimeout(() => {
              initSwiper();
            }, 50);
          } else {
            if (swiper) {
              swiper.destroy(true, true);
            }
          }
          observer.disconnect();
        }
      });
    });

    observer.observe(accordionBody, { attributes: true });
  });

  // Reinitialize Swiper on window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (isVisible(accordionBody)) {
        initSwiper();
      }
    }, 250);
  });
});