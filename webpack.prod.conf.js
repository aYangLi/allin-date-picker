var path = require('path');
var webpack = require('webpack');
var version = require('./package.json').version;

module.exports = {
	entry: {
		picker: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		library: 'PickerDate',
		libraryTarget: 'umd',
		filename: '[name]Date.min.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint',
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['', '.js'],
		fallback: [path.join(__dirname, '../node_modules')]
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(version)
		})
	]
};
