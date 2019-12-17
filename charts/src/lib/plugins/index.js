import core from '../utils/core';

class Plugins {

  constructor () {
    this.Storage = {};
  }

  _store(factory, name) {
    if (factory.prototype[name]) {
      if (typeof factory.__plugins_guid !== 'string') {
        let guid = core.guid();
        factory.__plugins_guid = guid;
        this.Storage[guid] = {};
      }
      this.Storage[factory.__plugins_guid][name] = factory.prototype[name];
    }
  }

  _restore(factory, name) {
    let _original = this.original(factory, name);
    if (_original) {
      factory.prototype[name] = _original;
    }
  }

  original(factory, name) {
    if (typeof factory.__plugins_guid === 'string') {
      let guid = factory.__plugins_guid;
      if (this.Storage[guid][name]) {
        return this.Storage[guid][name];
      }
    }
    return null;
  }

  install(factory, name, plugin) {
    this._store(factory, name);
    factory.prototype[name] = plugin;
  }

  uninstall(factory, name) {
    delete factory.prototype[name];
    this._restore(factory, name);
  }

}

export default Plugins;
