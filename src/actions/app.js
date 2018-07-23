/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const navigate = (path) => (dispatch) => {
  const parts = path.slice(1).split('/')
  // Extract the page name from path.
  const page = parts[0] || 'discover';
  const projectSlug = parts[1]

  console.log('navigate : ', page, projectSlug)
  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page, projectSlug));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

const loadPage = (page, projectSlug) => async (dispatch, getState) => {
  // Module loaded with each page
  let module
  let anchors

  // Page Case
  switch(page) {
    case 'discover': 
      module = await import('../components/pages/discover-page.js')
      break
    case 'explore':
      module = await import('../components/pages/explore-page.js')
      break
    case 'contact':
      module = await import('../components/pages/contact-page.js')
      break

    case 'project':
      module = await import('../components/pages/project-page.js')
      // Fetch project according slug
      await dispatch(module.fetchProject(projectSlug))
      // Check if loading was successful
      if (isFetchProjectFailed(getState().project)) {
        page = 'view404'
      }
      break

    case 'view1':
      import('../components/my-view1.js').then((module) => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      });
      break;
    case 'view2':
      import('../components/my-view2.js');
      break;
    case 'view3':
      import('../components/my-view3.js');
      break;
    default:
    // Nothing matches, set 404
      page = 'view404';
      
  }

  if (page === 'view404') {
    import('../components/my-view404.js');
  }

  dispatch(updatePage(page, module.anchors))
};

const updatePage = (page, anchors) => {
  return {
    type: UPDATE_PAGE,
    page,
    anchors
  };
};

const isFetchProjectFailed = (project) => {
  return !project.isFetching && project.failure;
}

let snackbarTimer;

export const showSnackbar = () => (dispatch) => {
  dispatch({
    type: OPEN_SNACKBAR
  });
  clearTimeout(snackbarTimer);
  snackbarTimer = setTimeout(() =>
    dispatch({ type: CLOSE_SNACKBAR }), 3000);
};

export const updateOffline = (offline) => (dispatch, getState) => {
  // Show the snackbar, unless this is the first load of the page.
  if (getState().app.offline !== undefined) {
    dispatch(showSnackbar());
  }
  dispatch({
    type: UPDATE_OFFLINE,
    offline
  });
};

export const updateLayout = (wide) => (dispatch, getState) => {
  if (getState().app.drawerOpened) {
    dispatch(updateDrawerState(false));
  }
};

export const updateDrawerState = (opened) => (dispatch, getState) => {
  if (getState().app.drawerOpened !== opened) {
    dispatch({
      type: UPDATE_DRAWER_STATE,
      opened
    });
  }
};
