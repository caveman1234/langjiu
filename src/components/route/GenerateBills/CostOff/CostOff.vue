<template>
    <div class="CostOff">
        <el-button @click="add" size="mini" type="primary">费用抵扣</el-button>
        <el-dialog :visible.sync="dialogVisible" width="1000" @close="handleClose" @open="handleOpen">
            <div class="CostOffTitle" slot="title">
                <h2 class="title">费用抵扣</h2>
            </div>
            <div class="dialogContainer">
                <el-row>
                    <el-col :span="3">订单总金额：</el-col>
                    <el-col :span="3">10000</el-col>
                    <el-col :span="4">使用折扣金额：</el-col>
                    <el-col :span="6">
                        <el-input v-model="useOffMoney" size="mini" placeholder="请输入折扣金额"></el-input>
                    </el-col>
                </el-row>
                <el-table :data="searchData" show-summary sum-text="合计" border style="width: 100%">
                    <el-table-column prop="moneyType" label="费用类型"></el-table-column>
                    <el-table-column prop="useableMoney" label="可用余额"></el-table-column>
                    <el-table-column prop="currentMoney" label="本次使用金额"></el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
let searchData = [
    {
        moneyType: 'E类',
        useableMoney: 2000,
        currentMoney: 1000,
    },
    {
        moneyType: 'Q类',
        useableMoney: 3000,
        currentMoney: 2000,
    },
    {
        moneyType: 'F类',
        useableMoney: 4000,
        currentMoney: 3000,
    }
];
export default {
    name: 'AddNewGoods',
    props:["goodsData"],
    data() {
        return {
            searchUrl: '',
            dialogVisible: false,
            searchData: searchData,/* 选中的数据 */
            useOffMoney:'',/* 使用折扣金额 */
        }
    },
    methods: {
        add() {
            this.dialogVisible = true;
        },
        handleClose(done) {/* 关闭弹窗 */
            this.searchData = [];
        },
        handleOpen() {/* 打开弹窗 */
            // this.searchTable();
            console.log(this.goodsData)
        },
        cancel() {
            this.dialogVisible = false;
        },
        confirm() {
            let _this = this;
            _this.dialogVisible = false;
            let eventPayload = {

            };
            _this.$emit('CostOffEvent', eventPayload);
        },

        searchTable() {/* 异步获取数据 */
            let _this = this;
            let url = this.searchUrl;
            _this.$http.get(url, )
                .then(res => {
                    let data = res.data.data;
                    _this.searchData = data;
                });
        }
    },
    mounted() {
        
    }
}
</script>
<style lang="scss">
@import './CostOff.scss';
</style>

