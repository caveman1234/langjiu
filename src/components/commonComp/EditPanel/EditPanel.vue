<template>
    <div class="EditPanel">
        <el-row>
            <el-form :model="formData"
                ref="formData1"
                :rules="rules">
                <template v-for="(item,index) in defaultConfig">
                    <div class="ui-item"
                        :key="index">
                        <el-form-item :label="item.name+':'"
                            label-width="120px"
                            size="mini"
                            :prop="item.field">
                            <div class="formText">
                                <template v-if="item.canEdit">
                                    <el-input v-model="formData[item.field]"></el-input>
                                </template>
                                <template v-else>
                                    {{formData[item.field]}}
                                </template>
                            </div>
                        </el-form-item>
                    </div>
                </template>
            </el-form>
        </el-row>
        <el-row type="flex"
            justify="end">
            <el-col :span="4">
                <el-button @click="reset"
                    size="mini"
                    plain>重置</el-button>
                <el-button @click="confirm"
                    size="mini"
                    type="primary">确定</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
let defaultConfig = [
    {
        field: 'field1',
        name: '字段一',
        canEdit: false,
        fieldValue: '1'
    },
    {
        field: 'field2',
        name: '字段二',
        canEdit: true,
        fieldValue: '2',
        rule: {
            field2: [{ required: true, message: '输入不能为空', trigger: 'blur' }]
        }
    },
    {
        field: 'field3',
        name: '字段三',
        canEdit: true,
        fieldValue: '3',
        rule: {
            field3: [{ required: true, message: '输入不能为空', trigger: 'blur' }]
        }
    },
    {
        field: 'field4',
        name: '字段三',
        canEdit: false,
        fieldValue: '4'
    },
    {
        field: 'field5',
        name: '字段三',
        canEdit: false,
        fieldValue: '5'
    },
    {
        field: 'field6',
        name: '字段三',
        canEdit: false,
        fieldValue: '6'
    }
];
export default {
    name: 'EditPanel',
    props: {
        defaultConfig: {
            default() {
                return []
            }
        }
    },
    data() {
        return {
            formData: {},
            rules: {}
        }
    },
    methods: {
        editClick(item) {
            debugger
        },
        reset() {
            this.$refs.formData1.resetFields();
        },
        confirm() {
            let _this = this;
            _this.$refs.formData1.validate((valid) => {
                if (valid) {
                    _this.$emit("receiveFormData", this.formData);
                } else {
                    return false;
                }
            });

        },
    },
    mounted() {
        let _this = this;
        // _this.defaultConfig = defaultConfig;
        _this.formData = _this.defaultConfig.reduce((acc, v) => {
            acc[v.field] = v.fieldValue;
            if (v.rule) {
                let mergerObj = {
                    [v.field]: v.rule[v.field]
                };
                _this.rules = Object.assign({}, _this.rules, mergerObj);
            }
            return acc;
        }, {});
    }
}
</script>
<style lang="scss">
@import './EditPanel.scss';
</style>
