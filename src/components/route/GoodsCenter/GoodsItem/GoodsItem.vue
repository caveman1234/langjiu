<template>
    <div @click="itemClick" class="GoodsItem" @mouseover="mouseOver" @mouseout="mouseOut">
        <div class="imgContainer">
            <img :src="birefData.imgUrl" alt="">
        </div>
        <div class="textContent">
            <div class="price">¥{{birefData.price}}</div>
            <div class="textDetail">{{birefData.brief}}</div>
            <div class="store">
                <span>库存:</span>
                <span>{{birefData.count}}瓶</span>
            </div>
            <div v-if="birefData.hasPurchase" class="selectedIcon">
                <i class="icon iconfont icon-selectcheckboxpre"></i>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapActions } from 'Vuex';
export default {
    name: 'GoodsItem',
    props: {
        birefData: {
            type: Object,
            default: function() {
                return {
                    imgUrl: "src/assets/goodsItem.png",
                    brief: "郎酒红花郎10 53度酱香500度酱香500度酱香500度酱香500",
                    price: 1668,
                    count: 1980,
                    hasPurchase: false,
                    id: '12345id',
                    isGoodsPage: true
                }
            }
        }
    },
    data() {
        return {
            hoverClass: 'divMouseOut'
        }
    },
    methods: {

        mouseOver() {
            this.hoverClass = "divMouseOver";
        },
        mouseOut() {
            this.hoverClass = 'divMouseOut';
        },
        itemClick(){
            this.$emit('itemClick',this.birefData);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "./GoodsItem.scss";
</style>

