<template>
    <div class="MsgContent">
        <div class="msgTitle">{{msgContent.title}}</div>
        <div class="msgTime">发布时间：{{msgContent.creationTime|formatDate}}</div>

        <div class="fujianContainer">
            <div v-if="msgContent.files.length > 0">
                <div class="fujianTitle">附件：</div>
                <template v-for="(item,index) in msgContent.files">
                    <div class="fujianItem"
                        :key="index">
                        <i class="icon iconfont lj-fujian"></i>
                        <a :href="origin + item.url"
                            target="__blank">{{item.filename}}</a>
                    </div>
                </template>
            </div>
        </div>

        <div class="msgContainer"
            v-html="msgContent.content"></div>

    </div>
</template>
<script>
let msgContent = {
    "noticeStyleId": null,
    "noticeStyleCode": null,
    "noticeStyleName": null,
    "title": "标题",
    "content": "<p>内容</p>",
    "isEnable": 1,
    "id": "f234ae3d-3f97-43e5-8353-396bd3cd9b16",
    "dr": 0,
    "ts": 1514731373000,
    "creator": "langjiu",
    "creationTime": 1513919133000,
    "modifier": null,
    "modifiedTime": null,
    "files": [
        {
            "filename": "2017122613315631563543694513260126865.pdf",
            "filepath": "f234ae3d-3f97-43e5-8353-396bd3cd9b16",
            "id": "sOwgK30wk7SP8OSr6wM",
            "filesize": "93088",
            "groupname": "ygdemo",
            "url": "/g1/M00/00/03/wKhkOlpIWMCABh4ZAAFroM3BnKM885.pdf",
            "uploadtime": "2017-12-31 11:25:52"
        }
    ]
}
export default {
    name: 'MsgContent',
    data() {
        return {
            msgContent: {
                files: []
            },
            origin: ''
        }
    },
    mounted() {
        let _this = this;
        _this.msgContent = _this.$route.params.msgContent;
        _this.origin = location.protocol + "//" + location.hostname;
    }
}
</script>
<style lang="scss">
@import './MsgContent.scss';
</style>
