import { LitElement, html } from '@polymer/lit-element'

import '../card-project'

import { SharedStyles } from '../../styles/shared-styles';
import { SectionStyles } from '../../styles/section-styles';

class ProjectsSection extends LitElement {
  _render(props) {
    return html`
    ${ SharedStyles } ${ SectionStyles } 
    <style include="shared-styles section-style">
      :host {
        --large-card: 100%;
        --small-card: 50%;
        --grid-rainure: 4px;
      }
      #content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      card-project {
        margin: 2px;
      }

      .large {
        width: calc(var(--large-card) - var(--grid-rainure));;
      }

      .small {
        width: calc(var(--small-card) - var(--grid-rainure));;
      }

      @media (min-width: 900px)
      {
        :host {
          --large-card: 50%;
          --small-card: 25%;
        }
      }
      
    </style>

    <div id="wrapper">
      <div id="title"></div>
      <div id="content">
        <card-project class="large" slug="onward"></card-project>
        <card-project class="small" slug="wohlolooo"></card-project>
        <card-project class="small" slug="idiocratic"></card-project>
        <card-project class="small" slug="jedisrien"></card-project>
        <card-project class="small" slug="monstruous"></card-project>
        <card-project class="large" slug="useless"></card-project>
      </div>
    </div>
    `
  }

  static get properties() {
    return {}
  }
}

window.customElements.define('projects-section', ProjectsSection)