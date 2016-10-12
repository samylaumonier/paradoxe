import { SETTINGS_PICTURE_UPDATE } from '/imports/actions/settings/picture';

const initialState = {
  profilePicture: {
    uploading: false,
    progress: 0,
  },
};

export function settings(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_PICTURE_UPDATE:
      return {
        ...state,
        profilePicture: {
          uploading: action.uploading,
          progress: action.progress,
        },
      };
    default:
      return state;
  }
}
