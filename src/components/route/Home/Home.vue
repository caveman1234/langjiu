<template>
    <div class="Home">
        <div class="bannerContainer">
            <div class="imgContainer">
                <el-carousel :interval="5000" arrow="always" height="500px">
                    <el-carousel-item v-for="item in imageArr" :key="item">
                        <img :src="item" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>




            <div class="msgContainer">
                <div class="counsel">
                    <a id="operation" title="业务咨询" href="javascript:void (0);" class="navbar-avatar">
                        <img style="width:16px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTMyNjgxODQyNjEzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5NzEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODgzLjUyODcxMiA1NjIuMDc2NTEyYzAuMjA4NzU0LTguNDUyNTA5IDAuMjMzMzE0LTE3LjA1MTM1MSAwLjA1NzMwNS0yNS42Njk2MzYgMi4yOTkzNjktMTE2LjU5NDQ4NS0zMi4zOTc4NzQtMjE0Ljg4MDk5OS0xMDAuMzYwNzU1LTI4NC4yNTI5NzItMzIuNDE2Mjk0LTMzLjA4MTQ0My03MS44NDAxODgtNTguNDcyNzM5LTExNy4wMTcxMS03NS43NzA3MDctNy4wMDk2NDctNjIuOTgyNDUtNzUuNDA5NDgtMTEyLjU2Njc1Mi0xNTguNDkyNzM0LTExMi41NjY3NTItODMuMDc4MTM3IDAtMTUxLjQ3NDkgNDkuNTg0MzAyLTE1OC40ODc2MTcgMTEyLjU2Njc1Mi00NS4xNzE4MDYgMTcuMjk2OTQ1LTg0LjU5MjYzIDQyLjY4OTI2NS0xMTcuMDAzODA3IDc1Ljc3MDcwN0MxNjQuMjQxNjY4IDMyMS41Mjg5NDcgMTI5LjUyODA1MiA0MTkuNjE2OTQgMTMxLjg0Mzc5NCA1MzUuODYxNDU0Yy0wLjIwMzYzOCAxMC45ODUxOTItMC4xMzYxIDIxLjI5ODA3MiAwLjIwNDY2MSAzMS4zNzY2MTUtMTcuNjE1MTkzIDE3LjczMDgyNi0zMS40MTQ0NzcgNDQuNTA3NjgtMjEuMzMwODE4IDgyLjA4MzQ4MyA3LjQ5NTcxOCAyNy45MjcwNDkgMjguMTUzMiA0OC44NDY0OTggNTMuNTAxNTE4IDU4LjAwNjExMiAxMi44ODEzNzggNy45NDA4NTYgMjguMDEwOTYxIDEyLjU2NzIyMyA0NC4xOTY1OTUgMTIuNjc0NjcxIDMyLjMyMjE1IDE0MS4zMDQyNiAxNDkuNjQzMTgyIDIzNy4yMzIwNTMgMzAyLjg0NDM5OSAyMzcuMjMyMDUzIDE1Mi45MjA4MzIgMCAyNzAuMjcxNTQtOTYuMTY4MjcgMzAyLjQwNTQwMS0yMzcuNTU0Mzk0IDAuOTg4NTE0IDAuMjE0ODk0IDIuMDE4OTgzIDAuMzM4NzE0IDMuMDcwOTQyIDAuMzM4NzE0IDIwLjE4MjY2OCAwIDM4Ljc0NzQ4OS03LjA1MDU4IDUzLjM5MTAwMS0xOC43ODY4NzggMTkuMTM4ODk2LTEwLjg2MDM0OSAzNC4xMDk4NjYtMjkuMDM1MjkgNDAuMjQ2NjMzLTUxLjkwOTI1NEM5MjEuNDkyMzQ4IDYwNy45MDMyMzQgOTAzLjU4MzQ2NiA1NzkuNTk2NTM4IDg4My41Mjg3MTIgNTYyLjA3NjUxMkw4ODMuNTI4NzEyIDU2Mi4wNzY1MTIgODgzLjUyODcxMiA1NjIuMDc2NTEyTTM3NC4wMzY4MzUgMzkzLjUwMzE4OWMyLjQzNTQ2OSA0LjA3MTczNSA2MC44MjIyNTEgMTAwLjM0MzM1OSAxNzAuODIyNTUgMTQyLjA3Mjc2MyAzMC4zNTAyMzkgMTEuNTE1MjY1IDYxLjQ0MzM5NyAxOC4xMDAyNCA5MS41MTYzMiAyNC40NjQxODEgNjAuMzE2NzM3IDEyLjc3ODAyNCAxMTcuMzAwNTY2IDI0Ljg0Njg5OCAxNTYuMTIxNzMzIDc1LjI0ODgyMSAwLjQwNDIwNiAwLjUyMzkzMyAwLjg1NTQ4NCAxLjAxMDAwMyAxLjMxOTA0MiAxLjQ2NTM3NC0wLjA2MjQyMiAyLjU0MTg5My0wLjA2MjQyMiAyLjU0NzAwOS0wLjA2MjQyMiAyLjU0NzAwOSAwIDE4Ljc4OTk0OC0xLjQxNzI3OSAzNi45NDc0OTQtNC4xNTM2IDU0LjM5NzkzNC00OS45MDc2NjcgNzkuNzM5MDg5LTEzMi43MTU2NTEgMTMxLjk5NDIyLTIzNS4yOTkwMjcgMTQzLjI1MDU4OC03LjY0NDA5Ny0xMC4wOTM4OTItMjMuMjE3Nzk0LTE3LjA0OTMwNS00MS4zMDc4MDEtMTcuMDQ5MzA1LTI1LjY1MjI0IDAtNDYuNDcxNDA0IDEzLjg4ODMxMi00Ni40NzE0MDQgMzAuOTc0NDU1IDAgMTcuMTI3MDc2IDIwLjgxOTE2NSAzMC45ODI2NDIgNDYuNDcxNDA0IDMwLjk4MjY0MiAyMi45OTY3NiAwIDQxLjk0MTIyOC0xMS4xODg4MyA0NS42MjcxNzctMjUuODI1MTc5IDMzLjA4MzQ4OS0zLjgwMTU4MyA2NC42MzA5OTYtMTEuNzA0NTc2IDk0LjIwNDU0NS0yMy42NDk2MyA0Mi4yNDQxMjYtMTcuMDU4NTE0IDc5LjQ3MzAyOS00MS45MTE1NTIgMTEwLjYzNTc3My03My44NzE0NTEgNC45OTA2NjQtNS4xMDYyOTggOS43Nzk3MzctMTAuMzk3ODE0IDE0LjQxMTIyMS0xNS44MjY0NTQtMzcuMTQyOTQ1IDExMy4xMjY1LTEzNi40MzUzNjkgMTg1Ljg0Nzc1NS0yNjYuMDY0NzI4IDE4NS44NTkwMTJsMCAwYy0wLjIzMzMxNC0wLjAxMjI4LTAuODY5ODEtMC4wMTIyOC0xLjEwMTA3Ny0wLjAxMjI4LTE2Ni4zMjgxODkgMC0yODIuNDk1OTU2LTExOC45MzU4MS0yODIuNDk1OTU2LTI4OS41MDA0ODdsLTAuMzEyMTA4LTE2LjIzMDY2Yy0wLjIwNDY2MS02Ljk1NTQxMiAwLjg3MTg1Ny0yNi40OTIzNzQgMi4wMzEyNjMtNDUuMjI4MDg3IDkwLjY3NDEzOS0zMi4wNzg2MDMgMTI4LjMyMzYyMS0xMjQuMjQ0NzIyIDEyOS45NzExNDQtMTI4LjM4NzA2NkwzNzQuMDM2ODM1IDM5My41MDMxODkgMzc0LjAzNjgzNSAzOTMuNTAzMTg5TTQzMy44NDI5NDIgNjUxLjk1NjU2NWMwIDI5LjY5NzM2OS0yNC4wNzgzOTUgNTMuNzc2Nzg3LTUzLjc3NTc2NCA1My43NzY3ODctMjkuNjk3MzY5IDAtNTMuNzczNzE3LTI0LjA3OTQxOC01My43NzM3MTctNTMuNzc2Nzg3IDAtMjkuNjk2MzQ2IDI0LjA3NzM3Mi01My43NzI2OTQgNTMuNzczNzE3LTUzLjc3MjY5NEM0MDkuNzY1NTcxIDU5OC4xODM4NzEgNDMzLjg0Mjk0MiA2MjIuMjYyMjY2IDQzMy44NDI5NDIgNjUxLjk1NjU2NUw0MzMuODQyOTQyIDY1MS45NTY1NjVNNjg0LjI1MDA2MiA2NTEuOTU2NTY1YzAgMjkuMjI1NjI1LTIzLjY4ODUxNSA1Mi45MTkyNTctNTIuOTE1MTY0IDUyLjkxOTI1Ny0yOS4yMjE1MzIgMC01Mi45MTAwNDctMjMuNjk0NjU1LTUyLjkxMDA0Ny01Mi45MTkyNTcgMC0yOS4yMjI1NTUgMjMuNjkwNTYyLTUyLjkxNDE0IDUyLjkxMDA0Ny01Mi45MTQxNEM2NjAuNTYxNTQ3IDU5OS4wNDM0NDkgNjg0LjI1MDA2MiA2MjIuNzM1MDM0IDY4NC4yNTAwNjIgNjUxLjk1NjU2NUw2ODQuMjUwMDYyIDY1MS45NTY1NjVNNjg0LjI1MDA2MiA2NTEuOTU2NTY1IDY4NC4yNTAwNjIgNjUxLjk1NjU2NXoiIHAtaWQ9IjE5NzIiIGZpbGw9IiNkNDIzN2EiPjwvcGF0aD48L3N2Zz4=" alt="">
                        <div style="display:inline-block;" class="u-badge" data-badge="0">业务咨询</div>
                    </a>   
                </div>
                <div class="msg">
                    <div class="title">
                        <img style="width:16px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTMyNjgxODc4ODc0IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMyNjMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwLjE5NTMxMjUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik02MDIuMzY4MzAxIDEwMjMuOTk5OTk0Yy03LjI4ODQ3MSAwLTE0LjQ1NjQ3MS0yLjY1MDM1My0yMC4xMTg1ODgtNy43NzAzNTNMMjg5LjY4Njg5MSA3NTIuOTQxMTcyIDEyMC40ODU5NTEgNzUyLjk0MTE3MmMtNDguNDI5MTc2IDAtMTIwLjQ3MDU4OC0zMi4xMDU0MTItMTIwLjQ3MDU4OC0xMjAuNDcwNTg4bDAtMTgwLjcwNTg4MWMwLTQ4LjQyOTE3NiAzMi4xMDU0MTItMTIwLjQ3MDU4OCAxMjAuNDcwNTg4LTEyMC40NzA1ODhsMTY5LjE0MDcwNSAwIDI5Mi41NjI4MjItMjYzLjM0ODcwNGM4Ljg1NDU4OC04LjAxMTI5NCAyMS41NjQyMzUtOS45Mzg4MjMgMzIuNDA2NTg4LTUuMTJDNjI1LjU1ODg4OSA2Ny43MDQ0NyA2MzIuNDg1OTQ4IDc4LjQ4NjU4OCA2MzIuNDg1OTQ4IDkwLjM1Mjk0MWwwIDkwMy41Mjk0MDZjMCAxMS44NjYzNTMtNi45MjcwNTkgMjIuNzA4NzA2LTE3LjgyOTY0NyAyNy41Mjc1MjlDNjEwLjc0MTAwNiAxMDIzLjE1NjcgNjA2LjUyNDUzNiAxMDIzLjk5OTk5NCA2MDIuMzY4MzAxIDEwMjMuOTk5OTk0ek0xMjAuNDg1OTUxIDM5MS41Mjk0MDljLTU3LjM0NCAwLTYwLjIzNTI5NCA1MC4xNzYtNjAuMjM1Mjk0IDYwLjIzNTI5NGwwIDE4MC43MDU4ODFjMCA1Ny4yODM3NjQgNTAuMTc2IDYwLjIzNTI5NCA2MC4yMzUyOTQgNjAuMjM1Mjk0bDE4MC43MDU4ODEgMGM3LjQ2OTE3NiAwIDE0LjYzNzE3NiAyLjc3MDgyNCAyMC4xMTg1ODggNy43NzAzNTNMNTcyLjI1MDY1NCA5MjYuMjM4MTEyIDU3Mi4yNTA2NTQgMTU3Ljk5NzE3NiAzMjEuMzcwNjU1IDM4My43NTkwNTdDMzE1LjgyOTAwOCAzODguNzU4NTg2IDMwOC42NjEwMDggMzkxLjUyOTQwOSAzMDEuMTkxODMyIDM5MS41Mjk0MDlMMTIwLjQ4NTk1MSAzOTEuNTI5NDA5ek03NTIuOTU2NTM1IDM2MS40MTE3NjNjLTcuNjQ5ODgyIDAtMTUuNDIwMjM1LTIuOTUxNTI5LTIxLjMyMzI5NC04Ljc5NDM1My0xMS43NDU4ODItMTEuNzQ1ODgyLTExLjc0NTg4Mi0zMC44NDA0NyAwLTQyLjU4NjM1M2wxMjAuNDcwNTg4LTEyMC40NzA1ODhjMTEuNzQ1ODgyLTExLjc0NTg4MiAzMC44NDA0Ny0xMS43NDU4ODIgNDIuNTg2MzUzIDBzMTEuNzQ1ODgyIDMwLjg0MDQ3IDAgNDIuNTg2MzUzbC0xMjAuNDcwNTg4IDEyMC40NzA1ODhDNzY4LjM3Njc3IDM1OC40NjAyMzMgNzYwLjcyNjg4OCAzNjEuNDExNzYzIDc1Mi45NTY1MzUgMzYxLjQxMTc2M3pNOTMzLjY2MjQxNiA1NzIuMjM1MjkxbC0xODAuNzA1ODgxIDBDNzM2LjM5MTgyOSA1NzIuMjM1MjkxIDcyMi44Mzg4ODggNTU4Ljc0MjU4NSA3MjIuODM4ODg4IDU0Mi4xMTc2NDRzMTMuNTUyOTQxLTMwLjExNzY0NyAzMC4xMTc2NDctMzAuMTE3NjQ3bDE4MC43MDU4ODEgMEM5NTAuMzQ3NTkzIDUxMS45OTk5OTcgOTYzLjc4MDA2MyA1MjUuNDkyNzAzIDk2My43ODAwNjMgNTQyLjExNzY0NFM5NTAuMzQ3NTkzIDU3Mi4yMzUyOTEgOTMzLjY2MjQxNiA1NzIuMjM1Mjkxek04NzMuNDI3MTIzIDkwMy41Mjk0MDZjLTcuNjQ5ODgyIDAtMTUuNDIwMjM1LTIuOTUxNTI5LTIxLjMyMzI5NC04Ljc5NDM1M2wtMTIwLjQ3MDU4OC0xMjAuNDcwNTg4Yy0xMS43NDU4ODItMTEuNzQ1ODgyLTExLjc0NTg4Mi0zMC44NDA0NyAwLTQyLjU4NjM1M3MzMC44NDA0Ny0xMS43NDU4ODIgNDIuNTg2MzUzIDBsMTIwLjQ3MDU4OCAxMjAuNDcwNTg4YzExLjc0NTg4MiAxMS43NDU4ODIgMTEuNzQ1ODgyIDMwLjg0MDQ3IDAgNDIuNTg2MzUzQzg4OC44NDczNTggOTAwLjU3Nzg3NyA4ODEuMTk3NDc1IDkwMy41Mjk0MDYgODczLjQyNzEyMyA5MDMuNTI5NDA2eiIgcC1pZD0iMzI2NCIgZmlsbD0iI2Q0MjM3YSI+PC9wYXRoPjwvc3ZnPg==" alt="">
                        最新公告
                    </div>
                    <ul>
                        <!-- <template v-for="(item,index) in msgArr">
                            <el-popover
                                :key="index"
                                placement="top-start"
                                min-width="300"
                                trigger="hover"
                                :content="item.title">
                                <li slot="reference" v-html="item.title" :title="item.title" @click="msgItemClick(item)"></li>
                            </el-popover>
                        </template> -->
                        <li  v-for="(item,index) in msgArr" :key="index" v-html="item.title" :title="item.title" @click="msgItemClick(item)"></li>
                        
                        
                    </ul>
                    <div @click="lookMore" class="more">查看更多
                        <i class="el-icon-d-arrow-right"></i>
                    </div>
                </div>
                <div class="willHandleItems">
                    <div class="title">
                        <img width="16px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTMyNjgxOTE2NTcwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjUgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5MjYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwLjE5NTMxMjUiIGhlaWdodD0iMjAwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0xOTguOTM3NjI2IDcxNi4xNzU0NTVjLTE5LjQ5NTg4NyAwLTM1LjgwODc3MyAyNi4yNTk3NjctMzUuODA4NzcyIDQ1Ljc1NTY1NHMxNi4zMTI4ODUgNDUuNzU1NjU0IDM1LjgwODc3MiA0NS43NTU2NTRoMTIzLjM0MTMyOWMxOS44OTM3NjMgMCAzNS44MDg3NzMtMjUuODYxODkxIDM1LjgwODc3My00NS43NTU2NTRTMzQyLjE3MjcxNyA3MTYuMTc1NDU1IDMyMi4yNzg5NTUgNzE2LjE3NTQ1NXpNNzYxLjEzNTM1OSA1MTIuNDYzMzI2YzAtMTkuODkzNzYzLTE2LjMxMjg4NS00NS43NTU2NTQtMzUuODA4NzczLTQ1Ljc1NTY1NEgxOTguOTM3NjI2Yy0xOS40OTU4ODcgMC0zNS44MDg3NzMgMjUuODYxODkxLTM1LjgwODc3MiA0NS43NTU2NTRTMTc3Ljg1MDIzOCA1NTcuMDI1MzU0IDE5OC45Mzc2MjYgNTU3LjAyNTM1NGg1MjYuMzg4OTZjMTkuNDk1ODg3IDAgMzUuODA4NzczLTI2LjI1OTc2NyAzNS44MDg3NzMtNDUuNzU1NjU0ek0xOTguOTM3NjI2IDMxMC43NDA1NzNoNTI2Ljc4NjgzNWMxOS44OTM3NjMgMCAzNS44MDg3NzMtMjUuODYxODkxIDM1LjgwODc3My00NS43NTU2NTVzLTE1LjkxNTAxLTQ1Ljc1NTY1NC0zNS44MDg3NzMtNDUuNzU1NjU0SDE5OC45Mzc2MjZjLTE5LjQ5NTg4NyAwLTM1LjgwODc3MyAyNi4yNTk3NjctMzUuODA4NzcyIDQ1Ljc1NTY1NHMxNi4zMTI4ODUgNDUuNzU1NjU0IDM1LjgwODc3MiA0NS43NTU2NTV6IiBmaWxsPSIjZDQyMzdhIiBwLWlkPSIxOTI3Ij48L3BhdGg+PHBhdGggZD0iTTkxOC42OTM5NTkgNTM0Ljc0NDM0Vjk1LjQ5MDA2MUE5Ni42ODM2ODYgOTYuNjgzNjg2IDAgMCAwIDgyMi40MDgxNDggMEgxMTEuODAyOTQ2QTEyNi41MjQzMyAxMjYuNTI0MzMgMCAwIDAgMCAxMTEuMDA3MTk2djgwMS43MTg2MzRhMTI2LjEyNjQ1NSAxMjYuMTI2NDU1IDAgMCAwIDExMS44MDI5NDYgMTExLjAwNzE5Nmg1NTAuNjU5MzVhNDIuOTcwNTI3IDQyLjk3MDUyNyAwIDAgMCA0Ny43NDUwMy00My4zNjg0MDNjMC0yOC42NDcwMTgtMjAuNjg5NTEzLTU1LjcwMjUzNS0zOS43ODc1MjUtNTYuMTAwNDExSDE0MC44NDc4NGMtMjguMjQ5MTQzIDAtMzkuNzg3NTI1LTEyLjczMjAwOC0zOS43ODc1MjYtMzkuNzg3NTI1VjEzNC4wODM5NmMwLTI0LjY2ODI2NiA5Ljk0Njg4MS0zNC42MTUxNDcgMzQuNjE1MTQ3LTM0LjYxNTE0N2g2NDcuMzQzMDM3YzI1LjA2NjE0MSAwIDM1LjAxMzAyMiA5Ljk0Njg4MSAzNS4wMTMwMjIgMzQuNjE1MTQ3djQwMC42NjAzOGMwIDE5LjQ5NTg4NyAyNi42NTc2NDIgMzYuNjA0NTIzIDU2Ljg5NjE2MSAzNi42MDQ1MjNhMzkuNzg3NTI1IDM5Ljc4NzUyNSAwIDAgMCA0My4zNjg0MDMtMzYuNjA0NTIzeiIgZmlsbD0iI2Q0MjM3YSIgcC1pZD0iMTkyOCI+PC9wYXRoPjxwYXRoIGQ9Ik00NjAuNzM5NTQzIDc2Ny44OTkyMzhhNzAuNDIzOTIgNzAuNDIzOTIgMCAxIDAgNzAuNDIzOTItNzEuNjE3NTQ1IDcxLjIxOTY3IDcxLjIxOTY3IDAgMCAwLTcwLjQyMzkyIDcxLjYxNzU0NXpNNzQyLjQzNTIyMiA2OTYuMjgxNjkzYTcxLjYxNzU0NiA3MS42MTc1NDYgMCAxIDAgNzAuNDIzOTIgNzEuNjE3NTQ1IDcwLjgyMTc5NSA3MC44MjE3OTUgMCAwIDAtNzAuNDIzOTItNzEuNjE3NTQ1ek05NTQuOTAwNjA3IDY5Ni4yODE2OTNhNzEuNjE3NTQ2IDcxLjYxNzU0NiAwIDEgMCA3MC40MjM5MiA3MS42MTc1NDVBNzEuMjE5NjcgNzEuMjE5NjcgMCAwIDAgOTU0LjkwMDYwNyA2OTYuMjgxNjkzeiIgZmlsbD0iI2Q0MjM3YSIgcC1pZD0iMTkyOSI+PC9wYXRoPjwvc3ZnPg==" alt="">
                        待办事项
                    </div>
                    <div class="waillHandleContent">
                        <template v-if="waillHandleContent.length === 0">
                            <div style="color:#bdbdbd;">暂无待办事项</div>
                        </template>
                        <template v-else>
                            <div class="item" v-for="(item,i) in waillHandleContent" :key="i" :title="item.message">{{i+1}}、{{item.message}}</div>
                        </template>
                    </div>
                </div>
                <div class="wait">
                    <div class="title">
                        <img style="width:16px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTMyNjgxOTM5Nzg4IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIyMDYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMjU4LjY5OCAxOTMuMDQ1bDUxMS45OTcgMCAwIDYzLjk5OUwyNTguNjk4IDI1Ny4wNDQgMjU4LjY5OCAxOTMuMDQ1ek0yNTYuOTkxIDMyMS42NjhsNTExLjk5NiAwIDAgNjMuOTk5TDI1Ni45OTEgMzg1LjY2NyAyNTYuOTkxIDMyMS42Njh6TTI1Ni45OTEgNDQ5LjY2bDMyOS4yNDUgMCAwIDY0TDI1Ni45OTEgNTEzLjY2IDI1Ni45OTEgNDQ5LjY2ek0yNTYuOTkxIDU3Ny42NjJsMTM4LjEgMCAwIDY0LTEzOC4xIDBMMjU2Ljk5MSA1NzcuNjYyek04OTguNjk1IDAgMTMwLjcwMSAwQzk1LjM1NiAwIDY2LjcwMiAyOC42NTQgNjYuNzAyIDY0bDAgODk1Ljk5MmMwIDM1LjM0NSAyOC42NTQgNjMuOTk5IDYzLjk5OSA2My45OTlsMjk5LjQtMC4zMjggMC02My45OTktMjk5LjQgMC4zMjhMMTMwLjcwMSA2NGw3NjcuOTk1IDAgMCA0MDkuNTk5IDYzLjk5OSAwTDk2Mi42OTUgNjRDOTYyLjY5MyAyOC42NTQgOTM0LjAzNSAwIDg5OC42OTUgMEw4OTguNjk1IDB6IiBwLWlkPSIyMjA3IiBmaWxsPSIjZDQyMzdhIj48L3BhdGg+PHBhdGggZD0iTTc1OS41OTEgNTU3LjY1N2MtMTI4Ljc2OSAwLTIzMy4xNjUgMTA0LjQwNi0yMzMuMTY1IDIzMy4xNzYgMCAxMjguNzU5IDEwNC4zOTYgMjMzLjE2NSAyMzMuMTY1IDIzMy4xNjVzMjMzLjE2NS0xMDQuNDA2IDIzMy4xNjUtMjMzLjE2NUM5OTIuNzU2IDY2Mi4wNjMgODg4LjM1OSA1NTcuNjU3IDc1OS41OTEgNTU3LjY1N3pNNzU5LjU5MSA5NjUuNzAxYy05Ni40MTYgMC0xNzQuODc5LTc4LjQ0Mi0xNzQuODc5LTE3NC44NjggMC05Ni40MTYgNzguNDYzLTE3NC44NzkgMTc0Ljg3OS0xNzQuODc5IDk2LjQzOCAwIDE3NC44OCA3OC40NjQgMTc0Ljg4IDE3NC44NzlDOTM0LjQ3IDg4Ny4yNTkgODU2LjAyOCA5NjUuNzAxIDc1OS41OTEgOTY1LjcwMXpNNzg4LjczOSA3NzguNzYyIDc4OC43MzkgNjc0LjIzOWMwLTE2LjEwOC0xMy4wMzktMjkuMTM4LTI5LjE0OC0yOS4xMzgtMTYuMTA4IDAtMjkuMTQ4IDEzLjAzLTI5LjE0OCAyOS4xMzhsMCAxMTYuNjg4YzAuMDIxIDguMDIyIDMuMjc5IDE1LjI4NiA4LjU3MSAyMC41MzVsNTguMjUzIDU4LjI3NmM1LjY5MyA1LjY5MiAxMy4xNTcgOC41MjggMjAuNjIxIDguNTI4IDcuNDUzIDAgMTQuOTE3LTIuODM2IDIwLjYwOS04LjUyOCAxMS4zNzUtMTEuMzg1IDExLjM3NS0yOS44NDUgMC00MS4yMjlMNzg4LjczOSA3NzguNzYyeiIgcC1pZD0iMjIwOCIgZmlsbD0iI2Q0MjM3YSI+PC9wYXRoPjwvc3ZnPg==" alt="">
                        已提待审
                    </div>
                    <div class="waitItems">
                        <div class="row1">
                            <div @click="willCheckOrder" class="left item">
                                <div>
                                    <i style="color:#d4237a;" class="icon iconfont lj-daishenhe"></i>
                                </div>
                                <div>待审核订单</div>
                                <i class="budge">{{budge.commonOrderNum}}</i>
                            </div>
                            <div @click="willSendApply" class="right item">
                                <div>
                                    <i style="color:#d4237a;" class="icon iconfont lj-daishenhe"></i>
                                </div>
                                <div>待审核发货申请</div>
                                <i class="budge">{{budge.sendApplyOrderNum}}</i>
                            </div>
                        </div>
                        <div class="row2">
                            <div @click="willReturnApply" class="left item">
                                <div>
                                    <i style="color:#d4237a;" class="icon iconfont lj-daishenhe"></i>
                                </div>
                                <div>待审核退换货申请 </div>
                                <i class="budge">{{budge.returnChangeOrderNum}}</i>
                            </div>
                            <div @click="willCheckFee" class="right item">
                                <div>
                                    <i style="color:#d4237a;" class="icon iconfont lj-daishenhe"></i>
                                </div>
                                <div>待审核费用</div>
                                <i class="budge">{{budge.feeOrderOrderNum}}</i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="appDownload">
                    <div class="appDownloadTitle">
                        <img style="width:16px;color:red;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTMyNjgxOTYwNjUxIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjggMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI5MzMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwLjc4MTI1IiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTY2Ljc5OSA4NDUuMjE5cTUuNzYgMjMuMDQwLTIuNCA0My42OHQtMjUuNDQgMzYuNDgtNDIuMjQgMjQuOTYtNTMuNzYgOS4xMnEtMTgxLjQ0IDAuOTYtMzI0LjQ4IDAuOTZoLTMyNi40cS0zNC41NiAwLTYwLjk2LTEyLjQ4dC00Mi4yNC0zMC43Mi0yMS4xMi0zOS44NCAxLjQ0LTM4Ljg4cTUuNzYtMTMuNDQgMTEuNTItMjcuODQgNC44LTEyLjQ4IDExLjUyLTI4LjMydDE0LjQtMzIuMTZsMzYuNDgtODguMzJoMTA5LjQ0bC00MS4yOCAxMjAuOTZoNjE4LjI0bC00MS4yOC0xMjAuOTZoMTA0LjY0cTIwLjE2IDQ4Ljk2IDM2LjQ4IDg4LjMyIDYuNzIgMTcuMjggMTMuNDQgMzMuNnQxMiAyOS4yOCA4LjY0IDIyLjA4MCAzLjM2IDEwLjA4MHpNNDgzLjkxOCA2NjcuNjE5cS0xOC4yNC0yMS4xMi00MS43Ni01Mi44dC00OC40OC02NS4yOC00OS40NC02Ni4yNC00My42OC01Ni42NHEtMjIuMDgwLTI1LjkyLTE3LjI4LTQyLjcydDMyLjY0LTE2LjhxMTUuMzYgMC45NiA0MS4yOC0wLjQ4dDQzLjItMS40NHExOS4yIDAgMjQtMTEuNTJ0NC44LTMwLjcycTAtMjEuMTItMC40OC00Ni41NnQtMC40OC01Mi4zMi0wLjQ4LTUyLjgtMC40OC00OHEwLTkuNiAxLjQ0LTIwLjE2dDYuNzItMTkuMiAxNS4zNi0xNC40IDI3LjM2LTUuNzZxMjAuMTYgMCAzNi45Ni0wLjQ4dDM4Ljg4LTAuNDhxMzEuNjggMCA0Mi43MiAxNC44OHQxMiA0Ny41MnYzNy40NHEwIDIyLjA4MCAwLjQ4IDQ3LjA0MHQwLjQ4IDQ5LjkydjQ1LjEycTAgMjcuODQgNS43NiA0NC42NHQyNS45MiAxNS44NHExNC40IDAgMzUuMDQwIDAuOTZ0MzYgMC45NnEyNS45MiAwIDMzLjEyIDEzLjkydC0xMC4wODAgMzZxLTE4LjI0IDIzLjA0MC00Mi4yNCA1NS42OHQtNDkuNDQgNjcuNjgtNDkuOTIgNjguMTYtNDMuNjggNTcuMTJxLTE3LjI4IDIyLjA4MC0zMy4xMiAyMi41NnQtMzMuMTItMjAuNjR6IiBwLWlkPSIyOTM0IiBmaWxsPSIjZDQyMzdhIj48L3BhdGg+PC9zdmc+" alt="">
                        APP下载
                        <div class="appDownloadContent">
                            <vue-qr 
                                :logoSrc=bgSrc 
                                :text= "text"
                                :size="150" 
                                colorDark="#d4237a"
                                colorLight="#ffffff"
                                :margin="0"
                            />
                        </div>
                    </div>
                    
                </div>
            </div>







            <el-dialog 
                title="待办事项"  
                :visible.sync="dialogVisible1" 
                :modal="false"
                width="500px"
                :close-on-click-modal="true">
                <div class="msgDialogContent">
                    <h4>您有以下事项需要处理：</h4>
                    <div v-for="(item,i) in waillHandleContent" :key="i" class="msgDialogContentItem">
                        <div class="msgDialogContentItemNum">{{i+1}}、</div>
                        <div class="msgDialogContentItemText">{{item.message}}</div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="closeDialog" size="mini">关 闭</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- <div id="downloadAppQr"></div> -->
        
    </div>
