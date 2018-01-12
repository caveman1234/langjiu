<template>
    <div class="AccountMgr">
        <div class="imgContainer">
            <div class="titleImg">
                <div class="bank"
                    :style='{backgroundImage:`url(${langImg})`}'></div>
                <div class="lang"
                    :style='{backgroundImage:`url(${bankImg})`}'></div>
            </div>
            <div class="text">本界面将导航到民生银行提供的专属账户管理界面！</div>
            <div class="btn">
                <el-button @click="goMgr"
                    size="small"
                    type="primary">账户管理</el-button>
            </div>
        </div>

        <!-- <form v-show="false"
            id="bankForm"
            method="post"
            action="http://111.205.207.144:7003/ecp/htmlMhtInFwd/forward">
            <button id="bankFormSubmit"
                type="submit">提交</button>
        </form> -->
    </div>
</template>
<script>
export default {
    name: 'AccountMgr',
    data() {
        return {
            bankImg: require('../../../../assets/bank.png'),
            langImg: require('../../../../assets/lang.jpeg'),
        }
    },
    methods: {
        goMgr() {
            //去管理
            let _this = this;
            let params = {
                clientId: this.$store.state.customerId
            };
            debugger
            _this.$http.post('/ocm-web/api/cmbc/queryCustomerInfo', params)
                .then(res => {
                    debugger
                    if (res.headers['x-ocm-code']== '1') {
                        let bankForm = document.querySelector('#bankForm');
                        let bankFormSubmit = document.querySelector('#bankFormSubmit');
                        let params = res.data.reduce((acc, v) => {
                            acc[v.name] = v.value;
                            return acc;
                        }, {});
                        Object.keys(params).forEach(key => {
                            if (key != 'forwardUrl') {
                                let input = document.createElement('input');
                                input.setAttribute('name', key);
                                input.value = params[key];
                                bankForm.appendChild(input);
                            }
                        });
                        //url  地址
                        debugger
                        let forwardUrl = params.forwardUrl;
                        bankForm.setAttribute('action', forwardUrl);
                        document.forms.bankForm.submit();
                        // bankFormSubmit.click();
                    }

                });
        },
        goAssign() {
            //去签约
        }
    },
    mounted() {
        // this.$store.commit('changeCurrentNav', { hash: '/AccountMgr' });
    }
}
</script>
<style lang="scss">
@import "./AccountMgr.scss";
</style>

