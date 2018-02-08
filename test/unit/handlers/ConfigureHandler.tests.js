/**
 * @author syt123450 / https://github.com/syt123450
 */

// import { ConfigureHandler } from '../../../src/handlers/ConfigureHandler.js';
// import chai from "chai"

// describe( 'Test configureJSON', function () {
//
//     var configureParameter = {
//
//         control: {
//
//             stats: true
//
//         }
//
//     };
//
//     var controller = {
//
//         configure: {
//
//             control: {
//
//                 stats: false,
//                 disableUnmentioned: false,
//                 lightenMentioned: false,
//                 inOnly: false,
//                 outOnly: false,
//                 initCountry: "CN",
//                 halo: true
//
//             },
//
//             color: {
//
//                 surface: 0xffffff,
//                 selected: null,
//                 in: 0x154492,
//                 out: 0xdd380c,
//                 halo: 0xffffff,
//                 background: null
//
//             },
//
//             brightness: {
//
//                 ocean: 0.5,
//                 mentioned: 0.5,
//                 related: 0.5
//
//             },
//
//             resource: {
//
//                 loading: null
//
//             }
//
//         }
//
//     };
//
//     var expectConfigure = {
//
//         control: {
//
//             stats: true,
//             disableUnmentioned: false,
//             lightenMentioned: false,
//             inOnly: false,
//             outOnly: false,
//             initCountry: "CN",
//             halo: true
//
//         },
//
//         color: {
//
//             surface: 0xffffff,
//             selected: null,
//             in: 0x154492,
//             out: 0xdd380c,
//             halo: 0xffffff,
//             background: null
//
//         },
//
//         brightness: {
//
//             ocean: 0.5,
//             mentioned: 0.5,
//             related: 0.5
//
//         },
//
//         resource: {
//
//             loading: null
//
//         }
//
//     };
//
//     var configureHandler = new ConfigureHandler( controller );
//     configureHandler.configureJSON( configureParameter );
//
//     it( 'should configure json into controller', function () {
//
//         chai.expect( controller.configure ).to.deep.equal( expectConfigure );
//
//     } );
//
// });
