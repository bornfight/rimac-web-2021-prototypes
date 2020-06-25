export default class DarkModeHelper {
    /**
     *
     */
    constructor() {
        this.DOM = {
            body: "body",
            states: {
                isLight: "is-light",
            },
        };

        const consoleLogStyle = [
            "background-color: #a6a6a6",
            "color: black",
            "display: block",
            "line-height: 24px",
            "text-align: center",
            "border: 1px solid #ffffff",
            "font-weight: bold",
        ].join(";");

        this.body = document.getElementsByTagName(this.DOM.body)[0];

        console.info("toggle dark mode: %c Alt/Option + D ", consoleLogStyle);
    }

    init() {
        // console.log("DarkModeHelper init()");
        this.toggleDarkMode();
    }

    toggleDarkMode() {
        document.addEventListener("keyup", (ev) => {
            if (ev.keyCode === 68 && ev.altKey) {
                if (this.body.classList.contains(this.DOM.states.isLight)) {
                    this.body.classList.remove(this.DOM.states.isLight);
                } else {
                    this.body.classList.add(this.DOM.states.isLight);
                }
            }
        });
    }
}
