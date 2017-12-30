<template>
    <div class="SearchComp">
        <el-form label-position="right" label-width="100px" :model="formDatas" size="mini">
            <el-row>
                <template v-for="(item,index) in searchConfig">
                    <el-col :span="8" :key="index" class="clearfix">
                        <template v-if="item.type == 'input'">
                            <el-form-item :label="item.label">
                                <el-input v-model="formDatas[item.field]"></el-input>
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
                            <el-form-item :label="item.label">
                                <el-date-picker v-model="formDatas[item.field]" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                            </el-form-item>
                        </template>
                    </el-col>
                </template>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="20">
                <div class="opacity0">1</div>
            </el-col>
            <el-col :span="4">
                <el-button @click="search" type="primary" size="mini">搜索</el-button>
                <el-button @click="reset" type="primary" size="mini">清空</el-button>
            </el-col>
        </el-row>
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
    },
    data() {
        return {
            formDatas: {},//v-model数据绑定
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
                    ...formData,
                    page,
                    size
                }
            };
            let url = _this.serverUrl;
            _this.$http.get(url, paramsWrap)
                .then(res => _this.$emit('receiveData', res.data));
        },
        reset() {
            let _this = this;
            _this.searchConfig.forEach(obj => {
                _this.formDatas[obj.field] = '';
            })
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
@import './SearchComp.scss';
</style>
