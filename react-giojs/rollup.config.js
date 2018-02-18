import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

var inputPath = process.argv[4];
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

export default {

    input: inputPath,
    output: {
        file: outputPath(inputPath),
        format: 'iife'
    },
    plugins: [
        babel({
            babelrc: false,
            exclude: 'node_modules/**',
            presets: [
                [
                    'es2015',
                    { modules: false }
                ],
                'react'
            ],
            plugins: [ 'external-helpers' ]
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
                'node_modules/stats.js/**'
            ],
            namedExports: {
                'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
                'node_modules/react-dom/index.js': ['render'],
                'node_modules/stats.js/src/stats.min.js': ['default']
            }
        }),
        globals(),
        replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        resolve({
            browser: true,
            main: true
        })
    ],
    sourcemap: true

}
