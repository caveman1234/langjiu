<template>
    <div class="GoSign">
        <el-row style="margin-bottom:10px;">
            <el-button size="mini" @click="save" type="primary">保存</el-button>
        </el-row>
        <object id="PdfView" classid="CLSID:80699FE6-C4F4-44EE-BE77-9D4D10D9CB10" width="100%" height="700px">

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
            //需要判断是否ie
            if (!_this.$util.isIE) {
                _this.$Notify({ title: '请用ie浏览器或360浏览器', type: 'warning' });
                return;
            }

            if (!_this.objPdf.isSigned()) {
                _this.$Notify({ title: '请签章后再保存', type: 'warning' });
                return;
            }


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
        }
    },
    mounted() {
        let _this = this;
        //需要判断是否ie
        if (!_this.$util.isIE) {
            _this.$Notify({ title: '请用ie浏览器或360浏览器', type: 'warning' });
            return;
        }
        var objPdf = new BCPdfView(document.getElementById("PdfView").object);
        _this.objPdf = objPdf;
        _this.rowObj = _this.$route.params.payload;
        //存在url
        if (_this.rowObj.attachment) {
            this.objPdf.load(_this.rowObj.attachment);
        }

    }
}
</script>
<style lang="scss" scoped>
@import './GoSign.scss';
</style>
