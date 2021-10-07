export class Todo {
  constructor(data){
    this.data = data;
  }

  /**
   * Notes by defualt, only show when locaStorage is empty
   */
  notesDefault(){
    if(localStorage.getItem("TODO") === null){
      localStorage.setItem("TODO", JSON.stringify(this.data));
    }

    this.notes();
  }

  /**
   * Print notes from localStorage
   * @param {Array} notes 
   * @param {String} status 
   */
  printNotes(notes, status = ''){
    let htmlTemplete='';
    let emptyTemplete = `<li class="list__item"><p class="list__text">${status}</p>`;
    let listEl = document.querySelector('.list');
    notes.forEach(item => {
      let completed = (item.complete ? 'custom-checkbox__label--completed' : '');
      let checked = (item.complete ? 'checked' : '');

      htmlTemplete += `
        <li class="list__item" data-complete="${item.complete}" data-id="${item.id}" draggable="true">
          <div class="custom-checkbox">
            <input type="checkbox" class="custom-checkbox__input" id="check-${item.id}" ${checked}>
            <label for="check-${item.id}" class="custom-checkbox__label ${completed}">${item.note}</label>
          </div>
          <button class="list__remove" aria-label="remove ${item.note} note" data-id=${item.id}></button>
        </li>
      `;
    });

    if(htmlTemplete){
      listEl.innerHTML = htmlTemplete;   
    }else{
      listEl.innerHTML = emptyTemplete
    }
    this.countItems();   
  }

  /**
   * Change active class when click in nav items
   * @param {*} target 
   */
   activeStatus(target){
    let linkActive = 'nav__link--active';
    
    document.querySelectorAll('.nav__link').forEach(item =>{
      item.classList.remove(linkActive);
    });

    target.classList.add(linkActive);    
  }
  
  /**
   * All notes
   */
  notes(){
    let notes = JSON.parse(localStorage.getItem('TODO'));
    this.printNotes(notes, 'No todos created');    
  } 

  /**
   * Filter by active notes
   * @param {Array} notes 
   */
  activeNotes(notes){
    let activeNotes = notes.filter(function (lenght) {
      return lenght.complete !== true;
    });

    this.printNotes(activeNotes, 'No active todos');    
  }

  /**
   * Filter by complete notes
   * @param {Array} notes 
   */
  completeNotes(notes){
    let completeNotes = notes.filter(function (lenght) {
      return lenght.complete === true;
    });

    this.printNotes(completeNotes, 'No completed todos')
  }

  /**
   * Show/hide items list according to active of the nav
   * @param {String} text 
   */
  showLists(text){
    let notes = JSON.parse(localStorage.getItem('TODO'));   

    if(text === 'Active'){
      this.activeNotes(notes);         
    }else if(text === 'Complete'){
      this.completeNotes(notes);
    }else{
      this.notes();
    }
  }

  /**
   * Remove complete notes from locaStorage
   */
  clearCompleted(){
    let notes = JSON.parse(localStorage.getItem('TODO'));

    let completeNotes = notes.filter(function (lenght) {
      return lenght.complete !== true;
    });
    
    localStorage.setItem("TODO", JSON.stringify(completeNotes));
  }

  /**
   * Display the completeted elements from localStorage
   */
  countItems(){
    let notes = JSON.parse(localStorage.getItem('TODO'));
    let countNotes = notes.filter(function (lenght) {
      return lenght.complete !== true;
    });

    document.querySelector('.options__items').textContent = `${countNotes.length} items left`;
  }

  /**
   * Remove the note when the close button is clicked
   * @param {String} target 
   */
  removeNote(target){
    let notes = JSON.parse(localStorage.getItem('TODO'));
    let id = parseInt(target.dataset.id);
    let removeNote = notes.filter(function (note) {
      return note.id !== id;
    });
  
    localStorage.setItem("TODO", JSON.stringify(removeNote));
    this.printNotes(removeNote); 
  }

  /**
   * Change elements state when the check is clicked
   * @param {String} target 
   */
  checkNote (target){
    let notes = JSON.parse(localStorage.getItem('TODO'));
    let id = parseInt(target.id);

    notes.forEach(element => {
      if(element.id === id){
        element.complete = target.checked;
      }
    });

    localStorage.setItem("TODO", JSON.stringify(notes));

    if(target.checked){
      target.nextElementSibling.classList.add('custom-checkbox__label--completed');
    }else{
      target.nextElementSibling.classList.remove('custom-checkbox__label--completed');
    }

    this.countItems();
  }

  /**
   * Add new note
   * @param {String} target 
   */
  newNote(target){
    const formData = new FormData(target);
    const notes = JSON.parse(localStorage.getItem('TODO'));
    const value = formData.get('todo');
    const getIds = notes.map(note => note.id);
    const maxId = Math.max(...getIds);

    let newNote =  {
      note: value,
      complete: false,
      id: maxId + 1
    }

    if(value !== '' ){
      notes.push(newNote);
      localStorage.setItem("TODO", JSON.stringify(notes));
      target[0].value = '';      
    }
    this.printNotes(notes);
    
  }

  eventListeners(){  
    document.querySelector('.nav__list').addEventListener('click', (e) =>{
      e.preventDefault();   
      let target = e.target;  
      if(target.className === 'nav__link'){
        this.activeStatus(target);   
        this.showLists(target.innerText);    
       }      
    })
    
    document.querySelector('.options__completed').addEventListener('click', () =>{
      this.clearCompleted();
      this.notes();
    })

    document.querySelector('.list').addEventListener('click', (e) =>{
      let target = e.target;
      
      if(e.target.className === 'list__remove'){
       this.removeNote(target);

      }
      if(e.target.className === 'custom-checkbox__input'){
        this.checkNote(target)
      }
    })

    document.getElementById('formTodo').addEventListener('submit', (e) => {
      e.preventDefault();
      this.newNote(e.target);
    })

  }
}