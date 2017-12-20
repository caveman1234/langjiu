<template>
    <div class="GoodsItem" @mouseover="mouseOver" @mouseout="mouseOut">
        <div class="imgContainer">
            <img :src="birefData.imgUrl" alt="">
            <div v-if="birefData.isGoodsPage" class="hoverDiv" :class="hoverClass">
                <div v-if="birefData.hasPurchase" class="carText" @click="del">
                    <div class="delete">从进货单删除</div>
                </div>
                <div v-else class="carText" @click="add">
                    <div class="car"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEzMzUzMjg3ODg5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NzUiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTAyLjIwOCAzNDQuNzA0bC01NDcuODQgMEwzMDguNjA4IDE2Ny41NTJDMzAzLjgwOCAxNDguNjcyIDI4Ni43MiAxMzUuNDI0IDI2Ny4yIDEzNS40MjRMMTAyLjAxNiAxMzUuNDI0Yy0xNS43NDQgMC0yNS43MjggMTIuNDgtMjIuMzM2IDI3LjkwNEw4Ni40IDE5My4xNTJjMy4zOTIgMTUuNDI0IDE4Ljg4IDI3LjkwNCAzNC42ODggMjcuOTA0bDExMy4wMjQgMCAxMzguODggNTM4LjQzMmM0LjkyOCAxOC44OCAyMS45NTIgMzIuMDY0IDQxLjQ3MiAzMi4wNjRsNDEwLjI0IDBjMTUuNzQ0IDAgMjguNTQ0LTEyLjczNiAyOC41NDQtMjguNDhsMC0yOC41NDRjMC0xNS42OC0xMi44LTI4LjQxNi0yOC41NDQtMjguNDE2TDQ0Ny41NTIgNzA2LjExMmwtOS43OTItMzguMjA4IDQyMy4xMDQgMCA4MS42NjQtMjY4LjYwOEM5NTEuNzQ0IDM2OS4wODggOTMzLjYzMiAzNDQuNzA0IDkwMi4yMDggMzQ0LjcwNHoiIHAtaWQ9IjE5NzYiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48cGF0aCBkPSJNMzk2LjggODg2LjU5Mm0tNjYuNTYgMGExLjA0IDEuMDQgMCAxIDAgMTMzLjEyIDAgMS4wNCAxLjA0IDAgMSAwLTEzMy4xMiAwWiIgcC1pZD0iMTk3NyIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjxwYXRoIGQ9Ik04MjQuNjQgODg2LjU5Mm0tNjYuNTYgMGExLjA0IDEuMDQgMCAxIDAgMTMzLjEyIDAgMS4wNCAxLjA0IDAgMSAwLTEzMy4xMiAwWiIgcC1pZD0iMTk3OCIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg==" alt=""></div>
                    <div class="text">加入购物车</div>
                </div>
            </div>
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
        add() {
            this.$emit('addGoodsItem', this.birefData);
        },
        del() {
            this.$emit('delGoodsItem', this.birefData);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "./GoodsItem.scss";
</style>

