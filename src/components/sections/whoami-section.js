import { LitElement, html } from '@polymer/lit-element'

import { SharedStyles } from '../../styles/shared-styles'
import { SectionStyles } from '../../styles/section-styles'

class WhoamISection extends LitElement {
  _render(props) {
    return html`
    ${SharedStyles} ${SectionStyles}

    <style>
      #content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    </style>

    <div id="wrapper">
      <div class="title">Et maintenant ?</div>
      <div id="content">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis veniam, voluptatum adipisci sequi necessitatibus nam molestias?
          Deleniti laboriosam at, reprehenderit iusto expedita ea necessitatibus nihil reiciendis numquam perferendis vitae
          totam?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio veritatis obcaecati nam quasi. Consectetur earum beatae ab
          sapiente dicta. Error sint velit quod? Provident, magnam natus modi fugiat nemo aspernatur. Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Earum ex natus laudantium quae aperiam quos, accusamus pariatur quod! Maiores
          minus aut vel? Ipsa deserunt voluptatibus suscipit soluta temporibus, vero cupiditate?
        </p>
      </div>
    </div>
    `
  }

  static get properties() {
    return {}
  }
}

window.customElements.define('whoami-section', WhoamISection)