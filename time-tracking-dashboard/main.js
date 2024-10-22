const cardsContainer = document.querySelector('.activity-cards')
const menuItems = document.querySelectorAll('.profile-card__stats-list-item')

const data = [
    {
      "title": "Work",
      "timeframes": {
        "daily": {
          "current": 5,
          "previous": 7
        },
        "weekly": {
          "current": 32,
          "previous": 36
        },
        "monthly": {
          "current": 103,
          "previous": 128
        }
      }
    },
    {
      "title": "Play",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 2
        },
        "weekly": {
          "current": 10,
          "previous": 8
        },
        "monthly": {
          "current": 23,
          "previous": 29
        }
      }
    },
    {
      "title": "Study",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 7
        },
        "monthly": {
          "current": 13,
          "previous": 19
        }
      }
    },
    {
      "title": "Exercise",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 1
        },
        "weekly": {
          "current": 4,
          "previous": 5
        },
        "monthly": {
          "current": 11,
          "previous": 18
        }
      }
    },
    {
      "title": "Social",
      "timeframes": {
        "daily": {
          "current": 1,
          "previous": 3
        },
        "weekly": {
          "current": 5,
          "previous": 10
        },
        "monthly": {
          "current": 21,
          "previous": 23
        }
      }
    },
    {
      "title": "Self Care",
      "timeframes": {
        "daily": {
          "current": 0,
          "previous": 1
        },
        "weekly": {
          "current": 2,
          "previous": 2
        },
        "monthly": {
          "current": 7,
          "previous": 11
        }
      }
    }
]

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuItems.forEach(item => {
            item.classList.remove('active')
        })
        item.classList.add('active')

        const itemText = item.textContent.toLowerCase()
        cardsContainer.innerHTML = ""

        data.forEach(card => {
            cardsContainer.appendChild(createCard({
                title: card.title,
                timeframes: card.timeframes,
                time: itemText
            }))
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

data.forEach(card => {
    cardsContainer.appendChild(createCard(card))
})


