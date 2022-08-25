const fs = require( 'fs' );
const toml = require( 'toml' );
const { merge } = require( 'webpack-merge' );
const CommonConfig = require( './webpack.common.js' );
const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = merge( CommonConfig, {
	mode: 'development',
	entry: {
		loader: './webpack/loader.js'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin( {
			CAMPAIGNS: JSON.stringify( toml.parse( fs.readFileSync( 'campaign_info.toml', 'utf8' ) ) )
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
				context: [ '/wikipedia.de', '/FundraisingBanners', '/img', '/js', '/style.css', '/suggest.js' ],
				pathRewrite: { '^/wikipedia.de': '' },
				target: 'https://wikipedia.de',
				changeOrigin: true
			},
			{
				context: [ '/wiki', '/w', '/static' ],
				target: 'https://de.wikipedia.org',
				changeOrigin: true
			}
		]
	}
} );
