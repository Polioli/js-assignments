import ToDoBuilder from "./todobuilder";
import addError from "./errors";

let todoBuilder: ToDoBuilder = new ToDoBuilder( ".js-todo-builder" );
let errorsPanel: Element = document.querySelector( ".js-errors-panel" );
let appMenu: Element = document.querySelector( ".js-app-menu" );
let aboutBox: Element = document.querySelector( ".js-description" );

if( "serviceWorker" in navigator ) {
  navigator.serviceWorker.register( "/js-assignments/todoListBuilderPWA/sw.js" ) // all domain is the scope todoListBuilderPWA
  .then( ( registration ) => {
    addError( "SW ToDoList registration was done!",  registration );
    return navigator.serviceWorker.ready;
  }).catch( ( err ) => {
    addError( "SW register error: ", err );
  });

  navigator.serviceWorker.addEventListener( "message", ( ev ) => {
    addError( "From SW: ", ev.data );
   });
} else {
  addError( "The browser doesn't support ServiceWorker", "" );
}

document.querySelector( ".js-app-menu-button" ).addEventListener("click", ( ev:any ) => {
  appMenu.classList.toggle( "visible" );
});

document.querySelector( ".js-app-menu-item" ).addEventListener("click", ( ev:any ) => {
  errorsPanel.classList.toggle( "visible" );
  appMenu.classList.toggle( "visible" );
  let target: HTMLElement = ev.currentTarget;
  if( target.dataset.textStatus == "show" ) {
    target.dataset.textStatus = "hide";
    target.innerHTML = target.dataset.textHide;
  } else {
    target.dataset.textStatus = "show";
    target.innerHTML = target.dataset.textShow;
  }
});

document.querySelector( ".js-toggle-about" ).addEventListener("click", ( ev:any ) => {
  aboutBox.classList.toggle( "visible" );
});

document.querySelector( ".js-description-close" ).addEventListener("click", ( ev:any ) => {
  aboutBox.classList.toggle( "visible" );
});

