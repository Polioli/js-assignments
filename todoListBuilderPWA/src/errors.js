let errorsPanel = document.querySelector( ".js-errors-panel" )
let addError = ( message, toConsole ) => {
  let text = message + toConsole;
  errorsPanel.appendChild( document.createTextNode( `${text}` ) );
  errorsPanel.appendChild( document.createElement( "br" ) );
  console.log( text );
}

export default addError