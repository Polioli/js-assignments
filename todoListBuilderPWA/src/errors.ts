let errorsPanel: Element = document.querySelector( ".js-errors-panel" )
let addError = ( message:any, toConsole:any ) => {
  let text: string = message + ( toConsole || "" );
  errorsPanel.appendChild( document.createTextNode( `${text}` ) );
  errorsPanel.appendChild( document.createElement( "br" ) );
  console.log( text );
}

export default addError