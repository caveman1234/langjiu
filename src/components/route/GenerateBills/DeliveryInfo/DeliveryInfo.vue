<template>
    <div 
        @click="addressClick" 
        class="DeliveryInfo" 
        :class="classObject"
    >
        <div class="infoName">{{infoData.firstReceiver}}({{infoData.firstReceiverPhone}})</div>
        <div class="infoAddress">{{infoData.addressDetail}}</div>
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
                icon: this.infoData.isSelected,
                iconfont: this.infoData.isSelected,
                'icon-selected': this.infoData.isSelected
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import './DeliveryInfo.scss';
</style>

