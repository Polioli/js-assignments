/*
KSAutocomplete отвечает за функционал автокомплита для указанного
DOM-элемента (input'a)
Сейчас данные для списка передаются извне, но если предполагается
поиск на основе ajax-запросов, то лучше передавать ф-нцию получения
порции данных
*/

const DELAY = 250;
const TEXT = { notFound: "Нет совпадений" };

var getItem = ( node ) => {
  while ( node ) {
    if( node.classList && node.classList.contains( "js-item" ) ) return node;
      node = node.parentNode;
  }
};

class KSAutocomplete {
  constructor( domEl, data ) {
    this.parent = domEl;
    this.text = domEl.querySelector( ".js-text" );
    this.list = domEl.querySelector( ".js-list" );
    this.data = this.initializeData( data );
    this.initializeEvents();
  };
  initializeData( data ) {
    let dataArray = [];
    for ( var key in data ) {
      let value = data[key] + " (" + key + ")"
      dataArray.push({
        name: key,
        value: value,
        valueForSearch: value.toLowerCase()
      });
    }
    dataArray.sort(( a, b ) => {
      return a.value.localeCompare( b.value );
    });
    return dataArray;
  };
  initializeEvents() {
    this.text.addEventListener( "focus", ( ev ) => {
      clearTimeout( this.vTime );
      this.prepareList( this.likeSearch( ev.currentTarget.value ) );
      this.list.classList.remove( "hidden" );
    });
    this.text.addEventListener( "blur", () => {
      this.vTime = setTimeout( () => {
        this.list.classList.add( "hidden" ); }, DELAY );
    });
    this.text.addEventListener( "keyup", ( ev ) => {
      if( ( ev.currentTarget.value.length != 0 && ev.currentTarget.value.localeCompare( this.previousValue ) ) ||
        ( ev.currentTarget.value.length == 0 && this.previousValue )
        ) {
        this.prepareList( this.likeSearch( ev.currentTarget.value ), ev.currentTarget.value );
        this.previousValue = ev.currentTarget.value;
      }
    });
    this.parent.addEventListener( "click", ( ev ) => {
      this.selectItem( getItem( ev.target ) );
    });
    this.parent.addEventListener( "keydown", ( ev ) => {
      let node;
      let selectItem = () => {
        let pos = [].slice.call( this.list.children ).findIndex( ( item ) => {
          return item.classList.contains( "hover" );
        } );
        if( pos > -1 ) {
          this.selectItem( this.list.children[ pos ] );
        }
      };
      let gotoNext = ( isUpDirection ) => {
        let pos = [].slice.call( this.list.children ).findIndex( ( item ) => {
          return item.classList.contains( "hover" );
        } );
        if( pos > -1 ) node = this.list.children[ pos ];
        if( !node ) {
          node = this.list.children[ 0 ];
        } else {
          node.classList.remove( "hover" );
          if( isUpDirection ){
            if( node.previousElementSibling ) node = node.previousElementSibling;
            else node = this.list.children[ this.list.children.length - 1 ];
          } else {
            if( node.nextElementSibling ) node = node.nextElementSibling;
            else node = this.list.children[ 0 ];
          }
        }
        node.classList.add( "hover" );
        node.scrollIntoView();
      };

      let keyCode = ev.keyCode || ev.which;
      if( keyCode == 38 ) return gotoNext( true );
      if( keyCode == 40 ) return gotoNext();
      if( keyCode == 13 ) return selectItem();
      if( keyCode == 27 ) return this.clearSelection();
    });
  };
  clearSelection() {
    this.previousValue = null;
    this.text.value = "";
    document.activeElement.blur();
  };
  selectItem( node ) {
    console.log( "selectItem of ksAutocomplete");
      if( node ) {
        let index = this.data.findIndex( ( item ) => {
          return item.name == node.dataset.id;
        });
        this.text.value = this.previousValue = this.data[ index ].value;
        setTimeout( () => { alert( node.textContent ); }, DELAY );
        document.activeElement.blur();
      }
  };
  prepareList( data, patternText ) {
    let fragment = document.createDocumentFragment();
    if( data.length ) {
      data.forEach(( item ) => {
        let li = document.createElement( "li" );
        if( typeof item.range == "object" ) {
          let { start, len } = item.range;
          li.innerHTML = `${item.value.substr( 0, start )}<b>${item.value.substr( start, len )}</b>${item.value.substr( start + len )}`;
          // NOTE: или для варианта с regExp
          // let pattern = new RegExp( "(" + patternText + ")", "gi" );
          // li.innerHTML = item.value.replace(pattern, "<b>$1</b>");
        } else {
          li.textContent = item.value;
        }
        li.classList.add( "js-item", "list-item" );
        li.dataset.id = item.name;
        fragment.appendChild( li );
      });
      this.text.classList.remove( "em" );
    } else {
      let li = document.createElement( "li" );
        li.textContent = TEXT.notFound;
        fragment.appendChild( li );
        this.text.classList.add( "em" );
    }
    this.list.innerHTML = "";
    this.list.appendChild( fragment );
  };

  likeSearch( text ) {
    let dataArray = [];
    let pattern = text.toLowerCase();
    // NOTE: или для варианта с regExp
    // let pattern = new RegExp( text, "i" );
    let patternLength = pattern.length;
    let pos;
    for( var i = 0, len = this.data.length; i < len; i++ ) {
      if( (pos = this.data[ i ].valueForSearch.indexOf( pattern ) ) > -1 ) {
        this.data[ i ].range = { start: pos, len: patternLength };
        dataArray.push( this.data[ i ] );
        // NOTE: или для варианта с regExp
        // if( pattern.test( this.data[ i ].value ) )
        //   dataArray.push( this.data[ i ] );
      }
      if( text.length && dataArray.length == 5 ) break;
    }
    return dataArray;
  };
};

export { KSAutocomplete as default }
