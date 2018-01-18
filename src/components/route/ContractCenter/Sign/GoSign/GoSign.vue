<template>
    <div class="GoSign">
        <el-row>
            <el-button size="mini" @click="save">保存</el-button>
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
        save() {
            let _this = this;
            let base64Str = _this.objPdf.saveAsBase64();
            let params = {
                id: this.rowObj.id,
                url: base64Str
            };
            let url = '/ocm-web/api/cm/contract-mgr/upload-contract';
            _this.post(url, params)
                .then(res => {
                    debugger
                });
        }
    },
    mounted() {
        let _this = this;
        var objPdf = new BCPdfView(document.getElementById("PdfView").object);
        _this.objPdf = objPdf;
        _this.rowObj = _this.$route.params;
        this.objPdf.load('http://192.168.100.58/g1/M00/00/04/wKhkOlpfIIGAEA5jAAnTXMZLGkU304.pdf ');

    }
}
</script>
<style lang="scss" scoped>
@import './GoSign.scss';
</style>
