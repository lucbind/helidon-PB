/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["require","exports","ojs/ojvcomponent","ojs/ojvdom","ojs/ojcustomelement","ojs/ojcore-base","ojs/ojdefaultsutils","ojs/ojcontext","ojs/ojcustomelement-utils"],function(t,e,n,o,i,r,s,a,l){"use strict";r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r,a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a;
/**
     * @license
     * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
     * The Universal Permissive License (UPL), Version 1.0
     * as shown at https://oss.oracle.com/licenses/upl/
     * @ignore
     */
/**
     * @license
     * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
     * The Universal Permissive License (UPL), Version 1.0
     * as shown at https://oss.oracle.com/licenses/upl/
     * @ignore
     */
class u extends n.VComponent{}const c=n.flattenChildren;class _ extends l.ElementState{getTemplateEngine(){return _._cachedTemplateEngine}getTrackChildrenOption(){return this.Element._vcomp?"none":"immediate"}GetPreCreatedPromise(){const t=super.GetPreCreatedPromise();return!_._cachedTemplateEngine&&this._hasDirectTemplateChildren()?t.then(()=>this._getTemplateEnginePromise()):t}IsTransferAttribute(t){const e=this.Element._vcomp,n=l.CustomElementUtils.getElementBridge(this.Element)._EXTENSION._ROOT_PROPS_MAP;return e&&n&&!!n[t]}GetDescriptiveTransferAttributeValue(t){return l.CustomElementUtils.getElementBridge(this.Element)._getVComponentProps()[t]}_getTemplateEnginePromise(){return new Promise(function(e,n){t(["ojs/ojtemplateengine"],function(t){e(function(t){if(t&&t.__esModule)return t;var e={};return t&&Object.keys(t).forEach(function(n){var o=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,o.get?o:{enumerable:!0,get:function(){return t[n]}})}),e.default=t,e}(t))},n)}).then(t=>{_._cachedTemplateEngine=t.default})}_hasDirectTemplateChildren(){const t=this.Element.childNodes;for(var e=0;e<t.length;e++){if("template"===t[e].localName)return!0}return!1}}
/**
     * @license
     * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
     * The Universal Permissive License (UPL), Version 1.0
     * as shown at https://oss.oracle.com/licenses/upl/
     * @ignore
     */const h={};function d(t,e){switch(t.nodeType){case Node.COMMENT_NODE:return{_node:t,_isWrapped:!0};case Node.TEXT_NODE:return{_text:t.nodeValue,_node:t,_isWrapped:!0};case Node.ELEMENT_NODE:var n=[];t.childNodes.forEach(function(t){var e=d(t);e&&n.push(e)});var o={type:t.tagName.toLowerCase(),props:t,content:n,_node:t,_isWrapped:!0};return null!=e&&o.props.slot!==e&&(o.props.slot=e),o;default:return null}}function p(t,e){const n=(o=e[0])&&o._node;var o;if("TEMPLATE"!==n.nodeName)throw new Error(`Template node expected for template slot, but found ${n.nodeName} instead.`);return function(e){const o=l.CustomElementUtils.getElementBridge(t).State.getTemplateEngine();if(!o)throw new Error("Unexpected call to render a template slot");return o.execute(t,n,e).map(t=>{const e=d(t);return e._clean=o.clean.bind(null,t),e})}}h._DEFAULT_SLOT_PROP="children",h.proto=Object.create(r.BaseCustomElementBridge.proto),r.CollectionUtils.copyInto(h.proto,{AddComponentMethods:function(t){t.setProperty=function(t,e){var n=l.CustomElementUtils.getElementBridge(this);n.SaveEarlyPropertySet(this,t,e)||n.SetProperty(this,t,e,this,!0)},t.getProperty=function(t){return l.CustomElementUtils.getElementBridge(this).GetProperty(this,t,this)}},AttributeChangedCallback:function(t,e,n){if(r.BaseCustomElementBridge.proto.AttributeChangedCallback.call(this,t,e,n),e!==n){var o=l.CustomElementUtils.getElementBridge(this);if(!o.ShouldHandleAttributeChanged(this)&&r.BaseCustomElementBridge.proto.ShouldHandleAttributeChanged.call(o,this)){var i=this._vcomp;i&&!i.isCustomElementFirst()||o.HandleAttributeChanged(this,t,e,n)}}},CreateComponent:function(t){let e=t._vcomp;if(!e){const n=this._initSlotMapAndRootProps(t),o=this._getVComponentProps();e=new(l.CustomElementUtils.getElementDescriptor(t.tagName)._CONSTRUCTOR)(o),e._uniqueId=n.uniqueId,t._vcomp=e,e.setCallbacks(this._getCallbacks(t)),this._mountCustomElement(t,e,o,n.slotMap)}e.mounted()},DefineMethodCallback:function(t,e,n){t[e]=function(){if(!this._vcomp){var t=l.CustomElementUtils.getElementBridge(this);t.State.throwError("Cannot access methods before element is upgraded.")}return this._vcomp[e].apply(this._vcomp,arguments)}},DefinePropertyCallback:function(t,e,n){function o(t,o){this._BRIDGE._updateProperty(this._ELEMENT,e,t,n,o)}function i(){var t=this._BRIDGE._PROPS[e];return void 0===t&&(t=this._BRIDGE._getDefaultValue(e,n),this._BRIDGE._PROPS[e]=t),t}n._derived||r.BaseCustomElementBridge.__DefineDynamicObjectProperty(t._propsProto,e,function(){return i.bind(this)()},function(t){o.bind(this)(t,!1)}),r.BaseCustomElementBridge.__DefineDynamicObjectProperty(t,e,function(){var t=this._vcomp;if(!t||t.isCustomElementFirst()){var e=l.CustomElementUtils.getElementBridge(this);return i.bind(e._PROPS_PROXY)()}},function(t){var e=this._vcomp,n=l.CustomElementUtils.getElementBridge(this);!e||e.isCustomElementFirst()?o.bind(n._PROPS_PROXY)(t,!0):e&&!e.isCustomElementFirst()&&n.State.throwError("Cannot set properties on a VComponent-first element.")})},GetAttributes:function(t){var e=r.BaseCustomElementBridge.proto.GetAttributes.call(this,t),n=t.extension&&t.extension._ROOT_PROPS_MAP;return n&&Object.keys(n).forEach(function(t){e.push(l.AttributeUtils.getGlobalAttrForProp(t))}),e},ShouldHandleAttributeChanged:function(t){if(!r.BaseCustomElementBridge.proto.ShouldHandleAttributeChanged.call(this,t))return!1;var e=t._vcomp;return!e||e.isCustomElementFirst()&&!e.isPatching()},HandleAttributeChanged:function(t,e,n,o){var i=t._vcomp,r=this._EXTENSION._ROOT_PROPS_MAP;if(i&&r){var s=l.AttributeUtils.getGlobalPropForAttr(e)||e;if(r[s]&&n!==o){if(null==o)delete this._LIVE_CONTROLLED_PROPS[s],i.isPatching()||delete this._VCOMP_CONTROLLED_PROPS[s];else{var a=t[s];this._LIVE_CONTROLLED_PROPS[s]=null!=a?a:o,i.isPatching()||(this._VCOMP_CONTROLLED_PROPS[s]=this._LIVE_CONTROLLED_PROPS[s])}i.isPatching()||this._queueRender(t)}}},HandleReattached:function(t){this._verifyConnectDisconnect(t,1)},HandleDetached:function(t){this._verifyConnectDisconnect(t,0)},_verifyConnectDisconnect:function(t,e){t._vcomp&&t._vcomp.isCustomElementFirst()&&(-1===this._verifyingState&&window.queueMicrotask(function(){this._verifyingState===e&&(0===this._verifyingState?this._unmountAndReset(t):t._vcomp.notifyMounted()),this._verifyingState=-1}.bind(this)),this._verifyingState=e)},InitializeElement:function(t){if(!t._vcomp){r.Components&&r.Components.markPendingSubtreeHidden(t),r.BaseCustomElementBridge.__InitProperties(t,t);const e=this.METADATA.events;e&&this.InitializeActionCallbacks(t,e);const n=this._EXTENSION._WRITEBACK_PROPS;n&&this.InitializeWritebackCallbacks(n)}},InitializePrototype:function(t){r.BaseCustomElementBridge.proto.InitializePrototype.call(this,t),Object.defineProperty(t,"_propsProto",{value:{}})},initializeBridge:function(t,e){r.BaseCustomElementBridge.proto.initializeBridge.call(this,t,e),this._verifyingState=-1,this._EXTENSION=this.METADATA.extension||{},this._CONSTRUCTOR=e._CONSTRUCTOR,this._PROPS={},this._EVENT_QUEUE=[],t._propsProto&&(this._PROPS_PROXY=Object.create(t._propsProto),this._PROPS_PROXY._BRIDGE=this,this._PROPS_PROXY._ELEMENT=t),this._LIVE_CONTROLLED_PROPS={},this._VCOMP_CONTROLLED_PROPS={}},InitializeActionCallbacks:function(t,e){Object.keys(e).forEach(n=>{const o=e[n],i=l.AttributeUtils.eventTypeToEventListenerProperty(n);this._PROPS[i]=e=>{const i=Object.assign({},e),r=!!o.cancelable,s=[];r&&(i.accept=t=>{s.push(t)});const a={detail:i,bubbles:!!o.bubbles,cancelable:r},l=new CustomEvent(n,a),u=this._queueFireEventsTask(l,t);if(r)return u.then(()=>l.defaultPrevented?Promise.reject():Promise.all(s).then(()=>Promise.resolve(),t=>Promise.reject(t)))}})},InitializeWritebackCallbacks:function(t){t.forEach(t=>{const e=l.AttributeUtils.propertyNameToChangedCallback(t);this._PROPS[e]=e=>{this._PROPS_PROXY[t]=e}})},HandlePropertyChanged:function(t,e,n,o,i,r){this._queuePropertyChangedEvent(t,e,n,o,i,r)},ValidateAndSetProperty:function(t,e,n,o,i){var r=this.ValidatePropertySet(i,n,o);h.__SetProperty(t,e,n,r)},_mountCustomElement:function(t,e,n,o){this._content||(this._content=h._processSlotContent(t,o));var i=Object.assign({},this._LIVE_CONTROLLED_PROPS);e.mountContent(n,this._content,t,i)},_updateProperty:function(t,e,n,o,i){if(!this.SaveEarlyPropertySet(t,e,n)){var s=this._PROPS[e];if(!r.BaseCustomElementBridge.__CompareOptionValues(e,o,n,s)){let r=n;i&&(r=this.ValidatePropertySet(t,e,n)),void 0===r?delete this._PROPS[e]:this._PROPS[e]=r,this.State.dirtyProps.add(e),this._queuePropertyChangedEvent(t,e,r,s,i,null),t._vcomp&&!o.readOnly&&this._queueRender(t)}}},_queuePropertyChangedEvent:function(t,e,n,o,i,r){if(!this._SKIP_PROP_CHANGE_EVENT&&(!i||this.State.isComplete)){const s=i?"external":"internal",a=this._getPropertyChangedEvent(e,n,o,s,r);this._queueFireEventsTask(a,t)}},_queueFireEventsTask:function(t,e){if(this._EVENT_QUEUE.push(t),!this._eventsQueued){const t=a.getContext(e).getBusyContext().addBusyState({description:l.CustomElementUtils.getElementInfo(e)+" event queued."});this._eventsQueued=new Promise(n=>{window.queueMicrotask(function(){var o=this._EVENT_QUEUE.shift();try{for(;o;)e.dispatchEvent(o),o=this._EVENT_QUEUE.shift()}catch(t){throw t}finally{n(),t(),this._eventsQueued=null}}.bind(this))})}return this._eventsQueued},_getPropertyChangedEvent:function(t,e,n,o,i){var r={};return i&&(r.subproperty=i),r.value=e,r.previousValue=n,r.updatedFrom=o,new CustomEvent(t+"Changed",{detail:r})},_queueRender:function(t){t._vcomp.queueRender(t,"propsUpdate")},_getVComponentProps:function(){const t=s.DefaultsUtils.getStaticDefaults(this._CONSTRUCTOR,this.METADATA,!0);let e=Object.create(t);Object.assign(e,this._PROPS,this._VCOMP_CONTROLLED_PROPS);const n=this._EXTENSION._READ_ONLY_PROPS;return n&&n.forEach(t=>delete e[t]),e},_getCallbacks:function(t){return{getPropsForRender:()=>this._getVComponentProps(),patch:e=>{var n=Object.assign({},this._LIVE_CONTROLLED_PROPS);t._vcomp.patchContent(e,n,this._content),h._storeUnslottedNodes(t,this._slotVNodes)},convertChildrenToSlotProps:e=>{if(!this._slotProps){this._slotVNodes=e;var n=function(t,e,n){var o=e.slots||{};const i=n._DYNAMIC_SLOT,r=i?i.prop:null,s={};return t.forEach(function(t){var e=t.props?t.props.slot:"";let n=h._DEFAULT_SLOT_PROP;if(e&&(n=e in o?e:r),n===r){if(!r)return;s[n]||(s[n]={[e]:[]}),s[n][e]||(s[n][e]=[]),s[n][e].push(t)}else n&&(s[n]||(s[n]=[]),s[n].push(t))}),s}(e,this.METADATA,this._EXTENSION);this._slotProps=function(t,e,n,o){var i={};return Object.keys(e).forEach(r=>{var s=e[r];r===h._DEFAULT_SLOT_PROP?i[r]=s:Array.isArray(s)?i[r]=n[r].data?p(t,s):s:(i[r]||(i[r]={}),Object.keys(s).forEach(e=>{i[r][e]=o&&o.isTemplate?p(t,s[e]):s[e]}))}),i}(t,n,this.METADATA.slots,this._EXTENSION._DYNAMIC_SLOT)}return this._slotProps}}},_initializeControlledProps:function(t){var e=this._EXTENSION._ROOT_PROPS_MAP;if(e){var n=this._LIVE_CONTROLLED_PROPS,o=this._VCOMP_CONTROLLED_PROPS;Object.keys(e).forEach(function(e){var i=l.AttributeUtils.getGlobalAttrForProp(e);if(t.hasAttribute(i)){var r=t[e];n[e]=null!=r?r:t.getAttribute(i),o[e]=n[e]}})}},_getDefaultValue:function(t){return s.DefaultsUtils.getFrozenDefault(t,this._CONSTRUCTOR,this.METADATA)},_unmountAndReset:function(t){t._vcomp.notifyUnmounted(),this._bCreateCalled=!1,h._storeAllSlotContent(t,this._slotVNodes),t._vcomp=null},_initSlotMapAndRootProps:function(t){return this._slotMap||(r.Components&&r.Components.unmarkPendingSubtreeHidden(t),this._uniqueId=l.ElementUtils.getUniqueId(t.id),this._slotMap=l.CustomElementUtils.getSlotMap(t),this._initializeControlledProps(t),Object.defineProperty(t,"_vcomp",{writable:!0,value:null,enumerable:!1})),{slotMap:this._slotMap,uniqueId:this._uniqueId}}}),h.register=function(t,e){var n=e.metadata,o={};o[r.BaseCustomElementBridge.DESC_KEY_META]=n,o._CONSTRUCTOR=e;const i={descriptor:o,bridgeProto:h.proto,stateClass:_};l.CustomElementUtils.registerElement(t,i)&&customElements.define(t,h.proto.getClass(o))},h._processSlotContent=function(t,e){var n=[];if(t.childNodes){t._nodeStorage||(t._nodeStorage=document.createElement("div"),t._nodeStorage.style.display="none",t.appendChild(t._nodeStorage));var o=[];Object.entries(e).forEach(function(t){var e=t[0];t[1].forEach(function(t){n.push(d(t,e)),o.push(t)})}),o.forEach(function(e){t._nodeStorage.appendChild(e),r.Components&&r.Components.subtreeHidden(e)})}return n},h.__SetProperty=function(t,e,n,o){var i,s=e,a=n.split("."),l=t(a[0]);a.length>1&&!e[l]&&(s=i={});for(var u=0;u<a.length;u++){var c=t(a[u]),_=s[c];u===a.length-1?s[c]=o:_?Object.isFrozen(_)&&(s[c]=r.CollectionUtils.copyInto({},_,void 0,!0)):s[c]={},s=s[c]}i&&(e[l]=i[l])},h._storeUnslottedNodes=function(t,e){e&&t._nodeStorage&&e.forEach(function(e){var n=e._node;n.isConnected||(t._nodeStorage.appendChild(n),r.Components&&r.Components.subtreeHidden(n))})},h._storeAllSlotContent=function(t,e){e&&t._nodeStorage&&e.forEach(function(e){var n=e._node;t._nodeStorage.appendChild(n),r.Components&&r.Components.subtreeHidden(n)})},Object.defineProperty(e,"classPropToObject",{enumerable:!0,get:function(){return n.classPropToObject}}),Object.defineProperty(e,"dynamicDefault",{enumerable:!0,get:function(){return n.dynamicDefault}}),Object.defineProperty(e,"h",{enumerable:!0,get:function(){return n.h}}),Object.defineProperty(e,"listener",{enumerable:!0,get:function(){return n.listener}}),e.ElementVComponent=u,e.customElement=function(t){return function(e){const n=e.prototype.render;function i(t,e){var n,o=(null===(n=e.extension)||void 0===n?void 0:n._ROOT_PROPS_MAP)||{};return{class:!0,style:!0,ref:!0,key:!0}[t]||o[t]||l.AttributeUtils.isEventListenerProperty(t)}e.prototype.render=function(){let r=n.call(this);return r.type!==t&&(r=o.h(t,null,r)),function(t,e){for(var n in t)if(!i(n,e))throw new Error("Component can only render controlled global properties or DOM event listeners on the root custom element. "+n+" will not be rendered.")}(r.props,e.metadata),r},e.prototype.mount=function(t,e,n){this._vnode=this._renderForMount(t,e);const i=this._ref=o.mountCustomElement(this._vnode,n);return Object.defineProperty(i,"_vcomp",{value:this,enumerable:!1,writable:!0}),i},e.prototype.patch=function(t,e,n,i){const r=this.props,s=this.state,a=this._vnode;this._vnode=this._renderForPatch(t,e),this._vnode._node=this._ref,this._patching=!0;try{o.patchCustomElement(this._vnode,a,n,i)}finally{this._patching=!1}this.updated(r,s)},e.prototype.mountContent=function(t,e,n,i){this._isCustomElementFirst=!0,this._ref=n,this._vnode=this._renderForMount(t,e),this._vnode._node=n,this._patching=!0;try{o.mountCustomElementContent(this._vnode,i)}finally{this._patching=!1}},e.prototype.patchContent=function(t,e,n){const i=this.props,r=this.state,s=this._vnode;this._vnode=this._renderForPatch(t,n),this._vnode._node=this._ref,this._patching=!0;try{o.patchCustomElementContent(this._vnode,s,e)}finally{this._patching=!1}this.updated(i,r)},e.prototype.setCallbacks=function(t){this._callbacks=t},e.prototype.isCustomElementFirst=function(){return!0===this._isCustomElementFirst},e.prototype.isPatching=function(){return this._patching},e.prototype.notifyUnmounted=function(){this._cancelQueuedRender(),o.removeChildren(this._ref,this._vnode.content),this.isCustomElementFirst()&&o.removeListeners(this._ref,this._vnode.props),this.unmounted(),o.patchRef(this._vnode.ref,null)},h.register(t,e)}},e.event=function({bubbles:t}={bubbles:!1}){return(t,e)=>{}},e.flattenChildren=c,e.method=function(){return function(t,e,n){}},e.readOnly=function(t,e){},e.rootProperty=function(){return(t,e)=>{}},Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=ojvcomponent-element.js.map