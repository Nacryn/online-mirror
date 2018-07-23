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

export const SectionStyles = html`
<style>
  :host {
    --one-col-width: 425px;

    display: block;
    width: 100%;
    padding-top: var(--gutter, 20px);
    padding-bottom: var(--gutter, 20px);
  }

  #wrapper {
    display: block;
    margin-left: var(--gutter, 20px);
    margin-right: var(--gutter, 20px);
  }

  .title {
    color: var(--app-section-title-color, var(--app-text-highlight));
    text-transform: uppercase;
    font-weight: 600;
  }


  @media (min-width: 800px) {
    #wrapper {
      margin-left: var(--wide-gutter, 100px);
      margin-right: var(--wide-gutter, 100px);
    }
  }

  @media (min-width: 1100px) {
    #wrapper {
      margin-left: var(--ultra-wide-gutter, 160px);
      margin-right: var(--ultra-wide-gutter, 160px);
    }
  }
</style>
`;
