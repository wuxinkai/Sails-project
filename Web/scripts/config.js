(function (window) {
    var tescomm = {};

    tescomm.config = {};

    tescomm.config.system = {
        version: "2.1.0"
        , ApiService: "http://localhost:1337/"//后台服务地址

         , AuthorizeService: "http://101.201.107.141:18005/"//鉴权服务所在的地址http://
      // , AuthorizeService: "http://localhost:16646/"//鉴权服务所在的地址http://
    }

    tescomm.config.app = {
        Id:'InMonitor',
        // IndexHref:'main.uiGrid'
        IndexHref:'main'
    }

    window.tescomm = tescomm;
})(window)