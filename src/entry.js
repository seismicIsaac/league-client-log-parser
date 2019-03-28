import dropZoneSetup from './view/drop-zone';
import setupFilters from './view/filters';
import {getTextDiv} from './view/get-text';
import {parseFileText} from './log-parser/parse';

require('./style.css');

let fileModel;
const LeagueParserModel = {
  parsedFiles: {
    //fileName: parsedFile
  }
};

window.onload = function() {
  fileModel = dropZoneSetup();
  window.q = fileModel;
  
  fileModel.getContentChanged().add(setText.bind(this));
  fileModel.getContentChanged().add(() => {
    const startTime = Date.now();
    const parsedFile = parseFileText(fileModel.getContent());
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;
    LeagueParserModel.parsedFiles[fileModel.getDocumentName()] = parsedFile;  
    console.log('elapsedTime: ', elapsedTime);
    window.q = parsedFile;
  });
  
  setupFilters();
}

function setText() {
  const fileTextDiv = getTextDiv();
  fileTextDiv.innerText = fileModel.getContent();
}