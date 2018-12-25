import path from 'path';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, ".build");

const config = {
	entry: [
		`${SRC_DIR}/styles/app.scss`,
		`${SRC_DIR}/app/app.js`
	],
	output: {
		path: `${DIST_DIR}`,
		filename: "app-[hash].js",
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: 'raw-loader'
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif)$/,
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
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [require('autoprefixer')]
							}
						},
						{
							loader: 'sass-loader'
						},
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
		new CleanWebpackPlugin(['dist']),
		new ExtractTextPlugin({
			filename: 'app-[hash].css'
		}),
		new CopyWebpackPlugin([
			{
				from: '.build/.htaccess.example',
				to: './.htaccess',
				toType: 'file'
			}
		]),
		new LiveReloadPlugin(),
		new HtmlWebpackPlugin({
			//hash: true,
			title: 'Skatepark.guide',
			template: '.build/index.html',
			filename: './index.html'
		}),
		new FaviconsWebpackPlugin({
			logo: './.build/icons/favicon.png',
			prefix: 'favicon/[hash]/',
			emitStats: true,
			statsFilename: 'favicon/iconstats-[hash].json',
			persistentCache: true,
			inject: true,
			background: '#fff',
			title: 'Skatepark.guide',
			icons: {
				android: true,
				appleIcon: true,
				appleStartup: true,
				coast: false,
				favicons: true,
				firefox: true,
				opengraph: false,
				twitter: true,
				yandex: false,
				windows: false
			}
		}),
		new GenerateSW({
			importWorkboxFrom: 'local',
			runtimeCaching: [
				{
					urlPattern: new RegExp('https://skateparkguide.ch.*\.(jpg|jpeg|png|gif)'),
					handler: 'networkFirst',
					options: {
						cacheName: 'image-cache',
					}
				}
			],
			navigateFallback: 'index.html',
			skipWaiting: true,
		})
	]
};

module.exports = config;