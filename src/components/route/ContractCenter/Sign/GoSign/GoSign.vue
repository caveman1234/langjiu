<template>
    <div class="GoSign">
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
    mounted(){
        var objPdf = new BCPdfView(document.getElementById("PdfView").object);
        debugger
    }
}
</script>
<style lang="scss" scoped>
@import './GoSign.scss';
</style>
