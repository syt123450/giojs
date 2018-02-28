import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import uglify from 'rollup-plugin-uglify'

var inputPath = process.argv[4];
if (inputPath === undefined) {
    // Set the font color to Magenta for the error message
    console.error('\x1b[35mBuild Example Failed. Missing input file.\x1b[0m\nExample:');
    console.error('npm run build-example examples/00_helloworld/helloworld.js\n');
    process.exit(-1);
}

var outputPath = function( inputPath ) {

    var array = inputPath.split( "/" );
    var lastElement = array[ array.length - 1 ];
    var parameters = lastElement.split( "." );
    
    var output = "";
    for ( var i = 0; i < array.length - 1; i++ ) {

        output += (array[i] + "/");

    }
    
    output += ( "build" + "/" );
    
    for ( var i = 0; i < parameters.length - 1; i++ ) {

        output += ( parameters[i] + "." );

    }
    
    output += "min.js";
    
    return output;

};

// export default {
//
//     input: inputPath,
//     output: {
//         file: outputPath(inputPath),
//         format: 'cjs'
//     },
//     plugins: [
//         postcss({
//             extensions: ['.css'],
//         }),
//         babel({
//             babelrc: false,
//             exclude: 'node_modules/**',
//             presets: [
//                 [
//                     'es2015',
//                     {modules: false}
//                 ],
//                 'react'
//             ],
//             plugins: [
//                 'external-helpers',
//             ]
//         }),
//         cjs({
//             exclude: 'node_modules/process-es6/**',
//             include: [
//                 'node_modules/create-react-class/**',
//                 'node_modules/fbjs/**',
//                 'node_modules/object-assign/**',
//                 'node_modules/react/**',
//                 'node_modules/react-dom/**',
//                 'node_modules/prop-types/**',
//                 'node_modules/stats.js/**',
//                 'node_modules/axios/**',
//                 'node_modules/is-buffer/**',
//                 'node_modules/follow-redirects/**',
//                 'node_modules/ms/**',
//                 // 'node_modules/react-giojs/src/**'
//                 // 'node_nodules/react-giojs/src/**'
//             ],
//             namedExports: {
//                 'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
//                 'node_modules/react-dom/index.js': ['render'],
//                 'node_modules/axios/dist/axios.js': ['axios'],
//                 'node_modules/stats.js/src/stats.min.js': ['default'],
//                 'node_modules/is-buffer/index.js': ['default'],
//                 'node_modules/follow-redirects/index.js': ['default'],
//                 'node_modules/ms/index.js': ['default'],
//                 'src/build/Gio.min.js': ['default']
//             },
//         }),
//         json(),
//         builtins(),
//         globals(),
//         replace({'process.env.NODE_ENV': JSON.stringify('production')}),
//         resolve({
//             browser: true,
//             main: true,
//             // customResolveOptions: {
//             //     moduleDirectory: 'src/build'
//             // }
//         }),
//         uglify()
//     ],
//     external: [
//         'three',
//         'react',
//         'react-dom',
//         // 'react-giojs/src/build/Gio'
//     ],
//     globals: {
//         'react': 'React',
//         'react-dom': 'ReactDOM',
//         // 'react-giojs/src/build/Gio.min': 'Gio',
//     },
//     sourcemap: true
//
// }


export default {

    input: inputPath,
    output: {
        file: outputPath(inputPath),
        format: 'iife'
    },
    plugins: [
        postcss({
            extensions: ['.css'],
        }),
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: [
                [
                    'es2015',
                    {modules: false}
                ],
                'react'
            ],
            plugins: [
                'external-helpers',
            ]
        }),
        cjs({
            exclude: 'node_modules/process-es6/**',
            include: [
                'node_modules/create-react-class/**',
                'node_modules/fbjs/**',
                'node_modules/object-assign/**',
                'node_modules/react/**',
                'node_modules/react-dom/**',
                'node_modules/prop-types/**',
                'node_modules/stats.js/**',
                'node_modules/axios/**',
                'node_modules/is-buffer/**',
                'node_modules/follow-redirects/**',
                'node_modules/ms/**',
                'node_modules/react-giojs/**'
                // 'node_nodules/react-giojs/src/**'
            ],
            namedExports: {
                'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
                'node_modules/react-dom/index.js': ['render'],
                'node_modules/axios/dist/axios.js': ['axios'],
                'node_modules/stats.js/src/stats.min.js': ['default'],
                'node_modules/is-buffer/index.js': ['default'],
                'node_modules/follow-redirects/index.js': ['default'],
                'node_modules/ms/index.js': ['default'],
                'src/build/Gio.min.js': ['default']
            },
        }),
        json(),
        builtins(),
        globals(),
        replace({'process.env.NODE_ENV': JSON.stringify('production')}),
        resolve({
            browser: true,
            main: true,
        }),
        uglify()
    ],
    external: [
        'react',
        'react-dom',
    ],
    globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    sourcemap: true

}
