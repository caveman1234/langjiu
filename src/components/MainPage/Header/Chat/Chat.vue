<template>
    <div class="Chat">
        <el-dialog 
            title="在线客服" 
            @close="close" 
            @open="open" 
            :visible.sync="dialogVisible1" 
            :close-on-click-modal="false"
            fullscreen
        >   
            <!-- <div class="chatDialogWrap">
                <div class="questionCategory">
                    <el-radio-group v-model="selectedUser">
                        
                        <el-collapse v-model="activeNames">
                            <template v-for="(item,index) in serviceUsers">
                                <el-collapse-item :name="index" :key="index">
                                    <template slot="title">
                                        <div class="categoryTitle_disable">{{item.questionName}}<i class="header-icon el-icon-info"></i></div>
                                    </template>
                                    <div class="productLine">
                                        <template v-for="(item1,index1) in item.questionUsers">
                                            <el-badge :value="item1.notReadMsgCount" :key="index1">
                                                <el-radio :label="item1.username" size="mini" border>{{item1.name}}</el-radio>
                                            </el-badge>
                                        </template>

                                    </div>
                                </el-collapse-item>
                            </template>
                            
                           
                        </el-collapse>
                    </el-radio-group>
                </div>
                <div class="chatContainer" v-show="isDisplayChat">
                    <div class="chatWrap">
                        <div class="chatHeader">
                            <span>当前客服：</span><span>{{currentMsg.userName}}</span>
                        </div>
                        <div class="chatBody">
                            <template v-for="(item,i) in currentMsg.msgList">
                                <div class="msgItem" :key="i">
                                    <Mine :msgItem="item" v-if="item.isMine"></Mine>
                                    <Others :msgItem="item" v-else></Others>
                                </div>
                            </template>
                        </div>
                        <div class="handle">
                            <el-button @click="sendImgTrigger" type="plain" size="mini"><i class="el-icon-picture"></i>发送图片</el-button>
                            <el-button @click="sendFileTrigger" type="plain" size="mini"><i class="el-icon-document"></i>发送文件</el-button>
                        </div>
                        <div class="chatMsg">
                            <el-input @keyup.ctrl.enter.native="sendMsg" v-model="message" placeholder="请输入内容......" :rows="2" resize="none" type="textarea"></el-input>
                        </div>
                        <div class="chatBtn">
                            <el-row type="flex" justify="end">
                                <el-button @click="sendMsg" type="primary" size="mini">发送</el-button>
                            </el-row>
                        </div>
                    </div>
                </div>
                <input v-show="false" type="file" name='img' id="chatInputImg">
                <input v-show="false" type="file" name='file' id="chatInputFile">
            </div> -->
        </el-dialog>
    </div>
</template>
<script>
import Chat from './Chat.js';
export default Chat;
</script>
<style lang="scss">
@import "./Chat.scss";
</style>
