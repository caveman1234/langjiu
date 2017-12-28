<template>
    <div class="Home">
        <div class="bannerContainer">
            <div class="imgContainer">

                <el-carousel :interval="3000" arrow="always" height="500px">
                    <el-carousel-item v-for="item in imageArr" :key="item">
                        <img :src="item" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="msgContainer">
                <div class="msg">
                    <div class="title">消息公告</div>
                    <ul>
                        <li v-for="(item,index) in msgArr" :key="index">{{item}}</li>
                    </ul>
                </div>
                <div class="wait">
                    <div class="title">待办事项</div>
                    <div class="waitItems">
                        <div class="row1">
                            <div class="left">
                                <div>
                                    <i class="el-icon-document"></i>
                                </div>
                                <div>待提交订单</div>
                            </div>
                            <div class="right">
                                <div>
                                    <i class="el-icon-document"></i>
                                </div>
                                <div>处理中订单</div>
                            </div>
                        </div>
                        <div class="row2">
                            <div class="left">
                                <div>
                                    <i class="el-icon-document"></i>
                                </div>
                                <div>待发货订单</div>
                            </div>
                            <div class="right">
                                <div>
                                    <i class="el-icon-document"></i>
                                </div>
                                <div>签收单</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let msgArr = [
    '新华社为郎酒打CALL 八方八方八方',
    '郎牌特曲广告全新升级 扎根扎根扎根',
    '白酒行业高速发展风口，汪汪汪汪汪汪白酒行业高速发展风口，汪汪汪汪汪汪',
    '俊林董事长倡议共建、共享共享共享',
    '青花郎诞生记…',
    '青花郎诞生记…'
];
export default {
    name: 'Home',
    data() {
        return {
            msgArr: msgArr,
            imageArr:[
                require('../../../assets/images/banner1.jpg'),
                require('../../../assets/images/banner2.jpg'),
                require('../../../assets/images/banner3.jpg')
            ]
        }
    },

    methods: {

        handleClick() { }
    },
    mounted() {
        this.$store.commit('changeCurrentNav', { hash: '/Home' });
    }
}
</script>
<style lang="scss" scoped>
@import "./Home.scss";
</style>

