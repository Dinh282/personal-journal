document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper-active', {
    direction: 'horizontal',
    loop: true,
    autoplay: false,
    effect: 'cards',
    pagination: {
      el: '.swiper-pagination',
    },
  });

  // Function to update the box content with the active slide's information
  function updateBoxContent() {
    // Get the active slide
    var activeSlide = swiper.slides[swiper.activeIndex];

    // Update the title and content based on the active slide data
    var slideTitle = activeSlide.querySelector('.title-selector').innerText;
    var slideContent = activeSlide.querySelector('.content-selector').innerText;

    document.getElementById('slide-title').innerHTML = slideTitle;
    document.getElementById('slide-content').innerHTML = slideContent;
  }

  // Add event listener for swiper initialization
  swiper.on('init', function () {
    updateBoxContent(); // Update the box content on initialization
  });

  // Add event listener for slide change
  swiper.on('slideChange', function () {
    updateBoxContent(); // Update the box content on slide change
  });

  swiper.emit('slideChange'); // Manually trigger slideChange event on initialization

  // Add media query for mobile screens
  if (window.matchMedia('(max-width: 767px)').matches) {
    const mobileSwiper = new Swiper('.swiper-active', {
      direction: 'horizontal',
      slidesPerView: 'auto',
      freeMode: true,
      pagination: {
        el: '.swiper-pagination',
      },
    });

    mobileSwiper.on('init', function () {
      updateBoxContent(); // Update the box content on initialization for mobile screens
    });

    mobileSwiper.on('slideChange', function () {
      updateBoxContent(); // Update the box content on slide change for mobile screens
    });

    mobileSwiper.emit('slideChange'); // Manually trigger slideChange event on initialization for mobile screens
  }
});
