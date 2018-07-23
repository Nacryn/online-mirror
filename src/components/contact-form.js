import { LitElement, html } from '@polymer/lit-element'
import '@polymer/paper-button'
import '@polymer/paper-input/paper-input'
import '@polymer/paper-input/paper-textarea'

import { SharedStyles } from "../styles/shared-styles"
import { FormStyles } from "../styles/form-styles"

class ContactForm extends LitElement {
  _render(props) {
    return html`
    ${SharedStyles} ${FormStyles}
    <style>
      .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .wrapper-top {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .message {
        margin-top: var(--gutter);
        margin-bottom: var(--gutter);
      }

      paper-input, paper-textarea {
        display: block;
        width: 100%;
      }

      .send {
        margin: var(--gutter, 20px) auto;
        width: 100%
      }

      @media (min-width: 600px) {
        .wrapper-top {
          flex-direction: row;
        }

        .name {
          margin-right: var(--gutter, 20px);
        }
  
        .email {
          margin-left: var(--gutter, 20px);
        }

        .send {
          width: 400px;
        }
      }
    </style>

    <div class="wrapper">
      <div class="wrapper-top">
        <paper-input class="name" always-float-label label="Nom"></paper-input>
        <paper-input class="email" always-float-label label="Email"></paper-input>
      </div>
      
      <paper-textarea class="message" rows="5" always-float-label label="Message"></paper-textarea>
      
      <paper-button class="send primary-button">Envoyer</paper-button>
    </div>
    `
  }

  static get properties() {
    return {}
  }
}

window.customElements.define('contact-form', ContactForm)