<template>
    <div class="PromiseCheck">
        <SearchComp :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/query-balance/queryFundReserve"></SearchComp>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let searchConfig = [
    {
        type: 'select',
        field: 'field6',
        label: '字段十：',
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
        label: '字段十一：'
    },
    {
        type: 'input',
        field: 'field5',
        label: '字段十二：'
    }
];
export default {
    name: 'PromiseCheck',
    components: { SearchComp },
    data() {
        return {
            searchConfig: searchConfig
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
@import './PromiseCheck.scss';
</style>