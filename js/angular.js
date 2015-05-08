var app = angular.module("app", []);

app.controller("AppCtrl", function($scope, $rootScope, $http) {
  $rootScope.loading = false;
  // this.things = ["Title",
  // 				 "BRA Project Type",
  // 				 "BRA Article80 Type",
  // 				 "BRA Project Neighborhood",
  // 				 "BRA Project Status",
  // 				 "BRA Project Status Css Class",
  // 				 "BRA Project Status Number",
  // 				 "BRA Project Description",
  // 				 "BRA Project Street Num",
  // 				 "BRA Project Street Name",
  // 				 "BRA Project Zip Code",
  // 				 "BRA Land Sq Ft",
  // 				 "BRA Bldg Sq Ft",
  // 				 "BRA Res Units",
  // 				 "BRA Parcel ID",
  // 				 "BRA Is Publish",
  // 				 "BRA Last Updated Date",
  // 				 "BRA Board Approval Date",
  // 				 "BRA Contact Name",
  // 				 "BRA Contact Email",
  // 				 "BRA Contact Phone",
  // 				 "BRA Neighborhood ID",
  // 				 "BRA Latitude",
  // 				 "BRA Longitude"];

  	$scope.projects = 
  			{attribute: [
              'BRA PI ID',
              'Document name',
              'Title',
              'BRA Description',
        			'BRA Neighborhood ID',
        			'BRA Neighborhood Name',
        			'BRA Status ID',
        			'BRA Status Name',
        			'BRA Status Css Class',
        			'BRA Planning Type ID',
              'BRA Planning Type Name',
           		'BRA Last Updated Date',
        			'BRA Contact Name',
        			'BRA Contact Email',
        			'BRA Contact Phone'],
        	value: [
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '']
        	};
  	

  	$rootScope.clickSumbit = function(){
  		console.log($scope.projects.value);
      $rootScope.loading = true;


      // var URL = "http://staging.bostonredevelopmentauthority.org/rest/content/currentsite/en-us/document/projects/Development-Projects/10-St-James-Avenue?format=json";

      // // $http.defaults.headers.common.Authorization = 'Basic Basic UmVzdEFQSTpCUkFCb3N0b242MTchIQ==';
      // $http.get(URL,{"DocumentContent":"123"},{
      //   headers: {'Authorization': 'Basic UmVzdEFQSTpCUkFCb3N0b242MTchIQ=='}
      // }).
      //     success(function(data, status, headers, config) {
      //       // this callback will be called asynchronously
      //       console.log(data);
      //       // when the response is available
      //     }).
      //     error(function(data, status, headers, config) {
      //       // called asynchronously if an error occurs
      //       // or server returns response with an error status.
      //     });


  
      var URL = "http://staging.bostonredevelopmentauthority.org/rest/content/currentsite/en-us/document/Planning/Planning-Initiatives/123TEST?format=json";

      var res = {
        url: URL,
        method: "PUT",
        headers: {
          'Authorization': 'Basic amlhbi5mYW46eHVubHUxMTIxMTA=',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
        }, 
        data: {
                // "BRALandSqFt" : "1234"
                "DocumentName" : $scope.projects.value[1]
              }
      
      };

      // $http.defaults.headers.common.Authorization = 'Basic Basic UmVzdEFQSTpCUkFCb3N0b242MTchIQ==';
      $http(res).
          success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            console.log(status);
            // when the response is available
            $rootScope.loading = false;
          }).
          error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            $rootScope.loading = false;

            console.log(status)
            // or server returns response with an error status.
          });
  	};

});


