import _ from 'underscore';

import { getKey } from '/imports/api/socket/videos';

import { VIDEO_OPENED } from '/imports/actions/videos/opened';
import { VIDEO_READY } from '/imports/actions/videos/ready';
import { VIDEO_FOCUS } from '/imports/actions/videos/focus';
import { VIDEO_CLOSED } from '/imports/actions/videos/closed';
import { VIDEO_PLAYED } from '/imports/actions/videos/played';
import { VIDEO_PAUSED } from '/imports/actions/videos/paused';
import { VIDEO_MUTED } from '/imports/actions/videos/muted';
import { VIDEO_UN_MUTED } from '/imports/actions/videos/unMuted';
import { VIDEO_SET_CURRENT_TIME } from '/imports/actions/videos/time';

const initialState = {};

export function videos(state = initialState, action) {
  const targetKey = getKey(action);

  switch (action.type) {
    case VIDEO_OPENED:
      return {
        ...state,
        [targetKey]: {
          contactId: action.contactId,
          videoId: action.videoId,
          player: null,
          focused: true,
          playing: false,
          muted: false,
          title: '',
          duration: 0,
          currentTime: 0,
          progressInterval: null,
        },
      };
    case VIDEO_READY:
      return _.mapObject(state, (values, key) => ({
        ...values,
        player: key === targetKey ? action.player : values.player,
        muted: key === targetKey ? action.muted : values.muted,
        title: key === targetKey ? action.title : values.title,
        duration: key === targetKey ? action.duration : values.duration,
        currentTime: key === targetKey ? action.currentTime : values.currentTime,
        progressInterval: key === targetKey ? action.progressInterval : values.progressInterval,
      }));
    case VIDEO_FOCUS:
      return _.mapObject(state, (values, key) => ({
        ...values,
        focused: key === targetKey,
      }));
    case VIDEO_CLOSED:
      const nextState = { ...state };
      delete nextState[targetKey];
      return nextState;
    case VIDEO_PLAYED:
      return _.mapObject(state, (values, key) => ({
        ...values,
        playing: key === targetKey ? true : values.playing,
      }));
    case VIDEO_PAUSED:
      return _.mapObject(state, (values, key) => ({
        ...values,
        playing: key === targetKey ? false : values.playing,
      }));
    case VIDEO_MUTED:
      return _.mapObject(state, (values, key) => ({
        ...values,
        muted: key === targetKey ? true : values.playing,
      }));
    case VIDEO_UN_MUTED:
      return _.mapObject(state, (values, key) => ({
        ...values,
        muted: key === targetKey ? false : values.playing,
      }));
    case VIDEO_SET_CURRENT_TIME:
      return _.mapObject(state, (values, key) => ({
        ...values,
        currentTime: key === targetKey ? action.currentTime : values.currentTime,
      }));
    default:
      return state;
  }
}
