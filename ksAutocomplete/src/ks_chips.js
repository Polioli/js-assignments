/*
KSChips
*/

import KSAutocomplete from "./ks_autocomplete.js";

const DELAY = 250;

class KSChips extends KSAutocomplete {
  constructor( domEl, data ) {
    super( domEl, data );
    let  resultBox = document.createElement( "p" );
    resultBox.classList.add( "js-result" );
    this.parent.append( resultBox );
    this.resultBox = resultBox;
    this.initializeResultBoxEvents();
    this.chipsList = [];
  };

  initializeResultBoxEvents() {
    // QUESTION: super.initializeEvents();
    this.resultBox.addEventListener( "click", ( ev ) => {
      if( ev.target.classList.contains( "js-remove-chip" )) {
        this.resultBox.removeChild( ev.target.parentNode );
        let index = this.chipsList.findIndex( ( item ) => {
          return item === ev.target.parentNode.dataset.id;
        });
        // QUESTION: if -1;
        this.chipsList.splice( index, 1 );
        console.log( "this.chipsList ", this.chipsList );
      }
    });
  };

  selectItem( node ) {
      if( node ) {
        let index = this.data.findIndex( ( item ) => {
          return item.name == node.dataset.id;
        });
        document.activeElement.blur();
        let  chip = document.createElement( "span" );
        chip.classList.add( "chip" );
        chip.innerHTML = `${this.data[ index ].value} <span class="remove-chip js-remove-chip">x</span>`;
        chip.dataset.id = this.data[ index ].name ;
        this.resultBox.append( chip );
        this.chipsList.push( this.data[ index ].name );
      }
  };

};

export { KSChips as default }
