<template>
    <div class="GoSign">
        <el-row style="margin-bottom:10px;">
            <el-button size="mini" @click="goBack" type="plain">返回</el-button>
            <el-button size="mini" @click="save" type="primary">提交</el-button>
        </el-row>
        <object id="PdfView" classid="CLSID:80699FE6-C4F4-44EE-BE77-9D4D10D9CB10" width="100%" height="700px" style="position: relative;z-index: 1;">

            <param name="enableOpen" value="true" />

            <param name="enableSave" value="true" />

            <param name="showPath" value="true" />

        </object>
    </div>
</template>
<script>
export default {
    name: 'GoSign',
    data() {
        return {
            objPdf: {},
            rowObj: {},
            currentHost: location.protocol + "//" + location.hostname,
            //页面进来时的签章数量
            inCount:0,
            //页面提交的签章数量
            outCount:0
        }
    },
    methods: {
        //保存
        save() {
            let _this = this;
            // if (!_this.$util.isIE) {
            //     _this.$Notify({ title: '请使用ie浏览器', type: 'warning' });
            //     return;
            // }

           


            let base64Str = _this.objPdf.saveAsBase64();
            let params = {
                id: _this.rowObj.id,
                url: base64Str
            };
            let url = '/ocm-web/api/cm/contract-mgr/upload-contract';
            _this.$http.post(url, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        _this.$router.push({ name: 'ContractCenter' });
                    }
                });
        },
        goBack(){
            this.$router.go(-1);
        }
    },
    mounted() {
        let _this = this;
        // if (!_this.$util.isIE) {
        //     _this.$Notify({ title: '请使用ie浏览器', type: 'warning' });
        //     return;
        // }
        var objPdf = new BCPdfView(document.getElementById("PdfView").object);
        _this.objPdf = objPdf;
        _this.rowObj = _this.$route.params.payload;
        //存在url
        if (_this.rowObj.attachment) {
            _this.objPdf.load(`${_this.currentHost}${_this.rowObj.attachment}`);
        }

    }
}
</script>
<style lang="scss" scoped>
@import './GoSign.scss';
</style>
