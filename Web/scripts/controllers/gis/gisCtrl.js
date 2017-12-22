define(['bootstrap',
        // 'bootstrap-multiselect',
        'scripts/directives/repeatFinishedDirt',
        'scripts/services/httpService',
        'scripts/requireHelper/requireNotification',
        'scripts/requireHelper/requireLeaflet',
    ], function () {
        'use strict';
        return ['$scope','$http','httpService','Notification', '$stateParams','$state','leafletData' ,
            function ($scope,$http,httpService,Notification, $stateParams,$state,leafletData) {

                function initStyleAmMonitoring() {
                    $('#map').css("height", ($('#alarmConRight').height()) + 'px');
                }
                initStyleAmMonitoring();
                $(window).resize(function () {
                    initStyleAmMonitoring();
                });


                //初始化地图 大小{lat，lng}和位置{zoom}
                $scope.london = {lat: 33.42, lng: 104.21, zoom: 5, };

                //切换地图背景
                $scope.layers = {
                    baselayers: {
                        baseMap: {
                            name: '底图',
                            url: 'http://{s}.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
                            layerOptions: {
                                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                                // showOnSelector: false  //是否显示多种地图
                            },
                            type: 'xyz'
                        },
                        satellite: {
                            name: 'osm图',
                            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png', //osm 地图种类 一个八种
                            type: 'xyz'
                        },

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
                };


                //绘制区域
                $scope.editarea = ""; //存储 区域值
                var currentPolygonDrawer;
                $scope.drawArea = function () {

                    if ($scope.editarea != "") {
                        Notification.error({ message: "请先将正在编辑的区域保存", delay: 5000 })
                        return;
                    }

                    currentPolygonDrawer = new L.Draw.Polygon($scope.map);
                    currentPolygonDrawer.enable();
                    $scope.canedit = false;

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
                //初始化Leaflet,取得地图控件对象
                leafletData.getMap("map").then(function (map) {
                    map._layersMinZoom =4;
                    $scope.map = map;
                });


                //获取代码
                $scope.motorlist='';
                $scope.linelist='';
                    $http({
                        url: 'json/line.json',
                        method: 'GET',
                        contentType: "application/json; charset=utf-8"
                    }).success(function (data, header, config, status) {
                      var motorlist = data.result.roomlist.model;
                      var  linelist = data.result.roomtoroomlist.model;

                        drawroom(motorlist,linelist);
                        drawdline(linelist);
                    }).error(function (data, header, config, status) {
                        //处理响应失败
                    });

                //画机房
                function  drawroom(list,linelist) {
                    console.log()
                    $scope.HOUSE_ID="";
                    leafletData.getLayers("map").then(function (baselayers) {
                        var drawnItems = baselayers.overlays.draw;
                        for (var i = 0; i < list.length; i++) {
                            var lat = list[i].GEO_LAT;
                            var lng = list[i].GEO_LNG;
                            if (lat == null || lng == null)
                                continue;

                            var path='imgs/room2.png';

                            var myIcon = L.icon({
                                iconUrl: '',
                                iconSize: [10, 10]
                            });
                            myIcon.options.iconUrl = path;
                            var marker = new L.marker([lat, lng], {
                                icon: myIcon,
                                title: list[i].HOUSE_NAME,
                                house_id:list[i].HOUSE_ID
                            });

                            L.DomEvent.addListener(marker, 'click', function (e) {
                                console.log('点击一个某个点');

                                $scope.newHouseID=e.target.options.house_id;
                                var mypop = L.popup();

                                function cb() {
                                    var content = '<div  >';
                                    content += ' <div id="popup" class="ol-popup">\n' +
                                        '        <div class="mapTitle">\n' +
                                        "            <div class=\"titleContent\">"+ e.target.options.title+" </div>\n" +
                                        '        </div>\n' +
                                        '        <div id="popup-content">\n' +
                                        '            <ul id="mapTempInfo_Tab"  class="nav nav-tabs" >\n' +
                                        '                <li class="current"><a >基本信息</a></li>\n' +
                                        '                <li><a >客户信息</a></li>\n' +
                                        '                <li><a >告警监控</a></li>\n' +
                                        '                <li><a >故障抢修</a></li>\n' +
                                        '                <li><a >线路巡检</a></li>\n' +
                                        '            </ul>\n' +
                                        '            <div id="mapTempInfo_Content" class="tab-content">\n' +
                                        '                <div class="tab-pane-map " id="map1">\n' +
                                        '                    <table>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>网元数量:</h5></td><td class='tabRight'>"+ $scope.NE_COUNT+"个</td>\n" +
                                        // "                            <td><h5>网元数量:</h5></td><td>{{"+DEVICE_COUNT+"}}个</td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>设备数量:</h5></td><td class='tabRight'>"+ $scope.DEVICE_COUNT+"个</td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>板件数量:</h5></td><td class='tabRight'>"+$scope.PLATE_COUNT+"个</td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                           <td><h5>交接设施数量:</h5></td><td class='tabRight'>"+$scope.TRANS_COUNT+"个</td>\n" +
                                        '                        </tr>\n' +
                                        '                    </table>\n' +
                                        '                </div>\n' +
                                        '                <div class="tab-pane-map " id="map2" >\n' +
                                        '                    <table>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>重要客户:</h5></td><td class='tabRight'>"+$scope.IMPORTANT_COUNT+"个</td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>普通客户:</h5></td><td class='tabRight'> "+$scope.ORDINARY_COUNT+"个 </td>\n" +
                                        '                        </tr>\n' +
                                        '                    </table>\n' +
                                        '                </div>\n' +
                                        '                <div class="tab-pane-map  "  id="map3">\n' +
                                        '                    <table>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>紧急告警:</h5></td><td class='tabRight'>"+$scope.CRITICAL_COUNT+"个</td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>重要告警:</h5></td><td class='tabRight'> "+$scope.MAJOR_COUNT+"个 </td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>次要告警:</h5></td><td class='tabRight'>"+$scope.MINOR_COUNT+"个</td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>提示告警:</h5></td><td class='tabRight'> "+$scope.WANING_COUNT+"个 </td>\n" +
                                        '                        </tr>\n' +
                                        '                    </table>\n' +
                                        '                </div>\n' +
                                        '                <div class="tab-pane-map  "  id="map4">\n' +
                                        '                    <table>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>运行工单:</h5></td><td class='tabRight'>"+$scope.count+"个</td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>维护公司:</h5></td><td class='tabRight'> "+$scope.MAU_NAME+" </td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                           <td><h5>维护人员:</h5></td><td class='tabRight'  title="+$scope.REAL_NAME+">"+$scope.REAL_NAME+"</td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>联系方式:</h5></td><td class='tabRight' title="+$scope.PHONE+">"+$scope.PHONE+"</td>\n" +
                                        '                        </tr>\n' +
                                        '                    </table>\n' +
                                        '                </div>\n' +
                                        '                <div class="tab-pane-map"  id="map5"    >\n' +
                                        '                    <table>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>运行工单:</h5></td><td class='tabRight'>"+$scope.num+"个</td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>巡检公司:</h5></td><td class='tabRight'> "+$scope.RECEIVER_UNIT+" </td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>专业:</h5></td><td class='tabRight'>"+$scope.PROFESSION+"</td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>巡检人员:</h5></td><td class='tabRight' title="+$scope.RECEIVER+"><a href='#' id=\"mapclick\"  style=\"text-decoration:underline\">"+$scope.RECEIVER+"</a></td>\n" +
                                        '                        </tr>\n' +
                                        '                        <tr>\n' +
                                        "                            <td><h5>联系方式:</h5></td><td class='tabRight' title="+$scope.TEL+">"+$scope.TEL+"</td>\n" +
                                        '                        </tr>\n' +
                                        '                    </table>\n' +
                                        '                </div>\n' +
                                        '            </div>\n' +
                                        '        </div>\n' +
                                        '    </div>';

                                    content += '</div>';

                                    mypop.setLatLng(e.latlng).setContent(content).openOn($scope.map);
                                }
                            });



                            drawnItems.addLayer(marker);

                        }
                    });
                }
                function drawdline(list) {
                    leafletData.getLayers("map").then(function (baselayers) {
                        var drawnItems = baselayers.overlays.draw;
                        for (var i = 0; i < list.length; i++) {
                            var points = [];
                            points.push([parseFloat(list[i].BLAT), parseFloat(list[i].BLNG)]);
                            points.push([parseFloat(list[i].ELAT), parseFloat(list[i].ELNG)]);
                            var strcolor = "";
                            if (list[i].ISALARM == "1")
                                strcolor = "#ff1818";
                            else
                                strcolor = "#00fa00";
                            var pl = L.polyline(points, {color: strcolor, weight: 4, fillOpacity: 1,HOUSE_ID:list[i].HOUSE_ID,REL_HOUSE_ID:list[i].REL_HOUSE_ID});
                            var popup = L.popup();
                            L.DomEvent.on(pl, 'click', function (e) {
                                console.log('点击事件')
                            });
                            L.DomEvent.on(pl, 'mouseout', function (e) {
                               console.log('鼠标离开事件')
                            });

                            drawnItems.addLayer(pl);
                        }
                    });
                }











                $(function() {
                    $(document).mousemove(function(e) {
                        if (!!this.move) {
                            var posix = !document.move_target ? {'x': 0, 'y': 0} : document.move_target.posix,
                                callback = document.call_down || function() {
                                    $(this.move_target).css({
                                        'top': e.pageY - posix.y,
                                        'left': e.pageX - posix.x
                                    });
                                };

                            callback.call(this, e, posix);
                        }
                    }).mouseup(function(e) {
                        if (!!this.move) {
                            var callback = document.call_up || function(){};
                            callback.call(this, e);
                            $.extend(this, {
                                'move': false,
                                'move_target': null,
                                'call_down': false,
                                'call_up': false
                            });
                        }
                    });

                    var $box = $('#drag').mousedown(function(e) {
                        var offset = $(this).offset();

                        this.posix = {'x': e.pageX +242 - offset.left, 'y': e.pageY +102 - offset.top};
                        $.extend(document, {'move': true, 'move_target': this});
                    }).on('mousedown', '#coor', function(e) {
                        var posix = {
                            'w': $box.width(),
                            'h': $box.height(),
                            'x': e.pageX,
                            'y': e.pageY
                        };
                        $.extend(document, {'move': true, 'call_down': function(e) {
                            $box.css({
                                'width': Math.max(30, e.pageX - posix.x + posix.w),
                                'height': Math.max(30, e.pageY - posix.y + posix.h)
                            });
                        }});
                        return false;
                    });
                });

            }]
    });
