class Countdown extends Component
{
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' })
        const container = document.createElement('div')

        const time = this.getAttr('time')

        container.classList.add('countdown')

        container.innerHTML = `
        <style>
        .countdown {
            height: 100%;
            width: 100%;
        }
        
        .time {
            font-size: 26px;
            margin: 10px;
        }
        </style>
        
        <span class="time">${time}</span>
        `

        this.setTime = this.setTime.bind(this)
        this.startCountdown = this.startCountdown.bind(this)
        this.stopCountdown = this.stopCountdown.bind(this)

        this.countdownHandle = null

        shadow.appendChild(container)
    }

    setTime(time) {
        this.time.innerText = time
    }

    startCountdown() {
        if (this.countdownHandle !== null) return

        this.countdownHandle = setInterval(() => {
            let nextTime = Number(this.time.innerText) - 1

            if (nextTime > -1) {
                this.time.innerText = nextTime
            } else {
                this.stopCountdown()

                // Emit a countdown finished event
                const event = new Event('countdownfinished')
                this.dispatchEvent(event)
            }
        }, 1000)
    }

    stopCountdown() {
        clearInterval(this.countdownHandle)
        this.countdownHandle = null
    }

    connectedCallback() {
        this.time = this.shadowRoot.querySelector('.time')

        this.setTime(this.getAttr('time'))
    }
}

customElements.define('my-countdown', Countdown)