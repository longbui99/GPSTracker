(this.webpackJsonpgpsproj=this.webpackJsonpgpsproj||[]).push([[0],{37:function(e,a,t){e.exports=t(73)},42:function(e,a,t){},47:function(e,a,t){},70:function(e,a,t){},73:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),l=t(34),r=t.n(l),c=t(10),i=t(11),o=t(13),m=t(12),d=t(5),u=t(4),p=t(1),h=(t(42),t(18)),b=t.n(h),E=(t(47),t(15)),f=t.n(E),v=t(19),y=t(35),g=t.n(y),N=t(14),k=t.n(N),x=function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(e){var n;return Object(c.a)(this,t),(n=a.call(this,e)).state={dashboardValue:{labels:[],data:[]},control:!1,dashColor:"#ffffff",displayType:0,dashBoardType:0},n.SelectRefs=s.a.createRef(),n.initDashboardValue=n.initDashboardValue.bind(Object(d.a)(n)),n.exportDashBoard=n.exportDashBoard.bind(Object(d.a)(n)),n.changeDashStyle=n.changeDashStyle.bind(Object(d.a)(n)),n.changeDisplayState=n.changeDisplayState.bind(Object(d.a)(n)),n.initMyChart=n.initMyChart.bind(Object(d.a)(n)),n.renderValue=[["This week","7 days"],["This month","30 days"]],n}return Object(i.a)(t,[{key:"initMyChart",value:function(){this.myChart=new g.a(document.getElementById("myChart"),{type:"line",data:{labels:[],datasets:[{data:[],lineTension:0,backgroundColor:"transparent",borderColor:"#007bff",borderWidth:4,pointBackgroundColor:"#007bff",borderDash:[20,.5]}]},options:{responsive:!0,scales:{yAxes:[{ticks:{beginAtZero:!1,fontSize:13}}],xAxes:[{ticks:{beginAtZero:!1,fontSize:13}}]},legend:{display:!1},title:{display:!0,fontSize:16,text:"Account analysis"}}})}},{key:"componentDidMount",value:function(){this.initMyChart(),this.initDashboardValue()}},{key:"initDashboardValue",value:function(){var e=Object(v.a)(f.a.mark((function e(){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return null!==this.myChart&&this.myChart.reset(),e.next=3,k.a.post("/admin/get-account-development-dashboard",{dashboardType:this.SelectRefs.current.value,displayType:this.state.displayType});case 3:a=e.sent,this.setState({dashBoardType:this.SelectRefs.current.value}),this.drawDashboard(a.data);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"exportDashBoard",value:function(){var e=document.createElement("a");e.setAttribute("href",this.myChart.toBase64Image()),e.setAttribute("download","Account Dash Board"),document.body.appendChild(e),e.click(),e.remove()}},{key:"changeDashStyle",value:function(){}},{key:"drawDashboard",value:function(e){this.myChart.data.labels=e.labels,this.myChart.data.datasets[0].data=e.data,this.myChart.update()}},{key:"changeDisplayState",value:function(){var e=Object(v.a)(f.a.mark((function e(){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({displayType:1^this.state.displayType}),e.next=3,k.a.post("/admin/get-account-development-dashboard",{dashboardType:this.state.dashBoardType,displayType:1^this.state.displayType});case 3:a=e.sent,this.drawDashboard(a.data);case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("div",{className:"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"},s.a.createElement("h1",{className:"h2"},"Chart"),s.a.createElement("div",{className:"btn-toolbar mb-2 mb-md-0"},s.a.createElement("div",{className:"btn-group mr-2"},s.a.createElement("button",{type:"button",className:"btn btn-sm btn-outline-secondary",onClick:this.changeDashStyle},"Dark"),s.a.createElement("button",{type:"button",className:"btn btn-sm btn-outline-secondary",onClick:this.exportDashBoard},"Export")),s.a.createElement("div",{className:"btn-group mr-2"},s.a.createElement("button",{type:"button",className:"btn btn-sm btn-outline-secondary",onClick:this.changeDisplayState},this.renderValue[this.state.dashBoardType][this.state.displayType]),s.a.createElement("select",{onChange:this.initDashboardValue,ref:this.SelectRefs,defaultValue:0,className:"btn btn-sm btn-outline-secondary"},s.a.createElement("option",{value:0},"Week"),s.a.createElement("option",{value:1},"Month"),s.a.createElement("option",{value:2},"Year"))))),s.a.createElement("canvas",{className:"my-4 w-100",id:"myChart",width:900,height:380}))}}]),t}(s.a.Component),C=function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(){return Object(c.a)(this,t),a.apply(this,arguments)}return Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("div",{className:"row"},s.a.createElement("nav",{id:"sidebarMenu",className:"col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"},s.a.createElement("div",{className:"sidebar-sticky pt-3"},s.a.createElement("ul",{className:"nav flex-column",style:{position:"fixed"}},s.a.createElement("li",{className:"nav-item"},s.a.createElement(u.b,{className:"nav-link active",to:"/admin/analysis/account"},s.a.createElement(b.a,{icon:"users"}),"Account")),s.a.createElement("li",{className:"nav-item"},s.a.createElement(u.b,{className:"nav-link",to:"/admin/analysis/device"},s.a.createElement(b.a,{icon:"cpu"}),"Device")),s.a.createElement("li",{className:"nav-item"},s.a.createElement(u.b,{className:"nav-link",to:"/admin/analysis/products"},s.a.createElement(b.a,{icon:"shopping-cart"}),"Products")),s.a.createElement("li",{className:"nav-item"},s.a.createElement(u.b,{className:"nav-link",to:"/admin/analysis/income"},s.a.createElement(b.a,{icon:"credit-card"}),"Income")),s.a.createElement("li",{className:"nav-item"},s.a.createElement(u.b,{className:"nav-link",to:"/admin/analysis/reports"},s.a.createElement(b.a,{icon:"bar-chart-2"}),"Reports")),s.a.createElement("li",{className:"nav-item"},s.a.createElement(u.b,{className:"nav-link",to:"/admin/analysis/Integrations"},s.a.createElement(b.a,{icon:"layers"}),"Integrations"))))),s.a.createElement("main",{role:"main",className:"col-md-9 ml-sm-auto col-lg-10 px-md-4"},s.a.createElement(p.c,null,s.a.createElement(p.a,{exact:!0,path:"/admin/analysis/account"}," ",s.a.createElement(x,null)," ")))))}}]),t}(s.a.Component),D=t(3),w=t.n(D),S=(t(70),function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(e){var n;return Object(c.a)(this,t),(n=a.call(this,e)).initCLickTracking=function(e){n.showProfile(e),n.ToastRefs.current.style.display="inline-block",n.ToastRefs.current.style.opacity=1},n.listInformation=[],n.state={listSize:0,accState:{total:0,new:0,expire:0}},n.ToastRefs=s.a.createRef(),n.showProfile=n.showProfile.bind(Object(d.a)(n)),n.searchAccProfile=n.searchAccProfile.bind(Object(d.a)(n)),n.initAccState=n.initAccState.bind(Object(d.a)(n)),n.listSearchRefs=[s.a.createRef(),s.a.createRef(),s.a.createRef(),s.a.createRef()],n}return Object(i.a)(t,[{key:"componentDidMount",value:function(){this.initAccState(),this.initListAccount()}},{key:"initAccState",value:function(){var e=Object(v.a)(f.a.mark((function e(){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.post("/adm/get-sys-acc-state");case 2:a=e.sent,this.setState({accState:a.data});case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"initListAccount",value:function(){var e=Object(v.a)(f.a.mark((function e(){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.post("/adm/get-full-account-to-render");case 2:a=e.sent,this.listInformation=a.data,this.setState({listSize:this.listInformation.length});case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"showProfile",value:function(e){w()("#spinner-toasts").css("display","inline-block"),k.a.post("/adm/get-peer-profile",{username:e}).then((function(a){null!==a&&(a=a.data,w()("#info-user-title").text(a.FullName),w()("#toast-id-user").text(e),w()("#toast-level-user").text(a.Level),w()("#toast-norma-user-his").text(a.hisLevel[0]),w()("#toast-medi-user-his").text(a.hisLevel[1]),w()("#toast-premi-user-his").text(a.hisLevel[2]),w()("#toast-email-user").text(a.Email),w()("#toast-contact-user").text(a.Contact),w()("#toast-blanc-user").text(a.Balance),w()("#toast-days-user").text(Math.ceil(a.CountDate/864e5)),w()("#toast-dayin-user").text(a.DateIn),w()("#toast-state-user").text(a.State),w()("#toast-state-user").attr("class","text-"+a.classState),w()("#spinner-toasts").css("display","none"))}))}},{key:"searchAccProfile",value:function(){for(var e=this.listSearchRefs.map((function(e){return e.current.value.toUpperCase()})),a=document.getElementById("search-tab-bod-id").getElementsByTagName("tr"),t=0;t<a.length;t++){for(var n=!0,s=0;s<4;s++){var l=a[t].getElementsByTagName("td")[s];if(l)if(-1===l.textContent.toUpperCase().indexOf(e[s])){a[t].style.display="none",n=!1;break}}n&&(a[t].style.display="")}}},{key:"hiddenToast",value:function(){this.ToastRefs.current.style.display="none",this.ToastRefs.current.style.opacity=0}},{key:"render",value:function(){var e=this,a=null;return 0===this.state.listSize&&(a=s.a.createElement("div",{className:"spinnerData d-flex justify-content-center"},s.a.createElement("div",{className:"spinner-border text-secondary",role:"status"},s.a.createElement("span",{className:"sr-only"},"Loading...")))),s.a.createElement("div",null,s.a.createElement("div",{className:"nav-body-active",style:{paddingTop:"70px"}},s.a.createElement("div",{className:"container-fluid"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-xl-3"},s.a.createElement("div",{style:{marginTop:"10px"}},s.a.createElement("ul",{style:{listStyle:"none",width:"100%"}},s.a.createElement("li",null,s.a.createElement("div",{className:"alert alert-primary ana"},"Account: ",s.a.createElement("span",{className:"account-tot"}," ",this.state.accState.total," "))),s.a.createElement("li",null,s.a.createElement("div",{className:"alert alert-success ana"},"New: +",s.a.createElement("span",{className:"account-new"}," ",this.state.accState.new," "))),s.a.createElement("li",null,s.a.createElement("div",{className:"alert alert-danger ana"},"Overdue Payment: ",s.a.createElement("span",{className:"account-overd"}," ",this.state.accState.expire)))))),s.a.createElement("div",{className:"col-xl-8"},s.a.createElement("div",{className:"search-acc"},s.a.createElement("div",{className:"search-bar mt-2 mb-2"},s.a.createElement("div",{className:"input-group"},s.a.createElement("div",{className:"input-group-append"},s.a.createElement("span",{type:"button",className:"btn btn-info"},"Search")),s.a.createElement("input",{type:"text",onChange:this.searchAccProfile,ref:this.listSearchRefs[0],"aria-label":"Name",className:"form-control",placeholder:"Full Name"}),s.a.createElement("input",{type:"text",onChange:this.searchAccProfile,ref:this.listSearchRefs[1],"aria-label":"Contact",className:"form-control",placeholder:"Contact"}),s.a.createElement("input",{type:"text",onChange:this.searchAccProfile,ref:this.listSearchRefs[2],"aria-label":"Email",className:"form-control",placeholder:"Email"}),s.a.createElement("input",{type:"text",onChange:this.searchAccProfile,ref:this.listSearchRefs[3],"aria-label":"LastAccess",className:"form-control",placeholder:"LastAccess"}))),s.a.createElement("div",{className:"table-responsive",style:{maxHeight:"80vh"}},s.a.createElement("table",{className:"table ",style:{border:"solid 1px #f5f5f5"}},s.a.createElement("thead",{className:"thead-dark",id:"search-tab-thead-id"},s.a.createElement("tr",null,s.a.createElement("th",{scope:"col"},"Full name"),s.a.createElement("th",{scope:"col"},"Contact"),s.a.createElement("th",{scope:"col"},"Email"),s.a.createElement("th",{scope:"col"},"Last Access"))),s.a.createElement("tbody",{className:"search-tab-body",id:"search-tab-bod-id"},this.listInformation.map((function(a){return s.a.createElement(j,{key:a._id,data:a,functionEvent:e.initCLickTracking})})))),a))))),s.a.createElement("div",null,s.a.createElement("div",{ref:this.ToastRefs,className:"toast-imple fixed-top",id:"element"},s.a.createElement("div",{className:"toasts-header"},s.a.createElement("div",{id:"spinner-toasts",className:"spinner-grow text-info",role:"status"},s.a.createElement("span",{className:"sr-only"},"Loading...")),s.a.createElement("strong",{className:"mr-1"},"About : "),s.a.createElement("strong",{className:"mr-auto",id:"info-user-title"}," "),s.a.createElement("button",{type:"button",onClick:this.hiddenToast.bind(this),className:"ml-2 mb-1 close"},s.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),s.a.createElement("div",{className:"toasts-body"},s.a.createElement("div",{className:"d-flex align-items-center ml-2 mr-5  mb-1"},s.a.createElement("div",{className:"mr-auto"},s.a.createElement("strong",null,"ID: ")," ",s.a.createElement("span",{id:"toast-id-user"})),s.a.createElement("div",{className:"leveldisplay d-flex  align-items-center"},s.a.createElement("strong",null,"Level: "),s.a.createElement("span",null,s.a.createElement("p",{className:"btn mb-0 border-0 bg-white text-dark btn-secondary dropdown-toggle",type:"button",id:"dropdownMenuButton","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},s.a.createElement("span",{id:"toast-level-user"})," "),s.a.createElement("div",{className:"dropdown-menu drop-toast"},s.a.createElement("p",{className:"dropdown-item"},s.a.createElement("strong",null,"Normal:")," ",s.a.createElement("span",{id:"toast-norma-user-his"})),s.a.createElement("p",{className:"dropdown-item"},s.a.createElement("strong",null,"Medium:")," ",s.a.createElement("span",{id:"toast-medi-user-his"})),s.a.createElement("p",{className:"dropdown-item"},s.a.createElement("strong",null,"Premium:")," ",s.a.createElement("span",{id:"toast-premi-user-his"})))))),s.a.createElement("div",{className:" ml-2 mb-2"},s.a.createElement("strong",null,"Email: "),s.a.createElement("span",{id:"toast-email-user"})),s.a.createElement("div",{className:" ml-2 mb-2"},s.a.createElement("strong",null,"Contact: "),s.a.createElement("span",{id:"toast-contact-user"})),s.a.createElement("div",{className:" ml-2 mb-2"},s.a.createElement("strong",null,"Balance: "),s.a.createElement("span",{id:"toast-blanc-user"}," "),s.a.createElement("span",{className:"text-monospace"},"$")),s.a.createElement("div",{className:"d-flex ml-2 mb-2 mr-5"},s.a.createElement("div",{className:"mr-auto"},s.a.createElement("strong",null,"Time:")," ",s.a.createElement("span",{id:"toast-days-user"}," ")," days"),s.a.createElement("div",null," ",s.a.createElement("strong",null,"From:")," ",s.a.createElement("span",{id:"toast-dayin-user"}))),s.a.createElement("div",{className:" ml-2 mb-2"},s.a.createElement("strong",null,"State:")," ",s.a.createElement("span",{className:"text-danger",id:"toast-state-user"})))))))}}]),t}(s.a.Component)),j=function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(){return Object(c.a)(this,t),a.apply(this,arguments)}return Object(i.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("tr",{onClick:function(){return e.props.functionEvent(e.props.data._id)}},s.a.createElement("td",null,this.props.data.Fname+" "+this.props.data.Lname),s.a.createElement("td",null,this.props.data.Contact),s.a.createElement("td",null,this.props.data.Email),s.a.createElement("td",null,this.props.data.LastAccess))}}]),t}(s.a.Component),O=(t(71),function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(e){var n;return Object(c.a)(this,t),(n=a.call(this,e)).createLinkDirect=n.createLinkDirect.bind(Object(d.a)(n)),n.defaultDirectClass="dropdown-item",n.defaultDirectSize=3,n.preLinkDirect=null,n.state={linkDirect:n.createLinkDirect()},n}return Object(i.a)(t,[{key:"isAdmLogin",value:function(){k.a.post("/auth/admin-is-loggin").then((function(e){e.data||window.location.replace("/")}))}},{key:"createLinkDirect",value:function(){for(var e=[],a=0;a<this.defaultDirectSize;a++)e.push(this.defaultDirectClass);return e}},{key:"onDirectClick",value:function(e){var a=this.state.linkDirect;null!=this.preLinkDirect&&(a[this.preLinkDirect]=this.defaultDirectClass),a[e]=this.defaultDirectClass+" active",this.preLinkDirect=e,this.setState({linkDirect:a})}},{key:"componentDidMount",value:function(){this.isAdmLogin()}},{key:"logoutRequest",value:function(){k.a.post("/logout-request").then((function(e){e&&window.location.reload("/")}))}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("header",null,s.a.createElement("nav",{className:"navbar navbar-expand-md navbar-dark bg-dark fixed-top"},s.a.createElement(u.b,{className:"navbar-brand",to:"/admin/home"},s.a.createElement("span",{className:"span-header"},"AZbot")),s.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarsExampleDefault","aria-controls":"navbarsExampleDefault","aria-expanded":"false","aria-label":"Toggle navigation"},s.a.createElement("span",{className:"navbar-toggler-icon"})),s.a.createElement("div",{className:"collapse navbar-collapse collapse-c",id:"navbarsExampleDefault"},s.a.createElement("ul",{className:"navbar-nav mr-auto"},s.a.createElement("li",{className:"nav-item active"},s.a.createElement(u.b,{className:"nav-link",to:"/admin/home"},"Home ",s.a.createElement("span",{className:"sr-only"},"(current)"))),s.a.createElement("li",{className:"nav-item dropdown"},s.a.createElement("a",{className:"nav-link dropdown-toggle",href:"/#",id:"dropdown01","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},"Service"),s.a.createElement("div",{className:"dropdown-menu",id:"dropdown-menu-id","aria-labelledby":"dropdown01"},s.a.createElement(u.b,{className:this.state.linkDirect[0],onClick:function(){e.onDirectClick(0)},to:"/admin/analysis"},"System Analysis"),s.a.createElement(u.b,{className:this.state.linkDirect[1],onClick:function(){e.onDirectClick(1)},to:"/admin/management-account"},"Account management"),s.a.createElement(u.b,{className:this.state.linkDirect[2],onClick:function(){e.onDirectClick(2)},to:"/admin/notification"},"Notification",s.a.createElement("span",{className:"badge badge-danger noti-fi-num"},"10")," ")))),s.a.createElement("ul",{className:"navbar-nav"},s.a.createElement("button",{onClick:this.logoutRequest,type:"button",className:"btn btn-outline-primary"},s.a.createElement("span",null,s.a.createElement("i",{className:"fas fa-sign-out-alt"})),"Sign out"))))),s.a.createElement("div",{className:"main-active"},s.a.createElement("div",{className:"container-fluid"},s.a.createElement(p.c,null,s.a.createElement(p.a,{path:"/admin/analysis"},s.a.createElement(C,null)),s.a.createElement(p.a,{path:"/admin/management-account"},s.a.createElement(S,null))))))}}]),t}(s.a.Component)),A=function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(){return Object(c.a)(this,t),a.apply(this,arguments)}return Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement(s.a.StrictMode,null,s.a.createElement(u.a,null,s.a.createElement(p.a,{path:"/admin"},s.a.createElement(O,null))))}}]),t}(s.a.Component);r.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(A,null)),document.getElementById("root"))}},[[37,1,2]]]);
//# sourceMappingURL=main.8c682290.chunk.js.map