export class Drag{
  constructor(){
    this.list =  document.querySelector('.list');
    this.listItem = document.querySelectorAll('.list__item');
  }

  /**
   * Init event listener drag start/end 
   */
  init(){
    this.list.addEventListener('dragstart', (e) =>{
      if(e.target.className === 'list__item'){
        e.target.classList.add('dragging');
      }
    })
    this.list.addEventListener('dragend', (e) =>{
      if(e.target.classList.contains('list__item')){
        e.target.classList.remove('dragging');
        this.orderNotes();  
      }
    })
    this.dragOver();
  }

  /**
   * Sort notes when items are dragged
   */
  orderNotes(){
    let notes = JSON.parse(localStorage.getItem('TODO'));
    let id = [...document.querySelectorAll('.list__item')].map((element) => {      
      return element.dataset.id;     
    });   
    
    
    let saveOrder= []
    for (let index = 0; index < notes.length; index++) {
      let n = notes.find((item) => {
        return item.id == id[index]
      })
      saveOrder.push(n);
    }

    localStorage.setItem("TODO", JSON.stringify(saveOrder)); 
  }

  /**
   * Change position the iten 
   */
  dragOver(){
    this.list.addEventListener('dragover', (e) =>{
      e.preventDefault();
      if(e.target.className === 'list__item'){
        let draggingList = document.querySelector('.dragging');
        let afterDraggingList = this.getAfterDraggingList(this.list, e.clientY);

        if(afterDraggingList){  
          afterDraggingList.parentNode.insertBefore(draggingList, afterDraggingList);
        } else{
          this.list.appendChild(draggingList);
        }
      }
    })
  }

  /**
   * Calculate the position when items are dragging
   * @param {*} list 
   * @param {*} yDraggingList 
   * @returns 
   */
  getAfterDraggingList(list, yDraggingList){
    let listCards = [...list.querySelectorAll('.list__item:not(.dragging)')];

    return listCards.reduce((closestList, nextList)=>{
        let nextListRect = nextList.getBoundingClientRect();
        let offset = yDraggingList - nextListRect.top - nextListRect.height /2;

        if(offset < 0 && offset > closestList.offset){
            return {offset, element: nextList}
        } else{
            return closestList;
        }
    
    }, {offset: Number.NEGATIVE_INFINITY}).element;
  }
}