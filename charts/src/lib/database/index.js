import EventControl from '../utils/eventControl';
import core from '../utils/core';
import DatabaseEvent from './databaseEvent.js';

const RegUrlRootStart = /^\.{0,1}\//;
const RegUrlRootEnd = /\/$/;
const ROOTHASHKEY = './';
const ROOTHASHURL = '';

class Database {

  // _function only accept formated string

  constructor (data, eventNames) {
    this.Data = data || {};
    this.Hash = {};
    this.EventControls = {};
    let _eventControlsNames;
    if (eventNames === undefined) {
      _eventControlsNames = [this.DEFAULTEVENTNAME];
    } else {
      _eventControlsNames = core.isArray(eventNames) ? eventNames : [eventNames];
    }
    this.DefaultEventControlName = _eventControlsNames[0];
    core.extendArray(_eventControlsNames, this.addEventControl, this);
  }

  addEventControl(name) {
    this.EventControls[name] = new EventControl();
  }

  removeEventContorl(name) {
    delete this.EventControls[name];
  }

  _urlToEventKey(url) {
    let key = this.formatUrl(url);
    return this._isRoot(key) ? ROOTHASHKEY : url;
  }

  _eventKeyToUrl(key) {
    return key === ROOTHASHKEY ? ROOTHASHURL : key;
  }

  _isRoot(obj) {
    if (typeof obj === 'string') {
      return obj === '';
    }

    if (core.isArray(obj)) {
      return obj.length === 0;
    }
    return false;
  }

  // match formated url
  _isRelatedKey(eventKey1, eventKey2) {
    const key1 = this._eventKeyToUrl(eventKey1),
      key2 = this._eventKeyToUrl(eventKey2);
    return key1.indexOf(key2) !== -1 || key2.indexOf(key1) !== -1;
  }

  _urlToArray(url) {
    let arr = url.split('/');
    if (arr[0] === '') {
      arr.shift();
    }
    return arr;
  }

  formatUrl(url) {
    return url.replace(RegUrlRootStart, '').replace(RegUrlRootEnd, '');
  }

  // eventName, url ,func
  bind() {
    const args = core.toArray(arguments),
      eventName = args.length > 2 ? args.shift() : this.DefaultEventControlName,
      key = this._urlToEventKey(args[0]);
    return this.EventControls[eventName].bind(key, args[1]);
  }

  // eventName, url ,func
  unbind() {
    const args = core.toArray(arguments),
      eventName = args.length > 2 ? args.shift() : this.DefaultEventControlName,
      key = this._urlToEventKey(args[0]);
    this.EventControls[eventName].unbind(key, args[1]);
  }

  _generateEvent(key, args) {
    let url = this._eventKeyToUrl(key),
      newData = this.val(url);
    return new DatabaseEvent(newData, args);
  }

  _emit(name, url, args, caller) {
    const key = this._urlToEventKey(url),
      eventControl = this.EventControls[name],
      _ret = [];
    if (eventControl) {
      const events = eventControl.Events;
      for (let eventKey in events) {
        if (this._isRelatedKey(key, eventKey)) {
          _ret.push(eventControl.emit(eventKey, [this._generateEvent(eventKey, args)], caller));
        }
      }
    }
    return _ret;
  }

  // name: string | array
  emit(name, url, args, caller) {
    const _ret = {},
      names = core.isArray(name) ? name : [name];
    for (let i in names) {
      _ret[names[i]] = this._emit(names[i], url, args, caller);
    }
    return _ret;
  }

  emitAll(url, args, caller) {
    const _ret = {};
    for (let name in this.EventControls) {
      _ret[name] = this._emit(name, url, args, caller);
    }
    return _ret;
  }

  val(url, data, emitEventsName, args, caller) {
    const _url = this.formatUrl(url),
      override = arguments.length > 1,
      pathArray = this._urlToArray(_url),
      ifEmit = emitEventsName !== false;
    // root
    if (this._isRoot(pathArray)) {
      if (override) {
        this.Data = data;
        if (ifEmit) {
          if (typeof emitEventsName === 'string' || core.isArray(emitEventsName)) {
            return this.emit(emitEventsName, _url, args, caller);
          } else {
            return this.emitAll(_url, args, caller);
          }
        }
      }
      return this.Data;
    }
    // length > 1
    const l = pathArray.length,
      last = l - 1;
    let i = 0,
      pName,
      p = this.Data;
    for (; i < l; i++) {
      pName = pathArray[i];
      if (i === last) {
        // finally
        if (override) {
          p[pName] = data;
          if (ifEmit) {
            if (typeof emitEventsName === 'string' || core.isArray(emitEventsName)) {
              return this.emit(emitEventsName, _url, args, caller);
            } else {
              return this.emitAll(_url, args, caller);
            }
          }
        }
        return p[pName];
      } else if (typeof p[pName] !== 'object' || p[pName] == null) {
        // finding url
        if (override) {
          p[pName] = {};
        } else {
          return undefined;
        }
      }
      p = p[pName];
    }
  }

}

Database.prototype.DEFAULTEVENTNAME = '_$$DEFAULT_EVENT_CONTROLS';
/*
  './arc/index',
  'arc/index'
  '/arc/index'
*/

// Database.prototype.ShapeName = 'arc';

export default Database;
