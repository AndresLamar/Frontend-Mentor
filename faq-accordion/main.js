const buttons = document.querySelectorAll('.accordion-button')

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true'
        button.setAttribute('aria-expanded', !expanded);

        const panel = document.getElementById(button.getAttribute('aria-controls'))

        if (!expanded) {
            panel.removeAttribute('hidden')
            button.querySelector('.accordion-item__icon')
                .setAttribute('src', './assets/images/icon-minus.svg')
        } else {
            panel.setAttribute('hidden', true)
            button.querySelector('.accordion-item__icon')
                .setAttribute('src', './assets/images/icon-plus.svg')
        }
    })
})