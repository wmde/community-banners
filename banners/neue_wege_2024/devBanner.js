import text from './Banner.html';

import { insertDevBanner } from '../../src/insertDevBanner';

const translations = {
};

let html = String( text );
Object.keys( translations ).forEach( key => {
	html = html.replace( key, translations[ key ] );
} );

insertDevBanner( document.getElementById( 'WMDE-community-dev-banner' ), html );
