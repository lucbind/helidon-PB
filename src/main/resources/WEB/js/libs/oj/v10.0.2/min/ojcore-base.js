/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define("polyfills",[]),define("promise",["polyfills"],function(){return Promise.polyfill=function(){},Promise}),define(["polyfills","ojs/ojlogger"],function(e,t){"use strict";
/**
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */let n={};"undefined"!=typeof window?n=window:"undefined"!=typeof self&&(n=self);var r=n.oj;const o={version:"10.0.2",revision:"2021-03-04_13-33-50",noConflict:function(){n.oj=r},_registerLegacyNamespaceProp:function(e,t){this[e]=t}};n.oj=o;
/**
   * @license
   * Copyright (c) 2004 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
const i={};o._registerLegacyNamespaceProp("StringUtils",i),i._TRIM_ALL_RE=/^\s*|\s*$/g,i.isEmpty=function(e){return null===e||0===i.trim(e).length},i.isEmptyOrUndefined=function(e){return!(void 0!==e&&!i.isEmpty(e))},i.isString=function(e){return null!==e&&("string"==typeof e||e instanceof String)},i.trim=function(e){return i.isString(e)?e.replace(i._TRIM_ALL_RE,""):e},i.hashCode=function(e){var t=0;if(0===e.length)return t;for(var n=0;n<e.length;n++){t=(t<<5)-t+e.charCodeAt(n),t&=t}return t},String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.substr(t,e.length)===e}),String.prototype.endsWith||(String.prototype.endsWith=function(e,t){var n=this.toString();("number"!=typeof t||!isFinite(t)||Math.floor(t)!==t||t>n.length)&&(t=n.length),t-=e.length;var r=n.lastIndexOf(e,t);return-1!==r&&r===t});
/**
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
const s=function(){};o._registerLegacyNamespaceProp("AgentUtils",s),s.BROWSER={IE:"ie",FIREFOX:"firefox",SAFARI:"safari",CHROME:"chrome",EDGE:"edge",EDGE_CHROMIUM:"edge-chromium",UNKNOWN:"unknown"},s.ENGINE={TRIDENT:"trident",WEBKIT:"webkit",GECKO:"gecko",BLINK:"blink",EDGE_HTML:"edgehtml",UNKNOWN:"unknown"},s.OS={WINDOWS:"Windows",SOLARIS:"Solaris",MAC:"Mac",UNKNOWN:"Unknown",ANDROID:"Android",IOS:"IOS",WINDOWSPHONE:"WindowsPhone",LINUX:"Linux"},s.DEVICETYPE={PHONE:"phone",TABLET:"tablet",OTHERS:"others"},s.getAgentInfo=function(e){i.isEmptyOrUndefined(e)&&(e=navigator.userAgent),e=e.toLowerCase();var t=i.hashCode(e),n=s._currAgentInfo;if(n&&n.hashCode===t)return{os:n.os,browser:n.browser,browserVersion:n.browserVersion,deviceType:n.deviceType,engine:n.engine,engineVersion:n.engineVersion,hashCode:n.hashCode};var r=s.OS.UNKNOWN,o=s.BROWSER.UNKNOWN,a=0,c=s.DEVICETYPE.OTHERS,u=s.ENGINE.UNKNOWN,l=0;return e.indexOf("iphone")>-1||e.indexOf("ipad")>-1||"MacIntel"===navigator.platform&&void 0!==navigator.standalone?r=s.OS.IOS:e.indexOf("mac")>-1?r=s.OS.MAC:e.indexOf("sunos")>-1?r=s.OS.SOLARIS:e.indexOf("android")>-1?r=s.OS.ANDROID:e.indexOf("linux")>-1?r=s.OS.LINUX:e.indexOf("windows phone")>-1?r=s.OS.WINDOWSPHONE:e.indexOf("win")>-1&&(r=s.OS.WINDOWS),r===s.OS.ANDROID?c=e.indexOf("mobile")>-1?s.DEVICETYPE.PHONE:s.DEVICETYPE.TABLET:r===s.OS.IOS&&(c=e.indexOf("iphone")>-1?s.DEVICETYPE.PHONE:s.DEVICETYPE.TABLET),e.indexOf("msie")>-1?(o=s.BROWSER.IE,a=s._parseFloatVersion(e,/msie (\d+[.]\d+)/),e.indexOf("trident")&&(u=s.ENGINE.TRIDENT,l=s._parseFloatVersion(e,/trident\/(\d+[.]\d+)/))):e.indexOf("trident")>-1?(o=s.BROWSER.IE,a=s._parseFloatVersion(e,/rv:(\d+[.]\d+)/),e.indexOf("trident")&&(u=s.ENGINE.TRIDENT,l=s._parseFloatVersion(e,/trident\/(\d+[.]\d+)/))):e.indexOf("edge")>-1?(o=s.BROWSER.EDGE,a=l=s._parseFloatVersion(e,/edge\/(\d+[.]\d+)/),u=s.ENGINE.EDGE_HTML):e.indexOf("edg")>-1?(o=s.BROWSER.EDGE_CHROMIUM,a=s._parseFloatVersion(e,/edg\/(\d+[.]\d+)/),u=s.ENGINE.BLINK,l=a):e.indexOf("chrome")>-1?(o=s.BROWSER.CHROME,(a=s._parseFloatVersion(e,/chrome\/(\d+[.]\d+)/))>=28?(u=s.ENGINE.BLINK,l=a):(u=s.ENGINE.WEBKIT,l=s._parseFloatVersion(e,/applewebkit\/(\d+[.]\d+)/))):e.indexOf("safari")>-1?(o=s.BROWSER.SAFARI,a=s._parseFloatVersion(e,/version\/(\d+[.]\d+)/),u=s.ENGINE.WEBKIT,l=s._parseFloatVersion(e,/applewebkit\/(\d+[.]\d+)/)):e.indexOf("firefox")>-1&&(o=s.BROWSER.FIREFOX,a=s._parseFloatVersion(e,/rv:(\d+[.]\d+)/),u=s.ENGINE.GECKO,l=s._parseFloatVersion(e,/gecko\/(\d+)/)),s._currAgentInfo=n={hashCode:t,os:r,browser:o,browserVersion:a,deviceType:c,engine:u,engineVersion:l},{os:n.os,browser:n.browser,browserVersion:n.browserVersion,deviceType:n.deviceType,engine:n.engine,engineVersion:n.engineVersion,hashCode:n.hashCode}},s._parseFloatVersion=function(e,t){var n=e.match(t);if(n){var r=n[1];if(r)return parseFloat(r)}return 0};
/**
   * @license
   * Copyright (c) 2008 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
const a={};o._registerLegacyNamespaceProp("Assert",a);var c="DEBUG";a.forceDebug=function(){a[c]=!0},a.clearDebug=function(){a[c]=!1},a.isDebug=function(){return!0===a[c]},a.assert=function(e,t){if(a[c]&&!e){var n=t||"";if(arguments.length>2){n+="(";for(var r=2;r<arguments.length;r+=1)n+=arguments[r];n+=")"}a.assertionFailed(n,1)}},a.failedInAbstractFunction=function(){a[c]&&a.assertionFailed("Abstract function called",1)},a.assertPrototype=function(e,t,n){if(a[c]){var r=t.prototype;if(null!=e)a.assertType(t,"function",null,1,!1),Object.prototype.isPrototypeOf.call(r,e)||a.assertionFailed("object '"+e+"' doesn't match prototype "+r,1,n);else a.assertionFailed("null object doesn't match prototype "+r,1,n)}},a.assertPrototypeOrNull=function(e,t,n){if(a[c]&&null!=e){a.assertType(t,"function",null,1,!1);var r=t.prototype;Object.prototype.isPrototypeOf.call(r,e)||a.assertionFailed("object '"+e+"' doesn't match prototype "+r,1,n)}},a.assertPrototypes=function(e,t,n,r){if(a[c]){var o=t.prototype,i=n.prototype,s=Object.prototype.isPrototypeOf;s.call(o,e)||s.call(i,e)||a.assertionFailed("object '"+e+"' doesn't match prototype "+o+" or "+i,1,r)}},a.assertDomNodeOrNull=function(e,t){a[c]&&e&&void 0===e.nodeType&&a.assertionFailed(e+" is not a DOM Node",t+1)},a.assertDomNode=function(e,t){a[c]&&(e&&void 0!==e.nodeType||a.assertionFailed(e+" is not a DOM Node",t+1))},a.assertDomElement=function(e,t){a[c]&&(a.assertDomNode(e,1),1!==e.nodeType?a.assertionFailed(e+" is not a DOM Element",1):t&&e.nodeName!==t&&a.assertionFailed(e+" is not a "+t+" Element",1))},a.assertDomElementOrNull=function(e,t){a[c]&&null!=e&&(a.assertDomNode(e,1),1!==e.nodeType?a.assertionFailed(e+" is not a DOM Element",1):t&&e.nodeName!==t&&a.assertionFailed(e+" is not a "+t+" Element",1))},a.assertType=function(e,t,n,r,o){if(a[c]&&!(null==e&&o||typeof e===t)){var i=e+" is not of type "+t;n&&(i=n+i),r||(r=0),a.assertionFailed(i,r+1)}},a.assertObject=function(e,t){a[c]&&a.assertType(e,"object",t,1,!1)},a.assertObjectOrNull=function(e,t){a[c]&&a.assertType(e,"object",t,1,!0)},a.assertNonEmptyString=function(e,t){a[c]&&(a.assertType(e,"string",t,1,!1),a.assert(e.length>0,"empty string"))},a.assertString=function(e,t){a[c]&&a.assertType(e,"string",t,1,!1)},a.assertStringOrNull=function(e,t){a[c]&&a.assertType(e,"string",t,1,!0)},a.assertFunction=function(e,t){a[c]&&a.assertType(e,"function",t,1,!1)},a.assertFunctionOrNull=function(e,t){a[c]&&a.assertType(e,"function",t,1,!0)},a.assertBoolean=function(e,t){a[c]&&a.assertType(e,"boolean",t,1,!1)},a.assertNumber=function(e,t){a[c]&&a.assertType(e,"number",t,1,!1)},a.assertNumberOrNull=function(e,t){a[c]&&a.assertType(e,"number",t,1,!0)},a.assertArray=function(e,t){a[c]&&(Array.isArray(e)||(void 0===t&&(t=e+" is not an array"),a.assertionFailed(t,1)))},a.assertArrayOrNull=function(e,t){a[c]&&null!=e&&(Array.isArray(e)||(void 0===t&&(t=e+" is not an array"),a.assertionFailed(t,1)))},a.assertNonNumeric=function(e,t){a[c]&&(isNaN(e)||(void 0===t&&(t=e+" is convertible to a number"),a.assertionFailed(t,1)))},a.assertNumeric=function(e,t){a[c]&&isNaN(e)&&(void 0===t&&(t=e+" is not convertible to a number"),a.assertionFailed(t,1))},a.assertInSet=function(e,t,n){if(null==e||void 0===t[e.toString()]){if(void 0===n){for(var r=" is not in set: {",o=Object.keys(t),i=0;i<o.length;i++){r+=o[i],r+=","}n=e+(r+="}")}a.assertionFailed(n,1)}},a.assertionFailed=function(e,t,n){t||(t=0);var r="Assertion";throw n&&(r+=" ("+n+")"),r+=" failed: ",void 0!==e&&(r+=e),new Error(r)};var u=n.__oj_Assert_DEBUG;void 0!==u&&(a[c]=u)
/**
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */,s.getAgentInfo().browser===s.BROWSER.IE&&t.error("Internet Explorer is not supported with this version of JET.");
/**
   * @license
   * Copyright (c) 2004 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
const l={};o._registerLegacyNamespaceProp("CollectionUtils",l),l.copyInto=function(e,t,n,r,o){return l._copyIntoImpl(e,t,n,r,o,0)},l.mergeDeep=function(e,...t){if(!t.length)return e;const n=l.isPlainObject,r=l.mergeDeep,o=t.shift();return n(e)&&n(o)&&Object.keys(o).forEach(t=>{n(o[t])?(e[t]||Object.assign(e,{[t]:{}}),r(e[t],o[t])):Object.assign(e,{[t]:o[t]})}),r(e,...t)},l.isPlainObject=function(e){if(null!==e&&"object"==typeof e)try{var t=Object.prototype.hasOwnProperty;if(e.constructor&&t.call(e.constructor.prototype,"isPrototypeOf"))return!0}catch(e){}return!1},l._copyIntoImpl=function(e,t,n,r,o,i){var s;if(null==o&&(o=Number.MAX_VALUE),e&&t&&e!==t)for(var a=Object.keys(t),c=0;c<a.length;c++){var u=a[c];s=n?n(u):u;var f=t[u],d=!1;if(r&&i<o){var p=e[s];l.isPlainObject(f)&&(null==p||l.isPlainObject(p))&&(d=!0,e[s]=p||{},l._copyIntoImpl(e[s],f,n,!0,o,i+1))}d||(e[s]=f)}return e},"undefined"!=typeof window&&window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),r=this;do{for(t=n.length;--t>=0&&n.item(t)!==r;);}while(t<0&&(r=r.parentElement));return r}),function(){function e(e){return function(t,n,r){return e.call(this,t,n,function(e){return"boolean"==typeof e?e:!!e&&e.capture}(r))}}if("undefined"!=typeof window&&!function(){let e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){return e=!0,e}});window.addEventListener("testPassive",null,t),window.removeEventListener("testPassive",null,t)}catch(e){}return e}()){let t;window.EventTarget?t=EventTarget.prototype:window.Node&&(t=Node.prototype),t&&(t.addEventListener=e(t.addEventListener),t.removeEventListener=e(t.removeEventListener))}}(),
/**
     * @license
     * Code taken from
     * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask
     * under "When queueMicrotask() isn't available".
     * @ignore
     */
"undefined"!=typeof window&&"function"!=typeof window.queueMicrotask&&(window.queueMicrotask=function(e){Promise.resolve().then(e).catch(function(e){setTimeout(function(){throw e})})}),function(){if("undefined"!=typeof window){var e;if(!((e=document.createEvent("Event")).initEvent("foo",!0,!0),e.preventDefault(),e.defaultPrevented)){var t=Event.prototype.preventDefault;Event.prototype.preventDefault=function(){this.cancelable&&(t.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0},configurable:!0}))}}"function"!=typeof window.CustomEvent&&(n.prototype=Object.getPrototypeOf(new n("bogusEvent")),window.CustomEvent=n)}function n(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}}(),function(){function e(e){var t=document.createEvent("FocusEvent");return t.initEvent(e,!1,!1),t}"undefined"!=typeof window&&"function"!=typeof window.FocusEvent&&(e.prototype=Object.getPrototypeOf(new e("focus")),window.FocusEvent=e)}(),function(){var e,t;"undefined"!=typeof window&&!window.setImmediate&&window.postMessage&&(window.setImmediate=function(){var t=arguments[0],o=Array.prototype.slice,i=o.call(arguments,1);a.assertFunction(t);var s=n();return e||(e=new Map),e.set(s,{callback:t,args:i}),1===e.size&&window.addEventListener("message",r),window.postMessage({id:s,message:"oj-setImmediate"},"*"),s},window.clearImmediate=o);function n(){return isNaN(t)&&(t=0),t+=1}function r(t){var n=t.data;if(n&&"oj-setImmediate"===n.message){var r=n.id,i=e.get(r);if(o(r),i){var s=i.callback,a=i.args;s.apply(window,a)}}}function o(t){e&&(e.delete(t),e.size<1&&(window.removeEventListener("message",r),e=null))}}(),"undefined"!=typeof window&&(window.Symbol?(window.Symbol.asyncIterator||(window.Symbol.asyncIterator="asyncIterator"),window.Symbol.iterator||(window.Symbol.iterator="iterator")):(window.Symbol={},window.Symbol.asyncIterator="asyncIterator",window.Symbol.iterator="iterator")),function(){if("undefined"!=typeof window&&0===new window.Set([0]).size){var e=window.Set;function t(t){var n=new e;return t&&t.forEach(n.add,n),n}t.prototype=e.prototype,t.prototype.constructor=t,window.Set=t}}(),"undefined"!=typeof window&&(window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=Array.prototype.forEach),window.DOMTokenList&&!DOMTokenList.prototype.forEach&&(DOMTokenList.prototype.forEach=Array.prototype.forEach)),"undefined"!=typeof window&&"undefined"!==window.Node&&("isConnected"in Node.prototype||Object.defineProperty(Node.prototype,"isConnected",{get(){return!(this.ownerDocument&&this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}}));
/**
   * @license
   * Copyright (c) 2008 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
const f=function(){this.Init()};o._registerLegacyNamespaceProp("Object",f),f.superclass=null,f._typeName="oj.Object",f._GET_FUNCTION_NAME_REGEXP=/function\s+([\w$][\w$\d]*)\s*\(/,(f.prototype={}).constructor=f,f.createSubclass=function(e,t,n){a.assertFunction(e),a.assertFunctionOrNull(t),a.assertStringOrNull(n),void 0===t&&(t=f),a.assert(e!==t,"Class can't extend itself");var r=f._tempSubclassConstructor;r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e,e.superclass=t.prototype,n&&(e._typeName=n)},f.copyPropertiesForClass=function(e,t){a.assertFunction(e),a.assert(null!=t,"source object cannot be null");for(var n=Object.keys(t),r=0;r<n.length;r++){var o=n[r];e.prototype[o]=t[o]}},f._tempSubclassConstructor=function(){},f.prototype.getClass=function(e){if(void 0===e)e=this;else if(null===e)return null;return e.constructor},f.prototype.clone=function(){var e=new this.constructor;return l.copyInto(e,this),e},f.prototype.toString=function(){return this.toDebugString()},f.prototype.toDebugString=function(){return this.getTypeName()+" Object"},f.getTypeName=function(e){a.assertFunction(e);var t=e._typeName;if(null==t){var n=e.toString(),r=f._GET_FUNCTION_NAME_REGEXP.exec(n);t=r?r[1]:"anonymous",e._typeName=t}return t},f.prototype.getTypeName=function(){return f.getTypeName(this.constructor)},f.prototype.Init=function(){a.isDebug()&&a.assert(this.getTypeName,"Not an oj.Object");var e=this.constructor;e._initialized||f._initClasses(e)},f.ensureClassInitialization=function(e){a.assertFunction(e),e._initialized||f._initClasses(e)},f.prototype.equals=function(e){return this===e},f.createCallback=function(e,t){return a.assertFunction(t),t.bind(e)},f._initClasses=function(e){a.isDebug()&&(a.assertFunction(e),a.assert(!e._initialized)),e._initialized=!0;var t=e.superclass;if(t){var n=t.constructor;n&&!n._initialized&&f._initClasses(n)}var r=e.InitClass;r&&r.call(e)},f.compareValues=function(e,t){if(e===t)return!0;if(typeof e!==typeof t)return!1;if(null===e||null===t)return!1;if(e.constructor===t.constructor){if(Array.isArray(e))return f._compareArrayValues(e,t);if(e.constructor===Object)return f.__innerEquals(e,t);if(e.valueOf&&"function"==typeof e.valueOf)return e.valueOf()===t.valueOf()}return!1},f._compareArrayValues=function(e,t){if(e.length!==t.length)return!1;for(var n=0,r=e.length;n<r;n++)if(!f.compareValues(e[n],t[n]))return!1;return!0},f._compareIdIndexObject=function(e,t){if("number"==typeof e&&"number"==typeof t||"string"==typeof e&&"string"==typeof t)return e===t;if("object"==typeof e&&"object"==typeof t){if(e.id&&t.id)return e.id===t.id&&(!e.index||!t.index||e.index===t.index);if(e.index&&t.index)return e.index===t.index}return!1},f._compareArrayIdIndexObject=function(e,t){if(!e)return!t||0===t.length;if(!t)return!e||0===e.length;if(e.length!==t.length)return!1;for(var n=0;n<e.length;n++){for(var r=!1,o=0;o<t.length;o++)if(f._compareIdIndexObject(e[n],t[o])){r=!0;break}if(!r)return!1}return!0},f.__innerEquals=function(e,t){if(e===t)return!0;if(!(e instanceof Object&&t instanceof Object))return!1;if(e.constructor!==t.constructor)return!1;var n,r,o=Object.prototype.hasOwnProperty,i=Object.keys(e);for(r=0;r<i.length;r++)if(n=i[r],o.call(e,n)){if(!o.call(t,n))return!1;if(e[n]!==t[n]){if("object"!=typeof e[n])return!1;if(!f.compareValues(e[n],t[n]))return!1}}var s=Object.keys(t);for(r=0;r<s.length;r++)if(n=s[r],o.call(t,n)&&!o.call(e,n))return!1;return 0!==i.length||0!==s.length||JSON.stringify(e)===JSON.stringify(t)},f.isEmpty=function(e){var t;if(null==e)return!0;for(t in e)if(e.hasOwnProperty(t))return!1;return!0};o._registerLegacyNamespaceProp("__isAmdLoaderPresent",function(){return"function"==typeof define&&define.amd});
/**
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
const d=function(){this.Init()};f.createSubclass(d,f,"oj.EventSource"),o._registerLegacyNamespaceProp("EventSource",d),d.prototype.Init=function(){this._eventHandlers=[],d.superclass.Init.call(this)},d.prototype.on=function(e,t){for(var n=!1,r=0;r<this._eventHandlers.length;r++)if(this._eventHandlers[r].eventType===e&&this._eventHandlers[r].eventHandlerFunc===t){n=!0;break}n||this._eventHandlers.push({eventType:e,eventHandlerFunc:t})},d.prototype.off=function(e,t){for(var n=this._eventHandlers.length-1;n>=0;n--)if(this._eventHandlers[n].eventType===e&&this._eventHandlers[n].eventHandlerFunc===t){this._eventHandlers.splice(n,1);break}},d.prototype.handleEvent=function(e,t){for(var n=0;n<this._eventHandlers.length;n++){var r=this._eventHandlers[n];if(r.eventType===e&&!1===r.eventHandlerFunc.apply(this,Array.prototype.slice.call(arguments).slice(1)))return!1}return!0};
/**
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
const p={};o._registerLegacyNamespaceProp("KeyUtils",p),p.equals=function(e,t){return f.compareValues(e,t)};
/**
   * @license
   * Copyright (c) 2008 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
var y=n.__ojCheckpointManager;const v={};return o._registerLegacyNamespaceProp("CHECKPOINT_MANAGER",v),v.startCheckpoint=function(e,t){y&&y.startCheckpoint(e,t)},v.endCheckpoint=function(e){y&&y.endCheckpoint(e)},v.getRecord=function(e){return y?y.getRecord(e):void 0},v.matchRecords=function(e){return y?y.matchRecords(e):[]},v.dump=function(e){t.info(function(){for(var t="Checkpoint Records:",n=v.matchRecords(e),r=0;r<n.length;r++){var o=n[r];t=t+"\n"+o.name;var i=o.description;null!=i&&(t=t+" ("+i+")"),t=(t+=":\n")+"start: "+o.start+"\tduration: "+o.duration}return t})},o});
//# sourceMappingURL=ojcore-base.js.map