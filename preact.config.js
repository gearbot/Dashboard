const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const commit = new GitRevisionPlugin({commithashCommand: "rev-parse --short HEAD"}).commithash();

module.exports = config => {
	config.plugins.push(new Dotenv());
	config.plugins.push(new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				VERSION: JSON.stringify(commit)
			}
		})
	);
};