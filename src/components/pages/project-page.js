// Provided elements
import { html } from '@polymer/lit-element';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status';
import { PageViewElement } from '../page-view-element.js';
import '@polymer/paper-dialog'
import '@polymer/paper-button'
import '@polymer/iron-image'
import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-icon-button'
// Custom elements
import '../section'
import '../carousel'
// Shared styles needed by this element.
import { SharedStyles } from '../../styles/shared-styles';
import { PageStyles } from '../../styles/page-styles';
import { ModalStyles } from '../../styles/modal-styles';

// Connect to redux store
import { connect } from 'pwa-helpers/connect-mixin'
import { store } from '../../store'
// Actions
import { openModal, closeModal } from '../../actions/modal'
import { fetchProject } from '../../actions/project'

// Lazy loading its reducer.
import { project } from '../../reducers/project'

store.addReducers({
  project
});

class ProjectPage extends connect(store)(PageViewElement) {
  _render({ _project, _selectedIllu }) {
    if (!_project) return

    return html`
      ${SharedStyles} ${PageStyles} ${ModalStyles}
      <style>
        :host {
          background-color: #fff;
          color: black;
          margin-top: 0;
          padding-top: calc(var(--gutter, 20px) + 64px);

          --app-section-title-color: black;
        }

        .page-title {
          color: black;
        }

        .tags {
          display: flex;
          flex-direction: row;
        }

        .tag {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          margin-right: var(--gutter, 20px);
        }

        .symbol {
          display: block;
          width: 65px;
          height: 30px;
          background-color: #828282;
        }

        .label {
          font-weight: 300;
        }

        .go-back {
          font-weight: 300;
        }

        .wrapper-thumbnails {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        .thumbnail {
          display: block;
          width: 220px;
          height: 100px;
          background-color: #828282;
          margin-right: var(--gutter);
          cursor: pointer;
        }

        app-carousel {
          display: flex;
          width: 100%;
          height: 320px;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.16),0px 2px 5px 0px rgba(0,0,0,0.23);
          z-index: 1;
          --carousel-border-radius: 3px;
        }
      </style>

      <app-section>
        <div class="page-title">${_project.title}</div>
        <div class="go-back"><a href="explore" class="no-style">Retourner à la liste</a></div>
      </app-section>

      <app-section id="pres">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam temporibus quaerat amet optio sint voluptate unde dignissimos ex, voluptatum libero et incidunt deleniti soluta fuga, neque sapiente nobis. In!
      </app-section>

      <app-section id="tags">
        <div class="tags">
          ${Object.keys(_project.tags).map((key) => {
            const item = _project.tags[key];
            return html`
            <div class="tag">
              <div class="symbol"></div>
              <div class="label">${item.label}</div>
            </div>
            `
          })}
        </div>
      </app-section>

      <app-section id="thumbnails">
        <div slot="title">Illustrations</div>
        <div class="wrapper-thumbnails">
          ${Object.keys(_project.illustrations).map((key) => {
            const item = _project.illustrations[key];
            return html`
            <div class="thumbnail" on-click="${() => store.dispatch(openModal("illustrations", {illustration: item.id}))}">
              <iron-image
                style="width:220px; height:100px;"
                placeholder="${item.base64}"
                sizing="cover"
                preload src$="${item.src}"
                alt="${item.name}"
                fade>
              </iron-image>
            </div>
            `
          })}
        </div>
      </app-section>

      <app-section id="carousel">
        <div slot="title">Carousel de Test</div>
        <app-carousel id="bloub" products="${_project.illustrations}"></app-carousel>
      </app-section>

      <app-section id="contexte">
          <div slot="title">Contexte</div>
          <p>
            Il y a du contexte, pour ce projet, ça c'est sur.
          </p>
      </app-section>

      <paper-dialog id="illustrations" class="dial" with-backdrop>
        <paper-icon-button class="dismiss-button" icon="close" dialog-dismiss></paper-icon-button>
        <iron-image
          style="width:100%; height:100%;"
          placeholder="${_selectedIllu.base64}"
          sizing="cover"
          preload src$="${_selectedIllu.src}"
          alt="${_selectedIllu.name}"
          fade>
        </iron-image>
        <div class="action-bar">
          <div class="details">
            Un personnage magicien
          </div>
          <div class="actions">
            <paper-button on-click="${ () => this._changeIllustration("prev") }">Précédente</paper-button>
            <paper-button on-click="${ () => this._changeIllustration("next") }">Suivante</paper-button>
          </div>
        </div>
      </paper-dialog>
    `
  }

  static get properties() {
    return {
      _modal: Object,
      _project: Object,
      _selectedIllu: Object
    }
  }

  constructor() {
    super()
    this._selectedIllu = {}
    afterNextRender(this, () => {
      this.addEventListener('iron-overlay-closed', this._closeModal)
    })
  }

  // Add a check in any form to know if it's already open ?
  _didRender( { _modal }) {
    if (_modal && _modal.title == "illustrations") {
      console.log('open with : ', _modal.payload.illustration);
      this._updateSelected(_modal.payload.illustration)
      this.shadowRoot.querySelector('#illustrations').open()
    }
  }

  _closeModal() {
    console.log('firing close modal');
    store.dispatch(closeModal())
  }

  _stateChanged(state) {
    // #TODO : Use a selector
    this._project = state.project.project
    this._modal = state.modal
  }

  // SIMPLIFY THIS ?
  // Use a state selected illustration index already ?
  // Add it to "_stateChanged" ?
  _updateSelected(id) {
    let index = this._project.illustrations.findIndex( (element, index, array) => {
      if (element.id == id)
        return true
    });

    if (index >= 0) {
      this._selectedIllu = this._project.illustrations[index]
      this._selectedIndex = index
    }
  }

  // Computation for next or prev, can it be simplified ?
  // Use another dispatch than open modal, maybe just an update on the selected illustration index ?
  _changeIllustration(direction) {
    const lastPos = this._project.illustrations.length - 1
    let newIdx = (direction === "prev") ? this._selectedIndex - 1 : this._selectedIndex + 1
    if (newIdx > lastPos)
      newIdx = 0
    else if (newIdx < 0)
      newIdx = lastPos

    console.log("new idx : ", newIdx);
    store.dispatch(openModal("illustrations", {illustration: this._project.illustrations[newIdx].id}))
  }
}

window.customElements.define('project-page', ProjectPage);

export { fetchProject };