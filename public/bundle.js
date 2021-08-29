!function(){"use strict";var e={update:null,begin:null,loopBegin:null,changeBegin:null,change:null,changeComplete:null,loopComplete:null,complete:null,loop:1,direction:"normal",autoplay:!0,timelineOffset:0},t={duration:1e3,delay:0,endDelay:0,easing:"easeOutElastic(1, .5)",round:0},n=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],r={CSS:{},springs:{}};function a(e,t,n){return Math.min(Math.max(e,t),n)}function i(e,t){return e.indexOf(t)>-1}function o(e,t){return e.apply(null,t)}var c={arr:function(e){return Array.isArray(e)},obj:function(e){return i(Object.prototype.toString.call(e),"Object")},pth:function(e){return c.obj(e)&&e.hasOwnProperty("totalLength")},svg:function(e){return e instanceof SVGElement},inp:function(e){return e instanceof HTMLInputElement},dom:function(e){return e.nodeType||c.svg(e)},str:function(e){return"string"==typeof e},fnc:function(e){return"function"==typeof e},und:function(e){return void 0===e},nil:function(e){return c.und(e)||null===e},hex:function(e){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e)},rgb:function(e){return/^rgb/.test(e)},hsl:function(e){return/^hsl/.test(e)},col:function(e){return c.hex(e)||c.rgb(e)||c.hsl(e)},key:function(n){return!e.hasOwnProperty(n)&&!t.hasOwnProperty(n)&&"targets"!==n&&"keyframes"!==n}};function u(e){var t=/\(([^)]+)\)/.exec(e);return t?t[1].split(",").map((function(e){return parseFloat(e)})):[]}function s(e,t){var n=u(e),i=a(c.und(n[0])?1:n[0],.1,100),o=a(c.und(n[1])?100:n[1],.1,100),s=a(c.und(n[2])?10:n[2],.1,100),l=a(c.und(n[3])?0:n[3],.1,100),d=Math.sqrt(o/i),h=s/(2*Math.sqrt(o*i)),f=h<1?d*Math.sqrt(1-h*h):0,p=h<1?(h*d-l)/f:-l+d;function g(e){var n=t?t*e/1e3:e;return n=h<1?Math.exp(-n*h*d)*(1*Math.cos(f*n)+p*Math.sin(f*n)):(1+p*n)*Math.exp(-n*d),0===e||1===e?e:1-n}return t?g:function(){var t=r.springs[e];if(t)return t;for(var n=1/6,a=0,i=0;;)if(1===g(a+=n)){if(++i>=16)break}else i=0;var o=a*n*1e3;return r.springs[e]=o,o}}function l(e){return void 0===e&&(e=10),function(t){return Math.ceil(a(t,1e-6,1)*e)*(1/e)}}var d,h,f=function(){var e=.1;function t(e,t){return 1-3*t+3*e}function n(e,t){return 3*t-6*e}function r(e){return 3*e}function a(e,a,i){return((t(a,i)*e+n(a,i))*e+r(a))*e}function i(e,a,i){return 3*t(a,i)*e*e+2*n(a,i)*e+r(a)}return function(t,n,r,o){if(0<=t&&t<=1&&0<=r&&r<=1){var c=new Float32Array(11);if(t!==n||r!==o)for(var u=0;u<11;++u)c[u]=a(u*e,t,r);return function(e){return t===n&&r===o||0===e||1===e?e:a(s(e),n,o)}}function s(n){for(var o=0,u=1;10!==u&&c[u]<=n;++u)o+=e;--u;var s=o+(n-c[u])/(c[u+1]-c[u])*e,l=i(s,t,r);return l>=.001?function(e,t,n,r){for(var o=0;o<4;++o){var c=i(t,n,r);if(0===c)return t;t-=(a(t,n,r)-e)/c}return t}(n,s,t,r):0===l?s:function(e,t,n,r,i){var o,c,u=0;do{(o=a(c=t+(n-t)/2,r,i)-e)>0?n=c:t=c}while(Math.abs(o)>1e-7&&++u<10);return c}(n,o,o+e,t,r)}}}(),p=(d={linear:function(){return function(e){return e}}},h={Sine:function(){return function(e){return 1-Math.cos(e*Math.PI/2)}},Circ:function(){return function(e){return 1-Math.sqrt(1-e*e)}},Back:function(){return function(e){return e*e*(3*e-2)}},Bounce:function(){return function(e){for(var t,n=4;e<((t=Math.pow(2,--n))-1)/11;);return 1/Math.pow(4,3-n)-7.5625*Math.pow((3*t-2)/22-e,2)}},Elastic:function(e,t){void 0===e&&(e=1),void 0===t&&(t=.5);var n=a(e,1,10),r=a(t,.1,2);return function(e){return 0===e||1===e?e:-n*Math.pow(2,10*(e-1))*Math.sin((e-1-r/(2*Math.PI)*Math.asin(1/n))*(2*Math.PI)/r)}}},["Quad","Cubic","Quart","Quint","Expo"].forEach((function(e,t){h[e]=function(){return function(e){return Math.pow(e,t+2)}}})),Object.keys(h).forEach((function(e){var t=h[e];d["easeIn"+e]=t,d["easeOut"+e]=function(e,n){return function(r){return 1-t(e,n)(1-r)}},d["easeInOut"+e]=function(e,n){return function(r){return r<.5?t(e,n)(2*r)/2:1-t(e,n)(-2*r+2)/2}},d["easeOutIn"+e]=function(e,n){return function(r){return r<.5?(1-t(e,n)(1-2*r))/2:(t(e,n)(2*r-1)+1)/2}}})),d);function g(e,t){if(c.fnc(e))return e;var n=e.split("(")[0],r=p[n],a=u(e);switch(n){case"spring":return s(e,t);case"cubicBezier":return o(f,a);case"steps":return o(l,a);default:return o(r,a)}}function m(e){try{return document.querySelectorAll(e)}catch(e){return}}function v(e,t){for(var n=e.length,r=arguments.length>=2?arguments[1]:void 0,a=[],i=0;i<n;i++)if(i in e){var o=e[i];t.call(r,o,i,e)&&a.push(o)}return a}function y(e){return e.reduce((function(e,t){return e.concat(c.arr(t)?y(t):t)}),[])}function b(e){return c.arr(e)?e:(c.str(e)&&(e=m(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function E(e,t){return e.some((function(e){return e===t}))}function x(e){var t={};for(var n in e)t[n]=e[n];return t}function M(e,t){var n=x(e);for(var r in e)n[r]=t.hasOwnProperty(r)?t[r]:e[r];return n}function w(e,t){var n=x(e);for(var r in t)n[r]=c.und(e[r])?t[r]:e[r];return n}function I(e){return c.rgb(e)?(n=/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(t=e))?"rgba("+n[1]+",1)":t:c.hex(e)?function(e){var t=e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,(function(e,t,n,r){return t+t+n+n+r+r})),n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return"rgba("+parseInt(n[1],16)+","+parseInt(n[2],16)+","+parseInt(n[3],16)+",1)"}(e):c.hsl(e)?function(e){var t,n,r,a=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e)||/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e),i=parseInt(a[1],10)/360,o=parseInt(a[2],10)/100,c=parseInt(a[3],10)/100,u=a[4]||1;function s(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}if(0==o)t=n=r=c;else{var l=c<.5?c*(1+o):c+o-c*o,d=2*c-l;t=s(d,l,i+1/3),n=s(d,l,i),r=s(d,l,i-1/3)}return"rgba("+255*t+","+255*n+","+255*r+","+u+")"}(e):void 0;var t,n}function C(e){var t=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);if(t)return t[1]}function k(e,t){return c.fnc(e)?e(t.target,t.id,t.total):e}function B(e,t){return e.getAttribute(t)}function N(e,t,n){if(E([n,"deg","rad","turn"],C(t)))return t;var a=r.CSS[t+n];if(!c.und(a))return a;var i=document.createElement(e.tagName),o=e.parentNode&&e.parentNode!==document?e.parentNode:document.body;o.appendChild(i),i.style.position="absolute",i.style.width=100+n;var u=100/i.offsetWidth;o.removeChild(i);var s=u*parseFloat(t);return r.CSS[t+n]=s,s}function O(e,t,n){if(t in e.style){var r=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),a=e.style[t]||getComputedStyle(e).getPropertyValue(r)||"0";return n?N(e,a,n):a}}function L(e,t){return c.dom(e)&&!c.inp(e)&&(!c.nil(B(e,t))||c.svg(e)&&e[t])?"attribute":c.dom(e)&&E(n,t)?"transform":c.dom(e)&&"transform"!==t&&O(e,t)?"css":null!=e[t]?"object":void 0}function T(e){if(c.dom(e)){for(var t,n=e.style.transform||"",r=/(\w+)\(([^)]*)\)/g,a=new Map;t=r.exec(n);)a.set(t[1],t[2]);return a}}function A(e,t,n,r){var a=i(t,"scale")?1:0+function(e){return i(e,"translate")||"perspective"===e?"px":i(e,"rotate")||i(e,"skew")?"deg":void 0}(t),o=T(e).get(t)||a;return n&&(n.transforms.list.set(t,o),n.transforms.last=t),r?N(e,o,r):o}function D(e,t,n,r){switch(L(e,t)){case"transform":return A(e,t,r,n);case"css":return O(e,t,n);case"attribute":return B(e,t);default:return e[t]||0}}function P(e,t){var n=/^(\*=|\+=|-=)/.exec(e);if(!n)return e;var r=C(e)||0,a=parseFloat(t),i=parseFloat(e.replace(n[0],""));switch(n[0][0]){case"+":return a+i+r;case"-":return a-i+r;case"*":return a*i+r}}function F(e,t){if(c.col(e))return I(e);if(/\s/g.test(e))return e;var n=C(e),r=n?e.substr(0,e.length-n.length):e;return t?r+t:r}function S(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function H(e){for(var t,n=e.points,r=0,a=0;a<n.numberOfItems;a++){var i=n.getItem(a);a>0&&(r+=S(t,i)),t=i}return r}function V(e){if(e.getTotalLength)return e.getTotalLength();switch(e.tagName.toLowerCase()){case"circle":return function(e){return 2*Math.PI*B(e,"r")}(e);case"rect":return function(e){return 2*B(e,"width")+2*B(e,"height")}(e);case"line":return function(e){return S({x:B(e,"x1"),y:B(e,"y1")},{x:B(e,"x2"),y:B(e,"y2")})}(e);case"polyline":return H(e);case"polygon":return function(e){var t=e.points;return H(e)+S(t.getItem(t.numberOfItems-1),t.getItem(0))}(e)}}function R(e,t){var n=t||{},r=n.el||function(e){for(var t=e.parentNode;c.svg(t)&&c.svg(t.parentNode);)t=t.parentNode;return t}(e),a=r.getBoundingClientRect(),i=B(r,"viewBox"),o=a.width,u=a.height,s=n.viewBox||(i?i.split(" "):[0,0,o,u]);return{el:r,viewBox:s,x:s[0]/1,y:s[1]/1,w:o,h:u,vW:s[2],vH:s[3]}}function Y(e,t,n){function r(n){void 0===n&&(n=0);var r=t+n>=1?t+n:0;return e.el.getPointAtLength(r)}var a=R(e.el,e.svg),i=r(),o=r(-1),c=r(1),u=n?1:a.w/a.vW,s=n?1:a.h/a.vH;switch(e.property){case"x":return(i.x-a.x)*u;case"y":return(i.y-a.y)*s;case"angle":return 180*Math.atan2(c.y-o.y,c.x-o.x)/Math.PI}}function j(e,t){var n=/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g,r=F(c.pth(e)?e.totalLength:e,t)+"";return{original:r,numbers:r.match(n)?r.match(n).map(Number):[0],strings:c.str(e)||t?r.split(n):[]}}function U(e){return v(e?y(c.arr(e)?e.map(b):b(e)):[],(function(e,t,n){return n.indexOf(e)===t}))}function $(e){var t=U(e);return t.map((function(e,n){return{target:e,id:n,total:t.length,transforms:{list:T(e)}}}))}function q(e,t){var n=x(t);if(/^spring/.test(n.easing)&&(n.duration=s(n.easing)),c.arr(e)){var r=e.length;2===r&&!c.obj(e[0])?e={value:e}:c.fnc(t.duration)||(n.duration=t.duration/r)}var a=c.arr(e)?e:[e];return a.map((function(e,n){var r=c.obj(e)&&!c.pth(e)?e:{value:e};return c.und(r.delay)&&(r.delay=n?0:t.delay),c.und(r.endDelay)&&(r.endDelay=n===a.length-1?t.endDelay:0),r})).map((function(e){return w(e,n)}))}function X(e,t){var n=[],r=t.keyframes;for(var a in r&&(t=w(function(e){for(var t=v(y(e.map((function(e){return Object.keys(e)}))),(function(e){return c.key(e)})).reduce((function(e,t){return e.indexOf(t)<0&&e.push(t),e}),[]),n={},r=function(r){var a=t[r];n[a]=e.map((function(e){var t={};for(var n in e)c.key(n)?n==a&&(t.value=e[n]):t[n]=e[n];return t}))},a=0;a<t.length;a++)r(a);return n}(r),t)),t)c.key(a)&&n.push({name:a,tweens:q(t[a],e)});return n}function W(e,t){var n;return e.tweens.map((function(r){var a=function(e,t){var n={};for(var r in e){var a=k(e[r],t);c.arr(a)&&1===(a=a.map((function(e){return k(e,t)}))).length&&(a=a[0]),n[r]=a}return n.duration=parseFloat(n.duration),n.delay=parseFloat(n.delay),n}(r,t),i=a.value,o=c.arr(i)?i[1]:i,u=C(o),s=D(t.target,e.name,u,t),l=n?n.to.original:s,d=c.arr(i)?i[0]:l,h=C(d)||C(s),f=u||h;return c.und(o)&&(o=l),a.from=j(d,f),a.to=j(P(o,d),f),a.start=n?n.end:0,a.end=a.start+a.delay+a.duration+a.endDelay,a.easing=g(a.easing,a.duration),a.isPath=c.pth(i),a.isPathTargetInsideSVG=a.isPath&&c.svg(t.target),a.isColor=c.col(a.from.original),a.isColor&&(a.round=1),n=a,a}))}var Z={css:function(e,t,n){return e.style[t]=n},attribute:function(e,t,n){return e.setAttribute(t,n)},object:function(e,t,n){return e[t]=n},transform:function(e,t,n,r,a){if(r.list.set(t,n),t===r.last||a){var i="";r.list.forEach((function(e,t){i+=t+"("+e+") "})),e.style.transform=i}}};function G(e,t){$(e).forEach((function(e){for(var n in t){var r=k(t[n],e),a=e.target,i=C(r),o=D(a,n,i,e),c=P(F(r,i||C(o)),o),u=L(a,n);Z[u](a,n,c,e.transforms,!0)}}))}function Q(e,t){return v(y(e.map((function(e){return t.map((function(t){return function(e,t){var n=L(e.target,t.name);if(n){var r=W(t,e),a=r[r.length-1];return{type:n,property:t.name,animatable:e,tweens:r,duration:a.end,delay:r[0].delay,endDelay:a.endDelay}}}(e,t)}))}))),(function(e){return!c.und(e)}))}function z(e,t){var n=e.length,r=function(e){return e.timelineOffset?e.timelineOffset:0},a={};return a.duration=n?Math.max.apply(Math,e.map((function(e){return r(e)+e.duration}))):t.duration,a.delay=n?Math.min.apply(Math,e.map((function(e){return r(e)+e.delay}))):t.delay,a.endDelay=n?a.duration-Math.max.apply(Math,e.map((function(e){return r(e)+e.duration-e.endDelay}))):t.endDelay,a}var _=0;var J=[],K=function(){var e;function t(n){for(var r=J.length,a=0;a<r;){var i=J[a];i.paused?(J.splice(a,1),r--):(i.tick(n),a++)}e=a>0?requestAnimationFrame(t):void 0}return"undefined"!=typeof document&&document.addEventListener("visibilitychange",(function(){te.suspendWhenDocumentHidden&&(ee()?e=cancelAnimationFrame(e):(J.forEach((function(e){return e._onDocumentVisibility()})),K()))})),function(){e||ee()&&te.suspendWhenDocumentHidden||!(J.length>0)||(e=requestAnimationFrame(t))}}();function ee(){return!!document&&document.hidden}function te(n){void 0===n&&(n={});var r,i=0,o=0,c=0,u=0,s=null;function l(e){var t=window.Promise&&new Promise((function(e){return s=e}));return e.finished=t,t}var d=function(n){var r=M(e,n),a=M(t,n),i=X(a,n),o=$(n.targets),c=Q(o,i),u=z(c,a),s=_;return _++,w(r,{id:s,children:[],animatables:o,animations:c,duration:u.duration,delay:u.delay,endDelay:u.endDelay})}(n);function h(){var e=d.direction;"alternate"!==e&&(d.direction="normal"!==e?"normal":"reverse"),d.reversed=!d.reversed,r.forEach((function(e){return e.reversed=d.reversed}))}function f(e){return d.reversed?d.duration-e:e}function p(){i=0,o=f(d.currentTime)*(1/te.speed)}function g(e,t){t&&t.seek(e-t.timelineOffset)}function m(e){for(var t=0,n=d.animations,r=n.length;t<r;){var i=n[t],o=i.animatable,c=i.tweens,u=c.length-1,s=c[u];u&&(s=v(c,(function(t){return e<t.end}))[0]||s);for(var l=a(e-s.start-s.delay,0,s.duration)/s.duration,h=isNaN(l)?1:s.easing(l),f=s.to.strings,p=s.round,g=[],m=s.to.numbers.length,y=void 0,b=0;b<m;b++){var E=void 0,x=s.to.numbers[b],M=s.from.numbers[b]||0;E=s.isPath?Y(s.value,h*x,s.isPathTargetInsideSVG):M+h*(x-M),p&&(s.isColor&&b>2||(E=Math.round(E*p)/p)),g.push(E)}var w=f.length;if(w){y=f[0];for(var I=0;I<w;I++){f[I];var C=f[I+1],k=g[I];isNaN(k)||(y+=C?k+C:k+" ")}}else y=g[0];Z[i.type](o.target,i.property,y,o.transforms),i.currentValue=y,t++}}function y(e){d[e]&&!d.passThrough&&d[e](d)}function b(e){var t=d.duration,n=d.delay,p=t-d.endDelay,v=f(e);d.progress=a(v/t*100,0,100),d.reversePlayback=v<d.currentTime,r&&function(e){if(d.reversePlayback)for(var t=u;t--;)g(e,r[t]);else for(var n=0;n<u;n++)g(e,r[n])}(v),!d.began&&d.currentTime>0&&(d.began=!0,y("begin")),!d.loopBegan&&d.currentTime>0&&(d.loopBegan=!0,y("loopBegin")),v<=n&&0!==d.currentTime&&m(0),(v>=p&&d.currentTime!==t||!t)&&m(t),v>n&&v<p?(d.changeBegan||(d.changeBegan=!0,d.changeCompleted=!1,y("changeBegin")),y("change"),m(v)):d.changeBegan&&(d.changeCompleted=!0,d.changeBegan=!1,y("changeComplete")),d.currentTime=a(v,0,t),d.began&&y("update"),e>=t&&(o=0,d.remaining&&!0!==d.remaining&&d.remaining--,d.remaining?(i=c,y("loopComplete"),d.loopBegan=!1,"alternate"===d.direction&&h()):(d.paused=!0,d.completed||(d.completed=!0,y("loopComplete"),y("complete"),!d.passThrough&&"Promise"in window&&(s(),l(d)))))}return l(d),d.reset=function(){var e=d.direction;d.passThrough=!1,d.currentTime=0,d.progress=0,d.paused=!0,d.began=!1,d.loopBegan=!1,d.changeBegan=!1,d.completed=!1,d.changeCompleted=!1,d.reversePlayback=!1,d.reversed="reverse"===e,d.remaining=d.loop,r=d.children;for(var t=u=r.length;t--;)d.children[t].reset();(d.reversed&&!0!==d.loop||"alternate"===e&&1===d.loop)&&d.remaining++,m(d.reversed?d.duration:0)},d._onDocumentVisibility=p,d.set=function(e,t){return G(e,t),d},d.tick=function(e){c=e,i||(i=c),b((c+(o-i))*te.speed)},d.seek=function(e){b(f(e))},d.pause=function(){d.paused=!0,p()},d.play=function(){d.paused&&(d.completed&&d.reset(),d.paused=!1,J.push(d),p(),K())},d.reverse=function(){h(),d.completed=!d.reversed,p()},d.restart=function(){d.reset(),d.play()},d.remove=function(e){re(U(e),d)},d.reset(),d.autoplay&&d.play(),d}function ne(e,t){for(var n=t.length;n--;)E(e,t[n].animatable.target)&&t.splice(n,1)}function re(e,t){var n=t.animations,r=t.children;ne(e,n);for(var a=r.length;a--;){var i=r[a],o=i.animations;ne(e,o),o.length||i.children.length||r.splice(a,1)}n.length||r.length||t.pause()}te.version="3.2.1",te.speed=1,te.suspendWhenDocumentHidden=!0,te.running=J,te.remove=function(e){for(var t=U(e),n=J.length;n--;){re(t,J[n])}},te.get=D,te.set=G,te.convertPx=N,te.path=function(e,t){var n=c.str(e)?m(e)[0]:e,r=t||100;return function(e){return{property:e,el:n,svg:R(n),totalLength:V(n)*(r/100)}}},te.setDashoffset=function(e){var t=V(e);return e.setAttribute("stroke-dasharray",t),t},te.stagger=function(e,t){void 0===t&&(t={});var n=t.direction||"normal",r=t.easing?g(t.easing):null,a=t.grid,i=t.axis,o=t.from||0,u="first"===o,s="center"===o,l="last"===o,d=c.arr(e),h=d?parseFloat(e[0]):parseFloat(e),f=d?parseFloat(e[1]):0,p=C(d?e[1]:e)||0,m=t.start||0+(d?h:0),v=[],y=0;return function(e,t,c){if(u&&(o=0),s&&(o=(c-1)/2),l&&(o=c-1),!v.length){for(var g=0;g<c;g++){if(a){var b=s?(a[0]-1)/2:o%a[0],E=s?(a[1]-1)/2:Math.floor(o/a[0]),x=b-g%a[0],M=E-Math.floor(g/a[0]),w=Math.sqrt(x*x+M*M);"x"===i&&(w=-x),"y"===i&&(w=-M),v.push(w)}else v.push(Math.abs(o-g));y=Math.max.apply(Math,v)}r&&(v=v.map((function(e){return r(e/y)*y}))),"reverse"===n&&(v=v.map((function(e){return i?e<0?-1*e:-e:Math.abs(y-e)})))}return m+(d?(f-h)/y:h)*(Math.round(100*v[t])/100)+p}},te.timeline=function(e){void 0===e&&(e={});var n=te(e);return n.duration=0,n.add=function(r,a){var i=J.indexOf(n),o=n.children;function u(e){e.passThrough=!0}i>-1&&J.splice(i,1);for(var s=0;s<o.length;s++)u(o[s]);var l=w(r,M(t,e));l.targets=l.targets||e.targets;var d=n.duration;l.autoplay=!1,l.direction=n.direction,l.timelineOffset=c.und(a)?d:P(a,d),u(n),n.seek(l.timelineOffset);var h=te(l);u(h),o.push(h);var f=z(o,e);return n.delay=f.delay,n.endDelay=f.endDelay,n.duration=f.duration,n.seek(0),n.reset(),n.autoplay&&n.play(),n},n},te.easing=g,te.penner=p,te.random=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};const ae={cardNo:"",cardName:"",expiryMonth:"",expiryYear:"",cvv:""};var ie={getFormData:()=>ae,setFormData(e,t){ae[e]=t}};class oe{constructor(e,t,n,r=""){this.flipContainer=document.getElementById(e),this.placeholderEl=t,this.placeholderEl&&(this.placeholderEl.id=`${n}-placeholder-flip-el`),this.curEl=document.createElement("div"),this.curEl.className="cur-flip-el",this.flipContainer.appendChild(this.curEl),this.value=r}changeValue=(e,t,n={})=>{this.value=e,e?(this.placeholderEl&&this.placeholderEl.classList.add("opacity-0"),t?(this.curEl.innerHTML="",this.curEl.appendChild(t)):this.curEl.innerHTML=e,te({easing:"easeOutExpo",targets:this.curEl,keyframes:[{opacity:0,translateY:15,translateX:"-50%",...n,duration:0},{opacity:1,translateY:0,translateX:"-50%",...n,duration:300}]})):(this.placeholderEl&&this.placeholderEl.classList.remove("opacity-0"),te({targets:this.curEl,opacity:0,duration:0}))}}const{setFormData:ce}=ie;class ue{constructor(){this.container=document.createElement("div"),this.container.className="cc-card-number-digit-container",this.noNumberNode=document.createElement("div"),this.noNumberNode.innerHTML="#",this.noNumberNode.className="cc-card-number-no-digit active",this.numberNode=document.createElement("div"),this.numberNode.className="cc-card-number-digit",this.container.appendChild(this.noNumberNode),this.container.appendChild(this.numberNode);const e=document.getElementById("cc-card-number-text");e&&e.appendChild(this.container),this.value=""}changeValue=(e="")=>{this.value=e||"#",e?(this.numberNode.innerHTML=e,this.noNumberNode.classList.remove("active"),this.numberNode.classList.add("active")):(this.numberNode.classList.remove("active"),this.noNumberNode.classList.add("active"))}}class se{constructor(){this.types={AMEX:{imageURL:"amex"},VISA:{imageURL:"visa"},MASTERCARD:{imageURL:"mastercard"},MAESTRO:{imageURL:"mastercard"},RUPAY:{imageURL:"rupay"}},this.type="",this.flipEl=new oe("cc-type-img-container",void 0,"cc-type","")}changeImg=e=>{if(!e||!this.types[e])return this.flipEl.changeValue(""),void(document.getElementById("cc-type-img-back").src="");const t=`./images/${this.types[e].imageURL}.png`,n=document.createElement("img");n.src=t,n.className="cc-type-img",n.alt="cc-type-img",this.flipEl.changeValue(t,n,{translateX:"-100%"}),document.getElementById("cc-type-img-back").src=t};changeType=e=>{e!==this.type&&(this.type=e,ce("type",e),this.changeImg(e))}}const le=()=>{const e=new se,t=[];for(let e=0;e<16;e++){const e=new ue;t.push(e)}const n=document.getElementById("cc-card-number");n.onkeypress=t=>{const n=t.charCode>=48&&t.charCode<=57,r=t.target.value.toString().replace(" ","").length;if(n&&(0<=r&&r<16)){ce(ce("cardNo",t.target.value));const n=(e=>{for(var t="",n=[{regEx:/^4[0-9]{5}/gi,cardType:"VISA"},{regEx:/^5[1-5][0-9]{4}/gi,cardType:"MASTERCARD"},{regEx:/^3[47][0-9]{3}/gi,cardType:"AMEX"},{regEx:/^(5[06-8]\d{4}|6\d{5})/gi,cardType:"MAESTRO"}],r=0;r<n.length;r++)if(e.match(n[r].regEx)){t=n[r].cardType;break}if(0===e.indexOf("50")||0===e.indexOf("60")||0===e.indexOf("65"))for(var a="508500-508999|606985-607984|608001-608500|652150-653149".split("|"),i=0;i<a.length;i++){var o=parseInt(a[i].split("-")[0],10),c=parseInt(a[i].split("-")[1],10);if(e.substr(0,6)>=o&&e.substr(0,6)<=c&&e.length>=6){t="RUPAY";break}}return t})(t.target.value);return e.changeType(n),!0}return!1},n.onkeyup=e=>{const n=e.target.value.toString().replace(" ","").split("");for(let e=0;e<16;e++)t[e].changeValue(n[e])}},{setFormData:de}=ie,{setFormData:he}=ie;class fe{constructor(e=""){this.value=e;const t=document.getElementById("card-holder-name");t&&(this.container=document.createElement("div"),t.appendChild(this.container),this.container.classList.add("cc-fancy-alphabet"),this.container.innerHTML=this.value,this.value&&triggerActiveAnimation())}triggerActiveAnimation=()=>{te({targets:this.container,easing:"easeOutExpo",keyframes:[{display:"block",rotate:"30deg",opacity:0,duration:0},{rotate:0,opacity:1,duration:300}]})};triggerInactiveAnimations=()=>{te({targets:this.container,easing:"easeOutExpo",opacity:[1,0],duration:300})};changeValue=e=>{e!==this.value&&(this.value=e,this.container.innerHTML=this.value||"",this.value&&this.triggerActiveAnimation())}}const{setFormData:pe}=ie;class ge{constructor(){this.addMonths(),this.addYears(),this.setUpMonthField(),this.setUpYearField()}getOption=(e,t,n)=>{const r=document.createElement("option");return r.value=t,r.innerHTML=e,r.className=n,r};getPlaceholderOption=e=>{const t=this.getOption(e,"","form-select-placeholder");return t.disabled=!0,t.selected=!0,t};addMonths=()=>{const e=document.getElementById("cc-card-expiry-month");if(e.value="",e){const t=["01","02","03","04","05","06","07","08","09","10","11","12"],n=this.getPlaceholderOption("Month");e.appendChild(n),t.forEach((t=>{const n=this.getOption(t,t);e.appendChild(n)}))}};addYears=()=>{const e=document.getElementById("cc-card-expiry-year");if(e.value="",e){const t=[],n=2035;for(let e=(new Date).getFullYear();e<=n;e++)t.push(e);const r=this.getPlaceholderOption("Year");e.appendChild(r),t.forEach((t=>{const n=this.getOption(t,t);e.appendChild(n)}))}};setUpMonthField=()=>{const e=document.getElementById("card-expiry-month-placeholder"),t=new oe("card-expiry-month",e,"card-expiry-month","");document.getElementById("cc-card-expiry-month").oninput=e=>{const n=e.target.value;pe(n),t.changeValue(n)}};setUpYearField=()=>{const e=document.getElementById("card-expiry-year-placeholder"),t=new oe("card-expiry-year",e,"card-expiry-year","");document.getElementById("cc-card-expiry-year").oninput=e=>{const n=e.target.value;pe(n),t.changeValue(n.slice(2,4))}}}class me{constructor(){this.curElID="",this.followables={"cc-card-number":"cc-card-number-text","cc-card-holders-name":"cc-holder-name-text","cc-card-expiry-month":"cc-expiry-date-text","cc-card-expiry-year":"cc-expiry-date-text"},this.node=document.createElement("div"),this.node.id="cc-follow-highlight",this.visible=!1,document.body.appendChild(this.node),this.setupEvents()}setupEvents=()=>{Object.keys(this.followables).forEach((e=>{const t=document.getElementById(e);t.onfocus=()=>this.moveHighlight(e),t.onblur=this.hideHightlight}))};moveHighlight=e=>{this.curElID=e,document.getElementById(e),this.visible&&te.remove(this.node);const{width:t,height:n,top:r,left:a}=document.getElementById(this.followables[e]).getBoundingClientRect(),i=7.5;this.visible?te({targets:this.node,easing:"easeOutExpo",top:[this.node.style.top,r-i],left:[this.node.style.left,a-i],width:[this.node.style.width,t+15],height:[this.node.style.height,n+15],duration:500}):te({targets:this.node,easing:"easeOutExpo",keyframes:[{top:r-i,left:a-i,width:t+15,height:n+15,opacity:0,duration:0},{opacity:1,duration:500}]}),this.visible=!0};hideHightlight=()=>{this.curElID="";const e=this;te({targets:this.node,opacity:0,duration:300,complete:()=>{e.visible=!1}})}}(()=>{const e=`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../images/${te.random(1,25)}.jpeg")`;document.querySelector(".cc-front").style=`background-image: ${e}`,document.querySelector(".cc-back").style=`background-image: ${e}`})(),le(),(()=>{const e=document.getElementById("cc-card-holders-name"),t=[];for(let e=0;e<26;e++)t.push(new fe(""));e.onkeypress=e=>{const t=e.charCode>64&&e.charCode<91||e.charCode>96&&e.charCode<123||32==e.charCode,n=e.target.value.length;return!(!t||!(0<=n&&n<26)||(he(he("cardName",e.target.value)),0))},e.onkeyup=e=>{const n=document.getElementById("card-holder-name-placeholder"),r=e.target.value;r?n.classList.add("display-none"):n.classList.remove("display-none"),t.forEach(((e,t)=>{e.changeValue(" "===r[t]?"&nbsp;":r[t])}))}})(),new ge,(()=>{const e=document.getElementById("cc-card-cvv");let t=document.getElementById("cc-card-container");e.addEventListener("focus",(()=>{t=document.getElementById("cc-card-container"),t&&t.classList.add("flip-back")})),e.addEventListener("blur",(()=>{t=document.getElementById("cc-card-container"),t&&t.classList.remove("flip-back")})),e.onkeypress=e=>{const t=/[0-9]/.test(e.key),n=e.target.value.toString().length;return!(!t||!(0<=n&&n<3)||(de(de("cvv",e.target.value)),0))},e.onkeyup=e=>{const t=document.getElementById("cc-cvv-text");t&&(t.innerHTML=e.target.value)}})(),new me}();
//# sourceMappingURL=bundle.js.map
