<template>
  <div class="Inquiry">
    <SearchComp ref="searchRef" :searchConfig="searchConfig"  @receiveData="receiveData" serverUrl="/ocm-web//api/noticeQuestionary/zdpageQuery"></SearchComp>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="title" label="标题">
          <template slot-scope="scope">
            <div>
                {{scope.row.title}}
            </div>
          </template>
      </el-table-column>
      <el-table-column prop="endDate" label="调查结束日期">
        <template slot-scope="scope">
          <div>
              {{scope.row.endDate | formatDate}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="fillState" label="填报状态">
        <template slot-scope="scope">
          <div>
              {{scope.row.fillState | formatFillState}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <div>
              <template v-if="scope.row.fillState == 1">
                <el-button @click="look(scope.row)" size="mini">查看</el-button>
              </template>
              <template v-else>
                <el-button v-if="scope.row.fillState === 0 && new Date().getTime() < scope.row.endDate"  @click="fillIn(scope.row)" size="mini">填写</el-button>
              </template>
              <!-- <template v-if="scope.row.fillState == 1 && new Date().getTime() < scope.row.endDate">
                <el-button @click="edit(scope.row)" size="mini">填写</el-button>
              </template> -->
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageParams.pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageParams.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageParams.total" prev-text="上一页" next-text="下一页"></el-pagination>
  </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let searchConfig = [
  {
    type: 'input',
    field: 'title',
    label: '标题：'
  },
  {
    type: 'datePickerRange',
    field: 'endDate',
    label: '结束日期：'
  },
];
export default {
  name: 'Inquiry',
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
      fillDisabled: false
    }
  },
  methods: {
    receiveData(data) {
      this.tableData = data.content;
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
    //编辑
    edit(row) {
      let dataId = row.dataid;
      let templateId = row.templateId;
      let url = "https://pro.formtalk.net/w.do";

      let openUrl = `${url}?f=${templateId}&d=${dataId}&v=EDIT`;
      window.open(openUrl);
    },
    //查看
    look(row) {
      let dataId = row.dataid;
      let templateId = row.templateId;
      let url = "https://pro.formtalk.net/w.do";
      let openUrl = `${url}?f=${templateId}&d=${dataId}`;
      window.open(openUrl);
    },
    fillIn(row) {
      this.fillDisabled = true;
      let templateId = row.templateId;
      let url = "https://pro.formtalk.net/w.do";
      let id = row.id;
      let agencyCode = row.agencyCode;//办事处编码
      let agencyName = row.agencyName;//办事处名称
      let cityCode = row.cityCode;//城市编码
      let cityName = row.cityName;//城市名称
      let divisionCode = row.divisionCode;//事业部编码
      let divisionName = row.divisionName;//事业部名称
      let customerCode = this.$store.state.username;
      let customerName = this.$store.state.userloginName;
      let data4Display = {
        tempId: id,
        agencyCode,
        agencyName,
        cityCode,
        cityName,
        divisionCode,
        divisionName,
        customerCode,
        customerName
      };
      debugger
      let openUrl = `${url}?f=${templateId}&data4Display=${encodeURIComponent(JSON.stringify(data4Display))}`;
      window.open(openUrl);
    },
    getUrlParam(url, name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"),
        r = decodeURIComponent(url).substr(1).match(reg);
      return r != null ? decodeURI(r[2]) : null;
    }
  },
  mounted() {
    let _this = this;
    let params = {
      page: 0,
      size: _this.pageParams.pageSize
    };
    _this.$refs.searchRef.search(params);
    _this.$store.commit('changeCurrentNav', { hash: '/Inquiry' });
  },
  filters: {
    formatFillState(value) {
      let obj = {
        0: '未填报',
        1: '已填报'
      };
      return obj[value];
    }
  }
}
</script>
<style lang="scss">
@import "./Inquiry.scss";
</style>
