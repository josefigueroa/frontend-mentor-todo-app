import { Theme } from './modules/theme';
import "../scss/style.scss"

const themeInit = new Theme();



window.addEventListener('DOMContentLoaded', () => { 
  themeInit.loadTheme();
  themeInit.eventListeners();
})