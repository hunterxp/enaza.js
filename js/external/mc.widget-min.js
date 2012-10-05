var Cackle=(function(){var F;
var B="cackle.ru";
var C="cd324c4554a5";
var D=(typeof mcJqueryOff!="undefined")?mcJqueryOff:false;
function E(){F=window.jQuery.noConflict(true);
A()
}var A=function A(){F(document).ready(function(L){F(document).unbind(".cackle");
var i={google:{name:"Google",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=https://www.google.com/accounts/o8/id"},googleplus:{name:"Google+",url:"http://"+B+"/signin/googleplus/proxy?scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email"},yahoo:{name:"Yahoo",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=http://me.yahoo.com/"},yandex:{name:"Яндекс",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=http://openid.yandex.ru"},vkontakte:{name:"Вконтакте",url:"http://"+B+"/signin/vkontakte/proxy?scope=+99840"},facebook:{name:"Facebook",url:"http://"+B+"/signin/facebook/proxy?scope=email,status_update,offline_access"},twitter:{name:"Twitter",url:"http://"+B+"/signin/twitter/proxy"},mymailru:{name:"Мой Мир@Mail.Ru",url:"http://"+B+"/signin/mymailru/proxy?scope=stream"},odnoklassniki:{name:"Одноклассники",url:"http://"+B+"/signin/odnoklassniki/proxy?scope=VALUABLE%20ACCESS"},mailru:{name:"Mail.Ru",label:"Введите ваше имя пользователя на Mail.ru",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=http://{username}.id.mail.ru/&openid_username={username}"},rambler:{name:"Рамблер",label:"Введите ваше имя пользователя на Рамблер",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=http://id.rambler.ru/users/{username}&openid_username={username}"},myopenid:{name:"MyOpenID",label:"Введите ваше имя пользователя на MyOpenID",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=http://{username}.myopenid.com/&openid_username={username}"},livejournal:{name:"Живой Журнал",label:"Введите ваше имя в Живом Журнале",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=http://{username}.livejournal.com/&openid_username={username}"},flickr:{name:"Flickr",label:"Введите ваше имя на Flickr",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=http://flickr.com/{username}/&openid_username={username}"},wordpress:{name:"Wordpress",label:"Введите ваше имя на Wordpress.com",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=http://{username}.wordpress.com/&openid_username={username}"},blogger:{name:"Blogger",label:"Ваш Blogger аккаунт",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=http://{username}.blogspot.com/&openid_username={username}"},verisign:{name:"Verisign",label:"Ваше имя пользователя на Verisign",url:"http://"+B+"/j_spring_openid_security_check_mc?openid_identifier=http://{username}.pip.verisignlabs.com/&openid_username={username}"}};
var I=null;
var N="0";
var j="";
var J="32";
var Y=null;
var e=true;
var g=true;
var b=0;
var U=(typeof mcLocale!="undefined")?"&locale="+mcLocale:"";
var P=false;
var c="";
var O="";
var T="";
var X="";
var Z="";
L.getJSON("http://"+B+"/widget/"+mcSite+"/setting?callback=?"+U,function(l){var k=l.setting;
N=k.paginationSize||N;
j=(typeof mcProviders!="undefined")?mcProviders:k.providers;
J=k.avatarSize||J;
e=k.urlRecogn;
g=k.anonym===undefined||k.anonym;
b=k.level===undefined?0:k.level;
X=k.anonymAvatar||"http://gravatar.com/avatar/00000000000000000000000000000000?d=mm",Z=l.css;
I=MC_MESSAGES;
Y=k.mcHeader||I.header;
c=k.fromLabel||I.from;
O=k.placeholder||I.placeholder;
T=k.submitLabel||I.submit;
i.yandex.name=I.yandex;
i.vkontakte.name=I.vkontakte;
i.mymailru.name=I.mymailru;
i.odnoklassniki.name=I.odnoklassniki;
i.mailru.label=I.mailruLabel;
i.rambler.name=I.rambler;
i.rambler.label=I.ramblerLabel;
i.myopenid.label=I.myopenidLabel;
i.livejournal.name=I.livejournal;
i.livejournal.label=I.livejournalLabel;
i.flickr.label=I.flickrLabel;
i.wordpress.label=I.wordpressLabel;
i.blogger.label=I.bloggerLabel;
i.verisign.label=I.verisignLabel;
Q.init();
a.init();
V.init();
M.init();
f.init();
R.init()
});
var H=(typeof customProviders!="undefined")?L.extend(i,customProviders):i;
var Q={containerId:"#mc-container",openidContainers:".mc-providers, .mc-popup-providers",avatarContainerId:"#mc-avatar-container",authorImgId:"mc-author-img",liCache:{},init:function(){this.loadCss();
this.loadHtml();
L("#mc-message").bind("keyup",f.textareaAutoResize)
},loadCss:function(){var k=L("<link>",{rel:"stylesheet",type:"text/css",href:"http://"+B+"/static/style/comment-min.css?v="+C});
k.appendTo("head")
},loadHtml:function(){var l=L("<div/>",{id:"mc-content"});
l.html('<style type="text/css">'+Z+'</style><div class="mc-auth-container"><span class="mc-auth-lable">'+c+'</span><div class="mc-providers"></div></div><div id="mc-openid-input-area"></div><div><div id="mc-avatar-container"></div><div id="mc-popup"><div class="mc-popup-top"><h4>'+I.popupHeader+'</h4><span id="popupClose" title="'+I.popupClose+'"></span></div><div id="mc-popup-main"><p>'+I.popupBody+':</p><div class="mc-popup-providers"></div><div id="mc-openid-input-popup"></div></div></div><div id="mc-dialog"><div class="mc-popup-top"><h4></h4><span id="dialogClose"></span></div><div id="mc-dialog-main"></div></div><div id="mc-text-container"><div class="mc-text-box"><div class="mc-text-child"><textarea id="mc-message" name="mc-message" placeholder="'+O+'"></textarea></div></div><div class="mc-submit-box"><span id="mc-social-submit" style="display:none;"><table><tbody><tr><td><input id="mc-social-check" type="checkbox" checked="checked"/></td><td><label for="mc-social-check">'+I.socialSubmit+' </label></td><td><span id="mc-social-icon"/></td></tr></tbody></table></span><button id="mc-submit" class="mc-button">'+T+'</button></div><div class="mc-info-box"><h4>'+I.commentCount+': <span id="mc-count">0</span></h4><div id="mc-wait"><img src="http://'+B+'/static/images/load-avatar.gif"/><span>'+I.commentLoading+'...</span></div></div></div><div id="mc-comments"><ul id="mc-comment-list"></ul></div><div id="mc-pagination"><img id="mc-next-wait" src="http://'+B+'/static/images/load-avatar.gif"/><button id="mc-next" class="mc-button" title="0">'+I.nextComments+"</button></div></div>");
var k=L("#mc-link");
if(k.length==0||!k.is(":visible")||k.text()===""){L("#mc-wait",l).before('<h6>powered by <a href="http://cackle.ru"><b style="color:#4FA3DA">CACKL</b><b style="color:#F65077">E</b></a></h6>')
}if(Y){l.prepend(L("<h3></h3>").text(Y))
}this.buildProviders(L(this.openidContainers,l));
this.buildAvatar(L(this.avatarContainerId,l),function(){W.init()
});
L(this.containerId).html(l);
if(g){L("#mc-popup-main",l).append(this.buildAnonym());
this.initCaptcha()
}this.initSocialCheck()
},buildAnonym:function(){return'<div id="mc-captcha-container">'+I.popupOr+' <span id="mc-captcha" class="mc-as-link">'+I.anonymLogin+'</span><div id="mc-captcha-content"><table><tbody><tr><td class="mc-anonym-lable">'+I.anonymName+'</td><td><input type="text" id="mc-anonym-name" name="name"/></td></tr><tr><td class="mc-anonym-lable">'+I.anonymEmail+'</td><td><input type="text" id="mc-anonym-email" name="email"/></td></tr></tbody></table><div id="mc-google-captcha"></div><button id="mc-anonym-submit" class="mc-button">'+T+"</button></div></div>"
},buildProviders:function(k){L.each(j.split(";"),function(l,n){if(H[n]){L(k).each(function(){L(this).append('<span class="mc-provider mc'+n+'" name="'+n+'" title="'+H[n].name+'"/>')
})
}})
},buildAvatar:function(l,o){var n=this,k="http://"+B+"/widget/"+mcSite+"/avatar?callback=?";
L.getJSON(k,function(p){l.html(n.buildAvatarImg(p.avatarSrc,p.id,n.authorImgId,36));
if(p.id>0){if(p.provider){n.displaySocialCheck(l.parents("#mc-content"),p.provider)
}else{L("#mc-social-submit").hide()
}l.append('<span id="mc-logout">'+I.logout+"</span>");
L("#mc-logout").click(function(){V.logoutWindow(V);
L("#mc-social-submit").hide()
})
}P=p.siteAdmin;
if(o){o(p)
}})
},buildAuthor:function(o,n){var k=L("<div/>").addClass("mc-comment-author"),l=o||I.guest;
if(n){var p;
if(n.match("^https?://")){p=n
}else{p="http://"+n
}username=L("<a/>",{href:p}).text(l);
k.append(username)
}else{k.text(l)
}return k
},buildAvatarImg:function(p,o,l,n){var k,q,r=n||J;
if(l){k=L("<img/>",{id:l})
}else{k=L("<img/>")
}if(p.indexOf("http://gravatar.com/")==0){q=p+"&s="+r
}else{q=p
}k.addClass("mc-avatar-img").attr({src:q,alt:o,height:r,width:r});
return k
},buildVote:function(o){var n="mc-rating"+o.id,l=L("<td/>",{id:n,title:I.rating}),k=L('<div class="mc-comment-vote"><table><tbody><tr><td class="mc-comment-like"><a href="http://'+B+"/widget/comment/"+o.id+'/vote/up" class="mc-vote"><img title="'+I.ratingUp+'" alt="'+I.ratingUp+'" src="http://'+B+'/static/images/vote_up.png"/></a></td><td class="mc-comment-unlike"><a href="http://'+B+"/widget/comment/"+o.id+'/vote/down" class="mc-vote"><img title="'+I.ratingDown+'" alt="'+I.ratingDown+'" src="http://'+B+'/static/images/vote_down.png"/></a></td></tr></tbody></table></div>');
this.changeRating(l,o.rating);
L("table tr",k).prepend(l);
return k
},changeRating:function(k,n){var l="comment-rating-zero";
if(n>0){l="comment-rating-plus";
n="+"+n
}else{if(n<0){l="comment-rating-neg"
}}k.attr("class","");
k.addClass(l);
k.text(n)
},buildHeader:function(p){var u=L("<table/>"),o=L("<tbody/>"),q=L("<tr/>"),l=L("<td/>").addClass("mc-avatar-td"),v=L("<td/>").addClass("mc-author-td"),s=L("<td/>").addClass("mc-vote-td"),t=L("<span/>").addClass("mc-provider-img"),k=L("<a/>",{href:"javascript:"}).addClass("mc-avatar-link");
u.append(o.append(q));
if(p.author){k.append(this.buildAvatarImg(p.author.avatarSrc,p.author.id));
l.append(k);
var r=p.author.provider;
if(r){t.attr("title",I[r]||r);
t.addClass("mc-"+r);
l.append(t)
}v.append(this.buildAuthor(p.author.name,p.author.www))
}else{var n="";
if(p.status==="APPROVED"){n=p.anonym.name
}k.append(this.buildAvatarImg(X,0));
l.append(k);
v.append(this.buildAuthor(n))
}s.append(this.buildVote(p));
q.append(l);
q.append(v);
q.append(s);
return u
},buildFooter:function(p,o){var l=f.getTimeAgo(p.creationDate,I),n=L('<div class="mc-footer"></div>'),k='<div class="mc-timeago-box"><a href="'+this.buildCommentUrl(p.id)+'">'+l+"</a></div>";
if((b==0||o<b)&&p.status==="APPROVED"){n.append('<div class="mc-answer-btn"><a class="mc-answer" href="#">'+I.answer+"</a></div>")
}n.append(k);
K.addToolbar(n,p);
return n
},buildCommentUrl:function(l){var k=f.getBeforeAnchor(window.location.href);
return k+"#mc-"+l
},appendComment:function(p,l,w){if(L("#mc-"+p.id).length>0){return 
}var r=L("<div/>").addClass("mc-user-box"),v=L("<div/>").addClass("mc-comment-message"),s=L("<div/>",{id:"mc-"+p.id+"-footer"}),q=L("<div/>"),t=L("<li/>",{id:"mc-"+p.id}),k=0;
if(p.parent>0){var n="#mc-"+p.parent,o;
if(this.liCache[n]){o=this.liCache[n]
}else{o=L("#mc-"+p.parent);
this.liCache[n]=o
}if(p.status=="APPROVED"&&o.is(":hidden")){o.show();
L(o.parents("li")).each(function(){L(this).show()
})
}var u=L(o.children("ul.mc-comment-child"));
if(u.length){l=u
}else{l=L("<ul/>").addClass("mc-comment-child");
o.append(l)
}k=l.parents("li").length
}r.append(this.buildHeader(p));
if(p.message){v.text(p.message)
}else{v.text(I["comment"+p.status])
}s.html(this.buildFooter(p,k));
if(e){html=v.html();
v.html(f.replaceURLWithHTMLLinks(html))
}q.append(r);
q.append(v);
q.append(s);
if(p.status){q.addClass(p.status)
}t.html(q);
if(w){t.hide();
l.prepend(t);
t.slideDown("slow")
}else{if(!P&&p.status!="APPROVED"){t.hide()
}l.append(t)
}},updateCommentStatus:function(l,k){var n=L(l),o=L(n).children("div");
if(k){o.attr("class",k)
}},initCaptcha:function(){L.getScript("http://www.google.com/recaptcha/api/js/recaptcha_ajax.js",function(k,l){Recaptcha.create("6LffWskSAAAAAAlOskeXehF-XCI1d8fKv1R9xVY-","mc-google-captcha",{theme:"clean"})
})
},initSocialCheck:function(){L("#mc-social-check").click(function(){var k="mc-submit-"+L("#mc-social-icon").attr("title");
if(L(this).is(":checked")){S.create(k,"on",365)
}else{S.create(k,"off",365)
}})
},displaySocialCheck:function(l,q){var n=S.read("mc-submit-"+q),k=L("#mc-social-check",l),o=L("#mc-social-icon",l),p=L("#mc-social-submit",l);
if(!n||n=="on"){k.attr("checked","checked")
}else{k.removeAttr("checked")
}o.attr("class","mc"+q+"-post");
o.attr("title",q);
p.show()
}};
var W={channel:"",url:"",popup:"",anonymSubmit:"",messageTextArea:"",mcCount:"",init:function(){this.initChannel();
this.initElements();
this.recive();
L("#mc-submit").live("click.cackle",L.proxy(this.clickBySubmit,this));
L(".mc-answer-btn button").live("click.cackle",L.proxy(this.clickByAnswerSubmit,this));
L(".mc-vote").live("click.cackle",this.vote);
L(".mc-answer").live("click.cackle",this.answerShow);
L(".mc-avatar-img").live("click.cackle",this.getKarmaGraph);
L("#mc-captcha").live("click.cackle",this.showCaptcha);
L("#mc-comment-list li div").live("mouseover.cackle",this.showModerateLink);
L("#mc-comment-list li div").live("mouseout.cackle",this.hideModerateLink)
},initChannel:function(){var k=window.location.href;
if(typeof mcChannel=="undefined"||(typeof mcChannel=="string"&&mcChannel.match(k))){this.channel=f.getBeforeAnchor(k)
}else{this.channel=mcChannel
}if(typeof mcUrl=="undefined"){this.url=f.getBeforeAnchor(k)
}else{this.url=mcUrl
}},initElements:function(){this.popup=L("#mc-popup");
this.anonymSubmit=L("#mc-anonym-submit");
this.messageTextArea=L("#mc-message");
this.mcCount=L("#mc-count")
},isAnonym:function(){return L("#mc-author-img").attr("alt")==0
},clickBySubmit:function(l){var k=L(l.target),p=this;
if(this.isAnonym()){if(!this.popup.is(":visible")){var o=(L(window).height()/2)-(175/2);
var n=(L(window).width()/2)-(462/2);
this.popup.attr("style","display:block;top:"+o+"px;left:"+n+"px;");
this.anonymSubmit.click(function(){p.submit(p,p.submitAnonymUrl,null,null,null,null,function(){V.closePopup()
},function(){if(p.popup.is(":visible")){Recaptcha.reload()
}else{Recaptcha.reload("t")
}})
})
}}else{k.attr("disabled","disabled");
this.submit(this,this.submitUrl,null,null,null,null,null,function(){k.removeAttr("disabled");
p.messageTextArea.focus()
})
}},clickByAnswerSubmit:function(o){var n=L(o.target),r=n.parents("li").attr("id"),k=L("#"+r),l=L(k).find("ul.mc-comment-child")[0]?L(L(k).find("ul.mc-comment-child")[0]):L("<ul/>").addClass("mc-comment-child");
if(this.isAnonym()){if(!this.popup.is(":visible")){var q=(L(window).height()/2)-(175/2);
var p=(L(window).width()/2)-(462/2);
this.popup.attr("style","display:block;top:"+q+"px;left:"+p+"px;");
$this=this;
this.anonymSubmit.click(function(){$this.answerSubmit($this,r,$this.submitAnonymUrl,l,function(){V.closePopup();
L("#replay"+r).slideUp("slow");
if(!L(k).find("ul")[0]){k.append(l)
}},function(){if($this.popup.is(":visible")){Recaptcha.reload()
}else{Recaptcha.reload("t")
}})
})
}}else{n.attr("disabled","disabled");
this.answerSubmit(this,r,this.submitUrl,l,function(){L("#replay"+r).slideUp("slow");
if(!L(k).find("ul")[0]){k.append(l)
}},function(){n.removeAttr("disabled")
})
}},recive:function(l,o){var n=this,k=this.reciveUrl(this.channel);
L.getJSON(k,function(p){var q=L("#mc-comment-list"),r=0;
L("#mc-wait").hide();
L(p.comments).each(function(){Q.appendComment(this,q,l);
if(this.status==="APPROVED"){r+=1
}});
n.mcCount.text(p.size);
n.gotoComment();
if(N>0&&p.next!=false){M.show()
}else{M.hide()
}if(o){o()
}})
},reRecive:function(){L("#mc-comment-list").empty();
Q.liCache={};
this.recive()
},reciveUrl:function(n){var k=P?"/fullComments":"/comments",l="http://"+B+"/widget/"+mcSite+k+"?chan="+encodeURIComponent(this.channel)+"&callback=?";
if(N>0){var o=M.getPage();
l+="&page="+o+"&size="+N
}return l
},gotoComment:function(){var k=window.location.href;
if(k.indexOf("#mc-")>0){document.location.replace(k)
}},submit:function(q,r,x,s,l,t,v,u){var n=s?s:0,p=x?x:L("#mc-message").val(),w=l?l:L("#mc-comment-list"),o=t?t:L("#mc-message"),k=r(q,p,n);
a.send(k.url,k.data,function(z){var AC=L.parseJSON(z.data),AD=AC.comment,AB=AC.size,AA=AC.error;
if(AD){if(v){v()
}Q.appendComment(AD,w,true);
o.val("");
q.mcCount.text(AB)
}else{if(AA){if(AA==="commentPreModer"){o.val("")
}alert(I[AA])
}}},function(z){},u)
},submitUrl:function(p,n,l){var k="http://"+B+"/widget/"+mcSite+"/createComment",o={loc:p.url,chan:p.channel,msg:f.escapeSpecialChars(n),parentId:0,social:""};
if(l>0){o.parentId=l
}if(L("#mc-social-submit:visible #mc-social-check:checked").length){o.social="on"
}return{url:k,data:o}
},submitAnonymUrl:function(p,n,l){var k="http://"+B+"/widget/"+mcSite+"/createComment",o={loc:p.url,chan:p.channel,msg:f.escapeSpecialChars(n),recaptcha_challenge_field:L("#mc-google-captcha #recaptcha_challenge_field").val(),recaptcha_response_field:L("#mc-google-captcha #recaptcha_response_field").val(),email:L("#mc-anonym-email").val(),name:L("#mc-anonym-name").val(),parentId:0};
if(l>0){o.parentId=l
}return{url:k,data:o}
},vote:function(){if(L("#mc-author-img").attr("alt")==0){return false
}var k=L(this).attr("href")+"?callback=?";
L.getJSON(k,function(l){if(l.rating){Q.changeRating(L("#mc-rating"+l.id),l.rating)
}});
return false
},answerShow:function(){var n=L(this).parents("li").attr("id"),l=L("#"+n+"-footer"),k=l.find("#replay"+n)[0];
if(k&&!L(k).is(":hidden")){L(k).slideUp("slow")
}else{if(!k){k=L("<div/>",{id:"replay"+n}).addClass("mc-answer-box");
k.html('<div class="mc-text-box"><div class="mc-text-child"><textarea class="mc-answer-textarea"></textarea></div></div><div class="mc-answer-btn"><button class="mc-small-button">'+T+"</button><div>");
l.append(k)
}L(k).slideDown("slow",function(){var o=L(".mc-answer-textarea");
L(o).bind("keyup",f.textareaAutoResize);
o.focus()
})
}return false
},answerSubmit:function(n,l,o,k,s,r){var q=L("#replay"+l+" .mc-text-child textarea"),t=q.val(),p=l.replace("mc-","");
n.submit(n,o,t,p,k,q,s,r)
},getKarmaGraph:function(){var n=L(this),l=n.attr("alt"),k="http://"+B+"/widget/karma/"+l+"?callback=?";
L.getJSON(k,function(p){var r,u;
if(n.attr("id")==Q.authorImgId){r=n.parent().parent();
u={top:"-60px"}
}else{r=L(n.parents(".mc-user-box")[0]);
u={top:"-140px"}
}var q=L(".mc-karma-graph",r)[0];
if(q&&L(q).length&&!L(q).is(":visible")){var o=L("p img",q);
o.attr("src",p.karma_graph);
L(q).fadeIn()
}else{var s=L("<div/>").addClass("mc-karma-graph").css(u),t='<p><img src="'+p.karma_graph+'"/></p>';
s.append(t);
r.prepend(s);
L(s).fadeIn()
}})
},showCaptcha:function(){var k=L("#mc-captcha-content");
if(k.is(":visible")){k.slideUp("slow")
}else{k.slideDown("slow")
}},showModerateLink:function(n){var o=L(n.target),k=L(o).parents("li")[0];
if(P){var l=L(".mc-footer .mc-moderate-box",k)[0];
L(l).show()
}},hideModerateLink:function(n){var o=L(n.target),k=L(o).parents("li")[0];
if(P){var l=L(".mc-footer .mc-moderate-box",k)[0];
L(l).hide()
}}};
var V={init:function(){L(".mc-providers .mc-provider").live("click.cackle",L.proxy(this.loginClick,this));
L(".mc-popup-providers .mc-provider").live("click.cackle",L.proxy(this.loginPopupClick,this));
L(".mc-login-input").live("click.cackle",L.proxy(this.loginInputClick,this));
L("#popupClose").live("click.cackle",this.closePopup)
},loginClick:function(l){var k=L(l.target),n=H[k.attr("name")];
if(n.label){if(L("#mc-openid-input-area").is(":visible")&&n.url==L(L(".mc-open-input")[0]).attr("title")){L("#mc-openid-input-area").slideUp("slow")
}else{L("#mc-openid-input-area").html(this.inputOpenid(n));
L("#mc-openid-input-area").slideDown("slow")
}}else{this.loginWindow(n.url)
}},loginPopupClick:function(l){var k=L(l.target),n=H[k.attr("name")];
if(n.label){L("#mc-openid-input-popup").html(this.inputOpenid(n));
L("#mc-openid-input-popup").slideDown("slow")
}else{L("#mc-openid-input-popup").slideUp("slow");
this.loginWindow(n.url)
}},loginInputClick:function(){var n=L(L(".mc-open-input")[0]).attr("title"),k=L(L(".mc-open-input")[0]).val(),l=n.replace("{username}",k);
this.loginWindow(l,k)
},inputOpenid:function(k){return"<p>"+k.label+'</p><input class="mc-open-input" type="text" title="'+k.url+'"/><input class="mc-login-input" type="submit" value="'+I.login+'"/>'
},loginWindow:function(o,l){var n=850,k=500;
this.waitAvatar();
openid_window=window.open(o,I.auth,"width="+n+",height="+k+",location=1,status=1,resizable=yes");
this.checkConnection(openid_window)
},logoutWindow:function(o){var l="http://"+B+"/j_spring_security_logout_mc",n=400,k=400;
o.waitAvatar();
openid_window=window.open(l,I.logout,"width="+n+",height="+k+",location=1,status=1,resizable=yes");
o.checkConnection(openid_window)
},checkConnection:function(l){var n=this;
function k(){if(l&&l.closed){Q.buildAvatar(L(Q.avatarContainerId),function(p){if(p.siteAdmin){W.reRecive()
}if(p.id>0){n.closePopup();
L("#mc-message").focus();
var o=(typeof mcRefreshAfterLogin!="undefined")?mcRefreshAfterLogin:false;
if(o){window.location.reload()
}}})
}else{setTimeout(k,1000)
}}setTimeout(k,1000)
},waitAvatar:function(){L("#"+Q.authorImgId).attr("src","http://"+B+"/static/images/load-avatar.gif")
},closePopup:function(){W.anonymSubmit.unbind("click");
L("#mc-popup").hide()
}};
var M={init:function(){L("#mc-next").click(L.proxy(this.next,this))
},setPage:function(k){return L("#mc-next").attr("title",k)
},getPage:function(){var k=L("#mc-next");
if(k.length){return parseInt(k.attr("title"))
}else{return 0
}},next:function(){L("#mc-next").hide();
L("#mc-next-wait").show();
this.setPage(this.getPage()+1);
W.recive(null,function(){L("#mc-next-wait").hide();
L("#mc-next").show()
})
},show:function(){L("#mc-pagination").show()
},hide:function(){L("#mc-pagination").hide()
}};
var f={init:function(){this.initCloseEvent()
},initCloseEvent:function(){L(document).click(function(p){var l=L(p.target),o=L("#mc-openid-input-area"),s=l.parents("#mc-openid-input-area"),q=l.attr("id")==o.attr("id")||s.attr("id")==o.attr("id"),k=L(".mc-karma-graph"),r=l.parents("#mc-popup"),n=L("#mc-popup");
if(o&&o.is(":visible")&&!l.hasClass("mc-provider")&&!q){o.slideUp("slow")
}k.each(function(){if(L(this).is(":visible")){L(this).hide()
}});
if(l.attr("id")!="mc-submit"&&!l.hasClass("mc-small-button")&&!r.length&&n.is(":visible")){V.closePopup()
}})
},replaceURLWithHTMLLinks:function(o){var n=/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,k=/(^|[^\/])(www\.[\S]+(\b|$))/ig,l=o.replace(n,'<a href="$1" target="_blank">$1</a>');
return l.replace(k,'$1<a href="http://$2" target="_blank">$2</a>')
},textareaAutoResize:function(){L(this).css("height","");
if(parseInt(L(this).css("min-height"))<this.scrollHeight){L(this).css("height",this.scrollHeight+"px")
}},getBeforeAnchor:function(k){if(k.indexOf("#")>0){return k.substring(0,k.indexOf("#"))
}else{return k.substring(0,k.length)
}},getAfterAnchor:function(k){return k.substring(k.indexOf("#"),k.length)
},escapeSpecialChars:function(l){var n=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,k={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};
n.lastIndex=0;
return n.test(l)?l.replace(n,function(o){var p=k[o];
return typeof p==="str"?p:"\\u"+("0000"+o.charCodeAt(0).toString(16)).slice(-4)
}):l
},getTimeAgo:function(p,o){var l=new Date().getTime(),k=l-p,n=k/1000;
m=n/60;
h=m/60;
d=h/24;
y=d/365;
if(n<45){return o.second
}else{if(n<90){return o.minute
}else{if(m<45){return o.minutes(m)
}else{if(m<90){return o.hour
}else{if(h<24){return o.hours(h)
}else{if(h<48){return o.day
}else{if(d<30){return o.days(d)
}else{if(d<60){return o.month
}else{if(d<365){return o.months(d)
}else{if(y<2){return o.year
}else{return o.years(y)
}}}}}}}}}}}};
var S={create:function(n,o,p){var k="";
if(p){var l=new Date();
l.setTime(l.getTime()+(p*24*60*60*1000));
k="; expires="+l.toGMTString()
}document.cookie=n+"="+o+k+"; path=/"
},read:function(l){var o=l+"=";
var k=document.cookie.split(";");
for(var n=0;
n<k.length;
n+=1){var p=k[n];
while(p.charAt(0)===" "){p=p.substring(1,p.length)
}if(p.indexOf(o)===0){return p.substring(o.length,p.length)
}}return null
},erase:function(k){this.createCookie(k,"",-1)
}};
var a={xhr:null,init:function(){var k=this;
L.getScript("http://"+B+"/xdm/easyXDM.min.js",function(l,n){k.xhr=new easyXDM.Rpc({remote:"http://"+B+"/xdm/index.html"},{remote:{request:{}},serializer:{stringify:function(o){var p={id:o.id,jsonrpc:o.jsonrpc,method:o.method,params:o.params[0]};
return k.stringify(p)
},parse:function(o){return L.parseJSON(o)
}}})
})
},send:function(n,o,p,l,k){this.xhr.request({url:n,method:"POST",data:o},function(q){p(q);
k()
},function(q){l(q);
k()
})
},stringify:function(q){var p=typeof (q);
if(p!="object"||q===null){if(p=="string"){q='"'+q+'"'
}return String(q)
}else{var r,l,o=[],k=(q&&q.constructor==Array);
for(r in q){l=q[r];
p=typeof (l);
if(p=="string"){l='"'+l+'"'
}else{if(p=="object"&&l!==null){l=this.stringify(l)
}}o.push((k?"":'"'+r+'":')+String(l))
}return(k?"[":"{")+String(o)+(k?"]":"}")
}}};
var R={init:function(){var k=L("#mc-dialog"),l=this;
L("#dialogClose").click(function(){k.hide()
});
L(".mc-popup-top").mousedown(function(p){var n=L(this).parent(),o=l.getMouseOffset(l,this,p);
L(document).mousemove(function(q){if(n){n.css("top",q.pageY-o.y+"px");
n.css("left",q.pageX-o.x+"px")
}});
L(this).mouseup(function(){n=null
});
return false
})
},getMouseOffset:function(o,n,l){var k=o.getPosition(n);
return{x:l.pageX-k.x,y:l.pageY-k.y}
},getPosition:function(n){var l=0;
var k=0;
while(n.offsetParent){l+=n.offsetLeft;
k+=n.offsetTop;
n=n.offsetParent
}l+=n.offsetLeft;
k+=n.offsetTop;
return{x:l,y:k}
},show:function(r,t,k,s){var p=L("#mc-dialog"),o=s>0||p.height(),n=k>0||p.width();
L("#mc-dialog .mc-popup-top h4").text(r);
L("#mc-dialog-main").html(t);
if(!p.is(":visible")){var q=(L(window).height()/2)-(o/2);
var l=(L(window).width()/2)-(n/2);
p.attr("style","display:block;top:"+q+"px;left:"+l+"px;");
if(s){p.css("height",o)
}if(k>0){p.css("width",n)
}else{if(k<0){p.css("width","auto")
}}}},hide:function(){var k=L("#mc-dialog");
if(k.is(":visible")){k.hide()
}}};
var K={addToolbar:function(k,p){var n=this,o=L('<div class="mc-moderate-box" style="display:none"></div>'),l=L("<a/>",{href:"#"});
l.text(I.moderate);
o.html(l);
L(l).click(function(){var q=L(this).parents("li")[0],s=L(q).children("div"),r=L(s).attr("class");
R.show(I.moderation,n.toolbar(p,r),-1);
return false
});
k.append(o)
},toolbar:function(n,k){var l=L("<p/>");
l.append(this.userPanel(n,n.author));
l.append(this.commentPanel(n,k));
return l
},userPanel:function(s,q){var t=this,v=L("<table/>"),r=L("<tbody/>"),u=L("<tr/>"),o=L("<td/>"),n=L("<td/>"),p=L("<tr/>"),l=L("<td/>"),k=L("<td/>");
v.append(r);
v.css("background-color","#EEEEEE");
v.css("padding","2px");
r.append(u);
u.append(o);
u.append(n);
r.append(p);
p.append(l);
p.append(k);
L.getJSON("http://"+B+"/comment/"+s.id+"/isBanned?callback=?",function(AA){if(!s.anonym){var x,w=AA.name||I.guest;
o.text();
if(AA.email){w+=" <"+AA.email+">"
}o.text(w);
if(AA.isUserBanned){x=t.moderateLink(s.id,"unbanUser",I.unbanUser)
}else{x=t.moderateLink(s.id,"banUser",I.banUser)
}n.html(x);
L(x).click(function(){L.getJSON(L(this).attr("href"),function(AB){t.reinitToolbar(AB.comment)
});
return false
})
}else{o.text(I.anonym)
}var z;
l.text(AA.ip);
if(AA.isIpBanned){z=t.moderateLink(s.id,"unbanIp",I.unbanIp)
}else{z=t.moderateLink(s.id,"banIp",I.banIp)
}k.html(z);
L(z).click(function(){L.getJSON(L(this).attr("href"),function(AB){t.reinitToolbar(AB.comment)
});
return false
})
});
return v
},commentPanel:function(r,k){var q=this,p=[],n=L("<table/>"),l=L("<tbody/>"),o=L("<tr/>");
n.append(l);
n.css("background-color","#EEEEEE");
n.css("padding","2px");
n.css("margin-top","4px");
l.append(o);
if(k==="APPROVED"){p.push("reject")
}else{if(k==="PENDING"){p.push("approve");
p.push("reject")
}else{p.push("recovery")
}}if(k=="SPAM"){p.push("delete")
}else{if(k!="DELETED"){p.push("spam");
p.push("delete")
}}L.each(p,function(u,t){var v=L("<td/>"),s=q.moderateLink(r.id,t,I[t]);
L(s).click(function(){L.getJSON(L(this).attr("href"),function(w){q.reinitToolbar(w.comment)
});
return false
});
v.html(s);
o.append(v)
});
return n
},moderateLink:function(n,k,l){return L('<a href="http://'+B+"/comment/"+n+"/"+k+'?callback=?" style="margin:0 2px 0 2px;">'+l+"</a>")
},reinitToolbar:function(l){var k=this.toolbar(l,l.status);
R.show(I.moderation,k,-1);
Q.updateCommentStatus("#mc-"+l.id,l.status)
}}
})
};
reinit=function(){F("#mc-content").remove();
F(document).unbind(".cackle");
A()
};
if(window.jQuery===undefined||(!(D)&&window.jQuery.fn.jquery!=="1.7")){var G=document.createElement("script");
G.setAttribute("type","text/javascript");
G.setAttribute("src","http://code.jquery.com/jquery-1.7.min.js");
if(typeof G.onload!="undefined"){G.onload=E
}else{G.onreadystatechange=function(){if(this.readyState=="complete"||this.readyState=="loaded"){E()
}}
}(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(G)
}else{F=window.jQuery;
A()
}return{main:A,reinit:reinit}
})();