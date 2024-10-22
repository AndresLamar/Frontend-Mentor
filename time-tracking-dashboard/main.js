const cardsContainer = document.querySelector('.activity-cards')
const menuItems = document.querySelectorAll('.profile-card__stats-list-item')

async function fetchJson(){
    const response = await fetch('./data.json')

    if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
    }

    const data = await response.json()
    return data
}

const promise = fetchJson()

promise
    .then(data => {
        data.forEach(card => {
            cardsContainer.appendChild(createCard({
                title: card.title,
                timeframes: card.timeframes
            }))
        })
    })

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(item => {
            item.classList.remove('active')
        })
        item.classList.add('active')

        const itemText = item.textContent.toLowerCase()
        cardsContainer.innerHTML = ""

        promise
            .then(data => {
                data.forEach(card => {
                    cardsContainer.appendChild(createCard({
                        title: card.title,
                        timeframes: card.timeframes,
                        time: itemText
                    }))
                })
            })
    })
})

function createCard({title, timeframes, time = 'weekly' }){
    const card = document.createElement('li')
    card.classList.add('activity__card-item')
    card.style.backgroundColor = `var(--primary-${title.replace(/\s/g, "").toLowerCase()})`

    const cardContainer = document.createElement('article')
    cardContainer.classList.add('activity__card-container')
    cardContainer.style.backgroundImage = `url(./images/icon-${title.replace(/\s/g, "").toLowerCase()}.svg)`

    cardContainer.innerHTML = `
        <div class="activity__card-item-details">
            <div class="activity__card-item-activity">
            <h2 class="activity__card-item-title">${title}</h2>
            <img src="./images/icon-ellipsis.svg" alt="More options" width="21" height="5" class="activity__card-item-more-details-icon">
            </div>

            <div class="activity__card-item-more-details">
            <p class="activity__card-item-current-time">${timeframes[time].current}hrs</p>
            <p class="activity__card-item-previous-time">Last Week - ${timeframes[time].previous}hrs</p>
            </div>
        </div>`

    card.appendChild(cardContainer)

    return card
}