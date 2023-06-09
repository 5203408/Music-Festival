(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Work isotope and filter
   */
  window.addEventListener('load', () => {
    let workContainer = select('.work-container');
    if (workContainer) {
      let workIsotope = new Isotope(workContainer, {
        itemSelector: '.work-item',
        layoutMode: 'fitRows'
      });

      let workFilters = select('#work-flters li', true);

      on('click', '#work-flters li', function(e) {
        e.preventDefault();
        workFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        workIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });



  /**
   * Merchandise isotope and filter
   */
  window.addEventListener('load', () => {
    let merchandiseContainer = select('.merchandise-container');
    if (merchandiseContainer) {
      let merchandiseIsotope = new Isotope(merchandiseContainer, {
        itemSelector: '.merchandise-item',
        layoutMode: 'fitRows'
      });

      let merchandiseFilters = select('#merchandise-flters li', true);

      on('click', '#merchandise-flters li', function(e) {
        e.preventDefault();
        merchandiseFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        merchandiseIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });


  /**
   * Band isotope and filter
   */
  window.addEventListener('load', () => {
    let bandContainer = select('.band-container');
    if (bandContainer) {
      let bandIsotope = new Isotope(bandContainer, {
        itemSelector: '.band-item',
        layoutMode: 'fitRows'
      });

      let bandFilters = select('#band-flters li', true);

      on('click', '#band-flters li', function(e) {
        e.preventDefault();
        bandFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        bandIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });



  /**
   * Initiate work lightbox 
   */
  const workLightbox = GLightbox({
    selector: '.work-lightbox'
  });

  /**
   * Initiate work details lightbox 
   */
  const workDetailsLightbox = GLightbox({
    selector: '.work-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Work details slider
   */

  
  new Swiper('.work-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  }); 






  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()