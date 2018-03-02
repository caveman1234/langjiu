<template>
    <div class="BankList">
        <el-dialog title="请选择地址" @close="close" @open="open" :visible.sync="dialogVisible1" width="700px">
            
            <el-select v-model="selectedAddress" size="mini" placeholder="请选择" style="width:100%">
                <el-option
                v-for="item in addressDataSource"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>


            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

export default {
    name: 'SelectAddress',
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
            selectedAddress: '',//选中的地址
            addressDataSource: []
        }
    },
    methods: {
        close() {
            this.$emit('update:dialogVisible', false);
            this.selectedAddress = '';
        },
        open() {
            this.fetchAddress();
        },
        cancel() {
            this.$emit('update:dialogVisible', false);
        },
        confirm() {
            if (this.selectedAddress === '') {
                this.$Notify({ title: '请选择一个收货地址', type: 'warning' });
                return;
            }
            //关闭弹窗
            this.$emit('update:dialogVisible', false);
            //抛出选中的银行
            this.$emit('receiveSelectedAddress', this.selectedAddress);
        },
        fetchAddress() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            }
            _this.$http.get('/ocm-web/api/base/customer/get-addr-List', paramsWrap)
                .then(res => {
                    let addressDataSource = res.data.map(v => ({ value: v.id, label: v.addressDetail }));
                    _this.addressDataSource = addressDataSource;
                    console.log(_this.addressDataSource)
                });
        }
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
@import './SelectAddress.scss';
</style>

