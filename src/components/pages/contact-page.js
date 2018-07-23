import { html } from '@polymer/lit-element';
import { PageViewElement } from '../page-view-element.js';

import '../section'
import '../contact-form'

// Connect to store
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store'

// These are the shared styles needed by this element.
import { SharedStyles } from '../../styles/shared-styles';
import { PageStyles } from '../../styles/page-styles';

class ContactPage extends connect(store)(PageViewElement) {
  _render(props) {
    return html`
      ${SharedStyles} ${PageStyles}

      <app-section id="contact">
        <div class="page-title">Contact</div>
      </app-section>
      
      <app-section>
        <p>
        Après vous être baladé un peu sur le site, si vous voulez en savoir un peu plus sur moi, <a href="contact/#about">c'est juste en dessous</a>.<br>
        
        </p>

        <p>
          Sinon, n'hésitez pas à me laisser un message. Pour une question, des remarques (sur le site ou des démos), un projet, des détails, laissez moi votre nom, email, quelques lignes et hop !
          Je réponds dans la mesure de deux bras disponibles :thumbsup:
        </p>
      </app-section>
  
      <app-section>
        <contact-form id="form"></contact-form>
      </app-section>

      <app-section id="about">
        <div class="page-title">A propos</div>
        <p>
          J'essaye d'être quelqu'un de bien, malgré un esprit bien confus.<br>
          Merci.
        </p>
      </app-section>
    `
  }

  static get properties() {
    return {}
  }

  set _offset (offset) {
    if (!this.shadowRoot || !offset) return

    console.log("Scrolling : ", offset);
    const target = this.shadowRoot.querySelector('#'+offset)
    if (target) {
      target.scrollIntoView()
    }
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._offset = state.scroll.offset
  }
}

window.customElements.define('contact-page', ContactPage);

const anchors = [
  { label: 'Contact', offset: 'contact' },
  { label: 'A propos', offset: 'about' },
]

export { anchors }