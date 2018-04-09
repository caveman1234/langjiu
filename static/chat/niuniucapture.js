/*******************************************************************************
?????????JS???????????????????????????????????????????????????????????????????????S???????????????????????????????????????????????
???????????????????????????????????????capturewrapper.js???????????????????????????????UI?????????? 
*******************************************************************************/

/*******************************************************************************/
//???????????????  
var emPensize = 1;		//????????????
var emDrawType = 2;		//?????????????????????360????? 0??? ?????????   1??? 360?????
var	emTrackColor = 3;		//?????????????????
var	emEditBorderColor = 4;	//??????????????????
var	emTransparent = 5;		//???????????????????
var	emWindowAware = 6;		//?????????????????????PI????
var	emSetSaveName = 8;		//??????????????????????     ??????????
var	emSetMagnifierBkColor = 9; //??????????????????????????????????
var	emSetMagnifierLogoText = 10; //????????????LOGO?????????????????????????? ??????(CTRL + SHIFT + A)     ??????????
var emSetWatermarkPictureType = 20;						//????????????????? 
var	emSetWatermarkPicturePath = 21;						//??????????????? 
var	emSetWatermarkTextType = 22;						//????????????????????? 
var	emSetWatermarkTextValue = 23;                       //??????????????????????
var emSetMosaicType = 24;               //?????????????????????1????????2??????? 
var emSetTooltipText = 25;               //?????????????????????????OOLTIP?????? 
var emSetMoreInfo = 26;							//????????????????????????????????????? 
/*******************************************************************************/


var emClosed = 1;
var emConnected = 2;
var emConnecting = 3;

var emCaptureSuccess = 0;
var emCaptureFailed = 1;
var emCaptureUnknown = 2;

var emCmdReady = -1;
var emCmdCapture = 0;
var emCmdSaveFile = 1;

function rgb2value(r, g, b)
{
    return r | g << 8 | b << 16;
}

var captureObjSelf = null;
function onpluginLoaded()
{
    captureObjSelf.pluginLoaded();
}

