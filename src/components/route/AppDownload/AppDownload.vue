<template>
  <div class="AppDownload">
    <div class="qrCode">
      <div>android下载</div>
      <!-- <div id="l-qrcode-android" class="qrcode-img"></div> -->
      <vue-qr 
        :logoSrc=bgSrc 
        :text= androidUrl
        :size="200" 
        colorDark="#E7442E"
        colorLight="#ffffff"
        :margin="10"
      />
    </div>
    <div class="qrCode">
      <div>ios下载</div>
      <!-- <div id="l-qrcode-ios" class="qrcode-img"></div> -->
      <vue-qr 
        :logoSrc=bgSrc 
        :text= iosUrl
        :size="200" 
        colorDark="#E7442E"
        colorLight="#ffffff"
        :margin="10"
      />
    </div>
    
  </div>
</template>
<script>
import VueQr from 'vue-qr';
export default {
  name: "AppDownload",
  components: { VueQr },
  data() {
    return {
      bgSrc: require('@/assets/images/logo-img.png'),
      androidUrl: 'https://mbs.yyuap.com/ump/config/select/download?tablename=worklog_install&worklogid=21701&filename=ljjxs.apk',
      iosUrl: 'https://itunes.apple.com/cn/app/%E9%83%8E%E9%85%92%E6%95%B0%E5%AD%97%E8%90%A5%E9%94%80%E7%B3%BB%E7%BB%9F/id1352861913',
    }
  },
  methods: {
    generateQRcode(domId, text) {
      let qrcode = new QRCode(document.getElementById(domId), {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#E7442E",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  },
  mounted() {
    // this.generateQRcode("l-qrcode-android", this.androidUrl);
    // this.generateQRcode("l-qrcode-ios", this.iosUrl);
  }
}
</script>
<style lang="scss" scoped>
.AppDownload {
  min-height: 800px;
  background: white;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  .qrCode {
    text-align: center;
    .qrcode-img {
      padding: 10px;
    }
  }
}
</style>

