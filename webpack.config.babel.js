import path from 'path';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest'
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

const config = {
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
			filename: 'assets/app-[hash].css'
		}),
		new CopyWebpackPlugin([
			{
				from: 'src/.htaccess.example',
				to: './.htaccess',
				toType: 'file'
			}, {
				from: 'src/img/*',
				to: './assets/img/',
				flatten: true
			}, {
				from: 'src/fonts/*',
				to: './assets/fonts/',
				flatten: true
			}
		]),
		new LiveReloadPlugin(),
		new HtmlWebpackPlugin({
			//hash: true,
			title: 'Skatepark.guide',
			template: 'src/index.php',
			filename: './index.php'
		}),
		new FaviconsWebpackPlugin({
			logo: './src/icons/favicon.png',
			prefix: 'assets/icon/[hash]/',
			emitStats: true,
			statsFilename: 'assets/icon/iconstats-[hash].json',
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
		new WebpackPwaManifest({
			name: 'Skatepark.guide',
			short_name: 'Skatepark.guide',
			description: 'A Progressive Web App for skateparks around the world!',
			theme_color: '#00796B',
			background_color: '#ffffff',
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
			include: [/\.html$/, /\.js$/, /\.css$/],
			runtimeCaching: [
				{
					urlPattern: new RegExp('https://skateparkguide.ch.*\.(jpg|jpeg|png|gif|svg)'),
					handler: 'cacheFirst',
					options: {
						cacheName: 'spg-image-cache',
					}
				},
				{
					urlPattern: new RegExp(/\.(?:png|gif|jpg|svg)$/),
					handler: 'cacheFirst',
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