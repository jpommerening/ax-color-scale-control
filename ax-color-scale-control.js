/**
 * Copyright 2015 aixigo AG
 * Released under the MIT license.
 * http://laxarjs.org/license
 */
define( [
   'angular',
   'chroma-js'
], function( ng, chroma ) {
   'use strict';

   var directiveName = 'axColorScale';

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   var directive = [ function colorScaleDirective() {
      return {
         restrict: 'A',
         replace: true,
         template: '<ol class="ax-color-scale" style="display: none"><li class="ax-color-stop"></li></ol>',
         scope: {
            scale: '=' + directiveName
         },
         link: function( scope, iElement, iAttrs ) {
            var base = iElement.find( '.ax-color-stop' );
            var nocolor = getBackgroundColor( base[ 0 ] );
            var colors = [];
            var stop;
            var i;

            base.remove();

            for( i = 0; i < 10; i++ ) {
               stop = base.clone();
               stop.addClass( 'ax-color-stop-' + i );
               iElement.append( stop );
               colors.unshift( getBackgroundColor( stop[ 0 ] ) );

               if( colors[ 0 ] === nocolor ) {
                  colors.shift();
                  break;
               }
            }

            scope.scale = chroma.scale( chroma.bezier( colors.reverse() ) )
         }
      };
   } ];

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   function getBackgroundColor( element ) {
      if( getComputedStyle ) {
         return getComputedStyle( element )[ 'background-color' ];
      } else {
         return element.currentStyle.backgroundColor;
      }
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module( directiveName + 'Control', [] ).directive( directiveName, directive );

} );
