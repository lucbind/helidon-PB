/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["exports","ojs/ojcustomelement-utils","ojs/ojcore-base","ojs/ojdefaultsutils","ojs/ojlogger"],function(e,t,n,o,r){"use strict";n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n;const l=Object.freeze({}),i=new Set(["key","ref","children"]);function s(e){return e?"string"==typeof e?Object.freeze(e.split(" ").reduce((e,t)=>(t&&(e[t]=!0),e),{})):e:l}function u(e,t){return(null==e.key&&null==t.key||e.key===t.key)&&e._isWrapped===t._isWrapped&&(e._node&&e===t||!e._node)}const c="http://www.w3.org/1999/xlink",f={show:c,actuate:c},d=Symbol();function a(e){return"TEMPLATE"===e.nodeName}function p(e,t,n,o){for(let o in t){const r=n[o],l=t[o];r!==l&&(e[o]=l)}for(let r in n)r in t||(e[r]=o)}function m(e,t,n,o){o?function(e,t,n){const o=s(n),r=s(t);for(let t in o)o[t]&&!r[t]&&e.classList.remove(t);for(let t in r)r[t]&&!o[t]&&e.classList.add(t)}(e,t,n):function(e,t){if(t){const n="object"==typeof t?Object.keys(t).filter(e=>t[e]).join(" "):t;e.setAttribute("class",n)}else e.removeAttribute("class")}(e,t)}function y(e,n,o,r){return!(!o&&!r||!t.AttributeUtils.isEventListenerProperty(n))&&(function(e,t,n,o){o&&e.removeEventListener(t,o,o[d]);n&&e.addEventListener(t,n,n[d])}(e,t.AttributeUtils.eventListenerPropertyToEventType(n),o,r),!0)}function _(e,n,o,r){if(function(e,n,o){if(o)return t.AttributeUtils.isGlobalOrData(n);return"value"!==n&&"checked"!==n&&("render"!==n||!a(e))}(e,n,r)){const r=t.AttributeUtils.getNativeAttr(n);if("draggable"===n)null==o?e.removeAttribute("draggable"):e.setAttribute("draggable",o.toString());else if(!0===o)e.setAttribute(r,"");else if(!1===o)e.removeAttribute(r);else if(null!=o){const t=f[r];void 0!==t?e.setAttributeNS(t,r,o):e.setAttribute(r,o)}else e.removeAttribute(r);return!0}return!1}function v(e,t){let n=1,o=e.length-1;for(;n<=o;){let r=Math.ceil((n+o)/2);t<e[r]?o=r-1:n=r+1}return n}const h="http://www.w3.org/2000/svg";function g(e,t=!1){if(null==e||"boolean"===typeof e)return[];if(Array.isArray(e))return[].concat(...e.map(e=>g(e,t)));if(!(n=e)||null==n.type&&null==n._text&&!n._node)return[{_text:e}];var n;const o=e;return t&&!o.isSVG&&(o.isSVG=!0),[o]}function b(e,n=!1){let o;if(e.content=g(e.content,e.isSVG),e._isWrapped)return e._node;if(null!=e._node)throw new Error("Trying to mount already mounted vnode");if(null!=e._text)o=document.createTextNode(e._text);else{const r=e.type,l=e.props,i=e.content,s=e.isSVG;if("string"==typeof r)o=s?document.createElementNS(h,r):document.createElement(r),G(o,l,null,n||e.isCustomElement),a(o)?C(o,i):w(o,i);else if("function"==typeof r)if(e.isComponent){let n;const s=r,u=x(s,l,e.isCustomElement);e._uncontrolled=u.uncontrolled,n=new s(u.controlled),n._uniqueId=t.ElementUtils.getUniqueId(l.id),o=n.mount(u.controlled,i,u.uncontrolled),e._data=n}else{const t=r(l,i);o=b(t),e._data=t}}if(null==o)throw new Error("Unknown node type!");return e._node=o,e.isCustomElement&&Object.defineProperty(o,"_ojBndgPrv",{value:"none"}),o}function E(e){let t;if(e.content=g(e.content,e.isSVG),null!=e._text)t=document.createTextNode(e._text);else{const n=e.type,o=e.props,r=e.isSVG;"string"==typeof n&&(t=r?document.createElementNS(h,n):document.createElement(n),M(t,o,null,e.isCustomElement),C(t,e.content))}if(null==t)throw new Error("content inside <template> elements is limited to HTML elements and text");return e._node=t,t}function k(e){if(!e._isWrapped)if(e.isComponent){const t=e._data;B(e.ref,t),B(t._vnode.props.ref,e._node),e.isCustomElement||t.notifyMounted()}else"function"!=typeof e.type&&B(e.ref,e._node)}function w(e,t,o=0,r=t.length-1,l=null){for(;o<=r;){const r=o++,i=t[r];if(i._isWrapped){t[r]=N(e,i,l);const o=i._node;1===o.nodeType&&n.Components&&n.Components.subtreeShown(o)}else t[r]=N(e,i,l)}}function C(e,t,n=0,o=t.length-1,r=null){for(;n<=o;){W(e,t[n++],r)}}function A(e,t,n=0,o=t.length-1){let r=void 0;for(e.childNodes.length===o-n+1&&(e.textContent="",r=!0);n<=o;){let o=t[n++];r||L(e,o)}}function S(e){if(Array.isArray(e))for(let t=0;t<e.length;t++)S(e[t]);else{if(e.isComponent){e._data.notifyUnmounted()}else null!=e.content&&S(e.content);(e.isComponent||"function"!=typeof e.type)&&B(e.ref,null)}}function j(e,t,n,o){if(n!==o)return!0;for(let n in e)if(e[n]!==t[n])return!0;return!1}function O(e,t){var n,o;const r=e.metadata;return null!=(null===(o=null===(n=null==r?void 0:r.extension)||void 0===n?void 0:n._ROOT_PROPS_MAP)||void 0===o?void 0:o[t])}function x(e,n,r){const l=o.DefaultsUtils.getStaticDefaults(e,e.metadata,!0),i={controlled:Object.create(l),uncontrolled:{}};for(let o in n){const l=n[o];void 0!==l&&R(e,o)&&(r&&t.AttributeUtils.isGlobalOrData(o)&&!O(e,o)?i.uncontrolled[o]=l:i.controlled[o]=l)}return i}function G(e,t,n,o){t&&function(e,t,n,o){Object.keys(t).forEach(function(r){if(i.has(r))return;const s=t[r],u=n[r];s!==u&&("style"===r?p(e.style,s||l,u||l,""):"class"===r?m(e,s,u,o):y(e,r,s,u)||_(e,r,s,o)||(e[r]=s))})}(e,t,n||l,o),n&&function(e,t,n,o){Object.keys(n).forEach(function(r){if("key"===r||"ref"===r)return;const i=n[r];r in t||("style"===r?p(e.style,l,i||l,""):"class"===r?m(e,null,i,o):y(e,r,null,i)||_(e,r,null,o)||(e[r]=void 0))})}(e,t||l,n,o)}function M(e,t,n,o){if(t){Object.keys(t).forEach(function(n){if(i.has(n))return;const o=t[n];e.setAttribute(n,o)})}}function T(e,t,n,o=!1){let r=t._node;const l=e.content=g(e.content,e.isSVG),i=t.content;if(t===e||e._node)return e;if(a(r))return t.props.render!==e.props.render&&(r.render=e.props.render),e._node=r,e;let s,u;if(null!=(s=t._text)&&null!=(u=e._text))s!==u&&(r.nodeValue=u);else if(t.type===e.type&&t.isSVG===e.isSVG){const r=t.type;if("function"!=typeof r){if("string"==typeof r)return t.isCustomElement&&function(e,t){if(e===t)return!1;if(e.length!==t.length)return!0;return e.some(function(e,n){var o,r;const l=t[n];return e.type!==l.type||(null===(o=e.props)||void 0===o?void 0:o.slot)!==(null===(r=l.props)||void 0===r?void 0:r.slot)})}(l,i)?P(n,e,t):function(e,t,n,o){let r=t;const l=n._node;r._node&&l!==r._node&&(r=P(e,F(t),n));return G(l,r.props,n.props,o||n.isCustomElement),V(l,t.content,n.content),B(r.ref,l,n.ref),r._node=l,r}(n,e,t,o);throw new Error(`Error while patching. Unknown node type '${r}'.`)}if(t.isComponent){const n=t._data,o=x(r,e.props,e.isCustomElement);e._uncontrolled=o.uncontrolled,n.patch(o.controlled,l,o.uncontrolled,t._uncontrolled),e._data=n,B(e.ref,n,t.ref)}else{if((r.shouldUpdate||j)(e.props,t.props,l,i)){const o=r(e.props,l);(e=T(o,t._data,n))._data=o}else e._data=t._data}}else if(n)return P(n,e,t);return e._node=r,e}function V(e,t,n,o=0,r=t.length-1,l=0,i=n.length-1){if(t===n)return;let s,c=function(e,t,n,o,r,l,i,s){let u,c,f=0;for(;n<=o&&r<=l&&i(u=e[n],c=t[r]);)s&&(e[n]=T(u,c,s)),n++,r++,f++;return f}(t,n,o,r,l,i,u,e);if(c=function(e,t,n,o,r,l,i,s){let u,c,f=0;for(;n<=o&&r<=l&&i(u=e[o],c=t[l]);)s&&(e[o]=T(u,c,s)),o--,l--,f++;return f}(t,n,o+=c,r,l+=c,i,u,e),i-=c,o>(r-=c)&&l>i)return;if(o<=r&&l>i)return s=n[l],void w(e,t,o,r,s);if(l<=i&&o>r)return void A(e,n,l,i);const f=i-l+1,d=r-o+1;if(c=-1,f<d){if(c=U(t,n,o,r,l,i,u,!0),c>=0){s=n[l],w(e,t,o,c-1,s);const u=c+f;for(o=c;o<u;){const r=o++;t[r]=T(t[r],n[l++],e)}return void w(e,t,o,r,n[i+1])}}else if(f>d&&(c=U(n,t,l,i,o,r,u,!1),c>=0)){A(e,n,l,c-1);const r=c+d;for(l=c;l<r;){const r=o++;t[r]=T(t[r],n[l++],e)}return void A(e,n,l,i)}if(l===i)return L(e,n[l]),void w(e,t,o,r,n[l+1]);if(o===r)return A(e,n,l,i),void(t[o]=N(e,t[o],n[i+1]));let a=function(e,t,n=0,o=e.length-1,r=0,l=t.length-1){const i=o-n+1,s=l-r+1,c=i+s,f=[];let d,a,p,m,y,_,v;e:for(d=0;d<=c;d++){if(d>50)return null;for(v=d-1,y=d?f[d-1]:[0,0],_=f[d]=[],a=-d;a<=d;a+=2){for(m=a===-d||a!==d&&y[v+a-1]<y[v+a+1]?y[v+a+1]:y[v+a-1]+1,p=m-a;m<s&&p<i&&u(e[n+p],t[r+m]);)m++,p++;if(m===s&&p===i)break e;_[d+a]=m}}const h=Array(d/2+c/2),g={},b=new Map;let E,k=h.length-1;for(d=f.length-1;d>=0;d--){for(;m>0&&p>0&&u(e[n+p-1],t[r+m-1]);)h[k--]=2,m--,p--;if(!d)break;v=d-1,y=d?f[d-1]:[0,0],a=m-p,a===-d||a!==d&&y[v+a-1]<y[v+a+1]?(p--,h[k--]=4):(m--,h[k--]=8,E=t[r+m],null!=E.key?g[E.key]=r+m:E._isWrapped&&b.set(E._node,r+m))}return{diff:h,keymap:g,wrapmap:b}}(t,n,o,r,l,i);a||(a=function(e,t,n,o,r,l){const i=o-n+1,s=l-r+1,c=Math.min(i,s),f=Array(c+1);f[0]=-1;for(let e=1;e<f.length;e++)f[e]=l+1;const d=Array(c),a={},p=[],m=new Map;for(let e=r;e<=l;e++){let n=t[e],o=n.key;null!=o?a[o]=e:n._isWrapped?m.set(n._node,e):p.push(e)}let y=0;for(let r=n;r<=o;r++){const n=e[r];let o,l=!1;if(null!=n.key?o=a[n.key]:n._isWrapped?o=m.get(n._node):(l=!0,o=p[y]),null==o||u(n,t[o])?l&&y++:o=null,null!=o){let e=v(f,o);e>=0&&(f[e]=o,d[e]={newi:r,oldi:o,prev:d[e-1]})}}let _=f.length-1;for(;f[_]>l;)_--;let h=d[_];const g=Array(s+i-_);let b=o,E=l,k=g.length-1;for(;h;){let e=h,t=e.newi,n=e.oldi;for(;b>t;)g[k--]=4,b--;for(;E>n;)g[k--]=8,E--;g[k--]=2,b--,E--,h=h.prev}for(;b>=n;)g[k--]=4,b--;for(;E>=r;)g[k--]=8,E--;return{diff:g,keymap:a,wrapmap:m}}(t,n,o,r,l,i)),function(e,t,n,o,r,l,i,s,c){const f=new Map,d=new Map;for(let e=0,i=r,a=l;e<t.length;e++){const r=t[e];if(2===r)i++,a++;else if(4===r){const e=i++,t=n[e];let r=null;null!=t.key?(r=s[t.key],null!=r&&u(t,o[r])&&f.set(t.key,r)):t._isWrapped&&(r=c.get(t._node),null!=r&&u(t,o[r])&&d.set(t._node,r))}else 8===r&&a++}const a=o.slice();for(let n=t.length-1,r=i;n>=0;n--){const l=t[n];if(2===l)r--;else if(8===l){const t=r--,n=o[t];null!=n.key&&f.has(n.key)||n._isWrapped&&d.has(n._node)||(L(e,n),a[t]=a[t+1])}}for(let i=0,s=r,u=l;i<t.length;i++){const r=t[i];if(2===r){const t=s++;n[t]=T(n[t],o[u++],e)}else if(4===r){const t=s++,r=n[t];let l=null;null!=r.key?l=f.get(r.key):r._isWrapped&&(l=d.get(r._node)),null!=l?(n[t]=T(r,o[l],e),D(e).insertBefore(n[t]._node,u<a.length?a[u]._node:null)):n[t]=N(e,r,u<a.length?a[u]:null)}else 8===r&&u++}}(e,a.diff,t,n,o,l,i,a.keymap,a.wrapmap)}function U(e,t,n,o,r,l,i,s){let u=r,c=-1;const f=l-r+1;for(;n<=o&&o-n+1>=f;){if(i(s?e[n]:t[u],s?t[u]:e[n])){if(c<0&&(c=n),u++,u>l)return c}else c=-1,u=r;n++}return-1}function P(e,t,n){const o=n._node.nextSibling;L(e,n);const r=I(t),l=r._node;return D(e).insertBefore(l,o),k(r),r}function L(e,t){t._clean&&t._clean(),D(e).removeChild(t._node),S(t)}function N(e,t,n){const o=I(t),r=o._node;return D(e).insertBefore(r,null==n?void 0:n._node),k(o),o}function W(e,t,n){const o=E(t);D(e).insertBefore(o,null==n?void 0:n._node),k(t)}function B(e,t,n=null){n!==e&&("function"==typeof n&&n(null),"function"==typeof e&&e(t))}function D(e){if(a(e)){const t=e.content;if(t)return t}return e}function R(e,t){var n,o;const l=e.metadata;return!(null===(o=null===(n=null==l?void 0:l.properties)||void 0===n?void 0:n[t])||void 0===o?void 0:o.readOnly)||(r.warn(`Read-only property '${t}' cannot be set on ${l.name}.`),!1)}function I(e){let t=e;return e._isWrapped||(e._node&&(t=F(e)),b(t)),t}function F(e){const t=Object.assign({},e);return t._node=null,t}e.LISTENER_OPTIONS_SYMBOL=d,e.appendChildrenForTemplate=C,e.classPropToObject=s,e.flattenContent=g,e.getMountedNode=function(e){return e._node},e.h=function(e,n,...o){let r,i=!1,s=!1;var u;"string"==typeof e?(i="svg"===e,r=!i&&t.ElementUtils.isValidCustomElementName(e)):(s=(null==(u=e.prototype)?void 0:u.mount)&&(null==u?void 0:u.patch)&&(null==u?void 0:u.notifyUnmounted)&&(null==u?void 0:u.notifyMounted),r=s&&e.prototype.mountContent);const c=s||r;return{type:e,isSVG:i,isComponent:s,isCustomElement:r,key:null==n?void 0:n.key,props:n||(c?Object.create(null):l),content:1===o.length?o[0]:o,ref:null==n?void 0:n.ref}},e.mount=b,e.mountCustomElement=function(e,t){const n=e.type,o=e.props,r=document.createElement(n);return G(r,t,null,!0),G(r,o,null,!0),e.content=g(e.content,e.isSVG),w(r,e.content),e._node=r,r},e.mountCustomElementContent=function(e,t){const n=e._node;G(n,e.props,t,!0),e.content=g(e.content,e.isSVG),w(n,e.content),B(e.ref,n)},e.mountForTemplate=E,e.mounted=function(e){if(e.isComponent){e._data.notifyMounted()}},e.patch=T,e.patchCustomElement=function(e,t,n,o){const r=t._node;t!==e&&(G(r,n,o,!0),G(r,e.props,t.props,!0),e.content=g(e.content,e.isSVG),V(r,e.content,t.content),B(e.ref,r,t.ref))},e.patchCustomElementContent=function(e,n,o){const r=n._node;if(n===e)return;e.content=g(e.content,e.isSVG);const l={},i=n.props;for(let e in i)(t.AttributeUtils.isEventListenerProperty(e)||"class"===e||"style"===e)&&(l[e]=i[e]);Object.assign(l,o),G(r,e.props,l,!0),V(r,e.content,n.content),B(e.ref,r,n.ref)},e.patchDOMForTemplate=M,e.patchRef=B,e.removeChildren=A,e.removeListeners=function(e,t){Object.keys(t).forEach(function(n){i.has(n)||y(e,n,null,t[n])})},e.unmount=S,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=ojvdom.js.map