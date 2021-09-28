export default function shouldShowBanner() {
	const urlParams = new URLSearchParams( window.location.search );
	const loggedIn = mw.config.get( 'wgUserRegistration' );
	const editCount = mw.config.get( 'wgUserEditCount' );

	if ( urlParams.has( 'banner' ) ) {
		return true;
	}

	if ( !loggedIn ) {
		return false;
	}

	if ( editCount < 1 || editCount > 200 ) {
		return false;
	}

	return true;
}
