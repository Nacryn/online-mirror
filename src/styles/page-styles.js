import { html } from '@polymer/lit-element';

export const PageStyles = html`
<style>
  :host {
    --header-height: 64px;

    display: block;   
    margin-left: auto;
    margin-right: auto;

    padding-top: calc(var(--gutter) + var(--header-height));
    padding-bottom: calc(var(--gutter, 20px) * 2);

    /* #TODO : FIX THIS HELL */
    /* 100 vh - margin top and bottom of sections - footer's height */
    /* WHere the hell does those 5px come from ?! */
    min-height: calc(100vh - 20px - 40px - 5px);
  }

  .page-title {
    color: var(--app-text-highlight);
    font-size: 40px;
    line-height: 40px;
    font-weight: 600;
    text-transform: uppercase;
  }

  @media (min-width: 620px) {

  }

  @media (min-width: 1200px) {

  }
</style>
`;
