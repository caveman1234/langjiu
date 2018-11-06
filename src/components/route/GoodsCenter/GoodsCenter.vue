<template>
    <div class="GoodsCenter">
        <div class="treeList">
            <div class="treeTitle">商品分类</div>
            <el-tabs @tab-click="tabClick"
                tab-position="left">
                <el-tab-pane v-for="(item,index) in leftItems"
                    :key="index"
                    :label="item.name"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="goodsItems">
            <template v-for="(item,index) in goodsData">
                <GoodsItem @itemClick="itemClick"
                    :birefData="item"
                    :key="index"
                    class="items"></GoodsItem>
            </template>
        </div>
        <div @click="goBuyGoods"
            class="goBuyGoods">去结算
            <i>{{selectedCount}}</i>
        </div>
         <el-dialog
            title="待办事项提醒"
            :visible.sync="dialogVisible1"
            width="500px"
            :show-close="false"
            :close-on-press-escape="false"
            :close-on-click-modal="false">
            <div class="msgDialogContent">
                <h3 style="margin-bottom:15px;">为提高对您的服务质量，下订单前麻烦您请先填报以下调查表！</h3>
                <div v-for="(item,i) in needForceInquiryArr" :key="i">
                    <span>调查表名称：</span>
                    <span>{{item.title}}</span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="goFillInquiry" size="mini">去填写</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import GoodsItem from './GoodsItem/GoodsItem';
import { mapActions, mapState, mapMutations } from 'Vuex';
let leftItems = ['红花郎1', '红花郎2', '红花郎3', '红花郎4'];
export default {
    name: 'GoodsCenter',
    components: { GoodsItem },
    data() {
        return {
            leftItems: [],/* 左边列表 */
            goodsData: [],/* 商品列表--- */
            dialogVisible1: false,
            needForceInquiryArr:[]
        }
    },
    computed: {

    },
    methods: {
        tabClick(item) {
            /* 设置产品线 */
            this.$store.commit('prodGroupId', this.leftItems[item.index].prodGroupId);
            let selectedObj = this.leftItems.find(v => v.name == item.label)
            let paramsWrap = {
                params: {
                    prodGroupId: selectedObj.prodGroupId,
                    customerId: this.$store.state.customerId
                }
            }
            this.$http.get('/ocm-web/api/base/prod/search-for-purchase-order', paramsWrap)
                .then(res => {
                    let goodsData = res.data.map(v => Object.assign(
                        {},
                        v,
                        {
                            hasPurchase: false,
                            imageUrl: v.imageUrl ? `${v.imageUrl}@217w217h` : ''
                        }));
                    this.goodsData = goodsData;
                });
        },
        itemClick({ productId }) {
            let currentObj = this.goodsData.find(v => v.productId == productId);
            currentObj.hasPurchase = !currentObj.hasPurchase;
        },
        goBuyGoods() {
            let selectedData = this.goodsData.filter(v => v.hasPurchase);
            if (this.selectedCount > 0) {
                /* 查看态 */
                // this.$router.push({ name: 'GenerateBills', params: { selectedData } });
                /* 编辑态 */
                this.$router.push({ name: 'GenerateBillsEdit', params: { selectedData } });
            }
        },
        goFillInquiry() {
            //去填写调查表
            this.$router.push({name:"Inquiry"});
        },
        fetchInquiry() {
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId,
                    title: "调查反馈表"
                }
            }
            let url = "/ocm-web//api/noticeQuestionary/zdpageQuery";
            return this.$http.get(url, paramsWrap)
                .then(res => {
                    let needForceInquiry = res.data.content.some(v => {
                        return  v.fillState === 0 && v.endDate > (new Date().getTime());
                    });
                    this.needForceInquiryArr = res.data.content;
                    if(needForceInquiry){
                        this.dialogVisible1 = true;
                    }
                    return needForceInquiry;
                })
        }
    },
    mounted() {
        let _this = this;
        //获取必须填写的调查表
        _this.fetchInquiry();
        /* 导航 */
        _this.$store.commit('changeCurrentNav', { hash: '/GoodsCenter' });

        let params = {
            params: {
                customerId: this.$store.state.customerId
            }
        };

        /* 请求左边列表 */
        _this.$http.get('/ocm-web/api/base/prodline/get-mgr-list', params)
            .then(res => {
                let leftItems = res.data.map(v => ({ name: v.name, prodGroupId: v.id }));
                _this.leftItems = leftItems;
                /* 请求第一列商品类表 */
                let paramsWrap = {
                    params: {
                        prodGroupId: _this.leftItems[0].prodGroupId,
                        customerId: _this.$store.state.customerId
                    }
                }
                _this.$http.get('/ocm-web/api/base/prod/search-for-purchase-order', paramsWrap)
                    .then(res => {
                        let goodsData = res.data.map(v => {
                            return Object.assign(
                                {},
                                v,
                                {
                                    hasPurchase: false,
                                    imageUrl: v.imageUrl ? `${v.imageUrl}@217w217h` : ''
                                })
                        });
                        _this.goodsData = goodsData;
                        /* 设置产品线 */
                        _this.$store.commit('prodGroupId', _this.leftItems[0].prodGroupId);
                    });
            });

    },
    computed: {
        selectedCount() {
            return this.goodsData.filter(v => v.hasPurchase).length;
        }
    }
}
</script>
<style lang="scss">
@import "./GoodsCenter.scss";
</style>

