import { LitElement, html } from '@polymer/lit-element'

import { SharedStyles } from '../../styles/shared-styles'
import { SectionStyles } from '../../styles/section-styles'

class StrenghtSection extends LitElement {
  _render(props) {
    return html`
      ${SharedStyles} ${SectionStyles}
      <style>
        .strenghts {
          display: flex;
          flex-direction: column;
        }

        .strenght_elem {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: var(--app-gutter, 20px);
        }

        .symbol {
          display: inline-block;
          background-color: azure;
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          margin-right: var(--gutter, 20px);
        }

        .description {
          display: inline-block;
          flex-shrink: 1;
        }

        @media (min-width: 960px) {
          .strenghts {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .strenght_elem {
            width: 48%;
          }
        }

      </style>

      <div id="wrapper">
        <div class="title">HOW</div>

        <div class="overview">
          <p>
            En mettant à votre service mes compétences et mon expérience de développeur web full stack (i.e. dans tout le cycle de création d'une application) 
            je vous accompagne depuis la conception de votre idée jusqu'à sa réalisation.
            <br>Le tout avec la flexibilité d'un agent indépendant, et la liberté d'innover !
          </p>
        </div>

        <div class="strenghts">
          <div class="strenght_elem">
            <div class="symbol"></div>
            <div class="description">
              <p>
                SUR MESURE - Construction sur mesure, adaptée au besoins, pas de morceaux inutiles.
              </p>
            </div>
          </div>

          <div class="strenght_elem">
            <div class="symbol"></div>
            <div class="description">
              <p>
                EVOLUTIF - Developpée pour s'améliorer sur le long terme, extension au fil de nouveaux besoins.
              </p>
            </div>
          </div>

          <div class="strenght_elem">
            <div class="symbol"></div>
            <div class="description">
              <p>
                CONCEPTION / FULL STACK - Présence sur tout le cycle, vue d'ensemble, conseils techniques à toutes les étapes.
              </p>
            </div>
          </div>

          <div class="strenght_elem">
            <div class="symbol"></div>
            <div class="description">
              <p>
                ?RELATION? - Etre en contact avec ses partenaires, donner un vrai sens à la relation.
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

window.customElements.define('strenght-section', StrenghtSection)