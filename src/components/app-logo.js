import { LitElement, html } from '@polymer/lit-element'

class AppLogo extends LitElement {
  _render(props) {
    return html`
    <style>
      :host {
        display: block;
        height: var(--app-logo-size, 40px);
        width: var(--app-logo-size, 40px);
      }

      img {
        height: var(--app-logo-size, 40px);
        width: var(--app-logo-size, 40px);
      }
    </style>

    <div id="logo"><img src="../images/magic-swirl-big.png"></div>
    `
  }

  static get properties() {
    return {}
  }
}

window.customElements.define('app-logo', AppLogo)