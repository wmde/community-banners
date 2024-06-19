/* global BANNERS */
const bannerSelectionListTemplate = require( './dashboard.hbs' );
const Handlebars = require( 'handlebars/runtime' );

Handlebars.registerHelper( 'bannerlink', function ( link, bannerKey ) {
	return link.replace( '{{banner}}', bannerKey );
} );

document.body.innerHTML = bannerSelectionListTemplate( { banners: BANNERS } );
