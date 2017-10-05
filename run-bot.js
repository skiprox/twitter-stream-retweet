'use strict';

const App = require('./app');

const app = new App('grad school, grad program, grad programs, grad schools', ['applying to grad school', 'applying to grad program', 'apply to grad school', 'apply to grad program', 'apply for grad school', 'apply for grad program', 'grad school app', 'grad program app', 'looking at grad school', 'looking at grad program', 'grad school search', 'grad program search', 'look at grad school', 'look at grad program', 'search grad school', 'search grad program']);
app.streamAndRetweet();
