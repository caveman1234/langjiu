<template>
    <div class="CheckDialog">
        <el-dialog 
            :title="itemDetail.typeCode == 1 ? '往来款项征询函' : '费用征询函' " 
            :close-on-click-modal="false" 
            fullscreen 
            @close="close" 
            @open="open" 
            :visible.sync="visible"
            width="700px"
        >
            <div class="content">
                <p class="text title">至：{{itemDetail.customerName}}</p>
                <p class="text textIndent">首先感谢贵公司一直以来对郎酒的支持与关爱！</p>
                <p class="text textIndent">为使贵我双方费用账目清晰，我公司对截止日期:{{itemDetail.endDate | formatDate}}的费用账余额与贵公司进行核对。如与贵公司记录相符，请在账结论处选择“相符”。</p>
                <p class="text textIndent">如与贵公司记录不符，请选择“不符”，并注明不符事项。</p>
                <p class="text textIndent">收件人地址：{{itemDetail.address}}</p>
                <p class="text textIndent">收件人姓名：{{itemDetail.userName}}</p>
                <p class="text textIndent">收件人电话：{{itemDetail.userTel}}</p>
                <template v-if="itemDetail.typeCode == 2">
                    <el-table class="table" :data="itemDetail.reconciliationItems" border>
                        <el-table-column prop="endDate" label="截止日期">
                            <template slot-scope="scope">
                                <div>
                                    <div>{{scope.row.endDate | formatDate}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="产品线"></el-table-column>
                        <el-table-column prop="value" label="余额">
                            <template slot-scope="scope">
                                <div>
                                    <div>{{scope.row.value | formatInOut}}</div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <template v-if="itemDetail.typeCode == 1">
                    <el-table class="table" :data="itemDetail.reconciliationItems" border>
                        <el-table-column prop="endDate" label="截止日期">
                            <template slot-scope="scope">
                                <div>
                                    <div>{{scope.row.endDate | formatDate}}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="往来款项"></el-table-column>
                        <el-table-column prop="value" label="余额">
                            <template slot-scope="scope">
                                <div>
                                    <div>{{scope.row.value | formatInOut}}</div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
                <p class="text">注：1、以上余额如为正数，代表我公司欠贵公司；如为负数，代表贵公司欠我公司。</p>
                <p class="text textIndent">2、如贵公司需要查看明细，请登陆我公司crm系统查询。</p>
                <p class="text textIndent">3、本函仅为复核账目之用，烦请贵公司认真核对，并及时回函。</p>
                <p class="text textCenter margin-top-10">
                    <el-row>
                        <el-col :span="8" :push="16">{{itemDetail.companyName}}</el-col>
                    </el-row>
                </p>
                <p class="text textCenter">
                    <el-row>
                        <el-col :span="8" :push="16">{{itemDetail.creationTime | formatDate}}</el-col>
                    </el-row>
                </p>
                <p class="text">(盖章处)</p>
                <p class="text">
                    <span>数据核对结果：</span>
                    <el-radio-group v-model="result" size="small">
                        <el-radio label="1" border>相符</el-radio>
                        <el-radio label="2" border>不相符</el-radio>
                    </el-radio-group>
                </p>
                <div v-if="result == 2" class="expain margin-top-10">
                    <p class="text">差异数据说明如下：</p>
                    <el-input v-model="resultRemark" type="textarea" :rows="3"></el-input>
                </div>
                    

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
    name: 'CheckDialog',
    props: {
        dialogVisible: {
            default() {
                return false;
            }
        },
        detail: {
            default() {
                return {};
            }
        },
    },
    data() {
        return {
            result: '',//数据核对结果
            resultRemark: '',//不符说明
            visible: this.dialogVisible,
            itemDetail: {},
            tableData: [
                {
                    endDate: 1522077300981,
                    produceLine: '青花狼',
                    money: 300
                }
            ]
        }
    },
    methods: {
        close() {
            this.$emit('update:dialogVisible', false);
            this.itemDetail = {};
            this.result = '';
            this.resultRemark = '';
            this.tableData = [];
        },
        open() {
            this.itemDetail = this.detail;
            this.itemDetail.reconciliationItems.forEach(obj => {
                obj.endDate = this.itemDetail.endDate;
            });
        },
        confirm() {
            let _this = this;
            if(_this.result == 2 && _this.resultRemark == ''){
                this.$Notify({ title: '差异数据说明不能为空', type: 'warning' });
                return;
            }
            if (_this.result != '') {
                let params = {
                    id: this.itemDetail.id,
                    customerId: this.$store.state.customerId,
                    result: this.result,
                    resultRemark: this.resultRemark
                };
                this.$emit('confirmDialog', params);
                this.$emit('update:dialogVisible', false);
            } else {
                this.$Notify({ title: '请选择对账结果', type: 'warning' });
            }
        },
        cancle() {
            this.$emit('update:dialogVisible', false);
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
@import "./CheckDialog.scss";
</style>

