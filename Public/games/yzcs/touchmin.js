(function(e){e.touch=function(){var t={start:true,imgs:[],width:0,height:0,offset:{left:0,top:0},startPos:{x:0,y:0},releasePos:{x:0,y:0},touches:[],path:[],tracing:false,startTime:0,stopTime:0,traceable:false},n=function(e){e.preventDefault();if(!t.start)return false;var n=t.offset.left<<0,r=t.offset.top<<0,i=t.touches;if(e.touches){for(var s=e.touches,o=s.length,u=0;u<o;u++)i[u]={e:s[u],s:-1};t.startPos={x:s[0].clientX-n<<0,y:s[0].clientY-r<<0}}else{i[0]={e:e,s:-1};t.startPos={x:e.clientX-n<<0,y:e.clientY-r<<0}}s=t.imgs;var f=s.length;o=i.length;for(var l,c=0;c<o;c++)for(u=f-1;u>=0;u--)if(s[u]&&i[c]){l=s[u];var h=(i[c].e.clientX-n<<0)-l.x<<0,p=(i[c].e.clientY-r<<0)-l.y<<0;if(Math.abs(h)<l.w/2&&Math.abs(p)<l.h/2){l.dx=h;l.dy=p;l=true}else l=false;if(l){i[c].s=u;s[u].selected=true;break}}if(t.traceable&&o==1){t.path=[];t.tracing=true;t.startTime=(new Date).getTime();t.path[0]={x:i[0].e.clientX-n<<0,y:i[0].e.clientY-r<<0}}if(t.touchStart)e.touches?t.touchStart(e.touches):t.touchStart([e]);return false},r=function(e){e.preventDefault();if(!t.start)return false;var n=t.offset.left<<0,r=t.offset.top<<0,i=t.touches,s=i.length,o=t.imgs,u=t.width<<0,f=t.height<<0,l,c,h,p,d,v,m=0;v=null;for(var g=0;g<s;g++)if(i[g]){if(e.touches){v=e.touches.length;for(l=0;l<v;l++)if(i[g].e.identifier==e.touches[l].identifier){i[g].e=e.touches[l];break}else i[g].e=e.touches[g]}else i[0].e=e;v=i[g].e;m=i[g].s;if(m>-1&&o[m]&&o[m].dragable){l=o[m].x;c=o[m].y;h=o[m].w/2;p=o[m].h/2;d=v.clientX-n-o[m].dx;d=d>u-h?u-h:d;d=d<h?h:d;o[m].x=d<<0;d=v.clientY-r-o[m].dy;d=d>f-p?f-p:d;d=d<p?p:d;o[m].y=d<<0;if(Math.abs(o[m].x-l)>3||Math.abs(o[m].y-c)>3)i[g].moveFlag=true}if(t.traceable&&t.tracing&&s==1){t.stopTime=(new Date).getTime();d=t.stopTime-t.startTime<<0;if(d<1e3){l=v.clientX-n<<0;c=v.clientY-r<<0;v=t.path.length;Math.abs(l-t.path[v-1].x)<3&&Math.abs(c-t.path[v-1].y)<3||(t.path[v]={x:l,y:c})}}}if(t.touchMove)e.touches?t.touchMove(e.touches):t.touchMove([e]);return false},i=function(e){e.preventDefault();if(!t.start)return false;var n=t.offset.left<<0,r=t.offset.top<<0,i=t.imgs,s=t.touches,o=s.length;if(e.touches)for(var u=e.touches,f=u.length,l=false,c=0;c<o;c++){l=false;for(var h=0;h<f;h++)if(s[c].e.identifier==u[h].identifier){l=true;break}if(!l){t.releasePos={x:s[c].e.clientX-n<<0,y:s[c].e.clientY-r<<0};if(s[c].s>-1){i[s[c].s].selected=false;if(s[c].moveFlag)t.draged&&i[s[c].s].dragable&&t.draged(i[s[c].s]);else t.click&&i[s[c].s].clickable&&t.click(i[s[c].s])}s.splice(c,1);c--;o--}}else{if(s[0].s>-1)if(i[s[0].s]){i[s[0].s].selected=false;if(s[0].moveFlag)t.draged&&i[s[0].s].dragable&&t.draged(i[s[0].s]);else t.click&&i[s[0].s].clickable&&t.click(i[s[0].s]);s[0].s=-1}s[0].moveFlag=false;t.releasePos={x:e.clientX-n<<0,y:e.clientY-r<<0}}if(t.traceable)t.tracing=false;if(t.touchEnd)e.touches?t.touchEnd(e.touches):t.touchEnd([e]);return false};return{imgs:t.imgs,init:function(n){t.width=e.canvas.screen.getWidth();t.height=e.canvas.screen.getHeight();t.offset.left=e.getDom("jsGameScreen").offsetLeft;t.offset.top=e.getDom("jsGameScreen").offsetTop;t.traceable=n;this.bind()},create:function(e,n,r){var i=t.imgs,s=i.length;i[s]=e;i[s].dx=0;i[s].dy=0;i[s].clickable=n;i[s].dragable=r},click:function(e){t.click=e},draged:function(e){t.draged=e},touchStart:function(e){t.touchStart=e},touchMove:function(e){t.touchMove=e},touchEnd:function(e){t.touchEnd=e},resize:function(e){t.resize=e},bind:function(){var o=e.getDom("jsGameScreen");e.canvas.screen.getTouch()?e.events.touchStart(function(e){n(e)}).touchMove(function(e){r(e)}).touchEnd(function(e){i(e)}):e.events.mouseDown(function(e){n(e)}).mouseMove(function(e){r(e)}).mouseUp(function(e){i(e)});document.getElementsByTagName("body")[0].onresize=function(){t.resize&&t.resize();t.offset.left=e.getDom("jsGameScreen").offsetLeft;t.offset.top=e.getDom("jsGameScreen").offsetTop};o.onmouseout=function(){for(var e=t.imgs,n=t.touches,r=n.length,i=0;i<r;i++)if(n[i].s>-1){e[n[i].s].selected=false;n[i].s=-1}}},unbind:function(){var t=e.getDom("jsGameScreen");t.onmousedown=null;t.onmousemove=null;t.onmouseup=null;t.ontouchstart=null;t.ontouchmove=null;t.ontouchend=null},getImgs:function(){return t.imgs},deleteImg:function(e){for(var n=t.imgs,r=n.length,i=t.touches,s=i.length,o=0;o<r;o++)if(n[o]&&n[o].id==e){for(e=0;e<s;e++)if(i[e].s>o)i[e].s--;else if(i[e].s==o)i[e].s=-1;n.splice(o,1);return true}return false},getStartPos:function(){return t.startPos},getReleasePos:function(){return t.releasePos},getPath:function(){return t.path},getGesture:function(){var e;e=t.path;var n=e.length;if(n){var r,i=0;r="null";for(var s="swipeleft",o="swiperight",u="scrollup",f="scrolldown",l=1;l<n;l++){r=e[l].x-e[l-1].x<<0;i=e[l].y-e[l-1].y<<0;if(r>0){s="";if(Math.abs(i)>20)o=""}if(r<0){o="";if(Math.abs(i)>20)s=""}if(i>0){u="";if(Math.abs(r)>20)f=""}if(i<0){f="";if(Math.abs(r)>20)u=""}}if(Math.abs(e[0].x-e[n-1].x)>100)u=f="";if(Math.abs(e[0].y-e[n-1].y)>100)s=o="";if(Math.abs(e[0].x-e[n-1].x)<20)s=o="";if(Math.abs(e[0].y-e[n-1].y)<20)u=f="";e=s||o||u||f||"null"}else e="null";return e},start:function(){t.start=true},stop:function(){t.start=false}}}()})(jsGame)