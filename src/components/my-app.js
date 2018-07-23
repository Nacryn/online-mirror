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
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState,
  updateLayout
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/iron-icons/iron-icons'
// Custom elements
import { menuIcon } from './my-icons.js';
import './snack-bar.js';
import './app-logo'
import './app-separator'
import './navigator'
import './footer'
// Styles
import {AppStyles} from '../styles/app-styles'
import {DrawerStyles} from '../styles/drawer-styles'
import {SharedStyles} from '../styles/shared-styles'

class MyApp extends connect(store)(LitElement) {
  _render({appTitle, _page, _drawerOpened, _snackbarOpened, _offline}) {
    // Anything that's related to rendering should be done in here.
    return html`
    ${AppStyles} ${DrawerStyles} ${SharedStyles}
    <style>
      :host {
        /* App colors */
        --app-primary-color: #18191c;
        --app-secondary-color: greenyellow;
        /* --app-secondary-color: #43b581; */

        --app-background-color: #18191c;

        --app-header-text-color: #fff;
        --app-header-background-color: #202124;
        
        --app-unselected-color: #b5bbbe;
        --app-selected-color: #70b6e9;

        /* Text */
        --app-text-color: hsla(0, 0%, 100%, .6);
        --app-text-highlight: #fff;

        /* Buttons & Icons colors */
        --app-icon-color: #fff;

        /* Font weight */
        --app-fw-highlight: 500;
        --app-fw-body: 400;

        /* Others */
        --gutter: 20px;
        --app-intermediate-width: 960px;
        --app-max-width: 1170px;
        --app-footer-height: 84px;
        
        --app-drawer-width: 100%;

        display: block;
        color: var(--app-text-color);
        font-weight: var(--app-fw-body);
      }

      app-navigator {
        position: fixed;
        top: 30%;
        left: 30px;
        z-index: 2;
      }

      [hidden] {
        display: none !important;
      }

      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }

      .big {
        --app-logo-size: 64px;
      }

      .white {
        filter: invert(80%);
      }
    </style>

    <!-- Header -->
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <paper-icon-button class="menu-btn" icon="menu" title="Menu" on-click="${_ => store.dispatch(updateDrawerState(true))}">${menuIcon}</paper-icon-button>
        <div main-title></div>
        <app-logo class="white"></app-logo>
      </app-toolbar>

      <!-- This gets hidden on a small screen-->
      <nav class="toolbar-list">
        <a selected?="${_page === 'discover'}" href="/discover">Discover</a>
        <a selected?="${_page === 'explore'}" href="/explore">Explore</a>
        <a selected?="${_page === 'contact'}" href="/contact">Contact</a>
      </nav>
    </app-header>

    <app-navigator class="navigator">
      <a slot="links" selected?="${_page === 'discover'}" href="/discover"><paper-icon-button icon="flight-land"></paper-icon-button></a>
      <a slot="links" selected?="${_page === 'explore'}" href="/explore"><paper-icon-button icon="gesture"></paper-icon-button></a>
      <a slot="links" selected?="${_page === 'contact'}" href="/contact"><paper-icon-button icon="send"></paper-icon-button></a>
    </app-navigator>

    <!-- Drawer content -->
    <app-drawer id="drawer" opened="${_drawerOpened}"
        on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
      <div id="drawer-wrapper">
        <app-toolbar>
          <div main-title></div>
          <paper-icon-button id="drawer-close" icon="close" on-tap="${_ => store.dispatch(updateDrawerState(false))}"></paper-icon-button>
        </app-toolbar>

        <nav class="drawer-list">
          <a selected?="${_page === 'discover'}" href="/discover">Discover</a>
          <a selected?="${_page === 'explore'}" href="/explore">Explore</a>
          <a selected?="${_page === 'contact'}" href="/contact">Contact</a>
        </nav>

        <app-separator></app-separator>
        <app-logo class="big"></app-logo>
      </div>
    </app-drawer>

    <!-- Main content -->
    <main role="main" class="main-content">
      <discover-page class="page" active?="${_page === 'discover'}"></discover-page>
      <explore-page class="page" active?="${_page === 'explore'}"></explore-page>
      <project-page class="page" active?="${_page === 'project'}"></project-page>
      <contact-page class="page" active?="${_page === 'contact'}"></contact-page>
      <my-view1 class="page" active?="${_page === 'view1'}"></my-view1>
      <my-view2 class="page" active?="${_page === 'view2'}"></my-view2>
      <my-view3 class="page" active?="${_page === 'view3'}"></my-view3>
      <my-view404 class="page" active?="${_page === 'view404'}"></my-view404>
    </main>

    <app-footer id="appfooter"></app-footer>

    <snack-bar active?="${_snackbarOpened}">
      You are now ${_offline ? 'offline' : 'online'}.
    </snack-bar>
    `;
  }

  static get properties() {
    return {
      appTitle: String,
      _page: String,
      _drawerOpened: Boolean,
      _snackbarOpened: Boolean,
      _offline: Boolean
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
        (matches) => store.dispatch(updateLayout(matches)));
  }

  _didRender(properties, changeList) {
    if ('_page' in changeList) {
      const pageTitle = properties.appTitle + ' - ' + changeList._page;
      updateMetadata({
          title: pageTitle,
          description: pageTitle
          // This object also takes an image property, that points to an img src.
      });
    }
  }

  _stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }
}

window.customElements.define('my-app', MyApp);
