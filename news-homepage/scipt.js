const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");
const media = window.matchMedia('(min-width: 48rem)');
const navMenu = document.querySelector('.nav-menu');
const main = document.querySelector('main')
const body = document.querySelector('body')

function setupTopNav(e){
    if(e.matches){
        navMenu.removeAttribute('inert')
        closeMobileMenu()
    } else{
        navMenu.setAttribute('inert', '')
        navMenu.style.transition = 'none';
    }
}

function openMobileMenu(){
    btnOpen.setAttribute('aria-expanded', 'true')
    navMenu.removeAttribute('inert')
    navMenu.removeAttribute('style')
    main.setAttribute('inert', '')
    body.classList.add('menu-open')
    bodyScrollLockUpgrade.disableBodyScroll(body);
    btnClose.focus()
}

function closeMobileMenu(){
    btnOpen.setAttribute('aria-expanded', 'false')
    navMenu.setAttribute('inert', '')
    main.removeAttribute('inert')
    body.classList.remove('menu-open')
    bodyScrollLockUpgrade.enableBodyScroll(body);
    btnOpen.focus()

    setTimeout(() => {
        navMenu.style.transition = 'none';
    }, 500)
}

setupTopNav(media)

btnOpen.addEventListener('click', openMobileMenu)
btnClose.addEventListener('click', closeMobileMenu)

media.addEventListener('change', function(e){
    setupTopNav(e)
})