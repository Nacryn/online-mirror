import { html, LitElement } from '@polymer/lit-element'
import '@polymer/paper-icon-button'
import '@polymer/paper-radio-group'
import '@polymer/paper-radio-button'
import '@polymer/iron-icons/iron-icons'
import '@polymer/iron-icons/av-icons'
import '@polymer/iron-image'

import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class'
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior'
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners'
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status'

class AppCarousel extends GestureEventListeners(LitElement) {
  _render(props) {
  //   console.log('rendering carousel');
  //   console.log('illustrations: ', props.products);
  //   console.log(props.carouselHeight, props.carouselWidth);

    return html`
    <style include="fix-tap-style colors-style">
      :host {
        display: flex;
        position: relative;
        --carousel-height: 100%;
        --carousel-ui-color: var(--app-white);
        --carousel-ui-ink-color: var(--app-primary-color);
        --border-radius: var(--carousel-border-radius, 3px);
        overflow: hidden;
        border-radius: var(--border-radius);
      }

      :host * {
        user-select: none;
      }

      .noImageIcon {
        color: var(--app-white);
        height: 50px;
        width: 50px;
      }

      .noPicture {
        width: 100%;
        height: 100%;
        background-color: var(--app-light-grey);
        transition: opacity .2s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 5;
        position: absolute;
        top: 0;
        left: 0;
      }

      #pictures {
        display: flex;
        overflow: hidden;
        height: var(--carousel-height);
        width: 100%;
        position: relative;
        transform: translate3d(0, 0, 0);

        border-radius: var(--border-radius);
      }

      #pictures > .picContainer {
        flex-shrink: 0;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        will-change: transform;

        border-radius: var(--border-radius);
      }

      .picLink {
        display: block;
        position: absolute;
        top: 10px;
        right: 18px;
        z-index: 100;
        text-decoration: none;
        transition: all .2s ease;
      }

      .picLink[transparent] {
        transform: translateX(20px);
      }

      #pictures iron-image {
        border-radius: var(--border-radius);
      }

      .leftShadow {
        box-shadow: -6px 0px 12px -3px rgba(0, 0, 0, 0.4);
      }

      .rightShadow {
        box-shadow: 6px 0px 12px -3px rgba(0, 0, 0, 0.4);
      }

      .gradientLayer {
        width: 100%;
        height: 100%;
        background-image:
        -webkit-linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
        pointer-events: none;
        position: absolute;
        transform: translate3d(0, 0, 0);
        top: 0;
        left: 0;
        z-index: 3;
      }

      #ui {
        position: absolute;
        left: 0;
        z-index: 4;
        transform: translate3d(0, 0, 0);
        height: var(--carousel-height);
        width: 100%;

        display: flex;
        flex-direction: column;

        transition: opacity .2s ease;
      }

      #mainActions {
        display: flex;
        flex-grow: 1;
        align-items: center;
      }

      #navButtons{
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
      }

      #bottomActions {
        display: flex;
        justify-content: space-between;
      }

      #autoplayer, #spacer {
        height: 40px;
        min-width: 40px;
      }

      #spacer {
        display: none;
      }

      #bullets {
        display: flex;
      }

      paper-radio-button {
        --paper-radio-button-checked-color: var(--carousel-ui-color, white);
        --paper-radio-button-checked-ink-color: var(--carousel-ui-ink-color, white);
        --paper-radio-button-unchecked-color: var(--carousel-ui-color, white);
        --paper-radio-button-unchecked-ink-color: var(--carousel-ui-ink-color, white);
      }

      paper-icon-button {
        height: 70px;
        width: 70px;
        color: var(--carousel-ui-color, white);
        --paper-icon-button-ink-color: var(--carousel-ui-ink-color, white);
      }

      [transparent] {
        opacity: 0;
        pointer-events: none;
      }

      @media (min-width: 500px) {
        #spacer {
          display: block;
        }
	    }
    </style>

    <div class="noPicture" transparent$="${props.hasPicturesReady}">
      <iron-icon class="noImageIcon" icon="visibility-off"></iron-icon>
    </div>

    <div id="pictures">
    ${Object.keys(props.products).map((key) => {
      const item = props.products[key];
      return html`
      <div id="${item.id}" class="picContainer">
        <iron-image
        style$="${this._computeInlineStyles(props.carouselHeight, props.carouselWidth)}"
        placeholder="${item.base64}"
        sizing="cover"
        preload data-src$="${item.src}"
        alt="${item.name}"
        fade></iron-image>
      </div>
      `
    })}
    </div>

    <div class="gradientLayer"></div>

    <div id="ui" on-track='_touchHandler'>
    ${Object.keys(props.products).map((key) => {
      const item = props.products[key];
      if (item.href) {
        return html`
        <a transparent$="${this._computeItemUiStyle(item.id, props.selectedElement, props.isAnimating)}" class="picLink" href="${item.href}" tabindex="-1">
          <app-button class="color-secondary bg-action" icon="visibility">${item.name}</app-button>
        </a>
        `
      }
    })}

      <div id="mainActions">
        <div id="navButtons">
          <paper-icon-button disabled='${this._disableUi(props.isAnimating, props.products)}' on-tap="_slide" data-direction="left" icon="icons:chevron-left"></paper-icon-button>
          <paper-icon-button disabled='${this._disableUi(props.isAnimating, props.products)}' on-tap="_slide" data-direction="right" icon="icons:chevron-right"></paper-icon-button>
        </div>
      </div>

      <div id="bottomActions">
        <paper-icon-button id="autoplayer" disabled='${this._disableUi(props.isAnimating, props.products)}' on-tap="_togglePlayer" icon$="[${this._computePlayerIcon(props.isPlaying)}"></paper-icon-button>

        <paper-radio-group id="bullets" selected="${props.currIndex}">
        ${Object.keys(props.products).map((key) => {
          return html`
          <paper-radio-button on-tap="_turnOffPlayer" disabled="${this._disableUi(props.isAnimating, props.products)}" name="${props.products.indexOf(key)}"></paper-radio-button>
          `
        })}
        </paper-radio-group>
        <div id="spacer"></div>
      </div>
    </div>
    `
  }

