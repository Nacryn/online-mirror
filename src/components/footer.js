import { LitElement, html } from '@polymer/lit-element'

import { SharedStyles } from '../styles/shared-styles'

class AppFooter extends LitElement {
  _render(props) {
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: block;
        width: 100%;
        background-color: #202124;
        color: var(--app-text-highlight);
        padding-top: var(--gutter, 20px);
        padding-bottom: var(--gutter, 20px);
      }

      #content {
        margin-left: var(--gutter, 20px);
        margin-right: var(--gutter, 20px);
      }

      @media (min-width: 800px) {
        #content {
          margin-left: var(--wide-gutter, 100px);
          margin-right: var(--wide-gutter, 100px);
        }
      }
    
      @media (min-width: 1100px) {
        #content {
          margin-left: var(--ultra-wide-gutter, 160px);
          margin-right: var(--ultra-wide-gutter, 160px);
        }
      }
    </style>

    <div id="content">
      Réalisé par <a href="/theforge" class="no-style">...</a>
    </div>
    `
  }

  static get properties() {
    return {}
  }
}

window.customElements.define('app-footer', AppFooter)