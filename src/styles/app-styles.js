import { html } from '@polymer/lit-element';

export const AppStyles = html`
<style>
  :host {
    --logo-intermediate-height: 72px;
    --logo-big-height: 90px;
    --logo-intermediate-width: 259px;
    --logo-big-width: 324px; 
  }

  app-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background-color: var(--app-header-background-color);
    color: var(--app-header-text-color);
    z-index: 3;
  }

  app-header {
    color: var(--app-text-highligh);
  }

  app-header paper-icon-button {
    --paper-icon-button-ink-color: var(--app-icon-color);
  }

  .navigator {
    display: none;
  }
  
  .toolbar-top {
    background-color: var(--app-header-background-color);
  }

  .toolbar-list {
    display: none;
  }

  .toolbar-list > a {
    display: inline-block;
    color: var(--app-header-text-color);
    text-decoration: none;
    line-height: 30px;
    padding: 4px 24px;
  }

  .toolbar-list > a[selected] {
    color: var(--app-header-selected-color);
    border-bottom: 4px solid var(--app-header-selected-color);
  }

  /* PAGES STYLES */

  .page {
    display: none;
  }

  .page[active] {
    display: block;
  }

  /* MEDIA QUERIES */

  /* Wide layout: when the viewport width is bigger than 800px, layout
  changes to a wide layout. */
  @media (min-width: 800px) {
    .toolbar-top {
      display: none;
    }

    .toolbar-list {
      display: none;
    }

    .navigator {
      display: block;
    }
  }
</style>
`;