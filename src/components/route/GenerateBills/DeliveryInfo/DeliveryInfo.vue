<template>
    <div 
        @click="addressClick" 
        class="DeliveryInfo" 
        :class="classObject"
    >
        <!-- <div class="infoName">{{infoData.firstReceiver}}({{infoData.firstReceiverPhone}})</div>
        <div class="infoAddress">{{infoData.addressDetail}}</div> -->
        <el-row>
            <el-col :span="14">收货人地址：{{infoData.addressDetail}}</el-col>
            <el-col :span="5">收货人姓名：{{infoData.firstReceiver}}</el-col>
            <el-col :span="5">收货人电话：{{infoData.firstReceiverPhone}}</el-col>
        </el-row>
        <i v-show="infoData.isSelected" class="el-icon-check"></i>
    </div>
</template>
<script>
export default {
    name: 'DeliveryInfo',
    props: ['infoData'],
    data() {
        return {
            
        }
    },
    methods: {
        addressClick() {
            this.$emit('addressClick', this.infoData);
        }
    },
    computed: {
        classObject(){
            return {
                DeliveryInfoSelected: this.infoData.isSelected,
                // 'el-icon-check': this.infoData.isSelected
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import './DeliveryInfo.scss';
</style>

