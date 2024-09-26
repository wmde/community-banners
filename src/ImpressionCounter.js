/**
 * This is a class that will enable you to store impression counts for tracking.
 * In order to use it you need to copy it into the script tag of your banner.
 */
class ImpressionCounter {
	constructor( bannerName ) {
		this.itemName = 'banner_impressions-' + bannerName;
		this.overallCount = 0;
		if ( !window.localStorage ) {
			return;
		}
		const overallCount = window.localStorage.getItem( this.itemName ) || '0';
		this.overallCount = parseInt( overallCount, 10 );
	}

	incrementImpressionCount() {
		this.overallCount++;
		if ( !window.localStorage ) {
			return;
		}
		window.localStorage.setItem( this.itemName, this.overallCount.toFixed( 0 ) );
	}

	getImpressionCount() {
		if ( !window.localStorage ) {
			return 0;
		}
		let impressions = window.localStorage.getItem( this.itemName );
		if ( impressions === null ) {
			impressions = 0;
			window.localStorage.setItem( this.itemName, '0' );
		}
		return parseInt( impressions );
	}
}
