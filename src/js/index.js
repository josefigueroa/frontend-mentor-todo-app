const data = require('../data/notes.json');
import { Theme } from './modules/theme';
import { Todo } from './modules/todo';
import "../scss/style.scss"

const themeInit = new Theme();
const todo = new Todo(data);

window.addEventListener('DOMContentLoaded', () => { 
  themeInit.loadTheme();
  themeInit.eventListeners();
  todo.notesDefault();
  todo.eventListeners();
})