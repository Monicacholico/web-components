class Modal extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }

                :host([aria-opened='true']) #backdrop, 
                :host([aria-opened='true']) #modal {
                    opacity: 1;
                    pointer-events: all;
                }

                #modal {
                    position: fixed;
                    top: 15vh;
                    left: 25%;
                    width: 50%;
                    height: auto;
                    z-index: 100;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0,0.26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    pointer-events: none;
                }

                header {
                    padding: 1rem;
                }
                header h1 {
                    font-size: 1.25rem;
                }
                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }
                #actions button {
                    margin: 0 .25rem;
                }
                #main {
                    padding: 1rem;
                }
                .not-showing {
                    display: block;
                }
            
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header> 
                    <h1>Please Confirm</h1>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button>Cancel</button>
                    <button>Okay</button>
                </section>
            </div>
        `;

    }

   attributeChangedCallback(name, oldValue, newValue) {
    // if(name === 'aria-opened') {
        if(this.hasAttribute('aria-opened')) {
                this.isOpen = true;
//             this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
//             this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
//             this.shadowRoot.querySelector('#modal').style.opacity = 1;
//             this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';

            } else {
                this.isOpen = false;
            }
        // }
   }

   static get observedAttributes() {
       return ['aria-opened']
   }

open() {
    this.setAttribute('aria-opened', 'true');
    this.isOpen = true;
}






}

customElements.define('ml-modal', Modal) 