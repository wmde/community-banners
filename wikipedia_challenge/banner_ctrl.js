require( './css/styles.pcss' );

import { Banner } from './Banner';
import { BANNER_CONTAINER_ID, BANNER_ID, BANNER_NAME_ATTRIBUTE, CLOSE_BUTTON_ID, LINK_BUTTON_ID } from './config';

const BANNER_CLASS_PREFIX = 'challenge-banner-';
const BANNER_TITLE = '30 Tage im Kosmos von Wikipedia';

$( document ).ready( () => {
	const bannerElement = document.getElementById( BANNER_CONTAINER_ID );
	const bannerName = bannerElement.getAttribute( BANNER_NAME_ATTRIBUTE );

	const bannerTemplate = require( './templates/banner.hbs' );

	const templateVars = {
		campaign: bannerName,
		banner: BANNER_CLASS_PREFIX,
		banner_title: BANNER_TITLE
	};

	new Banner(
		bannerName,
		bannerTemplate,
		BANNER_ID,
		CLOSE_BUTTON_ID,
		LINK_BUTTON_ID,
		templateVars
	).initialise();
} );
