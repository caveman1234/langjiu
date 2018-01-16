<template>
    <div class="ContactUs">
        <div class="title">欢迎致电四川古蔺郎酒销售有限公司</div>
        <el-alert title="青花郎经销商客服电话：028-86710905"
            type="info"
            :closable="false"
            description="青花郎小组联系电话：028-86719513、028-86726355、02886710905">
        </el-alert>
        <el-alert title="小郎酒经销商客服电话：028-86651839"
            type="info"
            :closable="false"
            description="">
        </el-alert>
        <el-alert title="郎牌特曲经销商客服电话：028-86652305"
            type="info"
            :closable="false"
            description="">
        </el-alert>
        <el-alert title="全国统一服务热线：400-806-6969"
            type="info"
            :closable="false"
            description="">
        </el-alert>
    </div>
</template>
<script>
export default {
    name: 'ContactUs',
    components: {},
    data() {
        return {
            
        }
    },
    methods: {
        receiveFormData(data) {
            log(data);
        }
    },
    mounted(){
    }

}
</script>
<style lang="scss" scoped>
@import './ContactUs.scss';
</style>
