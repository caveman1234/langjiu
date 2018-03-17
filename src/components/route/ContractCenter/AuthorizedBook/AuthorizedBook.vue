<template>
    <div class="AuthorizedBook">
        <SearchComp ref="searchRef" :searchConfig="searchConfig" :extralParams="extralParams" @receiveData="receiveData" serverUrl="/ocm-web/api/cm/authorization-mgr"></SearchComp>
        <el-table :data="tableData" style="width: 100%;margin-top:10px;" border>
            <el-table-column prop="srcBillcode" label="来源合同号"></el-table-column>
            <el-table-column prop="code" label="授权书编码"></el-table-column>
            <el-table-column prop="typeCode" label="授权书类型">
                <template slot-scope="scope">
                    <div>{{scope.row.typeCode | formatAuthorizedBookType}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="140px">
                <template slot-scope="scope">
                    <el-button @click="download(scope.row)" size="mini">查看/下载</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParams.pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total" prev-text="上一页" next-text="下一页">
        </el-pagination>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let searchConfig = [
    {
        type: 'input',
        field: 'code',
        label: '授权书编码：'
    },
    {
        type: 'select',
        field: 'typeCode',
        label: '授权书类型：',
        dataSource: [
            { label: "青花郎授权书", value: "1" },
            { label: "特曲授权书", value: "2" },
            { label: "小郎酒授权书", value: "3" },
            { label: "青花郎卫星客户授权书", value: "4" },
            { label: "电商经营商(自营平台)授权书", value: "5" },
            { label: "电商经营商(零售网点)授权书", value: "6" },
        ]
    }
];
export default {
    name: 'AuthorizedBook',
    components: { SearchComp },
    data() {
        return {
            searchConfig: searchConfig,
            tableData: [],
            //分页参数
            pageParams: {
                pageIndex: 1,
                pageSize: 10,
                total: 0
            },
            //搜索固定字段，搜索全部未作废数据
            extralParams: {
                
            }

        }
    },
    methods: {
        receiveData(data) {
            this.tableData = data.content;
            this.pageParams.pageSize = data.size;//每页数量
            this.pageParams.total = data.totalElements;//总页数
            this.pageParams.pageIndex = data.number + 1;//当前页
        },
        //获取事业部下拉框
        fetchSysDataSource() {
            let _this = this;
            _this.$http.get('')
                .then(res => {
                    return res.data;
                })
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
        download(row) {
            let url = row.attachment;
            window.open(url);
        }
    },
    mounted() {
        let _this = this;
        let params = {
            page: 0,
            size: _this.pageParams.pageSize
        };
        _this.$refs.searchRef.search(params);
    },
    filters: {
        //格式化提交状态
        formatAuthorizedBookType(value) {
            let obj = {
                '1': '青花郎授权书',
                '2': '特曲授权书',
                '3': '小郎酒授权书',
                '4': '青花郎卫星客户授权书',
                '5': '电商经营商(自营平台)授权书',
                '6': '电商经营商(零售网点)授权书',
            }
            return obj[value];
        }
    }
}
</script>
<style lang="scss">
@import './AuthorizedBook.scss';
</style>
