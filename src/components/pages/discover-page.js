import { html } from '@polymer/lit-element';
import { PageViewElement } from '../page-view-element.js';

import '../sections/splash-section'
import '../sections/vision-section'
import '../sections/strenght-section'
import '../sections/tech-section'
import '../sections/whoami-section'

// Connect to store
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store'
// Actions
import { endScroll } from '../../actions/scroll'

// These are the shared styles needed by this element.
import { SharedStyles } from '../../styles/shared-styles';
import { PageStyles } from '../../styles/page-styles';

class DiscoverPage extends connect(store)(PageViewElement) {
  _render(props) {
    console.log('magnifique : ', props._isScrolling, props._offset);

    return html`
      ${SharedStyles} ${PageStyles}
      <style>
        #splash {
          margin-top: calc(-20px - 64px);
          padding-top: 0;
        }
      </style>

      <splash-section id="splash"></splash-section>
      <vision-section id="vision"></vision-section>
      <strenght-section id="strenght"></strenght-section>
      <tech-section id="tech"></tech-section>
      <whoami-section id="whoami"></whoami-section>
    `
  }

  static get properties() {
    return {
    }
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
    this._isScrolling = state.scroll.isScrolling
    this._offset = state.scroll.offset
  }

  _didRender() {
    // console.log("I WANT TO SCROLL")
    // this.shadowRoot.querySelector('#'+this._offset).scrollIntoView()
    // store.dispatch(endScroll())
  }
}

window.customElements.define('discover-page', DiscoverPage);

const anchors = [
  { label: 'Why', offset: 'vision' },
  { label: 'How', offset: 'strenght' },
  { label: 'What', offset: 'tech' },
  { label: 'More', offset: 'whoami' },
]

export { anchors }