/**
 * Created by ss on 2018/1/7.
 */
export default {

    input: 'src/Gio.js',
    output: [

        {

            format: 'iife',
            file: 'build/Gio.js',
            name: "GIO"

        }, {

            format: 'umd',
            name: 'AddNpm',
            file: 'build/Gio.module.js'

        }

    ]

};