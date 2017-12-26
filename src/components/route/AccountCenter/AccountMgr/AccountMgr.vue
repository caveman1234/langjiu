<template>
    <div class="AccountMgr">
        <div class="bankImg" :style='{"backgroundImage":`url(${bankImg})`}'>
            <div class="bankBtn">
                <el-button v-show="false" @click="goAssign" size="small" type="primary">去签约</el-button>
                <el-tooltip effect="light" placement="top">
                    <div slot="content" v-red>页面会被覆盖，成功后请返回</div>
                    <el-button @click="goMgr" size="small" type="primary">账户管理</el-button>
                </el-tooltip>
            </div>
        </div>
        <form v-show="false" id="bankForm" method="post" action="http://111.205.207.144:7003/ecp/htmlMhtInFwd/forward">
            <button id="bankFormSubmit" type="submit">提交</button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'AccountMgr',
    data() {
        return {
            bankImg: require('../../../../assets/bank.png')
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
            _this.$http.post('/ocm-web/api/cmbc/param-encrypt', params)
                .then(res => {
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

