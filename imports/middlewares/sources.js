import { Tracker } from 'meteor/tracker';

const computations = {};

export default store => next => action => {
  if (!action.meteor || action.meteor.subscribe || !action.meteor.get) {
    return next(action);
  }

  // setTimeout is fixing this bug: https://github.com/meteor/react-packages/issues/99
  setTimeout(() => {
    if (computations[action.type]) {
      computations[action.type].stop();
    }

    computations[action.type] = Tracker.autorun(() => {
      const data = action.meteor.get();

      if (data !== undefined && data !== null) {
        store.dispatch({
          type: `${action.type}_CHANGED`,
          data,
        });
      }
    });
  });
};
