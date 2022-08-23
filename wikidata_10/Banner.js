import { EventLoggingTracker } from '../shared/EventLoggingTracker';
import { LocalImpressionCount } from '../shared/LocalImpressionCount';

const BANNER_CONTAINER_ID = 'WMDE-Banner-Container';
const BANNER_ID = 'WMDE-banner';
const VECTOR_PANEL = 'mw-panel';
const VECTOR_HEAD = 'mw-head';
const EDIT_BUTTONS_CLASS = 'mw-editsection-visualeditor';
const EDIT_BUTTON_ID = 'ca-ve-edit';
const CLOSE_BUTTON_ID = 'WMDE-banner-close-button';
const LINK_SCHEDULE_ID = 'WMDE-banner-schedule';
const LINK_EVENT_ID = 'WMDE-banner-event';

const BANNER_CLOSE_TRACK_RATIO = 1;
const BANNER_SEEN_TRACK_RATIO = 1;

export class Banner {
	name;
	template;
	templateVars;
	eventLoggingTracker;
	localImpressionCount;

	banner;
	closeButton;
	linkScheduleButton;
	linkEventButton;
	editButton;
	editButtons;
	panel;
	head;

	constructor( name, template, templateVars = {} ) {
		this.name = name;
		this.template = template;
		this.templateVars = templateVars;

		this.localImpressionCount = new LocalImpressionCount( this.name );
		this.eventLoggingTracker = new EventLoggingTracker( this.name, this.localImpressionCount );
	}

	initialise() {
		this.createBanner();
		this.registerClickEvents();
		this.eventLoggingTracker.trackSeenEvent( BANNER_SEEN_TRACK_RATIO );
	}

	createBanner() {
		this.localImpressionCount.incrementImpressionCount();
		this.templateVars.impression_count = this.localImpressionCount.getImpressionCount();

		this.mountBanner();
		this.getHTMLElements();

		this.banner.style.display = 'block';
	}

	mountBanner() {
		document.getElementById( BANNER_CONTAINER_ID ).innerHTML = this.template( this.templateVars );
	}

	getHTMLElements() {
		this.banner = document.getElementById( BANNER_ID );
		this.closeButton = document.getElementById( CLOSE_BUTTON_ID );
		this.editButtons = document.getElementsByClassName( EDIT_BUTTONS_CLASS );
		this.linkScheduleButton = document.getElementById( LINK_SCHEDULE_ID );
		this.linkEventButton = document.getElementById( LINK_EVENT_ID );
		this.editButton = document.getElementById( EDIT_BUTTON_ID );
		this.panel = document.getElementById( VECTOR_PANEL );
		this.head = document.getElementById( VECTOR_HEAD );
	}

	registerClickEvents() {
		this.eventLoggingTracker.bindClickEvent( this.closeButton, 'banner-closed', BANNER_CLOSE_TRACK_RATIO );
		this.eventLoggingTracker.bindClickEvent( this.linkScheduleButton, 'schedule-clicked', BANNER_CLOSE_TRACK_RATIO );
		this.eventLoggingTracker.bindClickEvent( this.linkEventButton, 'event-clicked', BANNER_CLOSE_TRACK_RATIO );

		this.closeButton.addEventListener( 'click', () => {
			this.removeBanner();
			mw.centralNotice.hideBanner();
		} );

		if ( this.editButton !== null ) {
			this.editButton.addEventListener( 'click', () => this.removeBanner() );
		}

		for ( let i = 0; i < this.editButtons.length; i++ ) {
			this.editButtons[ i ].addEventListener( 'click', () => this.removeBanner() );
		}
	}

	removeBanner() {
		this.banner.style.display = 'none';
	}
}
