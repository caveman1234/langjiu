<template>
  <div class="QuotaProgress">
    <SearchComp ref="searchRef" :searchConfig="searchConfig" :extralParams="extralParams" @receiveData="receiveData" serverUrl="/ocm-web/api/cm/contract-mgr/search-all" method="post"></SearchComp>

    <div class="quotaTableContainer">
        <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="contractTypeName" label="合同类型">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.contractTempletCode }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="totalMny" label="合同量(万元)" width="130px"></el-table-column>
            <el-table-column prop="rangeName" width="100px" label="产品范围">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.signTime }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="startDate" label="生效日期" width="130px">
                <template slot-scope="scope">
                    <div>{{scope.row.cusCommitStatus }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="endDate" label="失效日期" width="130px"> </el-table-column>
            <el-table-column prop="standedInside" label="标准计划内配额" width="130px"> </el-table-column>
            <el-table-column prop="adjustInside" label="调整计划内配额" width="130px"> </el-table-column>
            <el-table-column prop="totalInside" label="计划内配额合计" width="130px"> </el-table-column>
            <el-table-column prop="standedOut" label="标准计划外配额" width="130px"> </el-table-column>
            <el-table-column prop="adjustOut" label="调整计划外配额" width="130px"> </el-table-column>
            <el-table-column prop="totalOut" label="计划外配额合计" width="130px"> </el-table-column>
            <el-table-column prop="limitExcess" label="超额上限(万元)" width="130px"> </el-table-column>
            <el-table-column prop="remark" label="备注" width="130px"> </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParams.pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total" prev-text="上一页" next-text="下一页">
        </el-pagination>
    </div>
  </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let searchConfig = [
  {
    type: 'input',
    field: 'contractType',
    label: '合同类型：',
    dataSource: [
      { label: "未提交", value: "0" },
      { label: "已提交", value: "1" },
    ]
  },
  {
    type: 'select',
    field: 'rangeId',
    label: '产品范围：',
    dataSource: [{ name: '数量（件）', value: 1 }, { name: '金额（万元）', value: 2 }]
  }
];
export default {
  name: 'QuotaProgress',
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
      extralParams: {
        invalidStatus: '0'
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
  },
  mounted() {
    let _this = this;
    let params = {
      page: 0,
      size: _this.pageParams.pageSize
    };
    _this.$refs.searchRef.search(params);
  }
}
</script>
<style lang="scss" scoped>
@import "./QuotaProgress.scss";
</style>
