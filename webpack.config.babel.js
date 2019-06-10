import path from 'path';
import app from './app.json';

import LiveReloadPlugin from 'webpack-livereload-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import {GenerateSW} from 'workbox-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest'
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

module.exports = {
	entry: [
		`${SRC_DIR}/styles/app.scss`,
		`${SRC_DIR}/app/app.js`
	],
	output: {
		path: `${DIST_DIR}`,
		filename: "assets/app-[hash].js",
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
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							//publicPath: '../',
							hmr: process.env.NODE_ENV === 'development',
						},
					},
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
		new CleanWebpackPlugin({
			cleanStaleWebpackAssets: false
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/app-[hash].css',
			chunkFilename: 'assets/app-[id]-[hash].css'
		}),
		new CopyWebpackPlugin([
			{
				from: 'src/.htaccess.example',
				to: './.htaccess',
				toType: 'file'
			}, {
				from: 'src/img/**/*',
				to: './assets/img/',
				transformPath(targetPath, absolutePath) {
					return targetPath.replace('src/img/', '');
				},
			}, {
				from: 'src/fonts/*',
				to: './assets/fonts/',
				flatten: true
			}, {
				from: 'src/version.json',
				to: './version.json',
				toType: 'file'
			}
		]),
		new LiveReloadPlugin(),
		new HtmlWebpackPlugin({
			//hash: true,
			title: app.title,
			description: app.description,
			filename: './index.php',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
			}
		}),
		new FaviconsWebpackPlugin({
			logo: './src/icons/favicon.png',
			prefix: 'assets/icon/[hash]/',
			emitStats: true,
			statsFilename: 'assets/icon/iconstats-[hash].json',
			persistentCache: true,
			inject: true,
			background: app.colorbkg,
			title: app.title,
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
		new WebpackPwaManifest({
			name: app.title,
			short_name: app.title.replace(' ', ''),
			description: app.description,
			theme_color: app.color,
			background_color: app.colorbkg,
			crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
			fingerprints: false,
			icons: [
				{
					src: path.resolve('src/icons/favicon.png'),
					sizes: [96, 128, 192, 256, 384, 512],
					destination: path.join('assets', 'icon'),
					ios: true
				}
			]
		}),
		new GenerateSW({
			importWorkboxFrom: 'local',
			include: [/\.php$/, /\.js$/, /\.css$/],
			importsDirectory: 'wb-assets',
			runtimeCaching: [
				{
					urlPattern: new RegExp('^https://skateparkguide\.ch/wp-content/uploads/'),
					handler: 'staleWhileRevalidate',
					options: {
						cacheName: 'spg-image-cache'
					}
				}, {
					urlPattern: new RegExp(/\.(?:png|gif|jpg|svg|ico)$/),
					handler: 'cacheFirst',
					options: {
						cacheName: 'image-cache'
					}
				}
			],
			navigateFallback: 'index.php',
			skipWaiting: true,
		})
	]
};