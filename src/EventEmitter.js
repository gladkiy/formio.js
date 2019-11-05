import { EventEmitter2 } from 'eventemitter2';
import * as utils from './utils/utils';

export default class EventEmitter extends EventEmitter2 {
  constructor(conf = {}) {
<<<<<<< HEAD
    const {
      loadLimit = 50,
      eventsSafeInterval = 300,
      pause = 500,
      inspect = false,
      ...ee2conf
    } = conf;
=======
    const { loadLimit = 50, eventsSafeInterval = 300, pause = 500, ...ee2conf } = conf;
>>>>>>> upstream/master
    super(ee2conf);

    const [isPaused, togglePause] = utils.withSwitch(false, true);

    const overloadHandler = () => {
<<<<<<< HEAD
      console.warn('Infinite loop detected');
=======
      console.warn('Infinite loop detected', this.id, pause);
>>>>>>> upstream/master
      togglePause();
      setTimeout(togglePause, pause);
    };

    const dispatch = utils.observeOverload(overloadHandler, {
      limit: loadLimit,
      delay: eventsSafeInterval
    });

    this.emit = (...args) => {
<<<<<<< HEAD
      if (typeof inspect === 'function') {
        inspect();
      }

=======
>>>>>>> upstream/master
      if (isPaused()) {
        return;
      }

      super.emit(...args);
      dispatch();
    };
  }
}
