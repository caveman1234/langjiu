<template>
    <div class="Sign">
        <!-- <div style="font-size:50px;font-size: 50px;color: #999999;">即将开放,敬请期待......</div> -->
        <div v-show="true">

            <SearchComp ref="searchRef" :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/cm/contract-mgr/search-all" method="post"></SearchComp>

            <div class="tableContainer">

                <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column prop="contractTempletCode" label="事业部">
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.contractTempletCode | formatSyb}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="code" label="合同编号" width="140px"> </el-table-column>
                    <el-table-column prop="version" label="合同版本"></el-table-column>
                    <el-table-column prop="signTime" width="100px" label="制单日期">
                        <template slot-scope="scope">
                            <div>
                                <div>{{scope.row.signTime | formatDate}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cusCommitStatus" label="提交状态">
                        <template slot-scope="scope">
                            <div>{{scope.row.cusCommitStatus | formatCommitStatus}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="invalidStatus" label="作废状态">
                        <template slot-scope="scope">
                            <div>{{scope.row.invalidStatus | formatInvalidStatus}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="signStatus" label="签章状态">
                        <template slot-scope="scope">
                            <div>{{scope.row.signStatus | formatSignStatus}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="附件" width="110px">
                        <template slot-scope="scope">
                            <!-- attachment -->
                            <el-button @click="downloadFujian(scope.row)" v-if="scope.row.attachment" size="mini">
                                下载合同
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" width="150px">
                        <template slot-scope="scope">
                            <template v-if="scope.row.cusCommitStatus == 0 && scope.row.signStatus == 1 && scope.row.invalidStatus == 0">
                                <el-button @click="submit(scope.row)" size="mini">提交</el-button>
                            </template>
                            <el-button @click="goSign(scope.row)" v-if="scope.row.attachment && scope.row.signStatus==0" size="mini">签章</el-button>
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
        field: 'code',
        label: '合同编号：'
    },
    {
        type: 'select',
        field: 'cusCommitStatus',
        label: '提交状态：',
        dataSource: [
            { label: "未提交", value: "0" },
            { label: "已提交", value: "1" },
        ]
    },
    {
        type: 'select',
        field: 'invalidStatus',
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
        downloadFujian(row) {
            debugger
            window.open(row.attachment);
        },
        //change
        handleSelectionChange(value) {
        },
        //签章
        goSign(row) {
            let _this = this;
            _this.$router.push({
                name: 'GoSign', params: {
                    payload: row
                }
            });
        },
        //提交数据给oa
        submit(row) {
            //（郎牌事业部：1001；青花郎事业部：1002；小郎酒事业部：1003）
            let _this = this;
            let obj = {
                '1': '1002',
                '2': '1001',
                '3': '1003'
            }
            // let obj = {
            //     '1': '青花郎',
            //     '2': '郎牌特曲',
            //     '3': '小郎酒'
            // }
            let params = {
                contractId: row.id,
                // contractId: '3e3a1c56-199f-45ce-9693-98ad22c6d106',
                templateCode: obj[row.contractTempletCode]
            };

            let url = '/ocm-web/api/cm/contract-mgr/commit';
            // let url = '/ocm-web/api/cm/contract-mgr/upload-contract';
            _this.$http.post(url, params)
                .then(res => {
                    //刷新页面
                    let params = {
                        page: 0,
                        size: _this.pageParams.pageSize
                    };
                    _this.$refs.searchRef.search(params);
                });
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
                '0': '未提交',
                '1': '已提交'
            }
            return obj[value];
        },
        //格式化作废状态
        formatInvalidStatus(value) {
            let obj = {
                '0': '未作废',
                '1': '已作废'
            }
            return obj[value];
        },
        //格式化签章状态
        formatSignStatus(value) {
            let obj = {
                '0': '无签章',
                '1': '单方签章',
                '2': '双方签章'
            }
            return obj[value];
        },
        //格式化事业部
        formatSyb(value) {
            let obj = {
                '1': '青花郎',
                '2': '郎牌特曲',
                '3': '小郎酒'
            }
            return obj[value];
        },
    }
}
</script>
<style lang="scss">
@import './Sign.scss';
</style>