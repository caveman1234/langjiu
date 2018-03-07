<template>
    <div class="AddRetrunWineOrder">
        <el-button @click="add" size="mini" type="primary">新增还酒单</el-button>
        <el-dialog :visible.sync="dialogVisible" width="1000" @close="handleClose" @open="handleOpen">
            <div class="AddNewGoodsTitle" slot="title">
                <h2 class="title">新增还酒单</h2>
                <div class="search">
                    <el-input v-model="searchName" size="mini" placeholder="请输入产品名称">
                        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="dialogContainer">
                <el-table @selection-change="selectChange" :data="searchData" ref="multipleTable" height="400" style="width: 100%">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="productDesc" label="产品名称" width="300">
                        <template slot-scope="scope">
                            <div class="detailContainer">
                                <div :style='{"backgroundImage":`url(${scope.row.imageUrl || defaultImg})`}' class="goodsImg"></div>
                                <div class="desc">{{scope.row.productDesc}}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="规格">
                        <template slot-scope="scope">
                            <div class="standard">
                                <div>容量：{{scope.row.standard}}ml</div>
                                <div>度数：{{scope.row.productModel}}度</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="价格">
                        <template slot-scope="scope">
                            <div class="standard">
                                <div>价格：{{scope.row.basicPrice||'暂无价格'}}</div>
                                <div>共建：{{scope.row.fundPrice || 0}}</div>
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
            default() {
                return "/ocm-web/api/base/prod/search-for-purchase-order"
                
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            searchName: '',/* 搜索条件名字 */
            searchData: [],/* 搜索的数据 */
            selectedData: [],/* 选中的数据 */
            prodGroupId: '',
            defaultImg: require('../../../../../assets/defaultimg.png'),
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
        handleOpen() {
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId,
                    prodGroupId: this.prodGroupId
                }
            };
            this.searchGoodsInfo(paramsWrap);
        },
        cancel() {
            this.dialogVisible = false;
        },
        confirm() {
            this.$emit('receiveSearchData', this.selectedData);
            this.dialogVisible = false;
        },
        search() {
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId,
                    prodGroupId: this.prodGroupId,
                    content: this.searchName
                }
            };
            this.searchGoodsInfo(paramsWrap);
        },
        selectChange(selectedArr) {
            this.selectedData = selectedArr;
        },
        searchGoodsInfo(params) {/* 异步获取表格数据 */
            let _this = this;
            let url = this.searchUrl;
            _this.$http.get(url, params)
                .then(res => {
                    let data = res.data;
                    let searchData = data.map(v => {
                        //baleQuantity 箱数
                        //costOffMoney 费用折扣金额
                        //baseQuantity 瓶数
                        return Object.assign(
                            {},
                            v,
                            {
                                costOffMoney: 0,
                                baleQuantity: 1,
                                baseQuantity: v.packageNum
                            }
                        );
                    }).filter(v => v.basicPrice);
                    _this.searchData = searchData;
                });
        },
        //获取产品线
        fetchProductList() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: _this.$store.state.customerId
                }
            };
            let serverUrl = '/ocm-web/api/base/prodline/get-mgr-list';
            _this.$http.get(serverUrl, paramsWrap)
                .then(res => {
                    let data = res.data;
                    let smallWineProdGroupId = data.find(v => v.code === '022102').id;
                    _this.prodGroupId = smallWineProdGroupId;
                });
        }
    },
    mounted() {
        this.fetchProductList();
    }
}
</script>
<style lang="scss">
@import './AddRetrunWineOrder.scss';
</style>

