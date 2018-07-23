export const NavigationMixin = (superClass) => class extends superClass {
  constructor() {
    super();
  }
  
  goTo(path) {
    window.history.pushState({}, null, path);
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  goBack() {
    history.back();
  }
}