  static get properties() {
    return {
      hasPicturesReady: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
      },

      products: {
        type: Array,
        observer: '_onProductsChange',
        value: [],
      },

      currIndex: {
        type: Number,
        observer: '_currIndexChange',
      },

      activeDirection: {
        type: String,
        value: 'none',
      },

      isAnimating: {
        type: Boolean,
        value: false,
      },

      carouselWidth: Number,
      carouselHeight: Number,

      selectedElement: {
        type: Object,
        observer: '_onSelectionChange',
      },

      isPlaying: {
        type: Boolean,
        value: true,
      },

      transitionDuration: {
        type: Number,
        value: 300
      },

      transition: {
        type: String,
        computed: '_computeTransition(transitionDuration)'
      },

      autoplayInterval: {
        type: Number,
        value: 4000,
      },

      lastTouch: {
        type: Number,
        value: 0,
      },
    }
  }

  _didRender() {
    // this._onProductsChange(this.products)
  }

  constructor() {
    super()
    this.carouselHeight = 300
    this.carouselWidth = 600
  }
  ready() {
    super.ready()
    // this.setScrollDirection('y', this.shadowRoot.querySelector('#ui'))
    this._initAutoPlay();
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('iron-resize', this.onResize)
    this.addEventListener('iron-select', this.onIronSelect)
  }

  onResize(e) {
    if (this.offsetParent) {
      this.carouselWidth = this.offsetWidth;
      this.carouselHeight = this.offsetHeight;
    }
  }

  onIronSelect(e) {
    e.stopPropagation();
  }

  _disableUi(anim, products) {
    return anim || products.length < 2;
  }

  _onProductsChange(newProducts, oldProducts) {
    if (!(newProducts instanceof Array) || 0 == newProducts.length) {
      this.hasPicturesReady = false;
      return;
    }

    this.currIndex = 0;
    var init = function () {
      this.selectedElement = this._getDomElement(this.currIndex);
      this.selectedElement.style.zIndex = 1;
      this.hasPicturesReady = true;
      this._loadImage();
    }.bind(this);

    afterNextRender(this, init);
  }

  _loadImage() {
    var ironImage = this.selectedElement.querySelector('iron-image');
    if (ironImage.hasAttribute('data-src')) {
      ironImage.src = ironImage.getAttribute('data-src');
      ironImage.removeAttribute('data-src');
    }
  }

  _currIndexChange(newIndex, oldIndex) {
    this.selectedElement = this._getDomElement(newIndex);
    if (this.selectedElement) {
      this._loadImage();
    }
  }

  _onSelectionChange(newProduct, oldProduct) {
    if (!newProduct || !oldProduct || this.isAnimating) return;
    this.isAnimating = true;
    var prevIndex = this._findProductIndex(oldProduct.id);
    var direction = this._computeDirection(prevIndex);
    this._preventFreeze();
    this._translate(oldProduct, direction);
  }

  _preventFreeze() {
    if (performance.now() - this.lastTouch < 1000) return;
    var _this = this;
    var recover = function () {
      _this.isAnimating = false;
    }
    this._waitTransition(recover);
  }

  _slide(e) {
    this._turnOffPlayer();
    this.activeDirection = Polymer.dom(e).rootTarget.getAttribute('data-direction');
    'left' == this.activeDirection ? this.shadowRoot.querySelector('#bullets').selectPrevious() : this.shadowRoot.querySelector('#bullets').selectNext();
  }

  _translate(oldElement, direction) {
    if (this.selectedElement == oldElement) {
      return this.isAnimating = false;
    }
    var _this = this;

    // Set transitional position according to direction
    var transitionalPos, shadowClass;
    if ('left' == direction) {
      transitionalPos = '-100';
      shadowClass = 'rightShadow';
    }
    else {
      transitionalPos = '100';
      shadowClass = 'leftShadow';
    }

    // Move next pic to the correct position (left or right)
    this.selectedElement.style.transition = 'none';
    this.transform('translateX(' + transitionalPos + '%)', this.selectedElement);
    this.selectedElement.style.zIndex = 2;
    oldElement.style.zIndex = 1;
    this.selectedElement.classList.add(shadowClass);

    var onTransitionEnd = function () {
      _this.selectedElement.style.transition = 'none';
      // Replace old pic in stack + change focus
      oldElement.style.zIndex = 0;
      _this.selectedElement.style.zIndex = 1;
      _this.selectedElement.classList.remove(shadowClass);

      // Update current status
      _this.activeDirection = 'none';
      _this.isAnimating = false;
    };

    // The first requestAnimationFrame is needed for firefox, to start correctly the animation
    requestAnimationFrame(function () {
      _this._waitTransition(onTransitionEnd);
      requestAnimationFrame(function () {
        _this.selectedElement.style.transition = _this.transition;
        _this.transform('none', _this.selectedElement);
      });
    })
  }

  _touchHandler(e) {
    var _this = this;
    this.lastTouch = e.timeStamp;
    if (!this.hasPicturesReady || this.products.length < 2) return;
    switch (e.detail.state) {
      case 'start':
        if (_this.isAnimating) return _this.touchInit = false;
        _this.isAnimating = true;
        _this.touchInit = true;
        _this._turnOffPlayer();
        _this._toggleUI(false);
        _this.touchInvolvedElements = _this._positionElements();

        if (document.selection) {
          document.selection.empty();
        } else if (window.getSelection) {
          window.getSelection().removeAllRanges();
        }
        break;

      case 'track':
        if (!this.touchInit) return;
        if (Math.abs(e.detail.dx) <= this.carouselWidth) {
          if (0 < e.detail.dx) {
            this.transform('translateX(-100%)', this.touchInvolvedElements.next);
            this.transform('translateX(calc(-100% + ' + e.detail.dx + 'px))', this.touchInvolvedElements.prev);
          }
          else {
            this.transform('translateX(100%)', this.touchInvolvedElements.prev);
            this.transform('translateX(calc(100% - ' + Math.abs(e.detail.dx) + 'px))', this.touchInvolvedElements.next);
          }
        }
        break;

      case 'end':
        if (!_this.touchInit) return;
        var capReached = Math.abs(e.detail.dx) > (_this.carouselWidth / 3);
        if (e.detail.dx > 0) {
          _this._endDrag(_this.touchInvolvedElements.prev, capReached, _this.touchInvolvedElements.prevIndex, 'left');
        } else {
          _this._endDrag(_this.touchInvolvedElements.next, capReached, _this.touchInvolvedElements.nextIndex, 'right');
        }
        break;
    }
  }

  _endDrag(elem, capReached, nextIndex, direction) {
    var _this = this;
    var previousSelectedElem = _this.selectedElement;

    // Callback when the transition end
    var onTransitionEnd = function () {
      elem.style.transition = 'none';
      _this.touchInvolvedElements.next.classList.remove('leftShadow');
      _this.touchInvolvedElements.prev.classList.remove('rightShadow');

      // Stack correctly the pics
      previousSelectedElem.style.zIndex = 0;
      _this.selectedElement.style.zIndex = 1;

      _this._toggleUI(true);
      _this.isAnimating = false;
    };

    this._waitTransition(onTransitionEnd);
    requestAnimationFrame(function () {
      elem.style.transition = _this.transition;
      if (capReached) {
        _this.currIndex = nextIndex;
        _this.transform('none', elem);
      } else {
        var translateValue = direction == 'left' ? '-100%' : '100%';
        _this.transform('translateX(' + translateValue + ')', elem);
      }
    });
  }

  _waitTransition(fn) {
    // Tried an event driven approach, sadly this provide better results. T_T
    clearTimeout(this.timeout);
    this.timeout = setTimeout(fn, this.transitionDuration);
  }

  _positionElements() {
    var lastIndex = this.products.length - 1;
    var prevIndex = (0 == this.currIndex) ? lastIndex : this.currIndex - 1;
    var nextIndex = (lastIndex == this.currIndex) ? 0 : this.currIndex + 1;
    // Get products and place them
    var prevProduct = this._getDomElement(prevIndex);
    var nextProduct = this._getDomElement(nextIndex);

    this.transform('translateX(-100%)', prevProduct);
    this.transform('translateX(100%)', nextProduct);
    prevProduct.classList.add('rightShadow');
    nextProduct.classList.add('leftShadow');
    prevProduct.style.zIndex = 2;
    nextProduct.style.zIndex = 2;

    return {
      next: nextProduct,
      nextIndex: nextIndex,
      prev: prevProduct,
      prevIndex: prevIndex,
    }
  }

  _getDomElement(index) {
    return this.shadowRoot.querySelector('#' + this.products[index].id);
  }

  _toggleUI(isVisible) {
    this.shadowRoot.querySelector('#ui').style.opacity = (isVisible) ? 1 : 0;
  }

  _findProductIndex(productId) {
    for (var i = 0; i < this.products.length; i++) {
      if (productId == this.products[i].id) {
        return i;
      }
    }
    return -1;
  }

  _computeTransition(transitionTime) {
    return 'transform ' + transitionTime + 'ms ease-in-out';
  }

  _computeDirection(prevIndex) {
    if ('none' != this.activeDirection) {
      return this.activeDirection
    }
    else {
      return prevIndex > this.currIndex ? 'left' : 'right';
    }
  }

  _computeInlineStyles(height, width) {
    return 'height: ' + height + 'px; width: ' + width + 'px;';
  }

  _computeItemUiStyle(id, selectedElement, isAnimating) {
    if (!selectedElement) return false;
    return (isAnimating || id != selectedElement.id);
  }

  _computePlayerIcon(isPlaying) {
    return isPlaying ? 'av:pause' : 'av:play-arrow';
  }

  _turnOffPlayer() {
    this.isPlaying = false;
  }

  _togglePlayer(e) {
    this.isPlaying = !this.isPlaying;
  }

  _initAutoPlay() {
    var _this = this;
    setInterval(function () {
      if (_this.offsetParent !== null && _this.isPlaying && !_this.isAnimating) {
        _this.activeDirection = 'right';
        _this.shadowRoot.querySelector('#bullets').selectNext();
      }
    }, this.autoplayInterval);
  }
}

window.customElements.define('app-carousel', AppCarousel)

{/* 
<link rel="import" href="../../bower_components/iron-resizable-behavior/iron-resizable-behavior.html">

<link rel="import" href="button.component.html">

<link rel="import" href="../styles/colors.style.html">
<link rel="import" href="../styles/fix-tap.style.html">

Polymer({
      is: 'app-carousel',

      behaviors: [ Polymer.IronResizableBehavior ],
      listeners: {
            "iron-resize": "onResize",
            "iron-select": "onIronSelect"
      },
}); */}
