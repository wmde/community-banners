import shouldShowBanner from './shouldShowBanner';

require( './css/styles.pcss' );

import { BannerNameBuilder } from './BannerNameBuilder';
import { Banner } from './Banner';
import { BANNER_CONTAINER_ID, BANNER_ID, BANNER_NAME_ATTRIBUTE, CLOSE_BUTTON_ID, LINK_BUTTON_ID } from './config';

const BANNER_TEXT = 'Du willst mehr? Spannende <b>Aufgaben</b> & persönliche <b>Unterstützung</b> genau für dich.';

$( document ).ready( () => {
	if ( !shouldShowBanner() ) {
		return;
	}

	const bannerName = new BannerNameBuilder( BANNER_CONTAINER_ID, BANNER_NAME_ATTRIBUTE )
		.addDeviceSuffix()
		.build();

	const bannerTemplate = require( './templates/banner.hbs' );

	const templateVars = {
		campaign: bannerName,
		banner_text: BANNER_TEXT
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
