<template>
    <div class="CashCheck">
        <div>
            CashCheck现金余额对账
        </div>
        <SearchComp></SearchComp>
    </div>
</template>
<script>
import SearchComp from '@/components/commonComp/SearchComp/SearchComp';
export default {
    name: 'CashCheck',
    components: { SearchComp }
}
</script>
<style lang="scss" scoped>
@import './CashCheck.scss';
</style>