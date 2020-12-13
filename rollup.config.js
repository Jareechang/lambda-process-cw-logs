import { getBaseRollupPlugins } from '@common-web/rollup';

const plugins = getBaseRollupPlugins({
    eslint: { disabled: true },
    typescript: {
        tsconfig: 'tsconfig.build.json'
    }
}).concat([
    // Include your own plugins to support other features 
]);

export default {
    input: 'src/index.ts',
    external: ['zlib'],
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs'
        }
    ],
    plugins
};
