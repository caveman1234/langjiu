<template>
    <div class="MsgCenter">
        <ul>
            <li v-for="(item,index) in msgContent" :key="index" @click="msgItemClick(item)" class="clearfix">
                <span class="content">{{item.title}}</span>
                <span class="time">{{item.creationTime | formatDate}}</span>
            </li>
        </ul>
        <el-pagination v-if="msgContent.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParams.pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total" prev-text="上一页" next-text="下一页"></el-pagination>
    </div>
</template>
<script>
import MsgItem from './MsgItem/MsgItem';
export default {
    name: 'MsgCenter',
    components: { MsgItem },
    data() {
        return {
            //分页参数
            pageParams: {
                pageIndex: 1,
                pageSize: 10,
                total: 0
            },
            msgContent: []
        }
    },
    methods: {
        msgItemClick(msgContent) {
            let _this = this;
            _this.$router.push({ name: 'MsgContent', params: { msgContent } });
        },
        fetchMsg({ page, size }) {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: _this.$store.state.customerId,
                    page,
                    size
                }
            };
            _this.$http.get('/ocm-web/api/notice/pageQuery', paramsWrap)
                .then(res => {
                    _this.pageParams.pageSize = res.data.size;//每页数量
                    _this.pageParams.total = res.data.totalElements;//总页数
                    _this.pageParams.pageIndex = res.data.number + 1;//当前页
                    _this.msgContent = res.data.content;
                });
        },
        handleSizeChange(pageSize) {
            let _this = this;
            _this.pageParams.pageSize = pageSize;
            let params = {
                page: _this.pageParams.pageIndex - 1,
                size: _this.pageParams.pageSize
            };
            _this.fetchMsg(params);
        },
        handleCurrentChange(pageIndex) {
            let _this = this;
            _this.pageParams.pageIndex = pageIndex;
            let params = {
                page: _this.pageParams.pageIndex - 1,
                size: _this.pageParams.pageSize
            };
            _this.fetchMsg(params);
        },
    },
    mounted() {
        let _this = this;
        _this.$store.commit('changeCurrentNav', { hash: '/MsgCenter' });
        _this.fetchMsg({ page: 0, size: 10 });
    }
}
</script>
<style lang="scss" scoped>
@import "./MsgCenter.scss";
</style>

