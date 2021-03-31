/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore-base","jquery","ojs/ojcomponentcore","ojs/ojdvt-base","ojs/ojtimeaxis-toolkit","ojs/ojlocaledata","ojs/ojconverter-datetime","ojs/ojconverterutils-i18n","ojs/ojconverter-number"],function(e,t,n,r,o,s,i,a,l){"use strict";
/**
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */var m;e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e,t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t,(m={properties:{converter:{type:"object",properties:{days:{type:"object"},default:{type:"object"},hours:{type:"object"},minutes:{type:"object"},months:{type:"object"},quarters:{type:"object"},seconds:{type:"object"},weeks:{type:"object"},years:{type:"object"}}},end:{type:"string",value:""},scale:{type:"string",enumValues:["days","hours","minutes","months","quarters","seconds","weeks","years"]},start:{type:"string",value:""},trackResize:{type:"string",enumValues:["off","on"],value:"on"},translations:{type:"object",value:{},properties:{componentName:{type:"string"},labelAndValue:{type:"string"},labelClearSelection:{type:"string"},labelCountWithTotal:{type:"string"},labelDataVisualization:{type:"string"},labelInvalidData:{type:"string"},labelNoData:{type:"string"},stateCollapsed:{type:"string"},stateDrillable:{type:"string"},stateExpanded:{type:"string"},stateHidden:{type:"string"},stateIsolated:{type:"string"},stateMaximized:{type:"string"},stateMinimized:{type:"string"},stateSelected:{type:"string"},stateUnselected:{type:"string"},stateVisible:{type:"string"}}}},methods:{getProperty:{},refresh:{},setProperties:{},setProperty:{},getNodeBySubId:{},getSubIdByNode:{}},extension:{}}).extension._WIDGET_NAME="ojTimeAxis",e.CustomElementBridge.register("oj-time-axis",{metadata:m}),
/**
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
/**
   * @license
   * Copyright (c) 2016 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
e.__registerWidget("oj.ojTimeAxis",t.oj.dvtBaseComponent,{widgetEventPrefix:"oj",options:{converter:{default:null,seconds:new i.IntlDateTimeConverter({hour:"numeric",minute:"2-digit",second:"2-digit"}),minutes:new i.IntlDateTimeConverter({hour:"numeric",minute:"2-digit"}),hours:new i.IntlDateTimeConverter({hour:"numeric"}),days:new i.IntlDateTimeConverter({month:"numeric",day:"2-digit"}),weeks:new i.IntlDateTimeConverter({month:"numeric",day:"2-digit"}),months:new i.IntlDateTimeConverter({month:"long"}),quarters:new i.IntlDateTimeConverter({month:"long"}),years:new i.IntlDateTimeConverter({year:"numeric"})},start:"",end:"",scale:null},_ComponentCreate:function(){this._super(),this._SetLocaleHelpers(l,a)},_CreateDvtComponent:function(e,t,n){return o.TimeAxis.newInstance(e,t,n)},_GetComponentStyleClasses:function(){var e=this._super();return e.push("oj-timeaxis"),e},_GetChildStyleClasses:function(){var e=this._super();return e["oj-timeaxis-label"]={path:"labelStyle",property:"TEXT"},e},_GetEventTypes:function(){return["optionChange"]},_GetComponentRendererOptions:function(){return[]},_ProcessOptions:function(){this._super();var e=this,t=function(t){var n=typeof e.options[t];"number"!==n&&"string"!==n&&(e.options[t]=null)};t("start"),t("end")},_LoadResources:function(){null==this.options._resources&&(this.options._resources={});var e=this.options._resources,t=new i.IntlDateTimeConverter({hour:"numeric",minute:"2-digit",second:"2-digit"}),n=new i.IntlDateTimeConverter({hour:"numeric",minute:"2-digit"}),r=new i.IntlDateTimeConverter({hour:"numeric"}),o=new i.IntlDateTimeConverter({month:"numeric",day:"2-digit"}),a=new i.IntlDateTimeConverter({month:"long"}),l=new i.IntlDateTimeConverter({year:"numeric"}),m=new i.IntlDateTimeConverter({month:"short"}),u={seconds:t,minutes:n,hours:r,days:o,weeks:o,months:a,quarters:a,years:l},p={seconds:t,minutes:n,hours:r,days:o,weeks:o,months:m,quarters:m,years:new i.IntlDateTimeConverter({year:"2-digit"})};e.defaultDateTimeConverter=new i.IntlDateTimeConverter({formatType:"datetime",dateFormat:"medium",timeFormat:"medium"}),e.defaultDateConverter=new i.IntlDateTimeConverter({formatType:"date",dateFormat:"medium"}),e.converter=u,e.converterVert=p,e.axisClass="oj-timeaxis-container",e.axisLabelClass="oj-timeaxis-label",e.axisSeparatorClass="oj-timeaxis-separator",e.borderTopVisible=!1,e.borderRightVisible=!1,e.borderBottomVisible=!1,e.borderLeftVisible=!1,e.firstDayOfWeek=s.getFirstDayOfWeek()}})});
//# sourceMappingURL=ojtimeaxis.js.map