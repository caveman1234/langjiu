<template>
    <div class="SearchComp">
        <el-form label-position="right" label-width="100px" :model="formDatas" size="mini">
            <el-row>
                <template v-for="(item,index) in searchConfig">
                    <el-col style="width:315px;" :span="8" :key="index" class="clearfix">
                        <template v-if="item.type == 'input'">
                            <el-form-item :label="item.label">
                                <el-input @keyup.enter.native="inputEnter" v-model="formDatas[item.field]"></el-input>
                            </el-form-item>
                        </template>
                        <template v-if="item.type == 'select'">
                            <el-form-item :label="item.label">
                                <el-select v-model="formDatas[item.field]" placeholder="请选择">
                                    <el-option v-for="(itemSelect,selectIndex) in item.dataSource" :key="selectIndex" :label="itemSelect.label" :value="itemSelect.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                        <template v-if="item.type == 'radio'">
                            <el-form-item :label="item.label">
                                <el-radio-group v-model="formDatas[item.field]">
                                    <el-radio v-for="(itemRadio,radioIndex) in item.dataSource" :label="itemRadio.value" :key="radioIndex">{{itemRadio.label}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </template>
                        <template v-if="item.type == 'datePicker'">
                            <el-form-item :label="item.label">
                                <el-date-picker v-model="formDatas[item.field]" type="date" placeholder="选择日期"></el-date-picker>
                            </el-form-item>
                        </template>
                        <template v-if="item.type == 'datePickerRange'">
                            <el-form-item v-if="disable11" :label="item.label">
                                <el-date-picker :picker-options="pickerOptions1" v-model="formDatas[item.field]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                            </el-form-item>
                            <el-form-item v-else :label="item.label">
                                <el-date-picker v-model="formDatas[item.field]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                            </el-form-item>
                        </template>
                    </el-col>
                </template>
            </el-row>
        </el-form>
        <el-row type="flex" class="row-bg" justify="end">
            <!-- <el-popover
                placement="top"
                width="200"
                v-model="exportVisiable">
                <p>是否导出符合当前查询条件的全部数据?</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="exportVisiable = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="exportData">确定</el-button>
                </div>
                <el-button v-show="canExport" size="mini" slot="reference" style="margin-right:10px;">导出</el-button>
            </el-popover> -->
            <el-button v-show="canExport" type="plain" size="mini" @click="exportData">导出</el-button>
            <el-button @click="reset" size="mini">清空</el-button>
            <el-button @click="search" type="primary" size="mini">搜索</el-button>
        </el-row>
        <iframe name="l_exportDataFrame" v-show="false"></iframe>
        <form target="l_exportDataFrame" v-show="false" id="exportExcellForm" method="post" :action="exportUrl">
            <input type="text" name="isAll" value="true">
            <input type="text" name="isEdit" value="false">
            <input id="exportSearchParams" type="text" name="searchParams" :value="searchParamsFormat">
        </form>
    </div>
</template>
<script>
let defaultConfig = [
    {
        type: 'input',
        field: 'field5',
        label: '字段五'
    },
    {
        type: 'select',
        field: 'field6',
        label: '字段六',
        defaultValue: 1,
        dataSource: [
            {
                label: '选项一',
                value: 1
            },
            {
                label: '选项二',
                value: 2
            }
        ]
    },
    {
        type: 'radio',
        field: 'field7',
        label: '字段七'
    },
    {
        type: 'datePicker',
        field: 'field8',
        label: '字段八'
    },
    {
        type: 'datePickerRange',
        field: 'field9',
        label: '字段九'
    },
];

export default {
    name: 'SearchComp',
    props: {
        searchConfig: {
            default() {
                return defaultConfig
            }
        },
        serverUrl: {
            default() {
                return ''
            }
        },
        //额外字段
        extralParams: {
            default() {
                return {

                }
            }
        },
        method: {
            default() {
                return 'get'
            }
        },
        disable11: {
            default() {
                return false
            }
        },
        canExport: {
            default() {
                return false
            }
        },
        exportUrl: {
            default() {
                return ""
            }
        }
    },
    data() {
        return {
            exportVisiable: false,
            formDatas: {},//v-model数据绑定
            searchParams: {},//缓存搜索参数,用着导出
            searchParamsFormat: "",
            pickerOptions1: {
                disabledDate(time) {
                    let currentYear = (new Date()).getFullYear();
                    let date11 = new Date(`${currentYear}-01-01`);
                    return time.getTime() < (date11.getTime() - 86400000);
                },
            }
        }
    },
    methods: {
        search(pageParams) {
            let _this = this;
            let page = 0;
            let size = 10;
            if (pageParams.hasOwnProperty('page')) {
                page = pageParams.page;
                size = pageParams.size;
            }
            //浅拷贝from表单数据
            let formData = Object.assign({}, this.formDatas);
            //时间段处理
            let dateTypeArr = ['datePickerRange'];
            _this.searchConfig.forEach(obj => {
                if (dateTypeArr.includes(obj.type)) {
                    if (formData[obj.field]) {
                        formData[`${obj.field}Begin`] = formData[obj.field][0].getTime();
                        formData[`${obj.field}End`] = formData[obj.field][1].getTime();
                    }
                    delete formData[obj.field];
                }
            });
            //拼接参数
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId,
                    ...formData,//搜索的form表单数据
                    ..._this.extralParams,//搜索的额外字段
                    page,
                    size
                }
            };
            paramsWrap.params = Object.keys(paramsWrap.params).reduce((acc, key) => {
                if (!(paramsWrap.params[key] == '' || paramsWrap.params[key] == null)) {
                    acc[key] = paramsWrap.params[key];
                }
                return acc;
            }, {})
            let url = _this.serverUrl;
            if(url.includes('/ocm-web/api/base/quota-customer-excel/getList')){
                delete paramsWrap.params.size;
            }
            //导出参数
            this.searchParams = {...paramsWrap.params};
            delete this.searchParams.page;
            delete this.searchParams.size;
            if (this.method == 'get') {
                _this.$http.get(url, paramsWrap)
                    .then(res => _this.$emit('receiveData', res.data));
            } else {
                _this.$http.post(url, paramsWrap.params)
                    .then(res => _this.$emit('receiveData', res.data));
            }

        },
        reset() {
            let _this = this;
            _this.searchConfig.forEach(obj => {
                _this.formDatas[obj.field] = '';
            })
        },
        inputEnter(e) {
            this.search(e)
        },
        //导出数据
        exportData() {
            /* var temp = {
                "search_EQ_distributor.id": "171b88f4-b36b-4335-b756-0666acc41008",
                "search_LIKE_orderCode": "%PO180514007%",
                "search_GTE_orderDate_date": 1525795200000,
                "search_LT_orderDate_date": 1528387200000,
                "search_EQ_billStatus": "01"
            } */
            let searchParams = Object.assign({}, this.searchParams);
            var searchParamsFormat = {};
            // debugger
            // Object.keys(searchParams).forEach(field => {
            //     if (field == "distributorIds") {
            //         searchParamsFormat["search_EQ_distributor.id"] = searchParams.distributorIds;
            //     }
            //     var currentConfig = this.searchConfig.find(v => {
            //         return v.field == field.replace(/(Begin$)|(End$)/g,'')
            //     });
            //     if (currentConfig) {
            //         switch (currentConfig.type) {
            //             case "input":
            //                 searchParamsFormat[`search_LIKE_${field}`] = `%${searchParams[field]}%`;
            //                 break;
            //             case "datePickerRange":
            //                 debugger
            //                 searchParamsFormat[`search_GTE_${currentConfig.field}_date`] = `${searchParams[`${currentConfig.field}Begin`]}`;
            //                 searchParamsFormat[`search_LT_${currentConfig.field}_date`] = `${searchParams[`${currentConfig.field}End`]}`;
            //                 break;
            //             case "select":
            //                 searchParamsFormat[`search_EQ_${field}`] = `${searchParams[field]}`;
            //                 break;
            //         }
            //     }
            // });
            // debugger
            this.searchParamsFormat = JSON.stringify(searchParams);
            // $("#exportSearchParams").attr("value", JSON.stringify({ "search_EQ_distributor.id": searchParams.distributorIds }));
            $("#exportSearchParams").attr("value", JSON.stringify(this.searchParamsFormat));

            if (searchParams.distributorIds) {
                document.forms.exportExcellForm.submit();
            }



        }

    },
    mounted() {
        let _this = this;
        //设置form表单需要的字段--其默认值
        _this.formDatas = _this.searchConfig.reduce((acc, obj) => {
            return Object.assign(
                {},
                acc,
                {
                    [obj.field]: (obj.defaultValue ? obj.defaultValue : '')
                }
            );
        }, {});
    }
}
</script>
<style lang="scss" >
@import "./SearchComp.scss";
</style>
