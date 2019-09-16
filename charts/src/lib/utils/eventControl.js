import core from './core';

class EventControl {

  constructor () {
    this.Events = {};
  }

  bind(key, func) {
    if (func._$EventGuid === undefined) {
      func._$EventGuid = core.guid();
    }
    if (this.Events[key] === undefined) {
      this.Events[key] = {};
    }
    this.Events[key][func._$EventGuid] = func;
    return func._$EventGuid;
  }

  emit(key, args, caller) {
    const events = this.Events[key];
    if (events) {
      for (var funcGuid in events) {
        events[funcGuid].apply(caller, args);
      }
    }
  }

  unbind(key, funcOrGuid) {
    if (this.Events[key]) {
      const guid = typeof funcOrGuid === 'string' ? funcOrGuid : funcOrGuid._$EventGuid;
      delete this.Events[key][guid];
    }
  }

}

export default EventControl;
