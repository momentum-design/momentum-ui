class DatabaseEvent {

  static is1stMine (arr) {
    return arr.length > 0 && DatabaseEvent.isMine(arr[0]);
  }

  static isMine(obj) {
    return obj instanceof DatabaseEvent;
  };

  constructor (data, args) {
    this.Data = data;
    this.Args = args;
  }

}

export default DatabaseEvent;
