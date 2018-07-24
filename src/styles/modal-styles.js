import { html } from '@polymer/lit-element';

// This style needs to be purified by FIRE
// Too much dirty fixes :
// - erasing manually padding / margin made by the paper modal
// - positioning à l'arrache ?
export const ModalStyles = html`
<style>
  paper-dialog {
    height: 100vh;
    width: 100vw;
    margin: 0;
  }

  iron-image {
    margin: 0;
    padding: 0;
  }

  .dismiss-button {
    z-index: 1;
    position: absolute;
    top: 20px;
    right: 20px;

    width: 40px;
    height: 40px;
    margin: 0;
    padding: 0;

    color: var(--app-text-highlight, greenyellow);
  }

  .action-bar {
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 0;

    width: 100%;
    height: 60px;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    background-color: var(--app-header-background-color);
    color: var(--app-text-color);
  }

  .details {
    flex-grow: 1;
    padding: 10px 20px;
    font-weight: 600;
    color: var(--app-text-highlight, white);
  }

  .actions {
    flex-grow: 0;
    flex-shrink: 0;
    padding: 10px;
  }

  @media (min-width: 460px) {
    paper-dialog {
      height: 80vh;
      width: 80vw;
    }
  }

  @media (min-width: 1020px) {
    paper-dialog {
      height: 650px;
      width: 950px;
    }
  }
</style>
`;
