const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = config => {
	config.plugins.push(new Dotenv());
	config.plugins.push(new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			}
		})
	);
};