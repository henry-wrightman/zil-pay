import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import { sass } from 'svelte-preprocess-sass';
import copy from 'rollup-plugin-copy';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

const popup = {
	input: 'popup/main.ts',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'popup',
		file: 'dist/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
				style: sass()
			}),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
const background = {
	input: 'core/background/index.ts',
	output: {
		sourcemap: !production,
		format: 'umd',
		name: 'background',
		file: 'dist/background.js'
	},
	plugins: [
		commonjs(),
		resolve({
			jsnext: true,   
			main: true,
			brower: true,
			preferBuiltins: false
		}),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
		copy({
			targets: [
				{
					src: 'public/icons',
					dest: 'dist/'
				},
				{
					src: 'public/phishing.html',
					dest: 'dist/'
				},
				{
					src: 'public/popup.html',
					dest: 'dist/'
				},
				{
					src: 'public/schema.json',
					dest: 'dist/'
				},
				{
					src: 'public/manifest.json',
					dest: 'dist/',
					transform: (contents) => {
						const jsonContent = JSON.parse(contents)

						jsonContent.version = pkg.version;
						jsonContent.short_name = pkg.shortName;
						jsonContent.description = pkg.description;
						jsonContent.author = pkg.homepage;

						return JSON.stringify(jsonContent, null, 2);
					}
				}
			]
		}),
		production && terser()
	]
};
const content = {
	input: 'core/content/index.ts',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'content',
		file: 'dist/content.js'
	},
	plugins: [
		commonjs(),
		resolve({
			jsnext: true,   
			main: true,
			brower: true,
			preferBuiltins: false
		}),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
		production && terser()
	]
};
const inpage = {
	input: 'core/inpage/index.ts',
	output: {
		sourcemap: !production,
		format: 'iife',
		name: 'inpage',
		file: 'dist/inpage.js'
	},
	plugins: [
		commonjs(),
		resolve({
			jsnext: true,   
			main: true,
			brower: true,
			preferBuiltins: false
		}),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
		production && terser()
	]
};

export default [
	popup,
	background,
	content,
	inpage
];
