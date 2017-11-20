define([
    'scripts/services/httpService',
    'scripts/requireHelper/requireNotification',//插件消息提示
], function () {
    return ['$scope','Notification','httpService', function ($scope,Notification,httpService) {

// （1）input[text]
        $scope.parameter=[
            {name:'ngModel',type:'string',describe:'绑定的数据'},
            {name:'name (optional)',type:'string',describe:'名称, form的name加input的name，可以实现验证功能，比如myForm.input.$error'},
            {name:'required (optional)',type:'string',describe:'不能为空的验证设置'},
            {name:'ngRequired (optional)',type:'string',describe:'设置是否验证'},
            {name:'ngMinlength (optional)',type:'number',describe:'设置最小长度的验证'},
            {name:'ngMaxlength (optional)',type:'number',describe:'设置最大长度的验证，设置负数或非数字将没有最大长度的验证'},
            {name:'ngPattern (optional)',type:'string',describe:'验证表达式'},
            {name:'ngChange (optional)',type:'string',describe:'值改变时触发事件'},
            {name:'ngTrim (optional)',type:'string',describe:'如果设置为false将不会自动去掉输入空的前后空格，这个属性不适用于input[type=password],input[type=password]不能去掉前后的空格'}];
        //验证
        $scope.userType = 'guest';
        $scope.word = /^\s*\w*\s*$/; //匹配是否有空格

//(2)input[number]
        $scope.number=[
            {name:'ngModel',type:'string',describe:'绑定的数据'},
            {name:'name (optional)',type:'string',describe:'名称'},
            {name:'min (optional)',type:'string',describe:'设置最小的验证值，如果输入值小于mint提示错误，这必须是一个有效的ISO日期字符串（yyyy-mm-dd）。'},
            {name:'max (optional)',type:'string',describe:'设置最大验证值，如果输入值大于最大提示错误。这必须是一个有效的ISO日期字符串（yyyy-mm-dd）。'},
            {name:'ngRequired (optional)',type:'string',describe:'设置是否验证'},
            {name:'required (optional)',type:'bool',describe:'验证不能为空'},
            {name:'ngChange (optional)',type:'string',describe:'值改变时触发事件'},
            {name:'ngMinlength (optional)',type:'number',describe:'设置值的最小长度，如果超出这个最小长度提示验证错误。'},
            {name:'ngMaxlength (optional)',type:'number',describe:'设置值的最大长度，如果超出这个最大长度提示验证错误。'},
            {name:'pattern (optional)',type:'string',describe:'类似ngpattern除了属性值将被转换为一个正则表达式在ngpattern指导实际的字符串。'},
            {name:'ngPattern (optional)',type:'string',describe:'设置表达式验证，如果ngmodel值不匹配一个正则表达式将提示错误。如果表达式计算为RegExp对象则是直接使用。如果表达式是一个字符串，然后将其转换为一个正则表达式它包裹在^ $字符后。例如，“ABC”会被转换成新的正则表达式（“ABC”^美元）。'},
        ];
        $scope.valueNumber = 23;

//(3)input[checkbox]
        $scope.CheckBox=[
            {name:'ngModel',type:'string',describe:'绑定的数据'},
            {name:'name (optional)',type:'string',describe:'名称'},
            {name:'ngTrueValue (optional)',type:'expression',describe:'选中的值'},
            {name:'ngFalseValue (optional)',type:'expression',describe:'未选中的值'},
            {name:'ngChange (optional)',type:'string',describe:'值改变时触发事件'},
        ];
        $scope.value1 = true;
        $scope.value2 = 'true的时候显示';
        $scope.master = true;

    //ng-change事件
        $scope.confirmed =true;
        $scope.counter = 0;
        $scope.change = function () {
            $scope.counter++;
        };

//(4)input[radio]
        $scope.radio=[
            {name:'ngModel',type:'string',describe:'绑定的数据'},
            {name:'name (optional)',type:'string',describe:'名称'},
            {name:'value',type:'string',describe:'选择中时的值。'},
            {name:'ngValue (optional)',type:'string',describe:'选择中时的值（表达式）。'},
            {name:'ngChange (optional)',type:'string',describe:'值改变时触发事件'},
        ];
        $scope.color = '蓝色blue'; //默认项目
        $scope.specialValue = {
            "id": "12345",
            "value": "green"
        };

//(5) ng-class 或 ng-class-odd 或 ng-class-even
        $scope.CheckBox=[
            {name:'ngClass',type:'expression',describe:'添加的类'},
        ];

//(6)ngList
        $scope.CheckBox=[
            {name:'ngList',type:'string',describe:'分隔符'},
        ];

//（7）ngpluralize
        $scope.person1 = '刘德华';
        $scope.person2 = '杨幂';
        $scope.personCount = 1;
        $scope.ngpluralize=[
            {name:'count',type:'expression||string',describe:'绑定判断的值。'},
            {name:'when',type:'string',describe:'判断语句。'},
            {name:'offset (optional)',type:'number',describe:'偏移量。'},
        ];

//ngrepeat
        $scope.ngrepeat=[
            {name:'$index',type:'number',describe:'循环的索引值'},
            {name:'$first',type:'boolean',describe:'是否第一次循环'},
            {name:'$middle',type:'boolean',describe:'是否第一次和最后一次循环之间的循环'},
            {name:'$last',type:'boolean',describe:'是否最后一次循环'},
            {name:'$even',type:'boolean',describe:'是否循环的次数$index为偶数'},
            {name:'$odd',type:'boolean',describe:'是否循环的次数$index为奇数'},

        ];
        $scope.friends = [
            {name:'周杰伦', age:25, gender:'男'},
            {name:'桂纶镁', age:30, gender:'女'},
            {name:'李嘉欣', age:28, gender:'女'},
            {name:'林俊杰', age:15, gender:'男'},
            {name:'钟丽缇', age:28, gender:'女'},
            {name:'任港秀', age:95, gender:'女'},
            {name:'周渝民', age:50, gender:'男'},
            {name:'范文芳', age:27, gender:'女'},
            {name:'甄子丹', age:40, gender:'男'},
            {name:'翁美玲', age:60, gender:'女'}
        ];

//ng-click
        $scope.list = [];
        $scope.text = '默认提交内容';
        $scope.submit = function () {
            console.log($scope.text)
            if ($scope.text) {
                $scope.list.push(this.text);
                $scope.text = '';
            }
        };

//  ng-switch-when 和ng-srcset
        $scope.items = ['settings', 'home', 'other'];
        $scope.selection = $scope.items[0];

//ng-value
        $scope.names2 = ['选项1', '选项2', '选项3'];
        $scope.my = { favorite: '---默认项' };
    }];
});