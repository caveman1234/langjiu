function BCPdfView(pdfobj) {

    this.pdfObject = pdfobj;  //初始化pdf对象

}



BCPdfView.prototype = {

    load: function (url) {    //加载文档方法

        this.pdfObject.load(url);

    },

    save: function(url){        //保存文档

        this.pdfObject.save(url);

    },

    saveAsBase64: function () {      //保存为base64编码

        return this.pdfObject.save("base64");

    },

    signSeal: function (param) {     //盖章

        if (arguments.length > 0) {

            this.pdfObject.stamp(param);

        } else {

            this.pdfObject.stamp();

        }

    },

    listSeals: function () {    //获取印章列表

        return this.pdfObject.listSeals();

    },

    setProperties: function (arrProperties) { //设置PDF中间件属性

        this.pdfObject.setProperties(arrProperties);

    },

    isSigned:function(){    //文档中是否有印章

        return this.pdfObject.isSigned();

    },

    print: function () {    //打印

        this.pdfObject.print();

    },

    exPrint: function(){
        this.pdfObject.exPrint();
    },

    setPrintCount: function(){
        return this.pdfObject.setControlPrintCount();
    },

    getPageCount:function(){    //获取文档页数

        return this.pdfObject.getPageCount();

    },

    gotoPage: function (pageIndex) {    //调整到pageIndex页

        this.pdfObject.goToPage(pageIndex);

    },

    search: function (content) {    //搜索关键字

        return this.pdfObject.searchText(content);

    },
	
	hideMenu: function(){
		this.pdfObject.hideMenu();
	},
	
	showMenu: function(){
		this.pdfObject.showMenu();
	},
	
	multiStamp: function(){
		this.pdfObject.multiStamp();
	},
	
	keywordSearch: function(){
		this.pdfObject.keywordSearch();
	},
	
	handWritting: function(){
		this.pdfObject.handWritting();
	},
	
	verifySeal: function(){
		this.pdfObject.verifySeal();
	},
	
	removeSeal: function(){
		this.pdfObject.removeSeal();
	},
	ridingStamp: function(){
		this.pdfObject.ridingStamp();
	}

};