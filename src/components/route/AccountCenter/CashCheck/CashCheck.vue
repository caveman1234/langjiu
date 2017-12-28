<template>
    <div class="CashCheck">
        <SearchComp :searchConfig="searchConfig" serverUrl="/ocm-web/api/b2b/query-balance/queryFundReserve" @receiveData="receiveData"></SearchComp>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let searchConfig = [
    {
        type: 'select',
        field: 'field6',
        label: '字段一：',
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
        type: 'datePickerRange',
        field: 'field9',
        label: '字段二：'
    },
    {
        type: 'input',
        field: 'field5',
        label: '字段三：'
    }
];
export default {
    name: 'CashCheck',
    components: { SearchComp },
    data(){
        return {
            searchConfig:searchConfig
        }
    },
    methods: {
        receiveData(data) {
            console.log(data);
        }
    }
}
</script>
<style lang="scss" scoped>
@import './CashCheck.scss';
</style>