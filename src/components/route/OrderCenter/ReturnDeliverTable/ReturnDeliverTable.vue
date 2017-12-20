<template>
    <div class="ReturnDeliverTable">
        <div class="tableHeader">
            <div class="goodsInfo">商品详情</div>
            <div class="standard">规格</div>
            <div class="applyNum">申请数量</div>
            <div class="money">金额</div>
            <div class="status">状态</div>
        </div>
        <div v-for="(item0,index0) in tableData" :key="index0" class="tableBodyContainer">
            <el-row class="tableTitle">
                <el-col :span="2">
                    <div class="name">订单日期：</div>
                </el-col>
                <el-col :span="3">
                    <div class="content">2017-01-01</div>
                </el-col>
                <el-col :span="2">
                    <div class="name">订单编码：</div>
                </el-col>
                <el-col :span="3">
                    <div class="content">langjiu12345678</div>
                </el-col>
            </el-row>
            <div v-for="(item0,index0) in item0.orderList" :key="index0" class="tableBody">
                <div class="goodsInfo">
                    <div class="goodsImg" :style='{"backgroundImage":`url(${item0.imgUrl})`}'></div>
                    <div class="goodsDesc">{{item0.brief}}</div>
                </div>
                <div class="standard">
                    <div class="volume">{{item0.volume}}ml</div>
                    <div class="strength">{{item0.strength}}度</div>
                </div>
                <div class="applyNum">{{item0.applyNum}}</div>
                <div class="money">¥{{item0.money}}</div>
                <div class="status">{{item0.orderStatus}}</div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'ReturnDeliverTable',
    props: {
        tableData: {
            default() {
                return []
            }
        }
    },
    data() {
        return {
            
        }
    },
    methods: {}
}
</script>
<style lang="scss">
@import './ReturnDeliverTable.scss';
</style>

