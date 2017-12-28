<template>
    <div class="SearchComp">

        <el-form label-position="right" label-width="100px" :model="formDatas" size="mini">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="名称">
                        <el-input v-model="formDatas.field1"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="活动区域">
                        <el-input v-model="formDatas.field2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="活动区域">
                        <el-input v-model="formDatas.field2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="活动区域">
                        <el-input v-model="formDatas.field2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="活动区域">
                        <el-input v-model="formDatas.field2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="活动区域">
                        <el-input v-model="formDatas.field2"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
    </div>
</template>
<script>
let defaultConfig = [
    {
        type: 'input',
        field: 'field1',
        label: '字段一'
    },
    {
        type: 'input',
        field: 'field2',
        label: '字段二'
    }
];
export default {
    name: 'SearchComp',
    props: {
        searchConfig: {
            default() {
                return defaultConfig
            }
        }
    },
    data() {
        return {
            searchConfigInner: [],
            formDatas: {}
        }
    },
    methods: {
        func() {
            log(this.formDatas);
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
        }, {})
    }
}
</script>
<style lang="scss" scoped>
@import './SearchComp.scss';
</style>
