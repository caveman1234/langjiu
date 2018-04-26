<template>
    <div class="ReplyLetter">
        <el-dialog 
            title="回函" 
            :close-on-click-modal="false" 
            @close="close" 
            @open="open" 
            :visible.sync="visible"
            width="700px"
        >
            <div class="content">
                <el-row>
                    <span>请选择回函方式：</span>
                    <el-radio-group v-model="replyMethod" size="small">
                        <el-radio label="1" border>电子回函</el-radio>
                        <el-radio label="2" border>纸质回函</el-radio>
                    </el-radio-group>
                </el-row>
                <el-row style="margin-top:15px;">
                    <span>选择待上传文件：</span>
                    <i @click="selectFile" class="el-icon-upload" style="font-size:25px;cursor:pointer;"></i>
                    <span style="margin-left:40px;">{{fileName}}</span>
                    <template v-if="visible">
                        <input style="display:none;" type="file" id="replayLetterFile">
                    </template>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'ReplyLetter',
    props: {
        dialogVisible: {
            default() {
                return false;
            }
        },
        currentId: {
            default() {
                return '';
            }
        }
    },
    data() {
        return {
            visible: this.dialogVisible,
            replyMethod: '',
            suffix: '',//文件后缀名
            fileName: '',//选中的文件名
            file: null,//选中的文件
        }
    },
    methods: {
        close() {
            this.$emit('update:dialogVisible', false);
            this.replyMethod = '';
            this.suffix = '';
            this.fileName = '';
            this.file = null;
        },
        open() {
            let _this = this;
            _this.$nextTick(function () {
                $('#replayLetterFile').on('change', function () {
                    
                    let fileName = this.value.split('\\').pop();
                    let suffix = this.value.substr(this.value.lastIndexOf('.')+1);
                    _this.fileName = fileName;
                    _this.suffix = suffix;
                    _this.file = this.files[0];
                })
            });

        },
        confirm() {
            let _this = this;
            /* replyMethod
                1 电子回函
                2 纸质回函
            */
            if (_this.replyMethod == '') {
                _this.$Notify({ title: '请选择回函方式', type: 'warning' });
                return;
            }
            if (_this.replyMethod == 1 && _this.file == null) {
                _this.$Notify({ title: '请选择回函的pdf文件', type: 'warning' });
                return;
            }
            if (_this.replyMethod == 1 && _this.suffix != 'pdf') {
                _this.$Notify({ title: '请选择回函的pdf文件', type: 'warning' });
                return;
            }
            // if (_this.replyMethod == 2 && _this.suffix == 'pdf') {
            //     _this.$Notify({ title: '请选择回函的图片', type: 'warning' });
            //     return;
            // }
            debugger
            let params = new FormData();
            params.append('id', _this.currentId);
            params.append('file', _this.file);
            params.append('type', _this.replyMethod);
            params.append('filetype', _this.suffix);
            let remoteUrl = '/ocm-web/api/b2b/reconciliation/upload-reconciliation-file';
            let headersWrap = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            _this.$http.post(remoteUrl, params, headersWrap)
                .then(res => {
                    //刷新页面
                    if (res.headers["x-ocm-code"] == '1') {
                        _this.$emit('update:dialogVisible', false);
                        _this.$emit('replyLetterConfirm');
                    }
                })
        },
        cancle() {
            this.$emit('update:dialogVisible', false);
        },
        //选择文件
        selectFile() {
            $('#replayLetterFile').trigger('click')
        }
    },
    mounted() {

    },
    watch: {
        dialogVisible(value) {
            this.visible = value;
        }
    }
}
</script>
<style lang="scss">
@import "./ReplyLetter.scss";
</style>
