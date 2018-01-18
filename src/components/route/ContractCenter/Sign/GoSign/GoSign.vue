<template>
    <div class="GoSign">
        <el-row style="margin-bottom:10px;">
            <el-button size="mini" @click="save" type="primary">保存</el-button>
            <el-button size="mini" @click="signSeal" type="primary">签章</el-button>
        </el-row>
        <object id="PdfView" classid="CLSID:80699FE6-C4F4-44EE-BE77-9D4D10D9CB10" width="1000" height="640" style="border:solid 1px red">

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
            rowObj: {}
        }
    },
    methods: {
        //保存
        save() {
            let _this = this;

            if (!_this.objPdf.isSigned()) {
                _this.$Notify({ title: '请签章后再保存', type: 'warning' });
                return;
            }


            let base64Str = _this.objPdf.saveAsBase64();
            let params = {
                id: this.rowObj.id,
                url: base64Str
            };
            let url = '/ocm-web/api/cm/contract-mgr/upload-contract';
            _this.$http.post(url, params)
                .then(res => {
                    debugger
                });
        },
        //盖章
        signSeal(){
            let _this = this;
            _this.signSeal();
        }
    },
    mounted() {
        let _this = this;
        var objPdf = new BCPdfView(document.getElementById("PdfView").object);
        if(!objPdf.load){
            // _this.$Notify({ title: '请', type: 'warning' });
            return;
        }
        _this.objPdf = objPdf;
        _this.rowObj = _this.$route.params.payload;
        this.objPdf.load('http://192.168.100.58/g1/M00/00/04/wKhkOlpfIIGAEA5jAAnTXMZLGkU304.pdf ');

    }
}
</script>
<style lang="scss" scoped>
@import './GoSign.scss';
</style>
