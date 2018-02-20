/**
 * Created by ss on 2018/1/7.
 */

export default [

    {

        input: 'src/Gio.js',
        output: [

            {

                format: 'iife',
                file: 'build/gio.js',
                name: "GIO"

            }

        ]

    }, {

        input: 'src/Gio.js',
        output: [

            {

                format: 'umd',
                file: 'build/gio.module.js',
                name: "GIO"

            }

        ],
        intro: 'global.THREE = require("three");'
        
    }, {
        
        input: 'src/Gio.js',
        output: [
            
            {
                file: 'build/gio.react.js',
                name: "GIO",
                format: 'es'
            }
        
        ],
        intro: 'import * as THREE from "three";\n import Stats from "stats.js";\n window.THREE = THREE;'
        
    }

];