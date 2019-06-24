const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');

module.exports = config => {
	config.plugins.push(new Dotenv());
	config.plugins.push(new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		})
	);
};