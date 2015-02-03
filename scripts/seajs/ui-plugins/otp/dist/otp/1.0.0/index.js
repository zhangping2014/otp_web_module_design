define("otp/1.0.0/index",["jquery","otp/1.0.0/OtpImageSuite","otp/1.0.0/otpAPI"],function(e,t,a){var n=e("jquery"),r=e("otp/1.0.0/OtpImageSuite"),o=e("otp/1.0.0/otpAPI"),c={autoSendOtp:!1,firstShowCaptcha:!1,leftSecondFormatter:"{0}s",dataCaptchaId:"captchaId",dataCaptchaToken:"captchaToken",mobileInputSelector:".mobile-input-selector",captchaControlSelector:"captcha-control-selector",captchaInputSelector:".captcha-input-selector",captchaImageSelector:".captcha-image-selector",otpGetSelector:".otp-get-btn-selector",otpInputSelector:".otp-input-selector",otpTickerSelector:".ticker-selector",eventListener:function(){},otpHasPassedCallback:function(){},otpErrorsCallback:function(){},getExtraData:function(){return null}},i=function(e,t,a){function o(){}function i(e){s(!0),O.otpHasPassedCallback&&O.otpHasPassedCallback({data:e})}function s(e){e?(I.prop("disabled",!0),P.prop("disabled",!0)):(I.prop("disabled",!1),P.prop("disabled",!1))}function d(t){e.data(O.dataCaptchaToken,t||null)}function p(){return e.data(O.dataCaptchaToken)}function f(t){e.data(O.dataCaptchaId,t||null)}function h(){return e.data(O.dataCaptchaId)}function l(){return""}function u(e){var t=e.data,a=t.code,n=t.message,r=O.otpErrorsCallback||function(){};switch(a){case"mobile_invalid":r(a,n);break;case"captcha_refreshed_failed":r(a,n);break;case"token_flushed_failed":d(null),r(a,n);break;default:r(a,n)}}function v(e){w=!0,j.css("display","none"),x.css("display","block"),x.html(O.leftSecondFormatter.replace(new RegExp("\\{0\\}","g"),e))}function y(){w=!1,s(!1),j.css("display","block"),x.css("display","none"),x.html("")}function S(e){var t=e;C.css("display","block"),k(t)}function b(){w=!1,y(),O.firstShowCaptcha?C.css("display","block"):C.css("display","none")}function k(e){E.attr("src",e.captchaUrl?e.captchaUrl+"?r="+Math.random():""),f(e.captchaId)}function g(e){var t=e;d(t),O.autoSendOtp&&m()}function m(){var e=I.val(),t=p(),a=l()||"",r=n.extend({},O.getExtraData()||{});A.trySendOTP(e,t,a,r)}function T(){A.refreshCaptcha()}if(e=n(e),!e||!e.length)throw new Error("the context parameter required!");var O=n.extend({},c,a),w=!1,I=(O.eventListener,e.find(O.mobileInputSelector)),C=e.find(O.captchaControlSelector),P=e.find(O.captchaInputSelector),E=e.find(O.captchaImageSelector),j=e.find(O.otpGetSelector),x=(e.find(O.otpInputSelector),e.find(O.otpTickerSelector)),_={trySendOTPServiceName:O.trySendOtpServiceName,ignoreMobileValidation:O.ignoreMobileValidation},A=new r(t,_),M=function(){j.on("click",function(){m()}),P.on("input",function(){var e=n.trim(n(this).val());e&&e.length>=4&&A.verifyCaptcha({captchaInput:e,captchaId:h()})}),E.on("click",function(){w||T()})},D=function(){A.addReceiver(function(e){var t=e.type,a=e.data;switch(O.eventListener&&O.eventListener(e),t){case"OTPSending":o(e);break;case"OTPSentSuccess":i(a);break;case"error":u(e);break;case"showTicker":v(a);break;case"closeTicker":y(a);break;case"captchaShow":S(a);break;case"captchaRefreshed":k(a);break;case"tokenFlushed":g(a)}})};return function(){M(),D(),O.firstShowCaptcha&&(T(),C.css("display","block"))}(),{start:function(){m()},reset:function(){b()},refreshCaptcha:T}};"object"==typeof a&&a&&"object"==typeof a.exports?a.exports={otpService:o,otpModule:i}:"function"==typeof define&&define.amd&&define("otp",[],function(){return{otpService:o,otpModule:i}})}),define("otp/1.0.0/OtpImageSuite",[],function(e,t,a){!function(e){function t(e){return e&&"[object Function]"===p.call(e)}function n(e){var t=function(){};return t.prototype=e,new t}function r(e,t){var a=s[e];return a&&a.test(t)?!0:d[e]}function o(){i&&console&&"[object Console]"==p.call(console)&&console.log.apply(console,arguments)}function c(e,t){this.cfg=n(f);for(var a in t)t.hasOwnProperty(a)&&t[a]&&(this.cfg[a]=t[a]);if(!e)throw new Error("我们必须提供Otp ImageCode 的服务实例！");this.handlers={},this.receiver=null,this.service=e;var r,c=function(e,t){t=t||f.tickerSecond,r=setTimeout(function(){o("ticker `%s` ",t),e.fireEvent("showTicker",t),t-=1,t>0?c(e,t):(t=0,e.fireEvent("closeTicker",t))},f.timeout)},i=function(){r&&(clearTimeout(r),r=0)};this._startTicker=function(e,t){i(),c(e,t)}}var i=!1,s={phone:/^1[3-9][0-9]\d{8}$/,mobile:/^1[3-9][0-9]\d{8}$/,trim:/^\s+|\s+$/g},d={common:"系统内部错误",phone:"手机号码格式错误",mobile:"手机号码格式错误"},p=Object.prototype.toString,f={timeout:1e3,trySendOTPServiceName:"trySendOTP",ignoreMobileValidation:!1,tickerSecond:60};c.prototype={constructor:c,addHandler:function(e,a){"undefined"==typeof this.handlers[e]&&(this.handlers[e]=[]),t(a)&&this.handlers[e].push(a)},addReceiver:function(e){this.receiver=e},removeHandler:function(e,t){if(this.handlers[e]instanceof Array){for(var a=this.handlers[e],n=0,r=a.length;r>n&&a[n]!==t;n++);a.splice(n,1)}},fire:function(e){if(e.target||(e.target=this),this.receiver){if(!t(this.receiver))throw new Error("`receiver`接收器必须是一个函数！");this.receiver(e)}else if(this.handlers[e.type]instanceof Array)for(var a=this.handlers[e.type],n=0,r=a.length;r>n;n++)a[n](e)},fireEvent:function(e,t){o("fireEvent eventType: ",e," data:",t);var a={type:e,data:t||null};this.fire(a)},fireError:function(e,t){this.fireEvent("error",{code:e,message:t})},isMobile:function(e){return r("mobile",e)},trySendOTP:function(e,a,n,c){if(!this.cfg.ignoreMobileValidation){var i=r("phone",e);if(i!==!0)return void this.fireError("mobile_invalid",i)}this.fireEvent("OTPSending");var s=this,d=this.service[this.cfg.trySendOTPServiceName];return t(d)?void d.call(this.service,e,a,n,c,function(e){var t=e.data,a=e.code;switch(a){case"000000":s.fireEvent("OTPSentSuccess",t);var n=0;isNaN(t.retrySeconds)||(n=parseInt(t.retrySeconds)),s._startTicker(s,n);break;case"000001":var r=t.captcha;if(!r)throw Error("当前服务器端未传回Captha对象");s.fireEvent("captchaShow",r);break;default:o("nothing to do...., code: %s in `trySendOTP`",a),s.fireError(a,e.message)}}):void this.fireError("try_send_otp_service_undefined","自定义业务trySendOTP()不是一个函数")},refreshCaptcha:function(e){var t=this;this.service.refreshCaptcha(e,function(e){var a=e.code,n=e.data;switch(a){case"000000":t.fireEvent("captchaRefreshed",n.captcha);break;default:t.fireError("captcha_refreshed_failed",e.message)}})},verifyCaptcha:function(e,t){var a=this;this.service.verifyCaptcha(e,t,function(e){var t=e.code,n=e.data;switch(t){case"000000":a.fireEvent("tokenFlushed",n.captchaToken);break;default:a.fireError("token_flushed_failed",e.message)}})}},e.OtpImageSuite=c,"object"==typeof a&&a&&"object"==typeof a.exports?a.exports=c:"function"==typeof define&&define.amd&&define("OtpImageSuite",[],function(){return c})}(window)}),define("otp/1.0.0/otpAPI",["jquery"],function(e,t,a){function n(e){return/^(ftp|http|https):\/\/[^ "]+$/.test(e)||(e=this.apiRoot+e),e}var r=e("jquery"),o=function(e){var t={};return t.code=e.code,t.data=e.data,t.message=e.message,t},c=function(e){var t=o(e);return"000000"==t.code?t.data={maskedMobile:t.data.maskedMobile,retrySeconds:t.data.retrySeconds,otpId:t.data.otpId}:"000000"!=t.code&&"1184"==t.code&&(t.code="000001",t.data={captcha:{captchaId:t.data.captchaId,captchaUrl:t.data.captchaUrl}}),t},i=function(e){var t=o(e);return"000000"==t.code&&(t.data={captcha:{captchaId:t.data.captchaId,captchaUrl:t.data.captchaUrl}}),t},s=function(e){var t=o(e);return"000000"==t.code&&(t.data={captchaToken:t.data}),t};window.OtpAPI={apiRoot:"http://localhost:1100",trySendOTPApi:"",dtos:{baseAjaxDto:o,baseAjaxTrySendOTPDto:c,baseAjaxRefreshCaptchaDto:i,baseAjaxVerifyCaptchaDto:s},trySendOTP:function(e,t,a,o,i){var s={phone:e};t&&(s.captchaToken=t),a&&(s.deviceId=a),r.extend(s,o);var d=this.trySendOTPApi||"/selfcenter/changeSendOtp";r.ajax({url:n.call(this,d),contentType:"application/json",type:"POST",dataType:"json",data:JSON.stringify(s),processData:!1}).then(function(e){i&&i(c(e))},function(e){throw new Error("status code:"+e.status)})},refreshCaptcha:function(e,t){var a={};r.extend(a,e),r.ajax({url:n.call(this,"/goutong/refreshCaptcha"),contentType:"application/json",type:"POST",dataType:"json",data:JSON.stringify(a),processData:!1}).then(function(e){t&&t(i(e))},function(e){throw new Error("status code:"+e.status)})},verifyCaptcha:function(e,t,a){r.extend(e,t),r.ajax({url:n.call(this,"/goutong/verifyCaptcha"),contentType:"application/json",type:"POST",dataType:"json",data:JSON.stringify(e),processData:!1}).then(function(e){a&&a(s(e))},function(e){throw new Error("status code:"+e.status)})}},"object"==typeof a&&a&&"object"==typeof a.exports?a.exports=window.OtpAPI:"function"==typeof define&&define.amd&&define("OtpAPI",[],function(){return window.OtpAPI})});