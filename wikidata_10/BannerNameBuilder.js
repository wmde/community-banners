const WINDOW_WIDTHS = [
	{
		under: 600,
		device: 'mobile'
	},
	{
		under: 1200,
		device: 'ipad'
	}
];

export class BannerNameBuilder {
	prefix;
	suffixes;

	constructor( selector, attribute ) {
		this.prefix = '';

		const bannerElement = document.getElementById( selector );
		if ( bannerElement !== null ) {
			const name = bannerElement.getAttribute( attribute );
			if ( name !== null ) {
				this.prefix = name;
			}
		}

		this.suffixes = [];
	}

	addDeviceSuffix() {
		let windowWidth = window.innerWidth;
		let width = WINDOW_WIDTHS.find( window => windowWidth < window.under );

		if ( width ) {
			this.addSuffix( width.device );
		}

		return this;
	}

	addSuffix( suffix ) {
		this.suffixes.push( suffix );
		return this;
	}

	build() {
		let bannerName = this.prefix;
		if ( this.suffixes.length > 0 ) {
			bannerName += '_' + this.suffixes.join( '_' );
		}
		return bannerName;
	}
}
