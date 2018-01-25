function BCPdfView(pdfobj) {
    
        this.pdfObject = pdfobj;  //��ʼ��pdf����
    
    }
    
    
    
    BCPdfView.prototype = {
    
        load: function (url) {    //�����ĵ�����
    
            this.pdfObject.load(url);
    
        },
    
        save: function(url){        //�����ĵ�
    
            this.pdfObject.save(url);
    
        },
    
        saveAsBase64: function () {      //����Ϊbase64����
    
            return this.pdfObject.save("base64");
    
        },
    
        signSeal: function (param) {     //����
    
            if (arguments.length > 0) {
    
                this.pdfObject.stamp(param);
    
            } else {
    
                this.pdfObject.stamp();
    
            }
    
        },
    
        listSeals: function () {    //��ȡӡ���б�
    
            return this.pdfObject.listSeals();
    
        },
    
        setProperties: function (arrProperties) { //����PDF�м������
    
            this.pdfObject.setProperties(arrProperties);
    
        },
    
        isSigned:function(){    //�ĵ����Ƿ���ӡ��
    
            return this.pdfObject.isSigned();
    
        },
    
        print: function () {    //��ӡ
    
            this.pdfObject.print();
    
        },
    
        exPrint: function(){
            this.pdfObject.exPrint();
        },
    
        setPrintCount: function(){
            return this.pdfObject.setControlPrintCount();
        },
    
        getPageCount:function(){    //��ȡ�ĵ�ҳ��
    
            return this.pdfObject.getPageCount();
    
        },
    
        gotoPage: function (pageIndex) {    //������pageIndexҳ
    
            this.pdfObject.goToPage(pageIndex);
    
        },
    
        search: function (content) {    //�����ؼ���
    
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
            return this.pdfObject.removeSeal();
        },
        ridingStamp: function(){
            this.pdfObject.ridingStamp();
        },
        finishStamp: function(tag){
            this.pdfObject.finishStamp(tag);
        }
    };