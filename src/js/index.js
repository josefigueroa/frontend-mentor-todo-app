const data = require('../data/notes.json');
import { Theme } from './modules/theme';
import { Todo } from './modules/todo';
import { Drag } from './modules/drag';
import "../scss/style.scss"

const themeInit = new Theme();
const todo = new Todo(data);
const drag = new Drag();

window.addEventListener('DOMContentLoaded', () => { 
  themeInit.loadTheme();
  themeInit.eventListeners();
  todo.notesDefault();
  todo.eventListeners();
  drag.init();
})