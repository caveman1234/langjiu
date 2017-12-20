<template>
    <div class="GoodsCenter">
        <div class="treeList">
            <el-tree :data="treeData" :props="defaultProps" node-key="id" :default-expanded-keys="[1]" highlight-current :indent="10" show-checkbox @check-change="checkChange" ref="tree" leafOnly>
            </el-tree>
        </div>
        <div class="goodsItems">
            <template v-for="(item,index) in goodsData">
                <GoodsItem @addGoodsItem="addGoodsItem" @delGoodsItem="delGoodsItem" :birefData="item" :key="index" class="items"></GoodsItem>
            </template>
        </div>
    </div>
</template>
<script>
import GoodsItem from './GoodsItem/GoodsItem';
import { mapActions, mapState, mapMutations } from 'Vuex';
export default {
    name: 'GoodsCenter',
    components: { GoodsItem },
    data() {
        return {
            treeData: [
                {
                    label: "青花郎系列",
                    id: 1,
                    children: [
                        { label: '15年', id: 2 },
                        { label: '20年', id: 3 }
                    ]
                },
                {
                    label: "老郎酒系列",
                    id: 4,
                    children: [
                        { label: '2-1', id: 5 },
                        { label: '2-2', id: 6 }
                    ]
                },
                {
                    label: "新郎酒系列",
                    id: 11,
                    children: [
                        { label: '3-1', id: 7 },
                        { label: '3-2', id: 8 }
                    ]
                },
                {
                    label: "小郎酒系列",
                    id: 9,
                    children: [
                        { label: '4-1', id: 10 },
                        { label: '4-2', id: 11 }
                    ]
                },
                {
                    label: "郎牌特曲系列",
                    id: 12,
                    children: [
                        { label: '5-1', id: 13 },
                        { label: '5-2', id: 14 }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label',
                id: 'id'
            }
        }
    },
    computed: {
        ...mapState({
            goodsData(state, rootGetters) {
                return state.goodsCenter.goodsData;
            }
        })
    },
    methods: {
        ...mapMutations({
            addPurchaseCount: 'addPurchaseCount',
            addPurchaseData: 'goodsCenter/addPurchaseData',
            delPurchaseData: 'goodsCenter/delPurchaseData'
        }),
        ...mapActions({
            fetchGoodsDataAsync: 'goodsCenter/fetchGoodsDataAsync',
            addPurchaseDataAsync: 'goodsCenter/addPurchaseDataAsync',
            delPurchaseDataAsync: 'goodsCenter/delPurchaseDataAsync'
        }),
        handleNodeClick(data) {
            if (!data.children) {
                let id = data.id;
                console.log('ajax--id=', id);
            }
        },
        checkChange(data) {
            let keys = this.$refs.tree.getCheckedKeys(true);
            this.fetchGoodsDataAsync(keys);
        },
        addGoodsItem(item) {
            this.addPurchaseCount({ flag: 'plus' });
            this.addPurchaseData(item);
            this.addPurchaseDataAsync(item);
        },
        delGoodsItem(item) {
            this.addPurchaseCount({ flag: 'minus' });
            this.delPurchaseData(item);
            this.delPurchaseDataAsync(item);
        }
    },
    mounted() {
        this.$refs.tree.setCheckedKeys([2]);
        this.fetchGoodsDataAsync([2]);
        this.$store.commit('changeCurrentNav', { hash: '/GoodsCenter' });
    }
}
</script>
<style lang="scss">
@import "./GoodsCenter.scss";
</style>

