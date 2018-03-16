<template>
    <div class="Chat">
        <div class="chatBody">
            <div class="chatBodyContainer">
                <div class="productRadio">
                    <el-radio-group v-model="productLine" size="small">
                        <template v-for="(item,index) in productLineDataSource">
                            <el-radio :label="item.chatId" :key="index" border>
                                <!-- <el-badge :value="msgArr.find(v=>v.from == item.chatId).notReadCount ? msgArr.find(v=>v.from == item.chatId).notReadCount : 0"> -->
                                    <span>{{item.name}}</span>
                                <!-- </el-badge> -->
                            </el-radio>
                        </template>
                    </el-radio-group>
                    <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2847046608&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:2847046608:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>
                </div>
                <div class="chatTite">
                    {{currentMsgObj.userName}}
                    <div class="close">
                        <el-button class="closeBtn" @click="closeMask" type="primary" size="mini">
                            <i class="el-icon-close"></i>关闭
                        </el-button>
                    </div>

                </div>
                <div class="chatContent">
                    <template v-if="currentMsgObj.from == chatId">
                        <!-- 是自己 -->
                        <template v-for="(item,index) in currentMsgObj.msgList">
                            <Myself :itemData="item" :key="index"></Myself>
                        </template>
                    </template>
                    <template v-else>
                        <!-- 不是自己 -->
                        <template v-for="(item,index) in currentMsgObj.msgList">
                            <Other :itemData="item" :key="index"></Other>
                        </template>
                    </template>

                </div>
                <div class="chatSendMsg">
                    <el-input v-model="sendMsgText" type="textarea" :rows="5"></el-input>
                </div>
                <div class="sendMsg">
                    <el-row type="flex" justify="end">
                        <el-button @click="sendMsg" size="mini" type="primary">发送</el-button>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Chat from './Chat.js';
export default Chat;
</script>
<style lang="scss">
@import './Chat.scss';
</style>
