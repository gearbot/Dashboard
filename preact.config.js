const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const commit = new GitRevisionPlugin({commithashCommand: "rev-parse --short HEAD"}).commithash();

export default function (config, env, helpers) {
	config.plugins.push(new Dotenv({
		systemvars: true
	}));
	config.plugins.push(new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				VERSION: JSON.stringify(commit),
				PRERENDER: env.ssr
			}
		})
	);
}