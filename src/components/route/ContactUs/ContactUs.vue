<template>
    <div class="ContactUs">
        <div class="title">欢迎致电四川古蔺郎酒销售有限公司</div>
        <el-alert title="青花郎经销商客服电话：028-86710905"
            type="info"
            :closable="false"
            description="">
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

        <el-menu>
            <el-submenu index="1">
                <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>

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
    }

}
</script>
<style lang="scss" scoped>
@import './ContactUs.scss';
</style>
