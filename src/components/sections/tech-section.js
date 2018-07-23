import { LitElement, html } from '@polymer/lit-element'

import { SharedStyles } from '../../styles/shared-styles'
import { SectionStyles } from '../../styles/section-styles'

class TechSection extends LitElement {
  _render(props) {
    return html`
    ${SharedStyles} ${SectionStyles}

    <style>
      :host {
        --symbol-width: 360px;
        --symbol-height: 175px;
      }

      #content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .element {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: calc(var(--app-gutter, 20px) * 2);
      }

      .symbol {
        background-color: azure;
        width: 100%;
        height: var(--symbol-height);
        flex-shrink: 0;
        order: 2;
      }

      .description {
        flex-grow: 1;
        order: 1;
      }

      @media (min-width: 960px) {
        .element {
          flex-direction: row;
        }

        .symbol {
          margin-left: var(--gutter, 20px);
          width: var(--symbol-width);
        }
      }
    </style>

    <div id="wrapper">
      <div class="title">WHAT</div>
      <div id="content">
        <div class="element">
          <div class="symbol"></div>
          <div class="description">
            <p>
              SPA - (toutes les technos cool et les possibilités) Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis veniam, voluptatum adipisci sequi necessitatibus nam molestias?
              Deleniti laboriosam at, reprehenderit iusto expedita ea necessitatibus nihil reiciendis numquam perferendis
              vitae totam?
            </p>
          </div>
        </div>

        <div class="element">
          <div class="symbol"></div>
          <div class="description">
            <p>
              CLOUD - (online, pas de gestion, entretien faible) Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio veritatis obcaecati nam quasi. Consectetur earum beatae ab
              sapiente dicta. Error sint velit quod? Provident, magnam natus modi fugiat nemo aspernatur.
            </p>
          </div>
        </div>
      </div>
    </div>
    `
  }

  static get properties() {
    return {}
  }
}

window.customElements.define('tech-section', TechSection)