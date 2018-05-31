<template>
    <div class="CheckBills">
        <SearchComp ref="searchRef" :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/reconciliation/search"></SearchComp>
        <div class="tableContainer">
            <el-table :data="tableData" border>
                <el-table-column prop="typeCode" label="对账函类型">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.typeCode | formatType}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="endDate" label="对账截止日期">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.endDate | formatDate}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="creationTime" label="创建时间">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.creationTime | formatDate}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="resultCode" label="对账结果">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.resultCode | formatCheckResult}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="replystateCode" label="回函状态">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.replystateCode | formatReply}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="confirmresultCode" label="确认结果">
                    <template slot-scope="scope">
                        <div>
                            <div>{{scope.row.confirmresultCode | formatConfirm}}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="refusalReason" label="确认意见"></el-table-column>
                <el-table-column prop="" label="操作" min-width="250px">
                    <template slot-scope="scope">
                        <div>
                            <template v-if="scope.row.confirmresultCode !=1">
                                <template v-if="scope.row.resultCode == null">
                                    <template v-if="scope.row.typeCode == 1">
                                        <el-button @click="contackCheck(scope.row)" size="mini" type="primary">往来对账</el-button>
                                    </template>
                                    <template v-if="scope.row.typeCode == 2">
                                        <el-button @click="feeCheck(scope.row)" size="mini" type="primary">费用对账</el-button>
                                    </template>
                                </template>
                                
                                <template v-if="scope.row.attachment && scope.row.resultCode != null">
                                    <el-button size="mini" @click="download(scope.row)">下载</el-button>
                                </template>
                                <template v-if="scope.row.replystateCode == 3 && scope.row.resultCode != null">
                                    <!-- <el-button @click="replyLetter(scope.row)" size="mini">上传回函</el-button> -->
                                </template>
                            </template>
                            <template v-else>
                                <template v-if="scope.row.typeCode == 1">
                                    <el-button @click="contackCheck(scope.row)" size="mini" type="primary">往来对账</el-button>
                                </template>
                                <template v-if="scope.row.typeCode == 2">
                                    <el-button @click="feeCheck(scope.row)" size="mini" type="primary">费用对账</el-button>
                                </template>
                                <el-button size="mini" @click="download(scope.row)">下载</el-button>
                                <!-- <el-button @click="replyLetter(scope.row)" size="mini">上传回函</el-button> -->
                            </template>
                            <template v-if="scope.row.confirmresultCode !=2 && scope.row.resultCode != null">
                                <el-button @click="replyLetter(scope.row)" size="mini">上传回函</el-button>
                            </template>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageParams.pageIndex"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageParams.total"
                prev-text="上一页"
                next-text="下一页">
            </el-pagination>
        </div>
        <CheckDialog :detail="detail" @confirmDialog="confirmDialog" :dialogVisible.sync="dialogVisible"></CheckDialog>
        <ReplyLetter @replyLetterConfirm="replyLetterConfirm" :currentId="currentId" :dialogVisible.sync="dialogVisibleReapy"></ReplyLetter>        
    </div>
</template>
<script>
import CheckBills from './CheckBills.js';
export default CheckBills;
</script>
<style lang="scss">
@import "./CheckBills.scss";
</style>

