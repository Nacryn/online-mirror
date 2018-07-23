import { html } from '@polymer/lit-element';

export const FormStyles = html`
  <style>
    paper-input, paper-textarea {
      --paper-input-container-color: var(--app-text-color);
      --paper-input-container-focus-color: #fff;
      --paper-input-container-invalid-color: red;

      --paper-input-container-input-color: #fff;

      --paper-input-container-input: {
        background-color: #202124;
        box-sizing: border-box;
        padding: 10px;
      }

      --paper-input-container-label-floating: {
        text-transform: uppercase;
      }

      --paper-input-container-underline: {
        border-bottom-width: 2px;
        border-bottom-color: #202124;
      }
    }

    paper-textarea {
      --paper-input-container-input: {
        background-color: #202124;
        box-sizing: border-box;
      }

      --iron-autogrow-textarea: {
        box-sizing: border-box;
        padding: 10px;
      }
    }
  </style>
`
