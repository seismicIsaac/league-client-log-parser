class NormalLog {
  constructor(timestamp, level, message) {
    this.timestamp = timestamp;
    this.level = level;
    this.message = message;
  }
}

NormalLog.prototype.getLogType = function() {
  return 'normal';
}

export {NormalLog};