<template>
    <div class="BankList">
        <el-dialog title="请选择银行" @close="close" @open="open" :visible.sync="dialogVisible1" width="700px">
            <el-radio-group v-model="selectedBank" size="mini">
                <!-- <el-radio v-for="(item,index) in bankDataSource" :key="index" :label="item.label" border :disabled="item.disabled">{{item.name}}</el-radio> -->


                <el-radio v-for="(item,index) in bankDataSource" :key="index" :label="item.label" border :disabled="item.disabled">
                    <div :style='{backgroundImage:`url(${item.imgUrl})`}' class="radioImg"></div>
                </el-radio>



            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'BankList',
    props: {
        dialogVisible: {
            default() {
                return false;
            }
        },
        bankDataSource1: {
            default() {
                return [
                    {
                        name: "中国农业银行",
                        label: 'abc',
                        disabled: false,
                        imgUrl: require('./bankImg/bank_nong.png')
                    },
                    {
                        name: "中国民生银行",
                        label: 'cmbc',
                        disabled: true,
                        imgUrl: require('./bankImg/bank_min.png')
                    }
                    // {
                    //     name: "中国建设银行",
                    //     label: 'ccb'
                    // }
                ];
            }
        }
    },
    data() {
        return {
            dialogVisible1: this.dialogVisible,
            selectedBank: '',//选中的银行
            bankDataSource: this.bankDataSource1
        }
    },
    methods: {
        close() {
            this.$emit('update:dialogVisible', false);
            this.selectedBank = '';
        },
        open() {

        },
        cancel() {
            this.$emit('update:dialogVisible', false);
        },
        confirm() {
            if (this.selectedBank === '') {
                this.$Notify({ title: '请选择一个银行', type: 'warning' });
                return;
            }
            //关闭弹窗
            this.$emit('update:dialogVisible', false);
            //抛出选中的银行
            this.$emit('receiveSelectedBank', this.selectedBank);
        },
    },
    watch: {
        dialogVisible(val) {
            this.dialogVisible1 = val;
        }
    },
    mounted() { }
}
</script>
<style lang="scss">
@import './BankList.scss';
</style>

