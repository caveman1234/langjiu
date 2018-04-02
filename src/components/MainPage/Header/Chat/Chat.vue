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
            <div class="chatDialogWrap">
                <div class="questionCategory">
                    <el-radio-group v-model="selectedUser">
                        <el-collapse v-model="activeNames">
                            <el-collapse-item name="1">
                                <template slot="title">
                                    <div class="categoryTitle_disable">质量问题<i class="header-icon el-icon-info"></i></div>
                                </template>
                                <div class="productLine">
                                    <el-badge :value="1">
                                        <el-radio label="270122" size="mini" border>小郎酒</el-radio>
                                    </el-badge>
                                    <el-badge>
                                        <el-radio label="270123" size="mini" border>郎牌特曲</el-radio>
                                    </el-badge>
                                    <el-badge>
                                        <el-radio label="270124" size="mini" border>青花郎</el-radio>
                                    </el-badge>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="退货问题" name="2">
                                <div class="productLine">
                                    <el-badge>
                                        <el-radio label="270125" size="mini" border>小郎酒4</el-radio>
                                    </el-badge>
                                    <el-badge>
                                        <el-radio label="270126" size="mini" border>郎牌特曲5</el-radio>
                                    </el-badge>
                                    <el-badge>
                                        <el-radio label="270127" size="mini" border>青花郎6</el-radio>
                                    </el-badge>
                                    <el-badge>
                                        <el-radio label="270128" size="mini" border>青花郎6</el-radio>
                                    </el-badge>
                                    <el-badge>
                                        <el-radio label="270129" size="mini" border>青花郎6</el-radio>
                                    </el-badge>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="发货问题" name="3">
                                3
                            </el-collapse-item>
                            <el-collapse-item title="运输问题" name="4">
                                4
                            </el-collapse-item>
                        </el-collapse>
                    </el-radio-group>
                </div>
                <div class="chatContainer">
                    <div class="chatWrap">
                        <div class="chatHeader"></div>
                        <div class="chatBody"></div>
                        <div class="handle">
                            <el-button type="plain" size="mini"><i class="el-icon-picture"></i>发送图片</el-button>
                            <el-button type="plain" size="mini"><i class="el-icon-document"></i>发送文件</el-button>
                        </div>
                        <div class="chatMsg">
                            <el-input :rows="5" resize="none" type="textarea"></el-input>
                        </div>
                        <div class="chatBtn">
                            <el-row type="flex" justify="end">
                                    <el-button type="primary" size="mini">发送</el-button>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
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
