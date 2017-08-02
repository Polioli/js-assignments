import ToDoBuilder from "./todobuilder.js";
import addError from "./errors.js";

var todoBuilder = new ToDoBuilder( ".js-todo-builder" );

if( "serviceWorker" in navigator ) {
  navigator.serviceWorker.register( "/todoListBuilderPWA/sw.js" ) // all domain is the scope todoListBuilderPWA
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
  addError( "The browser doesn't support ServiceWorker" );
}
