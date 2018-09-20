class TBDGameDTOLog {
  constructor(timestamp, dto) {
    this.timestamp = timestamp;
    this.dto = dto;
  }
}

TBDGameDTOLog.prototype.getLogType = function() {
  return 'tbdGameDto';
}

export {TBDGameDTOLog};