<template>
    <div class="MsgCenter">
        <SearchComp ref="searchRef"
            :searchConfig="searchConfig"
            serverUrl="/ocm-web/api/notice/pageQuery"
            @receiveData="receiveData"></SearchComp>
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
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let defaultValue = [new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 30), new Date(new Date().getTime())];
let searchConfig = [
    {
        type: 'input',
        field: 'title',
        label: '标题：'
    },
    {
        type: 'input',
        field: 'content',
        label: '内容：'
    }
];
/* 
   noticeStyle;
   title;
   content;
*/
export default {
    name: 'MsgCenter',
    components: { MsgItem,SearchComp },
    data() {
        return {
            searchConfig:searchConfig,
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
        receiveData(data) {
            this.msgContent = data.content;
            this.pageParams.pageSize = data.size;//每页数量
            this.pageParams.total = data.totalElements;//总页数
            this.pageParams.pageIndex = data.number + 1;//当前页
        },
        handleSizeChange(pageSize) {
            let _this = this;
            _this.pageParams.pageSize = pageSize;
            let params = {
                page: _this.pageParams.pageIndex - 1,
                size: _this.pageParams.pageSize
            };
            _this.$refs.searchRef.search(params);
        },
        handleCurrentChange(pageIndex) {
            let _this = this;
            _this.pageParams.pageIndex = pageIndex;
            let params = {
                page: _this.pageParams.pageIndex - 1,
                size: _this.pageParams.pageSize
            };
            _this.$refs.searchRef.search(params);
        },
    },
    mounted() {
        let _this = this;
        let params = {
            page: 0,
            size: _this.pageParams.pageSize
        };
        _this.$refs.searchRef.search(params);
        _this.$store.commit('changeCurrentNav', { hash: '/MsgCenter' });
    }
}
</script>
<style lang="scss" scoped>
@import "./MsgCenter.scss";
</style>

