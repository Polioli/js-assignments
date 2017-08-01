import ToDoBuilder from "./todobuilder.js";

var todoBuilder = new ToDoBuilder( ".js-todo-builder" );

if( "serviceWorker" in navigator ) {
  navigator.serviceWorker.register( "/sw.js" ) // all domain is the scope
  .then( ( registration ) => {
    console.log( "sw registration was done!",  registration );
  });
}
