define(['scripts/services/httpService', 'scripts/requireHelper/requireNotification','bower_components/jtopo/jtp/jtopo-0.4.8-min.js',
        'bootstrap',
        'css!bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
        'ngload!ui-notification','cookie', 'ngload!scripts/controllers/alarm/alarmBusinessDirt', ],
    function () {
        return ['$scope','httpService','Notification','$interval', '$stateParams','$state',
            function ($scope,httpService,Notification, $interval,$stateParams,$state) {
                $.ajax(window.tescomm.config.system.AuthorizeService + 'Open/OAuth/GetUserAllActions', {
                    type: 'POST', data: {
                        token: $.cookie("Tescomm_Access_Token"),
                        appId: 'InMonitor',
                        url: '#/main/topology'
                        , callback: ""
                    },dataType:'json',
                    async:false,
                    success: function (data, staus) {
                        $scope.btnPermission = data;
                    },
                    error: function (xhr, status, error) {
                    }
                });


                $scope.scale=1;
                $scope.scaleshow="100%";
                $scope.curnetid="";//当前网元id
                $scope.jumpneid = $stateParams.neid;//跳转带的参数
                $scope.curnetid=$scope.jumpneid;
                $scope.isclicknode=false;
                $scope.$on('to-topology', function (event, data) {
                    initStyleTopology();
                });
                initStyleTopology();
                function initStyleTopology(){
                    $('.t-con').css("height",($('#alarmConRight').height())+'px');
                    $("#canvas").attr("height",($('#alarmConRight').height())+'px');
                    $("#canvas").attr("width",($('.caption').width())+'px');
                }
                $(window).resize(function(){
                    initStyleTopology();
                });

                $('.t-box-bom').hover(function(e) {
                    $(this).children('ul').stop().slideToggle()
                });

                //设置相关业务和设备面板功能按钮变灰
                function  setenable() {
                    if ($scope.curnetid) {
                        $("#t-list02").addClass("t-list-activa");
                        var condi={};
                        condi.NE_ID=$scope.curnetid;
                        httpService.get("TactService", "Topology", "getbbussinesscount", {ids:$scope.curnetid}).then(function (data) {
                            if (data.result.success) {
                                var icount = data.result.data["USER_CNT"];
                                if (icount > 0) {
                                    $("#t-list03").addClass("t-list-activa");
                                    $("#li-business a").removeClass("t-list-activa");
                                }
                                else {
                                    $("#t-list03").removeClass("t-list-activa");
                                    $("#li-business a").addClass("t-list-activa");
                                }
                            }
                            else
                            Notification.error({message: '查询相关业务信息失败', delay: 5000});
                        });
                    }
                    else {
                        $("#t-list02").removeClass("t-list-activa");
                        $("#t-list03").removeClass("t-list-activa");
                    }
                }
                setenable();

               //拓扑图相关,初始化拓扑
                var canvas = document.getElementById('canvas');
                var stage = new JTopo.Stage(canvas); // 创建一个舞台对象
                var scene = new JTopo.Scene(stage); // 创建一个场景对象
                stage.setCenter(-1300,-200);
                stage.zoomIn(0.125);
                $scope.scale =0.125;
                var tbl = $scope.scale * 100;
                $scope.scaleshow = tbl.toString().split('.')[0] + "%";

                stage.wheelZoom = true;
                scene.background = '././imgs/topobj.jpg';


                stage.mousewheel(function(event){
                    e=event;
                    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                        if (e.wheelDelta > 0) { //当滑轮向上滚动时
                            if ($scope.scale<4) {
                                stage.zoomOut(0.5);
                                $scope.scale = $scope.scale * 2;
                                var tbl = $scope.scale * 100;
                                $scope.scaleshow = tbl.toString().split('.')[0] + "%";
                            }
                        }
                        if (e.wheelDelta < 0) { //当滑轮向下滚动时
                            if ($scope.scale>0.0625) {
                                stage.zoomIn(0.5);
                                $scope.scale = $scope.scale * 0.5;
                                var tbl = $scope.scale * 100;
                                $scope.scaleshow = tbl.toString().split('.')[0] + "%";
                            }
                        }
                    } else if (e.detail) {  //Firefox滑轮事件
                        if (e.detail < 0) { //当滑轮向上滚动时
                            if ($scope.scale<4) {
                                stage.zoomOut(0.5);
                                $scope.scale = $scope.scale * 2;
                                var tbl = $scope.scale * 100;
                                $scope.scaleshow = tbl.toString().split('.')[0] + "%";
                            }
                        }
                        if (e.detail > 0) { //当滑轮向下滚动时
                            if ($scope.scale>0.0625) {
                                stage.zoomIn(0.5);
                                $scope.scale = $scope.scale * 0.5;
                                var tbl = $scope.scale * 100;
                                $scope.scaleshow = tbl.toString().split('.')[0] + "%";
                            }
                        }
                    }
                    $scope.$apply();
                });


                scene.click(function () {
                    $("#contextmenu").hide();
                    if ($scope.isclicknode==true) {//说明是点击了节点，而不是直接点击画布
                        $scope.isclicknode = false;
                        if ($scope.curnode != null)
                            $scope.curnode.selected = false;
                        return;
                    }
                     if($scope.curnode!=null) {  //当前选中节点不为空
                         $scope.curnetid = "";
                         setenable();
                     }
                });


               $scope.restore=function () {
                   if ($scope.selecteddevice == "OTN") {
                       stage.setCenter(-1300, -200);
                       setsizetotow(0.125);
                   }
                   else if ($scope.selecteddevice == "SDH") {
                       stage.setCenter(200, 0);
                       setsizetotow(0.5);
                   }
               }

                $scope.curnetlist=[];//当前网元列表
                $scope.curlinelist=[];//当前线列表
                $scope.cururgentlist=[];//当前紧急告警的网元
                $scope.levellist={};
                $scope.typelist={};
                $scope.netlist=null;
                $scope.curnode={};
                

                //按告警等级获取网元数量
                function getalarmcount() {
                    httpService.get("AlarmScreen", "AlarmScroll", "searchCount", {}).then(function (data) {
                        $scope.levellist.Urgent = 0;
                        $scope.levellist.Important = 0;
                        $scope.levellist.Minor = 0;
                        $scope.levellist.Prompt = 0;

                        adata = data.data;
                        var all = 0;
                        for (var i = 0; i < adata.length; i++) {
                            all = all + adata[i].ALL_RECORD;
                            if (adata[i].ALARM_LEVEL == 1)
                                $scope.levellist.Urgent = adata[i].ALL_RECORD;
                            else if (adata[i].ALARM_LEVEL == 2)
                                $scope.levellist.Important = adata[i].ALL_RECORD;
                            else if (adata[i].ALARM_LEVEL == 3)
                                $scope.levellist.Minor = adata[i].ALL_RECORD;
                            else if (adata[i].ALARM_LEVEL == 4)
                                $scope.levellist.Prompt = adata[i].ALL_RECORD;
                        }
                        $scope.levellist.All = all;
                    })
                }
                getalarmcount();
               $scope.allne=[];
               function getdirverinfo() {
                   //获取网元的告警信息
                   httpService.get("TactService", "Topology", "getalarminfo", {}).then(function (data) {
                       if (data.result.success) {


                           //当从其他地方跳转到网元拓扑时
                           if ($scope.jumpneid != "") {
                               var nl = data.result.nedata.model;
                               for (var i = 0; i < nl.length; i++) {
                                   if (nl[i].NE_ID == $scope.jumpneid) {
                                       if (nl[i].NE_TYPE == "101" || nl[i].NE_TYPE == "102" || nl[i].NE_TYPE == "103" || nl[i].NE_TYPE == "104" || nl[i].NE_TYPE == "105")
                                           $scope.selecteddevice = "OTN";
                                       else if (nl[i].NE_TYPE == "106")
                                           $scope.selecteddevice = "SDH";
                                       setsizetotow(2);
                                   }
                               }
                           }

                           //清空当前图层
                           $scope.allne=data.result.nedata.model;
                           if (data.result.nedata != null)
                               drawne(data.result.nedata.model);
                           stage.eagleEye.visible = false;
                           getdirvertypecount(data.result.nedata.model);
                           if (data.result.linedata != null)
                               drawline(data.result.linedata.model)

                           //从其他界面跳转
                           if ($scope.jumpneid != "") {
                               setselected($scope.jumpneid);
                               $scope.jumpneid="";
                           }
                       }
                   });
               }
                getdirverinfo();

                //selected 被选中网元
                function setselected(id) {
                    for (var i = 0; i < $scope.curnetlist.length; i++) {
                        if ($scope.curnetlist[i].key == id) {
                            if ($scope.curnode != null)
                                $scope.curnode.selected = false;
                            $scope.curnetlist[i].value.selected = true;
                            $scope.curnode = $scope.curnetlist[i].value;
                            stage.setCenter($scope.curnetlist[i].value.x, $scope.curnetlist[i].value.y);

                            //默认放大到200%
                            setsizetotow(2);
                        }
                    }
                }

                //设置放大到2倍
                function setsizetotow(scale)
                {
                    //默认放大到200%
                    if ($scope.scale >= scale)
                        stage.zoomIn(scale / $scope.scale);
                    else
                        stage.zoomOut($scope.scale / scale);
                    $scope.scale = scale;
                    var tbl = $scope.scale * 100;
                    $scope.scaleshow = tbl.toString().split('.')[0] + "%";
                }

                //获取不同类型的设备告警数量
                function getdirvertypecount (list) {
                    var strotn = "";
                    var strsdh = "";
                    var strproject = "";
                    var strnet = "";

                    for (var i = 0; i < list.length; i++) {
                        if (list[i].NE_TYPE == "101" || list[i].NE_TYPE == "102" || list[i].NE_TYPE == "103" || list[i].NE_TYPE == "104" || list[i].NE_TYPE == "105") {
                            if (strotn == "")
                                strotn = list[i].NE_ID;
                            else
                                strotn = strotn + "," + list[i].NE_ID;
                        }
                        else {
                            if (strsdh == "")
                                strsdh = list[i].NE_ID;
                            else
                                strsdh = strsdh + "," + list[i].NE_ID;
                        }

                        if (list[i].TRANSFER_STATUS == "1"||list[i].TRANSFER_STATUS == "0") {
                            if (strproject == "")
                                strproject = list[i].NE_ID;
                            else
                                strproject = strproject + "," + list[i].NE_ID;
                        }
                        else {
                            if (strnet == "")
                                strnet = list[i].NE_ID;
                            else
                                strnet = strnet + "," + list[i].NE_ID;
                        }
                    }

                    httpService.get("TactService", "Topology", "gettypecount", {ids:strnet}).then(function (data) {
                        if (data.result.success)
                            $scope.typelist.Net= data.result.data;
                        else
                            $scope.typelist.Net= 0;
                    });

                    httpService.get("TactService", "Topology", "gettypecount", {ids:strproject}).then(function (data) {
                        if (data.result.success)
                            $scope.typelist.Project= data.result.data;
                        else
                            $scope.typelist.Project= 0;
                    });

                    httpService.get("TactService", "Topology", "gettypecount", {ids:strsdh}).then(function (data) {
                        if (data.result.success)
                            $scope.typelist.SDH= data.result.data;
                        else
                            $scope.typelist.SDH= 0;
                    });

                    httpService.get("TactService", "Topology", "gettypecount", {ids:strotn}).then(function (data) {
                        if (data.result.success)
                            $scope.typelist.OTN= data.result.data;
                        else
                            $scope.typelist.OTN= 0;
                    });
                }

                function  drawne(list) {
                    for (var i = 0; i < list.length; i++) {
                        if ($scope.selecteddevice=="OTN") {
                            if (list[i].NE_TYPE == "106")
                                continue;
                        }
                        else {
                            if (list[i].NE_TYPE == "101" || list[i].NE_TYPE == "102" || list[i].NE_TYPE == "103" || list[i].NE_TYPE == "104" || list[i].NE_TYPE == "105")
                                continue;
                        }

                        var getnode=exitnode(list[i].NE_ID);
                        if (getnode!=null)//非第一次刷新,只需要替换图片，不需要更改其他
                        {
                            var imgname = getimgpath(list[i].NE_TYPE, list[i].MOST_ALARM_LEVEL, list[i].TRANSFER_STATUS);
                            getnode.setImage('././imgs/' + imgname, true);
                            // kkk.setImage('././imgs/oadm0.png', false);
                        }
                        else //第一次刷新
                        {
                            var imgname = getimgpath(list[i].NE_TYPE, list[i].MOST_ALARM_LEVEL,list[i].TRANSFER_STATUS);
                            var q = list[i].X_LNG;
                            var w = list[i].Y_LAT;
                            var e = imgname;
                            var t = list[i].NE_NAME;
                            var y = list[i].NE_ID;
                            var s1 = node(list[i].X_LNG, list[i].Y_LAT, imgname, list[i].NE_NAME, list[i].NE_ID);

                            s1.addEventListener('mouseup', function(e){
                                $scope.curnetid = e.target.id;
                                $scope.isclicknode=true;
                                setenable();
                                clicknet(e.target.id);
                                if(e.button == 2) {// 右键
                                   $("#contextmenu").css({
                                       top: e.layerY-65,
                                       left: e.layerX+20
                                   }).show();
                                }

                            });
                            var dic = {"key": list[i].NE_ID, "value": s1};
                            $scope.curnetlist.push({"key": list[i].NE_ID, "value": s1});
                            if (list[i].MOST_ALARM_LEVEL == 1)
                                $scope.cururgentlist.push({"key": list[i].NE_ID, "value": s1});
                        }
                    }
                }

                function exitnode(nodeid) {
                    for (var i = 0; i < $scope.curnetlist.length; i++) {
                        if( $scope.curnetlist[i].key==nodeid)
                            return $scope.curnetlist[i].value;
                    }
                    return null;
                }

                function exitline(lineid) {
                    for (var i = 0; i < $scope.curlinelist.length; i++) {
                        if ($scope.curlinelist[i].key == lineid)
                            return $scope.curlinelist[i].value;
                    }
                    return null;
                }

                function drawline(list) {
                    if(list!=null) {
                        for (var i = 0; i < list.length; i++) {
                            var linekey = list[i].NE_ID.toString() + list[i].REL_NE_ID.toString();
                            var getline = exitline(linekey);
                            if (getline != null) {//已经在图上有的，就只改变颜色，没有的重新添加
                                var status = list[i].IS_ALARM;
                                if (status == 1)
                                    color = '255,0,0';
                                else
                                    color = '0,250,0';
                                getline.strokeColor = color;
                                // var imgname = getimgpath(list[i].NE_TYPE, list[i].MOST_ALARM_LEVEL);
                                // getnode.setImage(imgname, false);
                            }
                            else {
                                var bid = list[i].NE_ID;
                                var eid = list[i].REL_NE_ID;
                                var status = list[i].IS_ALARM;
                                var strkey = list[i].NE_ID.toString() + list[i].REL_NE_ID.toString();
                                var bnode = getnodebyid(bid);
                                var enode = getnodebyid(eid);
                                if (bnode != null && enode != null) {
                                    // var l1 = newFlexionalLink(bnode, enode, "", status);
                                   // var l1 = newFoldLink(bnode, enode, "", status);
                                    var l1 = newLink(bnode, enode, "", status);
                                    $scope.curlinelist.push({key: strkey, value: l1});
                                }
                            }
                        }
                    }
                }

                function getnodebyid(id)
                {
                   for(var i=0; i< $scope.curnetlist.length;i++)
                   {
                       if ($scope.curnetlist[i].key==id)
                           return $scope.curnetlist[i].value;
                   }
                    return null;
                }

                function getimgpath(type,level,status) {
                    var imaname = "oadm";
                    if (type == 102)
                        imaname = "oadm";
                    else if (type == 105)
                        imaname = "otm";
                    else if (type == 106)
                        imaname = "osn7500";
                    else if (type == 103)
                        imaname = "ola";
                    else if (type == 104)
                        imaname = "oreg";
                    else if (type == 101)
                        imaname = "oeq";

                    if (status == "1" || status == "0")//工程态
                    {
                        imaname = "t" + imaname;
                    }
                    return imaname = imaname + level.toString() + ".png";
                }

                //网元选择事件
                function clicknet(id) {
                    // Notification.success({ message: id, delay: 5000 });
                }

                $scope.linelist=null;
                //获取网元的具体信息
                httpService.get("TactService","Topology","getlinelevel",{}).then(function (data) {
                    if (data.result.success) {
                        $scope.linelist = data.result.data;
                    }
                })




               // var node = new JTopo.Node("Hello");    // 创建一个节点
               // node.setLocation(300,200);    // 设置节点坐标
               // scene.add(node); // 放入到场景中

               //添加图形节点
                function node(x, y, img,name,id){
                    var node = new JTopo.Node(name);
                    node.id=id;
                    node.setImage('././imgs/' + img, true);
                    node.setLocation(x, y);
                    node.setSize(58,58)
                    scene.add(node);
                    return node;
                }

                // 二次折线
                function newFlexionalLink(nodeA, nodeZ, text,status ,direction, dashedPattern) {
                    var link = new JTopo.FlexionalLink(nodeA, nodeZ, text);
                    link.direction = direction || 'horizontal';
                    link.arrowsRadius = 10;
                    link.lineWidth = 3; // 线宽
                    link.offsetGap = 35;
                    link.bundleGap = 15; // 线条之间的间隔
                    link.textOffsetY = 10; // 文本偏移量（向下15个像素）
                    link.shadow = false;//阴影
                    link.arrowsRadius=0;
                    var color = "";
                    if (status == 1)
                        color = '255,0,0';
                    else
                        color = '0,250,0';
                    link.strokeColor = color;
                    link.dashedPattern = dashedPattern;
                    scene.add(link);
                    return link;
                }

                // 折线
                function newFoldLink(nodeA, nodeZ, text,status , direction, dashedPattern) {
                    var link = new JTopo.FoldLink(nodeA, nodeZ, text);
                    link.direction = direction || 'horizontal';
                    link.arrowsRadius = 15; //箭头大小
                    link.lineWidth = 3; // 线宽
                    link.bundleOffset = 60; // 折线拐角处的长度
                    link.bundleGap = 20; // 线条之间的间隔
                    link.textOffsetY = 3; // 文本偏移量（向下3个像素）
                    link.arrowsRadius=0;
                    var color = "";
                    if (status == 1)
                        color = '255,0,0';
                    else
                        color = '0,250,0';
                    link.strokeColor = color;
                    link.dashedPattern = dashedPattern;
                    scene.add(link);
                    return link;
                }

                // 简单连线
                function newLink(nodeA, nodeZ, text,status ,  dashedPattern){
                    var link = new JTopo.Link(nodeA, nodeZ, text);
                    link.lineWidth = 3; // 线宽
                    link.dashedPattern = dashedPattern; // 虚线
                    link.bundleOffset = 60; // 折线拐角处的长度
                    link.bundleGap = 20; // 线条之间的间隔
                    link.textOffsetY = 3; // 文本偏移量（向下3个像素）
                    var color = "";
                    if (status == 1)
                        color = '255,0,0';
                    else
                        color = '0,250,0';
                    link.strokeColor = color;
                    scene.add(link);
                    return link;
                }


                $scope.isshow=true;
                //隐藏线
                $scope.hideLine=function () {
                    for(var i=0; $scope.curlinelist.length;i++)
                    {
                       // $scope.curlinelist.push({key:strkey,value:l1});
                        $scope.curlinelist[i].value.visible=$scope.isshow;
                    }
                }
                $scope.eagleEyeshow=false;
                $scope.hideYY=function () {
                    stage.eagleEye.visible = $scope.eagleEyeshow;
                }



                //当前告警
                $scope.nowalerm=function () {
                    var ne = getNE($scope.curnetid);
                    var isok = ishasright(ne);
                    if (isok == false) {
                        Notification.error({message: "没有查看该网元当前告警信息的权限", delay: 5000});
                        return;
                    }

                    $scope.nuList = [];
                    $scope.$emit('to-mainnu', $scope.nuList);
                    $scope.$emit('breadcrumb-name',{menu_One:'告警管理',menu_Tow:'告警监控',menuThree:'当前告警监控'});
                    $('.breadcrumb .breadcrumbList02').removeClass('am-active1');
                    $state.go('main.amMonitoring', {neid: $scope.curnetid});
                }
                //设备面板
                $scope.dirver=function () {//暂时没有此功能
                    if ($scope.curnetid != "") {
                        var ne = getNE($scope.curnetid);
                        var isok = ishasright(ne);
                        if (isok == false) {
                            Notification.error({message: "没有查看该网元设备面板信息的权限", delay: 5000});
                            return;
                        }
                        Notification.error({message: "此功能暂未开发", delay: 5000});
                    }
                }
                //当前业务
                $scope.business=function () {
                    if ($scope.curnetid != "") {
                        if ($("#li-business a").attr("class").indexOf("t-list-activa") < 0) {
                            var ne = getNE($scope.curnetid);
                            var isok = ishasright(ne);
                            if (isok == false) {
                                Notification.error({message: "没有查看该网元相关业务信息的权限", delay: 5000});
                                return;
                            }
                            $scope.$emit('business-parent', {NE_ID: $scope.curnetid});
                        }
                    }
                }
                //历史告警
                $scope.historyalerm=function () {
                    var ne = getNE($scope.curnetid);
                    var isok = ishasright(ne);
                    if (isok == false) {
                        Notification.error({message: "没有查看该网元历史告警信息的权限", delay: 5000});
                        return;
                    }

                    $scope.nuList = [];
                    $scope.$emit('to-mainnu', $scope.nuList);
                    $scope.$emit('breadcrumb-name',{menu_One:'告警管理',menu_Tow:'历史告警',menuThree:'历史告警查询'});
                    $('.breadcrumb .breadcrumbList02').removeClass('am-active1');
                    $state.go('main.historyQuery', {neid: $scope.curnetid});
                }
                //故障
                $scope.fault=function () {
                    var ne = getNE($scope.curnetid);
                    var isok = ishasright(ne);
                    if (isok == false) {
                        Notification.error({message: "没有查看该网元故障告警信息的权限", delay: 5000});
                        return;
                    }

                    $scope.nuList = [];
                    $scope.$emit('to-mainnu', $scope.nuList);
                    $scope.$emit('breadcrumb-name',{menu_One:'告警管理',menu_Tow:'告警监控',menuThree:'故障处理监控'});
                    $('.breadcrumb .breadcrumbList02').removeClass('am-active1');
                    $state.go('main.recoveryMonitor', {neid: $scope.curnetid});
                }
               //根据ID获取网元
                function  getNE(id) {
                    for (var i = 0; i < $scope.allne.length; i++) {
                        if ($scope.allne[i].NE_ID == id)
                            return $scope.allne[i];
                    }
                    return null;
                }
                //是否有权利跳转
                function  ishasright(ne) {
                    var pid = $.cookie("provids");
                    var cid = $.cookie("cityids");
                    var aid = $.cookie("areaids");
                    if (pid == "" && cid == "" && aid == "")
                        return true;
                    if (pid.indexOf(ne.PROVINCE_ID) != -1 || pid.indexOf(ne.CITY_ID) != -1 || pid.indexOf(ne.AREA_ID) != -1)
                        return true;
                    return true;
                }

               //每一分钟刷新一次
                var Interval60 =  $interval(function(){
                   getalarmcount();
                   getdirverinfo();
                }, 60000);

                //实现告警闪烁功能
                var Interval6 = $interval(function(){
                        for (var i = 0; i < $scope.cururgentlist.length; i++) {
                           if( $scope.cururgentlist[i].value.alarm == '紧急告警')
                           $scope.cururgentlist[i].value.alarm = null;
                            else
                               $scope.cururgentlist[i].value.alarm = '紧急告警'
                    }
                }, 600);
                $scope.$on('destroy',function(event,data){
                    if(data!='javascript:;')
                    {
                        if(window.location.href.toString().indexOf(data)==-1){
                            $interval.cancel(Interval60);
                            $interval.cancel(Interval6);
                        }
                    }
                })

                //接收模糊查询数据
                $scope.$on('to-inputchange',function(event,data) {
                    $scope.nuList = getnubyname(data);
                    $scope.$emit('to-mainnu', $scope.nuList);
                });
                //精确查找某条数据（用于拓扑图，其它模糊查询）
                $scope.$on('to-single',function(event,data){
                    $('#inputValue').val(data.NAME);
                    $scope.topoid = data.ID;
                    if ($scope.topoid != "") {
                        $scope.curnetid=$scope.topoid;
                        setselected($scope.topoid);
                        setenable();
                    }
                });

                function getnubyname(nename) {
                    // $scope.alarmNames.push({ID:item.TACT_NAME,NAME:item.TACT_NAME});
                    var nell = [];
                    for (var i = 0; i < $scope.allne.length; i++) {
                        var n={};
                        n.NAME = $scope.allne[i].NE_NAME;
                        n.ID = $scope.allne[i].NE_ID;
                        if (n.NAME.indexOf(nename) >= 0) {
                            if ($scope.selecteddevice == "OTN") {
                                if ($scope.allne[i].NE_TYPE == "101" || $scope.allne[i].NE_TYPE == "102" || $scope.allne[i].NE_TYPE == "103" || $scope.allne[i].NE_TYPE == "104" || $scope.allne[i].NE_TYPE == "105")
                                    nell.push(n);
                            }
                            else {
                                if ($scope.allne[i].NE_TYPE == "106")
                                    nell.push(n);
                            }
                        }
                        if (nell.length == 10)
                            return nell;
                    }
                    return nell;
                }

                $scope.types = {
                    devicetype1 : "OTN",
                    devicetype2 : "SDH",
                };
                $scope.selecteddevice=$scope.types.devicetype1;


                $scope.select=function () {
                    //  $scope.selecteddevice=selecteddevice;
                    $scope.isshow = true;
                    $('#inputValue').val("");//清空搜索框
                    $scope.nuList = [];
                    $scope.$emit('to-mainnu', $scope.nuList);
                    scene.clear();
                    $scope.curnetlist = [];//当前网元列表
                    $scope.curlinelist = [];//当前线列表
                    $scope.cururgentlist = [];//当前紧急告警的网元
                    getalarmcount();
                    getdirverinfo();
                    $scope.restore();
                }

                //鼠标点击放大
                $scope.zoomOut=function () {
                    if ($scope.scale<4) {
                        stage.zoomOut(0.5);
                        $scope.scale = $scope.scale * 2;
                        var tbl = $scope.scale * 100;
                        $scope.scaleshow = tbl.toString().split('.')[0] + "%";
                    }
                }

                //鼠标点击缩小
                $scope.zoomIn=function () {
                    if ($scope.scale>0.0625) {
                        stage.zoomIn(0.5);
                        $scope.scale = $scope.scale * 0.5;
                        var tbl = $scope.scale * 100;
                        $scope.scaleshow = tbl.toString().split('.')[0] + "%";
                    }
                }
            }]
    });
