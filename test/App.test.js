//import React from 'react';
const React = require('react');
const ReactDOM = require('react-dom');
const act = require('react-dom/test-utils').act;
const expect = require('chai').expect;
//const App = require('../client/components/App.jsx');

//import ReactDOM from 'react-dom';
//import { act } from 'react-dom/test-utils';
//import { expect } from 'chai';
//import App from '../client/components/App.jsx';
const JSDOM = require('mocha-jsdom');


global.document = JSDOM({
  url: 'http://localhost',
});

let rootContainer;

// beforeEach(() => {
//   rootContainer = document.createElement("div");
//   document.body.appendChild(rootContainer);
// });

// afterEach(() => {
//   document.body.removeChild(rootContainer);
//   rootContainer = null;
// });

describe('App component testing', () => {
  // xit('renders a div tag with a classname of "app-container"', () => {
  //   act(() => {
  //     ReactDOM.render(<App />, rootContainer);
  //   });
  //   let appElement = document.getElementsByClassName('app-container');
  //   expect(appElement.length).to.equal(1);
  // });
});
