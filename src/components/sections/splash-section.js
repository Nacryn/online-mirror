import { LitElement, html } from '@polymer/lit-element'

// Style
import { SharedStyles } from '../../styles/shared-styles'
import { SectionStyles } from '../../styles/section-styles'

class SplashSection extends LitElement {
  _render(props) {
    return html`
    ${SharedStyles}
    ${SectionStyles}
    
    <style>
      #wrapper {
        height: 100vh;
        width: 100vw;
        background-image: url('https://orig00.deviantart.net/1653/f/2015/201/3/8/techno_mage_by_anicoz-d922miw.jpg');
        background-position: center top;
        background-size: cover;
        margin: 0px;
      }

      #cover {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 55vh;
        left: var(--gutter, 20px);
      }

      #title {
        color: var(--app-text-highlight);
        font-size: 59px;
        line-height: 40px;
        font-weight: 600;
        text-transform: uppercase;
      }

      #subtitle {
        font-size: 23px;
        font-weight: 300;
        line-height: 20px;
        color: var(--app-secondary-color);
        margin-top: 10px;
        text-transform: uppercase;
      }

      #why {
        margin-top: 100px;
        width: 100%;
        color: var(--app-text-highlight);
        font-size: 20px;
      }

      @media (min-width: 400px) {
        #why {
          width: 400px;
        }
      }

      @media (min-width: 800px) {
        #cover {
          left: var(--wide-gutter, 100px); 
        }

        #why {
          width: 500px;
        }
      }
    
      @media (min-width: 1100px) {
        #cover {
          left: var(--ultra-wide-gutter, 160px); 
        }
      }
    </style>

    <div id="wrapper">
      <div id="cover">
        <div id="title">Mikaël</div>
        <div id="subtitle">Développeur web</div>
        <div id="why">
          Progressez dans la réalisation de votre cause, fabriquez vous une application web sur mesure.
          <!-- Pour vous accompagner dans la réalisation de vos rêves, faites vous fabriquer des applications web sur mesure. -->
          <!-- Faites fabriquer des applications web sur mesure qui vous accompagnent dans la réalisation de vos rêves. -->
        </div>
      </div>
    </div>
    `
  }

  static get properties() {
    return {}
  }
}

window.customElements.define('splash-section', SplashSection)