import getTextFromElement from './getTextFromElement';

require( './css/styles.pcss' );
require( '../shared/prepend-polyfill' );

import { BannerNameBuilder } from './BannerNameBuilder';
import { Banner } from './Banner';

const BANNER_CONTAINER_ID = 'WMDE-Banner-Container';
const BANNER_NAME_ATTRIBUTE = 'data-tracking';
const DEFAULT_BANNER_COPY = 'Wikidata is turning 10 in October 2022, and the community is organizing plenty of ' +
	'decentralized birthday events all around the world. You can join one of them or organize your own!';
const DEFAULT_BUTTON_SCHEDULE_TEXT = 'Events schedule';
const DEFAULT_BUTTON_EVENT_TEXT = 'Run an event';
const DEFAULT_TRANSLATE_TEXT = 'Help with translations!';

$( document ).ready( () => {
	const bannerName = new BannerNameBuilder( BANNER_CONTAINER_ID, BANNER_NAME_ATTRIBUTE )
		.addDeviceSuffix()
		.build();

	const bannerTemplate = require( './templates/banner.hbs' );

	const copy = getTextFromElement( 'WMDE-Banner-wikidata-10-copy' );
	const buttonTextSchedule = getTextFromElement( 'WMDE-Banner-wikidata-10-button-schedule' );
	const buttonTextEvent = getTextFromElement( 'WMDE-Banner-wikidata-10-button-event' );
	const translateText = getTextFromElement( 'WMDE-Banner-wikidata-10-translate' );
	const templateVars = {
		keyword: bannerName,
		wp_user: mw.config.get( 'wgUserName' ) === null ? 'anonymous' : 'logged_in',
		copy: copy ?? DEFAULT_BANNER_COPY,
		button_text_schedule: buttonTextSchedule ?? DEFAULT_BUTTON_SCHEDULE_TEXT,
		button_text_event: buttonTextEvent ?? DEFAULT_BUTTON_EVENT_TEXT,
		translate: translateText ?? DEFAULT_TRANSLATE_TEXT
	};

	new Banner(
		bannerName,
		bannerTemplate,
		templateVars
	).initialise();
} );
