"use strict";

function showSearch() {
  const main = document.querySelector('.searchForm');
  if (!main) return;
  const btn = main.querySelector('.searchForm__open');
  const wrapper = document.querySelector('.header__search');
  btn.addEventListener('click', function (e) {
    main.classList.toggle('open');
    btn.classList.toggle('active');
    wrapper.classList.toggle('fw');
  });
}
showSearch();
function mobileMenu() {
  const btn = document.querySelector('.open-menu');
  const content = document.querySelector('.header__menu');
  const body = document.documentElement;
  if (!btn) return;
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    btn.classList.toggle('active');
    content.classList.toggle('open');
    body.classList.toggle('o-hidden');
  });
}
mobileMenu();
function tabs() {
  const main = document.querySelectorAll('.tabs');
  if (!main.length) return;
  main.forEach(item => {
    const buttons = item.querySelectorAll('.tabs-link');
    const content = item.querySelectorAll('.tabs-content');
    buttons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        buttons.forEach(i => i.classList.remove('selected'));
        content.forEach(i => i.classList.remove('active'));
        btn.classList.add('selected');
        const tabs = btn.dataset.tabs;
        item.querySelector(`.tabs-content[data-tabs="${tabs}"]`).classList.add('active');
      });
    });
  });
}
tabs();
const newsSlider = new Swiper(".news-slider", {
  spaceBetween: 10,
  slidesPerView: 'auto',
  breakpoints: {
    768: {
      spaceBetween: 20
    }
  }
});
const moreArticlesSlider = new Swiper(".article-more__slider", {
  spaceBetween: 10,
  slidesPerView: 'auto',
  breakpoints: {
    768: {
      spaceBetween: 20
    }
  }
});
var swiper = new Swiper(".categorySlider-controls", {
  spaceBetween: 14,
  slidesPerView: 'auto',
  speed: 600,
  watchSlidesProgress: true,
  allowTouchMove: false,
  slidesOffsetStart: 0,
  slidesOffsetBefore: 50,
  breakpoints: {
    768: {
      spaceBetween: 20,
      slidesOffsetStart: 0,
      slidesOffsetBefore: 68
    },
    1025: {
      spaceBetween: 28
    }
  }
});
var categorySlider = new Swiper(".categorySlider-slider", {
  spaceBetween: 10,
  speed: 600,
  slidesPerView: 1,
  thumbs: {
    swiper: swiper
  },
  navigation: {
    prevEl: '.categorySlider-prev',
    nextEl: '.categorySlider-next'
  }
});
categorySlider.thumbs.swiper = swiper;
categorySlider.params.control = swiper;
swiper.params.control = categorySlider;
const onStop = () => {
  cancelAnimationFrame(myReq);
};
var myReq;
function update(el) {
  var pos = 0;
  const btn = document.querySelector('.categorySlider-btn.active');
  pos = btn.getBoundingClientRect();
  const btnPrev = document.querySelector('.categorySlider-prev');
  const btnNext = document.querySelector('.categorySlider-next');
  myReq = requestAnimationFrame(update);
  btnPrev.style.left = pos.x + 'px';
  btnNext.style.left = pos.x + pos.width + 'px';
}
categorySlider.on('slideChange', function (e) {
  const btns = document.querySelectorAll('.categorySlider-btn');
  const btnPrev = document.querySelector('.categorySlider-prev');
  const btnNext = document.querySelector('.categorySlider-next');
  const thumbsSlider = document.querySelector('.categorySlider-controls');
  categorySlider.activeIndex > 0 ? thumbsSlider.classList.remove('offset') : thumbsSlider.classList.add('offset');
  swiper.slideTo(categorySlider.activeIndex);
  btns.forEach((item, index) => {
    btns.forEach(i => i.classList.remove('active'));
    btns[categorySlider.activeIndex].classList.add('active');
  });
  const btnActive = document.querySelector('.categorySlider-btn.active');
  update(btnActive);
});
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
categorySlider.on('slideChangeTransitionEnd', function () {
  onStop();
});
categorySlider.on('slideChangeTransitionStart', function () {
  var previousIndex = this.previousIndex;
  var currentIndex = this.activeIndex;
  if (previousIndex > currentIndex) {
    this.$el.removeClass('swiper-right');
    setTimeout(() => {
      this.$el.addClass('swiper-right');
      this.$el.removeClass('swiper-left');
    }, 500);
  } else if (previousIndex < currentIndex) {
    this.$el.removeClass('swiper-left');
    setTimeout(() => {
      this.$el.addClass('swiper-left');
      this.$el.removeClass('swiper-right');
    }, 500);
  }
});
function checkBtnPosition() {
  const btn = document.querySelector('.categorySlider-btn.active');
  const btnPrev = document.querySelector('.categorySlider-prev');
  const btnNext = document.querySelector('.categorySlider-next');
  if (!btn) return;
  const pos = btn.getBoundingClientRect();
  btnPrev.style.left = pos.x + 'px';
  btnNext.style.left = pos.x + pos.width + 'px';
}

// checkBtnPosition()