</template>
<script>
import VueQr from 'vue-qr';
export default {
    name: 'Home',
    components: { VueQr },
    data() {
        return {
            msgArr: [],
            imageArr: [
                require('../../../assets/images/banner1.jpg'),
                require('../../../assets/images/banner2.jpg'),
                require('../../../assets/images/banner3.jpg'),
                require('../../../assets/images/banner4.jpg'),
            ],
            budge: {
                commonOrderNum: 0,//待审核订单
                sendApplyOrderNum: 0,//待发货申请单
                returnChangeOrderNum: 0,//待审核退换货申请
                feeOrderOrderNum: 0,//待审核费用
            },
            waillHandleContent: [],
            dialogVisible1: false,
            bgSrc: require('@/assets/images/logo-img.png'),
            text: window.location.protocol === "http:" ? "http://182.150.55.64:8013/terminal/static/downApp.html" : "https://c.langjiu.cn/static/downApp.html"
        }
    },

    methods: {
        handleClick() { },
        fetchMsgItem(id) {
            let paramsWrap = {
                params: {
                    id: id
                }
            }
            let url = "/ocm-web/api/notice/queryById";
            return this.$http.get(url, paramsWrap)
                .then(res => {
                    if (res.headers["x-ocm-code"] == '1') {
                        return res.data;
                    } else {
                        return Promise.reject();
                    }
                });
        },
        async msgItemClick(item) {
            let _this = this;
            let id = item.id;
            let msgContent = await _this.fetchMsgItem(id);
            _this.$router.push({ name: 'MsgContent', params: { msgContent } });
        },
        lookMore() {
            this.$router.push({ name: 'MsgCenter' })
        },
        fetchMsg() {
            let _this = this;
            let paramsWrap = {
                params: {
                    customerId: _this.$store.state.customerId,
                    page: 0,
                    size: 9
                }
            };
            return _this.$http.get('/ocm-web/api/notice/pageQuery', paramsWrap)
                .then(res => res.data);
        },
        //待提交订单
        willCheckOrder() {
            this.$router.push({ name: 'SavedOrder', params: { from: 'Home' } });
        },
        //待发货申请
        willSendApply() {
            this.$router.push({ name: 'DeliverWaitCheck', params: { from: 'DeliverList' } });
        },
        //待退货申请
        willReturnApply() {
            this.$router.push({ name: 'ReturnWaitCheck', params: { from: 'ReturnList' } });
        },
        //待审核费用
        willCheckFee() {
            this.$router.push({ name: 'WaitAuditCheck', params: { to: 'WaitAuditCheck' } });
        },
        //获取待审核订单数量
        fetchCount() {
            // /ocm-web/api/b2b/purchase-orders/countUnSendedAmountByCustomerId
            let _this = this;
            let url = '/ocm-web/api/b2b/purchase-orders/countOrderByCustomerId';
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            }
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.budge.commonOrderNum = res.data.commonOrderNum;
                    _this.budge.sendApplyOrderNum = res.data.sendApplyOrderNum;
                    _this.budge.returnChangeOrderNum = res.data.returnChangeOrderNum;
                    _this.budge.feeOrderOrderNum = res.data.feeOrderOrderNum;
                })
        },
        fetchWaitHandleMsg() {
            let _this = this;
            let url = '/ocm-web/api/lcrmTxxxRest/findLjcrmTxxx';
            let paramsWrap = {
                params: {
                    customerId: this.$store.state.customerId
                }
            }
            _this.$http.get(url, paramsWrap)
                .then(res => {
                    _this.waillHandleContent = res.data || [];
                    if (_this.waillHandleContent.length > 0) {
                        _this.dialogVisible1 = true;
                    }
                })
        },
        closeDialog() {
            this.dialogVisible1 = false;
        },
        //初始化，登陆聊天
        initChat() {
            let scripts = $(`<script src="./static/chat/webim_chat.js" async/>`);
            if ($('script[src="./static/chat/webim_chat.js"]').length === 0) {
                $('body').append(scripts);
            }
        },
        generateQRcode(domId, text) {
            let qrcode = new QRCode(document.getElementById(domId), {
                text: text,
                width: 200,
                height: 200,
                colorDark: "#E7442E",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    },
    mounted() {
        let _this = this;
        _this.$store.commit('changeCurrentNav', { hash: '/Home' });
        _this.fetchMsg().then(res => {
            _this.msgArr = res.content;
        });
        //获取budge
        _this.fetchCount();
        _this.fetchWaitHandleMsg();
        _this.initChat();
        // 生成二维码
        // _this.generateQRcode("downloadAppQr","http://182.150.55.64:8013/terminal/static/downApp.html");
    }
}
</script>
<style lang="scss">
@import "./Home.scss";
</style>

