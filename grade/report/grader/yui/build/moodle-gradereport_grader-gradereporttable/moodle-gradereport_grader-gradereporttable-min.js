YUI.add("moodle-gradereport_grader-gradereporttable",function(e,t){function i(){i.superclass.constructor.apply(this,arguments)}function l(){}var n={FOOTERTITLE:".avg .header",FOOTERCELLS:"#user-grades .avg .cell",FOOTERROW:"#user-grades .avg",GRADECELL:"td.grade",GRADERTABLE:".gradeparent table",GRADEPARENT:".gradeparent",HEADERCELLS:"#user-grades .heading .cell",HEADERCELL:".gradebook-header-cell",HEADERROW:"#user-grades tr.heading",STUDENTHEADER:"#studentheader",USERCELL:"#user-grades .user.cell",USERMAIL:"#user-grades .useremail"},r={OVERRIDDEN:"overridden",TOOLTIPACTIVE:"tooltipactive"};e.extend(i,e.Base,{_eventHandles:[],graderTable:null,initializer:function(){this.graderRegion=e.one(n.GRADEPARENT),this.graderTable=e.one(n.GRADERTABLE),this.setupFloatingHeaders()},getGradeUserName:function(e){var t=e.ancestor("tr"),n=t.one("th.user .username");return n?n.get("text"):""},getGradeItemName:function(t){var n=e.one("th.item[data-itemid='"+t.getData("itemid")+"']");return n?n.get("text"):""},getGradeFeedback:function(e){return e.getData("feedback")}}),e.namespace("M.gradereport_grader").ReportTable=i,e.namespace("M.gradereport_grader").init=function(t){return new e.M.gradereport_grader.ReportTable(t)};var s="height",o="width",u="offsetWidth",a="offsetHeight",f="moodle-core-grade-report-grader";r.FLOATING="floating",l.ATTRS={},l.prototype={pageHeaderHeight:0,container:null,headerCell:null,headerRow:null,firstUserCell:null,firstNonUserCell:null,firstNonUserCellLeft:0,firstNonUserCellWidth:0,tableFooterRow:null,footerRow:null,gradeItemHeadingContainer:null,userColumnHeader:null,userColumn:null,firstUserCellBottom:0,firstUserCellLeft:0,firstUserCellWidth:0,dockWidth:0,lastUserCellTop:0,floatingHeaderRow:null,_eventHandles:[],setupFloatingHeaders:function(){return this.firstUserCell=e.one(n.USERCELL),this.container=e.one(n.GRADEPARENT),this.firstNonUserCell=e.one(n.USERMAIL).next(),this.firstUserCell?(this._setupFloatingUserColumn(),this._setupFloatingUserHeader(),this._setupFloatingAssignmentHeaders(),this._setupFloatingAssignmentFooter(),this.floatingHeaderRow={},this._setupFloatingLeftHeaders(".controls .controls"),this._setupFloatingLeftHeaders(".range .range"),this._setupFloatingLeftHeaders(n.FOOTERTITLE),this._setupFloatingAssignmentFooterTitle(),this._calculateCellPositions(),this._handleScrollEvent(),this._setupEventHandlers(),e.Global.on("moodle-gradereport_grader:resized",this._handleResizeEvent,this),this):this},_calculateCellPositions:function(){this.headerRowTop=this.headerRow.getY(),this.tableFooterRow&&(this.footerRowPosition=this.tableFooterRow.getY()),this.dockWidth=0;var t=e.one(".has_dock #dock");t&&(this.dockWidth=t.get(u));var r=e.all(n.USERCELL);this.firstUserCellLeft=this.firstUserCell.getX(),this.firstUserCellWidth=this.firstUserCell.get(u),this.firstNonUserCellLeft=this.firstNonUserCell.getX(),this.firstNonUserCellWidth=this.firstNonUserCell.get(u);if(r.size()>1){var i=r.item(1);this.firstUserCellBottom=i.getY()+parseInt(i.getComputedStyle(s),10),this.lastUserCellTop=r.item(r.size()-2).getY()}else{var o=r.item(0);this.lastUserCellTop=o.getY(),this.tableFooterRow?this.firstUserCellBottom=this.footerRowPosition+parseInt(this.tableFooterRow.getComputedStyle(s),10):this.firstUserCellBottom=o.getY()+o.get("offsetHeight")}var f=e.one("header");this.pageHeaderHeight=0;if(f)if(f.getComputedStyle("position")==="fixed")this.pageHeaderHeight=f.get(a);else{var l=e.one(".navbar");l&&l.getComputedStyle("position")==="fixed"&&(this.pageHeaderHeight=l.get(a))}},_getRelativeXY:function(e){return this._getRelativeXYFromXY(e.getX(),e.getY())},_getRelativeXYFromXY:function(e,t){var n=this.container.getXY();return[e-n[0],t-n[1]]},_getRelativeXFromX:function(e){return this._getRelativeXYFromXY(e,0)[0]},_getRelativeYFromY:function(e){return this._getRelativeXYFromXY(0,e)[1]},_getScrollBarHeight:function(){return e.UA.ie&&e.UA.ie>=10?0:e.config.doc.body.scrollWidth>e.config.doc.body.clientWidth?e.DOM.getScrollbarWidth():0},_setupEventHandlers:function(){this._eventHandles.push(e.one(e.config.win).on("scroll",this._handleScrollEvent,this),e.one(e.config.win).on("resize",this._handleResizeEvent,this),e.one(e.config.win).on("orientationchange",this._handleResizeEvent,this),e.Global.on("dock:shown",this._handleResizeEvent,this),e.Global.on("dock:hidden",this._handleResizeEvent,this))},_setupFloatingUserColumn:function(){var t=e.all(n.USERCELL),r=e.Node.create('<div aria-hidden="true" role="presentation" class="floater sideonly"></div>'),i=this._getRelativeXY(this.firstUserCell);t.each(function(t){var n=e.Node.create("<div></div>");n.set("innerHTML",t.get("innerHTML")).setAttribute("class",t.getAttribute("class")).setAttribute("data-uid",t.ancestor("tr").getData("uid")).setStyles({height:t.getComputedStyle(s),width:t.getComputedStyle(o)}),r.appendChild(n)},this),r.setStyles({left:i[0]+"px",position:"absolute",top:i[1]+"px"}),this.graderRegion.append(r),this.userColumn=r},_setupFloatingUserHeader:function(){this.headerRow=e.one(n.HEADERROW),this.headerCell=e.one(n.STUDENTHEADER);var t=e.Node.create('<div aria-hidden="true" role="presentation" class="floater sideonly heading"></div>'),r=e.Node.create("<div></div>"),i=this._getRelativeXY(this.headerCell)[0],s=this._getRelativeXY(this.headerRow),u=s[0];r.set("innerHTML",this.headerCell.getHTML()).setAttribute("class",this.headerCell.getAttribute("class")).setStyles({width:this.firstUserCell.getComputedStyle(o),left:i-u+"px"}),t.setStyles({left:s[0]+"px",position:"absolute",top:s[1]+"px"}),t.append(r),this.graderRegion.append(t),this.userColumnHeader=t},_setupFloatingAssignmentHeaders:function(){this.headerRow=e.one("#user-grades tr.heading");var t=e.all("#user-grades tr.heading .cell"),n=e.Node.create('<div aria-hidden="true" role="presentation" class="floater heading"></div>'),r=this._getRelativeXY(this.headerRow),i=0,f=0,l=r[0];t.each(function(t){var r=this._getRelativeXY(t)[0],c=e.Node.create("<div></div>");c.append(t.getHTML()).setAttribute("class"
,t.getAttribute("class")).setData("itemid",t.getData("itemid")).setStyles({height:t.getComputedStyle(s),left:r-l+"px",position:"absolute",width:t.getComputedStyle(o)}),i+=parseInt(t.get(u),10),f=t.get(a),n.appendChild(c)},this),n.setStyles({height:f+"px",left:r[0]+"px",position:"absolute",top:r[1]+"px",width:i+"px"}),this.userColumnHeader.insert(n,"before"),this.gradeItemHeadingContainer=n},_setupFloatingAssignmentFooter:function(){this.tableFooterRow=e.one("#user-grades .avg");if(!this.tableFooterRow)return;var t=this.tableFooterRow.all(".cell"),n=e.Node.create('<div aria-hidden="true" role="presentation" class="floater avg"></div>'),r=0,i=this._getRelativeXY(this.tableFooterRow),f=i[0],l=0;t.each(function(t){var i=e.Node.create("<div></div>"),c=this._getRelativeXY(t)[0];i.set("innerHTML",t.getHTML()).setAttribute("class",t.getAttribute("class")).setStyles({height:t.getComputedStyle(s),left:c-f+"px",position:"absolute",width:t.getComputedStyle(o)}),n.append(i),l=t.get(a),r+=parseInt(t.get(u),10)},this),n.setStyles({position:"absolute",left:i[0]+"px",bottom:"1px",height:l+"px",width:r+"px"}),this.graderRegion.append(n),this.footerRow=n},_setupFloatingAssignmentFooterTitle:function(){var e=this.floatingHeaderRow[n.FOOTERTITLE];e&&e.setStyles({bottom:"1px"})},_setupFloatingLeftHeaders:function(t){var n=e.one(t);if(!n)return;var r=e.Node.create('<div aria-hidden="true" role="presentation" class="floater sideonly"></div>'),i=e.Node.create("<div></div>"),s=this._getRelativeXY(n),u=this.firstUserCell.getComputedStyle(o),f=n.get(a);i.set("innerHTML",n.getHTML()).setAttribute("class",n.getAttribute("class")).setStyles({width:u}),r.setStyles({position:"absolute",top:s[1]+"px",left:s[0]+"px",height:f+"px"}).addClass(n.get("parentNode").get("className")),r.append(i),this.graderRegion.append(r),this.floatingHeaderRow[t]=r},_handleScrollEvent:function(){var t={},i={},o={},u={},a=0,f=0,l=0,c=!1,h=!1,p=!1,d=!1,v={},m={},g=!1;t.left=this._getRelativeXFromX(this.headerRow.getX()),e.config.win.pageYOffset+this.pageHeaderHeight>this.headerRowTop?(c=!0,e.config.win.pageYOffset+this.pageHeaderHeight<this.lastUserCellTop?(a=this._getRelativeYFromY(e.config.win.pageYOffset+this.pageHeaderHeight),t.top=a+"px",i.top=a+"px"):(a=this._getRelativeYFromY(this.lastUserCellTop),t.top=a+"px",i.top=a+"px")):(c=!1,a=this._getRelativeYFromY(this.headerRowTop),t.top=a+"px",i.top=a+"px"),right_to_left()?(f=e.config.win.innerWidth+e.config.win.pageXOffset-this.dockWidth,l=f-this.firstUserCellWidth,h=f<this.firstUserCellLeft+this.firstUserCellWidth,d=f-this.firstNonUserCellWidth<this.firstNonUserCellLeft+this.firstUserCellWidth):(l=e.config.win.pageXOffset,f=l+this.dockWidth,h=f>this.firstUserCellLeft,d=f>this.firstNonUserCellLeft-this.firstUserCellWidth),h?(a=this._getRelativeXFromX(l),o.left=a+"px",i.left=a+"px"):(a=this._getRelativeXFromX(this.firstUserCellLeft),o.left=a+"px",i.left=a+"px"),e.Object.each(this.floatingHeaderRow,function(e,t){v[t]={left:o.left}},this);if(this.footerRow){u.left=this._getRelativeXFromX(this.headerRow.getX());var y=e.config.win.innerHeight,b=e.config.win.pageYOffset,w=y-this._getScrollBarHeight()+b,E=parseInt(this.footerRow.getComputedStyle(s),10),S=E+this.footerRowPosition;m=v[n.FOOTERTITLE],g=this.floatingHeaderRow[n.FOOTERTITLE],w<S&&w>this.firstUserCellBottom?(u.bottom=Math.ceil(S-w)+"px",p=!0):(u.bottom="1px",p=!1),m&&(m.bottom=u.bottom,m.top=null),v[n.FOOTERTITLE]=m}this.gradeItemHeadingContainer&&(this.gradeItemHeadingContainer.setStyles(t),c?this.gradeItemHeadingContainer.addClass(r.FLOATING):this.gradeItemHeadingContainer.removeClass(r.FLOATING)),this.userColumnHeader&&(this.userColumnHeader.setStyles(i),h?this.userColumnHeader.addClass(r.FLOATING):this.userColumnHeader.removeClass(r.FLOATING)),this.userColumn&&(this.userColumn.setStyles(o),h?this.userColumn.addClass(r.FLOATING):this.userColumn.removeClass(r.FLOATING)),this.footerRow&&(this.footerRow.setStyles(u),p?this.footerRow.addClass(r.FLOATING):this.footerRow.removeClass(r.FLOATING)),e.Object.each(v,function(e,t){this.floatingHeaderRow[t]&&this.floatingHeaderRow[t].setStyles(e)},this),e.Object.each(this.floatingHeaderRow,function(e,t){this.floatingHeaderRow[t]&&(d?this.floatingHeaderRow[t].addClass(r.FLOATING):this.floatingHeaderRow[t].removeClass(r.FLOATING))},this),g&&(d?g.addClass(r.FLOATING):g.removeClass(r.FLOATING))},_handleResizeEvent:function(){this._calculateCellPositions(),this._handleScrollEvent();var t=this.firstUserCell.getComputedStyle(o),r=e.all(n.USERCELL);this.userColumnHeader.one(".cell").setStyle("width",t),this.userColumn.all(".cell").each(function(e,n){e.setStyles({width:t,height:r.item(n).getComputedStyle(s)})},this);var i=this.gradeItemHeadingContainer.all(".cell"),a=e.all(n.HEADERCELLS),f=this.headerRow.getX(),l=0;a.each(function(e,t){var n=i.item(t);l+=e.get(u);var r={width:e.getComputedStyle(o),left:e.getX()-f+"px"};n.setStyles(r)});if(this.footerRow){var c=this.footerRow.all(".cell");if(c.size()!==0){var h=e.all(n.FOOTERCELLS);h.each(function(e,t){var n=c.item(t),r={width:e.getComputedStyle(o),left:e.getX()-f+"px"};n.setStyles(r)})}}e.Object.each(this.floatingHeaderRow,function(e){e.one("div").setStyle("width",t)},this),this.gradeItemHeadingContainer.setStyle("width",l)}},e.Base.mix(e.M.gradereport_grader.ReportTable,[l])},"@VERSION@",{requires:["base","node","event","handlebars","overlay","event-hover"]});