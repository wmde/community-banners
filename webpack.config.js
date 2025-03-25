const webpack = require( 'webpack' );
const fs = require( 'fs' );
const path = require( 'path' );
const toml = require( 'toml' );

function getEntryPoints( banners ) {
	let entrypoints = {};
	Object.keys( banners ).forEach( bannerKey => {
		const banner = banners[ bannerKey ];
		if ( entrypoints[ bannerKey ] ) {
			throw new Error( `Duplicate pagename: ${ bannerKey }` );
		}
		entrypoints[ bannerKey ] = banner.filename;
	} );
	return entrypoints;
}

const banners = toml.parse( fs.readFileSync( 'banners.toml', 'utf8' ) );

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js',
		...getEntryPoints( banners )
	},
	output: {
		filename: '[name].js',
		publicPath: '/'
	},
	plugins: [
		new webpack.DefinePlugin( {
			BANNERS: JSON.stringify( banners )
		} )
	],
	devServer: {
		'port': 8085,
		'hot': true,
		'allowedHosts': 'all',
		'static': {
			directory: path.resolve( __dirname, 'dist' ),
			publicPath: '/',
			serveIndex: false
		},
		'headers': {
			'Access-Control-Allow-Origin': '*'
		},
		'proxy': [
			{
				context: [ '/wikidata' ],
				target: 'https://www.wikidata.org',
				changeOrigin: true
			},
			{
				context: [ '/wiki', '/w', '/static' ],
				target: 'https://de.wikipedia.org',
				changeOrigin: true
			}
		]
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				use: 'html-loader'
			},
			{
				test: /\.handlebars$|\.hbs$/,
				use: [
					{ loader: 'handlebars-loader' }
				]
			}
		]
	}
};
