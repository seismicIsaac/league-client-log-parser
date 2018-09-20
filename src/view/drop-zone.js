import {newFileModel} from '../data/file-model';
import {Signal} from '../data/signal';

export default function dropZoneSetup() {
  const dropZoneId = "drop-zone";
  const buttonId = "clickHere";
  const mouseOverClass = "mouse-over";
  const dropZone = document.querySelector("#" + dropZoneId);
  const inputFile = dropZone.querySelector("input");

  dropZone.addEventListener("dragover", function (e) {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add(mouseOverClass);
  }, true);

  dropZone.addEventListener("dragleave", function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove(mouseOverClass);
  });

  var fileModel = newFileModel();

  document.getElementById(dropZoneId).addEventListener("drop", function (e) {
      e.preventDefault();
      dropZone.classList.remove(mouseOverClass);
      const file = e.dataTransfer.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        fileModel.setIsLoaded(true);
        fileModel.setContent(event.target.result);
        dropZone.querySelector('p').innerText = file.name;
      }
      fileModel.setIsLoaded(false);
      fileModel.setDocumentName(file.name);
      fileReader.readAsText(file);
  }.bind(fileModel), true);
  return fileModel;
};