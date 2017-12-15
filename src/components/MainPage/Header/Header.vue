<template>
  <div class="Header">
    <div class="headerTop">
      <div class="content clearfix">
        <div class="left">
          <span class="login">请登陆</span>
          <span class="phone">产品热线：028-88888888</span>
        </div>
        <div class="right">
          <a>收藏夹</a>|
          <a>帮助</a>|
          <a>注销</a>
          <a>经销商助手</a>
        </div>

      </div>
    </div>
    <div class="headerBottom">
      <div class="content clearfix">
        <div class="logo"><img src="src/assets/logo.png" alt=""></div>
        <div class="nav">
          <ul>
            <template v-for="(item,index) in navList">
              <router-link :to="item.routeTo" :key="index">
                <li @click="headerClick(index)" :class="[item.hasSelected?'navItemSelected':'']">{{item.name}}</li>
              </router-link>
            </template>
          </ul>
        </div>
        <div class="search">
          <div class="inBill">
            <span class="car">
              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEzMzI0NzM3MzI3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIwMjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTAyLjIwOCAzNDQuNzA0bC01NDcuODQgMEwzMDguNjA4IDE2Ny41NTJDMzAzLjgwOCAxNDguNjcyIDI4Ni43MiAxMzUuNDI0IDI2Ny4yIDEzNS40MjRMMTAyLjAxNiAxMzUuNDI0Yy0xNS43NDQgMC0yNS43MjggMTIuNDgtMjIuMzM2IDI3LjkwNEw4Ni40IDE5My4xNTJjMy4zOTIgMTUuNDI0IDE4Ljg4IDI3LjkwNCAzNC42ODggMjcuOTA0bDExMy4wMjQgMCAxMzguODggNTM4LjQzMmM0LjkyOCAxOC44OCAyMS45NTIgMzIuMDY0IDQxLjQ3MiAzMi4wNjRsNDEwLjI0IDBjMTUuNzQ0IDAgMjguNTQ0LTEyLjczNiAyOC41NDQtMjguNDhsMC0yOC41NDRjMC0xNS42OC0xMi44LTI4LjQxNi0yOC41NDQtMjguNDE2TDQ0Ny41NTIgNzA2LjExMmwtOS43OTItMzguMjA4IDQyMy4xMDQgMCA4MS42NjQtMjY4LjYwOEM5NTEuNzQ0IDM2OS4wODggOTMzLjYzMiAzNDQuNzA0IDkwMi4yMDggMzQ0LjcwNHoiIHAtaWQ9IjIwMjIiIGZpbGw9IiNFNzQ0MkUiPjwvcGF0aD48cGF0aCBkPSJNMzk2LjggODg2LjU5Mm0tNjYuNTYgMGExLjA0IDEuMDQgMCAxIDAgMTMzLjEyIDAgMS4wNCAxLjA0IDAgMSAwLTEzMy4xMiAwWiIgcC1pZD0iMjAyMyIgZmlsbD0iI0U3NDQyRSI+PC9wYXRoPjxwYXRoIGQ9Ik04MjQuNjQgODg2LjU5Mm0tNjYuNTYgMGExLjA0IDEuMDQgMCAxIDAgMTMzLjEyIDAgMS4wNCAxLjA0IDAgMSAwLTEzMy4xMiAwWiIgcC1pZD0iMjAyNCIgZmlsbD0iI0U3NDQyRSI+PC9wYXRoPjwvc3ZnPg==" alt="">
            </span>
            <span class="text">进货单
              <i>88</i>
            </span>
          </div>
          <div class="searchSection">
            <div class="searchInp">
              <!-- <input type="text" placeholder="搜索内容" name="" value=""> -->
              <el-input placeholder="搜索内容" v-model="searchInfo" class="input-with-select">
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let navList = [
  { name: "首页", routeTo: "/Home", hasSelected: true },
  { name: "商品中心", routeTo: "/GoodsCenter", hasSelected: false },
  { name: "订单中心", routeTo: "/OrderCenter", hasSelected: false },
  { name: "账户中心", routeTo: "/AccountCenter", hasSelected: false },
  { name: "消息中心", routeTo: "/MsgCenter", hasSelected: false },
];
export default {
  name: 'Header',
  data() {
    return {
      searchInfo:"",
      navList: navList
    }
  },
  methods: {
    headerClick(index) {
      this.navList.forEach((v, i) => {
        if (index == i) {
          this.navList[i].hasSelected = true;
        } else {
          this.navList[i].hasSelected = false;
        }
      });
    },
    search(){
    console.log(this.searchInfo.trim());
  }
  }
  
}
</script>
<style lang="scss">
@import "./Header.scss";
</style>

