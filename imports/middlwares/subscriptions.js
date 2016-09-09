import { Tracker } from 'meteor/tracker';

const subscriptions = {};
const computations = {};

export default store => next => action => {
  if (!action.meteor || !action.meteor.subscribe) {
    return next(action);
  }

  // setTimeout is fixing this bug: https://github.com/meteor/react-packages/issues/99
  setTimeout(() => {
    const { subscribe, get, onChange } = action.meteor;

    if (subscriptions[action.type]) {
      console.log('stopping');
      const subscriptionId = subscriptions[action.type].subscriptionId;
      computations[subscriptionId].stop();
      subscriptions[action.type].stop();
    }

    const subscription = subscribe();
    const subscriptionId = subscription.subscriptionId;
    subscriptions[action.type] = subscription;

    computations[subscriptionId] = Tracker.autorun(() => {
      const data = get();
      const ready = subscription.ready();

      store.dispatch({
        type: `${action.type}_READY`,
        ready,
      });

      if (ready) {
        if (onChange) {
          onChange(data);
        }

        store.dispatch({
          type: `${action.type}_CHANGED`,
          data,
        });
      }
    });

    console.log(subscriptions, computations);
  }, 0);
};
