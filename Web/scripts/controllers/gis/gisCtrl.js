define(['bootstrap',
        // 'bootstrap-multiselect',
        'scripts/directives/repeatFinishedDirt',
        'scripts/services/httpService',
        'scripts/requireHelper/requireNotification',
        'scripts/requireHelper/requireLeaflet',
    ]
    , function () {
        return ['$scope','httpService','Notification', '$stateParams','$state','leafletData' ,
            function ($scope,httpService,Notification, $stateParams,$state,leafletData) {
                // $scope.$on('repeatFinished', function (repeatFinishedEvent, element) {
                //     function initStyleAmMonitoring() {
                //         $('#ceGis').css("height", ($('#alarmConRight').height() -5) + 'px');
                //     }
                //     initStyleAmMonitoring();
                //     $(window).resize(function () {
                //         initStyleAmMonitoring();
                //     });
                // });
                function initStyleAmMonitoring() {
                    $('#ceGis').css("height", ($('#alarmConRight').height() - 5) + 'px');
                    $('#map').css("height", ($('#alarmConRight').height() - 40) + 'px');
                }
                initStyleAmMonitoring();
                $(window).resize(function () {
                    initStyleAmMonitoring();
                });


                var linelist = [];
                var defaultLayer=[];
                $scope.rangeList=[];//颜色区间范围
                $scope.dicts=[];
                $scope.london = {lat: 33.42, lng: 104.21, zoom: 5};
                $scope.searchmarker=null;
                $scope.$on('to-togis', function (event, data) {
                    $scope.map.invalidateSize();
                });
                $scope.neLocationlist=[];
                $scope.neToneList = [];
                $scope.neRadioList=[];
                //设置Leaflet图层
                $scope.layers = {
                    baselayers: {
                        baseMap: {
                            name: '底图',
                            url: 'http://{s}.google.cn/vt/lyrs=m@167000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
                            layerOptions: {
                                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                                showOnSelector: false
                            },
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






                //画网元
                function  drawroom(list) {
                    leafletData.getLayers("map").then(function (baselayers) {
                        var drawnItems = baselayers.overlays.draw;
                        for (var i = 0; i < list.length; i++) {
                            var lat = list[i].LAT;
                            var lng = list[i].LON;
                            if (lat == null || lng == null)
                                continue;
                            var typeName = '';
                            switch (list[i].NE_TYPE) {
                                case '102':
                                    typeName = "oadm0";
                                    break;
                                case '105':
                                    typeName = "otm0";
                                    break;
                                case '106':
                                    typeName = "osn75000";
                                    break;
                                case '103':
                                    typeName = "ola0";
                                    // list[i].NE_NAME='';
                                    break;
                                case '104':
                                    typeName = "oreg0";
                                    break;
                                case '101':
                                    typeName = "oeq0";
                                    break;
                            }
                            var path='imgs/'+typeName+'.png';

                            var myIcon = L.icon({
                                iconUrl: '',
                                iconSize: [15, 15]
                            });
                            myIcon.options.iconUrl = path;
                            if(list[i].NE_TYPE=='103')
                            {
                                myIcon.options.iconSize=[0,0];
                            }


                            var marker = new L.marker([lat, lng], {
                                icon: myIcon,
                                title: list[i].NE_NAME
                            });
                            drawnItems.addLayer(marker);

                        }
                    });
                }

                //划线
                function drawdline(radioList,type) {
                    leafletData.getLayers("map").then(function (baselayers) {
                        var drawnItems = baselayers.overlays.draw;
                        drawnItems.clearLayers();
                        drawroom($scope.neLocationlist);

                        defaultLayer=[];
                        for (var i = 0; i < $scope.neToneList.length; i++) {
                            var points1 = [];
                            if ($scope.neToneList[i].sLAT != null && $scope.neToneList[i].sLON != null && $scope.neToneList[i].dLAT != null && $scope.neToneList[i].dLON != null) {
                                points1.push([parseFloat($scope.neToneList[i].sLAT), parseFloat($scope.neToneList[i].sLON)]);
                                points1.push([parseFloat($scope.neToneList[i].dLAT), parseFloat($scope.neToneList[i].dLON)]);
                                var strcolor = "#000000";
                                var pl = L.polyline(points1, {color: strcolor, weight: 1, fillOpacity: 0.2});
                                pl.name=i;
                                defaultLayer.push({layer: pl, points: points1});
                            }
                        }


                        if(radioList.length>0)
                        {
                            radioList.forEach(function (item,index,arr) {

                                var allList=[];
                                var sNeID=item.aEndID;
                                var list=[];
                                //源头集合
                                var sData= $scope.neToneList.filter(function (item1,index1,arr1) {
                                    return item1.NE_ID==sNeID||item1.REL_NE_ID==sNeID;
                                })
                                if(sData.length>0){
                                    sData.forEach(function (sitem,sindex,sarr) {
                                        var alist=[];
                                        alist.push(sitem);
                                        if(sitem.NE_ID==sNeID)
                                            getsPoint(sitem.REL_NE_ID,item.zEndID,alist);
                                        else
                                            getrPoint(sitem.NE_ID,item.zEndID,alist);
                                        allList.push(alist);
                                    });
                                }


                                if(allList.length>0&&allList.length==1)
                                {
                                    list=allList[0];
                                    if(!(list[list.length-1].REL_NE_ID==item.zEndID||list[list.length-1].NE_ID==item.zEndID))
                                        list=[];
                                }
                                else if(allList.length>0&&allList.length>1)
                                {
                                    var filterList=allList.filter(function (item1,index,arr) {
                                        return item1[item1.length-1].REL_NE_ID==item.zEndID||item1[item1.length-1].NE_ID==item.zEndID||item1[0].REL_NE_ID==item.zEndID||item1[0].NE_ID==item.zEndID;

                                    });
                                    if(filterList.length==1)
                                        list=filterList[0];
                                    else if(filterList.length>1)
                                    {
                                        filterList.sort(function(a,b){return a.length-b.length});
                                        list=filterList[0];
                                    }
                                    else
                                        list=[];
                                }
                                if(list.length>0)
                                {
                                    for (var i = 0; i < list.length; i++) {
                                        var points = [];
                                        points.push([parseFloat(list[i].sLAT), parseFloat(list[i].sLON)]);
                                        points.push([parseFloat(list[i].dLAT), parseFloat(list[i].dLON)]);
                                        var strcolor = "";
                                        switch (type)
                                        {
                                            case "channelAllNum"://波道总数量
                                                strcolor=getColor(item.OccupyNum+item.IdleNuml);
                                                break;
                                            case "channelUseNum"://波道已使用数量
                                                strcolor=getColor(item.OccupyNum);
                                                break;
                                            case "channelNotuseNum"://波道未使用数量
                                                strcolor=getColor(item.IdleNuml);
                                                break;
                                            case "channelProNum"://波道占比
                                                strcolor=getColor(item.OccupancyRatio);
                                                break;

                                        }
                                        var pl = L.polyline(points, {color: strcolor, weight: 4, fillOpacity: 1,title:parseInt(item.OccupyNum)+parseInt(item.IdleNuml),useNum:parseInt(item.OccupyNum)});

                                        var items=defaultLayer.filter(function (item,index,arr) {
                                            return item.points[0][0]==points[0][0]&&item.points[0][1]==points[0][1]&&item.points[1][0]==points[1][0]&&item.points[1][1]==points[1][1];
                                        })
                                        if(items.length>0)
                                            drawnItems.removeLayer(items[0].layer);
                                        drawnItems.addLayer(pl);

                                        var popup = L.popup();

                                        L.DomEvent.on(pl, 'mouseover', function (e) {
                                            $scope.popuptrain = popup.setLatLng([e.latlng.lat, e.latlng.lng]).setContent('<p>'+ "已开通数量："+ e.target.options.title + '</p ><p>'+ "已使用数量："+ e.target.options.useNum + '</p >').openOn($scope.map);
                                            L.DomEvent.stop(e);
                                        });

                                        L.DomEvent.on(pl, 'mouseout', function (e) {
                                            // if ($scope.popuptrain != null)
                                            //     $scope.popuptrain._close();
                                        });

                                        L.DomEvent.on(pl, 'mousedown', function (e) {
                                            L.DomEvent.preventDefault(e);
                                        });
                                    }
                                }
                            });
                        }
                    });
                }

                //获得着色颜色
                function getColor(itemValue) {
                    var color='#000000';
                    // var color='';
                    $scope.rangeList.forEach(function (item, index, arr) {
                        if(parseFloat(itemValue)>parseFloat(item.min_value)&&parseFloat(itemValue)<=parseFloat(item.max_value))
                        {
                            color=item.colour;
                            return color;
                        }
                    })
                    return color;
                }

                function getsPoint(sNeID,dNeID,singleData)
                {//源头集合
                    var sData= $scope.neToneList.filter(function (item,index,arr) {
                        return item.NE_ID==sNeID;
                    })

                    if(sData!=null&&sData.length>0)
                    {
                        sData.forEach(function (sitem,sindex,sarr) {
                            if(singleData.filter(function (item,index,arr) {
                                    return item.NE_ID==sitem.NE_ID&&item.REL_NE_ID==sitem.REL_NE_ID;
                                }).length==0)
                            {
                                if(sitem.dNE_TYPE!='103')
                                {
                                    if(sitem.REL_NE_ID==dNeID)
                                    {
                                        singleData.push(sitem);
                                        return;
                                    }
                                    else
                                    {
                                        return;
                                    }
                                }
                                else
                                {
                                    singleData.push(sitem);
                                    getsPoint(sitem.REL_NE_ID,dNeID,singleData);
                                }
                            }
                            else
                                return;

                        })
                    }
                    else {

                        getrPoint(sNeID,dNeID,singleData);
                    }
                }

                function getrPoint(sNeID,dNeID,singleData)
                {//源头集合
                    var sData= $scope.neToneList.filter(function (item,index,arr) {
                        return item.REL_NE_ID==sNeID;
                    })

                    if(sData!=null&&sData.length>0)
                    {
                        sData.forEach(function (sitem,sindex,sarr) {
                            //    if(singleData.length>0)
                            if(singleData.filter(function (item,index,arr) {
                                    return item.NE_ID==sitem.NE_ID&&item.REL_NE_ID==sitem.REL_NE_ID;
                                }).length==0)
                            {
                                if(sitem.sNE_TYPE!='103')
                                {
                                    if(sitem.NE_ID==dNeID)
                                    {
                                        singleData.push(sitem);
                                        return;
                                    }
                                    else
                                    {
                                        //singleData=[];
                                        return;
                                    }
                                }
                                else
                                {
                                    singleData.push(sitem);
                                    getrPoint(sitem.NE_ID,dNeID,singleData);
                                }
                            }
                            else
                                return;

                        })
                    }
                    else {
                        getsPoint(sNeID,dNeID,singleData);
                    }
                }

                //画GIS拓扑结构
                function drawtopo()
                {
                    leafletData.getLayers("map").then(function (baselayers) {
                        var drawnItems = baselayers.overlays.draw;
                        drawnItems.clearLayers();
                        // $scope.getDrawList();

                    });
                }
                drawtopo();



                $scope.searchmarker=null;
                function setselected(id) {
                    leafletData.getLayers("map").then(function (baselayers) {
                        var drawnItems = baselayers.overlays.draw;
                        for (var i = 0; i < $scope.neLocationlist.length; i++) {
                            if ($scope.neLocationlist[i].NE_ID == id) {
                                var lat = parseFloat($scope.neLocationlist[i].LAT);
                                var lng = parseFloat($scope.neLocationlist[i].LON);
                                $scope.london = {lat: lat, lng: lng, zoom: 10};
                                if ($scope.searchmarker != null)
                                    drawnItems.removeLayer($scope.searchmarker);
                                $scope.searchmarker = L.marker([lat, lng],{title:$scope.neLocationlist[i].NE_NAME});
                                drawnItems.addLayer($scope.searchmarker);
                            }
                        }
                    });
                }

                function getnubyname(nename) {
                    var nell = [];
                    for (var i = 0; i < $scope.neLocationlist.length; i++) {
                        var n={};
                        n.NAME = $scope.neLocationlist[i].NE_NAME;
                        n.ID = $scope.neLocationlist[i].NE_ID;
                        if (n.NAME.indexOf(nename) >= 0) {
                            nell.push(n);
                        }
                        if (nell.length == 10)
                            return nell;
                    }
                    return nell;
                }

                //获取选择指标范围
                $scope.getRange=function (type) {
                    httpService.get("LineConfigService", "LineConfig", "searchDetail", {user_type:type}).then(function (data) {
                        if (data.success) {
                            $scope.rangeList=data.data;
                            if($scope.neRadioList.length>0)
                            {
                                drawdline($scope.neRadioList,type);
                            }
                        }
                        else {
                        }
                    });
                }
                function getDicts() {
                    httpService.get("IM", "Dict", "getItem", {dict_type_id:'channel'}).then(function (data) {
                        if (data.success) {
                            $scope.dicts=data.data;
                            if($scope.dicts.length>0)
                            {
                                $scope.selectModel=$scope.dicts[0].DICT_ID;
                                $scope.getRange($scope.selectModel);
                            }
                        }
                        else {
                        }
                    });
                }

                //划线
                function drawDefaultLine(list) {
                    leafletData.getLayers("map").then(function (baselayers) {
                        var drawnItems = baselayers.overlays.draw;
                        defaultLayer=[];
                        for (var i = 0; i < list.length; i++) {
                            var points = [];
                            if(list[i].sLAT!=null&&list[i].sLON!=null&&list[i].dLAT!=null&&list[i].dLON!=null)
                            {
                                points.push([parseFloat(list[i].sLAT), parseFloat(list[i].sLON)]);
                                points.push([parseFloat(list[i].dLAT), parseFloat(list[i].dLON)]);
                                var strcolor = "#000000";
                                var pl = L.polyline(points, {color: strcolor, weight: 4, fillOpacity: 0.2});
                                drawnItems.addLayer(pl);
                                defaultLayer.push({layer:pl,points:points});
                            }
                        }


                    });
                }

                var geojsonFeature = {
                    "type": "Feature",
                    "properties": {
                        "name": "Coors Field",
                        "amenity": "Baseball Stadium",
                        "popupContent": "This is where the Rockies play!"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [39.9, 116.3]
                    }
                };

                // $scope.getDrawList=function () {
                //     httpService.get("TactService", "Topology", "getneLinkLocation", {}).then(function (data) {
                //         if (data.result.success) {
                //             $scope.neLocationlist=data.result.neLocationlist;
                //             $scope.neToneList = data.result.neToneList;
                //             $scope.neRadioList=data.result.neRadioList;
                //             drawroom($scope.neLocationlist);
                //             getDicts();
                //             // drawDefaultLine($scope.neToneList);
                //             //  drawdline($scope.neRadioList,"channelProNum");
                //         }
                //         else {
                //         }
                //     });
                // }


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
