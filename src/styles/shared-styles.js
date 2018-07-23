/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from '@polymer/lit-element';

export const SharedStyles = html`
<style>
  :host {
    display: block;
    box-sizing: border-box;
  }

  h1 {
    margin: 16px 0;
    color: #fff;
    font-size: 22px;
  }

  h2 {
    font-size: 24px;
    text-align: center;
    color: var(--app-dark-text-color);
  }

  a {
    text-decoration: none;
    color: var(--app-secondary-color);
  }

  a:hover {
    color: var(--app-text-highlight);
  }

  a.no-style {
    color: inherit;
    pointer-events: auto;
  }

  a.no-style:hover {
    color: inherit;
  }

  .primary-button {
    background-color: var(--app-secondary-color);
    color: var(--app-text-highlight);
    margin: calc(var(--gutter) * 2) 0 10px 0;
    width: 100%;
  }

  .primary-button.large {
    max-width: 300px;
  }

  @media (min-width: 460px) {
    h2 {
      font-size: 36px;
    }
  }

</style>
`;
