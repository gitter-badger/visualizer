$wnd.jsme.runAsyncCallback5('q(202,190,{});function yO(){yO=r;zO=new jo(yd,new AO)}function BO(a){a.a.stopPropagation();a.a.preventDefault()}function AO(){}q(203,202,{},AO);_.Qc=function(){BO(this)};_.Tc=function(){return zO};var zO;function CO(){CO=r;DO=new jo(zd,new EO)}function EO(){}q(204,202,{},EO);_.Qc=function(){BO(this)};_.Tc=function(){return DO};var DO;function FO(){FO=r;GO=new jo(Ad,new HO)}function HO(){}q(205,202,{},HO);_.Qc=function(){BO(this)};_.Tc=function(){return GO};var GO;\nfunction IO(){IO=r;JO=new jo(Bd,new KO)}function KO(){}q(206,202,{},KO);_.Qc=function(a){var b,c,d,e;this.a.stopPropagation();this.a.preventDefault();d=(this.a.dataTransfer||null).files;e=0;a:for(;e<d.length;++e){if(0<a.a.d&&e>=a.a.d)break a;b=d[e];c=new FileReader;LO(c,a.a.b);1==a.a.c&&c.readAsText(b)}0==d.length&&(b=(this.a.dataTransfer||null).getData(gg),a.a.b.a.a.e.ob[Ag]=null!=b?b:l)};_.Tc=function(){return JO};var JO;\nfunction MO(a,b,c){var d=a.ob,e=c.b;qr();$r(d,e);Jp(!a.lb?a.lb=new Yp(a):a.lb,c,b)}function NO(a){var b=$doc.createElement(rd);sH(Wf,b.tagName);this.ob=b;this.b=new mI(this.ob);this.ob[Vc]="gwt-HTML";lI(this.b,a,!0);uI(this)}q(323,324,{13:1,15:1,17:1,18:1,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:1,28:1,30:1,31:1,32:1,36:1,37:1,38:1,39:1,40:1,41:1,42:1,43:1,44:1,45:1,47:1,49:1,53:1,58:1,68:1,69:1,70:1,73:1,77:1,80:1,81:1,83:1},NO);\nfunction OO(){Wu();var a=$doc.createElement("textarea");!hr&&(hr=new gr);!fr&&(fr=new er);this.ob=a;this.ob[Vc]="gwt-TextArea"}q(363,364,Qh,OO);function PO(a,b){var c,d;c=$doc.createElement(rg);d=$doc.createElement(fg);d[wc]=a.a.a;d.style[Bg]=a.b.a;var e=(jr(),kr(d));c.appendChild(e);ir(a.d,c);Gs(a,b,d)}function QO(){Nt.call(this);this.a=(Qt(),Xt);this.b=(Yt(),au);this.e[Rc]=Ya;this.e[Qc]=Ya}q(372,317,Mh,QO);_.Ed=function(a){var b;b=Im(a.ob);(a=Ks(this,a))&&this.d.removeChild(Im(b));return a};\nfunction RO(a){try{a.v=!1;var b,c,d;d=a.gb;c=a._;d||(a.ob.style[Cg]=ee,a._=!1,a.Rd());b=a.ob;b.style[oe]=0+(Cn(),sf);b.style[mg]=Za;dK(a,Ei(Pm($doc)+(Om()-Em(a.ob,ff)>>1),0),Ei(Qm($doc)+(Nm()-Em(a.ob,ef)>>1),0));d||((a._=c)?(a.ob.style[ed]=Ef,a.ob.style[Cg]=Dg,fi(a.fb,200)):a.ob.style[Cg]=Dg)}finally{a.v=!0}}function SO(a){a.f=(new pJ(a.i)).mc.Ge();qs(a.f,new TO(a),(po(),po(),qo));a.d=E(UO,m,60,[a.f])}\nfunction VO(){yK();var a,b,c,d,e,f;VK.call(this,(mL(),nL),null,!0);this.yg();this.cb=!0;a=new NO(this.j);this.e=new OO;this.e.ob.style[Fg]=cb;es(this.e,cb);this.wg();pK(this,"400px");f=new QO;f.ob.style[de]=cb;f.e[Rc]=10;c=(Qt(),Rt);f.a=c;PO(f,a);PO(f,this.e);e=new eu;e.e[Rc]=20;for(b=this.d,c=0,d=b.length;c<d;++c)a=b[c],bu(e,a);PO(f,e);DK(this,f);yJ(this,!1);this.xg()}q(611,612,xF,VO);_.wg=function(){SO(this)};_.xg=function(){var a=this.e;a.ob.readOnly=!0;var b=hs(a.ob)+"-readonly";ds(a.rd(),b,!0)};\n_.yg=function(){xJ(this.H.b,"Copy")};_.d=null;_.e=null;_.f=null;_.i="Close";_.j="Press Ctrl-C (Command-C on Mac) or right click (Option-click on Mac) on the selected text to copy it, then paste into another program.";function TO(a){this.a=a}q(614,1,{},TO);_.Vc=function(){FK(this.a,!1)};_.a=null;function WO(a){this.a=a}q(615,1,{},WO);\n_.Cc=function(){ms(this.a.e.ob,!0);this.a.e.ob.focus();var a=this.a.e,b;b=Fm(a.ob,Ag).length;if(0<b&&a.jb){if(0>b)throw new mC("Length must be a positive integer. Length: "+b);if(b>Fm(a.ob,Ag).length)throw new mC("From Index: 0  To Index: "+b+"  Text Length: "+Fm(a.ob,Ag).length);try{a.ob.setSelectionRange(0,0+b)}catch(c){}}};_.a=null;function XO(a){a.i="Cancel";a.j="Paste the text to import into the text area below.";a.b="Accept";xJ(a.H.b,"Paste")}function YO(a){yK();VO.call(this);this.c=a}\nq(617,611,xF,YO);_.wg=function(){SO(this);this.a=(new pJ(this.b)).mc.Ge();qs(this.a,new ZO(this),(po(),po(),qo));this.d=E(UO,m,60,[this.a,this.f])};_.xg=function(){es(this.e,"150px")};_.yg=function(){XO(this)};_.Rd=function(){UK(this);um((rm(),sm),new $O(this))};_.a=null;_.b=null;_.c=null;function aP(a){yK();YO.call(this,a)}q(616,617,xF,aP);\n_.xg=function(){es(this.e,"150px");var a=new bP(this),b=this.e;MO(b,new cP,(CO(),CO(),DO));MO(b,new dP,(yO(),yO(),zO));MO(b,new eP,(FO(),FO(),GO));MO(b,new fP(a),(IO(),IO(),JO))};_.yg=function(){XO(this);this.j+=" Or drag and drop a file on it."};q(620,1,{});q(619,620,{});_.b=null;_.c=1;_.d=-1;function bP(a){this.a=a;this.b=new gP(this);this.c=this.d=1}q(618,619,{},bP);_.a=null;function gP(a){this.a=a}q(621,1,{},gP);_.zg=function(a){this.a.a.e.ob[Ag]=null!=a?a:l};_.a=null;\nfunction ZO(a){this.a=a}q(625,1,{},ZO);_.Vc=function(){if(this.a.c){var a=this.a.c,b;b=new Px(a.a,0,Fm(this.a.e.ob,Ag));cD(a.a.a,b.a)}FK(this.a,!1)};_.a=null;function $O(a){this.a=a}q(626,1,{},$O);_.Cc=function(){ms(this.a.e.ob,!0);this.a.e.ob.focus()};_.a=null;q(627,1,gh);_.Mc=kC;_.Nc=function(){var a,b;a=new hP(this.a);void 0!=$wnd.FileReader?b=new aP(a):b=new YO(a);rK(b);RO(b)};_.a=null;function hP(a){this.a=a}q(628,1,{},hP);_.a=null;q(629,1,gh);_.Mc=kC;\n_.Nc=function(){var a;a=new VO;var b=this.a,c;Vu(a.e,b);b=(c=rC(b,"\\r\\n|\\r|\\n|\\n\\r"),c.length);es(a.e,20*(10>b?b:10)+sf);um((rm(),sm),new WO(a));rK(a);RO(a)};_.a=null;function LO(a,b){a.onloadend=function(a){b.zg(a.target.result)}}function fP(a){this.a=a}q(634,1,{},fP);_.a=null;function cP(){}q(635,1,{},cP);function dP(){}q(636,1,{},dP);function eP(){}q(637,1,{},eP);Y(620);Y(619);Y(634);Y(635);Y(636);Y(637);Y(202);Y(204);Y(203);Y(205);Y(206);Y(611);var UO=$B(774,wN);Y(617);Y(616);Y(627);Y(628);Y(629);\nY(614);Y(615);Y(625);Y(626);Y(618);Y(621);Y(323);Y(372);Y(363);x(qF)(5);function kC(){};\n//@ sourceURL=5.js\n')