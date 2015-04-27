require(["application/bootstrapmap",
        "esri/tasks/GeometryService",
        "esri/toolbars/edit",

        "esri/layers/ArcGISTiledMapServiceLayer",
        "esri/layers/FeatureLayer",

        "esri/Color",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",

        "esri/dijit/editing/Editor",
        "esri/dijit/editing/TemplatePicker",

        "esri/config",
        "dojo/i18n!esri/nls/jsapi",

        "dojo/_base/array", "dojo/parser", "dojo/keys",

        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", 
        "dojo/domReady!"], 
        function(BootstrapMap, GeometryService, Edit, 
        ArcGISTiledMapServiceLayer, FeatureLayer,
        Color, SimpleMarkerSymbol, SimpleLineSymbol, 
        Editor, TemplatePicker,
        esriConfig, jsapiBundle,
        arrayUtils, parser, keys) {
          // Get a reference to the ArcGIS Map class
          var map = BootstrapMap.create("mapDiv",{
            basemap:"national-geographic",
            center:[-122.45,37.77],
            zoom:12,
            scrollWheelZoom: false
          });
      });