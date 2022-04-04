export default function shouldShowBanner() {
	const urlParams = new URLSearchParams( window.location.search );
	const userGroups = mw.config.get( 'wgUserGroups' );

	if ( urlParams.has( 'banner' ) ) {
		return true;
	}

	/* not logged in */
	if ( userGroups === null ) {
		return false;
	}

	/* belongs to group "autoreview" */
	if ( userGroups.indexOf( 'autoreview' ) === -1 ) {
		return false;
	}

	return true;
}
