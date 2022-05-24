require( './css/styles.pcss' );
require( '../shared/prepend-polyfill' );

import { BannerNameBuilder } from './BannerNameBuilder';
import { Banner } from './Banner';

const BANNER_CONTAINER_ID = 'WMDE-Banner-Container';
const BANNER_NAME_ATTRIBUTE = 'data-tracking';

$( document ).ready( () => {
	const bannerName = new BannerNameBuilder( BANNER_CONTAINER_ID, BANNER_NAME_ATTRIBUTE )
		.addDeviceSuffix()
		.build();

	const bannerTemplate = require( './templates/banner.hbs' );

	const templateVars = {
		keyword: bannerName,
		wp_user: mw.config.get( 'wgUserName' ) === null ? 'anonymous' : 'logged_in'
	};

	new Banner(
		bannerName,
		bannerTemplate,
		templateVars
	).initialise();
} );
