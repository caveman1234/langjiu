<template>
    <div class="GoodsCenter">
        <div class="treeList">
            <el-tabs @tab-click="tabClick" tab-position="left">
                <el-tab-pane v-for="(item,index) in leftItems" :key="index" :label="item.name"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="goodsItems">
            <template v-for="(item,index) in goodsData">
                <GoodsItem @itemClick="itemClick" :birefData="item" :key="index" class="items"></GoodsItem>
            </template>
        </div>
        <div @click="goBuyGoods" class="goBuyGoods">去进货
            <i>{{selectedCount}}</i>
        </div>
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
            leftItems: leftItems,/* 左边列表 */
            goodsData: []/* 商品列表 */
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
                    let goodsData = res.data.map(v => Object.assign({}, v, { hasPurchase: false }));
                    this.goodsData = goodsData;
                });
        },
        itemClick({ id }) {
            let currentObj = this.goodsData.find(v => v.id == id);
            currentObj.hasPurchase = !currentObj.hasPurchase;
        },
        // itemClick({ productId }) {
        //     let currentObj = this.goodsData.find(v => v.productId == productId);
        //     currentObj.hasPurchase = !currentObj.hasPurchase;
        // },
        goBuyGoods() {
            let selectedData = this.goodsData.filter(v => v.hasPurchase);
            if (this.selectedCount > 0) {
                // this.$router.push({ name: 'GenerateBills', params: { selectedData } });
                this.$router.push({ name: 'GenerateBillsEdit', params: { selectedData } });
            }
        }
    },
    mounted() {
        let _this = this;
        /* 导航 */
        _this.$store.commit('changeCurrentNav', { hash: '/GoodsCenter' });

        this.$http.get('static/goodsList.json')
            .then(res=>{
                this.goodsData = res.data.data;
            })


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

