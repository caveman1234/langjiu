<template>
    <div class="PurchaseBills">
        <div class="header">
            <div class="button">进货单</div>
        </div>
        <div class="tableHeader">
            <div class="tableCheckbox">
                <el-checkbox v-model="isAllChecked" @change='allChange'>全选</el-checkbox>
            </div>
            <div class="goodsInfo">商品信息</div>
            <div class="standard">规格</div>
            <div class="price">单价</div>
            <div class="amount">数量／箱</div>
            <div class="totalPrice">总额</div>
        </div>
        <div class="tableBody">
            <div v-for='(item,index) in PurchaseBillsData' :key='index' class="tableBodyContent">
                <div class="tableCheckbox">
                    <el-checkbox v-model="item.isSelected" @change='(value) => itemChange(value,item.id)'></el-checkbox>
                </div>
                <div class="goodsInfo">
                    <div class="content">
                        <div class="goodsImg" :style='{backgroundImage:`url(${item.goodsImg})`}'></div>
                        <div class="goodsDesc">{{item.goodsDetail}}</div>
                    </div>
                </div>
                <div class="standard">
                    <div class="content">
                        <div>容量：{{item.volume}} ml</div>
                        <div>度数：{{item.strength}} 度</div>
                    </div>
                </div>
                <div class="price">
                    <div class="content">¥{{item.price}}</div>
                </div>
                <div class="amount">
                    <div class="content">
                        <el-input-number @change="(v)=>amountChange(v,item.id)" v-model="item.amount" :min="0" size="small"></el-input-number>
                    </div>
                </div>
                <div class="totalPrice">
                    <div class="content">
                        ¥{{item.totalAmount}}
                    </div>
                </div>
            </div>
        </div>
        <div class="tableFooter">
            <el-row>
                <el-col :span="12">
                    <el-button @click="delSelected" size="small" type="success" style="margin-top:15px;">删除选中商品</el-button>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="9">
                            <div class="totalCount">
                                共计{{purchaseBillsCount}}件商品
                            </div>
                        </el-col>
                        <el-col :span="9">
                            <div class="totalAmount">
                                <span class="text">总额：¥</span>
                                <span class="num">{{purchaseBillsTotalAmount}}</span>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div @click="GenerateBills" class="submitbutton">去结算</div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from 'Vuex';
export default {
    name: 'PurchaseBills',
    data() {
        return {
            // isAllChecked: false
        }
    },
    computed: {
        ...mapState({
            PurchaseBillsData(state) {
                return state.orderCenter.PurchaseBillsData
            }
        }),
        ...mapGetters({
            purchaseBillsCount: 'orderCenter/purchaseBillsCount',
            purchaseBillsTotalAmount: 'orderCenter/purchaseBillsTotalAmount',
            isAllChecked: 'orderCenter/isAllChecked'
        })
    },
    methods: {
        allChange(value) {
            this.$store.commit('orderCenter/selectAll', value);
        },
        itemChange(value, id) {
            this.$store.commit('orderCenter/changeInp', { value, id });
        },
        amountChange(amount, id) {
            this.$store.commit('orderCenter/changeInpNum', { amount, id });
        },
        delSelected() {
            this.$store.commit('orderCenter/delSelected');
        },
        GenerateBills() {
            let selectedData = this.PurchaseBillsData.filter(v => v.isSelected);
            this.$router.push({ name: 'GenerateBills', params: { selectedData } });
        }
    },
    mounted() {
        this.$store.dispatch('goodsCenter/fetchPurchaseCountAsync');
        this.$store.dispatch('orderCenter/fetchPurchaseBillsDataAsync');
    }
}
</script>
<style lang="scss">
@import './PurchaseBills.scss';
</style>

