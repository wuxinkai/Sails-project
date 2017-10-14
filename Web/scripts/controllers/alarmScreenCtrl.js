define(['cookie', 'scripts/requireHelper/requireNotification','bower_components/jquery.nicescroll/dist/jquery.nicescroll.min', 'scripts/controllers/index/alarmScrollDirt', 'scripts/controllers/index/faultMonitoringDirt', 'scripts/controllers/index/elementCountDirt', 'scripts/controllers/index/AlarmIndexDirt',  'scripts/controllers/index/GISTopoDirt', 'scripts/controllers/index/historicalTrendChartDirt'], function () {
    return ['$scope','Notification', function ($scope,Notification) {
        $(".asReturn").hide();
        $scope.btnHide =true;
        $scope.time = 60000 ;
        $scope.goHistory = function(){

        }
        var BoxAnime = {
            init: function (obj) {
                this.params = {};
                this.params.rowNum = 3;
                this.params.height = 500;
                this.params.paddingRight = 15;
                this.params.paddingTop = 15;
                this.params = $.extend(this.params,obj);
                this.params.defaultWidth = $(this.params.element).width()/this.params.rowNum-5;
                this.params.defaultHeight = ($(window).height()-$('.as-time').height())/2-10;
                var windwHeight = $(window).height()-$('.as-time').height();
                var windwWidth = $(window).width();
                var scale = (windwHeight-($(this.params.element).find(".tes-box").length)*this.params.paddingTop)/($(this.params.element).find(".tes-box").length-1)/this.params.defaultHeight;
                if(!this.params.scale){
                    this.params.scale = scale;
                }
                this.params.minWidth = this.params.defaultWidth*this.params.scale;
                this.params.minHeight = this.params.defaultHeight*this.params.scale;
                this.params.maxWidth = windwWidth-(this.params.minWidth+30)-20;
                this.params.maxHeight = windwHeight-26;
                this.initStyle();
                return this;
            },
            anime: function (e, index) {
                this.recovery(e,index);
            },
            recovery:function(e,newIndex){
                var self = this, params = this.params;
                this._activeIndex = newIndex;
                //返回右侧导航栏
                var _i = 0;
                $(params.element).find(".tes-box").each(function(){
                    $(this).unbind("click");
                    if ($(params.element).find(".tes-box").index(this) != newIndex) {
                        $(this).css("left", "inherit");
                        $(this).css("transform", "scale("+params.scale+")");
                        var thisWidth =self.params.defaultWidth;
                        var thisHeight =self.params.defaultHeight;
                        var height = thisHeight*params.scale;
                        $(this).animate({
                            right: -(thisWidth*((1-params.scale)/2)-params.paddingRight)+'px',
                            top: height * _i-(thisHeight*((1-params.scale)/2))+(params.paddingTop*(_i+1)),
                            width:self.params.defaultWidth,
                            height:self.params.defaultHeight
                        });
                        $(this).bind("click", function () {
                            $(".asReturn").hide();
                            self.recovery(this,$(params.element).find(".tes-box").index(this));
                        })
                        _i = _i + 1;
                    }
                });
                $(e).css("right", "inherit");
                $(e).css("transform", "scale(1)");
                $(e).animate({
                    width:this.params.maxWidth,
                    height:this.params.maxHeight,
                    left: 0,
                    top: 15
                });
                if(typeof self.params.click==="function"){
                    self.params.click(e,newIndex);
                }
            },
            close: function () {
                var self = this,
                    params = this.params;
                var _i = 0;
                $(params.element).find(".tes-box").each(function () {
                    $(this).css("transform", "scale(1)");
                    $(this).css("right", "inherit");
                    var index = $(params.element).find(".tes-box").index(this);
                    if (index > self.params.rowNum)var marginTop = Math.ceil(index / 4) * self.params.height;
                    var num = index%self.params.rowNum;
                    if(num==0){
                        _i = _i+1
                    }
                    $(this).animate({
                        width:self.params.defaultWidth,
                        height:self.params.defaultHeight,
                        top:self.params.defaultHeight*(_i-1),
                        left:num*self.params.defaultWidth
                    })
                });
                $(params.element).find(".tes-box").eq(this._activeIndex).unbind("click");
                var isactive = false
                $(params.element).find(".tes-box").eq(this._activeIndex).bind("click",function(){
                    if(isactive){
                        self.recovery(this,$(params.element).find(".tes-box").index(this));
                    }
                    isactive = true;
                });
            },
            initStyle: function () {
                $('.as-container').height($(window).height()-$('.as-time').height()-20);
                var self = this,
                    params = this.params;
                var _i = 0;
                $(params.element).find(".tes-box").each(function () {
                    $(this).css("transform", "scale(1)");
                    $(this).css("right", "inherit");
                    var index = $(params.element).find(".tes-box").index(this);
                    if (index > self.params.rowNum)var marginTop = Math.ceil(index / params.rowNum) * self.params.height;
                    var num = index%self.params.rowNum;
                    if(num==0){
                        _i = _i+1
                    }
                    $(this).animate({
                        width:self.params.defaultWidth,
                        height:self.params.defaultHeight,
                        top:self.params.defaultHeight*(_i-1),
                        left:num*self.params.defaultWidth
                    })
                })
                this.active();
            },
            active:function(){
                var self = this,
                    params = this.params;
                $(params.element).find(".tes-box").each(function () {
                    var index = $(params.element).find(".tes-box").index(this);
                    $(this).unbind("click");
                    $(this).bind("click", function () {
                        self.anime($(this), index);

                    })
                });
            }
        };
        $scope._prevIndex = null;
        var be = BoxAnime.init({
            rowNum: 3,
            element: $('.as-container'),
            click:function(element,index){
                if($scope._prevIndex!=null){
                    $scope.$broadcast('to-child', 'cancel|'+$scope._prevIndex);
                }
                $scope.isClick = true;
                $scope.isFmClick = true;
                $scope.isHTCClick = true;
                $(".asReturn"+index).show();
                $scope.$broadcast('to-child', 'enlarge|'+index);
                $scope._prevIndex = index
            }
        });
        $scope.isClick = true;
        $scope.isFmClick = true;
        $scope.isHTCClick = true;
        $scope.tesBoxMinHeight = be.params.defaultHeight;
        $scope.tesBoxMaxHeight = be.params.maxHeight;
        $scope.tesBoxMinWidth = be.params.defaultWidth;
        $scope.tesBoxMaxWidth = be.params.maxWidth;


        $scope.clickFun = function(index){
            be.close();
            $scope._prevIndex = null;
            $scope.$broadcast('to-child', 'cancel|'+index);
        };
        setInterval(function(){
            $scope.$apply(function(){
                initdate();
            });

        },1000);

        function initdate(){
            var date = new Date()
            $scope.FullYear =date.getFullYear();
            $scope.Month =date.getMonth()+1;
            $scope.DateDay =date.getDate();
            $scope.Minutes =date.getMinutes();
            $scope.Hours =date.getHours();
            $scope.Seconds =date.getSeconds();
        }
        initdate();
    }]
});