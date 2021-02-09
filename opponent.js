class Opponent extends Component
{
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })
        const container = document.createElement('div')

        const name = this.getAttr('name')
        const status = this.getAttr('status')
        const playedCards = this.getAttr('played-cards').split(',')

        container.classList.add('opponent')

        container.innerHTML = `
        <style>
        .opponent {
            height: 275px;
            width: 240px;
            border: 1px solid black;
            border-radius: 5px;
            padding: 4px;
            margin-left: 2px;
        }
        </style>
        
        <span class="opponent-name">${name}</span>
        <span class="opponent-status">${status}</span>
        <ul class="opponent-played-cards">
            ${playedCards.filter(pc => pc).map(pc => `<li class="played-card">${pc}</li>`).join('')}
        </ul>
        `

        shadow.appendChild(container)
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.opponent-name').innerText = this.getAttr('name')
        this.shadowRoot.querySelector('.opponent-status').innerText = this.getAttr('status')

        const playedCardsEl = this.shadowRoot.querySelector('.opponent-played-cards')
        this.getAttr('played-cards').split(',').forEach((pc) => {
            if (!pc || !pc.length) return

            let liEl = document.createElement('li')

            liEl.classList.add('played-card')
            liEl.innerText = pc

            playedCardsEl.appendChild(liEl)
        })
    }
}

customElements.define('my-opponent', Opponent)