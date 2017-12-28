<template>
    <div class="Sign">
        <el-carousel :autoplay="false" arrow="always" indicator-position="outside" height="800px">
            <el-carousel-item v-for="(item,index) in imageArr" :key="index">
                <div class="imageContainer">
                    <img :src="item" alt="">
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>

export default {
    name: 'Sign',
    data() {
        return {
            imageArr: [
                require('../../../../assets/images/word1.png'),
                require('../../../../assets/images/word2.png'),
                require('../../../../assets/images/word3.png'),
                require('../../../../assets/images/word4.png'),
                require('../../../../assets/images/word6.png'),
                require('../../../../assets/images/word7.png'),
                require('../../../../assets/images/word8.png')
            ]
        }

    },
    components: {},
    methods: {

    }
}
</script>
<style lang="scss" scoped>
@import './Sign.scss';
</style>