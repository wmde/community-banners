import text from './Banner.html';
import { insertDevBanner } from '../../src/insertDevBanner';

const translations = {
	'{{{WMDE_Sample_Banner_Close}}}': 'I AM A CLOSE BUTTON',
	'{{{WMDE_Sample_Banner_Heading}}}': 'I HAVE LOADED A BANNER!',
	'{{{WMDE_Sample_Banner_Button}}}': 'I AM A TRACKED BUTTON'
};

let html = String( text );
Object.keys( translations ).forEach( key => {
	html = html.replace( key, translations[ key ] );
} );

insertDevBanner( document.getElementById( 'WMDE-community-dev-banner' ), html );
