import Component from './component'

class Card extends Component
{
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })
        const cardContainer = document.createElement('div')

        const title = this.getAttr('title')
        const description = this.getAttr('description')
        const number = this.getAttr('number')
        const image = this.getAttr('image')
        const count = this.getAttr('count')

        cardContainer.classList.add('card')

        cardContainer.innerHTML = `
        <style>
        .card {
            height: 275px;
            width: 240px;
            border: 1px solid gray;
            border-radius: 5px;
            padding: 4px;
            margin-left: 2px;
            animation: fadein 1s;
        }
        
        .card-title {
            margin-left: 10px;
        }
        
        .card-image {
            margin-top: 10px;
            margin-bottom: 10px;
        }
        </style>
        
        <span class="card-number">${number}</span>
        <span class="card-title">${title}</span>
        <span class="card-count">${count}</span>
        <img class="card-image" src="${image}" alt="Some image">
        <p class="card-description">${description}</p>
        `

        shadow.appendChild(cardContainer)
    }

    // Since a card can be dynamically created we must set attributes once component is attached to dom
    connectedCallback() {
        this.shadowRoot.querySelector('.card-number').innerText = this.getAttr('number')
        this.shadowRoot.querySelector('.card-title').innerText = this.getAttr('title')
        this.shadowRoot.querySelector('.card-count').innerText = this.getAttr('count')
        this.shadowRoot.querySelector('.card-description').innerText = this.getAttr('description')
        this.shadowRoot.querySelector('.card-image').setAttribute('src', this.getAttr('image'))
    }
}

customElements.define('my-card', Card)