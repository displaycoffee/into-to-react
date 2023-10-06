const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Path config
const themePath = './assets/';
const webpPathConfig = {
	path: path.resolve(__dirname),
	src: {
		js: themePath + 'src/bundle.js',
		css: themePath + 'src/entry/index/styles/index.scss',
	},
	dist: {
		js: themePath + 'dist/js/bundle.js',
		css: themePath + 'dist/css/styles.css',
	},
};

// Common config
const webpCommonConfig = {
	entry: [webpPathConfig.src.js, webpPathConfig.src.css],
	output: {
		filename: webpPathConfig.dist.js,
		path: webpPathConfig.path,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: webpPathConfig.dist.css,
		}),
	],
	optimization: {
		minimizer: ['...', new CssMinimizerPlugin()],
		minimize: true,
	},
	module: {
		rules: [
			{
				test: /\.txt$/,
				use: 'raw-loader',
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(scss|css)$/,
				exclude: /(node_modules)/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};

module.exports = webpCommonConfig;
