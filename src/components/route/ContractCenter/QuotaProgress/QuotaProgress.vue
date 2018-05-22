<template>
  <div class="QuotaProgress">
    <SearchComp 
      ref="searchRef" 
      :searchConfig="searchConfig" 
      :extralParams="extralParams" 
      @receiveData="receiveData" 
      serverUrl="/ocm-web/api/base/quota-customer-excel/getList" 
      method="post"
    ></SearchComp>

    <div class="quotaTableContainer">
        <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="contractTypeName" width="180px" label="合同类型">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.contractTypeName }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="totalMny" label="合同量(万元)" width="130px">
              <template slot-scope="scope">
                    <div>
                        {{scope.row.totalMny |formatInOut }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="rangeName" width="100px" label="产品范围">
                <template slot-scope="scope">
                    <div>
                        <div>{{scope.row.rangeName }}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="startDate" label="生效日期" width="130px">
                <template slot-scope="scope">
                    <div>{{scope.row.startDate | formatDate }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="endDate" label="失效日期" width="130px">
                <template slot-scope="scope">
                    <div>{{scope.row.startDate | formatDate }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="standedInside" label="标准计划内配额" width="130px">
                <template slot-scope="scope">
                    <div>{{scope.row.standedInside | formatInOut }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="adjustInside" label="调整计划内配额" width="130px">
                <template slot-scope="scope">
                    <div>{{scope.row.adjustInside | formatInOut }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="totalInside" label="计划内配额合计" width="130px">
                <template slot-scope="scope">
                    <div>{{scope.row.totalInside | formatInOut }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="standedOut" label="标准计划外配额" width="130px">
                <template slot-scope="scope">
                    <div>{{scope.row.standedOut | formatInOut }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="adjustOut" label="调整计划外配额" width="130px">
                <template slot-scope="scope">
                    <div>{{scope.row.adjustOut | formatInOut }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="totalOut" label="计划外配额合计" width="130px">
              <template slot-scope="scope">
                    <div>{{scope.row.totalOut | formatInOut }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="limitExcess" label="超额上限(万元)" width="130px">
              <template slot-scope="scope">
                    <div>{{scope.row.limitExcess | formatInOut }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="130px"></el-table-column>
        </el-table>
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParams.pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total" prev-text="上一页" next-text="下一页">
        </el-pagination> -->
    </div>
  </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let searchConfig = [
  {
    type: 'select',
    field: 'EQ_contractType.id',
    label: '合同类型：',
    dataSource: []
  },
  {
    type: 'select',
    field: 'EQ_range.id',
    label: '产品范围：',
    dataSource: []
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
        // "search_EQ_customer.id": this.$store.state.customerId
      }
    }
  },
  methods: {
    receiveData(data) {
      this.tableData = data;
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
    fetchContractType() {
      let url = "/ocm-web/api/base/basecust/get-contract-types";
      this.$http.get(url)
        .then(res => {
          if (res.headers["x-ocm-code"] == '1') {
            this.searchConfig[0].dataSource = res.data.map(v => ({ label: v.name, value: v.id }));
          }
        });
    },
    fetchRangeCombo(){
      let url = "/ocm-web/api/base/basecust/get-quota-ranges";
      this.$http.get(url)
        .then(res => {
          if (res.headers["x-ocm-code"] == '1') {
            this.searchConfig[1].dataSource = res.data.map(v => ({ label: v.name, value: v.id }));
          }
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
    this.fetchContractType();
    this.fetchRangeCombo();
  },
  filters: {
    format(v) {
      return v;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./QuotaProgress.scss";
</style>
