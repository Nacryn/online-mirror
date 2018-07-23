import { LitElement, html } from '@polymer/lit-element'

import { SharedStyles } from '../../styles/shared-styles'
import { SectionStyles } from '../../styles/section-styles'

class VisionSection extends LitElement {
  _render(props) {
    return html `
    ${SharedStyles} ${SectionStyles}

    <style>
      :host {
      }

      #content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
      }
    </style>

    <div id="wrapper">
      <div id="content">
        <div class="title">Un monde nouveau</div>
        <p>
          Vous voulez construire un monde avec des outils qui aident à réaliser vos objectifs, et ne se mettent jamais en travers de votre route.
          Vous désirez une experience simple et utile, à la limite du magique. Et vous souhaitez que tout ça évolue avec vous.
        </p>

        <p>
          Il faut étoffer un peu ceci, et l'agrémenter d'une image ou deux, voir d'un schéma.<br>
          Parce que les schémas c'est cool.
        </p>
      </div>
    </div>
    `
  }

  static get properties() {
    return {}
  }
}

window.customElements.define('vision-section', VisionSection)