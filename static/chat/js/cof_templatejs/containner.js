/**
 * Created by 炎 on 2017/6/15 015.
 */
define(["EJS","EJSObj","user","lib"],function(EJS,EJSObj,user,lib){
      function init(){
         $(function(){


             var html = EJSObj.e_templateHtml("containner.ejs",
                 "chat/cof_template/containner.ejs",{});
             $("body").append(html);

             //初始化默认渲染user
             var html = EJSObj.e_templateHtml("user.ejs",
                 "chat/cof_template/user.ejs",{});
             $(".content-inner").append(html);
             user();

             //tabbar点击事件
             $(".tabbar .tabbar-item").click(function(){
                 if($(this).hasClass("tabbar-item-active")){
                     return;
                 }else{
                     $(this).siblings().removeClass("tabbar-item-active");
                     $(this).addClass("tabbar-item-active");
                     //渲染ui
                     if($(this).attr("flag")=="lib"){
                         //隐藏user
                         $(".content-inner-user").hide();

                         if($(".content-inner-lib").length<=0){
                             //渲染lib
                             var html = EJSObj.e_templateHtml("lib.ejs",
                                 "chat/cof_template/lib.ejs",{});
                             $(".content-inner").append(html);
                             lib();
                         }else{
                             //显示lib
                             $(".content-inner-lib").show();

                         }
                     }else{
                         //显示user   隐藏lib
                         $(".content-inner-lib").hide();
                         $(".content-inner-user").show();
                     }
                 }
             })

         })
      }
    return {init:init}
})