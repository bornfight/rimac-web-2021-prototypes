export default class EqualHeight {
    constructor() {
        this.DOM = {
            element: ".js-list-item",
            elementContent: "h3",
            states: {}
        };

        this.elements = document.querySelectorAll(this.DOM.element);

        this.height = 0;

        this.init();
    }

    init() {
        this.getHeight(this.elements);
    }

    getHeight() {
        for (let i = 0, l = this.elements.length; i < l; i++) {
            const height = this.elements[i].querySelector(this.DOM.elementContent).offsetHeight;

            if (height > this.height) {
                this.height = height;
            }
        }

        this.setEqualHeights(this.height);
    }

    setEqualHeights(height) {
        for (let i = 0, l = this.elements.length; i < l; i++) {
            this.elements[i].style.minHeight = `${height}px`;
        }
    }
}