function NiuniuCaptureObject() 
{
    var self = this;
    captureObjSelf = this;
    this.PenSize = 2;
    this.DrawType = 0;
    this.TrackColor = rgb2value(255, 0, 0);
    this.EditBorderColor = rgb2value(255, 0, 0);
    this.Transparent = 240;
    this.WindowAware = 1;
    this.MosaicType = 1;
    this.SaveName = "??????????";
    this.MagnifierLogoText = "????????";
    this.WatermarkPictureType = "2|100|100|400|400|20";
    this.WatermarkPicturePath = "";
    this.WatermarkTextType = "2|100|100|100|40|20|0|150|30|80,55,55,55";
    this.WatermartTextValue = "";
    this.NiuniuAuthKey = "";
    this.ToolTipText = "";  //tipRectangle|tipCircle|tipArrow|tipBrush|tipGlitter|tipMosaic|tipText|tipUndo|tipSave|tipCancel|tipFinish|txtFinish
    this.MoreInfo = "1,100|300|600";
	
    this.useCrx = false;        //????????crx
    this.useCustomizedProtoco = true;   //????????????????????????????websocket 
    
	this.Version = "1.0.0.0";
    this.hostPort = "30101,30102";  
	this.hostPortIndex = 0;
    this.CaptureName = "NiuniuCapture";  
    this.NiuniuSocket = null;
    this.connectState = emClosed;
    this.IsWaitCustomizedCallBack = false;
    this.TimeIntervalID = -1;
	this.ReceivedEchoBack = false;
	this.SocketTimeStamp = new Date().getTime();
	this.TimeOutID = -1;
	
    this.FinishedCallback = null;
    this.PluginLoadedCallback = null;
    this.VersionCallback = null;
	
    this.IsNeedCrx = function()
    {
    
        if(!self.useCrx)
        {
            return false;
        }
        
        if(self.pluginValid())
        {
            return false;
        }
        
        var isChrome = self.IsRealChrome();
        var chromeMainVersion = self.GetChromeMainVersion();
        if(isChrome && chromeMainVersion > 41)
        {
	        return true;
        }
        return false;
    }
      
    this.LoadPlugin = function()
    {
        var obj = $('#capturecontainer');
        if(obj.length < 1)
        {
            $("body").append('<div id="capturecontainer" style="height:0px;width:0px;"></div>');
            obj = $('#capturecontainer');
        }        
        obj.html('');
        obj.html('<object id="niuniuCapture" type="application/x-niuniuwebcapture" width="0" height="0"><param name="onload" value="onpluginLoaded" /></object>');
		
		var iframeObj = $('startCaptureFrame');
		if(iframeObj.length < 1)
		{
			$("body").append('<iframe id="startCaptureFrame" style="display:none; "></iframe>');
		}
    }
    
    this.niuniuCapture = function ()
    {
        return document.getElementById('niuniuCapture');
    }
        
    this.addEvent = function(obj, name, func)
    {
        if (obj.attachEvent) {
            obj.attachEvent("on"+name, func);
        } else {
            obj.addEventListener(name, func, false); 
        }
    }
    
    this.pluginValid = function()
    {
        try
        {
            if(self.niuniuCapture().valid)
            {
                return true;
            }
        }
        catch(e)
        {
        }
        return false;        
    }

    this.OnCaptureFinished = function(x, y, width, height, content,localpath) 
    {
	    self.OnCaptureFinishedEx(1, x, y, width, height, "", content,localpath);      
    }
    
    this.OnCaptureFinishedEx = function(type, x, y, width, height, info, content,localpath) 
    {
        //????????????????????????????????? 
        if(self.FinishedCallback != null)
        {
            self.FinishedCallback(type, x, y, width, height, info, content,localpath);
        }
        else
        {
            alert("?????????????????????????????????????????????????inishedCallback??????????");
        }
    }
    
    this.pluginLoaded = function()
    {
		self.GetVersion();
        if(!self.pluginValid())
        {
            if(self.PluginLoadedCallback != null)
            {
                self.PluginLoadedCallback(false);
            }
            return false;
        }   
        
        //??????????????????????????????????????????????????????????????????????  
        self.niuniuCapture().InitCapture(self.NiuniuAuthKey); 
        
        self.niuniuCapture().InitParam(emPensize, self.PenSize);
        self.niuniuCapture().InitParam(emDrawType, self.DrawType);
        self.niuniuCapture().InitParam(emTrackColor, self.TrackColor);
        self.niuniuCapture().InitParam(emEditBorderColor, self.EditBorderColor);
        self.niuniuCapture().InitParam(emTransparent, self.Transparent);
         
        self.niuniuCapture().InitParam(emSetSaveName, self.SaveName);            
        self.niuniuCapture().InitParam(emSetMagnifierLogoText, self.MagnifierLogoText);
        self.niuniuCapture().InitParam(emSetMosaicType, self.MosaicType);
        
        //???????????????????TOOLTIP  
        self.niuniuCapture().InitParam(emSetTooltipText, self.ToolTipText);
		
		self.niuniuCapture().InitParam(emSetMoreInfo, self.MoreInfo);
        //niuniuCapture().InitParam(23, "????????????.");
        //???BASE64??????????????????????????????????
       // niuniuCapture().InitParam(21, "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");
         //????????????????LOGO????????????????????????????
        
        //???????????????????? 
	    self.addEvent(self.niuniuCapture(), 'CaptureFinishedEx', self.OnCaptureFinishedEx);
	    //??????????????????????????????????????????????????????
	    self.addEvent(self.niuniuCapture(), 'CaptureFinished', self.OnCaptureFinished);
    	
    	
    	if(self.PluginLoadedCallback != null)
        {
            self.PluginLoadedCallback(true);
        }
    }
    
    this.SetWatermarkPicture = function(watermarPicData)
    {
          self.WatermarkPicturePath = watermarPicData;
          //??????????????????Base64????????????????????????????????????????????????? 
          if(!self.pluginValid())
            return;
          self.niuniuCapture().InitParam(emSetWatermarkPicturePath, self.WatermarkPicturePath);        
          self.niuniuCapture().InitParam(emSetWatermarkPictureType, self.WatermarkPictureType);
    }

    this.SetWatermarkText = function(watermarkText)
    {
        self.WatermarkTextValue = watermarkText;
        //??????????????????????????????????????????????????????????? 
        if(!self.pluginValid())
            return;
		//nShowType|nMinWidth|nMinHeight|nVerticalInterval|nOffset|nFontSize|nIsBold|nTextWidth|nTextHeight|colorText
		 self.niuniuCapture().InitParam(emSetWatermarkTextValue, self.WatermarkTextValue);
         self.niuniuCapture().InitParam(emSetWatermarkTextType, self.WatermarkTextType);
    }
    
    
    this.SavePicture = function(savename)
    {
         if(self.pluginValid())
         {
            self.niuniuCapture().SavePicture(savename);
         }
    }
    
    this.GetCursorPosition = function()
    {
        if(self.pluginValid())
        {
            var val = self.niuniuCapture().GetCursorPosition();
            return val;
        }
        return "";
    }
    
    
    
    
    this.NewCaptureParamObject = function(defaultpath, hideCurrWindow, autoCaptureFlag, x, y, width, height)
    {  
        var obj = new Object(); 
        obj.CmdType = 1;
        obj.IsGBK = 0;				//???????GBK???????????????????????????????  
        obj.AuthKey = self.NiuniuAuthKey;  //						
	    obj.Pensize = self.PenSize;		//????????????
	    obj.DrawType = self.DrawType;			//?????????????????????360?????
	    obj.TrackColor= self.TrackColor;		//?????????????????
	    obj.EditBorderColor= self.EditBorderColor;	//??????????????????
	    obj.Transparent = self.Transparent;		//???????????????????
	    obj.SetSaveName = self.SaveName;									//??????????????????????
	    obj.SetMagnifierLogoText = self.MagnifierLogoText;						//????????????LOGO????   
	    obj.SetWatermarkPictureTypeEx = self.WatermarkPictureType;						//????????????????? 
	    obj.SetWatermarkPicturePath = self.WatermarkPicturePath;						//??????????????? 
	    obj.SetWatermarkTextTypeEx=self.WatermarkTextType;							//????????????????????? 
	    obj.SetWatermarkTextValue= self.WatermarkTextValue;						//??????????????
        obj.MosaicType = self.MosaicType;          //?????????????????????? 
        obj.SetToolbarText = self.ToolTipText;
        obj.MoreInfo = this.MoreInfo;
	    //??????????????????????? 
	    obj.DefaultPath = defaultpath;
	    obj.HideCurrentWindow = hideCurrWindow;
	    obj.AutoCaptureFlag = autoCaptureFlag;
	    obj.x = x;
	    obj.y = y;
	    obj.Width = width;
	    obj.Height = height;
        return obj; 
    } 

    //?????????????????Chrome42???????????????????????????????????????????? 
    this.BindChromeCallback = function()
    {
	    document.addEventListener('NiuniuCaptureEventCallBack', function(evt) { 
	        var _aoResult = evt.detail;	
	        if(_aoResult.Result == -2)
	        {
		        self.OnCaptureFinishedEx(-1, 0, 0, 0, 0, "", "", "");   //????????????????  
	        }
	        if(_aoResult.Result != -1)
	        {
		        self.OnCaptureFinishedEx(_aoResult.Type, _aoResult.x, _aoResult.y, _aoResult.Width, _aoResult.Height, _aoResult.Info, _aoResult.Content, _aoResult.LocalPath);
	        }
	        else
	        {
		        alert("??????"  + _aoResult.Info);
	        }
	    });
    }

    this.IsRealChrome = function()
    {
        try
        {
            var agent = window.navigator.userAgent.toLowerCase();            
            var isQQBrowser = agent.indexOf("qqbrowser") != -1;
            if(isQQBrowser)
            {
                return false;
            }
			var isUBrowser = agent.indexOf("ubrowser") != -1;
			if(isUBrowser)
            {
                return false;
            }
            var isChrome = agent.indexOf("chrome") != -1;
            if(isChrome)
            {
                if(chrome&&chrome.runtime)
                {
                    return true;
                }
            }
            return false;
        }
        catch(e)
        {
        }
        return false;    
    }

    this.GetChromeMainVersion = function()
    {
        var gsAgent=navigator.userAgent.toLowerCase();
        var gsChromeVer=""+(/chrome\/((\d|\.)+)/i.test(gsAgent)&&RegExp["$1"]);
        
        if(gsChromeVer != "false") 
            return parseInt(gsChromeVer);
        return 0;
    }
    
    
    this.DoCaptureForChrome = function(name, hide, AutoCapture, x, y, width, height)
    {
        var obj = self.NewCaptureParamObject(name, hide, AutoCapture, x, y, width, height);
	    try
	    {    		
	        var json = $.toJSON(obj);
    		
		    var CrxEventFlag = 'NiuniuCaptureEvent';
		    var objFlag = $('#' + CrxEventFlag);
		    if(objFlag.length < 1)
		    {
			    return emCaptureFailed;
		    }
		    var evt = document.createEvent("CustomEvent");			
	        evt.initCustomEvent(CrxEventFlag, true, false, json); 
	        document.dispatchEvent(evt);		
	        return emCaptureUnknown;
	    }
	    catch(e)
	    {
    		
	    }  
	    return emCaptureUnknown;       
    }

    this.DoCapture = function(name, hide, AutoCapture, x, y, width, height)
    {
        if(self.IsNeedCrx())
        {
             return self.DoCaptureForChrome(name, hide, AutoCapture, parseInt(x), parseInt(y), parseInt(width), parseInt(height));
        }   
        
        if(self.IsNeedCustomizedProtocol())
        {
             return self.DoCaptureForCustomize(name, hide, AutoCapture, parseInt(x), parseInt(y), parseInt(width), parseInt(height));
        }
                 
        if(!self.pluginValid())
        {
            return emCaptureFailed;
        }
        self.niuniuCapture().Capture(name, hide, AutoCapture, x, y, width, height);
        return emCaptureSuccess;            
    }
 
    this.InitNiuniuCapture = function()
    {
        self.LoadPlugin();
        if(self.IsNeedCrx())
	    {
		    self.BindChromeCallback();
	    }
	    
	    if(self.IsNeedCustomizedProtocol())
        {
            self.InitWebSocketAndBindCallback();
        }
    }
    
    
        
    this.InitWebSocketAndBindCallback = function()
    {
	    self.connectHost();
    }
    
	this.getNextPort = function()
	{
		//init port params flag
		//????????????? self.hostPort;
		var portArray = self.hostPort.split(",");
		if(portArray.length < 1)
		{
			alert("?????????????");
			return 30101;
		}
		if(self.hostPortIndex < 0)
		{
			self.hostPortIndex = 0;				
		}
		if(self.hostPortIndex > portArray.length - 1)
		{
			self.hostPortIndex = portArray.length - 1;				
		}
		var nPort = parseInt(portArray[self.hostPortIndex]);
		self.hostPortIndex++;
		if(self.hostPortIndex > portArray.length - 1)
		{
			self.hostPortIndex = 0;				
		}	
		return nPort;
	}
	
    this.connectHost = function()
    {
			if(self.NiuniuSocket != null)
			{
				self.WriteLog("connectHost NiuniuSocket is not null, return.");
				return;
			}
			clearTimeout(self.TimeOutID);
			self.connectState = emConnecting;
			
			
			try{
				var wshosts = ['127.0.0.1', 'localhost'];
				for (var i in wshosts) {
					try{
						var host = "ws://127.0.0.1:" + self.getNextPort() + "/" + self.CaptureName;
						self.NiuniuSocket = new WebSocket(host);
						break;
					}
					catch(ee){
						var ggg= 0;
					}
				}
								
				//OutputLog('Socket Status: '+socket.readyState);
				self.NiuniuSocket.onopen = function(evt){					
					self.NiuniuSocket.send('0' + self.SocketTimeStamp);
					self.WriteLog("NiuniuSocket.onopen.");
					clearTimeout(self.TimeOutID);
				}
				
				self.NiuniuSocket.onmessage = function(msg){
					var str = "";
					str = msg.data;
					var id  = str.substr(0, 1);
					var arg1 = str.substr(1);
					clearTimeout(self.TimeOutID);
					if(id == "0"){
						self.hostPortIndex--;
						//?????????????????????????????????????? 
						self.connectState = emConnected;
						self.pluginLoaded();
						if(self.IsWaitCustomizedCallBack)
						{
						    setTimeout("captureObjSelf.SendReadyRecvData();", 3);
						}
						self.WriteLog("connect sucess.");
						self.ReceivedEchoBack = true;
						clearInterval(self.TimeIntervalID);
						self.TimeIntervalID = setInterval("captureObjSelf.LoopEchoMessage()", 3000);
					}
					if(id == "1"){
						//?????????? 
						var _aoResult = eval("(" + arg1 + ")");
						self.ReceivedEchoBack = true;
						if(_aoResult.command == "echo")
						{					
							self.WriteLog("received echo");
							return;
						}
						self.WriteLog("received capturedata.");
						if(_aoResult.command == "version")
						{
							self.WriteLog(_aoResult.Ver);
							self.VersionCallback(_aoResult.Ver);
						}
						else{
							self.OnCaptureFinishedEx(_aoResult.Type, _aoResult.x, _aoResult.y, _aoResult.Width, _aoResult.Height, _aoResult.Info, _aoResult.Content, _aoResult.LocalPath);						
						}
						
						
					}														
				}
				
				self.NiuniuSocket.onclose = function(evt){
					self.OnWebSocketError("self.NiuniuSocket.onclose." + evt.data);
				}	
				self.NiuniuSocket.onerror = function (evt) {					
					//self.OnWebSocketError("self.NiuniuSocket.onerror." + evt.data);
				  };
					
			} catch(e){
				self.OnWebSocketError("connect exception." + e.message);
			}
    }
    
	this.WriteLog = function(txt)
	{
		//????? 
		try{
			console.log(txt);
		}
		catch(e)
		{
			
		}
	}
	
	this.OnWebSocketError = function(type)
	{		
		self.WriteLog(type);
		self.ReceivedEchoBack = false;
		self.connectState = emClosed;		
		
		if(self.NiuniuSocket != null)
		{
			self.NiuniuSocket.close();
		}
		
		self.NiuniuSocket = null;
		clearTimeout(self.TimeOutID);
		self.TimeOutID = setTimeout("captureObjSelf.connectHost();", 800);
	}
	
	this.LoopEchoMessage = function()
	{
		if(!self.ReceivedEchoBack)
		{
			self.OnWebSocketError("this.LoopEchoMessage, !self.ReceivedEchoBack");
			self.ReceivedEchoBack = false;
			clearInterval(self.TimeIntervalID);
			self.TimeIntervalID = setInterval("captureObjSelf.LoopEchoMessage()", 3000);
			return;
		}
		self.ReceivedEchoBack = false;
		clearTimeout(self.TimeOutID);
		if(self.connectState != emConnected)
		{
			return;
		}		
		var obj = new Object(); 
		obj.command = "echo";
		self.NiuniuSocket.send("1" + encodeURIComponent( $.toJSON(obj)) );		
	}
	
    this.SendReadyRecvData = function()
    {
		self.WriteLog("SendReadyRecvData.");
        var obj = self.NewCaptureParamObject("", 0, 0, 0, 0, 0, 0);
		obj.CmdType = -1;
		self.NiuniuSocket.send("1" + encodeURIComponent( $.toJSON(obj)) );
    }

    this.DoCaptureForCustomize = function(name, hide, AutoCapture, x, y, width, height)
    {
        var obj = self.NewCaptureParamObject(name, hide, AutoCapture, x, y, width, height);
	    try
	    {
    		//????????????????????????websocket?????????????   
    		if(self.connectState == emConnected)
    		{
				var json = $.toJSON(obj);
    		    self.NiuniuSocket.send('1' + encodeURIComponent(json) );
    		}
		    else
		    {
				
				//?????????????????????????????????????? 
				obj.SetWatermarkPicturePath = "";
				//obj.SetWatermarkTextValue = "";	
				var json = $.toJSON(obj);
				self.WriteLog(json.length);
				var newUrl = self.CaptureName + "://" + encodeURIComponent(json);
				self.WriteLog(newUrl.length);
				
		        //?????????????  
				$('#startCaptureFrame').attr('src', newUrl);
		        
		        self.IsWaitCustomizedCallBack = true;
				return emCaptureUnknown;
		    }
		    
	        return emCaptureSuccess;
	    }
	    catch(e)
	    {
    		alert(e.message);
	    }  
	    return emCaptureUnknown;       
    }
    
    
    this.IsNeedCustomizedProtocol = function()
    {
        if(!self.useCustomizedProtoco)
        {
            return false;
        }
        
        if(self.pluginValid())
        {
            return false;
        }
        
        try
        {
            var agent = window.navigator.userAgent.toLowerCase();            
            var isQQBrowser = agent.indexOf("qqbrowser") != -1;
            if(isQQBrowser)
            {
                return false;
            }
			var isUBrowser = agent.indexOf("ubrowser") != -1;
			if(isUBrowser)
            {
                return false;
            }
            var isChrome = agent.indexOf("chrome") != -1;
            if(isChrome)
            {
                if(chrome&&chrome.runtime)
                {
                    return true;
                }
            }
            //????????irefox ??????50?????????????????  
            var brow=$.browser;
            if(brow.mozilla)
            {
                return true;
            }
			var isEdge = agent.indexOf("edge") != -1;
			if(isEdge)
            {
                return true;
            }
            return false;
        }
        catch(e)
        {
        }
        return false;    
    }
	
	this.GetVersion = function()
	{
        if(self.IsNeedCustomizedProtocol())
        {
			if(self.connectState != emConnected)
			{
				return;
			}		
			var obj = new Object(); 
			obj.command = "version";
			self.NiuniuSocket.send("1" + encodeURIComponent( $.toJSON(obj)) );
			return;
        }
                 
        if(!self.pluginValid())
        {
            return;
        }
        var verSion = self.niuniuCapture().GetVersion();
		self.VersionCallback(verSion);
		self.WriteLog(verSion);
	}
}