class PluginLog {
  constructor(timestamp, level, plugin, message) {
    this.timestamp = timestamp;
    this.level = level;
    this.plugin = plugin;
    this.message = message;
  }
}

PluginLog.prototype.getLogType = function() {
  return 'plugin';
}

export {PluginLog};