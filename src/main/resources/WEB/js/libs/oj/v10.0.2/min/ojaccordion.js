/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore-base","jquery","ojs/ojlogger","ojs/ojcomponentcore","ojs/ojcollapsible"],function(e,t,o,i,l){"use strict";e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e,t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;
/**
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */
var a={properties:{expanded:{type:"Array<string>|Array<number>|Array<Object>",writeback:!0},multiple:{type:"boolean",value:!1},translations:{type:"object",value:{}}},methods:{getProperty:{},refresh:{},setProperties:{},setProperty:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojBeforeCollapse:{},ojBeforeExpand:{},ojCollapse:{},ojExpand:{}},extension:{}};a.extension._WIDGET_NAME="ojAccordion",a.extension._TRACK_CHILDREN="nearestCustomElement",e.CustomElementBridge.register("oj-accordion",{metadata:a}),e.__registerWidget("oj.ojAccordion",t.oj.baseComponent,{widgetEventPrefix:"oj",options:{multiple:!1,expanded:null,beforeExpand:null,expand:null,beforeCollapse:null,collapse:null},_ComponentCreate:function(){this._super(),this.element.addClass("oj-accordion oj-component").attr("role","group"),this.options.expanded=this._expandedIndexToId(this.options.expanded),this._refresh()},_NotifyContextMenuGesture:function(e,t,o){this._OpenContextMenu(t,o,{launcher:this.element.find(".oj-collapsible-header-icon").first()})},_destroy:function(){this.element.removeClass("oj-accordion oj-component").removeAttr("role"),this.element.children().removeClass("oj-accordion-collapsible"),this.element.children(".oj-accordion-created").removeClass("oj-accordion-created").ojCollapsible("destroy")},_setOption:function(e,t,o){if("multiple"===e)!t&&this.options.multiple&&this.element.children(".oj-expanded").first().siblings(".oj-collapsible").ojCollapsible("collapse",!1);else if("expanded"===e)return void this._setExpandedOption(t);this._super(e,t,o)},refresh:function(){this._super(),this._refresh()},_refresh:function(){this._makeCollapsible(),this._internalSetExpanded=!0,this._setExpandedOption(this.options.expanded),this._internalSetExpanded=!1,this._setupEvents()},_makeCollapsible:function(){this.collapsibles=this.element.children().not("oj-menu"),this._IsCustomElement()?this.collapsibles.not("oj-collapsible").ojCollapsible({expandArea:"header"}).addClass("oj-accordion-created").attr("data-oj-internal",""):(this.element.children(":oj-collapsible").each(function(){t(this).ojCollapsible("option","expandArea","header")}),this.collapsibles.not(":oj-ojCollapsible").ojCollapsible({expandArea:"header"}).addClass("oj-accordion-created").attr("data-oj-internal","")),this.collapsibles.addClass("oj-accordion-collapsible")},_setupEvents:function(){var e;e=this._IsCustomElement()?{keydown:this._keydown,ojBeforeExpand:this._beforeExpandHandler,ojExpand:this._expandHandler,ojBeforeCollapse:this._beforeCollapseHandler,ojCollapse:this._collapseHandler}:{keydown:this._keydown,ojbeforeexpand:this._beforeExpandHandler,ojexpand:this._expandHandler,ojbeforecollapse:this._beforeCollapseHandler,ojcollapse:this._collapseHandler},this._off(this.collapsibles),this._on(this.collapsibles,e)},_keydown:function(e){if(!e.altKey&&!e.ctrlKey&&(t(e.target).hasClass("oj-collapsible-header")||t(e.target).hasClass("oj-collapsible-header-icon"))){var o=t.ui.keyCode,i=this.collapsibles.not(".oj-disabled"),l=i.length,a=t(e.target).closest(".oj-collapsible"),n=i.index(a),s=!1;if(n>=0)switch(e.keyCode){case o.RIGHT:case o.DOWN:s=i[(n+1)%l];break;case o.LEFT:case o.UP:s=i[(n-1+l)%l];break;case o.HOME:s=i[0];break;case o.END:s=i[l-1]}s&&(a&&t(a).trigger("ojfocusout"),t(s).trigger("ojfocus"),e.preventDefault())}},_findTargetSiblings:function(e){if(!this.options.multiple){var o=t(e.target).closest(".oj-collapsible");if(o.parent().is(":oj-ojAccordion"))return o.siblings(".oj-collapsible.oj-expanded").map(function(){return t(this).data("oj-ojCollapsible")})}return t()},_beforeExpandHandler:function(e,o){if(!this._isTargetMyCollapsible(e))return!0;var i;this._expandTarget=t(e.target);var l=null;if(this._findTargetSiblings(e).each(function(){var t={header:(l=this.element).find(".oj-collapsible-header"),content:l.find(".oj-collapsible-content")};return(i=this._trigger("beforeCollapse",e,t))||(this._expandTarget=null),i}),!this.options.multiple){var a=this._initEventData(l,this._expandTarget);i=this._trigger("beforeExpand",e,a)}var n=this;return i&&this._findTargetSiblings(e).each(function(){this.collapse(!1,e,o),n._collapsedCollapsible=this.widget()}),i},_expandHandler:function(e,o){var i=null;if(this._collapsedCollapsible&&(i=this._collapsedCollapsible,this._collapsedCollapsible=null),this._isTargetMyCollapsible(e)&&!this._duringSetExpandedOption){var l,a=this;this._findTargetSiblings(e).each(function(){this.collapse(!1,e,o),l=a._initEventData(this.element,t(e.target))}),l||(l=a._initEventData(i,t(e.target))),this.options.multiple||this._trigger("expand",e,l),this._updateExpanded(),this._expandTarget=null}},_beforeCollapseHandler:function(e,t){var o=t;return!(this._isTargetMyCollapsible(e)&&!this.options.multiple)||(!o&&e.originalEvent instanceof CustomEvent&&(o=e.originalEvent.detail),this._trigger("beforeCollapse",e,this._initCollapseEventData(e,o)))},_collapseHandler:function(e,t){var o=t;if(!this._duringSetExpandedOption&&this._isTargetMyCollapsible(e)){!o&&e.originalEvent instanceof CustomEvent&&(o=e.originalEvent.detail);var i=this._initCollapseEventData(e,o);this.options.multiple||this._trigger("collapse",e,i),this._updateExpanded()}},_initEventData:function(e,t){return{fromCollapsible:e,toCollapsible:t}},_initCollapseEventData:function(e,o){var i;return o.toCollapsible?i=o:e.originalEvent&&e.originalEvent.target&&(i=this._initEventData(t(e.target),this._expandTarget)),!i&&this._expandTarget&&(i=this._initEventData(t(e.target),this._expandTarget)),i},_isTargetMyCollapsible:function(e){return t(e.target).is(this.collapsibles)},_updateExpanded:function(){var o,i,l=[];this.collapsibles.each(function(e){("oj-collapsible"===this.tagName.toLowerCase()?this.expanded:t(this).ojCollapsible("option","expanded"))&&(i={},(o=t(this).attr("id"))&&(i.id=o),i.index=e,l.push(i))}),this.options.expanded&&e.Object._compareArrayIdIndexObject(l,this.options.expanded)||this.option("expanded",l,{_context:{internalSet:!0,writeback:!0}})},_expandedIndexToId:function(e){if(Array.isArray(e)){for(var o,i=[],l=[],a=0;a<e.length;a++){var n=e[a];"number"==typeof n||"string"==typeof n?l.push(n):"number"==typeof n.index?l.push(n.index):"string"==typeof n.id&&l.push(n.id)}return this.element.children().each(function(e){(o=t(this).attr("id"))?-1===l.indexOf(o)&&-1===l.indexOf(e)||i.push({id:o,index:e}):-1!==l.indexOf(e)&&i.push({index:e})}),!this.options.multiple&&i.length>1&&(i=[i[i.length-1]]),i}return null},_setExpandedOption:function(e){var i=e;if(this._internalSetExpanded||(i=this._expandedIndexToId(i)),i){var l,a,n,s,r=this,d=0;this.collapsibles.each(function(e){l=t(this),a=l.attr("id"),n=!1,(s=i[d])&&(a?a===s.id&&(n=!0):e===s.index&&(n=!0),n&&(d+=1));var p="oj-collapsible"===this.tagName.toLowerCase();(p?this.expanded:l.ojCollapsible("option","expanded"))!==n&&(o.warn("JET Accordion: override collapsible "+e+" expanded setting"),r._duringSetExpandedOption=!0,p?this.expanded=n:l.ojCollapsible("option","expanded",n),r._duringSetExpandedOption=!1)})}this._updateExpanded()},getNodeBySubId:function(e){if(null==e)return this.element?this.element[0]:null;var o=e.subId,i=e.index;if("number"!=typeof i||i<0||i>=this.collapsibles.length)return null;var l=this.collapsibles[i];switch(o){case"oj-accordion-content":o="oj-collapsible-content";break;case"oj-accordion-header":o="oj-collapsible-header";break;case"oj-accordion-disclosure":case"oj-accordion-header-icon":o="oj-collapsible-disclosure";break;case"oj-accordion-collapsible":return l;default:return null}return t(l).ojCollapsible("getNodeBySubId",{subId:o})},getSubIdByNode:function(e){for(var o=-1,i=e;i&&-1===(o=Array.prototype.indexOf.call(this.collapsibles,i));)i=i.parentElement;var l=null;if(-1!==o){var a=t(this.collapsibles[o]).ojCollapsible("getSubIdByNode",e);switch((a=a||{}).subId){case"oj-collapsible-content":l="oj-accordion-content";break;case"oj-collapsible-header":l="oj-accordion-header";break;case"oj-collapsible-disclosure":case"oj-collapsible-header-icon":l="oj-accordion-disclosure";break;default:l="oj-accordion-collapsible"}}return l?{subId:l,index:o}:null},_CompareOptionValues:function(t,o,i){return"expanded"===t?e.Object.compareValues(o,i):this._super(t,o,i)}})});
//# sourceMappingURL=ojaccordion.js.map