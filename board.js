class Board extends HTMLElement
{
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })
        const container = document.createElement('div')

        container.classList.add('board')

        container.innerHTML = `
        <style>
        .board {
            width: 100%;
        }
        
        .top-bar {
            width: 100%;
            height: 275px;
        }
        
        .opponents, .user-hand {
            display: flex;
            width: 100%;
            height: 300px;
        }
        
        .user-hand {
            flex-direction: row-reverse;
        }
        </style>
        
        <div class="top-bar">
            <my-countdown time="30"></my-countdown>
        </div>
        
        <div class="opponents"></div>
        <div class="user-hand"></div>
        `
        this.addOpponent = this.addOpponent.bind(this)
        this.addCard = this.addCard.bind(this)
        this.removeCard = this.removeCard.bind(this)

        shadow.appendChild(container)
    }

    addOpponent(opponent) {
        const opponentElem = document.createElement('my-opponent')

        if (opponent.name) opponentElem.setAttribute('name', opponent.name)
        if (opponent.status) opponentElem.setAttribute('status', opponent.status)
        if (opponent.playedCards) opponentElem.setAttribute('played-cards', opponent.playedCards.join(','))

        // Make the opponent a droppable zone
        opponentElem.addEventListener('dragover', (e) => {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'link'
        })
        opponentElem.addEventListener('drop', (e) => {
            this.removeCard(e.dataTransfer.getData('text/plain'))
        })

        this.opponents.appendChild(opponentElem)
    }

    addCard(card) {
        const cardElem = document.createElement('my-card')

        if (card.title) cardElem.setAttribute('title', card.title)
        if (card.number) cardElem.setAttribute('number', card.number)
        if (card.count) cardElem.setAttribute('count', card.count)
        if (card.image) cardElem.setAttribute('image', card.image)
        if (card.description) cardElem.setAttribute('description', card.description)

        cardElem.classList.add(this.cardClass(card.title))

        // Make the card draggable
        cardElem.setAttribute('draggable', true)
        cardElem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', card.title)
            e.dataTransfer.dropEffect = 'link'
        })

        this.userHand.appendChild(cardElem)
    }

    removeCard(cardName) {
        let cardClass = this.cardClass(cardName)
        let cardElem = this.userHand.querySelector(`.${cardClass}`)

        if (!cardElem) {
            console.error(`Unable to find card with class ${cardClass}`)
            return
        }

        cardElem.parentNode.removeChild(cardElem)
    }

    cardClass(cardName) {
        return cardName.toLowerCase().replace(' ', '-')
    }

    connectedCallback() {
        this.opponents = this.shadowRoot.querySelector('.opponents')
        this.userHand = this.shadowRoot.querySelector('.user-hand')
        this.countdown = this.shadowRoot.querySelector('my-countdown')

        this.countdown.addEventListener('countdownfinished', (e) => {
            console.log('countdownfinished', e)
        })
    }
}

customElements.define('my-board', Board)