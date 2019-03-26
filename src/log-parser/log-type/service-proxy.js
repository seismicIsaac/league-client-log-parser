
class ServiceProxyLog {
  constructor(timestamp, level, plugin, message) {
    this.timestamp = timestamp;
    this.level = level;
    this.plugin = plugin;
    this.message = message;
    this.methodName = '';
    this.serviceName = '';
    this.messageId = '';
    this.logState = '';
    this.returnMethodName = '';
  }
}

ServiceProxyLog.prototype.parseLog = function() {
  const message = this.message;
  const serviceProxyLogState = message.split(' ')[1];

  if (serviceProxyLogState === 'Preparing') {
    this.methodName = message.substring(message.lastIndexOf('.') + 1).trimEnd();
    this.serviceName = message.substring(message.lastIndexOf(': ') + 2, message.lastIndexOf('.'));
  } else if (serviceProxyLogState === 'Started') {
    const serviceAndMethodName = message.substring(message.lastIndexOf(': ') + 2, message.lastIndexOf(' '));
    this.methodName = serviceAndMethodName.substring(serviceAndMethodName.lastIndexOf('.') + 1).trimEnd();
    this.serviceName = serviceAndMethodName.substring(0, serviceAndMethodName.lastIndexOf('.'));
    this.messageId = message.substring(message.indexOf('(') + 1, message.indexOf(')'));
    if (this.messageId.startsWith(this.serviceName)) {
      this.returnMethodName = this.messageId.substring(this.serviceName.length + 1);
      this.messageId = null;
    }
  } else if (serviceProxyLogState === 'Fulfilled') {
    if (message.includes('.')) {
      this.returnMethodName = message.substring(message.lastIndexOf('.') + 1);
      this.serviceName = message.substring(message.lastIndexOf(': ') + 2, message.lastIndexOf('.'));
    } else {
      this.messageId = message.substring(message.indexOf('(') + 1, message.indexOf(')'));
    }
  }
  this.logState = serviceProxyLogState;
}

ServiceProxyLog.prototype.getLogType = function() {
  return 'serviceProxy';
}

ServiceProxyLog.prototype.getMethodName = function() {
  if (this.logState === '') {
    this.parseLog();
  }
  return this.methodName;
}

ServiceProxyLog.prototype.getReturnMethodName = function() {
  if (this.logState === '') {
    this.parseLog();
  }
  return this.returnMethodName;
}

ServiceProxyLog.prototype.getServiceName = function() {
  if (this.logState === '') {
    this.parseLog();
  }
  return this.serviceName;
}

ServiceProxyLog.prototype.getMessageId = function() {
  if (this.logState === '') {
    this.parseLog();
  }
  return this.messageId;
}

ServiceProxyLog.prototype.getLogState = function() {
  if (this.logState === '') {
    this.parseLog();
  }
  return this.logState;
}

export {ServiceProxyLog};