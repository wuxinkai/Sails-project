define([
    'scripts/controllers/confirmwindowCtrl',
        'scripts/services/httpService',
        'scripts/services/configService',
        'scripts/requireHelper/requireKendo',
        'scripts/requireHelper/requireNotification',
        'scripts/requireHelper/requireUiBootstrap',
        'scripts/requireHelper/requireConfirm',
        'scripts/requireHelper/requireLeaflet',
        'angular-confirm',
        'bower_components/customUI/js/fixUI',
        'css!bower_components/leaflet-contextmenu/leaflet.contextmenu.css',
        'contextmenu', 'scripts/config',
        'scripts/services/httpService',
        'scripts/services/configService',
        'scripts/requireHelper/requireKendo',
        'scripts/requireHelper/requireNotification',
        'scripts/requireHelper/requireUiBootstrap',
        'scripts/requireHelper/requireConfirm',
        'bower_components/echarts/ng-echarts',
        'scripts/requireHelper/requireLeaflet',
        'scripts/dragdealer/DragAction',
        'bower_components/customUI/js/fixUI',
        'leaflet.semicircle',
        'leaflet.pie'],
    function (confirmwindowCtrl) {
        return ['$scope', 'leafletData', 'httpService', 'Notification', '$confirm', '$uibModal', 'configService',
            function ($scope, leafletData, httpService, Notification, $confirm, $uibModal, configService) {
                $scope.$on('$viewContentLoaded',
                    function () {
                        require([],
                            function () {
                                var sleftHeight = $('.searchLeftId').height();
                                var parentHeight = $('.pull-right').height();
                                var btnheight = $('.searchLeftId .search-right').height();
                                $('.searchLeftId .table-responsive').css('max-height', sleftHeight - parentHeight - 100 + "px");
                                $('.k-state-default input').attr("readonly", "readonly");  //设置日期控件只能选择，不能填写
                                window.onresize = function () {
                                    var sleftHeight = $('.searchLeftId').height();
                                    var parentHeight = $('.pull-right').height();
                                    var btnheight = $('.searchLeftId .search-right').height();
                                    $('.searchLeftId .table-responsive').css('max-height', sleftHeight - parentHeight -100 + "px");
                                }
                            });
                    });

                $scope.perItems = 15;    //页码显示的数量
                $scope.totalItems = 0;//总数据量
                $scope.currentPage = 1;//当前页面
                $scope.numPages = 0;//页码
                $scope.maxSize = 7;//页码最多显示个数
                $scope.ischeckall = false;
                $scope.editarea = "";
                $scope.canedit = true;
                $scope.areaSelect = 1;

                var drawRegionLayers = new Array();


                function showCoordinates(e) {
                    alert(e);
                }
                //切换按钮
                $scope.pcleftstatue = false;
                $scope.text = 9
                $scope.hidecallbackleft = function () {
                    $scope.pcleftstatue = true;
                    $scope.text = 12;
                    $scope.map._onResize();
                }
                $scope.showcallbackleft = function () {
                    $scope.pcleftstatue = false;
                    $scope.text = 9;
                    $scope.map._onResize();
                }


                //初始化颜色类型
                httpService.postRemote('Manage', 'DictsService', 'GetDictsByApp', { dicType: "ManageAreaType", appId: configService.appId }).then(function (data) {
                        $scope.manageAreaType = data;
                        $scope.areaSelect = data[0].Code;     //时间默认值
                        $scope.ListAreaCustomer();
                    },
                    function (errorMessage) {
                        Notification.error({ message: errorMessage, delay: 5000 });
                    });

                //区域类型发生改变
                $scope.areaChanges=function()
                {
                    $scope.ListAreaCustomer();
                }



                //获取自定义区域的方法
                $scope.ListAreaCustomer = function () {
                    leafletData.getLayers().then(function (baselayers) {
                        //清理掉地图上的数据
                        //drawnItems.clearLayers();
                    });
                    httpService.post("Position", "AreaCustomerService", "ListAreaCustomer", { page: $scope.currentPage, pagesize: $scope.perItems, areaType: $scope.areaSelect }).then(
                        function (data) {
                            $scope.datalist = data.Items;
                            $scope.totalItems = data.TotalCount;
                            drawRegionLayers = [];
                            //地图上有的不在添加
                            for (var i = 0 ; i < $scope.datalist.length; i++) {
                                var dataObj = eval("(" + $scope.datalist[i].Margin + ")");
                                //添加右键功能
                                //var demoPolygon = new L.polygon(dataObj, {
                                //    contextmenu: true,
                                //    contextmenuItems: [{
                                //        text: 'Marker item1',
                                //        callback: function () { showCoordinates("测试1")},
                                //        index: 0
                                //    }, {
                                //        text: 'Marker item2',
                                //        callback: function () { showCoordinates("测试2")},
                                //        index: 1
                                //    }, {
                                //        separator: true,
                                //        index: 2
                                //    }]
                                //});

                                var demoPolygon = new L.polygon(dataObj);
                                drawRegionLayers[$scope.datalist[i].Area_Id] = demoPolygon;

                            }

                            //统一添加到地图上
                            leafletData.getLayers().then(function (baselayers) {
                                var drawnItems = baselayers.overlays.draw;
                                //清理掉地图上的数据
                                drawnItems.clearLayers();
                                //重新绘制数据
                                for (var i in drawRegionLayers) {
                                    drawnItems.addLayer(drawRegionLayers[i]);
                                    drawRegionLayers[i].name = $scope.getArea_Name(i);
                                    var popup = L.popup();
                                    L.DomEvent.on(drawRegionLayers[i], 'mouseover', function (e) {
                                        $scope.popuptrain = popup.setLatLng([e.latlng.lat, e.latlng.lng]).setContent('<p>' + e.target.name + '</p>').openOn($scope.map);
                                        L.DomEvent.stop(e);
                                    });

                                    L.DomEvent.on(drawRegionLayers[i], 'mouseout', function (e) {
                                        if ($scope.popuptrain != null)
                                            $scope.popuptrain._close();
                                    });

                                    L.DomEvent.on(drawRegionLayers[i], 'mousedown', function (e) {
                                        L.DomEvent.preventDefault(e);
                                    });
                                }
                            });
                        },
                        function (errorMessage) {
                            Notification.error({ message: errorMessage, delay: 5000 });
                        });
                };

                $scope.cl = function ()
                {
                }

                $scope.getArea_Name = function (area_id) {
                    for (var i = 0 ; i < $scope.datalist.length; i++) {
                        if ($scope.datalist[i].Area_Id == area_id) {

                            return $scope.datalist[i].Area_name;
                        }
                    }
                }





                //删除自定义区域
                $scope.DeleteAreaCustomer = function (strareaid) {
                    if ($scope.editarea != "") {
                        Notification.error({ message: "请先将正在编辑的区域保存", delay: 5000 })
                        return;
                    }

                    $confirm({ text: '是否要删除该区域' })
                        .then(function () {
                            httpService.post("Position", "AreaCustomerService", "DeleteAreaCustomer", { area_id: strareaid }).then(
                                function (data) {
                                    alert("删除成功！");
                                    //清空GIS
                                    leafletData.getLayers().then(function (baselayers) {
                                        var drawnItems = baselayers.overlays.draw;
                                        drawnItems.removeLayer(drawRegionLayers[strareaid]);
                                        delete drawRegionLayers[strareaid];
                                        $scope.ListAreaCustomer();
                                    });
                                },
                                function (errorMessage) {
                                    Notification.error({ message: errorMessage, delay: 5000 });
                                });
                        }, function () {

                        })
                };




                //批量删除自定义区域
                $scope.RDeleteAreaCustomer = function () {

                    if ($scope.editarea != "") {
                        Notification.error({ message: "请先将正在编辑的区域保存", delay: 5000 })
                        return;
                    }
                    var strareaid=$scope.getids();
                    if (strareaid == "") {
                        Notification.error({ message: "请选择要删除的区域", delay: 5000 });
                        return;
                    }
                    $confirm({ text: '是否要删除所选区域' })
                        .then(function () {
                            httpService.post("Position", "AreaCustomerService", "RDeleteAreaCustomer", { area_id: strareaid }).then(
                                function (data) {
                                    alert("删除成功！");

                                    var regions = $scope.getregions();
                                    //清空GIS
                                    leafletData.getLayers().then(function (baselayers) {
                                        var drawnItems = baselayers.overlays.draw;

                                        for (var i in regions) {
                                            var ddd = regions[i];
                                            drawnItems.removeLayer(ddd);

                                        }
                                        $scope.ListAreaCustomer();
                                    });

                                    //删除存储数组里的数据
                                    var strids = strareaid.split(",");
                                    for (var i = 0; i < strids.length; i++) {
                                        delete drawRegionLayers[strids[i]];
                                    }
                                },
                                function (errorMessage) {
                                    Notification.error({ message: errorMessage, delay: 5000 });
                                });
                        }, function () {

                        })
                };

                //获取要被批量删除的区域ID
                $scope.getids = function () {
                    var ids = "";
                    for (var i = 0; i < $scope.datalist.length; i++) {
                        if ($scope.datalist[i].IsChecked == true) {
                            if (ids == "")
                                ids = $scope.datalist[i].Area_Id;
                            else
                                ids = ids + "," + $scope.datalist[i].Area_Id;
                        }
                    }
                    return ids;
                }

                //获取要被批量删除的区域ID
                $scope.getregions = function () {
                    var regions = new Array();
                    for (var i = 0; i < $scope.datalist.length; i++) {
                        if ($scope.datalist[i].IsChecked == true) {
                            regions.push(drawRegionLayers[$scope.datalist[i].Area_Id]);
                        }
                    }
                    return regions;
                }


                //选中全部/取消全部选中
                $scope.CheckAll = function ()
                {
                    for (var i = 0; i < $scope.datalist.length; i++) {
                        $scope.datalist[i].IsChecked = $scope.ischeckall;
                    }
                }


                //分页算法实现
                $scope.pageChanged = function (page, pageItemCount) {
                    $scope.currentPage = page;//当前页面
                    $scope.ListAreaCustomer();
                };


                //定位到某一区域
                $scope.turnGis = function (lon, lat) {
                    $scope.center = {
                        lat: lat,
                        lng: lon,
                        zoom: $scope.map._zoom
                    }
                }

                ///Gis 相关开始

                var drawLayers = new Array();

                ////设置中心点
                $scope.center = {
                    lat: window.app.Lat,
                    lng: window.app.Lng,
                    zoom: window.app.MapZoom
                }

                //设置Leaflet.Draw初始化参数
                $scope.controls = {
                    draw: {
                        draw: {
                            polyline: false,
                            polygon: false,
                            rectangle: false,
                            circle: false,
                            marker: false
                        }
                    }
                }

                //设置Leaflet图层
                $scope.layers= {
                    baselayers: {
                        baseMap: {
                            name: '底图',
                            url: 'GisServices/BaseMapService/GetGoogleTileMap?level={z}&x={x}&y={y}',
                            type: 'xyz'
                        },
                        satellite: {
                            name: '卫星图',
                            url: 'GisServices/BaseMapService/GetGoogleTileMap?level={z}&x={x}&y={y}&type=GoogleSatellite',
                            type: 'xyz'
                        }
                    },
                    overlays: {
                        draw: {
                            name: '画布',
                            type: 'group',
                            visible: true,
                            layerParams: {
                                showOnSelector: false
                            }
                        }
                    }
                }

                //初始化Leaflet,取得地图控件对象
                leafletData.getMap('map').then(function (map) {
                    $scope.map = map;
                    L.control.scale().addTo(map);
                    map.zoomControl.setPosition('topright');
                    //取得画布图层,为绘制完成事件加上监听-开始
                    leafletData.getLayers().then(function (baselayers) {
                        var drawnItems = baselayers.overlays.draw;
                        map.on('load', function (e) {
                            alert("asdasdf");
                        });

                        map.on('draw:created', function (e) {

                            var layerid = $scope.GetGUID();

                            var layer = e.layer;
                            //为所绘制区域增加弹出框-开始
                            // layer.bindPopup("<strong>弹出框</strong><br>弹出框支持Html标签")

                            layer.name = "新加区域";
                            var popup = L.popup();
                            L.DomEvent.on(layer, 'mouseover', function (e) {
                                $scope.popuptrain = popup.setLatLng([e.latlng.lat, e.latlng.lng]).setContent('<p>' + e.target.name + '</p>').openOn($scope.map);
                                L.DomEvent.stop(e);
                            });

                            L.DomEvent.on(layer, 'mouseout', function (e) {
                                if ($scope.popuptrain != null)
                                    $scope.popuptrain._close();
                            });

                            L.DomEvent.on(layer, 'mousedown', function (e) {
                                L.DomEvent.preventDefault(e);
                            });

                            //为所绘制区域增加弹出框-结束
                            drawnItems.addLayer(layer);
                            //drawLayers.push(layer);
                            drawRegionLayers[layerid] = layer;
                            console.log(JSON.stringify(layer.toGeoJSON()));
                            console.log("所绘制图形的中心坐标:" + JSON.stringify(layer.getBounds().getCenter()));

                            //分配权限
                            var modalInstance = $uibModal.open({
                                templateUrl: '../../views/confirmwindow.html',
                                controller: confirmwindowCtrl,
                                size: 'sm',
                                resolve: {
                                    dataModel: function () {
                                        return {
                                            areatype: $scope.areaSelect
                                        };
                                    },
                                }
                            });

                            modalInstance.result.then(
                                //保存事件
                                function (returndata) {
                                    layer.bindPopup("<strong>" + returndata.regionname + "</strong>")
                                    var layercenter = layer.getBounds().getCenter();
                                    var layerjson=JSON.stringify(layer.toGeoJSON());
                                    layer.name = returndata.regionname;
                                    httpService.post("Position", "AreaCustomerService", "AddAreaCustomer", { area_id: layerid, area_name: returndata.regionname, margin: layerjson, lng: layercenter.lng, lat: layercenter.lat, area_Type: $scope.areaSelect, parent_id: returndata.pareaid, traffic_Type: returndata.traffictype }).then(
                                        function (data) {
                                            if (data == "1")
                                            {
                                                Notification.success({ message: "保存完成", delay: 5000 });
                                                $scope.ListAreaCustomer();
                                            }
                                        },
                                        function (errorMessage) {
                                            Notification.error({ message: errorMessage, delay: 5000 });
                                        });
                                },
                                //取消事件
                                function () {
                                    //删除添加上去的图元
                                    $scope.canedit = true;
                                    $scope.map.removeLayer(layer);
                                });

                        });
                    });
                    //取得画布图层,为绘制完成事件加上监听-结束
                });

                //获取GUID
                $scope.GetGUID = function () {
                    var guid = "";
                    for (var i = 1; i <= 32; i++) {
                        var n = Math.floor(Math.random() * 16.0).toString(16);
                        guid += n;
                    }
                    return guid + "";
                }

                var EditAreaid = "";
                //编辑自定义区域
                $scope.EditAreaCustomer = function (area_id) {
                    EditAreaid = area_id;
                    if ($scope.editarea == "") {
                        if (drawRegionLayers[area_id] != null) {
                            drawRegionLayers[area_id].editing.enable();
                            $scope.editarea = area_id;
                        }
                    }
                    else {
                        if ($scope.editarea != area_id) {
                            Notification.error({ message: "请先将正在编辑的区域保存", delay: 5000 })
                        }
                    }
                }

                //保存编辑自定义区域
                $scope.saveEditArea = function () {
                    if (drawRegionLayers[$scope.editarea] != null) {
                        drawRegionLayers[$scope.editarea].editing.disable();
                        var layerjson = JSON.stringify(drawRegionLayers[$scope.editarea].toGeoJSON());
                        var layercenter = drawRegionLayers[$scope.editarea].getBounds().getCenter();

                        $scope.datalist.forEach(function (i) {
                            if (i.Area_Id == $scope.editarea) {
                                var itemselected = i;

                                $scope.center = {
                                    lat: itemselected.Lat,
                                    lng: itemselected.Lng,
                                    zoom: $scope.map._zoom
                                }

                                httpService.post("Position", "AreaCustomerService", "EditAreaCustomer", { area_id: itemselected.Area_Id, area_name: itemselected.Area_name, margin: layerjson, lng: layercenter.lng, lat: layercenter.lat }).then(
                                    function (data) {
                                        if (data == "1") {
                                            $scope.editarea = "";
                                            Notification.success({ message: "保存完成", delay: 5000 });
                                            EditAreaid = "";
                                        }
                                    },
                                    function (errorMessage) {
                                        Notification.error({ message: errorMessage, delay: 5000 });
                                    });
                                return;
                            }
                        })

                    }
                }





                var currentPolygonDrawer;
                //绘制区域
                $scope.drawArea = function () {

                    if ($scope.editarea != "") {
                        Notification.error({ message: "请先将正在编辑的区域保存", delay: 5000 })
                        return;
                    }

                    currentPolygonDrawer = new L.Draw.Polygon($scope.map);
                    currentPolygonDrawer.enable();
                    $scope.canedit = false;

                }
                //取消绘制区域
                $scope.cancelDrawArea = function () {
                    if (currentPolygonDrawer) {
                        currentPolygonDrawer.disable();
                        $scope.canedit = true;
                    }
                }
                //编辑第一个区域
                $scope.editArea = function () {
                    if (drawLayers[0])
                        drawLayers[0].editing.enable();
                }
                //保存编辑后的区域
                $scope.saveDrawArea = function () {
                    if (drawLayers[0]){
                        drawLayers[0].editing.disable();
                        drawLayers[0].bindPopup("<strong>弹出框</strong><br>弹出框支持Html标签")
                        console.log(JSON.stringify(drawLayers[0].toGeoJSON()));
                    }
                }
                //重现区域
                $scope.reviewArea = function () {
                    var d=[{ "lat": 39.886294268509644, "lng": 116.39837890863419 }, {"lng": 116.4194932579994 , "lat": 39.8874797289227}, {"lng": 116.4203515648842, "lat": 39.87457027859933  }, { "lat": 39.874175053006624, "lng": 116.39889389276505 }];
                    var demoPolygon = new L.polygon(d)
                    leafletData.getLayers().then(function (baselayers) {
                        var drawnItems = baselayers.overlays.draw;
                        drawnItems.addLayer(demoPolygon)

                    });
                }

                //移除第一个区域
                $scope.removeArea = function () {
                    if (drawLayers[0])
                        $scope.map.removeLayer(drawLayers[0]);
                }

                ///Gis 相关结束
            }]
    });