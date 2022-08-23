import getTextFromElement from './getTextFromElement';

require( './css/styles.pcss' );
require( '../shared/prepend-polyfill' );

import { BannerNameBuilder } from './BannerNameBuilder';
import { Banner } from './Banner';

const BANNER_CONTAINER_ID = 'WMDE-Banner-Container';
const BANNER_NAME_ATTRIBUTE = 'data-tracking';
const DEFAULT_BANNER_COPY = 'Wikidata is turning 10 in October 2022. You can participate in the collaborative ' +
	'birthday video by sending us your birthday wishes until September 18th!';
const DEFAULT_BUTTON_TEXT = 'Contribute';
const DEFAULT_TRANSLATE_TEXT = 'Help with translations!';

$( document ).ready( () => {
	const bannerName = new BannerNameBuilder( BANNER_CONTAINER_ID, BANNER_NAME_ATTRIBUTE )
		.addDeviceSuffix()
		.build();

	const bannerTemplate = require( './templates/banner.hbs' );

	const copy = getTextFromElement( 'WMDE-Banner-wikidata-10-copy' );
	const buttonText = getTextFromElement( 'WMDE-Banner-wikidata-10-button-text' );
	const translateText = getTextFromElement( 'WMDE-Banner-wikidata-10-translate' );
	const templateVars = {
		keyword: bannerName,
		wp_user: mw.config.get( 'wgUserName' ) === null ? 'anonymous' : 'logged_in',
		copy: copy ?? DEFAULT_BANNER_COPY,
		button_text: buttonText ?? DEFAULT_BUTTON_TEXT,
		translate: translateText ?? DEFAULT_TRANSLATE_TEXT
	};

	new Banner(
		bannerName,
		bannerTemplate,
		templateVars
	).initialise();
} );
