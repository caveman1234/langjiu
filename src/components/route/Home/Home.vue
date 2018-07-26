<template>
    <div class="Home">
        <div class="bannerContainer">
            <div class="imgContainer">
                <el-carousel :interval="5000" arrow="always" height="500px">
                    <el-carousel-item v-for="item in imageArr" :key="item">
                        <img :src="item" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="msgContainer">
                <div class="msg">
                    <div class="title">公告</div>
                    <ul>
                        <li v-for="(item,index) in msgArr" :key="index" v-html="item.title" :title="item.title" @click="msgItemClick(item)"></li>
                    </ul>
                    <div @click="lookMore" class="more">查看更多
                        <i class="el-icon-d-arrow-right"></i>
                    </div>
                </div>
                <div class="willHandleItems">
                    <div class="title">待办事项</div>
                    <div class="waillHandleContent">
                        <template v-if="waillHandleContent.length === 0">
                            <div style="color:#bdbdbd;">暂无待办事项</div>
                        </template>
                        <template v-else>
                            <div class="item" v-for="(item,i) in waillHandleContent" :key="i" :title="item.message">{{i+1}}、{{item.message}}</div>
                        </template>
                    </div>
                </div>
                <div class="wait">
                    <div class="title">待审事项</div>
                    <div class="waitItems">
                        <div class="row1">
                            <div @click="willCheckOrder" class="left item">
                                <div>
                                    <i class="icon iconfont lj-daishenhe"></i>
                                </div>
                                <div>待审核订单</div>
                                <i class="budge">{{budge.commonOrderNum}}</i>
                            </div>
                            <div @click="willSendApply" class="right item">
                                <div>
                                    <i class="icon iconfont lj-daishenhe"></i>
                                </div>
                                <div>待审核发货申请</div>
                                <i class="budge">{{budge.sendApplyOrderNum}}</i>
                            </div>
                        </div>
                        <div class="row2">
                            <div @click="willReturnApply" class="left item">
                                <div>
                                    <i class="icon iconfont lj-daishenhe"></i>
                                </div>
                                <div>待审核退换货申请 </div>
                                <i class="budge">{{budge.returnChangeOrderNum}}</i>
                            </div>
                            <div @click="willCheckFee" class="right item">
                                <div>
                                    <i class="icon iconfont lj-daishenhe"></i>
                                </div>
                                <div>待审核费用</div>
                                <i class="budge">{{budge.feeOrderOrderNum}}</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <el-dialog 
                title="待办事项"  
                :visible.sync="dialogVisible1" 
                :modal="false"
                width="500px"
                :close-on-click-modal="true"
            >
                <div class="msgDialogContent">
                    <h4>您有以下事项需要处理：</h4>
                    <div v-for="(item,i) in waillHandleContent" :key="i" class="msgDialogContentItem">
                        <div class="msgDialogContentItemNum">{{i+1}}、</div>
                        <div class="msgDialogContentItemText">{{item.message}}</div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="closeDialog" size="mini">关 闭</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            msgArr: [],
            imageArr: [
                require('../../../assets/images/banner1.jpg'),
                require('../../../assets/images/banner2.jpg'),
                require('../../../assets/images/banner3.jpg'),
                require('../../../assets/images/banner4.jpg'),
            ],
            budge: {
                commonOrderNum: 0,//待审核订单
                sendApplyOrderNum: 0,//待发货申请单
                returnChangeOrderNum: 0,//待审核退换货申请
                feeOrderOrderNum: 0,//待审核费用
            },
            waillHandleContent: [],
            dialogVisible1: false
        }
    },

    methods: {
        handleClick() { },
        fetchMsgItem(id) {
            let paramsWrap = {
                params: {
                    id: id
                }
            }
            let url = "/ocm-web/api/notice/queryById";
            return this.$http.get(url, paramsWrap)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        return res.data;
                    } else {
                        return Promise.reject();
                    }
                });
        },
        async msgItemClick(item) {
            let _this = this;
            let id = item.id;
            let msgContent = await _this.fetchMsgItem(id);
            _this.$router.push({ name: 'MsgContent', params: { msgContent } });
        },
        lookMore() {
            this.$router.push({ name: 'MsgCenter' })
        },
        fetchMsg() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: _this.$store.state.customerId,
                    page: 0,
                    size: 3
                }
            };
            return _this.$http.get('/ocm-web/api/notice/pageQuery', paramsWrap)
                .then(res => res.data);
        },
        //待提交订单
        willCheckOrder() {
            this.$router.push({ name: 'SavedOrder', params: { from: 'Home' } });
        },
        //待发货申请
        willSendApply() {
            this.$router.push({ name: 'DeliverWaitCheck', params: { from: 'DeliverList' } });
        },
        //待退货申请
        willReturnApply() {
            this.$router.push({ name: 'ReturnWaitCheck', params: { from: 'ReturnList' } });
        },
        //待审核费用
        willCheckFee() {
            this.$router.push({ name: 'WaitAuditCheck', params: { to: 'WaitAuditCheck' } });
        },
        //获取待审核订单数量
        fetchCount() {
            // /ocm-web/api/b2b/purchase-orders/countUnSendedAmountByCustomerId
            let _this = this;
            let url = '/ocm-web/api/b2b/purchase-orders/countOrderByCustomerId';
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            }
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.budge.commonOrderNum = res.data.commonOrderNum;
                    _this.budge.sendApplyOrderNum = res.data.sendApplyOrderNum;
                    _this.budge.returnChangeOrderNum = res.data.returnChangeOrderNum;
                    _this.budge.feeOrderOrderNum = res.data.feeOrderOrderNum;
                })
        },
        fetchWaitHandleMsg() {
            let _this = this;
            let url = '/ocm-web/api/lcrmTxxxRest/findLjcrmTxxx';
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            }
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.waillHandleContent = res.data || [];
                    if(_this.waillHandleContent.length > 0){
                        _this.dialogVisible1 = true;
                    }
                })
        },
        closeDialog() {
            this.dialogVisible1 = false;
        },
    },
    mounted() {
        let _this = this;
        _this.$store.commit('changeCurrentNav', { hash: '/Home' });
        _this.fetchMsg().then(res => {
            _this.msgArr = res.content;
        });
        //获取budge
        _this.fetchCount();
        _this.fetchWaitHandleMsg();
    }
}
</script>
<style lang="scss" scoped>
@import "./Home.scss";
</style>

