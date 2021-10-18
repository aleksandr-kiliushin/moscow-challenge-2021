const path = require('path')
const dotenv = require('dotenv')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { SourceMapDevToolPlugin, EnvironmentPlugin } = require('webpack')

dotenv.config({ path: path.join(__dirname, '.env') })

module.exports = {
	devServer: {
		historyApiFallback: true,
		port: 3000,
		proxy: {
			'/api': 'http://localhost:3080',
		},
	},
	devtool: 'source-map',
	entry: './src/index.tsx',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		sourceMapFilename: '[name].js.map',
	},
	resolve: {
		extensions: ['.css', '.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'#components': path.resolve(process.cwd(), 'src/components'),
			'#interfaces/*': path.resolve(process.cwd(), '../server/src/interfaces/'),
			'#models': path.resolve(process.cwd(), 'src/models'),
			'#views': path.resolve(process.cwd(), 'src/views'),
			'#utils': path.resolve(process.cwd(), 'src/utils'),
		},
	},
	plugins: [
		new EnvironmentPlugin({
			MAP_BOX_ACCESS_TOKEN: process.env.MAP_BOX_ACCESS_TOKEN,
		}),
		new HTMLWebpackPlugin({
			template: 'public/index.html',
		}),
		new SourceMapDevToolPlugin({
			filename: '[file].map[query]',
		}),
	],
}
