/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';

// Styles
import { SharedStyles } from '../styles/shared-styles.js';
import { SectionStyles } from '../styles/section-styles.js';

// This element is *not* connected to the Redux store.
class AppSection extends LitElement {
  _render(props) {
    return html`
      ${SharedStyles}
      ${SectionStyles}
      <div id="wrapper">
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div id="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      
    }
  }
}

window.customElements.define('app-section', AppSection);
