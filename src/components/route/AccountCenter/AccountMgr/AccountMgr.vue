<template>
    <div class="AccountMgr">
        <div class="bankImg" :style='{"backgroundImage":`url(${bankImg})`}'>
            <div class="bankBtn">
                <el-button @click="goAssign" size="small" type="primary">去签约</el-button>
                <el-button @click="goMgr" size="small" type="primary">账户管理</el-button>
            </div>
        </div>
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
                customerId: this.$store.state.customerId,
                "clientType": "0",
                "clientId": "123",
                "clientName": "123",
                "idType": "身份证",
                "idCode": "111111111111111111"
            };
            _this.$http.post('/ocm-web/api/cmbc/param-encrypt', params)
                .then(res => {
                    let params = res.data.reduce((acc, v) => {
                        acc[v.name] = v.value;
                        return acc;
                    }, {})
                    let formData = new FormData();
                    Object.keys(params).forEach(key => {
                        formData.append(key, params[key]);
                    });


                    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

                    _this.$http.post('http://111.205.207.144:7003/ecp/htmlMhtInFwd/forward', formData, config)


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

