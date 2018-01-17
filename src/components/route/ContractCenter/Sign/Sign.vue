<template>
    <div class="Sign">
        <!-- <div style="font-size:50px;font-size: 50px;color: #999999;">即将开放,敬请期待......</div> -->
        <div v-show="false">

            <SearchComp ref="searchRef" :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/financing-apply/list"></SearchComp>
            <div class="tableContainer">

                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column prop="applyDate" label="合同编号"> </el-table-column>
                    <el-table-column prop="orderCode" label="合同版本"></el-table-column>
                    <el-table-column prop="billStatus" label="制单日期">
                        <template slot-scope="scope">
                            <div>
                                <div>{{scope.row.billStatus | formatBillStatus}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="totalRepaidMny" label="提交状态"> </el-table-column>
                    <el-table-column prop="expireDate" label="作废状态"></el-table-column>
                    <el-table-column prop="remark" label="签章状态"></el-table-column>
                    <el-table-column prop="" label="附件" width="130px">
                        <template slot-scope="scope">
                            <el-button @click="downloadFujian" size="mini">
                                <i class="icon iconfont lj-fujian"></i>下载合同</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" width="150px">
                        <template slot-scope="scope">

                            <el-button size="mini">提交</el-button>
                            <el-button size="mini">签章</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParams.pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total" prev-text="上一页" next-text="下一页">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';

let searchConfig = [
    {
        type: 'input',
        field: 'applyDate',
        label: '合同编号：'
    },
    {
        type: 'select',
        field: 'commitStatus',
        label: '提交状态：',
        dataSource: [
            { label: "未审核", value: "0" },
            { label: "已审核", value: "1" },
        ]
    },
    {
        type: 'select',
        field: 'invaildStatus',
        label: '作废状态：',
        dataSource: [
            { label: "未作废", value: "0" },
            { label: "已作废", value: "1" },
        ]
    },
    {
        type: 'select',
        field: 'signStatus',
        label: '签章状态：',
        dataSource: [
            { label: "无签章", value: "0" },
            { label: "单方签章", value: "1" },
            { label: "双方签章", value: "2" },
        ]
    }
];
export default {
    name: 'Sign',
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
        //下载附件
        downloadFujian() {
            console.log('fujian');
        },
        //change
        handleSelectionChange(value) {
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
        formatCommitStatus(value) {
            let obj = {
                '0': '未审核',
                '1': '已审核'
            }
            return obj[value];
        },
        //格式化作废状态
        formatCommitStatus(value) {
            let obj = {
                '0': '未作废',
                '1': '已作废'
            }
            return obj[value];
        },
        //格式化签章状态
        formatCommitStatus(value) {
            let obj = {
                '0': '无签章',
                '1': '单方签章',
                '2': '双方签章'
            }
            return obj[value];
        },
    }
}
</script>
<style lang="scss">
@import './Sign.scss';
</style>