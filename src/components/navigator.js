import { LitElement, html } from '@polymer/lit-element'
import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-icon-button'
import '@polymer/paper-radio-button'
import '@polymer/paper-radio-group/paper-radio-group'

// Connect to store
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store'
// Actions
import { requestScroll } from '../actions/scroll'

class AppNavigator extends connect(store)(LitElement) {
  _render({ anchors }) {

    if (!Array.isArray(anchors)){
      console.log('No anchors, empty array');
      anchors = []
    }

    return html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        --paper-radio-group-item-padding: 10px;
      }

      #anchors {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      #separator {
        display: inline-block;
        height: 1px;
        background-color: var(--app-text-color);

        width: 80%;
        margin: 0 10%;
      }

      #territories {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
      }

      paper-radio-button {
        --paper-radio-button-size: 13px;
        --paper-radio-button-checked-color: var(--app-secondary-color);
        --paper-radio-button-checked-ink-color: var(--app-secondary-color);
        --paper-radio-button-unchecked-color: var(--app-text-highlight);
        --paper-radio-button-unchecked-ink-color: var(--app-text-highlight);
        --paper-radio-button-label-color: var(--app-text-highlight);
        --paper-radio-button-label-spacing: 0px;
      }

      paper-icon-button {
        color: var(--app-text-highlight);
        --paper-icon-button-ink-color: var(--app-secondary-color);
        padding: 5px;
        height: 30px;
        width: 30px;
      }

      paper-icon-button {
        color: var(--app-secondary-color);
      }
    </style>

    <paper-radio-group id="anchors">
      ${Object.keys(anchors).map((key) => {
        const item = anchors[key];
        return html`
      
        <paper-radio-button class="anchor" name="${item.label}" on-tap="${() => store.dispatch(requestScroll(item.offset))}"></paper-radio-button>
        `
      })}
    </paper-radio-group>
    
    <div id="separator"></div>

    <div id="territories">
    <slot name="links"></slot>
    </div>
    `
  }

  static get properties() {
    return {
      anchors: Array,
    }
  }

  _stateChanged(state) {
    this.anchors = state.app.anchors
  }
}

window.customElements.define('app-navigator', AppNavigator)