app.controller("MapCtrl", function($scope, $rootScope, $http) {
  require(["application/bootstrapmap",
        "esri/tasks/GeometryService",
        "esri/toolbars/edit",

        "esri/tasks/IdentifyTask",
        "esri/tasks/IdentifyParameters",

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
        IdentifyTask, IdentifyParameters,
        ArcGISTiledMapServiceLayer, FeatureLayer,
        Color, SimpleMarkerSymbol, SimpleLineSymbol, 
        Editor, TemplatePicker,
        esriConfig, jsapiBundle,
        arrayUtils, parser, keys) {
          // Get a reference to the ArcGIS Map class

          $scope.map = BootstrapMap.create("mapDiv",{
            basemap:"gray",
            center:[-71.059, 42.36],
            zoom:11,
            scrollWheelZoom: false
          });

          $scope.map.on("layers-add-result", initEditor);

          esriConfig.defaults.geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

            var parcel = new FeatureLayer("http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Test/Bos_Planning_Initiatives_Test/FeatureServer/0",{
              mode: FeatureLayer.MODE_ONDEMAND, 
              outFields: ['*'],
              opacity: 0.8
            });

            $scope.map.addLayers([parcel]);

            function initEditor(evt) {
          var templateLayers = arrayUtils.map(evt.layers, function(result){
            return result.layer;
          });
          var templatePicker = new TemplatePicker({
            featureLayers: templateLayers,
            grouping: true,
            rows: "auto",
            columns: 3
          }, "templateDiv");
          templatePicker.startup();

          var layers = arrayUtils.map(evt.layers, function(result) {
            return { featureLayer: result.layer };
          });
          var settings = {
            map: $scope.map,
            templatePicker: templatePicker,
            layerInfos: layers,
            toolbarVisible: true,
            createOptions: {
              polylineDrawTools:[ Editor.CREATE_TOOL_FREEHAND_POLYLINE ],
              polygonDrawTools: [ Editor.CREATE_TOOL_FREEHAND_POLYGON,
                Editor.CREATE_TOOL_CIRCLE,
                Editor.CREATE_TOOL_TRIANGLE,
                Editor.CREATE_TOOL_RECTANGLE
              ]
            },
            toolbarOptions: {
              reshapeVisible: true,
              mergeVisible: true,
              cutVisible: true
            }
          };

          var params = {settings: settings};    
          var myEditor = new Editor(params,'editorDiv');
          //define snapping options
          var symbol = new SimpleMarkerSymbol(
            SimpleMarkerSymbol.STYLE_CROSS, 
            15, 
            new SimpleLineSymbol(
              SimpleLineSymbol.STYLE_SOLID, 
              new Color([255, 0, 0, 0.5]), 
              5
            ), 
            null
          );
          $scope.map.enableSnapping({
            snapPointSymbol: symbol,
            tolerance: 20,
            snapKey: keys.ALT
          });
    
          myEditor.startup();

          $scope.map.on("click",function(e){
            // console.log(e);
            // $rootScope.loading = true;
            // console.log($rootScope.loading);
            // $scope.$apply();



            var identifyTask = new IdentifyTask("http://mapservices.bostonredevelopmentauthority.org/arcgis/rest/services/Test/Bos_Planning_Initiatives_Test/MapServer");
            identifyParams = new IdentifyParameters();
            identifyParams.tolerance = 6;
            identifyParams.returnGeometry = true;
            identifyParams.layerIds = [0];
            identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
            identifyParams.width = $scope.map.width;
            identifyParams.height = $scope.map.height;
            identifyParams.geometry = e.mapPoint;
            identifyParams.mapExtent = $scope.map.extent;
            identifyTask.execute(identifyParams, function (idResults) {
                // handleIdResultAddress(idResults, e);
                console.log(idResults);
                // $scope.projects.value[3] = idResults[0].feature.attributes.X;
                // $scope.projects.value[4] = idResults[0].feature.attributes.Y;

                
                var URL = "http://staging.bostonredevelopmentauthority.org/rest/content/currentsite/en-us/document/Planning/Planning-Initiatives/"+ idResults[0].feature.attributes.Name.split(' ').join('-') +"?format=json";

                var res = {
                  url: URL,
                  method: "GET",
                  headers: {
                    'Authorization': 'Basic amlhbi5mYW46eHVubHUxMTIxMTA=',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' 
                  }
                };

                // $http.defaults.headers.common.Authorization = 'Basic Basic UmVzdEFQSTpCUkFCb3N0b242MTchIQ==';
                $http(res).
                    success(function(data, status, headers, config) {
                      // this callback will be called asynchronously
                      // $rootScope.loading = false;
                      // console.log($rootScope.loading);
                      console.log(data);

                      $scope.projects.value[0] = data.cms_documents[0].BRA_PlanningInit[0].BRAPlanningInitID;
                      $scope.projects.value[1] = data.cms_documents[0].BRA_PlanningInit[0].DocumentName;
                      $scope.projects.value[2] = data.cms_documents[0].BRA_PlanningInit[0].Title;
                      $scope.projects.value[3] = data.cms_documents[0].BRA_PlanningInit[0].BRADescription;
                      $scope.projects.value[4] = data.cms_documents[0].BRA_PlanningInit[0].BRANeighborhoodID;
                      $scope.projects.value[5] = data.cms_documents[0].BRA_PlanningInit[0].BRANeighborhoodName;
                      $scope.projects.value[6] = data.cms_documents[0].BRA_PlanningInit[0].BRAStatusID;
                      $scope.projects.value[7] = data.cms_documents[0].BRA_PlanningInit[0].BRAStatusName;
                      $scope.projects.value[8] = data.cms_documents[0].BRA_PlanningInit[0].BRAStatusCssClass;
                      $scope.projects.value[9] = data.cms_documents[0].BRA_PlanningInit[0].BRAPlanningTypeID;
                      $scope.projects.value[10] = data.cms_documents[0].BRA_PlanningInit[0].BRAPlanningTypeName;
                      $scope.projects.value[11] = data.cms_documents[0].BRA_PlanningInit[0].LastUpdateDate;
                      $scope.projects.value[12] = data.cms_documents[0].BRA_PlanningInit[0].BRAContactName;
                      $scope.projects.value[13] = data.cms_documents[0].BRA_PlanningInit[0].BRAContactEmail;
                      $scope.projects.value[14] = data.cms_documents[0].BRA_PlanningInit[0].BRAContactPhone;










                      // $scope.projects.value[4] = ;
                      // when the response is available
                    }).
                    error(function(data, status, headers, config) {
                      // called asynchronously if an error occurs
                      // or server returns response with an error status.
                    });



                $scope.$apply();
            });



            

            // console.log($scope.projects);
          });
        }

      });

});