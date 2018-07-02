import path from 'path';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, ".build");

const config = {
	entry: [
		`${SRC_DIR}/styles/app.scss`,
		`${SRC_DIR}/app/app.js`
	],
	output: {
		path: `${DIST_DIR}`,
		filename: "app.js",
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					// vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			},
			{
				test: /\.(s*)css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								url: false
							}
						},
						'sass-loader',
						{
							loader: "@epegzz/sass-vars-loader",
							options: {
								syntax: 'scss',
								files: [
									`${SRC_DIR}/settings.json`
								]
							}
						}
					]
				})
			},

		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	devtool: '#eval-source-map',
	plugins: [
		new ExtractTextPlugin({
			filename: 'app.css'
		}),
		new LiveReloadPlugin()
	]
};

module.exports = config;