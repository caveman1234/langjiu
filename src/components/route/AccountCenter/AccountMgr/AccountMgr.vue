<template>
    <div class="AccountMgr">
        <div class="AccountContainer">
            <div class="AccountTitle">
                <div class="userInfo">
                    <div class="userImg" :style='{"backgroundImage":`url(${userInfoImg})`}'></div>
                    <div class="userName">张三</div>
                    <div class="userPhone">13666666666</div>
                </div>
                <div class="descriptions">
                    <div class="descTitle">
                        <div class="company">花花公子酒业</div>
                        <div class="companyDetail">
                            <span class="companyPhone">商家电话：028-88886666</span>
                            <span class="companyAddress">收货地址：四川省成都市双流区麓湖生态城办公楼一期188号</span>
                        </div>
                    </div>
                    <div class="descBrief">
                        <div class="descBriefItem">
                            <div class="amount">10000000.00</div>
                            <div class="desc">信用余额</div>
                            <div class="check">查看对账</div>
                        </div>
                        <div class="descBriefItem">
                            <div class="amount">11000000.00</div>
                            <div class="desc">保证金金额</div>
                            <div class="check">查看对账</div>
                        </div>
                        <div class="descBriefItem">
                            <div class="amount">12000000.00</div>
                            <div class="desc">共建基金金额</div>
                            <div class="check">查看对账</div>
                        </div>
                        <div class="descBriefItem">
                            <div class="amount">13000000.00</div>
                            <div class="desc">费用余额</div>
                            <div class="check">查看对账</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="AccountBody">
                <h1>内容待定</h1>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AccountMgr',
    data() {
        return {
            userInfoImg: 'src/assets/goodsItem.png'
        }
    },
    methods: {
        
    },
    mounted(){
        // this.$store.commit('changeCurrentNav', { hash: '/AccountMgr' });
    }
}
</script>
<style lang="scss">
@import "./AccountMgr.scss";
</style>

