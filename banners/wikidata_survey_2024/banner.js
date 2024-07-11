import text from './Banner.html';
let html = String( text );

const translations = {
	'{{{WMDE_banner_accessible_description}}}' : 'Community survey announcement',
	'{{{WMDE_banner_hide}}}' : 'Hide Banner',
	'{{{WMDE_banner_title}}}' : 'The Wikidata Community in 2024',
	'{{{WMDE_banner_button}}}' : 'Take the survey',
	'{{{WMDE_banner_privacy}}}' : 'privacy statement',
	'{{{WMDE_banner_sentence_1}}}' : 'Curious to learn who uses and edits Wikidata? So is Wikimedia Deutschland! Take a 10-minute anonymous survey to help us better understand the Wikidata community.',
	'{{{WMDE_banner_sentence_2_start}}}' : 'Available in',
	'{{{WMDE_banner_sentence_2_and}}}' : 'and',
	'{{{WMDE_banner_language_arabic}}}' : 'Arabic',
	'{{{WMDE_banner_language_chinese}}}' : 'Chinese',
	'{{{WMDE_banner_language_english}}}' : 'English',
	'{{{WMDE_banner_language_french}}}' : 'French',
	'{{{WMDE_banner_language_german}}}' : 'German',
	'{{{WMDE_banner_language_hindi}}}' : 'Hindi',
	'{{{WMDE_banner_language_portuguese}}}' : 'Portuguese',
	'{{{WMDE_banner_language_spanish}}}' : 'Spanish',
};

Object.keys( translations ).forEach( key => html = html.replace( key, translations[ key ] ) );

document.getElementById( 'WMDE-comunity-dev-banner' ).innerHTML = html;
