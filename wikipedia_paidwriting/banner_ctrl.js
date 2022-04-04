import shouldShowBanner from './shouldShowBanner';

require( './css/styles.pcss' );
require( '../shared/prepend-polyfill' );

import { BannerNameBuilder } from './BannerNameBuilder';
import { Banner } from './Banner';
import { BANNER_CONTAINER_ID, BANNER_ID, BANNER_NAME_ATTRIBUTE, CLOSE_BUTTON_ID, LINK_BUTTON_ID } from './config';

const BANNER_CLASS_PREFIX = 'paidwriting-banner-';
const BANNER_TITLE = 'Deine Meinung ist gefragt:';
const BANNER_SUBTITLE = 'Die Umfrage zum bezahlten Schreiben in der Wikipedia.';
const BANNER_BUTTON_TEXT = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jetzt&nbsp;teilnehmen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
const BANNER_TITLE_COLOR = '#222';
const BANNER_BACKGROUND_COLOR = ' #f6f6f6';

$( document ).ready( () => {
	if ( !shouldShowBanner() ) {
		return;
	}

	const bannerName = new BannerNameBuilder( BANNER_CONTAINER_ID, BANNER_NAME_ATTRIBUTE )
		.addDeviceSuffix()
		.build();

	const bannerTemplate = require( './templates/banner.hbs' );

	const templateVars = {
		keyword: bannerName,
		banner: BANNER_CLASS_PREFIX,
		banner_title: BANNER_TITLE,
		banner_subtitle: BANNER_SUBTITLE,
		banner_button_text: BANNER_BUTTON_TEXT,
		banner_title_color: BANNER_TITLE_COLOR,
		banner_background_color: BANNER_BACKGROUND_COLOR,
		wp_user: mw.config.get( 'wgUserName' ) === null ? 'anonymous' : 'logged_in'
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
