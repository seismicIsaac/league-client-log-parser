import {getText} from './get-text';

export default function setupFilters() {
  var serviceProxyButton = document.getElementById('service-proxy-calls');
  serviceProxyButton.onclick = (event) => {
    var fileText = getText();
    var lines = fileText.split('\n');
    console.log(lines);
  };
}