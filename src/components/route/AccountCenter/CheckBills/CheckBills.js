import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
import CheckDialog from './CheckDialog/CheckDialog';
import ReplyLetter from './ReplyLetter/ReplyLetter';
let searchConfig = [
    {
        type: 'select',
        field: 'type',
        label: '对账涵类型：',
        dataSource: [
            {
                value: '1',
                label: '往来款询证函'
            },
            {
                value: '2',
                label: '费用询证函'
            }
        ]
    },
    {
        type: 'datePickerRange',
        field: 'endDate',
        label: '截止日期：'
    },
    {
        type: 'select',
        field: 'reply',
        label: '回函状态：',
        dataSource: [
            {
                value: '3',
                label: '未回函'
            },
            {
                value: '1',
                label: '电子回函'
            },
            {
                value: '2',
                label: '纸质回函'
            }
        ]
    },
    {
        type: 'select',
        field: 'confirm',
        label: '确认结果：',
        dataSource: [
            {
                value: '3',
                label: '未确认'
            },
            {
                value: '2',
                label: '已接受'
            },
            {
                value: '1',
                label: '已拒绝'
            }
        ]
    }
];
let defaultData = [
    {
        typeCode: 1,
        endDate: 1522054334725,
        creationTime: 1522054334725,
        resultCode: 1,
        replystateCode: 1,
        confirmresultCode: 1,
        attachment: 'www.baidu.com'
    },
    {
        typeCode: 2,
        endDate: 1522054334725,
        creationTime: 1522054334725,
        resultCode: 1,
        replystateCode: 1,
        confirmresultCode: 1
    }
];
export default {
    name: 'CheckBills',
    components: { SearchComp, CheckDialog ,ReplyLetter},
    data() {
        return {
            dialogVisible: false,//对账dialog
            dialogVisibleReapy:false,//回函dialog
            detail: {},//对账详情数据
            searchConfig: searchConfig,
            currentId:'',//回函当前的id
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
            window.open(row.attachment);
        },
        //往来对账
        contackCheck({ id }) {
            let _this = this;
            let customerId = _this.$store.state.customerId;
            let paramsWrap = {
                params: {
                    id,
                    customerId
                }
            };
            let url = '/ocm-web/api/b2b/reconciliation/detail';
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        _this.dialogVisible = true;
                        _this.detail = res.data;
                    }
                });


        },
        //费用对账
        feeCheck({ id }) {
            let _this = this;
            let customerId = _this.$store.state.customerId;
            let paramsWrap = {
                params: {
                    id,
                    customerId
                }
            };
            let url = '/ocm-web//api/b2b/reconciliation/detail';
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        _this.dialogVisible = true;
                        _this.detail = res.data;
                    }
                });
        },
        //弹窗内确认对账
        confirmDialog(params) {
            let _this = this;
            let url = '/ocm-web/api/b2b/reconciliation/result';
            _this.$http.post(url, params)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1'){
                        let params = {
                            page: 0,
                            size: _this.pageParams.pageSize
                        };
                        _this.$refs.searchRef.search(params);
                    }
                })
        },
        //回函
        replyLetter({id}){
            debugger
            this.currentId = id;
            this.dialogVisibleReapy = true;
        },
        replyLetterConfirm(){
            //回函确认上传完成
            let _this = this;
            let params = {
                page: 0,
                size: _this.pageParams.pageSize
            };
            _this.$refs.searchRef.search(params);
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
        //格式化对账类型
        formatType(value) {
            var obj = {
                1: '往来款询证函',
                2: '费用询证函'
            };
            return obj[value];
        },
        //格式化对账结果
        formatCheckResult(value) {
            var obj = {
                1: '相符',
                2: '不相符'
            };
            return obj[value];
        },
        //格式化回函状态
        formatReply(value) {
            var obj = {
                3: '未回函',
                1: '电子回函',
                2: '纸质回函'
            };
            return obj[value];
        },
        //格式化确认结果
        formatConfirm(value) {
            var obj = {
                3: '未确认',
                2: '已接收',
                1: '已拒绝'
            };
            return obj[value];
        }
    }
}