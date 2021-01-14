import { uglify } from 'rollup-plugin-uglify';
import * as devconfig from './rollup.config.dev';

// start with the dev config, then modify it for prod/dist
const config = devconfig.default;

config.output.sourcemap = false;

config.plugins.push(
    //  See https://www.npmjs.com/package/rollup-plugin-uglify for config options
    uglify({
        mangle: false
    })
);

export default config;
