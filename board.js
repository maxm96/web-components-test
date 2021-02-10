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
        
        .opponents, .user-hand {
            display: flex;
            width: 100%;
            height: 480px;
        }
        </style>
        
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
            console.log(e.dataTransfer.getData('text/plain'))
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

        // Make the card draggable
        cardElem.setAttribute('draggable', true)
        cardElem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', card.name)
            e.dataTransfer.dropEffect = 'link'
        })

        this.userHand.appendChild(cardElem)
    }

    removeCard(cardName) {

    }

    connectedCallback() {
        this.opponents = this.shadowRoot.querySelector('.opponents')
        this.userHand = this.shadowRoot.querySelector('.user-hand')
    }
}

customElements.define('my-board', Board)