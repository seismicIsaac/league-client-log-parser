import { Signal } from './signal';

export function newFileModel() {
  const isLoaded = false;
  const getIsLoaded = function() {
    return isLoaded;
  }
  const setIsLoaded = function(loaded) {
    if (loaded != isLoaded) {
      loaded = isLoaded;
      isLoadedChanged.dispatch(loaded);
    }
  }

  const isLoadedChanged = new Signal();
  const getIsLoadedChanged = function() {
    return isLoadedChanged;
  }

  let documentName = '';
  const getDocumentName = function() {
    return documentName;
  }
  const setDocumentName = function(_documentName) {
    if (documentName != _documentName) {
      documentName = _documentName;
      documentNameChanged.dispatch();
    }
  }

  const documentNameChanged = new Signal();
  const getDocumentNameChanged = function() {
    return documentNameChanged;
  }

  let content = '';
  const getContent = function() {
    return content;
  }
  const setContent = function(_content) {
    if (content != _content) {
      content = _content;
      contentChanged.dispatch();
    }
  }

  const contentChanged = new Signal();
  const getContentChanged = function() {
    return contentChanged;
  }
  return {
    getIsLoaded: getIsLoaded,
    setIsLoaded: setIsLoaded,
    getIsLoadedChanged: getIsLoadedChanged,

    getDocumentName: getDocumentName,
    setDocumentName: setDocumentName,
    getDocumentNameChanged: getDocumentNameChanged,

    getContent: getContent,
    setContent: setContent,
    getContentChanged: getContentChanged
  }
};