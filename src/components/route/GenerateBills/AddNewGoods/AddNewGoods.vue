<template>
    <div class="AddNewGoods">
        <el-button @click="add" size="mini" type="primary">新增产品</el-button>
        <el-dialog :visible.sync="dialogVisible" width="1000" @close="handleClose" @open="handleOpen">
            <div class="AddNewGoodsTitle" slot="title">
                <h2 class="title">新增产品</h2>
                <div class="search">
                    <el-input v-model="searchName" size="mini" placeholder="请输入产品名称">
                        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="dialogContainer">
                <el-table @selection-change="selectChange" :data="searchData" ref="multipleTable" height="400" style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="brief" label="产品名称"></el-table-column>
                    <el-table-column prop="" label="规格">
                        <template slot-scope="scope">
                            <div class="standard">
                                <div>容量：{{scope.row.volume}}ml</div>
                                <div>度数：{{scope.row.strength}}度</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="价格">
                        <template slot-scope="scope">
                            <div class="standard">
                                <div>价格：{{scope.row.price}}</div>
                                <div>共建：{{scope.row.commonBuild}}</div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'AddNewGoods',
    props: {
        searchUrl: {
            default(){
                return "static/goodsList.json"
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            searchName: '',/* 搜索条件名字 */
            searchData: [],/* 搜索的数据 */
            selectedData: [],/* 选中的数据 */
        }
    },
    methods: {
        add() {
            this.dialogVisible = true;
        },
        handleClose(done) {/* 关闭弹窗 */
            /* 清空 */
            this.selectedData = [];
            this.searchData = [];
            this.$refs.multipleTable.clearSelection();
            this.searchName = '';
        },
        handleOpen(){
            this.searchGoodsInfo();
        },
        cancel() {
            this.dialogVisible = false;
        },
        confirm() {
            this.$emit('receiveData', this.selectedData);
            this.dialogVisible = false;
        },
        search() {
            let params = {
                productName: this.searchName
            };
            this.searchGoodsInfo(params);
        },
        selectChange(selectedArr) {
            this.selectedData = selectedArr;
        },
        searchGoodsInfo(params) {/* 异步获取数据 */
            let _this = this;
            let url = this.searchUrl;
            _this.$http.get(url, params)
                .then(res => {
                    let data = res.data.data;
                    _this.searchData = data;
                });
        }
    },
    mounted() {
        
    }
}
</script>
<style lang="scss">
@import './AddNewGoods.scss';
</style>

