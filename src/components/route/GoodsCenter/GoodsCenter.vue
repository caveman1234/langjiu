<template>
    <div class="GoodsCenter">
        <div class="treeList">
            <el-tabs tab-position="left">
                <el-tab-pane v-for="(item,index) in leftItems" :key="index" :label="item"></el-tab-pane>
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
            leftItems: leftItems,
            goodsData: []
        }
    },
    computed: {

    },
    methods: {
        itemClick({ id }) {
            let currentObj = this.goodsData.find(v => v.id == id);
            currentObj.hasPurchase = !currentObj.hasPurchase;
        },
        goBuyGoods() {
            let selectedData = this.goodsData.filter(v => v.hasPurchase);
            if (this.selectedCount > 0) {
                this.$router.push({ name: 'GenerateBills', params: { selectedData } });
            }
        }
    },
    mounted() {
        let _this = this;
        _this.$store.commit('changeCurrentNav', { hash: '/GoodsCenter' });
        _this.$http.get('static/goodsList.json')
            .then(res => {
                let data = res.data.data;
                _this.goodsData = data;
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

