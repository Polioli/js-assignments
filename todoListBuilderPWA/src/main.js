import ToDoBuilder from "./todobuilder.js";

var todoBuilder = new ToDoBuilder( ".js-todo-builder" );

if( "serviceWorker" in navigator ) {
  navigator.serviceWorker.register( "/js-assignments/todoListBuilderPWA/sw.js" ) // all domain is the scope todoListBuilderPWA
  .then( ( registration ) => {
    console.log( "SW registration was done!",  registration );
  });
}
