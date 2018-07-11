/**
 * Created by ss on 2018/1/7.
 */

export default [

    {

        input: 'src/Gio.js',
        output: [

            {

                format: 'umd',
                file: 'build/gio.wx.js',
                name: "GIO"

            }

        ],
        intro: 'GameGlobal.THREE = require("three.wx");'
        
    }, {

		input: 'src/Gio.js',
		output: [

			{

				format: 'umd',
				file: 'build/gio.wx.prod.js',
				name: "GIO"

			}

		],
		intro: 'GameGlobal.THREE = require("three.wx.min");'

	}

];