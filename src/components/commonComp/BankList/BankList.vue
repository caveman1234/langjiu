<template>
    <div class="BankList">
        <el-dialog title="请选择银行" @close="close" @open="open" :visible.sync="dialogVisible1" width="700px">
            <el-radio-group v-model="selectedBank" size="mini">
                <el-radio v-for="(item,index) in bankDataSource" :key="index" :label="item.label" border>{{item.name}}</el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
let bankGong = require('./bankImg/bank_gong.png');
let bankDataSource = [
    {
        name: "民生银行",
        label: '1'
    },
    {
        name: "农业银行",
        label: '2'
    }
];
export default {
    name: 'BankList',
    props: {
        dialogVisible: {
            default() {
                return false;
            }
        }
    },
    data() {
        return {
            dialogVisible1: this.dialogVisible,
            selectedBank: '',//选中的银行
            bankDataSource: bankDataSource,
            bankGong: bankGong
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

