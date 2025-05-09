// Sélection des éléments du menu
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Afficher le menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show_menu'); // Ajoute la classe pour afficher le menu
    document.body.classList.add('no-scroll'); // Ajoute une classe pour désactiver le défilement de la page
  });
}

// Cacher le menu
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show_menu'); // Supprime la classe pour cacher le menu
    document.body.classList.remove('no-scroll'); // Supprime la classe pour réactiver le défilement de la page
  });
}

// Fermer le menu en cliquant en dehors
document.addEventListener('click', (e) => {
  if (e.target !== navMenu && e.target !== navToggle && e.target.parentNode !== navToggle && e.target !== navClose && e.target.parentNode !== navClose) {
    navMenu.classList.remove('show_menu'); // Supprime la classe pour cacher le menu
    document.body.classList.remove('no-scroll'); // Supprime la classe pour réactiver le défilement de la page
  }
});


/*==================== AFFICHER MENU SUR PETIT ÉCRAN ====================*/
function checkScreenSize() {
    if (window.innerWidth <= 768) { // Afficher le menu si l'écran est petit
        navMenu.classList.add('show_menu');
    } else {
        navMenu.classList.remove('show_menu');
    }
}

// Vérifie au chargement et au redimensionnement de la fenêtre
//window.addEventListener('close', checkScreenSize);
//window.addEventListener('resize', checkScreenSize);

/*==================== FERMER MENU LORS DU CLIC SUR UN LIEN ====================*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction() {
    navMenu.classList.remove('show_menu'); 
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills_content'),
      skillsHeader = document.querySelectorAll('.skills_header')

function toggleSkills(){
  let itemClass = this.parentNode.className

  for(let i = 0; i < skillsContent.length; i++){
    skillsContent[i].className = 'skills_content skills_close'
  }
  if (itemClass === 'skills_content skills_close') {
    this.parentNode.className = 'skills_content skills_open'
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
  tab.addEventListener('click', () =>{
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach(tabContent =>{
      tabContent.classList.remove('qualification_active')
    })
    target.classList.add('qualification_active')

    tabs.forEach(t =>{
      t.classList.remove('qualification_active')
    })
    tab.classList.add('qualification_active')
  })
})

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services_modal'),
      modalBtns = document.querySelectorAll('.services_button'),
      modalCloses = document.querySelectorAll('.services_modal-close')

let modal = function(modalClick){
  modalViews[modalClick].classList.add('active_modal')
}

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener('click', () => {
    modal(i)
  })
})

modalCloses.forEach((modalClose) => {
  modalClose.addEventListener('click', () =>{
    modalViews.forEach((modalView) => {
      modalView.classList.remove('active_modal')
    })
  })
})

// Gestion des modals
document.addEventListener('DOMContentLoaded', function() {
  const modalButtons = document.querySelectorAll('.services_button');
  const modalCloseButtons = document.querySelectorAll('.services_modal-close');
  
  // Ouverture des modals
  modalButtons.forEach(button => {
      button.addEventListener('click', () => {
          const modal = button.nextElementSibling;
          modal.style.display = 'block';
      });
  });
  
  // Fermeture des modals
  modalCloseButtons.forEach(button => {
      button.addEventListener('click', () => {
          const modal = button.closest('.services_modal');
          modal.style.display = 'none';
      });
  });
  
  // Fermer en cliquant en dehors du contenu
  document.addEventListener('click', (e) => {
      if (e.target.classList.contains('services_modal')) {
          e.target.style.display = 'none';
      }
  });
});

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio_container', {
  cssMode: true,
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
});

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial_container', {
  loop: true,
  grabCursor: true,
  spaceBetween: 48,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  breakpoints:{
    568:{
      slidesPerView: 2,
    }
  }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
  const scrollY = window.pageYOffset 

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active_link')
    } else {
      document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active_link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    if (window.scrollY >= 80) {
      nav.classList.add('scroll_header');  
    } else {
      nav.classList.remove('scroll_header') 
    }
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up')
  if (window.scrollY >= 560) {
    scrollUp.classList.add('show_scroll')
  } else {
    scrollUp.classList.remove('show_scroll')
  }
}
window.addEventListener('scroll', scrollUp) 

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Récupérer le thème stocké localement
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// Appliquer le thème si l'utilisateur en avait sélectionné un
if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)
  localStorage.setItem('selected-theme', getCurrentTheme())
  localStorage.setItem('selected-icon', getCurrentIcon())
})
