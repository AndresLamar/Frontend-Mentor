const btnOpen = document.getElementById("btnOpen");
const btnClose = document.getElementById("btnClose");
const media = window.matchMedia('(min-width: 48rem)');
const navMenu = document.querySelector('.js-menu');
const body = document.querySelector('body');
const main = document.querySelector('main');

const card = document.querySelector('.js-card');
const pictures = document.querySelectorAll('.js-picture');
const cardTexts = document.querySelectorAll('.js-card-text');
const previousBtn = document.querySelector('.js-previous-button');
const nextBtn = document.querySelector('.js-next-button');

function getNewIndex(currentIndex, direction, totalItems) {
    if (direction === 'next') {
        return (currentIndex + 1) % totalItems; // Avanza al siguiente índice cíclicamente
    } else if (direction === 'previous') {
        return (currentIndex - 1 + totalItems) % totalItems; // Retrocede al índice anterior cíclicamente
    }
    return currentIndex; // En caso de que la dirección sea inválida
}


function updateThumbnail(direction){
    let currentIndex = -1;

    // Encuentra el índice de la imagen actual
    pictures.forEach((picture, index) => {
        if (picture.classList.contains('current')) {
            currentIndex = index;
            picture.classList.remove('current'); // Elimina la clase `current`
        }
    });

    // Calcula el nuevo índice usando la función centralizada
    const newIndex = getNewIndex(currentIndex, direction, pictures.length);

    // Agrega la clase `current` al elemento correspondiente
    pictures[newIndex].classList.add('current');
}

function updateText(direction){
    let currentIndex = -1;

    // Encuentra el índice de la imagen actual
    cardTexts.forEach((picture, index) => {
        if (picture.classList.contains('current')) {
            currentIndex = index;
            picture.classList.remove('current'); // Elimina la clase `current`
        }
    });

    // Calcula el nuevo índice usando la función centralizada
    const newIndex = getNewIndex(currentIndex, direction, cardTexts.length);

    // Agrega la clase `current` al elemento correspondiente
    cardTexts[newIndex].classList.add('current');
}

nextBtn.addEventListener('click', () => {
    
});

previousBtn.addEventListener('click', () => {
    updateThumbnail('previous')
    updateText('previous')
});

document.addEventListener("keydown", (e) => {
    if(e.code == "ArrowRight"){
        updateThumbnail('next')
        updateText('next')
    }else if(e.code == "ArrowLeft"){
        updateThumbnail('previous')
        updateText('previous')
    }    
   })

function setupTopNav(e){
    if(e.matches){
        navMenu.removeAttribute('inert')
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