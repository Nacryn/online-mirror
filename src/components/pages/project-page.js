// Provided elements
import { html } from '@polymer/lit-element';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status';
import { PageViewElement } from '../page-view-element.js';
import '@polymer/paper-dialog'
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
  _render({ _project }) {
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
        <div class="go-back"><a href="explore" class="no-style">Retourner à la liste</a></div>
        <div class="page-title">${_project.title}</div>
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
          <div class="thumbnail" on-click="${() => store.dispatch(openModal("illustrations", {illustration: "thumb1"}))}"></div>
          <div class="thumbnail" on-click="${() => store.dispatch(openModal("illustrations", {illustration: "thumb2"}))}"></div>
          <div class="thumbnail" on-click="${() => store.dispatch(openModal("illustrations", {illustration: "thumb3"}))}"></div>
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
        <h2>Header</h2>
        <paper-dialog-scrollable>
          Lorem ipsum...
        </paper-dialog-scrollable>
        <div class="buttons">
          <paper-button dialog-dismiss>Cancel</paper-button>
          <paper-button dialog-confirm autofocus>Accept</paper-button>
        </div>
      </paper-dialog>
    `
  }

  static get properties() {
    return {
      _modal: Object,
      _project: Object
    }
  }

  constructor() {
    super()
    afterNextRender(this, () => {
      this.addEventListener('iron-overlay-closed', this._closeModal)
    })
  }

  _didRender( { _modal }) {
    if (_modal && _modal.title == "illustrations") {
      console.log('open with : ', _modal.payload.illustration);
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
}

window.customElements.define('project-page', ProjectPage);

export { fetchProject };