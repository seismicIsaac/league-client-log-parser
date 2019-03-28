import createLog from './log-type/log-factory';
import {StackTraceLog} from './log-type/stack-trace';
import {NormalLog} from './log-type/normal';
import {ServiceProxyLog} from './log-type/service-proxy';
import {TBDGameDTOLog} from './log-type/tbd-game-dto';

export function parseFileText(text) {
  let lines = text.split('\n');

  const tbdGameDTOs = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (line.includes('Teambuilder service proxy message received: ')) {
      let totalDto = getFirstPartOfDTO(line);
      let j = 1;
      while (!isValidDTO(totalDto)) {
        totalDto += getJSONFromLine(lines[i+j]);
        j++;
      }
      tbdGameDTOs.push(totalDto);
    }
  }
  return tbdGameDTOs;
}

function isValidDTO(line) {
  let valid = true;
  try {
    JSON.parse(line);
  } catch (error) {
    valid = false;
  }
  return valid;
}

function getFirstPartOfDTO(line) {
  return line.split('Teambuilder service proxy message received: ')[1].replace(/\r?\n|\r/, "");
}

function getJSONFromLine(line) {
  return line.split('ALWAYS| rcp-be-lol-lobby-team-builder| ')[1].replace(/\r?\n|\r/, "");
}
  // const logLines = [];
  // const logLinesByType = {
  //   normal: [],
  //   plugin: [],
  //   serviceProxy: [],
  //   stackTrace: [],
  //   tbdGameDto: []
  // }
  // let trackingStackTrace = false;
  // let stackTraceSegments = [];
  // let lineSegments, logLine;

  // for (let i = 0; i < lines.length; i++) {
  //   lineSegments = lines[i].split('|');
  //   if (lineSegments.length === 3 || lineSegments.length === 4) {
  //     if (trackingStackTrace) {
  //       logLinesByType[logLine.getLogType()].push(new StackTraceLog(stackTraceSegments));
  //       trackingStackTrace = false;
  //     }
  //     logLine = createLog(lineSegments);
  //     logLines.push(logLine);
  //     logLinesByType[logLine.getLogType()].push(logLine);
  //   } else if (lineSegments.length === 1) {
  //     if (trackingStackTrace) {
  //       stackTraceSegments.push(lineSegments[0]);
  //     } else {
  //       trackingStackTrace = true;
  //       stackTraceSegments = [lineSegments[0]];
  //     }
  //   }
  // }
  // return {
  //   getLines: function() { return lines},
  //   getLogLines: function() { return logLines},
  //   getNormalLines: function() { return logLinesByType[NormalLog.prototype.getLogType()] },
  //   getStackTraceLines: function() { return logLinesByType[StackTraceLog.prototype.getLogType()] },
  //   getServiceProxyCalls: function() { return logLinesByType[ServiceProxyLog.prototype.getLogType()] },
  //   getTBDGameDTOLines: function() { return logLinesByType[TBDGameDTOLog.prototype.getLogType()] },
  //   getBreakdown: getServiceProxyCallsByMethod(logLinesByType[ServiceProxyLog.prototype.getLogType()])
  // }

export function analyzeServiceProxyLogs(serviceProxyLogs) {
  const callsByMethod = getServiceProxyCallsByMethod(serviceProxyLogs)
  
  //For each method name
  //find triplets
  Object.keys.forEach(methodName => {

  });
  
  //For each triplet 
  //find timestamp difference from started -> fulfilled
}

function getServiceProxyCallsByMethod(serviceProxyLogs) {
  let logsByMethod = {};
  let serviceProxyLog, methodKey;

  for(let i = 0; i < serviceProxyLogs.length; i++) {
    serviceProxyLog = serviceProxyLogs[i];
    methodKey = getMethodKey(serviceProxyLog);
    logsByMethod = storeValueInMapOfStringToArrayByKey(logsByMethod, methodKey, serviceProxyLog);
  }
  return logsByMethod;
}

function storeValueInMapOfStringToArrayByKey(map, key, value) {
  if (!map[key]) {
    map[key] = [value];
  } else {
    map[key].push(value);
  }
  return map;
}

function getMethodKey(serviceProxyLog) {
  let methodKey = serviceProxyLog.getMethodName();
  const returnMethodName = serviceProxyLog.getReturnMethodName();
  if (methodKey === '' && returnMethodName === '') {
    methodKey = 'messageId';
  } else if (methodKey === '' && returnMethodName !== '') {
    methodKey = returnMethodName;
  }
  return methodKey;
}

// function getServiceProxyLogsByPlugin(serviceProxyLogs) {
//   const logsByPlugin = {};
//   let serviceProxyLog;
//   for(let i = 0; i < serviceProxyLogs.length; i++) {
//     serviceProxyLog = serviceProxyLogs[i];

//     if (!logsByPlugin[serviceProxyLog.plugin]) {
//       logsByPlugin[serviceProxyLog.plugin] = [serviceProxyLog];
//     } else {
//       logsByPlugin[serviceProxyLog.plugin].push(serviceProxyLog);
//     }
//   }
//   return logsByPlugin;
// }


export function getLineCount(text) {
  const lines = text.split('\n');
  return lines.length;
}