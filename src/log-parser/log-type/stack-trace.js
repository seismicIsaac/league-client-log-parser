
class StackTraceLog {
  constructor(stackTraceSegments) {
    this.lines = stackTraceSegments;
  }
}

StackTraceLog.prototype.getLogType = function() {
  return 'stackTrace';
}

export { StackTraceLog };