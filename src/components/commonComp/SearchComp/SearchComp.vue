<template>
    <div class="SearchComp">
        <el-form label-position="right" label-width="100px" :model="formDatas" size="mini">
            <el-row>
                <template v-for="(item,index) in searchConfigInner">
                    <el-col :span="12" :key="index" class="clearfix">
                        <template v-if="item.type == 'input'">
                            <el-form-item :label="item.label">
                                <el-input v-model="formDatas[item.field]"></el-input>
                            </el-form-item>
                        </template>
                        <template v-if="item.type == 'select'">
                            <el-form-item :label="item.label">
                                <el-select v-model="formDatas[item.field]" placeholder="请选择">
                                    <el-option v-for="(itemSelect,selectIndex) in item.combo" :key="selectIndex" :label="itemSelect.label" :value="itemSelect.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                        <template v-if="item.type == 'radio'">
                            <el-form-item :label="item.label">
                                <el-radio-group v-model="formDatas[item.field]">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
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
        combo: [
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
                return '/ocm-web/api/b2b/query-balance/queryFundReserve'
            }
        },
    },
    data() {
        return {
            searchConfigInner: [],//元数据，
            formDatas: {},//v-model数据绑定
        }
    },
    methods: {
        search() {
            let _this = this;
            let formData = this.formDatas;
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId,
                    ...formData
                }
            };
            let url = _this.serverUrl;
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.$emit('receiveData', res.data);
                });
        },
        reset() {
            let formDatas = this.formDatas;
            Object.keys(formDatas).forEach(key => {
                formDatas[key] = '';
            })
        }
    },
    mounted() {
        let _this = this;
        _this.searchConfigInner = this.searchConfig
        _this.formDatas = _this.searchConfigInner.reduce((acc, obj) => {
            return Object.assign(
                {},
                acc,
                {
                    [obj.field]: ''
                }
            );
        }, {});
    }
}
</script>
<style lang="scss" scoped>
@import './SearchComp.scss';
</style>
