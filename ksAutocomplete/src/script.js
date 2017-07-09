/*
Добавляем элементам input.js-autocomplete на странице возможность автокомплита
*/

import KSAutocomplete from "./ks_autocomplete.js";
(() => {
  // данные для тестирования
  var testObject = {
    a: "frontend",
    b: "backend",
    c: "fullstack"
  };

  var getData = ( url ) => {
    return fetch( url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }).then(( response ) => {
      return response.json();
    }).catch( alert );
  };

  var getCounties = () => {
    // return getData( "http://country.io/names.json");
    // return getData( "http://localhost/names.json");
    return require('./../names.json');
  };

  var getMusicData = () => {
    return getData( "https://api.soundcloud.com/tracks.json?client_id=8c2dbe8ba5ecfc0abb8ded813c5ea433&order=hotness&limit=20&filter=streamable" )
    .then( ( data ) => {
      return data.reduce( ( memo, next ) => {
        memo[ next.id ] = `${next.title} (${next.genre})`
        return memo;
      }, {} );
    });
  };

  // в дата-атрибуте input.js-autocomplete указан источник данных
  var functionsList = {
    getCounties: getCounties,
    getMusicData: getMusicData,
    getTestObject: () => { return testObject; }
  };

  document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll( ".js-autocomplete" ).forEach( function( item ) {
      let data = functionsList[ item.dataset.functionName ]();

      if( data.constructor == Promise ) {
        data.then(( data ) => {
          new KSAutocomplete( item,  data );
      });
      } else new KSAutocomplete( item,  data );
    });
  });
})();