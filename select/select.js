const getTemplate = (data = [], placeHolder, selectedId) => {
    let text = placeHolder ?? 'Placeholder default'
    let isSelect = false
    const itemsHTML = data.map(i => {
        isSelect = false
        if (i.id === selectedId) {
            text = i.value
            isSelect = true
        }
        return `
            <li class="select__item ${isSelect ? 'selected' : ''}" data-type="item" data-value=${i.id}>${i.value}</li>`
    })

    return `
     <div class="select__input" data-type="input">
                <span data-type="valueSelect">${text}</span>
                <i class="fa fa-chevron-down" data-type="downOrUp" ></i>
            </div>
            <div id="openAndClose" class="select__dropdown">
                <ul class="select__list">
                    ${itemsHTML.join('')}
                </ul>
            </div>
        </div>
    `
}


export class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)

        this.options = options

        this.selectId = options.selectedId < options.data.size ? options.selectedId : null

        this.#render()
        this.$valueSelect = this.$el.querySelector('[data-type="valueSelect"]')

        this.#openWin()
    }

    #render() {
        const {placeHolder, data} = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeHolder, this.selectId)


    }

    #openWin() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$downOrUp = this.$el.querySelector('[data-type="downOrUp"]')


    }

    clickHandler(event) {
        const {type} = event.target.dataset
        if (type === 'input') {
            this.toggle()
        } else if (type === 'item') {
            const id = event.target.dataset.value
            this.select(id)
        }
    }

    get itemInDataSelected() {
        return this.options.data.find(i => i.id === this.selectId)
    }

    select(id) {
        let item = this.$el.querySelector(`[data-value="${this.selectId}"]`)
        if (this.selectId != null)
            item.classList.remove("selected")

        this.selectId = id
        this.$valueSelect.textContent = this.itemInDataSelected.value
        item = this.$el.querySelector(`[data-value="${id}"]`)
        item.classList.add("selected")

        this.options.selectedId ? this.options.isSelected(this.itemInDataSelected) : null

        this.close()

    }

    get isOpen() {
        const open = document.querySelector('#openAndClose')
        if (open.style.display === 'block') {
            return true
        }
        return false
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        const open = document.querySelector('#openAndClose')
        open.style.display = 'block'

        this.$downOrUp.classList.remove("fa-chevron-down")
        this.$downOrUp.classList.add("fa-chevron-up")

    }

    close() {
        const open = document.querySelector('#openAndClose')
        open.style.display = 'none'

        this.$downOrUp.classList.remove("fa-chevron-up")
        this.$downOrUp.classList.add("fa-chevron-down")

    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler())
        this.$el.innerHTML = ''
    }
}