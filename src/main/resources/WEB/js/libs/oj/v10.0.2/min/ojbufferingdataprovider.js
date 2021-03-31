/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore-base","ojs/ojdataprovider","ojs/ojeventtarget","ojs/ojmap","ojs/ojset","ojs/ojcomponentcore"],function(t,e,a,i,s,r){"use strict";t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t,i=i&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i,s=s&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s;
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
class d{constructor(){this.unsubmittedItems=new i,this.submittingItems=new i}addItem(e){let a=this.unsubmittedItems.get(e.metadata.key),i=this.submittingItems.get(e.metadata.key);if(a&&("add"===a.operation||"update"===a.operation)||i&&("add"===i.operation||"update"===i.operation))throw new Error("Cannot add item with same key as an item being added or updated");a&&"remove"===a.operation?a.item.data&&t.Object.compareValues(a.item.data,e.data)?this.unsubmittedItems.delete(e.metadata.key):this.unsubmittedItems.set(e.metadata.key,{operation:"update",item:e}):this.unsubmittedItems.set(e.metadata.key,{operation:"add",item:e})}removeItem(t){let e=this.unsubmittedItems.get(t.metadata.key),a=this.submittingItems.get(t.metadata.key);if(e&&"remove"===e.operation||a&&"remove"===a.operation)throw new Error("Cannot remove item with same key as an item being removed");e&&"add"===e.operation?this.unsubmittedItems.delete(t.metadata.key):(e&&e.operation,this.unsubmittedItems.set(t.metadata.key,{operation:"remove",item:t}))}updateItem(t){let e=this.unsubmittedItems.get(t.metadata.key),a=this.submittingItems.get(t.metadata.key);if(e&&"remove"===e.operation||a&&"remove"===a.operation)throw new Error("Cannot update item with same key as an item being removed");!e||"add"!==e.operation&&"update"!==e.operation?this.unsubmittedItems.set(t.metadata.key,{operation:"update",item:t}):this.unsubmittedItems.set(t.metadata.key,{operation:e.operation,item:t})}setItemStatus(t,e,a){const i=t.item.metadata.key;if("submitting"===e)this.unsubmittedItems.delete(i),this.submittingItems.set(i,t);else if("submitted"===e)this.submittingItems.delete(i);else if("unsubmitted"===e){let e;this.submittingItems.delete(i),e=a?{operation:t.operation,item:{data:t.item.data,metadata:{key:t.item.metadata.key,message:a}}}:t,this.unsubmittedItems.set(i,e)}}getUnsubmittedItems(){return this.unsubmittedItems}getSubmittingItems(){return this.submittingItems}isEmpty(){return 0===this.unsubmittedItems.size&&0===this.submittingItems.size}getItem(t){let e=this.unsubmittedItems.get(t);return e||(e=this.submittingItems.get(t)),e}}class n extends t.GenericEvent{constructor(t){let e={};e.detail=t,super("submittableChange",e)}}class o{constructor(t,e){this.dataProvider=t,this.options=e,this.AsyncIterable=class{constructor(t,e){this._parent=t,this._asyncIterator=e,this[Symbol.asyncIterator]=function(){return this._asyncIterator}}},this.AsyncIterator=class{constructor(t,e,a){this._parent=t,this._baseIterator=e,this._params=a,this.itemArray=[],this.firstBaseKey=null,this.mergedAddKeySet=new s,this.mergedRemoveKeySet=new s,this.mergedMetadataArray=[],this.mergedDataArray=[]}_fetchNext(){return this._baseIterator.next().then(t=>{!this.firstBaseKey&&t.value.metadata.length&&(this.firstBaseKey=t.value.metadata[0].key),t.value.fetchParameters&&t.value.fetchParameters.sortCriteria&&(this._parent.lastSortCriteria=t.value.fetchParameters.sortCriteria);if(!this._parent.editBuffer.isEmpty()){let e=t.value.data.map((e,a)=>({data:t.value.data[a],metadata:t.value.metadata[a]})),a=this.itemArray.slice();this.itemArray=[],this._parent._mergeEdits(e,a,this._params.filterCriterion,this._parent.lastSortCriteria,!0,this.mergedAddKeySet,t.done);const i=this._params||{};if((i.size&&a.length<i.size||null==i.size&&0===a.length)&&!t.done)return this.itemArray=a,this._fetchNext();i.size&&a.length>i.size&&(this.itemArray=a.splice(i.size));const s=t.done&&0===this.itemArray.length;let r=a.map(t=>t.data),d=a.map(t=>t.metadata);return{done:s,value:{fetchParameters:this._params,data:r,metadata:d}}}return t})}next(){return this._fetchNext().then(t=>{const e=t.value.metadata,a=t.value.data;for(let t=0;t<e.length;t++)this.mergedMetadataArray.push(e[t]),this.mergedDataArray.push(a[t]);return t})}},this._addEventListeners(t),this.editBuffer=new d,this.lastSortCriteria=null,this.lastIterator=null}_fetchByKeysFromBuffer(t){let e=new i,a=new s;return t.keys.forEach(t=>{const i=this.editBuffer.getItem(t);if(i)switch(i.operation){case"add":case"update":e.set(t,i.item)}else a.add(t)}),{results:e,unresolvedKeys:a}}_compareItem(t,e,a){for(let i=0;i<a.length;i++){if(t[a[i].attribute]>e[a[i].attribute])return"ascending"===a[i].direction?1:-1;if(t[a[i].attribute]<e[a[i].attribute])return"ascending"===a[i].direction?-1:1}return 0}_insertAddEdits(t,e,a,i,s,r){t.forEach((t,d)=>{if("add"===t.operation&&!s.has(d)&&(!e||e.filter(t.item.data)))if(a&&a.length){let e=!1;for(let r=0;r<i.length;r++)if(this._compareItem(t.item.data,i[r].data,a)<0){i.splice(r,0,t.item),s.add(d),e=!0;break}!e&&r&&(i.push(t.item),s.add(d))}else i.push(t.item),s.add(d)})}_mergeAddEdits(t,e,a,i,s){this._insertAddEdits(this.editBuffer.getUnsubmittedItems(),t,e,a,i,s),this._insertAddEdits(this.editBuffer.getSubmittingItems(),t,e,a,i,s)}_mergeEdits(t,a,i,s,r,d,n){let o;i&&(o=i.filter?i:e.FilterFactory.getFilter({filterDef:i,filterOptions:this.options})),!r||s&&s.length||this._mergeAddEdits(o,s,a,d,n);for(let e=0;e<t.length;e++){let i=t[e],s=this.editBuffer.getItem(i.metadata.key);s?"remove"===s.operation||"update"===s.operation&&(o&&!o.filter(s.item.data)||a.push(s.item)):a.push(i)}s&&s.length&&this._mergeAddEdits(o,s,a,d,n)}_fetchFromOffset(t,e){return this.dataProvider.fetchByOffset(t).then(a=>{if(!this.editBuffer.isEmpty()){const i=a.results;let r=null;if(r=a.fetchParameters&&a.fetchParameters.sortCriteria?a.fetchParameters.sortCriteria:t.sortCriteria,this._mergeEdits(i,e,t.filterCriterion,r,0===t.offset,new s,a.done),(t.size&&e.length<t.size||null==t.size&&0===e.length)&&!a.done){const i={attributes:t.attributes,clientId:t.clientId,filterCriterion:t.filterCriterion,offset:t.offset+a.results.length,size:t.size,sortCriteria:t.sortCriteria};return this._fetchFromOffset(i,e)}return t.size&&e.length>t.size&&e.splice(t.size),{fetchParameters:t,results:e,done:a.done}}return a})}containsKeys(t){let e=this._fetchByKeysFromBuffer(t),a=e.unresolvedKeys,i=new s;return e.results.forEach((t,e)=>{i.add(e)}),0===a.size?Promise.resolve({containsParameters:t,results:i}):this.dataProvider.containsKeys({attributes:t.attributes,keys:a,scope:t.scope}).then(e=>i.size>0?(e.results.forEach((t,e)=>{i.add(e)}),{containsParameters:t,results:i}):e)}fetchByKeys(t){let e=this._fetchByKeysFromBuffer(t),a=e.unresolvedKeys,i=e.results;return 0===a.size?Promise.resolve({fetchParameters:t,results:i}):this.dataProvider.fetchByKeys({attributes:t.attributes,keys:a,scope:t.scope}).then(e=>i.size>0?(e.results.forEach((t,e)=>{i.set(e,t)}),{fetchParameters:t,results:i}):e)}fetchByOffset(t){return this._fetchFromOffset(t,[])}fetchFirst(t){this.lastSortCriteria=t?t.sortCriteria:null;const e=this.dataProvider.fetchFirst(t)[Symbol.asyncIterator]();return this.lastIterator=new this.AsyncIterator(this,e,t),new this.AsyncIterable(this,this.lastIterator)}getCapability(t){return this.dataProvider.getCapability(t)}_calculateSizeChange(t){let e=0;return t.forEach((t,a)=>{"add"===t.operation?++e:"remove"===t.operation&&--e}),e}getTotalSize(){return this.dataProvider.getTotalSize().then(t=>(t>-1&&(t+=this._calculateSizeChange(this.editBuffer.getSubmittingItems()),t+=this._calculateSizeChange(this.editBuffer.getUnsubmittedItems())),t))}isEmpty(){const t=this.editBuffer.getUnsubmittedItems(),e=this.editBuffer.getSubmittingItems();t.forEach((t,e)=>{if("add"===t.operation||"update"===t.operation)return"no"}),e.forEach((t,e)=>{if("add"===t.operation||"update"===t.operation)return"no"});let a=this.dataProvider.isEmpty();return"no"===a&&(t.size>0||e.size>0)?"unknown":a}_addToMergedArrays(t){let e=null;if(this.lastIterator){const a=this.lastSortCriteria;if(a&&a.length){let i=this.lastIterator.mergedMetadataArray,s=this.lastIterator.mergedDataArray,r=this.lastIterator.mergedRemoveKeySet;for(let d=0;d<s.length;d++)if(this._compareItem(t.data,s[d],a)<0&&!r.has(i[d].key)){e=i[d].key,i.splice(d,0,t.metadata),s.splice(d,0,t.data);break}}else e=this.lastIterator.firstBaseKey}return e}addItem(t){this.editBuffer.addItem(t);let a=this._addToMergedArrays(t);const i={add:{data:[t.data],keys:(new s).add(t.metadata.key),metadata:[t.metadata],addBeforeKeys:[a]}},r=new e.DataProviderMutationEvent(i);this.dispatchEvent(r),this._dispatchSubmittableChangeEvent()}_removeFromMergedArrays(e){if(this.lastIterator){let a=this.lastIterator.mergedMetadataArray,i=this.lastIterator.mergedDataArray,s=this.lastIterator.mergedAddKeySet,r=this.lastIterator.mergedRemoveKeySet;const d=this._findKeyInMetadata(e,a);if(-1!==d&&(s.has(e)?(a.splice(d,1),i.splice(d,1),s.delete(e)):r.add(e),t.KeyUtils.equals(this.lastIterator.firstBaseKey,e)&&(this.lastIterator.firstBaseKey=null,a.length>d)))for(let t=d;t<a.length;t++){let e=a[t].key;if(!r.has(e)){this.lastIterator.firstBaseKey=e;break}}}}removeItem(t){this.editBuffer.removeItem(t),this._removeFromMergedArrays(t.metadata.key);const a={remove:{data:t.data?[t.data]:null,keys:(new s).add(t.metadata.key),metadata:[t.metadata]}},i=new e.DataProviderMutationEvent(a);this.dispatchEvent(i),this._dispatchSubmittableChangeEvent()}updateItem(t){this.editBuffer.updateItem(t);const a={update:{data:[t.data],keys:(new s).add(t.metadata.key),metadata:[t.metadata]}},i=new e.DataProviderMutationEvent(a);this.dispatchEvent(i),this._dispatchSubmittableChangeEvent()}getSubmittableItems(){const t=this.editBuffer.getUnsubmittedItems(),e=this.editBuffer.getSubmittingItems();let a=[];return t.forEach((t,i)=>{e.has(i)||a.push(t)}),a}resetAllUnsubmittedItems(){this.editBuffer.getUnsubmittedItems().clear(),this._dispatchSubmittableChangeEvent(),this.dispatchEvent(new e.DataProviderRefreshEvent)}_addEventDetail(t,e,a,i){null==t[e]&&(t[e]="add"===e?{data:[],keys:new s,metadata:[],addBeforeKeys:[]}:{data:[],keys:new s,metadata:[]}),t[e].keys.add(a.metadata.key),t[e].data.push(a.data),t[e].metadata.push(a.metadata),"add"===e&&t[e].addBeforeKeys.push(i)}resetUnsubmittedItem(t){const a=this.editBuffer.getUnsubmittedItems();let r=new s,d=new i;const n=a.get(t);n&&(r.add(t),d.set(t,n),a.delete(t)),this._dispatchSubmittableChangeEvent(),this.dataProvider.fetchByKeys({keys:r}).then(t=>{let a,i={};d.forEach((e,s)=>{if("add"===e.operation)this._addEventDetail(i,"remove",e.item);else if("remove"===e.operation){if(a=t.results.get(s),a){let t=null;if(this.lastIterator){let e=this.lastIterator.mergedMetadataArray,a=this.lastIterator.mergedRemoveKeySet;const i=this._findKeyInMetadata(s,e);if(-1!==i)for(let s=i+1;s<e.length;s++)if(!a.has(e[s].key)){t=e[s].key;break}}this._addEventDetail(i,"add",a,t)}}else a=t.results.get(s),a?this._addEventDetail(i,"update",a):this._addEventDetail(i,"remove",e.item)}),this.dispatchEvent(new e.DataProviderMutationEvent(i))})}setItemStatus(t,e,a){t&&(this.editBuffer.setItemStatus(t,e,a),this._dispatchSubmittableChangeEvent())}_dispatchSubmittableChangeEvent(){const t=this.getSubmittableItems(),e=new n(t);this.dispatchEvent(e)}_findKeyInMetadata(e,a){if(a)for(let i=0;i<a.length;i++)if(t.KeyUtils.equals(e,a[i].key))return i;return-1}_initDetailProp(t,e,a,i){t[a]&&(e[a]=i)}_pushDetailProp(t,e,a,i){t[a]&&e[a].push(t[a][i])}_getOperationDetail(t,e){if(t){let a={};const i=this.editBuffer.getSubmittingItems(),r=this.editBuffer.getUnsubmittedItems();if(0!==i.size||0!==r.size)return a.keys=new s,this._initDetailProp(t,a,"data",[]),this._initDetailProp(t,a,"metadata",[]),this._initDetailProp(t,a,"addBeforeKeys",[]),this._initDetailProp(t,a,"parentKeys",[]),t.keys.forEach(s=>{let d=null!=i.get(s);if(!d){const t=r.get(s);d=t&&"remove"===t.operation}if(!d&&(a.keys.add(s),t.metadata)){let e=this._findKeyInMetadata(s,t.metadata);e>-1&&(this._pushDetailProp(t,a,"data",e),this._pushDetailProp(t,a,"metadata",e),this._pushDetailProp(t,a,"addBeforeKeys",e),this._pushDetailProp(t,a,"parentKeys",e))}if(e){const t=r.get(s);!t||"remove"!==t.operation&&"update"!==t.operation||r.delete(s)}}),a;this._initDetailProp(t,a,"data",t.data),this._initDetailProp(t,a,"metadata",t.metadata),this._initDetailProp(t,a,"addBeforeKeys",t.addBeforeKeys),this._initDetailProp(t,a,"parentKeys",t.parentKeys)}return t}_handleRefreshEvent(t){let e=this.editBuffer.getUnsubmittedItems(),a=new s;e.forEach(t=>{"remove"!==t.operation&&"update"!==t.operation||a.add(t.item.metadata.key)}),a.size>0?this.dataProvider.fetchByKeys({keys:a}).then(i=>{i.results.forEach((t,e)=>{a.delete(e)}),a.forEach(t=>{e.delete(t)}),this.dispatchEvent(t)}):this.dispatchEvent(t)}_handleMutateEvent(t){t.detail.remove&&t.detail.remove.keys.forEach(t=>{this._removeFromMergedArrays(t)});const a=t.detail.add;a&&a.metadata&&a.data&&a.metadata.forEach((t,e)=>{this._addToMergedArrays({metadata:a.metadata[e],data:a.data[e]})});let i={add:this._getOperationDetail(t.detail.add,!1),remove:this._getOperationDetail(t.detail.remove,!0),update:this._getOperationDetail(t.detail.update,!1)};this.dispatchEvent(new e.DataProviderMutationEvent(i))}_addEventListeners(t){t[o._ADDEVENTLISTENER](o._REFRESH,this._handleRefreshEvent.bind(this)),t[o._ADDEVENTLISTENER](o._MUTATE,this._handleMutateEvent.bind(this))}}return o._REFRESH="refresh",o._MUTATE="mutate",o._ADDEVENTLISTENER="addEventListener",a.EventTargetMixin.applyMixin(o),t._registerLegacyNamespaceProp("BufferingDataProvider",o),o});
//# sourceMappingURL=ojbufferingdataprovider.js.map