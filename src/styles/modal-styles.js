import { html } from '@polymer/lit-element';

export const ModalStyles = html`
<style>
  paper-dialog {
    height: 100vh;
    width: 100vw;
    margin: 0;
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
