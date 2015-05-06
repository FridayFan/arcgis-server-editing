// require(["application/bootstrapmap",
//         "esri/tasks/GeometryService",
//         "esri/toolbars/edit",

//         "esri/layers/ArcGISTiledMapServiceLayer",
//         "esri/layers/FeatureLayer",

//         "esri/Color",
//         "esri/symbols/SimpleMarkerSymbol",
//         "esri/symbols/SimpleLineSymbol",

//         "esri/dijit/editing/Editor",
//         "esri/dijit/editing/TemplatePicker",

//         "esri/config",
//         "dojo/i18n!esri/nls/jsapi",

//         "dojo/_base/array", "dojo/parser", "dojo/keys",

//         "dijit/layout/BorderContainer", "dijit/layout/ContentPane", 
//         "dojo/domReady!"], 
//         function(BootstrapMap, GeometryService, Edit, 
//         ArcGISTiledMapServiceLayer, FeatureLayer,
//         Color, SimpleMarkerSymbol, SimpleLineSymbol, 
//         Editor, TemplatePicker,
//         esriConfig, jsapiBundle,
//         arrayUtils, parser, keys) {
//           // Get a reference to the ArcGIS Map class
//           var map = BootstrapMap.create("mapDiv",{
//             basemap:"gray",
//             center:[-71.059, 42.36],
//             zoom:14,
//             scrollWheelZoom: false
//           });

//           map.on("layers-add-result", initEditor);

//           esriConfig.defaults.geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

//             var parcel = new FeatureLayer("http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Test/Article80_test/FeatureServer/0",{
//               mode: FeatureLayer.MODE_ONDEMAND, 
//               outFields: ['*'],
//               opacity: 0.8
//             });

//             map.addLayers([parcel]);

//             function initEditor(evt) {
//           var templateLayers = arrayUtils.map(evt.layers, function(result){
//             return result.layer;
//           });
//           var templatePicker = new TemplatePicker({
//             featureLayers: templateLayers,
//             grouping: true,
//             rows: "auto",
//             columns: 3
//           }, "templateDiv");
//           templatePicker.startup();

//           var layers = arrayUtils.map(evt.layers, function(result) {
//             return { featureLayer: result.layer };
//           });
//           var settings = {
//             map: map,
//             templatePicker: templatePicker,
//             layerInfos: layers,
//             toolbarVisible: true,
//             createOptions: {
//               polylineDrawTools:[ Editor.CREATE_TOOL_FREEHAND_POLYLINE ],
//               polygonDrawTools: [ Editor.CREATE_TOOL_FREEHAND_POLYGON,
//                 Editor.CREATE_TOOL_CIRCLE,
//                 Editor.CREATE_TOOL_TRIANGLE,
//                 Editor.CREATE_TOOL_RECTANGLE
//               ]
//             },
//             toolbarOptions: {
//               reshapeVisible: true,
//               mergeVisible: true,
//               cutVisible: true
//             }
//           };

//           var params = {settings: settings};    
//           var myEditor = new Editor(params,'editorDiv');
//           //define snapping options
//           var symbol = new SimpleMarkerSymbol(
//             SimpleMarkerSymbol.STYLE_CROSS, 
//             15, 
//             new SimpleLineSymbol(
//               SimpleLineSymbol.STYLE_SOLID, 
//               new Color([255, 0, 0, 0.5]), 
//               5
//             ), 
//             null
//           );
//           map.enableSnapping({
//             snapPointSymbol: symbol,
//             tolerance: 20,
//             snapKey: keys.ALT
//           });
    
//           myEditor.startup();

//           map.on("click",function(e){
//             console.log(e);
//           });
//         }

//       });