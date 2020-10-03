class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Some dummy tooltip text';
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <style>
      div {
        font-weight: normal;
        background-color: black;
        color: white;
        position: absolute;
        z-index: 10;
        padding: .15rem;
        border-radius 3px;
        box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
          }
          :host(.important){
            background-color: var(--color-primary);
            padding: 0.15rem;
          }
          :host-context(p) {
            font-weight: bold;
          }
          ::slotted(.highlight) {
          // background-color: red;
          border-bottom: 1px dotted red;
        }
        .icon {
          background: black;
          padding: 0.15rem 0.5rem;
          border-radius: 50%;
          text-align: center;
          color: white;
        }
    </style>
    <slot>Some default</slot>
    <span class="icon"> ?</span>
    `;
  }
  
  connectedCallback() {
    if(this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }
    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative';
  }

  attributeChangedCallback(nam, oldValue, newValue) {
    if(oldValue === newValue) {
      return;
    }
    if(nam === 'text') {
      this.__tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ['text']
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer); 
  }


}


customElements.define('ml-tooltip', Tooltip);