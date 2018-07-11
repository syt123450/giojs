/**
 * Created by ss on 2018/1/7.
 */

export default [

    {

        input: 'src/Gio.js',
        output: [

            {

                format: 'umd',
                file: 'build/gioWX.js',
                name: "GIO"

            }

        ],
        intro: 'GameGlobal.THREE = require("three");'
        
    }, {

		input: 'src/Gio.js',
		output: [

			{

				format: 'umd',
				file: 'build/gioWX.prod.js',
				name: "GIO"

			}

		],
		intro: 'GameGlobal.THREE = require("three.min");'

	}

];