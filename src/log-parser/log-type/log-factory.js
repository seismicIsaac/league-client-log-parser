import {ServiceProxyLog} from './service-proxy';
import {PluginLog} from './plugin';
import {NormalLog} from './normal';

export default function createLog(lineSegments) {
  let message, plugin, logLine;
  const timestamp = lineSegments[0];
  const level = lineSegments[1].trim();
  message = lineSegments[2].substring(1);
  if (lineSegments.length === 4) {
    plugin = lineSegments[2].trim();
    message = lineSegments[3].substring(1);
    if (message.includes('service proxy')) {
      logLine = new ServiceProxyLog(timestamp, level, plugin, message);
    } else {
      logLine = new PluginLog(timestamp, level, plugin, message);
    }
  } else {
    logLine = new NormalLog(timestamp, level, message);
  }
  return logLine;
}