<template>
    <div @click="itemClick" class="GoodsItem" @mouseover="mouseOver" @mouseout="mouseOut">
        <div :style='{"backgroundImage":`url(${birefData.imageUrl || defaultImg})`}' class="imgContainer">
        </div>
        <div class="textContent">
            <div class="price">¥{{birefData.basicPrice||'暂无价格'}}</div>
            <div class="textDetail">{{birefData.productDesc}}</div>
            <div class="store">
                <!-- <span>库存:</span>
                            <span>{{birefData.count}}瓶</span> -->
            </div>
            <div v-if="birefData.hasPurchase" class="selectedIcon">
                <i class="el-icon-success"></i>
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
            hoverClass: 'divMouseOut',
            defaultImg: require('../../../../assets/defaultimg.png')
        }
    },
    methods: {

        mouseOver() {
            this.hoverClass = "divMouseOver";
        },
        mouseOut() {
            this.hoverClass = 'divMouseOut';
        },
        itemClick() {
            if (this.birefData.basicPrice) {
                this.$emit('itemClick', this.birefData);
            } else {
                this.$Notify({
                    type: 'warning',
                    title: '暂无价格，不能购买'
                });
            }
        }
    },
    mounted() {

    }
}
</script>
<style lang="scss" scoped>
@import "./GoodsItem.scss";
</style>

