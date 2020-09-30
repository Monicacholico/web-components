class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        // const template = document.querySelector('#button-template');
        // console.log(template)
        // this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.innerHTML = `
        <slot></slot><p>More info</p>
        `;
    }

    connectedCallback() {
        const newButton = document.createElement('button');
        newButton.textContent = 'Show Me';
        this.appendChild(newButton);

        newButton.addEventListener('click', this._showMore.bind(this) )
    }

    _showMore() {
        const infoEl = this.shadowRoot.querySelector('p');
        const button = this.querySelector('button');
        if (button.textContent ==='Show') {
            infoEl.style.display = 'block';
            button.textContent = 'Hide';
          } else {
            infoEl.style.display = 'none';
            button.textContent = 'Show';
          }
    }
}

customElements.define('ml-button', Button);