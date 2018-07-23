import { html } from '@polymer/lit-element';

export const DrawerStyles = html`
<style>
  #drawer {
    color: black;
    z-index: 3;
  }

  #drawer-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding-bottom: 40px;
  }

  .drawer-list {
    flex-grow: 1;
    margin: 40px 20px;
  }

  .drawer-list a {
    display: block;
    padding: 0 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-decoration: none;
    color: black;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 50px;
  }

  .drawer-list a:hover {
    font-weight: bold;
    color: inherit;
  }

  .drawer-list a[selected] {
    color: var(--app-secondary-color);
  }

  #drawer app-logo {
    margin: var(--gutter) auto calc(var(--gutter) * 2) auto;
  }

  #drawer #drawer-close {
    width: 50px;
    height: 50px;
  }
</style>
`;