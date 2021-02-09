class Component extends HTMLElement
{
    constructor() {
        super()
    }

    getAttr(attr) {
        return this.getAttribute(attr) || ''
    }
}