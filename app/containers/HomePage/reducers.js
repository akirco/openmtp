'use strict';

import { actionTypes } from './actions';
import { PATHS } from '../../utils/paths';
import { deviceTypeConst } from '../../constants';
import path from 'path';

export const initialState = {
  /* <Meta Data> */
  ___isDefault: true,
  ___isLoading: false,
  ___timeGenerated: null,
  ___timeLastModified: null,
  ___error: null,
  /* </Meta Data> */

  sidebarFavouriteList: {
    top: [
      {
        label: 'Home',
        path: PATHS.homeDir,
        icon: 'folder',
        enabled: true
      },
      {
        label: 'Desktop',
        path: path.join(PATHS.homeDir, `/Desktop`),
        icon: 'folder',
        enabled: true
      },
      {
        label: 'Downloads',
        path: path.join(PATHS.homeDir, `/Downloads`),
        icon: 'folder',
        enabled: true
      },
      {
        label: 'Root',
        path: '/',
        icon: 'folder',
        enabled: true
      }
    ],
    bottom: []
  },

  toolbarList: {
    [deviceTypeConst.local]: {
      up: {
        enabled: true,
        label: 'Folder Up',
        imgSrc: 'Toolbar/up.svg',
        invert: false
      },
      refresh: {
        enabled: true,
        label: 'Refresh',
        imgSrc: 'Toolbar/refresh.svg',
        invert: false
      },
      delete: {
        enabled: true,
        label: 'Delete',
        imgSrc: 'Toolbar/delete.svg'
      }
    },
    [deviceTypeConst.mtp]: {
      up: {
        enabled: true,
        label: 'Folder Up',
        imgSrc: 'Toolbar/up.svg',
        invert: false
      },
      refresh: {
        enabled: true,
        label: 'Refresh',
        imgSrc: 'Toolbar/refresh.svg',
        invert: false
      },
      delete: {
        enabled: true,
        label: 'Delete',
        imgSrc: 'Toolbar/delete.svg'
      }
    }
  },

  directoryLists: {
    [deviceTypeConst.local]: {
      order: 'asc',
      orderBy: 'path',
      queue: {
        selected: []
      },
      nodes: []
    },
    [deviceTypeConst.mtp]: {
      order: 'asc',
      orderBy: 'path',
      queue: {
        selected: []
      },
      nodes: []
    }
  },

  selectedPath: {
    [deviceTypeConst.local]: PATHS.homeDir,
    [deviceTypeConst.mtp]: '/'
  },

  mtpDevice: {
    isAvailable: false
  },
  contextMenuList: {
    [deviceTypeConst.local]: {
      rename: {
        enabled: true,
        label: 'Rename',
        data: {}
      },
      copy: {
        enabled: true,
        label: 'Copy',
        data: {}
      },
      paste: {
        enabled: true,
        label: 'Paste',
        data: {}
      },
      newFolder: {
        enabled: true,
        label: 'New Folder',
        data: {}
      }
    },
    [deviceTypeConst.mtp]: {
      copy: {
        enabled: true,
        label: 'Copy',
        data: {}
      },
      paste: {
        enabled: true,
        label: 'Paste',
        data: {}
      },
      newFolder: {
        enabled: true,
        label: 'New Folder',
        data: {}
      }
    }
  },

  contextMenuPos: {
    [deviceTypeConst.local]: {},
    [deviceTypeConst.mtp]: {}
  }
};

export default function Home(state = initialState, action) {
  let { type, payload, deviceType = null } = action;
  switch (type) {
    case actionTypes.SET_SORTING_DIR_LISTS:
      return {
        ...state,
        ...setLoadedMetaData(state),
        directoryLists: {
          ...state.directoryLists,
          [deviceType]: {
            ...state.directoryLists[deviceType],
            ...payload
          }
        }
      };

    case actionTypes.SET_SELECTED_DIR_LISTS:
      return {
        ...state,
        ...setLoadedMetaData(state),
        directoryLists: {
          ...state.directoryLists,
          [deviceType]: {
            ...state.directoryLists[deviceType],
            queue: {
              selected: payload.selected
            }
          }
        }
      };

    case actionTypes.SET_SELECTED_PATH:
      return {
        ...state,
        ...setLoadedMetaData(state),
        selectedPath: {
          ...state.selectedPath,
          [deviceType]: payload
        }
      };

    case actionTypes.SET_MTP_STATUS:
      return {
        ...state,
        ...setLoadedMetaData(state),
        mtpDevice: {
          ...state.mtpDevice,
          isAvailable: payload
        }
      };

    case actionTypes.SET_CONTEXT_MENU_POS:
      return {
        ...state,
        ...setLoadedMetaData(state),
        contextMenuPos: {
          ...initialState.contextMenuPos,
          [deviceType]: {
            ...payload
          }
        }
      };

    case actionTypes.CLEAR_CONTEXT_MENU_POS:
      return {
        ...state,
        ...setLoadedMetaData(state),
        contextMenuPos: {
          ...initialState.contextMenuPos
        }
      };

    case actionTypes.FETCH_DIR_LIST:
      return {
        ...state,
        ...setLoadedMetaData(state),
        directoryLists: {
          ...state.directoryLists,
          [deviceType]: {
            ...state.directoryLists[deviceType],
            nodes: [...payload.nodes]
          }
        }
      };

    /* <Meta Data> */
    case actionTypes.REQ_LOAD:
      return {
        ...state,
        ___isLoading: true
      };
    case actionTypes.RES_LOAD:
      return {
        ...state,
        ...setLoadedMetaData(state)
      };
    case actionTypes.FAIL_LOAD:
      return {
        ...state,
        ___isLoading: false,
        ___error: payload.error
      };
    /* </Meta Data> */
    default:
      return state;
  }
}

function setLoadedMetaData(state) {
  const ms = Date.now();
  return {
    ___isLoading: false,
    ___isDefault: false,
    ___timeGenerated: state.___timeGenerated ? state.___timeGenerated : ms,
    ___timeLastModified: ms,
    ___error: null
  };
}
