/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore-base","jquery","ojs/ojarraydataprovider","ojs/ojeventtarget"],function(e,t,r,a){"use strict";e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e,t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t,r=r&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r;
/**
     * @license
     * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
     * The Universal Permissive License (UPL), Version 1.0
     * as shown at https://oss.oracle.com/licenses/upl/
     * @ignore
     */
/**
     * @preserve Copyright 2013 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
class s{constructor(e,t,a){this.treeData=e,this.options=t,this._rootDataProvider=a,this.TreeAsyncIterator=class{constructor(e,t){this._parent=e,this._baseIterable=t}next(){let e=this;return this._baseIterable[Symbol.asyncIterator]().next().then(function(t){let r=t.value.metadata;for(let a=0;a<r.length;a++)r[a]=e._parent._getTreeMetadata(r[a],t.value.data[a]);return t})}},this.TreeAsyncIterable=class{constructor(e,t){this._parent=e,this._asyncIterator=t,this[Symbol.asyncIterator]=function(){return this._asyncIterator}}},this._baseDataProvider=new r(e,t),this._mapKeyToNode=new Map,this._mapNodeToKey=new Map,this._mapArrayToSequenceNum=new Map,this._mapKoArrayToSubscriptions=new Map,this._mapKeyToParentNodePath=new Map,null==a&&(this._parentNodePath=[],this._processTreeArray(e,[]))}containsKeys(e){return this.fetchByKeys(e).then(function(t){let r=new Set;return e.keys.forEach(function(e){null!=t.results.get(e)&&r.add(e)}),Promise.resolve({containsParameters:e,results:r})})}getCapability(e){return this._baseDataProvider.getCapability(e)}getTotalSize(){return this._baseDataProvider.getTotalSize()}isEmpty(){return this._baseDataProvider.isEmpty()}createOptimizedKeySet(e){return this._baseDataProvider.createOptimizedKeySet(e)}createOptimizedKeyMap(e){return this._baseDataProvider.createOptimizedKeyMap(e)}getChildDataProvider(e,t){let r=this._getNodeForKey(e);if(r){let t=this._getChildren(r);if(t){let r=new s(t,this.options,this._getRootDataProvider());if(null!=r){let t=this._getRootDataProvider();r._parentNodePath=t._mapKeyToParentNodePath.get(JSON.stringify(e))}return r}}return null}fetchFirst(e){if(e&&e.filterCriterion){let r=t.extend({},e);r.filterCriterion=this._getLeafNodeFilter(r.filterCriterion),r.filterCriterion.filter=e.filterCriterion.filter,e=r}let r=this._baseDataProvider.fetchFirst(e);return new this.TreeAsyncIterable(this,new this.TreeAsyncIterator(this,r))}fetchByOffset(e){let t=this._baseDataProvider.fetchByOffset(e),r=this;return t.then(function(e){let t=e.results,a=[];for(let e=0;e<t.length;e++){let s=t[e].metadata,i=t[e].data;s=r._getTreeMetadata(s,i),a.push({data:i,metadata:s})}return{done:e.done,fetchParameters:e.fetchParameters,results:a}})}fetchByKeys(e){let t=this,r=new Map;return e.keys.forEach(function(e){let a=t._getNodeForKey(e);a&&r.set(e,{metadata:{key:e},data:a})}),Promise.resolve({fetchParameters:e,results:r})}_getChildren(e){let t=this.options&&this.options.childrenAttribute?this.options.childrenAttribute:"children";return this._getVal(e,t,!0)}_getRootDataProvider(){return this._rootDataProvider?this._rootDataProvider:this}_subscribeObservableArray(t,r){if("function"!=typeof t||!t.subscribe||void 0===t.destroyAll)throw new Error("Invalid data type. ArrayTreeDataProvider only supports Array or observableArray.");var a=this,s=null,i=new Array(2);i[0]=t.subscribe(function(i){let o,n,l,u=[],d=[],h=[],y=[],p=[],c=null,_=null,f=null,g=[];for(o=0;o<i.length;o++){l=i[o].index,status=i[o].status;let t=a._getId(i[o].value);if(t)for(n=0;n<i.length;n++)if(n!=o&&l===i[n].index&&status!==i[n].status&&p.indexOf(o)<0&&g.indexOf(o)<0){let r=a._getId(i[n].value);e.Object.compareValues(t,r)&&("deleted"===status?(g.push(o),p.push(n),a._releaseNode(i[o].value)):(g.push(n),p.push(o)))}}for(o=0;o<i.length;o++)if("deleted"===i[o].status&&p.indexOf(o)<0&&g.indexOf(o)<0){let e=i[o].value,t=a._getKeyForNode(e);d.push(t),u.push(e),h.push(i[o].index),a._releaseNode(e)}if(d.length>0){y=d.map(function(e){return{key:e}});let e=new Set;d.map(function(t){e.add(t)}),f={data:u,indexes:h,keys:e,metadata:y}}u=[],d=[],h=[],y=[];let b=t(),v=[],m=[],A=[],P=[];for(o=0;o<i.length;o++)if("added"===i[o].status&&g.indexOf(o)<0){let e=i[o].value,s=a._processNode(e,r,t);p.indexOf(o)<0?(d.push(s.key),u.push(e),h.push(i[o].index),y.push({key:s.key})):(v.push(s.key),m.push(e),A.push(i[o].index),P.push({key:s.key}))}if(d.length>0){let e=new Set;d.map(function(t){e.add(t)});let t,s=new Set,i=[],o=[];t=a.options&&a.options.keyAttributes&&"siblings"!==a.options.keyAttributesScope?r.length>0?r[r.length-1]:null:r.length>0?r:null,h.map(function(e){let r;r=e>=b.length-1?null:a._getKeyForNode(b[e+1]),s.add(r),i.push(r),o.push(t)}),_={afterKeys:s,addBeforeKeys:i,parentKeys:o,data:u,indexes:h,keys:e,metadata:y}}if(v.length>0){let e=new Set;v.map(function(t){e.add(t)}),c={data:m,indexes:A,keys:e,metadata:P}}s=new e.DataProviderMutationEvent({add:_,remove:f,update:c})},null,"arrayChange"),i[1]=t.subscribe(function(t){s?a.dispatchEvent(s):(a._flushMaps(),a._processTreeArray(a.treeData,[]),a.dispatchEvent(new e.DataProviderRefreshEvent)),s=null},null,"change"),this._mapKoArrayToSubscriptions.set(t,i)}_flushMaps(){let e=this._getRootDataProvider(),t=this;e._mapKeyToNode.clear(),e._mapNodeToKey.clear(),e._mapArrayToSequenceNum.clear(),e._mapKoArrayToSubscriptions.forEach(function(e,r){t._unsubscribeObservableArray(r)})}_unsubscribeObservableArray(e){if("function"==typeof e&&e.subscribe&&void 0!==e.destroyAll){var t=this._mapKoArrayToSubscriptions.get(e);t&&(t[0].dispose(),t[1].dispose(),this._mapKoArrayToSubscriptions.delete(e))}}_processTreeArray(e,t){let r,a=this;e instanceof Array?r=e:(this._subscribeObservableArray(e,t),r=e()),r.forEach(function(r,s){a._processNode(r,t,e)})}_releaseTreeArray(e){let t,r=this;e instanceof Array?t=e:(this._unsubscribeObservableArray(e),t=e()),t.forEach(function(e,t){r._releaseNode(e)})}_processNode(e,t,r){let a=this,s=a._createKeyObj(e,t,r);a._setMapEntry(s.key,e),this._getRootDataProvider()._mapKeyToParentNodePath.set(JSON.stringify(s.key),s.keyPath);let i=a._getChildren(e);return i&&a._processTreeArray(i,s.keyPath),s}_releaseNode(e){let t=this,r=this._getKeyForNode(e);t._deleteMapEntry(r,e);let a=t._getChildren(e);a&&t._releaseTreeArray(a)}_createKeyObj(e,t,r){let a=this._getId(e),s=t?t.slice():[];return null==a?(this._setUseIndexAsKey(!0),s.push(this._incrementSequenceNum(r)),a=s):(s.push(a),this.options&&"siblings"==this.options.keyAttributesScope&&(a=s)),{key:a,keyPath:s}}_getId(e){let t,r=null!=this.options?this.options.keyAttributes:null;if(null!=r){var a;if(Array.isArray(r))for(t=[],a=0;a<r.length;a++)t[a]=this._getVal(e,r[a]);else t="@value"==r?this._getAllVals(e):this._getVal(e,r);return t}return null}_getVal(e,t,r){if("string"==typeof t){let r=t.indexOf(".");if(r>0){let a=t.substring(0,r),s=t.substring(r+1),i=e[a];if(i)return this._getVal(i,s)}}return!0!==r&&"function"==typeof e[t]?e[t]():e[t]}_getAllVals(e){let t=this;return Object.keys(e).map(function(r){return t._getVal(e,r)})}_getNodeMetadata(e){return{key:this._getKeyForNode(e)}}_getNodeForKey(e){return this._getRootDataProvider()._mapKeyToNode.get(JSON.stringify(e))}_getKeyForNode(e){return this._getRootDataProvider()._mapNodeToKey.get(e)}_setMapEntry(e,t){let r=this._getRootDataProvider();r._mapKeyToNode.set(JSON.stringify(e),t),r._mapNodeToKey.set(t,e)}_deleteMapEntry(e,t){let r=this._getRootDataProvider();r._mapKeyToNode.delete(JSON.stringify(e)),r._mapNodeToKey.delete(t)}_incrementSequenceNum(e){let t=this._getRootDataProvider(),r=t._mapArrayToSequenceNum.get(e)||0;return t._mapArrayToSequenceNum.set(e,r+1),r}_getUseIndexAsKey(){return this._getRootDataProvider()._useIndexAsKey}_setUseIndexAsKey(e){return this._getRootDataProvider()._useIndexAsKey=e}_getLeafNodeFilter(e){let t=e,r=this.options&&this.options.childrenAttribute?this.options.childrenAttribute:"children";return{op:"$or",criteria:[t,{op:"$and",criteria:[{op:"$ne",attribute:r,value:null},{op:"$ne",attribute:r,value:void 0}]}]}}_getTreeMetadata(e,t){let r=this,a=!1,s=e.key;return(null==r.options||null==r.options.keyAttributes||"siblings"==r.options.keyAttributesScope||"@index"==r.options.keyAttributes||r._getUseIndexAsKey())&&(a=!0),a&&(s=r._parentNodePath?r._parentNodePath.slice():[],s.push(e.key)),e=r._getNodeMetadata(r._getNodeForKey(s))}}return a.EventTargetMixin.applyMixin(s),e._registerLegacyNamespaceProp("ArrayTreeDataProvider",s),s});
//# sourceMappingURL=ojarraytreedataprovider.js.map