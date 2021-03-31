/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["exports","ojs/ojcore-base","ojs/ojhtmlutils"],function(e,i,r){"use strict";i=i&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i;
/**
   * @license
   * Copyright (c) 2018 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
var t={};i._registerLegacyNamespaceProp("ModuleElementUtils",t),t.createView=function(e){return e&&e.viewPath?new Promise(function(i,r){(e.require?e.require:require)(["text!"+e.viewPath],i,r)}).then(t._processViewText):Promise.resolve([])},t._processViewText=function(e){return r.stringToNodeArray(e)},t.createViewModel=function(e){return e&&e.viewModelPath?new Promise(function(i,r){(e.require?e.require:require)([e.viewModelPath],i,r)}).then(function(i){var r=i;return r&&("always"===e.initialize||null!=e.params&&"never"!==e.initialize)&&("function"==typeof r?r=new r(e.params):"function"==typeof r.initialize&&r.initialize(e.params)),r}):Promise.resolve(null)},t.createConfig=function(e){if(!e||!e.name&&!e.viewPath)return Promise.resolve(null);var i=e.viewPath||"views/"+e.name+".html",r=e.viewModelPath||(e.name?"viewModels/"+e.name:null);return Promise.all([t.createView({viewPath:i,require:e.require}),t.createViewModel({viewModelPath:r,require:e.require,params:e.params,initialize:"always"})]).then(function(e){return{view:e[0],viewModel:e[1]}})};var a=t.createView,n=t.createViewModel,o=t.createConfig;e.createConfig=o,e.createView=a,e.createViewModel=n,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=ojmodule-element-utils.js.map