<template>
  <div class="GoodsCenter">
    <div class="treeList">
      <el-tree 
        :data="treeData" 
        :props="defaultProps" 
        node-key="id" 
        :default-expanded-keys="[1]" 
        :highlight-current="true" 
        @node-click="handleNodeClick">
      </el-tree>
    </div>
    <div class="goodsItems">
      <h3>2</h3>
      <h3>3</h3>
      <h3>4</h3>
      <h3>5</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsCenter',
  data() {
    return {
      treeData: [
        {
          label: "青花郎系列",
          id: 1,
          children: [
            { label: '15年', id: 2 },
            { label: '20年', id: 3 }
          ]
        },
        {
          label: "老郎酒系列",
          id: 4,
          children: [
            { label: '2-1', id: 5 },
            { label: '2-2', id: 6 }
          ]
        },
        {
          label: "新郎酒系列",
          id: 11,
          children: [
            { label: '3-1', id: 7 },
            { label: '3-2', id: 8 }
          ]
        },
        {
          label: "小郎酒系列",
          id: 9,
          children: [
            { label: '4-1', id: 10 },
            { label: '4-2', id: 11 }
          ]
        },
        {
          label: "郎牌特曲系列",
          id: 12,
          children: [
            { label: '5-1', id: 13 },
            { label: '5-2', id: 14 }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
}
</script>
<style lang="scss">
@import "./GoodsCenter.scss";
</style>

