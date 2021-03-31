/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore","ojs/ojeditablevalue","ojs/ojcore-base","jquery","ojs/ojdomutils","ojs/ojfocusutils"],function(t,e,i,s,n,a){"use strict";
/**
   * @license
   * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
   * The Universal Permissive License (UPL), Version 1.0
   * as shown at https://oss.oracle.com/licenses/upl/
   * @ignore
   */var o;i=i&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i,s=s&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s,a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a,(o={properties:{describedBy:{type:"string"},disabled:{type:"boolean",value:!1},displayOptions:{type:"object",properties:{converterHint:{type:"Array<string>|string"},helpInstruction:{type:"Array<string>|string",value:["notewindow"]},messages:{type:"Array<string>|string"},validatorHint:{type:"Array<string>|string"}}},help:{type:"object",properties:{instruction:{type:"string",value:""}}},helpHints:{type:"object",properties:{definition:{type:"string",value:""},source:{type:"string",value:""}}},labelEdge:{type:"string",enumValues:["inside","none","provided"]},labelHint:{type:"string",value:""},labelledBy:{type:"string"},messagesCustom:{type:"Array<Object>",writeback:!0,value:[]},readonly:{type:"boolean",value:!1},translations:{type:"object",value:{}},userAssistanceDensity:{type:"string",enumValues:["compact","efficient","reflow"],value:"reflow"},valid:{type:"string",writeback:!0,enumValues:["invalidHidden","invalidShown","pending","valid"],readOnly:!0},value:{type:"boolean",writeback:!0,value:!1}},methods:{getProperty:{},refresh:{},reset:{},setProperties:{},setProperty:{},showMessages:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojAnimateEnd:{},ojAnimateStart:{}},extension:{}}).extension._WIDGET_NAME="ojSwitch",o.extension._INNER_ELEM="input",o.extension._ALIASED_PROPS={readonly:"readOnly"},i.CustomElementBridge.register("oj-switch",{metadata:i.CollectionUtils.mergeDeep(o,{properties:{readonly:{binding:{consume:{name:"readonly"}}},userAssistanceDensity:{binding:{consume:{name:"userAssistanceDensity"}}},labelEdge:{binding:{consume:{name:"labelEdge"}}}}})}),i.__registerWidget("oj.ojSwitch",s.oj.editableValue,{version:"1.1.0",defaultElement:"<input>",widgetEventPrefix:"oj",options:{disabled:!1,labelledBy:null,readOnly:!1,value:!1},widget:function(){return this._element2},getNodeBySubId:function(t){var e,i=this._super(t),s=this.widget();return i||(i=null==t||null==t.subId?s:null)||"oj-switch-thumb"!==(e=t.subId)&&"oj-switch-track"!==e?i||null:s.find("."+e)[0]},getSubIdByNode:function(t){var e,i=s(this.element).attr("id"),n=this._super(t);return null!=t&&(s(t).hasClass("oj-switch-track")||s(t).hasClass("oj-switch-thumb"))&&(i===(e=s(t).parents("div.oj-switch").find("input.oj-component-initnode").attr("id"))&&s(t).hasClass("oj-switch-track")?n={subId:"oj-switch-track"}:i===e&&s(t).hasClass("oj-switch-thumb")&&(n={subId:"oj-switch-thumb"})),n},_BUNDLE_KEY:{_SWITCH_OFF:"SwitchOFF",_SWITCH_ON:"SwitchON"},_InitOptions:function(t,i){var s,n;s=[{attribute:"disabled",validateOption:!0},{attribute:"readonly",option:"readOnly",validateOption:!0},{attribute:"checked",option:"value",validateOption:!1,coerceDomValue:function(t){return!!t}},{attribute:"title"}],this._super(t,i),this._IsCustomElement()||(e.EditableValueUtils.initializeOptionsFromDom(s,i,this),n=this.option("value"),this.option({value:!!n},{_context:{writeback:!0,internalSet:!0}}))},_ComponentCreate:function(){if(this._super(),!this.element.is("input"))throw new Error("ojSwitch can be bound to INPUT only.");this._inputElementOriginalDisplay=this.element.css("display"),this.element.css("display","none").attr("type","checkbox").attr("checked",this.option("value")).attr("tabindex","-1").attr("disabled",this.option("disabled")).attr("readonly",this.option("readOnly")),this.OuterWrapper?this._element2=s(this.OuterWrapper):this._element2=this.element.wrap("<div></div>").parent(),this._element2.addClass("oj-switch oj-component oj-form-control"),this._element2.append("<div class='oj-switch-container oj-form-control-container'><div class='oj-switch-track'><div class='oj-switch-thumb' tabIndex='0'></div></div></div>"),this.switchThumb=this._element2.find(".oj-switch-thumb"),this.switchThumb.attr("role",this._setSwitchRole()),this.switchTrack=this._element2.find(".oj-switch-track")},_AfterCreate:function(){this._super();var t=this.switchThumb;this._SetAriaInfo(t),this._ariaLabelElement=this.switchThumb[0],this._setup()},_SetAriaInfo:function(t){var i,s;if(i=this.OuterWrapper?this._element2[0]:this._element2[0].querySelector("input"),this._IsCustomElement()){if(this.options.labelledBy){var n=this.uuid+"_Label";s=e.EditableValueUtils._getOjLabelAriaLabelledBy(this.options.labelledBy,n)}}else{var a=this._GetLabelElement();a&&(s=a.attr("id"))}if(s)t.attr("aria-labelledby",s);else{var o=i.getAttribute("aria-label");o&&(t.attr("aria-label",o),i.removeAttribute("aria-label"))}},_GetAriaLabelElement:function(){return this._ariaLabelElement?this._ariaLabelElement:this._super()},_setup:function(){var t=s(this.widget());if(this._setupEvents(),void 0!==t){if(this.element.attr("checked",this.option("value")),t.removeClass("oj-disabled oj-read-only oj-selected oj-hover oj-active"),s(this.switchThumb).attr("tabindex","0"),s(this.switchThumb).html(""),this.option("disabled")||this.option("readOnly"))if(this.option("disabled"))t.addClass("oj-disabled"),s(this.switchThumb).removeAttr("tabindex");else{t.addClass("oj-read-only");let e=this._setReadOnlyValue();s(this.switchThumb).html(e)}this.option("value")&&t.addClass("oj-selected"),s(this.switchThumb).attr("aria-checked",this.option("value")),s(this.switchThumb).removeAttr("aria-disabled"),s(this.switchThumb).removeAttr("aria-readonly"),t.removeAttr("aria-disabled"),this._CanSetValue()||(this.option("disabled")?s(this.switchThumb).attr("aria-disabled","true"):s(this.switchThumb).attr("aria-readonly","true"))}},_setReadOnlyValue:function(){var t=this._BUNDLE_KEY._SWITCH_OFF;return this.option("value")&&(t=this._BUNDLE_KEY._SWITCH_ON),this.getTranslatedString(t)},_setupEvents:function(){this._off(this._element2,"keydown keyup mouseup touchend"),this._CanSetValue()&&(this._on(this._element2,this._switchEvents),this._AddHoverable(this._element2),this._AddActiveable(this._element2)),this._focusable({element:this.switchThumb,applyHighlight:!0})},_switchEvents:{keydown:function(t){t.which!==s.ui.keyCode.ENTER&&t.which!==s.ui.keyCode.SPACE||(s(t.currentTarget).addClass("oj-active"),t.preventDefault())},keyup:function(t){t.which!==s.ui.keyCode.ENTER&&t.which!==s.ui.keyCode.SPACE||this._SetValue(!this.option("value"),t)},mouseup:function(t){n.isAncestorOrSelf(this.switchTrack[0],t.target)&&(1===t.which&&this._isRealMouseEvent(t)&&this._SetValue(!this.option("value"),t),a.focusElement(this.switchThumb[0]))},touchend:function(t){n.isAncestorOrSelf(this.switchTrack[0],t.target)&&(this._SetValue(!this.option("value"),t),a.focusElement(this.switchThumb[0]))}},_GetDefaultStyleClass:function(){return"oj-switch"},_CanSetValue:function(){return!!this._super()&&!this.options.readOnly},_setSwitchRole:function(){return"switch"},_destroy:function(){return this._CanSetValue()&&(this._RemoveHoverable(this._element2),this._RemoveActiveable(this._element2)),this._element2.find(".oj-switch-track").remove(),n.unwrap(this.element),this._RestoreAttributes(this.element),this._super()},_GetMessagingLauncherElement:function(){return this._element2},_GetContentElement:function(){return this.switchThumb},_AfterSetOption:function(t,i,s){switch(this._superApply(arguments),t){case"readOnly":this._AfterSetOptionDisabledReadOnly(t,e.EditableValueUtils.readOnlyOptionOptions)}},_setOption:function(t,e,i){var s;switch(t){case"disabled":case"readOnly":case"value":s=!!e;break;default:s=e}switch(this._super(t,s,i),t){case"labelledBy":this._SetAriaInfo(this.switchThumb)}},_isRealMouseEvent:function(){return!n.recentTouchEnd()},_Refresh:function(t,e,i){this._superApply(arguments),this._setup()}})});
//# sourceMappingURL=ojswitch.js.map