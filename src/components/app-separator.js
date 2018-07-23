import { LitElement, html } from '@polymer/lit-element'

class AppSeparator extends LitElement {
  _render(props) {
    return html`
    <style>
      :host {
        display: block;
        height: 2px;
        background-color: black;

        margin-left: var(--gutter);
        margin-right: var(--gutter);
      }
    </style>

    <div id="separator"></div>
    `
  }

  static get properties() {
    return {}
  }
}

window.customElements.define('app-separator', AppSeparator)