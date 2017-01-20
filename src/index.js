import React from 'react';
import { render } from 'react-dom';
import App from './App/App';

render(<App />, document.getElementById('app'));

function onDeviceReady() {
  const colors = [ '#8FB4D9', '#FFAE90', '#EC7DA2', '#FFF2A8', '#73E3C7' ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  setTimeout(onDeviceReady, 1000);
  document.documentElement.style.setProperty('--logo', color);
}

document.addEventListener('deviceready', onDeviceReady);
