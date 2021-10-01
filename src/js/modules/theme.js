export class Theme{
  constructor(){
    this.themeLabel = document.querySelector('.header__theme-label');
    this.themeInput = document.querySelector('.header__theme-checkbox');    
  }

  /**
   * Change value of data-theme 
   * 
   */
  changeTheme(){
    if(this.themeInput.checked){
      document.body.setAttribute('data-theme', 'dark');
    }else{
      document.body.setAttribute('data-theme', 'light');
    }
  }

  /**
   * Toggle theme name in label, only for accesibility
   * @param {*} state 
   */
  stateTheme(state){
    this.themeLabel.children[0].textContent = `${state} theme`;
  }

  /**
   * Save theme value in localstorage
   */
  saveTheme(){
    let saveTheme = (this.themeInput.checked) ? 'dark' : 'light';

    localStorage.setItem('theme', saveTheme);
    
    this.stateTheme(saveTheme);
  }

  
  /**
   * Get theme value in localstorage when page loads 
   */
  loadTheme(){
    let dataTheme = localStorage.getItem('theme');

    this.stateTheme(dataTheme);

    if(dataTheme === 'dark'){
      document.body.setAttribute('data-theme', 'dark');
      this.themeInput.checked = true;
    }else{
      document.body.setAttribute('data-theme', 'light');
      this.themeInput.checked = false;
    }    
  }

  eventListeners() {
    this.themeInput.addEventListener('change', () => {
      this.changeTheme();      
      this.saveTheme();      
    })
  }

}