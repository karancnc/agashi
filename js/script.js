var $ = jQuery.noConflict();

$(window).scroll(function(){
    var sticky = $('header'),
        scroll = $(window).scrollTop();
  
    if (scroll >= 100) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  });

$(document).ready(function(){

    const lenis = new Lenis({
        lerp: 0.05, 
        wheelMultiplier: 1, 
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if(jQuery(window).width() < 1023){
        jQuery('header .nav>li.drop>a').after('<span class="mobile_drop"></div>');

        jQuery('header .nav>li.drop .mobile_drop').click(function(){
            jQuery(this).toggleClass('open');
            jQuery(this).next().slideToggle();
        });
    };

    jQuery('.next_sec').on('click', function (e) {
        e.preventDefault();
        const currentSection = jQuery(this).closest('section');
        const nextSection = currentSection.next('section');
        if (nextSection.length) {
            jQuery('html, body').animate({
                scrollTop: nextSection.offset().top - 80
            }, 800);
        }
    });

    jQuery('header .hamberger').click(function(){
        jQuery(this).toggleClass('open');
        jQuery('header').toggleClass('open');
    });

  if (jQuery('.banner_slider').length > 0) {
      const swiper = new Swiper(".banner_slider", {
          loop: true,
          speed: 800,
          autoplay: {
              delay: 3000,
              disableOnInteraction: false,
          },
          navigation: {
              nextEl: ".banner_slider .next",
              prevEl: ".banner_slider .prev",
          },
          on: {
              init: function () {
                  handleVideo(this);
                  updateBannerDots(this);
              },
              slideChangeTransitionEnd: function () {
                  handleVideo(this);
                  updateBannerDots(this);
              }
          }
      });
      /*
      |--------------------------------------------------------------------------
      | Video
      |--------------------------------------------------------------------------
      */
      function handleVideo(swiper) {
          document
              .querySelectorAll(".banner_slider .swiper-slide video")
              .forEach(video => {
                  video.pause();
                  video.currentTime = 0;
              });
          const activeSlide = swiper.slides[swiper.activeIndex];
          if (!activeSlide) {
              return;
          }
          const video = activeSlide.querySelector("video");
          if (video) {
              swiper.autoplay.stop();
              video.play().catch(() => {});
              video.onended = () => {
                  swiper.slideNext();
                  swiper.autoplay.start();
              };
          } else {
              swiper.autoplay.start();
          }
      }
      function updateBannerDots(swiper) {
          const realIndex = swiper.realIndex;
          jQuery('.banner_dot')
              .removeClass('active');
          jQuery('.banner_dot[data-slide="' + realIndex + '"]')
              .addClass('active');
      }
      jQuery('.banner_dot').on('click', function () {
          const index = jQuery(this).data('slide');
          swiper.slideToLoop(index);
      });
  };

  if (jQuery('.our_areas_expertise_sec').length > 0) {
    const swiper = new Swiper(".our_areas_expertise_sec .inner", {
        slidesPerView: 4,
        spaceBetween: 30,
        // loop: true,
        // speed: 800,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        breakpoints: {
            320: {
                slidesPerView: 1.4,
                spaceBetween: 16,
                loop:true,
            },
            767: {
                slidesPerView: 2,
                spaceBetween: 15,
                loop:false,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            1600: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        }
    });
  };
  if (jQuery('.projects_items').length > 0) {
    if (jQuery(window).width() < 768) {
      const swiper = new Swiper(".projects_items", {
          slidesPerView: 1.1,
          spaceBetween:16,
          // loop: true,
          // speed: 800,
          // autoplay: {
          //     delay: 3000,
          //     disableOnInteraction: false,
          // },
      });
    }
  };
  if (jQuery('.company_team_sec').length > 0) {
    if (jQuery(window).width() < 768) {
      const swiper = new Swiper(".company_team_sec .inner ", {
          slidesPerView: 1.1,
          spaceBetween:16,
          // loop: true,
          // speed: 800,
          // autoplay: {
          //     delay: 3000,
          //     disableOnInteraction: false,
          // },
      });
    }
  };
  if (jQuery('.what_done_project_sec').length > 0) {
    if (jQuery(window).width() < 768) {
      const swiper = new Swiper(".what_done_project_sec .inner ", {
          slidesPerView: 1.1,
          spaceBetween:16,
          // loop: true,
          // speed: 800,
          // autoplay: {
          //     delay: 3000,
          //     disableOnInteraction: false,
          // },
      });
    }
  };
  if (jQuery('.photo_gallery_sec').length > 0) {
        const swiper = new Swiper(".photo_gallery_slider", {
            slidesPerView: 3,
            spaceBetween: 31,
            navigation: {
                nextEl: ".photo_gallery_sec .next",
                prevEl: ".photo_gallery_sec .prev",
            },
            pagination: {
                el: ".photo_gallery_slider .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.1,
                    spaceBetween: 16,
                },
                767: {
                    slidesPerView:3,
                    spaceBetween: 16,
                },
                1024: {
                   slidesPerView: 3,
                    spaceBetween: 31,
                }
            }
        });
        // Magnific Popup Gallery
        jQuery('.photo_gallery_slider').magnificPopup({
            delegate: 'a.gallery_popup',
            type: 'image',
            gallery: {
                enabled: true
            },
            closeOnContentClick: true,
            mainClass: 'mfp-fade',
            removalDelay: 300
        });
    };
    $('#file-upload').on('change', function() {
        var fileName = $(this).val().split('\\').pop();
        if (fileName) {
            $('#file-name-text').text(fileName);
        } else {
            $('#file-name-text').text('נא לצרף קובץ');
        }
    });

    $(".faq-question").click(function () {
      $(this).parent().toggleClass("active");
    });

  checkScroll();

});


jQuery(window).on('scroll', function(){
    checkScroll();
});

function checkScroll() {
    jQuery('.animate').each(function () {
        var elementTop = jQuery(this).offset().top;
        var elementBottom = elementTop + jQuery(this).outerHeight();

        var viewportTop = jQuery(window).scrollTop();
        var viewportBottom = viewportTop + jQuery(window).height();

        if (elementBottom > viewportTop + 100 && elementTop < viewportBottom - 100) {
            jQuery(this).addClass('show');
        }
    });
}