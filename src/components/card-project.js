import { LitElement, html } from "@polymer/lit-element"
import '@polymer/paper-button'
import '@polymer/iron-icons/iron-icons'

import { NavigationMixin } from '../mixins/navigation-mixin'

import { SharedStyles } from "../styles/shared-styles"

class CardProject extends NavigationMixin(LitElement) {
  _render(props) {
    return html`
    ${SharedStyles}
    <style>
      :host {
        display: inline-block;
        height: 220px;
        padding: 20px;
        position: relative;

        background-color: #c8c8c8;
        color: var(--app-primary-color);

      }

      #title {
        font-size: 20px;
        text-transform: uppercase;
      }

      #tags {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 20px;
      }

      #see {
        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 100%;
        display: none;
      }

      .label {
        position: absolute;
        bottom: 0;
        left: 0;
        margin: 20px;
        text-transform: uppercase;
        color: var(--app-primary-color);
      }

      :host(:hover) #see {
        display: block;
      }
    </style>

    <div id="title">${props.slug}</div>

    <div id="tags">
      <iron-icon icon="polymer"></iron-icon>
      <iron-icon icon="rowing"></iron-icon>
    </div>

    <a id="see" href="project/${this.slug}">
      <div class="label">Voir</div>
    </a>
    `
  }

  static get properties() {
    return {
      slug: String,
      project: Object,
    }
  }

  _tapHandler(e) {
    console.log('going to new project')
  }
}

window.customElements.define('card-project', CardProject)