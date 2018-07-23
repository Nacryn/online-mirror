import { html } from '@polymer/lit-element'
import { PageViewElement } from '../page-view-element'
import '@polymer/iron-icons/iron-icons'

import '../section'
import '../sections/projects-section'

// Connect to store
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../../store'

// These are the shared styles needed by this element.
import { SharedStyles } from '../../styles/shared-styles';
import { PageStyles } from '../../styles/page-styles';

class ExplorePage extends connect(store)(PageViewElement) {
  _render(props) {
    return html `
    ${SharedStyles} ${PageStyles}
    <style>
      .filter-bloc {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .filter-title {
        font-size: 18px;
        font-weight: 500;
        text-transform: uppercase;
        padding: 10px 0;
      }

      .filters {
        display: flex;
        flex-direction: row;
      }

      .filter {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-left: var(--gutter, 20px);
        width: 80px;
      }

      .filter .label {
        font-weight: 300;
        font-size: 12px;
      }
    </style>

    <app-section>
      <div class="page-title">Exploration</div>
    </app-section>

    <app-section id="search">  
      <p>Ea duis bonorum nec, falli paulo aliquid ei eum.</p>
      <p>Id nam odio natum malorum, tibique copiosae expetenda mel ea.Detracto suavitate repudiandae no eum. Id adhuc minim soluta nam.Id nam odio natum malorum, tibique copiosae expetenda mel ea.</p>

      <div class="filter-bloc">
        <div class="filter-title">Filtres</div>
        <div class="filters">
          ${Object.keys(props._filtres).map((key) => {
            const item = props._filtres[key];
            return html`
            <div class="filter">
              <iron-icon icon="${item.icon}"></iron-icon>
              <div class="label">${item.label}</div>
            </div>
            `
          })}
        </div>
      </div>
    </app-section>

    <projects-section id="grid">
    </projects-section>
    `
  }

  static get properties() {
    return {
      _filtres: {
        type: Array,
        notify: true
      }
    }
  }

  constructor() {
    super()
    this._filtres = [
      { label: "projets", icon:"work"},
      { label: "composants", icon:"polymer"},
      { label: "divers", icon:"bug-report"}
    ]
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

window.customElements.define('explore-page', ExplorePage)

const anchors = [
  { label: 'Search', offset: 'search' },
  { label: 'Grid', offset: 'grid' },
]

export { anchors }