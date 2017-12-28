<template>
    <div class="CostCheck">
        <SearchComp :searchConfig="searchConfig" @receiveData="receiveData" serverUrl="/ocm-web/api/b2b/query-balance/queryFundReserve"></SearchComp>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
let searchConfig = [
    {
        type: 'select',
        field: 'field6',
        label: '字段四：',
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
        label: '字段五：'
    },
    {
        type: 'input',
        field: 'field5',
        label: '字段六：'
    }
];
export default {
    name: 'CostCheck',
    components:{SearchComp},
    data(){
        return {
            searchConfig:searchConfig
        }
    },
    methods:{
        receiveData(data){
            console.log(data);
        }
    }
}
</script>
<style lang="scss" scoped>
@import './CostCheck.scss';
</style>