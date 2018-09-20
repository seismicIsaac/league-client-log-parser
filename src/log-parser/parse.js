import createLog from './log-type/log-factory';
import {StackTraceLog} from './log-type/stack-trace';
import {NormalLog} from './log-type/normal';
import {ServiceProxyLog} from './log-type/service-proxy';
import {TBDGameDTOLog} from './log-type/tbd-game-dto';

export function parseFileText(text) {
  const lines = text.split('\n');
  const logLines = [];
  const logLinesByType = {
    normal: [],
    plugin: [],
    serviceProxy: [],
    stackTrace: [],
    tbdGameDto: []
  }
  let trackingStackTrace = false;
  let stackTraceSegments = [];
  let lineSegments, logLine;

  for (let i = 0; i < lines.length; i++) {
    lineSegments = lines[i].split('|');
    if (lineSegments.length === 3 || lineSegments.length === 4) {
      if (trackingStackTrace) {
        logLinesByType[logLine.getLogType()].push(new StackTraceLog(stackTraceSegments));
        trackingStackTrace = false;
      }
      logLine = createLog(lineSegments);
      logLines.push(logLine);
      logLinesByType[logLine.getLogType()].push(logLine);
    } else if (lineSegments.length === 1) {
      if (trackingStackTrace) {
        stackTraceSegments.push(lineSegments[0]);
      } else {
        trackingStackTrace = true;
        stackTraceSegments = [lineSegments[0]];
      }
    }
  }
  return {
    getLines: function() { return lines},
    getLogLines: function() { return logLines},
    getNormalLines: function() { return logLinesByType[NormalLog.prototype.getLogType()] },
    getStackTraceLines: function() { return logLinesByType[StackTraceLog.prototype.getLogType()] },
    getServiceProxyCalls: function() { return logLinesByType[ServiceProxyLog.prototype.getLogType()] },
    getTBDGameDTOLines: function() { return logLinesByType[TBDGameDTOLog.prototype.getLogType()] },
    getBreakdown: getServiceProxyCallsByMethod(logLinesByType[ServiceProxyLog.prototype.getLogType()])
  }
}

export function analyzeServiceProxyLogs(serviceProxyLogs) {
  const logsByPlugin = getServiceProxyLogsByPlugin(serviceProxyLogs);
  const callsByMethodByPlugin = {};
  let callsByMethod = {};
  Object.keys(logsByPlugin).forEach((pluginName) => {
    callsByMethod = getServiceProxyCallsByMethod(logsByPlugin[pluginName]);
    callsByMethodByPlugin[pluginName] = callsByMethod;
  });
  //For each method name
  //find triplets
  
  //For each triplet 
  //find timestamp difference from started -> fulfilled
}

function getServiceProxyCallsByMethod(serviceProxyLogs) {
  const logsByMethod = {};
  let serviceProxyLog;

  for(let i = 0; i < serviceProxyLogs.length; i++) {
    serviceProxyLog = serviceProxyLogs[i];

    if (!logsByMethod[serviceProxyLog.getMethodName()]) {
      logsByMethod[serviceProxyLog.getMethodName()] = [serviceProxyLog];
    } else {
      logsByMethod[serviceProxyLog.getMethodName()].push(serviceProxyLog);
    }
  }
  return logsByMethod;
}

function getServiceProxyLogsByPlugin(serviceProxyLogs) {
  const logsByPlugin = {};
  let serviceProxyLog;
  for(let i = 0; i < serviceProxyLogs.length; i++) {
    serviceProxyLog = serviceProxyLogs[i];

    if (!logsByPlugin[serviceProxyLog.plugin]) {
      logsByPlugin[serviceProxyLog.plugin] = [serviceProxyLog];
    } else {
      logsByPlugin[serviceProxyLog.plugin].push(serviceProxyLog);
    }
  }
  return logsByPlugin;
}


export function getLineCount(text) {
  const lines = text.split('\n');
  return lines.length;
}