window.onload = function () {
  checkBtnPosition();
};
window.onresize = function () {
  checkBtnPosition();
};
function btnClass() {
  const btns = document.querySelectorAll('.categorySlider-btn');
  const btnPrev = document.querySelector('.categorySlider-prev');
  const btnNext = document.querySelector('.categorySlider-next');
  btns.forEach(item => {
    item.addEventListener('click', function () {
      btns.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      setTimeout(() => {
        const pos = item.getBoundingClientRect();
        btnPrev.style.left = pos.x + 'px';
        btnNext.style.left = pos.x + pos.width + 'px';
      }, 1000);
    });
  });
}

// btnClass()

function slideToggle() {
  var linkToggle = document.querySelectorAll('.footer-item__head');
  linkToggle.forEach(item => {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      var container = document.getElementById(this.dataset.container);
      item.classList.toggle('active');
      if (!container.classList.contains('active')) {
        container.classList.add('active');
        container.style.height = 'auto';
        var height = container.clientHeight + 'px';
        container.style.height = '0px';
        setTimeout(function () {
          container.style.height = height;
        }, 0);
      } else {
        container.style.height = '0px';
        container.addEventListener('transitionend', function () {
          container.classList.remove('active');
        }, {
          once: true
        });
      }
    });
  });
}
slideToggle();
function positionHeader() {
  const header = document.querySelector('.header');
  const container = document.querySelector('.header__menu-item:last-child');
  if (!header) return;
  function getHeight(el) {
    var elClone = el.cloneNode(true);
    elClone.style.display = 'block';
    elClone.style.position = 'absolute';
    elClone.style.top = '-9999px';
    document.body.appendChild(elClone);
    var height = elClone.offsetHeight;
    document.body.removeChild(elClone);
    return height;
  }
  const height = header.offsetHeight;
  const heightElem = getHeight(container);
  console.log(heightElem);
  function activate() {
    if (window.pageYOffset > 150) {
      header.classList.add('fixed');
      $('.header__menu-item:last-child').slideUp('fast');
    } else {
      header.classList.remove('fixed');
      $('.header__menu-item:last-child').slideDown('fast');
    }
  }
  window.addEventListener('scroll', activate);
  activate();
}
positionHeader();


let stepSwp = document.querySelector('.step-swp');

const swp = new Swiper(stepSwp, {
  slidesPerView: 1,
  spaceBetween: 0,
  // initialSlide: 3,
  effect: 'fade',
  allowTouchMove: false,
})

let stepSwpNext = document.querySelectorAll('.step-swp__next');
if (stepSwpNext.length) {
  stepSwpNext.forEach((btn, btnID) => {
    btn.onclick = e => {
      e.preventDefault();

      if (btnID == 0) {
        let inputs = document.querySelectorAll('.step-1 .step_one_in_top_block input');
        let validation = true;
  
        if (inputs.length) {
          inputs.forEach(inp => {
            if (!inp.value) {
              validation = false;
              inp.classList.add('error')
            } else {
              inp.classList.remove('error')
            }
          })
        }
  
        if (validation) {
          swp.slideNext();
          window.scrollTo(0,0);
        }
      }

      if (btnID == 1) {
        let inputs = document.querySelectorAll('.step-2 .step_one_in_top_block input');
        let validation = true;
  
        if (inputs.length) {
          inputs.forEach(inp => {
            if (!inp.value) {
              validation = false;
              inp.classList.add('error')
            } else {
              inp.classList.remove('error')
            }
          })
        }
  
        if (validation) {
          swp.slideNext();
          window.scrollTo(0,0);
        }
      }

      if (btnID == 2) {
        let inputs = document.querySelectorAll('.step-3 .step_one_in_top_block input');
        let validation = true;
  
        if (inputs.length) {
          inputs.forEach(inp => {
            if (!inp.value) {
              validation = false;
              inp.classList.add('error')
            } else {
              inp.classList.remove('error')
            }
          })
        }
  
        if (validation) {
          swp.slideNext();
          window.scrollTo(0,0);
        }
      }

      if (btnID == 3 || btnID == 4) {
        let formBlock = document.querySelector('.step_four_in');
        let inputs = document.querySelectorAll('.step-4 .step_one_in_top_block input[type="text"]');
        let validation = true;

        let bankRadio = document.querySelectorAll('.bank_btn-1 input[type="radio"]');
        
        if (!bankRadio[1].checked && !bankRadio[2].checked) {
          validation = false;
        }

        if (formBlock.classList.contains('active')) {
          validation = true;
          if (inputs.length) {
            inputs.forEach(inp => {
              if (!inp.value) {
                validation = false;
                inp.classList.add('error')
              } else {
                inp.classList.remove('error')
              }
            })
          }
        }
  
        if (validation) {
          swp.slideNext();
          window.scrollTo(0,0);
        }

      }

    }
  })
}

let stepSwpPrev = document.querySelectorAll('.step-swp__prev');
if (stepSwpPrev.length) {
  stepSwpPrev.forEach((btn, btnID) => {
    btn.onclick = e => {
      e.preventDefault();
      swp.slidePrev();
      window.scrollTo(0,0);
    }
  })
}