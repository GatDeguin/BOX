var hh=Object.defineProperty;var fh=(r,e,t)=>e in r?hh(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Cr=(r,e,t)=>fh(r,typeof e!="symbol"?e+"":e,t);const Au={mma:"mmaGym",bodybuilder:"bodybuilderArena",tyson:"tysonRing",principal:"tysonRing"};function uo(r){return Au[r]}const ph={ring:Au.mma,ringOverride:!1,freeCamera:!1,character:"mma",selectionStarted:!1,progress:{wins:{entrenamiento:{mma:0,bodybuilder:0,tyson:0,principal:0},amateur:{mma:0,bodybuilder:0,tyson:0,principal:0},pro:{mma:0,bodybuilder:0,tyson:0,principal:0},secreto:{mma:0,bodybuilder:0,tyson:0,principal:0}},activeGlove:"entrenamiento",unlocks:{amateur:!1,tyson:!1,pro:!1,secreto:!1}}};function mh(r=ph){let e={...r};const t=new Set,n=()=>{t.forEach(i=>i(e))};return{getState:()=>e,subscribe:i=>(t.add(i),i(e),()=>t.delete(i)),setState:i=>{const s={...e,...i},o=Object.keys(i).some(a=>e[a]!==s[a]);e=s,o&&n()}}}const Ft=mh(),zr={entrenamiento:{mma:0,bodybuilder:0,tyson:0,principal:0},amateur:{mma:0,bodybuilder:0,tyson:0,principal:0},pro:{mma:0,bodybuilder:0,tyson:0,principal:0},secreto:{mma:0,bodybuilder:0,tyson:0,principal:0}},gh={entrenamiento:"Guantes de entrenamiento",amateur:"Guantes amateur",pro:"Guantes Pro",secreto:"Guantes secretos"};function wu(r){return{entrenamiento:{...zr.entrenamiento,...r.entrenamiento},amateur:{...zr.amateur,...r.amateur},pro:{...zr.pro,...r.pro},secreto:{...zr.secreto,...r.secreto}}}function Cu(r){const e=r.entrenamiento.mma>0&&r.entrenamiento.bodybuilder>0,t=e&&r.amateur.mma>0&&r.amateur.bodybuilder>0,n=t&&r.amateur.tyson>0,i=n&&r.pro.mma>0&&r.pro.bodybuilder>0&&r.pro.tyson>0;return{amateur:e,tyson:t,pro:n,secreto:i}}function Ru(r,e){return(n=>n==="entrenamiento"?!0:n==="amateur"?e.amateur:n==="pro"?e.pro:e.secreto)(r)?r:e.secreto?"secreto":e.pro?"pro":e.amateur?"amateur":"entrenamiento"}function Lt(r){const e=wu((r==null?void 0:r.wins)??zr),t=Cu(e),n=Ru((r==null?void 0:r.activeGlove)??"entrenamiento",t);return{wins:e,unlocks:t,activeGlove:n}}function Lu(r,e){return r==="tyson"?e.unlocks.tyson:!0}function ya(r,e){if(r==="tyson"&&!e.unlocks.tyson){const t=[];return(e.wins.entrenamiento.mma<=0||e.wins.entrenamiento.bodybuilder<=0)&&t.push("completar las victorias base (guantes de entrenamiento)"),e.wins.amateur.mma<=0&&t.push("derrotar a MMA con guantes amateur"),e.wins.amateur.bodybuilder<=0&&t.push("derrotar al Bodybuilder con guantes amateur"),`Para retar a Tyson debes ${t.join(" y ")}.`}return null}function Ws(r){return r.unlocks.amateur?r.unlocks.tyson?r.unlocks.pro?r.unlocks.secreto?"Ruta secreta completada: guantes negros y dorados equipados.":"Gana de nuevo a todos usando los guantes PRO para revelar los guantes secretos.":"Vence a Tyson con guantes amateur para obtener los guantes PRO.":"Repite las victorias con guantes amateur para abrir el desafío contra Tyson.":"Gana una vez a MMA y Bodybuilder con guantes de entrenamiento para obtener los guantes amateur."}function xh(r,e){const t=Lt(r.getState().progress),n=wu(t.wins),i=n[t.activeGlove];i[e]=(i[e]??0)+1;const s=Cu(n),a=!t.unlocks.pro&&s.pro?"pro":Ru(t.activeGlove,s),l={wins:n,unlocks:s,activeGlove:a};return r.setState({progress:l}),l}function Pu(r){window.dispatchEvent(new CustomEvent("box9:fight-win",{detail:{opponent:r}}))}function jr(r){return gh[r]??r}function _h(r=Ft){const e=t=>{const n=t.detail;n!=null&&n.opponent&&xh(r,n.opponent)};return window.addEventListener("box9:fight-win",e),()=>{window.removeEventListener("box9:fight-win",e)}}const Iu="box9:progress";function vh(){try{const r=localStorage.getItem(Iu);if(!r)return null;const e=JSON.parse(r);return Lt(e)}catch(r){return console.warn("No se pudo leer el progreso guardado de Box9.",r),null}}function bh(r){try{localStorage.setItem(Iu,JSON.stringify(r))}catch(e){console.warn("No se pudo guardar el progreso de Box9.",e)}}function yh(r){const e=vh();e&&r.setState({progress:e});let t=r.getState().progress;return r.subscribe(n=>{n.progress!==t&&(t=n.progress,bh(n.progress))}),r}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wa="160",Ri={ROTATE:0,DOLLY:1,PAN:2},Li={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Mh=0,gl=1,Sh=2,Du=1,Eh=2,Un=3,zn=0,Kt=1,Mn=2,En=0,lr=1,Ys=2,xl=3,_l=4,Th=5,_i=100,Ah=101,wh=102,vl=103,bl=104,Ch=200,Rh=201,Lh=202,Ph=203,Ma=204,Sa=205,Ih=206,Dh=207,Nh=208,Uh=209,Fh=210,Oh=211,Bh=212,kh=213,zh=214,Gh=0,Hh=1,Vh=2,Ks=3,Wh=4,Xh=5,jh=6,qh=7,ho=0,Yh=1,Kh=2,oi=0,Nu=1,Uu=2,Fu=3,Ou=4,Zh=5,Bu=6,yl="attached",$h="detached",ku=300,fr=301,pr=302,Zs=303,Ea=304,fo=306,li=1e3,qt=1001,$s=1002,vt=1003,Ta=1004,Xs=1005,jt=1006,zu=1007,Si=1008,ai=1009,Jh=1010,Qh=1011,Xa=1012,Gu=1013,ni=1014,On=1015,Tn=1016,Hu=1017,Vu=1018,bi=1020,ef=1021,an=1023,tf=1024,nf=1025,yi=1026,mr=1027,rf=1028,Wu=1029,sf=1030,Xu=1031,ju=1033,wo=33776,Co=33777,Ro=33778,Lo=33779,Ml=35840,Sl=35841,El=35842,Tl=35843,qu=36196,Al=37492,wl=37496,Cl=37808,Rl=37809,Ll=37810,Pl=37811,Il=37812,Dl=37813,Nl=37814,Ul=37815,Fl=37816,Ol=37817,Bl=37818,kl=37819,zl=37820,Gl=37821,Po=36492,Hl=36494,Vl=36495,of=36283,Wl=36284,Xl=36285,jl=36286,af=2200,lf=2201,cf=2202,qr=2300,gr=2301,Io=2302,ir=2400,rr=2401,Js=2402,ja=2500,uf=2501,df=0,Yu=1,Aa=2,Ku=3e3,Mi=3001,hf=3200,Zu=3201,po=0,ff=1,ln="",at="srgb",Ct="srgb-linear",qa="display-p3",mo="display-p3-linear",Qs="linear",ot="srgb",eo="rec709",to="p3",Pi=7680,ql=519,pf=512,mf=513,gf=514,$u=515,xf=516,_f=517,vf=518,bf=519,wa=35044,Yl="300 es",Ca=1035,Bn=2e3,no=2001;class Wn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Kl=1234567;const Gr=Math.PI/180,xr=180/Math.PI;function gn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Nt[r&255]+Nt[r>>8&255]+Nt[r>>16&255]+Nt[r>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]).toLowerCase()}function Mt(r,e,t){return Math.max(e,Math.min(t,r))}function Ya(r,e){return(r%e+e)%e}function yf(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Mf(r,e,t){return r!==e?(t-r)/(e-r):0}function Hr(r,e,t){return(1-t)*r+t*e}function Sf(r,e,t,n){return Hr(r,e,1-Math.exp(-t*n))}function Ef(r,e=1){return e-Math.abs(Ya(r,e*2)-e)}function Tf(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Af(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function wf(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Cf(r,e){return r+Math.random()*(e-r)}function Rf(r){return r*(.5-Math.random())}function Lf(r){r!==void 0&&(Kl=r);let e=Kl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Pf(r){return r*Gr}function If(r){return r*xr}function Ra(r){return(r&r-1)===0&&r!==0}function Df(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function io(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Nf(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),h=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*h,a*c);break;case"YZY":r.set(l*h,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*h,a*u,a*c);break;case"XZX":r.set(a*u,l*g,l*f,a*c);break;case"YXY":r.set(l*f,a*u,l*g,a*c);break;case"ZYZ":r.set(l*g,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Sn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function rt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Rt={DEG2RAD:Gr,RAD2DEG:xr,generateUUID:gn,clamp:Mt,euclideanModulo:Ya,mapLinear:yf,inverseLerp:Mf,lerp:Hr,damp:Sf,pingpong:Ef,smoothstep:Tf,smootherstep:Af,randInt:wf,randFloat:Cf,randFloatSpread:Rf,seededRandom:Lf,degToRad:Pf,radToDeg:If,isPowerOfTwo:Ra,ceilPowerOfTwo:Df,floorPowerOfTwo:io,setQuaternionFromProperEuler:Nf,normalize:rt,denormalize:Sn};class ge{constructor(e=0,t=0){ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $e{constructor(e,t,n,i,s,o,a,l,c){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],f=n[5],g=n[8],x=i[0],m=i[3],p=i[6],v=i[1],_=i[4],b=i[7],L=i[2],w=i[5],A=i[8];return s[0]=o*x+a*v+l*L,s[3]=o*m+a*_+l*w,s[6]=o*p+a*b+l*A,s[1]=c*x+u*v+d*L,s[4]=c*m+u*_+d*w,s[7]=c*p+u*b+d*A,s[2]=h*x+f*v+g*L,s[5]=h*m+f*_+g*w,s[8]=h*p+f*b+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*s,f=c*s-o*l,g=t*d+n*h+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=d*x,e[1]=(i*c-u*n)*x,e[2]=(a*n-i*o)*x,e[3]=h*x,e[4]=(u*t-i*l)*x,e[5]=(i*s-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Do.makeScale(e,t)),this}rotate(e){return this.premultiply(Do.makeRotation(-e)),this}translate(e,t){return this.premultiply(Do.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Do=new $e;function Ju(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Yr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Uf(){const r=Yr("canvas");return r.style.display="block",r}const Zl={};function Vr(r){r in Zl||(Zl[r]=!0,console.warn(r))}const $l=new $e().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Jl=new $e().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ls={[Ct]:{transfer:Qs,primaries:eo,toReference:r=>r,fromReference:r=>r},[at]:{transfer:ot,primaries:eo,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[mo]:{transfer:Qs,primaries:to,toReference:r=>r.applyMatrix3(Jl),fromReference:r=>r.applyMatrix3($l)},[qa]:{transfer:ot,primaries:to,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Jl),fromReference:r=>r.applyMatrix3($l).convertLinearToSRGB()}},Ff=new Set([Ct,mo]),nt={enabled:!0,_workingColorSpace:Ct,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Ff.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=ls[e].toReference,i=ls[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return ls[r].primaries},getTransfer:function(r){return r===ln?Qs:ls[r].transfer}};function cr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function No(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ii;class Qu{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ii===void 0&&(Ii=Yr("canvas")),Ii.width=e.width,Ii.height=e.height;const n=Ii.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ii}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Yr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=cr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(cr(t[n]/255)*255):t[n]=cr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Of=0;class ed{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=gn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Uo(i[o].image)):s.push(Uo(i[o]))}else s=Uo(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Uo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Qu.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bf=0;class yt extends Wn{constructor(e=yt.DEFAULT_IMAGE,t=yt.DEFAULT_MAPPING,n=qt,i=qt,s=jt,o=Si,a=an,l=ai,c=yt.DEFAULT_ANISOTROPY,u=ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=gn(),this.name="",this.source=new ed(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ge(0,0),this.repeat=new ge(1,1),this.center=new ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Vr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Mi?at:ln),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ku)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case li:e.x=e.x-Math.floor(e.x);break;case qt:e.x=e.x<0?0:1;break;case $s:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case li:e.y=e.y-Math.floor(e.y);break;case qt:e.y=e.y<0?0:1;break;case $s:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Vr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===at?Mi:Ku}set encoding(e){Vr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Mi?at:ln}}yt.DEFAULT_IMAGE=null;yt.DEFAULT_MAPPING=ku;yt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,i=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,b=(f+1)/2,L=(p+1)/2,w=(u+h)/4,A=(d+x)/4,U=(g+m)/4;return _>b&&_>L?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=w/n,s=A/n):b>L?b<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),n=w/i,s=U/i):L<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(L),n=A/s,i=U/s),this.set(n,i,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(d-x)/v,this.z=(h-u)/v,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class kf extends Wn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(Vr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Mi?at:ln),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new yt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ed(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class un extends kf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class td extends yt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=vt,this.minFilter=vt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zf extends yt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=vt,this.minFilter=vt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const h=s[o+0],f=s[o+1],g=s[o+2],x=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(d!==x||l!==h||c!==f||u!==g){let m=1-a;const p=l*h+c*f+u*g+d*x,v=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const L=Math.sqrt(_),w=Math.atan2(L,p*v);m=Math.sin(m*w)/L,a=Math.sin(a*w)/L}const b=a*v;if(l=l*m+h*b,c=c*m+f*b,u=u*m+g*b,d=d*m+x*b,m===1-a){const L=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=L,c*=L,u*=L,d*=L}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],h=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+u*d+l*f-c*h,e[t+1]=l*g+u*h+c*d-a*f,e[t+2]=c*g+u*f+a*h-l*d,e[t+3]=u*g-a*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),h=l(n/2),f=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=n*d+this._x*h,this._y=i*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ql.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ql.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Fo.copy(this).projectOnVector(e),this.sub(Fo)}reflect(e){return this.sub(Fo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fo=new C,Ql=new xt;class Xn{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(dn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(dn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=dn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,dn):dn.fromBufferAttribute(s,o),dn.applyMatrix4(e.matrixWorld),this.expandByPoint(dn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cs.copy(n.boundingBox)),cs.applyMatrix4(e.matrixWorld),this.union(cs)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,dn),dn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rr),us.subVectors(this.max,Rr),Di.subVectors(e.a,Rr),Ni.subVectors(e.b,Rr),Ui.subVectors(e.c,Rr),qn.subVectors(Ni,Di),Yn.subVectors(Ui,Ni),hi.subVectors(Di,Ui);let t=[0,-qn.z,qn.y,0,-Yn.z,Yn.y,0,-hi.z,hi.y,qn.z,0,-qn.x,Yn.z,0,-Yn.x,hi.z,0,-hi.x,-qn.y,qn.x,0,-Yn.y,Yn.x,0,-hi.y,hi.x,0];return!Oo(t,Di,Ni,Ui,us)||(t=[1,0,0,0,1,0,0,0,1],!Oo(t,Di,Ni,Ui,us))?!1:(ds.crossVectors(qn,Yn),t=[ds.x,ds.y,ds.z],Oo(t,Di,Ni,Ui,us))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,dn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(dn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Rn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Rn=[new C,new C,new C,new C,new C,new C,new C,new C],dn=new C,cs=new Xn,Di=new C,Ni=new C,Ui=new C,qn=new C,Yn=new C,hi=new C,Rr=new C,us=new C,ds=new C,fi=new C;function Oo(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){fi.fromArray(r,s);const a=i.x*Math.abs(fi.x)+i.y*Math.abs(fi.y)+i.z*Math.abs(fi.z),l=e.dot(fi),c=t.dot(fi),u=n.dot(fi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Gf=new Xn,Lr=new C,Bo=new C;class An{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Gf.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Lr.subVectors(e,this.center);const t=Lr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Lr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Lr.copy(e.center).add(Bo)),this.expandByPoint(Lr.copy(e.center).sub(Bo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ln=new C,ko=new C,hs=new C,Kn=new C,zo=new C,fs=new C,Go=new C;class Qr{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ln.copy(this.origin).addScaledVector(this.direction,t),Ln.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ko.copy(e).add(t).multiplyScalar(.5),hs.copy(t).sub(e).normalize(),Kn.copy(this.origin).sub(ko);const s=e.distanceTo(t)*.5,o=-this.direction.dot(hs),a=Kn.dot(this.direction),l=-Kn.dot(hs),c=Kn.lengthSq(),u=Math.abs(1-o*o);let d,h,f,g;if(u>0)if(d=o*l-a,h=o*a-l,g=s*u,d>=0)if(h>=-g)if(h<=g){const x=1/u;d*=x,h*=x,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+h*(h+2*l)+c);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(ko).addScaledVector(hs,h),f}intersectSphere(e,t){Ln.subVectors(e.center,this.origin);const n=Ln.dot(this.direction),i=Ln.dot(Ln)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ln)!==null}intersectTriangle(e,t,n,i,s){zo.subVectors(t,e),fs.subVectors(n,e),Go.crossVectors(zo,fs);let o=this.direction.dot(Go),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Kn.subVectors(this.origin,e);const l=a*this.direction.dot(fs.crossVectors(Kn,fs));if(l<0)return null;const c=a*this.direction.dot(zo.cross(Kn));if(c<0||l+c>o)return null;const u=-a*Kn.dot(Go);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ce{constructor(e,t,n,i,s,o,a,l,c,u,d,h,f,g,x,m){Ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,h,f,g,x,m)}set(e,t,n,i,s,o,a,l,c,u,d,h,f,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ce().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Fi.setFromMatrixColumn(e,0).length(),s=1/Fi.setFromMatrixColumn(e,1).length(),o=1/Fi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*u,f=o*d,g=a*u,x=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=h-x*c,t[9]=-a*l,t[2]=x-h*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,g=c*u,x=c*d;t[0]=h+x*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=f*a-g,t[6]=x+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,g=c*u,x=c*d;t[0]=h-x*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*u,t[9]=x-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,f=o*d,g=a*u,x=a*d;t[0]=l*u,t[4]=g*c-f,t[8]=h*c+x,t[1]=l*d,t[5]=x*c+h,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=x-h*d,t[8]=g*d+f,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=f*d+g,t[10]=h-x*d}else if(e.order==="XZY"){const h=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+x,t[5]=o*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hf,e,Vf)}lookAt(e,t,n){const i=this.elements;return $t.subVectors(e,t),$t.lengthSq()===0&&($t.z=1),$t.normalize(),Zn.crossVectors(n,$t),Zn.lengthSq()===0&&(Math.abs(n.z)===1?$t.x+=1e-4:$t.z+=1e-4,$t.normalize(),Zn.crossVectors(n,$t)),Zn.normalize(),ps.crossVectors($t,Zn),i[0]=Zn.x,i[4]=ps.x,i[8]=$t.x,i[1]=Zn.y,i[5]=ps.y,i[9]=$t.y,i[2]=Zn.z,i[6]=ps.z,i[10]=$t.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],v=n[3],_=n[7],b=n[11],L=n[15],w=i[0],A=i[4],U=i[8],M=i[12],T=i[1],k=i[5],j=i[9],J=i[13],D=i[2],F=i[6],z=i[10],q=i[14],Y=i[3],K=i[7],Z=i[11],ee=i[15];return s[0]=o*w+a*T+l*D+c*Y,s[4]=o*A+a*k+l*F+c*K,s[8]=o*U+a*j+l*z+c*Z,s[12]=o*M+a*J+l*q+c*ee,s[1]=u*w+d*T+h*D+f*Y,s[5]=u*A+d*k+h*F+f*K,s[9]=u*U+d*j+h*z+f*Z,s[13]=u*M+d*J+h*q+f*ee,s[2]=g*w+x*T+m*D+p*Y,s[6]=g*A+x*k+m*F+p*K,s[10]=g*U+x*j+m*z+p*Z,s[14]=g*M+x*J+m*q+p*ee,s[3]=v*w+_*T+b*D+L*Y,s[7]=v*A+_*k+b*F+L*K,s[11]=v*U+_*j+b*z+L*Z,s[15]=v*M+_*J+b*q+L*ee,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+s*l*d-i*c*d-s*a*h+n*c*h+i*a*f-n*l*f)+x*(+t*l*f-t*c*h+s*o*h-i*o*f+i*c*u-s*l*u)+m*(+t*c*d-t*a*f-s*o*d+n*o*f+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*h+i*o*d-n*o*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],v=d*m*c-x*h*c+x*l*f-a*m*f-d*l*p+a*h*p,_=g*h*c-u*m*c-g*l*f+o*m*f+u*l*p-o*h*p,b=u*x*c-g*d*c+g*a*f-o*x*f-u*a*p+o*d*p,L=g*d*l-u*x*l-g*a*h+o*x*h+u*a*m-o*d*m,w=t*v+n*_+i*b+s*L;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=v*A,e[1]=(x*h*s-d*m*s-x*i*f+n*m*f+d*i*p-n*h*p)*A,e[2]=(a*m*s-x*l*s+x*i*c-n*m*c-a*i*p+n*l*p)*A,e[3]=(d*l*s-a*h*s-d*i*c+n*h*c+a*i*f-n*l*f)*A,e[4]=_*A,e[5]=(u*m*s-g*h*s+g*i*f-t*m*f-u*i*p+t*h*p)*A,e[6]=(g*l*s-o*m*s-g*i*c+t*m*c+o*i*p-t*l*p)*A,e[7]=(o*h*s-u*l*s+u*i*c-t*h*c-o*i*f+t*l*f)*A,e[8]=b*A,e[9]=(g*d*s-u*x*s-g*n*f+t*x*f+u*n*p-t*d*p)*A,e[10]=(o*x*s-g*a*s+g*n*c-t*x*c-o*n*p+t*a*p)*A,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*f-t*a*f)*A,e[12]=L*A,e[13]=(u*x*i-g*d*i+g*n*h-t*x*h-u*n*m+t*d*m)*A,e[14]=(g*a*i-o*x*i-g*n*l+t*x*l+o*n*m-t*a*m)*A,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*h+t*a*h)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,h=s*c,f=s*u,g=s*d,x=o*u,m=o*d,p=a*d,v=l*c,_=l*u,b=l*d,L=n.x,w=n.y,A=n.z;return i[0]=(1-(x+p))*L,i[1]=(f+b)*L,i[2]=(g-_)*L,i[3]=0,i[4]=(f-b)*w,i[5]=(1-(h+p))*w,i[6]=(m+v)*w,i[7]=0,i[8]=(g+_)*A,i[9]=(m-v)*A,i[10]=(1-(h+x))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Fi.set(i[0],i[1],i[2]).length();const o=Fi.set(i[4],i[5],i[6]).length(),a=Fi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],hn.copy(this);const c=1/s,u=1/o,d=1/a;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=u,hn.elements[5]*=u,hn.elements[6]*=u,hn.elements[8]*=d,hn.elements[9]*=d,hn.elements[10]*=d,t.setFromRotationMatrix(hn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Bn){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),h=(n+i)/(n-i);let f,g;if(a===Bn)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===no)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Bn){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(o-s),h=(t+e)*c,f=(n+i)*u;let g,x;if(a===Bn)g=(o+s)*d,x=-2*d;else if(a===no)g=s*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Fi=new C,hn=new Ce,Hf=new C(0,0,0),Vf=new C(1,1,1),Zn=new C,ps=new C,$t=new C,ec=new Ce,tc=new xt;class bt{constructor(e=0,t=0,n=0,i=bt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],h=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ec.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ec,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return tc.setFromEuler(this),this.setFromQuaternion(tc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bt.DEFAULT_ORDER="XYZ";class nd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Wf=0;const nc=new C,Oi=new xt,Pn=new Ce,ms=new C,Pr=new C,Xf=new C,jf=new xt,ic=new C(1,0,0),rc=new C(0,1,0),sc=new C(0,0,1),qf={type:"added"},Yf={type:"removed"};class st extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=st.DEFAULT_UP.clone();const e=new C,t=new bt,n=new xt,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ce},normalMatrix:{value:new $e}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=st.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=st.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.premultiply(Oi),this}rotateX(e){return this.rotateOnAxis(ic,e)}rotateY(e){return this.rotateOnAxis(rc,e)}rotateZ(e){return this.rotateOnAxis(sc,e)}translateOnAxis(e,t){return nc.copy(e).applyQuaternion(this.quaternion),this.position.add(nc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ic,e)}translateY(e){return this.translateOnAxis(rc,e)}translateZ(e){return this.translateOnAxis(sc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ms.copy(e):ms.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(Pr,ms,this.up):Pn.lookAt(ms,Pr,this.up),this.quaternion.setFromRotationMatrix(Pn),i&&(Pn.extractRotation(i.matrixWorld),Oi.setFromRotationMatrix(Pn),this.quaternion.premultiply(Oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(qf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Yf)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,e,Xf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pr,jf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}st.DEFAULT_UP=new C(0,1,0);st.DEFAULT_MATRIX_AUTO_UPDATE=!0;st.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fn=new C,In=new C,Ho=new C,Dn=new C,Bi=new C,ki=new C,oc=new C,Vo=new C,Wo=new C,Xo=new C;let gs=!1;class on{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),fn.subVectors(e,t),i.cross(fn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){fn.subVectors(i,t),In.subVectors(n,t),Ho.subVectors(e,t);const o=fn.dot(fn),a=fn.dot(In),l=fn.dot(Ho),c=In.dot(In),u=In.dot(Ho),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,f=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getUV(e,t,n,i,s,o,a,l){return gs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),gs=!0),this.getInterpolation(e,t,n,i,s,o,a,l)}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Dn.x),l.addScaledVector(o,Dn.y),l.addScaledVector(a,Dn.z),l)}static isFrontFacing(e,t,n,i){return fn.subVectors(n,t),In.subVectors(e,t),fn.cross(In).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fn.subVectors(this.c,this.b),In.subVectors(this.a,this.b),fn.cross(In).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return on.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return on.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return gs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),gs=!0),on.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return on.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return on.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return on.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Bi.subVectors(i,n),ki.subVectors(s,n),Vo.subVectors(e,n);const l=Bi.dot(Vo),c=ki.dot(Vo);if(l<=0&&c<=0)return t.copy(n);Wo.subVectors(e,i);const u=Bi.dot(Wo),d=ki.dot(Wo);if(u>=0&&d<=u)return t.copy(i);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Bi,o);Xo.subVectors(e,s);const f=Bi.dot(Xo),g=ki.dot(Xo);if(g>=0&&f<=g)return t.copy(s);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(ki,a);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return oc.subVectors(s,i),a=(d-u)/(d-u+(f-g)),t.copy(i).addScaledVector(oc,a);const p=1/(m+x+h);return o=x*p,a=h*p,t.copy(n).addScaledVector(Bi,o).addScaledVector(ki,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},xs={h:0,s:0,l:0};function jo(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Me{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=at){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=nt.workingColorSpace){if(e=Ya(e,1),t=Mt(t,0,1),n=Mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=jo(o,s,e+1/3),this.g=jo(o,s,e),this.b=jo(o,s,e-1/3)}return nt.toWorkingColorSpace(this,i),this}setStyle(e,t=at){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=at){const n=id[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=cr(e.r),this.g=cr(e.g),this.b=cr(e.b),this}copyLinearToSRGB(e){return this.r=No(e.r),this.g=No(e.g),this.b=No(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=at){return nt.fromWorkingColorSpace(Ut.copy(this),e),Math.round(Mt(Ut.r*255,0,255))*65536+Math.round(Mt(Ut.g*255,0,255))*256+Math.round(Mt(Ut.b*255,0,255))}getHexString(e=at){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.fromWorkingColorSpace(Ut.copy(this),t);const n=Ut.r,i=Ut.g,s=Ut.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=nt.workingColorSpace){return nt.fromWorkingColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=at){nt.fromWorkingColorSpace(Ut.copy(this),e);const t=Ut.r,n=Ut.g,i=Ut.b;return e!==at?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL($n),this.setHSL($n.h+e,$n.s+t,$n.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL($n),e.getHSL(xs);const n=Hr($n.h,xs.h,t),i=Hr($n.s,xs.s,t),s=Hr($n.l,xs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new Me;Me.NAMES=id;let Kf=0;class Qt extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=gn(),this.name="",this.type="Material",this.blending=lr,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ma,this.blendDst=Sa,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Me(0,0,0),this.blendAlpha=0,this.depthFunc=Ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ql,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==lr&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ma&&(n.blendSrc=this.blendSrc),this.blendDst!==Sa&&(n.blendDst=this.blendDst),this.blendEquation!==_i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ks&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ql&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ii extends Qt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new C,_s=new ge;class Wt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=wa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)_s.fromBufferAttribute(this,t),_s.applyMatrix3(e),this.setXY(t,_s.x,_s.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==wa&&(e.usage=this.usage),e}}class Ka extends Wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class rd extends Wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wt extends Wt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Zf=0;const nn=new Ce,qo=new st,zi=new C,Jt=new Xn,Ir=new Xn,At=new C;class Ot extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=gn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ju(e)?rd:Ka)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new $e().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,n){return nn.makeTranslation(e,t,n),this.applyMatrix4(nn),this}scale(e,t,n){return nn.makeScale(e,t,n),this.applyMatrix4(nn),this}lookAt(e){return qo.lookAt(e),qo.updateMatrix(),this.applyMatrix4(qo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new wt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Jt.setFromBufferAttribute(s),this.morphTargetsRelative?(At.addVectors(this.boundingBox.min,Jt.min),this.boundingBox.expandByPoint(At),At.addVectors(this.boundingBox.max,Jt.max),this.boundingBox.expandByPoint(At)):(this.boundingBox.expandByPoint(Jt.min),this.boundingBox.expandByPoint(Jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new An);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(Jt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Ir.setFromBufferAttribute(a),this.morphTargetsRelative?(At.addVectors(Jt.min,Ir.min),Jt.expandByPoint(At),At.addVectors(Jt.max,Ir.max),Jt.expandByPoint(At)):(Jt.expandByPoint(Ir.min),Jt.expandByPoint(Ir.max))}Jt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)At.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(At));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)At.fromBufferAttribute(a,c),l&&(zi.fromBufferAttribute(e,c),At.add(zi)),i=Math.max(i,n.distanceToSquared(At))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let T=0;T<a;T++)c[T]=new C,u[T]=new C;const d=new C,h=new C,f=new C,g=new ge,x=new ge,m=new ge,p=new C,v=new C;function _(T,k,j){d.fromArray(i,T*3),h.fromArray(i,k*3),f.fromArray(i,j*3),g.fromArray(o,T*2),x.fromArray(o,k*2),m.fromArray(o,j*2),h.sub(d),f.sub(d),x.sub(g),m.sub(g);const J=1/(x.x*m.y-m.x*x.y);isFinite(J)&&(p.copy(h).multiplyScalar(m.y).addScaledVector(f,-x.y).multiplyScalar(J),v.copy(f).multiplyScalar(x.x).addScaledVector(h,-m.x).multiplyScalar(J),c[T].add(p),c[k].add(p),c[j].add(p),u[T].add(v),u[k].add(v),u[j].add(v))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let T=0,k=b.length;T<k;++T){const j=b[T],J=j.start,D=j.count;for(let F=J,z=J+D;F<z;F+=3)_(n[F+0],n[F+1],n[F+2])}const L=new C,w=new C,A=new C,U=new C;function M(T){A.fromArray(s,T*3),U.copy(A);const k=c[T];L.copy(k),L.sub(A.multiplyScalar(A.dot(k))).normalize(),w.crossVectors(U,k);const J=w.dot(u[T])<0?-1:1;l[T*4]=L.x,l[T*4+1]=L.y,l[T*4+2]=L.z,l[T*4+3]=J}for(let T=0,k=b.length;T<k;++T){const j=b[T],J=j.start,D=j.count;for(let F=J,z=J+D;F<z;F+=3)M(n[F+0]),M(n[F+1]),M(n[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new C,s=new C,o=new C,a=new C,l=new C,c=new C,u=new C,d=new C;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)i.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)At.fromBufferAttribute(e,t),At.normalize(),e.setXYZ(t,At.x,At.y,At.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*u;for(let p=0;p<u;p++)h[g++]=c[f++]}return new Wt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ac=new Ce,pi=new Qr,vs=new An,lc=new C,Gi=new C,Hi=new C,Vi=new C,Yo=new C,bs=new C,ys=new ge,Ms=new ge,Ss=new ge,cc=new C,uc=new C,dc=new C,Es=new C,Ts=new C;class Yt extends st{constructor(e=new Ot,t=new ii){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){bs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Yo.fromBufferAttribute(d,e),o?bs.addScaledVector(Yo,u):bs.addScaledVector(Yo.sub(t),u))}t.add(bs)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vs.copy(n.boundingSphere),vs.applyMatrix4(s),pi.copy(e.ray).recast(e.near),!(vs.containsPoint(pi.origin)===!1&&(pi.intersectSphere(vs,lc)===null||pi.origin.distanceToSquared(lc)>(e.far-e.near)**2))&&(ac.copy(s).invert(),pi.copy(e.ray).applyMatrix4(ac),!(n.boundingBox!==null&&pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,pi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=h.length;g<x;g++){const m=h[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let b=v,L=_;b<L;b+=3){const w=a.getX(b),A=a.getX(b+1),U=a.getX(b+2);i=As(this,p,e,n,c,u,d,w,A,U),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const v=a.getX(m),_=a.getX(m+1),b=a.getX(m+2);i=As(this,o,e,n,c,u,d,v,_,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=h.length;g<x;g++){const m=h[g],p=o[m.materialIndex],v=Math.max(m.start,f.start),_=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=v,L=_;b<L;b+=3){const w=b,A=b+1,U=b+2;i=As(this,p,e,n,c,u,d,w,A,U),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const v=m,_=m+1,b=m+2;i=As(this,o,e,n,c,u,d,v,_,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function $f(r,e,t,n,i,s,o,a){let l;if(e.side===Kt?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===zn,a),l===null)return null;Ts.copy(a),Ts.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ts);return c<t.near||c>t.far?null:{distance:c,point:Ts.clone(),object:r}}function As(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Gi),r.getVertexPosition(l,Hi),r.getVertexPosition(c,Vi);const u=$f(r,e,t,n,Gi,Hi,Vi,Es);if(u){i&&(ys.fromBufferAttribute(i,a),Ms.fromBufferAttribute(i,l),Ss.fromBufferAttribute(i,c),u.uv=on.getInterpolation(Es,Gi,Hi,Vi,ys,Ms,Ss,new ge)),s&&(ys.fromBufferAttribute(s,a),Ms.fromBufferAttribute(s,l),Ss.fromBufferAttribute(s,c),u.uv1=on.getInterpolation(Es,Gi,Hi,Vi,ys,Ms,Ss,new ge),u.uv2=u.uv1),o&&(cc.fromBufferAttribute(o,a),uc.fromBufferAttribute(o,l),dc.fromBufferAttribute(o,c),u.normal=on.getInterpolation(Es,Gi,Hi,Vi,cc,uc,dc,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new C,materialIndex:0};on.getNormal(Gi,Hi,Vi,d.normal),u.face=d}return u}class es extends Ot{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new wt(c,3)),this.setAttribute("normal",new wt(u,3)),this.setAttribute("uv",new wt(d,2));function g(x,m,p,v,_,b,L,w,A,U,M){const T=b/A,k=L/U,j=b/2,J=L/2,D=w/2,F=A+1,z=U+1;let q=0,Y=0;const K=new C;for(let Z=0;Z<z;Z++){const ee=Z*k-J;for(let ie=0;ie<F;ie++){const H=ie*T-j;K[x]=H*v,K[m]=ee*_,K[p]=D,c.push(K.x,K.y,K.z),K[x]=0,K[m]=0,K[p]=w>0?1:-1,u.push(K.x,K.y,K.z),d.push(ie/A),d.push(1-Z/U),q+=1}}for(let Z=0;Z<U;Z++)for(let ee=0;ee<A;ee++){const ie=h+ee+F*Z,H=h+ee+F*(Z+1),$=h+(ee+1)+F*(Z+1),ce=h+(ee+1)+F*Z;l.push(ie,H,ce),l.push(H,$,ce),Y+=6}a.addGroup(f,Y,M),f+=Y,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new es(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function _r(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function zt(r){const e={};for(let t=0;t<r.length;t++){const n=_r(r[t]);for(const i in n)e[i]=n[i]}return e}function Jf(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function sd(r){return r.getRenderTarget()===null?r.outputColorSpace:nt.workingColorSpace}const vr={clone:_r,merge:zt};var Qf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ep=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vt extends Qt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qf,this.fragmentShader=ep,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_r(e.uniforms),this.uniformsGroups=Jf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class od extends st{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=Bn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Pt extends od{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=xr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return xr*2*Math.atan(Math.tan(Gr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Gr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Wi=-90,Xi=1;class tp extends st{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Pt(Wi,Xi,e,t);i.layers=this.layers,this.add(i);const s=new Pt(Wi,Xi,e,t);s.layers=this.layers,this.add(s);const o=new Pt(Wi,Xi,e,t);o.layers=this.layers,this.add(o);const a=new Pt(Wi,Xi,e,t);a.layers=this.layers,this.add(a);const l=new Pt(Wi,Xi,e,t);l.layers=this.layers,this.add(l);const c=new Pt(Wi,Xi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Bn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===no)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ad extends yt{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:fr,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class np extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Vr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Mi?at:ln),this.texture=new ad(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new es(5,5,5),s=new Vt({name:"CubemapFromEquirect",uniforms:_r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kt,blending:En});s.uniforms.tEquirect.value=t;const o=new Yt(i,s),a=t.minFilter;return t.minFilter===Si&&(t.minFilter=jt),new tp(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const Ko=new C,ip=new C,rp=new $e;class ei{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Ko.subVectors(n,t).cross(ip.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ko),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||rp.getNormalMatrix(e),i=this.coplanarPoint(Ko).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mi=new An,ws=new C;class Za{constructor(e=new ei,t=new ei,n=new ei,i=new ei,s=new ei,o=new ei){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Bn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],h=i[7],f=i[8],g=i[9],x=i[10],m=i[11],p=i[12],v=i[13],_=i[14],b=i[15];if(n[0].setComponents(l-s,h-c,m-f,b-p).normalize(),n[1].setComponents(l+s,h+c,m+f,b+p).normalize(),n[2].setComponents(l+o,h+u,m+g,b+v).normalize(),n[3].setComponents(l-o,h-u,m-g,b-v).normalize(),n[4].setComponents(l-a,h-d,m-x,b-_).normalize(),t===Bn)n[5].setComponents(l+a,h+d,m+x,b+_).normalize();else if(t===no)n[5].setComponents(a,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(e){return mi.center.set(0,0,0),mi.radius=.7071067811865476,mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(ws.x=i.normal.x>0?e.max.x:e.min.x,ws.y=i.normal.y>0?e.max.y:e.min.y,ws.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ld(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function sp(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,u){const d=c.array,h=c.usage,f=d.byteLength,g=r.createBuffer();r.bindBuffer(u,g),r.bufferData(u,d,h),c.onUploadCallback();let x;if(d instanceof Float32Array)x=r.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)x=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=r.SHORT;else if(d instanceof Uint32Array)x=r.UNSIGNED_INT;else if(d instanceof Int32Array)x=r.INT;else if(d instanceof Int8Array)x=r.BYTE;else if(d instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function s(c,u,d){const h=u.array,f=u._updateRange,g=u.updateRanges;if(r.bindBuffer(d,c),f.count===-1&&g.length===0&&r.bufferSubData(d,0,h),g.length!==0){for(let x=0,m=g.length;x<m;x++){const p=g[x];t?r.bufferSubData(d,p.start*h.BYTES_PER_ELEMENT,h,p.start,p.count):r.bufferSubData(d,p.start*h.BYTES_PER_ELEMENT,h.subarray(p.start,p.start+p.count))}u.clearUpdateRanges()}f.count!==-1&&(t?r.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h,f.offset,f.count):r.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);u&&(r.deleteBuffer(u.buffer),n.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=n.get(c);(!h||h.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);if(d===void 0)n.set(c,i(c,u));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(d.buffer,c,u),d.version=c.version}}return{get:o,remove:a,update:l}}class $a extends Ot{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,h=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<u;p++){const v=p*h-o;for(let _=0;_<c;_++){const b=_*d-s;g.push(b,-v,0),x.push(0,0,1),m.push(_/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let v=0;v<a;v++){const _=v+c*p,b=v+c*(p+1),L=v+1+c*(p+1),w=v+1+c*p;f.push(_,b,w),f.push(b,L,w)}this.setIndex(f),this.setAttribute("position",new wt(g,3)),this.setAttribute("normal",new wt(x,3)),this.setAttribute("uv",new wt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $a(e.width,e.height,e.widthSegments,e.heightSegments)}}var op=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ap=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,lp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,up=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,dp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pp=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,gp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_p=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,vp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Cp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Rp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Lp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Pp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ip=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Np=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Op=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Bp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,kp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Gp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$p=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,em=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,im=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,om=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,am=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,um=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,hm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,fm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,gm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_m=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vm=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,ym=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Mm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Sm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Em=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Rm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Im=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Um=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Om=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,km=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Hm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Wm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Xm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ym=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Km=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Zm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$m=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,eg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,rg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,og=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ag=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ug=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,fg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,pg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,mg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_g=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,bg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Eg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ag=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Lg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ig=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ng=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ug=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Og=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:op,alphahash_pars_fragment:ap,alphamap_fragment:lp,alphamap_pars_fragment:cp,alphatest_fragment:up,alphatest_pars_fragment:dp,aomap_fragment:hp,aomap_pars_fragment:fp,batching_pars_vertex:pp,batching_vertex:mp,begin_vertex:gp,beginnormal_vertex:xp,bsdfs:_p,iridescence_fragment:vp,bumpmap_pars_fragment:bp,clipping_planes_fragment:yp,clipping_planes_pars_fragment:Mp,clipping_planes_pars_vertex:Sp,clipping_planes_vertex:Ep,color_fragment:Tp,color_pars_fragment:Ap,color_pars_vertex:wp,color_vertex:Cp,common:Rp,cube_uv_reflection_fragment:Lp,defaultnormal_vertex:Pp,displacementmap_pars_vertex:Ip,displacementmap_vertex:Dp,emissivemap_fragment:Np,emissivemap_pars_fragment:Up,colorspace_fragment:Fp,colorspace_pars_fragment:Op,envmap_fragment:Bp,envmap_common_pars_fragment:kp,envmap_pars_fragment:zp,envmap_pars_vertex:Gp,envmap_physical_pars_fragment:Qp,envmap_vertex:Hp,fog_vertex:Vp,fog_pars_vertex:Wp,fog_fragment:Xp,fog_pars_fragment:jp,gradientmap_pars_fragment:qp,lightmap_fragment:Yp,lightmap_pars_fragment:Kp,lights_lambert_fragment:Zp,lights_lambert_pars_fragment:$p,lights_pars_begin:Jp,lights_toon_fragment:em,lights_toon_pars_fragment:tm,lights_phong_fragment:nm,lights_phong_pars_fragment:im,lights_physical_fragment:rm,lights_physical_pars_fragment:sm,lights_fragment_begin:om,lights_fragment_maps:am,lights_fragment_end:lm,logdepthbuf_fragment:cm,logdepthbuf_pars_fragment:um,logdepthbuf_pars_vertex:dm,logdepthbuf_vertex:hm,map_fragment:fm,map_pars_fragment:pm,map_particle_fragment:mm,map_particle_pars_fragment:gm,metalnessmap_fragment:xm,metalnessmap_pars_fragment:_m,morphcolor_vertex:vm,morphnormal_vertex:bm,morphtarget_pars_vertex:ym,morphtarget_vertex:Mm,normal_fragment_begin:Sm,normal_fragment_maps:Em,normal_pars_fragment:Tm,normal_pars_vertex:Am,normal_vertex:wm,normalmap_pars_fragment:Cm,clearcoat_normal_fragment_begin:Rm,clearcoat_normal_fragment_maps:Lm,clearcoat_pars_fragment:Pm,iridescence_pars_fragment:Im,opaque_fragment:Dm,packing:Nm,premultiplied_alpha_fragment:Um,project_vertex:Fm,dithering_fragment:Om,dithering_pars_fragment:Bm,roughnessmap_fragment:km,roughnessmap_pars_fragment:zm,shadowmap_pars_fragment:Gm,shadowmap_pars_vertex:Hm,shadowmap_vertex:Vm,shadowmask_pars_fragment:Wm,skinbase_vertex:Xm,skinning_pars_vertex:jm,skinning_vertex:qm,skinnormal_vertex:Ym,specularmap_fragment:Km,specularmap_pars_fragment:Zm,tonemapping_fragment:$m,tonemapping_pars_fragment:Jm,transmission_fragment:Qm,transmission_pars_fragment:eg,uv_pars_fragment:tg,uv_pars_vertex:ng,uv_vertex:ig,worldpos_vertex:rg,background_vert:sg,background_frag:og,backgroundCube_vert:ag,backgroundCube_frag:lg,cube_vert:cg,cube_frag:ug,depth_vert:dg,depth_frag:hg,distanceRGBA_vert:fg,distanceRGBA_frag:pg,equirect_vert:mg,equirect_frag:gg,linedashed_vert:xg,linedashed_frag:_g,meshbasic_vert:vg,meshbasic_frag:bg,meshlambert_vert:yg,meshlambert_frag:Mg,meshmatcap_vert:Sg,meshmatcap_frag:Eg,meshnormal_vert:Tg,meshnormal_frag:Ag,meshphong_vert:wg,meshphong_frag:Cg,meshphysical_vert:Rg,meshphysical_frag:Lg,meshtoon_vert:Pg,meshtoon_frag:Ig,points_vert:Dg,points_frag:Ng,shadow_vert:Ug,shadow_frag:Fg,sprite_vert:Og,sprite_frag:Bg},de={common:{diffuse:{value:new Me(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Me(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Me(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Me(16777215)},opacity:{value:1},center:{value:new ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},yn={basic:{uniforms:zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Me(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:zt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Me(0)},specular:{value:new Me(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:zt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Me(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:zt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Me(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:zt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:zt([de.points,de.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:zt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:zt([de.common,de.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:zt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:zt([de.sprite,de.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:zt([de.common,de.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:zt([de.lights,de.fog,{color:{value:new Me(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};yn.physical={uniforms:zt([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Me(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Me(0)},specularColor:{value:new Me(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const Cs={r:0,b:0,g:0};function kg(r,e,t,n,i,s,o){const a=new Me(0);let l=s===!0?0:1,c,u,d=null,h=0,f=null;function g(m,p){let v=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?x(a,l):_&&_.isColor&&(x(_,1),v=!0);const b=r.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),_&&(_.isCubeTexture||_.mapping===fo)?(u===void 0&&(u=new Yt(new es(1,1,1),new Vt({name:"BackgroundCubeMaterial",uniforms:_r(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,u.material.toneMapped=nt.getTransfer(_.colorSpace)!==ot,(d!==_||h!==_.version||f!==r.toneMapping)&&(u.material.needsUpdate=!0,d=_,h=_.version,f=r.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Yt(new $a(2,2),new Vt({name:"BackgroundMaterial",uniforms:_r(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=nt.getTransfer(_.colorSpace)!==ot,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||h!==_.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,d=_,h=_.version,f=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function x(m,p){m.getRGB(Cs,sd(r)),n.buffers.color.setClear(Cs.r,Cs.g,Cs.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,x(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,x(a,l)},render:g}}function zg(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=m(null);let c=l,u=!1;function d(D,F,z,q,Y){let K=!1;if(o){const Z=x(q,z,F);c!==Z&&(c=Z,f(c.object)),K=p(D,q,z,Y),K&&v(D,q,z,Y)}else{const Z=F.wireframe===!0;(c.geometry!==q.id||c.program!==z.id||c.wireframe!==Z)&&(c.geometry=q.id,c.program=z.id,c.wireframe=Z,K=!0)}Y!==null&&t.update(Y,r.ELEMENT_ARRAY_BUFFER),(K||u)&&(u=!1,U(D,F,z,q),Y!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function h(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function f(D){return n.isWebGL2?r.bindVertexArray(D):s.bindVertexArrayOES(D)}function g(D){return n.isWebGL2?r.deleteVertexArray(D):s.deleteVertexArrayOES(D)}function x(D,F,z){const q=z.wireframe===!0;let Y=a[D.id];Y===void 0&&(Y={},a[D.id]=Y);let K=Y[F.id];K===void 0&&(K={},Y[F.id]=K);let Z=K[q];return Z===void 0&&(Z=m(h()),K[q]=Z),Z}function m(D){const F=[],z=[],q=[];for(let Y=0;Y<i;Y++)F[Y]=0,z[Y]=0,q[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:q,object:D,attributes:{},index:null}}function p(D,F,z,q){const Y=c.attributes,K=F.attributes;let Z=0;const ee=z.getAttributes();for(const ie in ee)if(ee[ie].location>=0){const $=Y[ie];let ce=K[ie];if(ce===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&(ce=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&(ce=D.instanceColor)),$===void 0||$.attribute!==ce||ce&&$.data!==ce.data)return!0;Z++}return c.attributesNum!==Z||c.index!==q}function v(D,F,z,q){const Y={},K=F.attributes;let Z=0;const ee=z.getAttributes();for(const ie in ee)if(ee[ie].location>=0){let $=K[ie];$===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&($=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&($=D.instanceColor));const ce={};ce.attribute=$,$&&$.data&&(ce.data=$.data),Y[ie]=ce,Z++}c.attributes=Y,c.attributesNum=Z,c.index=q}function _(){const D=c.newAttributes;for(let F=0,z=D.length;F<z;F++)D[F]=0}function b(D){L(D,0)}function L(D,F){const z=c.newAttributes,q=c.enabledAttributes,Y=c.attributeDivisors;z[D]=1,q[D]===0&&(r.enableVertexAttribArray(D),q[D]=1),Y[D]!==F&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,F),Y[D]=F)}function w(){const D=c.newAttributes,F=c.enabledAttributes;for(let z=0,q=F.length;z<q;z++)F[z]!==D[z]&&(r.disableVertexAttribArray(z),F[z]=0)}function A(D,F,z,q,Y,K,Z){Z===!0?r.vertexAttribIPointer(D,F,z,Y,K):r.vertexAttribPointer(D,F,z,q,Y,K)}function U(D,F,z,q){if(n.isWebGL2===!1&&(D.isInstancedMesh||q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();const Y=q.attributes,K=z.getAttributes(),Z=F.defaultAttributeValues;for(const ee in K){const ie=K[ee];if(ie.location>=0){let H=Y[ee];if(H===void 0&&(ee==="instanceMatrix"&&D.instanceMatrix&&(H=D.instanceMatrix),ee==="instanceColor"&&D.instanceColor&&(H=D.instanceColor)),H!==void 0){const $=H.normalized,ce=H.itemSize,_e=t.get(H);if(_e===void 0)continue;const le=_e.buffer,Ee=_e.type,Se=_e.bytesPerElement,Te=n.isWebGL2===!0&&(Ee===r.INT||Ee===r.UNSIGNED_INT||H.gpuType===Gu);if(H.isInterleavedBufferAttribute){const Ge=H.data,O=Ge.stride,ut=H.offset;if(Ge.isInstancedInterleavedBuffer){for(let Le=0;Le<ie.locationSize;Le++)L(ie.location+Le,Ge.meshPerAttribute);D.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Ge.meshPerAttribute*Ge.count)}else for(let Le=0;Le<ie.locationSize;Le++)b(ie.location+Le);r.bindBuffer(r.ARRAY_BUFFER,le);for(let Le=0;Le<ie.locationSize;Le++)A(ie.location+Le,ce/ie.locationSize,Ee,$,O*Se,(ut+ce/ie.locationSize*Le)*Se,Te)}else{if(H.isInstancedBufferAttribute){for(let Ge=0;Ge<ie.locationSize;Ge++)L(ie.location+Ge,H.meshPerAttribute);D.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let Ge=0;Ge<ie.locationSize;Ge++)b(ie.location+Ge);r.bindBuffer(r.ARRAY_BUFFER,le);for(let Ge=0;Ge<ie.locationSize;Ge++)A(ie.location+Ge,ce/ie.locationSize,Ee,$,ce*Se,ce/ie.locationSize*Ge*Se,Te)}}else if(Z!==void 0){const $=Z[ee];if($!==void 0)switch($.length){case 2:r.vertexAttrib2fv(ie.location,$);break;case 3:r.vertexAttrib3fv(ie.location,$);break;case 4:r.vertexAttrib4fv(ie.location,$);break;default:r.vertexAttrib1fv(ie.location,$)}}}}w()}function M(){j();for(const D in a){const F=a[D];for(const z in F){const q=F[z];for(const Y in q)g(q[Y].object),delete q[Y];delete F[z]}delete a[D]}}function T(D){if(a[D.id]===void 0)return;const F=a[D.id];for(const z in F){const q=F[z];for(const Y in q)g(q[Y].object),delete q[Y];delete F[z]}delete a[D.id]}function k(D){for(const F in a){const z=a[F];if(z[D.id]===void 0)continue;const q=z[D.id];for(const Y in q)g(q[Y].object),delete q[Y];delete z[D.id]}}function j(){J(),u=!0,c!==l&&(c=l,f(c.object))}function J(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:j,resetDefaultState:J,dispose:M,releaseStatesOfGeometry:T,releaseStatesOfProgram:k,initAttributes:_,enableAttribute:b,disableUnusedAttributes:w}}function Gg(r,e,t,n){const i=n.isWebGL2;let s;function o(u){s=u}function a(u,d){r.drawArrays(s,u,d),t.update(d,s,1)}function l(u,d,h){if(h===0)return;let f,g;if(i)f=r,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](s,u,d,h),t.update(d,s,h)}function c(u,d,h){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<h;g++)this.render(u[g],d[g]);else{f.multiDrawArraysWEBGL(s,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=d[x];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Hg(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),h=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),x=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),p=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),_=h>0,b=o||e.has("OES_texture_float"),L=_&&b,w=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:h,maxTextureSize:f,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:v,vertexTextures:_,floatFragmentTextures:b,floatVertexTextures:L,maxSamples:w}}function Vg(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new ei,a=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||n!==0||i;return i=h,n=d.length,f},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const v=s?0:n,_=v*4;let b=p.clippingState||null;l.value=b,b=u(g,h,_,f);for(let L=0;L!==_;++L)b[L]=t[L];p.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,f,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=f+x*4,v=h.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,b=f;_!==x;++_,b+=4)o.copy(d[_]).applyMatrix4(v,a),o.normal.toArray(m,b),m[b+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Wg(r){let e=new WeakMap;function t(o,a){return a===Zs?o.mapping=fr:a===Ea&&(o.mapping=pr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Zs||a===Ea)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new np(l.height/2);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class ts extends od{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const sr=4,hc=[.125,.215,.35,.446,.526,.582],vi=20,Zo=new ts,fc=new Me;let $o=null,Jo=0,Qo=0;const xi=(1+Math.sqrt(5))/2,ji=1/xi,pc=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,xi,ji),new C(0,xi,-ji),new C(ji,0,xi),new C(-ji,0,xi),new C(xi,ji,0),new C(-xi,ji,0)];class mc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){$o=this._renderer.getRenderTarget(),Jo=this._renderer.getActiveCubeFace(),Qo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget($o,Jo,Qo),e.scissorTest=!1,Rs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fr||e.mapping===pr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$o=this._renderer.getRenderTarget(),Jo=this._renderer.getActiveCubeFace(),Qo=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:Tn,format:an,colorSpace:Ct,depthBuffer:!1},i=gc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gc(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xg(s)),this._blurMaterial=jg(s,e,t)}return i}_compileMaterial(e){const t=new Yt(this._lodPlanes[0],e);this._renderer.compile(t,Zo)}_sceneToCubeUV(e,t,n,i){const a=new Pt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(fc),u.toneMapping=oi,u.autoClear=!1;const f=new ii({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1}),g=new Yt(new es,f);let x=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(fc),x=!0);for(let p=0;p<6;p++){const v=p%3;v===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):v===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;Rs(i,v*_,p>2?_:0,_,_),u.setRenderTarget(i),x&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===fr||e.mapping===pr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=_c()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xc());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Yt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Rs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Zo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=pc[(i-1)%pc.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new Yt(this._lodPlanes[i],c),h=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*vi-1),x=s/g,m=isFinite(s)?1+Math.floor(u*x):vi;m>vi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vi}`);const p=[];let v=0;for(let A=0;A<vi;++A){const U=A/x,M=Math.exp(-U*U/2);p.push(M),A===0?v+=M:A<m&&(v+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/v;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:_}=this;h.dTheta.value=g,h.mipInt.value=_-n;const b=this._sizeLods[i],L=3*b*(i>_-sr?i-_+sr:0),w=4*(this._cubeSize-b);Rs(t,L,w,3*b,2*b),l.setRenderTarget(t),l.render(d,Zo)}}function Xg(r){const e=[],t=[],n=[];let i=r;const s=r-sr+1+hc.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-sr?l=hc[o-r+sr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,x=3,m=2,p=1,v=new Float32Array(x*g*f),_=new Float32Array(m*g*f),b=new Float32Array(p*g*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,U=w>2?0:-1,M=[A,U,0,A+2/3,U,0,A+2/3,U+1,0,A,U,0,A+2/3,U+1,0,A,U+1,0];v.set(M,x*g*w),_.set(h,m*g*w);const T=[w,w,w,w,w,w];b.set(T,p*g*w)}const L=new Ot;L.setAttribute("position",new Wt(v,x)),L.setAttribute("uv",new Wt(_,m)),L.setAttribute("faceIndex",new Wt(b,p)),e.push(L),i>sr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function gc(r,e,t){const n=new un(r,e,t);return n.texture.mapping=fo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rs(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function jg(r,e,t){const n=new Float32Array(vi),i=new C(0,1,0);return new Vt({name:"SphericalGaussianBlur",defines:{n:vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function xc(){return new Vt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function _c(){return new Vt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Ja(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function qg(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Zs||l===Ea,u=l===fr||l===pr;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=e.get(a);return t===null&&(t=new mc(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),e.set(a,d),d.texture}else{if(e.has(a))return e.get(a).texture;{const d=a.image;if(c&&d&&d.height>0||u&&d&&i(d)){t===null&&(t=new mc(r));const h=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Yg(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Kg(r,e,t,n){const i={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const x=h.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}h.removeEventListener("dispose",o),delete i[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return i[h.id]===!0||(h.addEventListener("dispose",o),i[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const g in h)e.update(h[g],r.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const x=f[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],r.ARRAY_BUFFER)}}function c(d){const h=[],f=d.index,g=d.attributes.position;let x=0;if(f!==null){const v=f.array;x=f.version;for(let _=0,b=v.length;_<b;_+=3){const L=v[_+0],w=v[_+1],A=v[_+2];h.push(L,w,w,A,A,L)}}else if(g!==void 0){const v=g.array;x=g.version;for(let _=0,b=v.length/3-1;_<b;_+=3){const L=_+0,w=_+1,A=_+2;h.push(L,w,w,A,A,L)}}else return;const m=new(Ju(h)?rd:Ka)(h,1);m.version=x;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const h=s.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Zg(r,e,t,n){const i=n.isWebGL2;let s;function o(f){s=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function u(f,g){r.drawElements(s,g,a,f*l),t.update(g,s,1)}function d(f,g,x){if(x===0)return;let m,p;if(i)m=r,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,g,a,f*l,x),t.update(g,s,x)}function h(f,g,x){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<x;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(s,g,0,a,f,0,x);let p=0;for(let v=0;v<x;v++)p+=g[v];t.update(p,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=d,this.renderMultiDraw=h}function $g(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Jg(r,e){return r[0]-e[0]}function Qg(r,e){return Math.abs(e[1])-Math.abs(r[1])}function ex(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new it,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,d){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,x=g!==void 0?g.length:0;let m=s.get(u);if(m===void 0||m.count!==x){let F=function(){J.dispose(),s.delete(u),u.removeEventListener("dispose",F)};var f=F;m!==void 0&&m.texture.dispose();const _=u.morphAttributes.position!==void 0,b=u.morphAttributes.normal!==void 0,L=u.morphAttributes.color!==void 0,w=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],U=u.morphAttributes.color||[];let M=0;_===!0&&(M=1),b===!0&&(M=2),L===!0&&(M=3);let T=u.attributes.position.count*M,k=1;T>e.maxTextureSize&&(k=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const j=new Float32Array(T*k*4*x),J=new td(j,T,k,x);J.type=On,J.needsUpdate=!0;const D=M*4;for(let z=0;z<x;z++){const q=w[z],Y=A[z],K=U[z],Z=T*k*4*z;for(let ee=0;ee<q.count;ee++){const ie=ee*D;_===!0&&(o.fromBufferAttribute(q,ee),j[Z+ie+0]=o.x,j[Z+ie+1]=o.y,j[Z+ie+2]=o.z,j[Z+ie+3]=0),b===!0&&(o.fromBufferAttribute(Y,ee),j[Z+ie+4]=o.x,j[Z+ie+5]=o.y,j[Z+ie+6]=o.z,j[Z+ie+7]=0),L===!0&&(o.fromBufferAttribute(K,ee),j[Z+ie+8]=o.x,j[Z+ie+9]=o.y,j[Z+ie+10]=o.z,j[Z+ie+11]=K.itemSize===4?o.w:1)}}m={count:x,texture:J,size:new ge(T,k)},s.set(u,m),u.addEventListener("dispose",F)}let p=0;for(let _=0;_<h.length;_++)p+=h[_];const v=u.morphTargetsRelative?1:1-p;d.getUniforms().setValue(r,"morphTargetBaseInfluence",v),d.getUniforms().setValue(r,"morphTargetInfluences",h),d.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),d.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const g=h===void 0?0:h.length;let x=n[u.id];if(x===void 0||x.length!==g){x=[];for(let b=0;b<g;b++)x[b]=[b,0];n[u.id]=x}for(let b=0;b<g;b++){const L=x[b];L[0]=b,L[1]=h[b]}x.sort(Qg);for(let b=0;b<8;b++)b<g&&x[b][1]?(a[b][0]=x[b][0],a[b][1]=x[b][1]):(a[b][0]=Number.MAX_SAFE_INTEGER,a[b][1]=0);a.sort(Jg);const m=u.morphAttributes.position,p=u.morphAttributes.normal;let v=0;for(let b=0;b<8;b++){const L=a[b],w=L[0],A=L[1];w!==Number.MAX_SAFE_INTEGER&&A?(m&&u.getAttribute("morphTarget"+b)!==m[w]&&u.setAttribute("morphTarget"+b,m[w]),p&&u.getAttribute("morphNormal"+b)!==p[w]&&u.setAttribute("morphNormal"+b,p[w]),i[b]=A,v+=A):(m&&u.hasAttribute("morphTarget"+b)===!0&&u.deleteAttribute("morphTarget"+b),p&&u.hasAttribute("morphNormal"+b)===!0&&u.deleteAttribute("morphNormal"+b),i[b]=0)}const _=u.morphTargetsRelative?1:1-v;d.getUniforms().setValue(r,"morphTargetBaseInfluence",_),d.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function tx(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;i.get(h)!==c&&(h.update(),i.set(h,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class cd extends yt{constructor(e,t,n,i,s,o,a,l,c,u){if(u=u!==void 0?u:yi,u!==yi&&u!==mr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===yi&&(n=ni),n===void 0&&u===mr&&(n=bi),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:vt,this.minFilter=l!==void 0?l:vt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ud=new yt,dd=new cd(1,1);dd.compareFunction=$u;const hd=new td,fd=new zf,pd=new ad,vc=[],bc=[],yc=new Float32Array(16),Mc=new Float32Array(9),Sc=new Float32Array(4);function Er(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=vc[i];if(s===void 0&&(s=new Float32Array(i),vc[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function St(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Et(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function go(r,e){let t=bc[e];t===void 0&&(t=new Int32Array(e),bc[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function nx(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function ix(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2fv(this.addr,e),Et(t,e)}}function rx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;r.uniform3fv(this.addr,e),Et(t,e)}}function sx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4fv(this.addr,e),Et(t,e)}}function ox(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;Sc.set(n),r.uniformMatrix2fv(this.addr,!1,Sc),Et(t,n)}}function ax(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;Mc.set(n),r.uniformMatrix3fv(this.addr,!1,Mc),Et(t,n)}}function lx(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Et(t,e)}else{if(St(t,n))return;yc.set(n),r.uniformMatrix4fv(this.addr,!1,yc),Et(t,n)}}function cx(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function ux(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2iv(this.addr,e),Et(t,e)}}function dx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;r.uniform3iv(this.addr,e),Et(t,e)}}function hx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4iv(this.addr,e),Et(t,e)}}function fx(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function px(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;r.uniform2uiv(this.addr,e),Et(t,e)}}function mx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;r.uniform3uiv(this.addr,e),Et(t,e)}}function gx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;r.uniform4uiv(this.addr,e),Et(t,e)}}function xx(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?dd:ud;t.setTexture2D(e||s,i)}function _x(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||fd,i)}function vx(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||pd,i)}function bx(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||hd,i)}function yx(r){switch(r){case 5126:return nx;case 35664:return ix;case 35665:return rx;case 35666:return sx;case 35674:return ox;case 35675:return ax;case 35676:return lx;case 5124:case 35670:return cx;case 35667:case 35671:return ux;case 35668:case 35672:return dx;case 35669:case 35673:return hx;case 5125:return fx;case 36294:return px;case 36295:return mx;case 36296:return gx;case 35678:case 36198:case 36298:case 36306:case 35682:return xx;case 35679:case 36299:case 36307:return _x;case 35680:case 36300:case 36308:case 36293:return vx;case 36289:case 36303:case 36311:case 36292:return bx}}function Mx(r,e){r.uniform1fv(this.addr,e)}function Sx(r,e){const t=Er(e,this.size,2);r.uniform2fv(this.addr,t)}function Ex(r,e){const t=Er(e,this.size,3);r.uniform3fv(this.addr,t)}function Tx(r,e){const t=Er(e,this.size,4);r.uniform4fv(this.addr,t)}function Ax(r,e){const t=Er(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function wx(r,e){const t=Er(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Cx(r,e){const t=Er(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Rx(r,e){r.uniform1iv(this.addr,e)}function Lx(r,e){r.uniform2iv(this.addr,e)}function Px(r,e){r.uniform3iv(this.addr,e)}function Ix(r,e){r.uniform4iv(this.addr,e)}function Dx(r,e){r.uniform1uiv(this.addr,e)}function Nx(r,e){r.uniform2uiv(this.addr,e)}function Ux(r,e){r.uniform3uiv(this.addr,e)}function Fx(r,e){r.uniform4uiv(this.addr,e)}function Ox(r,e,t){const n=this.cache,i=e.length,s=go(t,i);St(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||ud,s[o])}function Bx(r,e,t){const n=this.cache,i=e.length,s=go(t,i);St(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||fd,s[o])}function kx(r,e,t){const n=this.cache,i=e.length,s=go(t,i);St(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||pd,s[o])}function zx(r,e,t){const n=this.cache,i=e.length,s=go(t,i);St(n,s)||(r.uniform1iv(this.addr,s),Et(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||hd,s[o])}function Gx(r){switch(r){case 5126:return Mx;case 35664:return Sx;case 35665:return Ex;case 35666:return Tx;case 35674:return Ax;case 35675:return wx;case 35676:return Cx;case 5124:case 35670:return Rx;case 35667:case 35671:return Lx;case 35668:case 35672:return Px;case 35669:case 35673:return Ix;case 5125:return Dx;case 36294:return Nx;case 36295:return Ux;case 36296:return Fx;case 35678:case 36198:case 36298:case 36306:case 35682:return Ox;case 35679:case 36299:case 36307:return Bx;case 35680:case 36300:case 36308:case 36293:return kx;case 36289:case 36303:case 36311:case 36292:return zx}}class Hx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=yx(t.type)}}class Vx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gx(t.type)}}class Wx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const ea=/(\w+)(\])?(\[|\.)?/g;function Ec(r,e){r.seq.push(e),r.map[e.id]=e}function Xx(r,e,t){const n=r.name,i=n.length;for(ea.lastIndex=0;;){const s=ea.exec(n),o=ea.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Ec(t,c===void 0?new Hx(a,r,e):new Vx(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new Wx(a),Ec(t,d)),t=d}}}class js{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);Xx(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Tc(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const jx=37297;let qx=0;function Yx(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Kx(r){const e=nt.getPrimaries(nt.workingColorSpace),t=nt.getPrimaries(r);let n;switch(e===t?n="":e===to&&t===eo?n="LinearDisplayP3ToLinearSRGB":e===eo&&t===to&&(n="LinearSRGBToLinearDisplayP3"),r){case Ct:case mo:return[n,"LinearTransferOETF"];case at:case qa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Ac(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Yx(r.getShaderSource(e),o)}else return i}function Zx(r,e){const t=Kx(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function $x(r,e){let t;switch(e){case Nu:t="Linear";break;case Uu:t="Reinhard";break;case Fu:t="OptimizedCineon";break;case Ou:t="ACESFilmic";break;case Bu:t="AgX";break;case Zh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Jx(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(or).join(`
`)}function Qx(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(or).join(`
`)}function e0(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function t0(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function or(r){return r!==""}function wc(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Cc(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const n0=/^[ \t]*#include +<([\w\d./]+)>/gm;function La(r){return r.replace(n0,r0)}const i0=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function r0(r,e){let t=Ye[e];if(t===void 0){const n=i0.get(e);if(n!==void 0)t=Ye[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return La(t)}const s0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rc(r){return r.replace(s0,o0)}function o0(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Lc(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function a0(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Du?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Eh?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Un&&(e="SHADOWMAP_TYPE_VSM"),e}function l0(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case fr:case pr:e="ENVMAP_TYPE_CUBE";break;case fo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function c0(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case pr:e="ENVMAP_MODE_REFRACTION";break}return e}function u0(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case ho:e="ENVMAP_BLENDING_MULTIPLY";break;case Yh:e="ENVMAP_BLENDING_MIX";break;case Kh:e="ENVMAP_BLENDING_ADD";break}return e}function d0(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function h0(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=a0(t),c=l0(t),u=c0(t),d=u0(t),h=d0(t),f=t.isWebGL2?"":Jx(t),g=Qx(t),x=e0(s),m=i.createProgram();let p,v,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(or).join(`
`),p.length>0&&(p+=`
`),v=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(or).join(`
`),v.length>0&&(v+=`
`)):(p=[Lc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(or).join(`
`),v=[f,Lc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?Ye.tonemapping_pars_fragment:"",t.toneMapping!==oi?$x("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,Zx("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(or).join(`
`)),o=La(o),o=wc(o,t),o=Cc(o,t),a=La(a),a=wc(a,t),a=Cc(a,t),o=Rc(o),a=Rc(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,v=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Yl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const b=_+p+o,L=_+v+a,w=Tc(i,i.VERTEX_SHADER,b),A=Tc(i,i.FRAGMENT_SHADER,L);i.attachShader(m,w),i.attachShader(m,A),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function U(j){if(r.debug.checkShaderErrors){const J=i.getProgramInfoLog(m).trim(),D=i.getShaderInfoLog(w).trim(),F=i.getShaderInfoLog(A).trim();let z=!0,q=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,w,A);else{const Y=Ac(i,w,"vertex"),K=Ac(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+Y+`
`+K)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(D===""||F==="")&&(q=!1);q&&(j.diagnostics={runnable:z,programLog:J,vertexShader:{log:D,prefix:p},fragmentShader:{log:F,prefix:v}})}i.deleteShader(w),i.deleteShader(A),M=new js(i,m),T=t0(i,m)}let M;this.getUniforms=function(){return M===void 0&&U(this),M};let T;this.getAttributes=function(){return T===void 0&&U(this),T};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=i.getProgramParameter(m,jx)),k},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qx++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}let f0=0;class p0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new m0(e),t.set(e,n)),n}}class m0{constructor(e){this.id=f0++,this.code=e,this.usedTimes=0}}function g0(r,e,t,n,i,s,o){const a=new nd,l=new p0,c=[],u=i.isWebGL2,d=i.logarithmicDepthBuffer,h=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return M===0?"uv":`uv${M}`}function m(M,T,k,j,J){const D=j.fog,F=J.geometry,z=M.isMeshStandardMaterial?j.environment:null,q=(M.isMeshStandardMaterial?t:e).get(M.envMap||z),Y=q&&q.mapping===fo?q.image.height:null,K=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const Z=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ee=Z!==void 0?Z.length:0;let ie=0;F.morphAttributes.position!==void 0&&(ie=1),F.morphAttributes.normal!==void 0&&(ie=2),F.morphAttributes.color!==void 0&&(ie=3);let H,$,ce,_e;if(K){const he=yn[K];H=he.vertexShader,$=he.fragmentShader}else H=M.vertexShader,$=M.fragmentShader,l.update(M),ce=l.getVertexShaderID(M),_e=l.getFragmentShaderID(M);const le=r.getRenderTarget(),Ee=J.isInstancedMesh===!0,Se=J.isBatchedMesh===!0,Te=!!M.map,Ge=!!M.matcap,O=!!q,ut=!!M.aoMap,Le=!!M.lightMap,Fe=!!M.bumpMap,X=!!M.normalMap,ve=!!M.displacementMap,Ue=!!M.emissiveMap,E=!!M.metalnessMap,y=!!M.roughnessMap,B=M.anisotropy>0,re=M.clearcoat>0,te=M.iridescence>0,se=M.sheen>0,Ae=M.transmission>0,fe=B&&!!M.anisotropyMap,me=re&&!!M.clearcoatMap,Ie=re&&!!M.clearcoatNormalMap,He=re&&!!M.clearcoatRoughnessMap,Q=te&&!!M.iridescenceMap,Qe=te&&!!M.iridescenceThicknessMap,ke=se&&!!M.sheenColorMap,Be=se&&!!M.sheenRoughnessMap,we=!!M.specularMap,pe=!!M.specularColorMap,R=!!M.specularIntensityMap,oe=Ae&&!!M.transmissionMap,Re=Ae&&!!M.thicknessMap,xe=!!M.gradientMap,ne=!!M.alphaMap,I=M.alphaTest>0,ae=!!M.alphaHash,ue=!!M.extensions,Oe=!!F.attributes.uv1,De=!!F.attributes.uv2,qe=!!F.attributes.uv3;let Xe=oi;return M.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(Xe=r.toneMapping),{isWebGL2:u,shaderID:K,shaderType:M.type,shaderName:M.name,vertexShader:H,fragmentShader:$,defines:M.defines,customVertexShaderID:ce,customFragmentShaderID:_e,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Se,instancing:Ee,instancingColor:Ee&&J.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:le===null?r.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Ct,map:Te,matcap:Ge,envMap:O,envMapMode:O&&q.mapping,envMapCubeUVHeight:Y,aoMap:ut,lightMap:Le,bumpMap:Fe,normalMap:X,displacementMap:h&&ve,emissiveMap:Ue,normalMapObjectSpace:X&&M.normalMapType===ff,normalMapTangentSpace:X&&M.normalMapType===po,metalnessMap:E,roughnessMap:y,anisotropy:B,anisotropyMap:fe,clearcoat:re,clearcoatMap:me,clearcoatNormalMap:Ie,clearcoatRoughnessMap:He,iridescence:te,iridescenceMap:Q,iridescenceThicknessMap:Qe,sheen:se,sheenColorMap:ke,sheenRoughnessMap:Be,specularMap:we,specularColorMap:pe,specularIntensityMap:R,transmission:Ae,transmissionMap:oe,thicknessMap:Re,gradientMap:xe,opaque:M.transparent===!1&&M.blending===lr,alphaMap:ne,alphaTest:I,alphaHash:ae,combine:M.combine,mapUv:Te&&x(M.map.channel),aoMapUv:ut&&x(M.aoMap.channel),lightMapUv:Le&&x(M.lightMap.channel),bumpMapUv:Fe&&x(M.bumpMap.channel),normalMapUv:X&&x(M.normalMap.channel),displacementMapUv:ve&&x(M.displacementMap.channel),emissiveMapUv:Ue&&x(M.emissiveMap.channel),metalnessMapUv:E&&x(M.metalnessMap.channel),roughnessMapUv:y&&x(M.roughnessMap.channel),anisotropyMapUv:fe&&x(M.anisotropyMap.channel),clearcoatMapUv:me&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:He&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:Qe&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Be&&x(M.sheenRoughnessMap.channel),specularMapUv:we&&x(M.specularMap.channel),specularColorMapUv:pe&&x(M.specularColorMap.channel),specularIntensityMapUv:R&&x(M.specularIntensityMap.channel),transmissionMapUv:oe&&x(M.transmissionMap.channel),thicknessMapUv:Re&&x(M.thicknessMap.channel),alphaMapUv:ne&&x(M.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(X||B),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:Oe,vertexUv2s:De,vertexUv3s:qe,pointsUvs:J.isPoints===!0&&!!F.attributes.uv&&(Te||ne),fog:!!D,useFog:M.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:J.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ie,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&k.length>0,shadowMapType:r.shadowMap.type,toneMapping:Xe,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Te&&M.map.isVideoTexture===!0&&nt.getTransfer(M.map.colorSpace)===ot,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Mn,flipSided:M.side===Kt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ue&&M.extensions.derivatives===!0,extensionFragDepth:ue&&M.extensions.fragDepth===!0,extensionDrawBuffers:ue&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ue&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ue&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){const T=[];if(M.shaderID?T.push(M.shaderID):(T.push(M.customVertexShaderID),T.push(M.customFragmentShaderID)),M.defines!==void 0)for(const k in M.defines)T.push(k),T.push(M.defines[k]);return M.isRawShaderMaterial===!1&&(v(T,M),_(T,M),T.push(r.outputColorSpace)),T.push(M.customProgramCacheKey),T.join()}function v(M,T){M.push(T.precision),M.push(T.outputColorSpace),M.push(T.envMapMode),M.push(T.envMapCubeUVHeight),M.push(T.mapUv),M.push(T.alphaMapUv),M.push(T.lightMapUv),M.push(T.aoMapUv),M.push(T.bumpMapUv),M.push(T.normalMapUv),M.push(T.displacementMapUv),M.push(T.emissiveMapUv),M.push(T.metalnessMapUv),M.push(T.roughnessMapUv),M.push(T.anisotropyMapUv),M.push(T.clearcoatMapUv),M.push(T.clearcoatNormalMapUv),M.push(T.clearcoatRoughnessMapUv),M.push(T.iridescenceMapUv),M.push(T.iridescenceThicknessMapUv),M.push(T.sheenColorMapUv),M.push(T.sheenRoughnessMapUv),M.push(T.specularMapUv),M.push(T.specularColorMapUv),M.push(T.specularIntensityMapUv),M.push(T.transmissionMapUv),M.push(T.thicknessMapUv),M.push(T.combine),M.push(T.fogExp2),M.push(T.sizeAttenuation),M.push(T.morphTargetsCount),M.push(T.morphAttributeCount),M.push(T.numDirLights),M.push(T.numPointLights),M.push(T.numSpotLights),M.push(T.numSpotLightMaps),M.push(T.numHemiLights),M.push(T.numRectAreaLights),M.push(T.numDirLightShadows),M.push(T.numPointLightShadows),M.push(T.numSpotLightShadows),M.push(T.numSpotLightShadowsWithMaps),M.push(T.numLightProbes),M.push(T.shadowMapType),M.push(T.toneMapping),M.push(T.numClippingPlanes),M.push(T.numClipIntersection),M.push(T.depthPacking)}function _(M,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),M.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function b(M){const T=g[M.type];let k;if(T){const j=yn[T];k=vr.clone(j.uniforms)}else k=M.uniforms;return k}function L(M,T){let k;for(let j=0,J=c.length;j<J;j++){const D=c[j];if(D.cacheKey===T){k=D,++k.usedTimes;break}}return k===void 0&&(k=new h0(r,T,M,s),c.push(k)),k}function w(M){if(--M.usedTimes===0){const T=c.indexOf(M);c[T]=c[c.length-1],c.pop(),M.destroy()}}function A(M){l.remove(M)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:L,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:U}}function x0(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function _0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Pc(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ic(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,h,f,g,x,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=x,p.group=m),e++,p}function a(d,h,f,g,x,m){const p=o(d,h,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(d,h,f,g,x,m){const p=o(d,h,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,h){t.length>1&&t.sort(d||_0),n.length>1&&n.sort(h||Pc),i.length>1&&i.sort(h||Pc)}function u(){for(let d=e,h=r.length;d<h;d++){const f=r[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function v0(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Ic,r.set(n,[o])):i>=s.length?(o=new Ic,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function b0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new Me};break;case"SpotLight":t={position:new C,direction:new C,color:new Me,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new Me,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new Me,groundColor:new Me};break;case"RectAreaLight":t={color:new Me,position:new C,halfWidth:new C,halfHeight:new C};break}return r[e.id]=t,t}}}function y0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let M0=0;function S0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function E0(r,e){const t=new b0,n=y0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new C);const s=new C,o=new Ce,a=new Ce;function l(u,d){let h=0,f=0,g=0;for(let j=0;j<9;j++)i.probe[j].set(0,0,0);let x=0,m=0,p=0,v=0,_=0,b=0,L=0,w=0,A=0,U=0,M=0;u.sort(S0);const T=d===!0?Math.PI:1;for(let j=0,J=u.length;j<J;j++){const D=u[j],F=D.color,z=D.intensity,q=D.distance,Y=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=F.r*z*T,f+=F.g*z*T,g+=F.b*z*T;else if(D.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(D.sh.coefficients[K],z);M++}else if(D.isDirectionalLight){const K=t.get(D);if(K.color.copy(D.color).multiplyScalar(D.intensity*T),D.castShadow){const Z=D.shadow,ee=n.get(D);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,i.directionalShadow[x]=ee,i.directionalShadowMap[x]=Y,i.directionalShadowMatrix[x]=D.shadow.matrix,b++}i.directional[x]=K,x++}else if(D.isSpotLight){const K=t.get(D);K.position.setFromMatrixPosition(D.matrixWorld),K.color.copy(F).multiplyScalar(z*T),K.distance=q,K.coneCos=Math.cos(D.angle),K.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),K.decay=D.decay,i.spot[p]=K;const Z=D.shadow;if(D.map&&(i.spotLightMap[A]=D.map,A++,Z.updateMatrices(D),D.castShadow&&U++),i.spotLightMatrix[p]=Z.matrix,D.castShadow){const ee=n.get(D);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,i.spotShadow[p]=ee,i.spotShadowMap[p]=Y,w++}p++}else if(D.isRectAreaLight){const K=t.get(D);K.color.copy(F).multiplyScalar(z),K.halfWidth.set(D.width*.5,0,0),K.halfHeight.set(0,D.height*.5,0),i.rectArea[v]=K,v++}else if(D.isPointLight){const K=t.get(D);if(K.color.copy(D.color).multiplyScalar(D.intensity*T),K.distance=D.distance,K.decay=D.decay,D.castShadow){const Z=D.shadow,ee=n.get(D);ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,ee.shadowCameraNear=Z.camera.near,ee.shadowCameraFar=Z.camera.far,i.pointShadow[m]=ee,i.pointShadowMap[m]=Y,i.pointShadowMatrix[m]=D.shadow.matrix,L++}i.point[m]=K,m++}else if(D.isHemisphereLight){const K=t.get(D);K.skyColor.copy(D.color).multiplyScalar(z*T),K.groundColor.copy(D.groundColor).multiplyScalar(z*T),i.hemi[_]=K,_++}}v>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=g;const k=i.hash;(k.directionalLength!==x||k.pointLength!==m||k.spotLength!==p||k.rectAreaLength!==v||k.hemiLength!==_||k.numDirectionalShadows!==b||k.numPointShadows!==L||k.numSpotShadows!==w||k.numSpotMaps!==A||k.numLightProbes!==M)&&(i.directional.length=x,i.spot.length=p,i.rectArea.length=v,i.point.length=m,i.hemi.length=_,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=L,i.pointShadowMap.length=L,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=L,i.spotLightMatrix.length=w+A-U,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=U,i.numLightProbes=M,k.directionalLength=x,k.pointLength=m,k.spotLength=p,k.rectAreaLength=v,k.hemiLength=_,k.numDirectionalShadows=b,k.numPointShadows=L,k.numSpotShadows=w,k.numSpotMaps=A,k.numLightProbes=M,i.version=M0++)}function c(u,d){let h=0,f=0,g=0,x=0,m=0;const p=d.matrixWorldInverse;for(let v=0,_=u.length;v<_;v++){const b=u[v];if(b.isDirectionalLight){const L=i.directional[h];L.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),L.direction.sub(s),L.direction.transformDirection(p),h++}else if(b.isSpotLight){const L=i.spot[g];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(p),L.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),L.direction.sub(s),L.direction.transformDirection(p),g++}else if(b.isRectAreaLight){const L=i.rectArea[x];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(p),a.identity(),o.copy(b.matrixWorld),o.premultiply(p),a.extractRotation(o),L.halfWidth.set(b.width*.5,0,0),L.halfHeight.set(0,b.height*.5,0),L.halfWidth.applyMatrix4(a),L.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){const L=i.point[f];L.position.setFromMatrixPosition(b.matrixWorld),L.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const L=i.hemi[m];L.direction.setFromMatrixPosition(b.matrixWorld),L.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:i}}function Dc(r,e){const t=new E0(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(d){n.push(d)}function a(d){i.push(d)}function l(d){t.setup(n,d)}function c(d){t.setupView(n,d)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function T0(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new Dc(r,e),t.set(s,[l])):o>=a.length?(l=new Dc(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class md extends Qt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class A0 extends Qt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const w0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function R0(r,e,t){let n=new Za;const i=new ge,s=new ge,o=new it,a=new md({depthPacking:Zu}),l=new A0,c={},u=t.maxTextureSize,d={[zn]:Kt,[Kt]:zn,[Mn]:Mn},h=new Vt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ge},radius:{value:4}},vertexShader:w0,fragmentShader:C0}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ot;g.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Yt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Du;let p=this.type;this.render=function(w,A,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const M=r.getRenderTarget(),T=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),j=r.state;j.setBlending(En),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const J=p!==Un&&this.type===Un,D=p===Un&&this.type!==Un;for(let F=0,z=w.length;F<z;F++){const q=w[F],Y=q.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;i.copy(Y.mapSize);const K=Y.getFrameExtents();if(i.multiply(K),s.copy(Y.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/K.x),i.x=s.x*K.x,Y.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/K.y),i.y=s.y*K.y,Y.mapSize.y=s.y)),Y.map===null||J===!0||D===!0){const ee=this.type!==Un?{minFilter:vt,magFilter:vt}:{};Y.map!==null&&Y.map.dispose(),Y.map=new un(i.x,i.y,ee),Y.map.texture.name=q.name+".shadowMap",Y.camera.updateProjectionMatrix()}r.setRenderTarget(Y.map),r.clear();const Z=Y.getViewportCount();for(let ee=0;ee<Z;ee++){const ie=Y.getViewport(ee);o.set(s.x*ie.x,s.y*ie.y,s.x*ie.z,s.y*ie.w),j.viewport(o),Y.updateMatrices(q,ee),n=Y.getFrustum(),b(A,U,Y.camera,q,this.type)}Y.isPointLightShadow!==!0&&this.type===Un&&v(Y,U),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(M,T,k)};function v(w,A){const U=e.update(x);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new un(i.x,i.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(A,null,U,h,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(A,null,U,f,x,null)}function _(w,A,U,M){let T=null;const k=U.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(k!==void 0)T=k;else if(T=U.isPointLight===!0?l:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const j=T.uuid,J=A.uuid;let D=c[j];D===void 0&&(D={},c[j]=D);let F=D[J];F===void 0&&(F=T.clone(),D[J]=F,A.addEventListener("dispose",L)),T=F}if(T.visible=A.visible,T.wireframe=A.wireframe,M===Un?T.side=A.shadowSide!==null?A.shadowSide:A.side:T.side=A.shadowSide!==null?A.shadowSide:d[A.side],T.alphaMap=A.alphaMap,T.alphaTest=A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,U.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const j=r.properties.get(T);j.light=U}return T}function b(w,A,U,M,T){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===Un)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,w.matrixWorld);const J=e.update(w),D=w.material;if(Array.isArray(D)){const F=J.groups;for(let z=0,q=F.length;z<q;z++){const Y=F[z],K=D[Y.materialIndex];if(K&&K.visible){const Z=_(w,K,M,T);w.onBeforeShadow(r,w,A,U,J,Z,Y),r.renderBufferDirect(U,null,J,Z,w,Y),w.onAfterShadow(r,w,A,U,J,Z,Y)}}}else if(D.visible){const F=_(w,D,M,T);w.onBeforeShadow(r,w,A,U,J,F,null),r.renderBufferDirect(U,null,J,F,w,null),w.onAfterShadow(r,w,A,U,J,F,null)}}const j=w.children;for(let J=0,D=j.length;J<D;J++)b(j[J],A,U,M,T)}function L(w){w.target.removeEventListener("dispose",L);for(const U in c){const M=c[U],T=w.target.uuid;T in M&&(M[T].dispose(),delete M[T])}}}function L0(r,e,t){const n=t.isWebGL2;function i(){let I=!1;const ae=new it;let ue=null;const Oe=new it(0,0,0,0);return{setMask:function(De){ue!==De&&!I&&(r.colorMask(De,De,De,De),ue=De)},setLocked:function(De){I=De},setClear:function(De,qe,Xe,lt,he){he===!0&&(De*=lt,qe*=lt,Xe*=lt),ae.set(De,qe,Xe,lt),Oe.equals(ae)===!1&&(r.clearColor(De,qe,Xe,lt),Oe.copy(ae))},reset:function(){I=!1,ue=null,Oe.set(-1,0,0,0)}}}function s(){let I=!1,ae=null,ue=null,Oe=null;return{setTest:function(De){De?Se(r.DEPTH_TEST):Te(r.DEPTH_TEST)},setMask:function(De){ae!==De&&!I&&(r.depthMask(De),ae=De)},setFunc:function(De){if(ue!==De){switch(De){case Gh:r.depthFunc(r.NEVER);break;case Hh:r.depthFunc(r.ALWAYS);break;case Vh:r.depthFunc(r.LESS);break;case Ks:r.depthFunc(r.LEQUAL);break;case Wh:r.depthFunc(r.EQUAL);break;case Xh:r.depthFunc(r.GEQUAL);break;case jh:r.depthFunc(r.GREATER);break;case qh:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ue=De}},setLocked:function(De){I=De},setClear:function(De){Oe!==De&&(r.clearDepth(De),Oe=De)},reset:function(){I=!1,ae=null,ue=null,Oe=null}}}function o(){let I=!1,ae=null,ue=null,Oe=null,De=null,qe=null,Xe=null,lt=null,he=null;return{setTest:function(Pe){I||(Pe?Se(r.STENCIL_TEST):Te(r.STENCIL_TEST))},setMask:function(Pe){ae!==Pe&&!I&&(r.stencilMask(Pe),ae=Pe)},setFunc:function(Pe,be,It){(ue!==Pe||Oe!==be||De!==It)&&(r.stencilFunc(Pe,be,It),ue=Pe,Oe=be,De=It)},setOp:function(Pe,be,It){(qe!==Pe||Xe!==be||lt!==It)&&(r.stencilOp(Pe,be,It),qe=Pe,Xe=be,lt=It)},setLocked:function(Pe){I=Pe},setClear:function(Pe){he!==Pe&&(r.clearStencil(Pe),he=Pe)},reset:function(){I=!1,ae=null,ue=null,Oe=null,De=null,qe=null,Xe=null,lt=null,he=null}}}const a=new i,l=new s,c=new o,u=new WeakMap,d=new WeakMap;let h={},f={},g=new WeakMap,x=[],m=null,p=!1,v=null,_=null,b=null,L=null,w=null,A=null,U=null,M=new Me(0,0,0),T=0,k=!1,j=null,J=null,D=null,F=null,z=null;const q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,K=0;const Z=r.getParameter(r.VERSION);Z.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Z)[1]),Y=K>=1):Z.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),Y=K>=2);let ee=null,ie={};const H=r.getParameter(r.SCISSOR_BOX),$=r.getParameter(r.VIEWPORT),ce=new it().fromArray(H),_e=new it().fromArray($);function le(I,ae,ue,Oe){const De=new Uint8Array(4),qe=r.createTexture();r.bindTexture(I,qe),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Xe=0;Xe<ue;Xe++)n&&(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)?r.texImage3D(ae,0,r.RGBA,1,1,Oe,0,r.RGBA,r.UNSIGNED_BYTE,De):r.texImage2D(ae+Xe,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,De);return qe}const Ee={};Ee[r.TEXTURE_2D]=le(r.TEXTURE_2D,r.TEXTURE_2D,1),Ee[r.TEXTURE_CUBE_MAP]=le(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ee[r.TEXTURE_2D_ARRAY]=le(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ee[r.TEXTURE_3D]=le(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Se(r.DEPTH_TEST),l.setFunc(Ks),Ue(!1),E(gl),Se(r.CULL_FACE),X(En);function Se(I){h[I]!==!0&&(r.enable(I),h[I]=!0)}function Te(I){h[I]!==!1&&(r.disable(I),h[I]=!1)}function Ge(I,ae){return f[I]!==ae?(r.bindFramebuffer(I,ae),f[I]=ae,n&&(I===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=ae),I===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=ae)),!0):!1}function O(I,ae){let ue=x,Oe=!1;if(I)if(ue=g.get(ae),ue===void 0&&(ue=[],g.set(ae,ue)),I.isWebGLMultipleRenderTargets){const De=I.texture;if(ue.length!==De.length||ue[0]!==r.COLOR_ATTACHMENT0){for(let qe=0,Xe=De.length;qe<Xe;qe++)ue[qe]=r.COLOR_ATTACHMENT0+qe;ue.length=De.length,Oe=!0}}else ue[0]!==r.COLOR_ATTACHMENT0&&(ue[0]=r.COLOR_ATTACHMENT0,Oe=!0);else ue[0]!==r.BACK&&(ue[0]=r.BACK,Oe=!0);Oe&&(t.isWebGL2?r.drawBuffers(ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ue))}function ut(I){return m!==I?(r.useProgram(I),m=I,!0):!1}const Le={[_i]:r.FUNC_ADD,[Ah]:r.FUNC_SUBTRACT,[wh]:r.FUNC_REVERSE_SUBTRACT};if(n)Le[vl]=r.MIN,Le[bl]=r.MAX;else{const I=e.get("EXT_blend_minmax");I!==null&&(Le[vl]=I.MIN_EXT,Le[bl]=I.MAX_EXT)}const Fe={[Ch]:r.ZERO,[Rh]:r.ONE,[Lh]:r.SRC_COLOR,[Ma]:r.SRC_ALPHA,[Fh]:r.SRC_ALPHA_SATURATE,[Nh]:r.DST_COLOR,[Ih]:r.DST_ALPHA,[Ph]:r.ONE_MINUS_SRC_COLOR,[Sa]:r.ONE_MINUS_SRC_ALPHA,[Uh]:r.ONE_MINUS_DST_COLOR,[Dh]:r.ONE_MINUS_DST_ALPHA,[Oh]:r.CONSTANT_COLOR,[Bh]:r.ONE_MINUS_CONSTANT_COLOR,[kh]:r.CONSTANT_ALPHA,[zh]:r.ONE_MINUS_CONSTANT_ALPHA};function X(I,ae,ue,Oe,De,qe,Xe,lt,he,Pe){if(I===En){p===!0&&(Te(r.BLEND),p=!1);return}if(p===!1&&(Se(r.BLEND),p=!0),I!==Th){if(I!==v||Pe!==k){if((_!==_i||w!==_i)&&(r.blendEquation(r.FUNC_ADD),_=_i,w=_i),Pe)switch(I){case lr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ys:r.blendFunc(r.ONE,r.ONE);break;case xl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case _l:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case lr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ys:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case xl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case _l:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}b=null,L=null,A=null,U=null,M.set(0,0,0),T=0,v=I,k=Pe}return}De=De||ae,qe=qe||ue,Xe=Xe||Oe,(ae!==_||De!==w)&&(r.blendEquationSeparate(Le[ae],Le[De]),_=ae,w=De),(ue!==b||Oe!==L||qe!==A||Xe!==U)&&(r.blendFuncSeparate(Fe[ue],Fe[Oe],Fe[qe],Fe[Xe]),b=ue,L=Oe,A=qe,U=Xe),(lt.equals(M)===!1||he!==T)&&(r.blendColor(lt.r,lt.g,lt.b,he),M.copy(lt),T=he),v=I,k=!1}function ve(I,ae){I.side===Mn?Te(r.CULL_FACE):Se(r.CULL_FACE);let ue=I.side===Kt;ae&&(ue=!ue),Ue(ue),I.blending===lr&&I.transparent===!1?X(En):X(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),l.setFunc(I.depthFunc),l.setTest(I.depthTest),l.setMask(I.depthWrite),a.setMask(I.colorWrite);const Oe=I.stencilWrite;c.setTest(Oe),Oe&&(c.setMask(I.stencilWriteMask),c.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),c.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),B(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Se(r.SAMPLE_ALPHA_TO_COVERAGE):Te(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(I){j!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),j=I)}function E(I){I!==Mh?(Se(r.CULL_FACE),I!==J&&(I===gl?r.cullFace(r.BACK):I===Sh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Te(r.CULL_FACE),J=I}function y(I){I!==D&&(Y&&r.lineWidth(I),D=I)}function B(I,ae,ue){I?(Se(r.POLYGON_OFFSET_FILL),(F!==ae||z!==ue)&&(r.polygonOffset(ae,ue),F=ae,z=ue)):Te(r.POLYGON_OFFSET_FILL)}function re(I){I?Se(r.SCISSOR_TEST):Te(r.SCISSOR_TEST)}function te(I){I===void 0&&(I=r.TEXTURE0+q-1),ee!==I&&(r.activeTexture(I),ee=I)}function se(I,ae,ue){ue===void 0&&(ee===null?ue=r.TEXTURE0+q-1:ue=ee);let Oe=ie[ue];Oe===void 0&&(Oe={type:void 0,texture:void 0},ie[ue]=Oe),(Oe.type!==I||Oe.texture!==ae)&&(ee!==ue&&(r.activeTexture(ue),ee=ue),r.bindTexture(I,ae||Ee[I]),Oe.type=I,Oe.texture=ae)}function Ae(){const I=ie[ee];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function fe(){try{r.compressedTexImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function me(){try{r.compressedTexImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ie(){try{r.texSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function He(){try{r.texSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Qe(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ke(){try{r.texStorage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Be(){try{r.texStorage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function we(){try{r.texImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pe(){try{r.texImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function R(I){ce.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),ce.copy(I))}function oe(I){_e.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),_e.copy(I))}function Re(I,ae){let ue=d.get(ae);ue===void 0&&(ue=new WeakMap,d.set(ae,ue));let Oe=ue.get(I);Oe===void 0&&(Oe=r.getUniformBlockIndex(ae,I.name),ue.set(I,Oe))}function xe(I,ae){const Oe=d.get(ae).get(I);u.get(ae)!==Oe&&(r.uniformBlockBinding(ae,Oe,I.__bindingPointIndex),u.set(ae,Oe))}function ne(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},ee=null,ie={},f={},g=new WeakMap,x=[],m=null,p=!1,v=null,_=null,b=null,L=null,w=null,A=null,U=null,M=new Me(0,0,0),T=0,k=!1,j=null,J=null,D=null,F=null,z=null,ce.set(0,0,r.canvas.width,r.canvas.height),_e.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Se,disable:Te,bindFramebuffer:Ge,drawBuffers:O,useProgram:ut,setBlending:X,setMaterial:ve,setFlipSided:Ue,setCullFace:E,setLineWidth:y,setPolygonOffset:B,setScissorTest:re,activeTexture:te,bindTexture:se,unbindTexture:Ae,compressedTexImage2D:fe,compressedTexImage3D:me,texImage2D:we,texImage3D:pe,updateUBOMapping:Re,uniformBlockBinding:xe,texStorage2D:ke,texStorage3D:Be,texSubImage2D:Ie,texSubImage3D:He,compressedTexSubImage2D:Q,compressedTexSubImage3D:Qe,scissor:R,viewport:oe,reset:ne}}function P0(r,e,t,n,i,s,o){const a=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return f?new OffscreenCanvas(E,y):Yr("canvas")}function x(E,y,B,re){let te=1;if((E.width>re||E.height>re)&&(te=re/Math.max(E.width,E.height)),te<1||y===!0)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap){const se=y?io:Math.floor,Ae=se(te*E.width),fe=se(te*E.height);d===void 0&&(d=g(Ae,fe));const me=B?g(Ae,fe):d;return me.width=Ae,me.height=fe,me.getContext("2d").drawImage(E,0,0,Ae,fe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+Ae+"x"+fe+")."),me}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function m(E){return Ra(E.width)&&Ra(E.height)}function p(E){return a?!1:E.wrapS!==qt||E.wrapT!==qt||E.minFilter!==vt&&E.minFilter!==jt}function v(E,y){return E.generateMipmaps&&y&&E.minFilter!==vt&&E.minFilter!==jt}function _(E){r.generateMipmap(E)}function b(E,y,B,re,te=!1){if(a===!1)return y;if(E!==null){if(r[E]!==void 0)return r[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let se=y;if(y===r.RED&&(B===r.FLOAT&&(se=r.R32F),B===r.HALF_FLOAT&&(se=r.R16F),B===r.UNSIGNED_BYTE&&(se=r.R8)),y===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(se=r.R8UI),B===r.UNSIGNED_SHORT&&(se=r.R16UI),B===r.UNSIGNED_INT&&(se=r.R32UI),B===r.BYTE&&(se=r.R8I),B===r.SHORT&&(se=r.R16I),B===r.INT&&(se=r.R32I)),y===r.RG&&(B===r.FLOAT&&(se=r.RG32F),B===r.HALF_FLOAT&&(se=r.RG16F),B===r.UNSIGNED_BYTE&&(se=r.RG8)),y===r.RGBA){const Ae=te?Qs:nt.getTransfer(re);B===r.FLOAT&&(se=r.RGBA32F),B===r.HALF_FLOAT&&(se=r.RGBA16F),B===r.UNSIGNED_BYTE&&(se=Ae===ot?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(se=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(se=r.RGB5_A1)}return(se===r.R16F||se===r.R32F||se===r.RG16F||se===r.RG32F||se===r.RGBA16F||se===r.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function L(E,y,B){return v(E,B)===!0||E.isFramebufferTexture&&E.minFilter!==vt&&E.minFilter!==jt?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function w(E){return E===vt||E===Ta||E===Xs?r.NEAREST:r.LINEAR}function A(E){const y=E.target;y.removeEventListener("dispose",A),M(y),y.isVideoTexture&&u.delete(y)}function U(E){const y=E.target;y.removeEventListener("dispose",U),k(y)}function M(E){const y=n.get(E);if(y.__webglInit===void 0)return;const B=E.source,re=h.get(B);if(re){const te=re[y.__cacheKey];te.usedTimes--,te.usedTimes===0&&T(E),Object.keys(re).length===0&&h.delete(B)}n.remove(E)}function T(E){const y=n.get(E);r.deleteTexture(y.__webglTexture);const B=E.source,re=h.get(B);delete re[y.__cacheKey],o.memory.textures--}function k(E){const y=E.texture,B=n.get(E),re=n.get(y);if(re.__webglTexture!==void 0&&(r.deleteTexture(re.__webglTexture),o.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(B.__webglFramebuffer[te]))for(let se=0;se<B.__webglFramebuffer[te].length;se++)r.deleteFramebuffer(B.__webglFramebuffer[te][se]);else r.deleteFramebuffer(B.__webglFramebuffer[te]);B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer[te])}else{if(Array.isArray(B.__webglFramebuffer))for(let te=0;te<B.__webglFramebuffer.length;te++)r.deleteFramebuffer(B.__webglFramebuffer[te]);else r.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&r.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let te=0;te<B.__webglColorRenderbuffer.length;te++)B.__webglColorRenderbuffer[te]&&r.deleteRenderbuffer(B.__webglColorRenderbuffer[te]);B.__webglDepthRenderbuffer&&r.deleteRenderbuffer(B.__webglDepthRenderbuffer)}if(E.isWebGLMultipleRenderTargets)for(let te=0,se=y.length;te<se;te++){const Ae=n.get(y[te]);Ae.__webglTexture&&(r.deleteTexture(Ae.__webglTexture),o.memory.textures--),n.remove(y[te])}n.remove(y),n.remove(E)}let j=0;function J(){j=0}function D(){const E=j;return E>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+i.maxTextures),j+=1,E}function F(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function z(E,y){const B=n.get(E);if(E.isVideoTexture&&ve(E),E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){const re=E.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(B,E,y);return}}t.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+y)}function q(E,y){const B=n.get(E);if(E.version>0&&B.__version!==E.version){ce(B,E,y);return}t.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+y)}function Y(E,y){const B=n.get(E);if(E.version>0&&B.__version!==E.version){ce(B,E,y);return}t.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+y)}function K(E,y){const B=n.get(E);if(E.version>0&&B.__version!==E.version){_e(B,E,y);return}t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+y)}const Z={[li]:r.REPEAT,[qt]:r.CLAMP_TO_EDGE,[$s]:r.MIRRORED_REPEAT},ee={[vt]:r.NEAREST,[Ta]:r.NEAREST_MIPMAP_NEAREST,[Xs]:r.NEAREST_MIPMAP_LINEAR,[jt]:r.LINEAR,[zu]:r.LINEAR_MIPMAP_NEAREST,[Si]:r.LINEAR_MIPMAP_LINEAR},ie={[pf]:r.NEVER,[bf]:r.ALWAYS,[mf]:r.LESS,[$u]:r.LEQUAL,[gf]:r.EQUAL,[vf]:r.GEQUAL,[xf]:r.GREATER,[_f]:r.NOTEQUAL};function H(E,y,B){if(B?(r.texParameteri(E,r.TEXTURE_WRAP_S,Z[y.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,Z[y.wrapT]),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,Z[y.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,ee[y.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,ee[y.minFilter])):(r.texParameteri(E,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(E,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(y.wrapS!==qt||y.wrapT!==qt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(E,r.TEXTURE_MAG_FILTER,w(y.magFilter)),r.texParameteri(E,r.TEXTURE_MIN_FILTER,w(y.minFilter)),y.minFilter!==vt&&y.minFilter!==jt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,ie[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const re=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===vt||y.minFilter!==Xs&&y.minFilter!==Si||y.type===On&&e.has("OES_texture_float_linear")===!1||a===!1&&y.type===Tn&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||n.get(y).__currentAnisotropy)&&(r.texParameterf(E,re.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy)}}function $(E,y){let B=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",A));const re=y.source;let te=h.get(re);te===void 0&&(te={},h.set(re,te));const se=F(y);if(se!==E.__cacheKey){te[se]===void 0&&(te[se]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,B=!0),te[se].usedTimes++;const Ae=te[E.__cacheKey];Ae!==void 0&&(te[E.__cacheKey].usedTimes--,Ae.usedTimes===0&&T(y)),E.__cacheKey=se,E.__webglTexture=te[se].texture}return B}function ce(E,y,B){let re=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(re=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(re=r.TEXTURE_3D);const te=$(E,y),se=y.source;t.bindTexture(re,E.__webglTexture,r.TEXTURE0+B);const Ae=n.get(se);if(se.version!==Ae.__version||te===!0){t.activeTexture(r.TEXTURE0+B);const fe=nt.getPrimaries(nt.workingColorSpace),me=y.colorSpace===ln?null:nt.getPrimaries(y.colorSpace),Ie=y.colorSpace===ln||fe===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const He=p(y)&&m(y.image)===!1;let Q=x(y.image,He,!1,i.maxTextureSize);Q=Ue(y,Q);const Qe=m(Q)||a,ke=s.convert(y.format,y.colorSpace);let Be=s.convert(y.type),we=b(y.internalFormat,ke,Be,y.colorSpace,y.isVideoTexture);H(re,y,Qe);let pe;const R=y.mipmaps,oe=a&&y.isVideoTexture!==!0&&we!==qu,Re=Ae.__version===void 0||te===!0,xe=L(y,Q,Qe);if(y.isDepthTexture)we=r.DEPTH_COMPONENT,a?y.type===On?we=r.DEPTH_COMPONENT32F:y.type===ni?we=r.DEPTH_COMPONENT24:y.type===bi?we=r.DEPTH24_STENCIL8:we=r.DEPTH_COMPONENT16:y.type===On&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===yi&&we===r.DEPTH_COMPONENT&&y.type!==Xa&&y.type!==ni&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=ni,Be=s.convert(y.type)),y.format===mr&&we===r.DEPTH_COMPONENT&&(we=r.DEPTH_STENCIL,y.type!==bi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=bi,Be=s.convert(y.type))),Re&&(oe?t.texStorage2D(r.TEXTURE_2D,1,we,Q.width,Q.height):t.texImage2D(r.TEXTURE_2D,0,we,Q.width,Q.height,0,ke,Be,null));else if(y.isDataTexture)if(R.length>0&&Qe){oe&&Re&&t.texStorage2D(r.TEXTURE_2D,xe,we,R[0].width,R[0].height);for(let ne=0,I=R.length;ne<I;ne++)pe=R[ne],oe?t.texSubImage2D(r.TEXTURE_2D,ne,0,0,pe.width,pe.height,ke,Be,pe.data):t.texImage2D(r.TEXTURE_2D,ne,we,pe.width,pe.height,0,ke,Be,pe.data);y.generateMipmaps=!1}else oe?(Re&&t.texStorage2D(r.TEXTURE_2D,xe,we,Q.width,Q.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Q.width,Q.height,ke,Be,Q.data)):t.texImage2D(r.TEXTURE_2D,0,we,Q.width,Q.height,0,ke,Be,Q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){oe&&Re&&t.texStorage3D(r.TEXTURE_2D_ARRAY,xe,we,R[0].width,R[0].height,Q.depth);for(let ne=0,I=R.length;ne<I;ne++)pe=R[ne],y.format!==an?ke!==null?oe?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ne,0,0,0,pe.width,pe.height,Q.depth,ke,pe.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ne,we,pe.width,pe.height,Q.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?t.texSubImage3D(r.TEXTURE_2D_ARRAY,ne,0,0,0,pe.width,pe.height,Q.depth,ke,Be,pe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ne,we,pe.width,pe.height,Q.depth,0,ke,Be,pe.data)}else{oe&&Re&&t.texStorage2D(r.TEXTURE_2D,xe,we,R[0].width,R[0].height);for(let ne=0,I=R.length;ne<I;ne++)pe=R[ne],y.format!==an?ke!==null?oe?t.compressedTexSubImage2D(r.TEXTURE_2D,ne,0,0,pe.width,pe.height,ke,pe.data):t.compressedTexImage2D(r.TEXTURE_2D,ne,we,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?t.texSubImage2D(r.TEXTURE_2D,ne,0,0,pe.width,pe.height,ke,Be,pe.data):t.texImage2D(r.TEXTURE_2D,ne,we,pe.width,pe.height,0,ke,Be,pe.data)}else if(y.isDataArrayTexture)oe?(Re&&t.texStorage3D(r.TEXTURE_2D_ARRAY,xe,we,Q.width,Q.height,Q.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ke,Be,Q.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,we,Q.width,Q.height,Q.depth,0,ke,Be,Q.data);else if(y.isData3DTexture)oe?(Re&&t.texStorage3D(r.TEXTURE_3D,xe,we,Q.width,Q.height,Q.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ke,Be,Q.data)):t.texImage3D(r.TEXTURE_3D,0,we,Q.width,Q.height,Q.depth,0,ke,Be,Q.data);else if(y.isFramebufferTexture){if(Re)if(oe)t.texStorage2D(r.TEXTURE_2D,xe,we,Q.width,Q.height);else{let ne=Q.width,I=Q.height;for(let ae=0;ae<xe;ae++)t.texImage2D(r.TEXTURE_2D,ae,we,ne,I,0,ke,Be,null),ne>>=1,I>>=1}}else if(R.length>0&&Qe){oe&&Re&&t.texStorage2D(r.TEXTURE_2D,xe,we,R[0].width,R[0].height);for(let ne=0,I=R.length;ne<I;ne++)pe=R[ne],oe?t.texSubImage2D(r.TEXTURE_2D,ne,0,0,ke,Be,pe):t.texImage2D(r.TEXTURE_2D,ne,we,ke,Be,pe);y.generateMipmaps=!1}else oe?(Re&&t.texStorage2D(r.TEXTURE_2D,xe,we,Q.width,Q.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,ke,Be,Q)):t.texImage2D(r.TEXTURE_2D,0,we,ke,Be,Q);v(y,Qe)&&_(re),Ae.__version=se.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function _e(E,y,B){if(y.image.length!==6)return;const re=$(E,y),te=y.source;t.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture,r.TEXTURE0+B);const se=n.get(te);if(te.version!==se.__version||re===!0){t.activeTexture(r.TEXTURE0+B);const Ae=nt.getPrimaries(nt.workingColorSpace),fe=y.colorSpace===ln?null:nt.getPrimaries(y.colorSpace),me=y.colorSpace===ln||Ae===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Ie=y.isCompressedTexture||y.image[0].isCompressedTexture,He=y.image[0]&&y.image[0].isDataTexture,Q=[];for(let ne=0;ne<6;ne++)!Ie&&!He?Q[ne]=x(y.image[ne],!1,!0,i.maxCubemapSize):Q[ne]=He?y.image[ne].image:y.image[ne],Q[ne]=Ue(y,Q[ne]);const Qe=Q[0],ke=m(Qe)||a,Be=s.convert(y.format,y.colorSpace),we=s.convert(y.type),pe=b(y.internalFormat,Be,we,y.colorSpace),R=a&&y.isVideoTexture!==!0,oe=se.__version===void 0||re===!0;let Re=L(y,Qe,ke);H(r.TEXTURE_CUBE_MAP,y,ke);let xe;if(Ie){R&&oe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,Re,pe,Qe.width,Qe.height);for(let ne=0;ne<6;ne++){xe=Q[ne].mipmaps;for(let I=0;I<xe.length;I++){const ae=xe[I];y.format!==an?Be!==null?R?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,I,0,0,ae.width,ae.height,Be,ae.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,I,pe,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,I,0,0,ae.width,ae.height,Be,we,ae.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,I,pe,ae.width,ae.height,0,Be,we,ae.data)}}}else{xe=y.mipmaps,R&&oe&&(xe.length>0&&Re++,t.texStorage2D(r.TEXTURE_CUBE_MAP,Re,pe,Q[0].width,Q[0].height));for(let ne=0;ne<6;ne++)if(He){R?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Q[ne].width,Q[ne].height,Be,we,Q[ne].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,pe,Q[ne].width,Q[ne].height,0,Be,we,Q[ne].data);for(let I=0;I<xe.length;I++){const ue=xe[I].image[ne].image;R?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,I+1,0,0,ue.width,ue.height,Be,we,ue.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,I+1,pe,ue.width,ue.height,0,Be,we,ue.data)}}else{R?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Be,we,Q[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,pe,Be,we,Q[ne]);for(let I=0;I<xe.length;I++){const ae=xe[I];R?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,I+1,0,0,Be,we,ae.image[ne]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ne,I+1,pe,Be,we,ae.image[ne])}}}v(y,ke)&&_(r.TEXTURE_CUBE_MAP),se.__version=te.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function le(E,y,B,re,te,se){const Ae=s.convert(B.format,B.colorSpace),fe=s.convert(B.type),me=b(B.internalFormat,Ae,fe,B.colorSpace);if(!n.get(y).__hasExternalTextures){const He=Math.max(1,y.width>>se),Q=Math.max(1,y.height>>se);te===r.TEXTURE_3D||te===r.TEXTURE_2D_ARRAY?t.texImage3D(te,se,me,He,Q,y.depth,0,Ae,fe,null):t.texImage2D(te,se,me,He,Q,0,Ae,fe,null)}t.bindFramebuffer(r.FRAMEBUFFER,E),X(y)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,re,te,n.get(B).__webglTexture,0,Fe(y)):(te===r.TEXTURE_2D||te>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,re,te,n.get(B).__webglTexture,se),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ee(E,y,B){if(r.bindRenderbuffer(r.RENDERBUFFER,E),y.depthBuffer&&!y.stencilBuffer){let re=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(B||X(y)){const te=y.depthTexture;te&&te.isDepthTexture&&(te.type===On?re=r.DEPTH_COMPONENT32F:te.type===ni&&(re=r.DEPTH_COMPONENT24));const se=Fe(y);X(y)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,se,re,y.width,y.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,se,re,y.width,y.height)}else r.renderbufferStorage(r.RENDERBUFFER,re,y.width,y.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,E)}else if(y.depthBuffer&&y.stencilBuffer){const re=Fe(y);B&&X(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,re,r.DEPTH24_STENCIL8,y.width,y.height):X(y)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,re,r.DEPTH24_STENCIL8,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,E)}else{const re=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let te=0;te<re.length;te++){const se=re[te],Ae=s.convert(se.format,se.colorSpace),fe=s.convert(se.type),me=b(se.internalFormat,Ae,fe,se.colorSpace),Ie=Fe(y);B&&X(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ie,me,y.width,y.height):X(y)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ie,me,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,me,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Se(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),z(y.depthTexture,0);const re=n.get(y.depthTexture).__webglTexture,te=Fe(y);if(y.depthTexture.format===yi)X(y)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,re,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,re,0);else if(y.depthTexture.format===mr)X(y)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,re,0,te):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Te(E){const y=n.get(E),B=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Se(y.__webglFramebuffer,E)}else if(B){y.__webglDepthbuffer=[];for(let re=0;re<6;re++)t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[re]),y.__webglDepthbuffer[re]=r.createRenderbuffer(),Ee(y.__webglDepthbuffer[re],E,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=r.createRenderbuffer(),Ee(y.__webglDepthbuffer,E,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ge(E,y,B){const re=n.get(E);y!==void 0&&le(re.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&Te(E)}function O(E){const y=E.texture,B=n.get(E),re=n.get(y);E.addEventListener("dispose",U),E.isWebGLMultipleRenderTargets!==!0&&(re.__webglTexture===void 0&&(re.__webglTexture=r.createTexture()),re.__version=y.version,o.memory.textures++);const te=E.isWebGLCubeRenderTarget===!0,se=E.isWebGLMultipleRenderTargets===!0,Ae=m(E)||a;if(te){B.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(a&&y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[fe]=[];for(let me=0;me<y.mipmaps.length;me++)B.__webglFramebuffer[fe][me]=r.createFramebuffer()}else B.__webglFramebuffer[fe]=r.createFramebuffer()}else{if(a&&y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let fe=0;fe<y.mipmaps.length;fe++)B.__webglFramebuffer[fe]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(se)if(i.drawBuffers){const fe=E.texture;for(let me=0,Ie=fe.length;me<Ie;me++){const He=n.get(fe[me]);He.__webglTexture===void 0&&(He.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&E.samples>0&&X(E)===!1){const fe=se?y:[y];B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let me=0;me<fe.length;me++){const Ie=fe[me];B.__webglColorRenderbuffer[me]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[me]);const He=s.convert(Ie.format,Ie.colorSpace),Q=s.convert(Ie.type),Qe=b(Ie.internalFormat,He,Q,Ie.colorSpace,E.isXRRenderTarget===!0),ke=Fe(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,ke,Qe,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,B.__webglColorRenderbuffer[me])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),Ee(B.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(te){t.bindTexture(r.TEXTURE_CUBE_MAP,re.__webglTexture),H(r.TEXTURE_CUBE_MAP,y,Ae);for(let fe=0;fe<6;fe++)if(a&&y.mipmaps&&y.mipmaps.length>0)for(let me=0;me<y.mipmaps.length;me++)le(B.__webglFramebuffer[fe][me],E,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,me);else le(B.__webglFramebuffer[fe],E,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);v(y,Ae)&&_(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(se){const fe=E.texture;for(let me=0,Ie=fe.length;me<Ie;me++){const He=fe[me],Q=n.get(He);t.bindTexture(r.TEXTURE_2D,Q.__webglTexture),H(r.TEXTURE_2D,He,Ae),le(B.__webglFramebuffer,E,He,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,0),v(He,Ae)&&_(r.TEXTURE_2D)}t.unbindTexture()}else{let fe=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(a?fe=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(fe,re.__webglTexture),H(fe,y,Ae),a&&y.mipmaps&&y.mipmaps.length>0)for(let me=0;me<y.mipmaps.length;me++)le(B.__webglFramebuffer[me],E,y,r.COLOR_ATTACHMENT0,fe,me);else le(B.__webglFramebuffer,E,y,r.COLOR_ATTACHMENT0,fe,0);v(y,Ae)&&_(fe),t.unbindTexture()}E.depthBuffer&&Te(E)}function ut(E){const y=m(E)||a,B=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let re=0,te=B.length;re<te;re++){const se=B[re];if(v(se,y)){const Ae=E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,fe=n.get(se).__webglTexture;t.bindTexture(Ae,fe),_(Ae),t.unbindTexture()}}}function Le(E){if(a&&E.samples>0&&X(E)===!1){const y=E.isWebGLMultipleRenderTargets?E.texture:[E.texture],B=E.width,re=E.height;let te=r.COLOR_BUFFER_BIT;const se=[],Ae=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,fe=n.get(E),me=E.isWebGLMultipleRenderTargets===!0;if(me)for(let Ie=0;Ie<y.length;Ie++)t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let Ie=0;Ie<y.length;Ie++){se.push(r.COLOR_ATTACHMENT0+Ie),E.depthBuffer&&se.push(Ae);const He=fe.__ignoreDepthValues!==void 0?fe.__ignoreDepthValues:!1;if(He===!1&&(E.depthBuffer&&(te|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&(te|=r.STENCIL_BUFFER_BIT)),me&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,fe.__webglColorRenderbuffer[Ie]),He===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Ae]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Ae])),me){const Q=n.get(y[Ie]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Q,0)}r.blitFramebuffer(0,0,B,re,0,0,B,re,te,r.NEAREST),c&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,se)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),me)for(let Ie=0;Ie<y.length;Ie++){t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.RENDERBUFFER,fe.__webglColorRenderbuffer[Ie]);const He=n.get(y[Ie]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,fe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ie,r.TEXTURE_2D,He,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}}function Fe(E){return Math.min(i.maxSamples,E.samples)}function X(E){const y=n.get(E);return a&&E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ve(E){const y=o.render.frame;u.get(E)!==y&&(u.set(E,y),E.update())}function Ue(E,y){const B=E.colorSpace,re=E.format,te=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||E.format===Ca||B!==Ct&&B!==ln&&(nt.getTransfer(B)===ot?a===!1?e.has("EXT_sRGB")===!0&&re===an?(E.format=Ca,E.minFilter=jt,E.generateMipmaps=!1):y=Qu.sRGBToLinear(y):(re!==an||te!==ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),y}this.allocateTextureUnit=D,this.resetTextureUnits=J,this.setTexture2D=z,this.setTexture2DArray=q,this.setTexture3D=Y,this.setTextureCube=K,this.rebindTextures=Ge,this.setupRenderTarget=O,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=le,this.useMultisampledRTT=X}function I0(r,e,t){const n=t.isWebGL2;function i(s,o=ln){let a;const l=nt.getTransfer(o);if(s===ai)return r.UNSIGNED_BYTE;if(s===Hu)return r.UNSIGNED_SHORT_4_4_4_4;if(s===Vu)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Jh)return r.BYTE;if(s===Qh)return r.SHORT;if(s===Xa)return r.UNSIGNED_SHORT;if(s===Gu)return r.INT;if(s===ni)return r.UNSIGNED_INT;if(s===On)return r.FLOAT;if(s===Tn)return n?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===ef)return r.ALPHA;if(s===an)return r.RGBA;if(s===tf)return r.LUMINANCE;if(s===nf)return r.LUMINANCE_ALPHA;if(s===yi)return r.DEPTH_COMPONENT;if(s===mr)return r.DEPTH_STENCIL;if(s===Ca)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===rf)return r.RED;if(s===Wu)return r.RED_INTEGER;if(s===sf)return r.RG;if(s===Xu)return r.RG_INTEGER;if(s===ju)return r.RGBA_INTEGER;if(s===wo||s===Co||s===Ro||s===Lo)if(l===ot)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===wo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Co)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ro)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Lo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===wo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Co)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ro)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Lo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ml||s===Sl||s===El||s===Tl)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Ml)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Sl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===El)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Tl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===qu)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Al||s===wl)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Al)return l===ot?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===wl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Cl||s===Rl||s===Ll||s===Pl||s===Il||s===Dl||s===Nl||s===Ul||s===Fl||s===Ol||s===Bl||s===kl||s===zl||s===Gl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Cl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Rl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ll)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Pl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Il)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Dl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Nl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ul)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Fl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Ol)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Bl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===kl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===zl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Gl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Po||s===Hl||s===Vl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Po)return l===ot?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Hl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Vl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===of||s===Wl||s===Xl||s===jl)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Po)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Wl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Xl)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===jl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===bi?n?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class D0 extends Pt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class kn extends st{constructor(){super(),this.isGroup=!0,this.type="Group"}}const N0={type:"move"};class ta{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(N0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new kn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class U0 extends Wn{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null;const x=t.getContextAttributes();let m=null,p=null;const v=[],_=[],b=new ge;let L=null;const w=new Pt;w.layers.enable(1),w.viewport=new it;const A=new Pt;A.layers.enable(2),A.viewport=new it;const U=[w,A],M=new D0;M.layers.enable(1),M.layers.enable(2);let T=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let $=v[H];return $===void 0&&($=new ta,v[H]=$),$.getTargetRaySpace()},this.getControllerGrip=function(H){let $=v[H];return $===void 0&&($=new ta,v[H]=$),$.getGripSpace()},this.getHand=function(H){let $=v[H];return $===void 0&&($=new ta,v[H]=$),$.getHandSpace()};function j(H){const $=_.indexOf(H.inputSource);if($===-1)return;const ce=v[$];ce!==void 0&&(ce.update(H.inputSource,H.frame,c||o),ce.dispatchEvent({type:H.type,data:H.inputSource}))}function J(){i.removeEventListener("select",j),i.removeEventListener("selectstart",j),i.removeEventListener("selectend",j),i.removeEventListener("squeeze",j),i.removeEventListener("squeezestart",j),i.removeEventListener("squeezeend",j),i.removeEventListener("end",J),i.removeEventListener("inputsourceschange",D);for(let H=0;H<v.length;H++){const $=_[H];$!==null&&(_[H]=null,v[H].disconnect($))}T=null,k=null,e.setRenderTarget(m),f=null,h=null,d=null,i=null,p=null,ie.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(H){if(i=H,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",j),i.addEventListener("selectstart",j),i.addEventListener("selectend",j),i.addEventListener("squeeze",j),i.addEventListener("squeezestart",j),i.addEventListener("squeezeend",j),i.addEventListener("end",J),i.addEventListener("inputsourceschange",D),x.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(b),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const $={antialias:i.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,$),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new un(f.framebufferWidth,f.framebufferHeight,{format:an,type:ai,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let $=null,ce=null,_e=null;x.depth&&(_e=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,$=x.stencil?mr:yi,ce=x.stencil?bi:ni);const le={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};d=new XRWebGLBinding(i,t),h=d.createProjectionLayer(le),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),p=new un(h.textureWidth,h.textureHeight,{format:an,type:ai,depthTexture:new cd(h.textureWidth,h.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const Ee=e.properties.get(p);Ee.__ignoreDepthValues=h.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ie.setContext(i),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function D(H){for(let $=0;$<H.removed.length;$++){const ce=H.removed[$],_e=_.indexOf(ce);_e>=0&&(_[_e]=null,v[_e].disconnect(ce))}for(let $=0;$<H.added.length;$++){const ce=H.added[$];let _e=_.indexOf(ce);if(_e===-1){for(let Ee=0;Ee<v.length;Ee++)if(Ee>=_.length){_.push(ce),_e=Ee;break}else if(_[Ee]===null){_[Ee]=ce,_e=Ee;break}if(_e===-1)break}const le=v[_e];le&&le.connect(ce)}}const F=new C,z=new C;function q(H,$,ce){F.setFromMatrixPosition($.matrixWorld),z.setFromMatrixPosition(ce.matrixWorld);const _e=F.distanceTo(z),le=$.projectionMatrix.elements,Ee=ce.projectionMatrix.elements,Se=le[14]/(le[10]-1),Te=le[14]/(le[10]+1),Ge=(le[9]+1)/le[5],O=(le[9]-1)/le[5],ut=(le[8]-1)/le[0],Le=(Ee[8]+1)/Ee[0],Fe=Se*ut,X=Se*Le,ve=_e/(-ut+Le),Ue=ve*-ut;$.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Ue),H.translateZ(ve),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const E=Se+ve,y=Te+ve,B=Fe-Ue,re=X+(_e-Ue),te=Ge*Te/y*E,se=O*Te/y*E;H.projectionMatrix.makePerspective(B,re,te,se,E,y),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function Y(H,$){$===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices($.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(i===null)return;M.near=A.near=w.near=H.near,M.far=A.far=w.far=H.far,(T!==M.near||k!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),T=M.near,k=M.far);const $=H.parent,ce=M.cameras;Y(M,$);for(let _e=0;_e<ce.length;_e++)Y(ce[_e],$);ce.length===2?q(M,w,A):M.projectionMatrix.copy(w.projectionMatrix),K(H,M,$)};function K(H,$,ce){ce===null?H.matrix.copy($.matrixWorld):(H.matrix.copy(ce.matrixWorld),H.matrix.invert(),H.matrix.multiply($.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy($.projectionMatrix),H.projectionMatrixInverse.copy($.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=xr*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(H){l=H,h!==null&&(h.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)};let Z=null;function ee(H,$){if(u=$.getViewerPose(c||o),g=$,u!==null){const ce=u.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let _e=!1;ce.length!==M.cameras.length&&(M.cameras.length=0,_e=!0);for(let le=0;le<ce.length;le++){const Ee=ce[le];let Se=null;if(f!==null)Se=f.getViewport(Ee);else{const Ge=d.getViewSubImage(h,Ee);Se=Ge.viewport,le===0&&(e.setRenderTargetTextures(p,Ge.colorTexture,h.ignoreDepthValues?void 0:Ge.depthStencilTexture),e.setRenderTarget(p))}let Te=U[le];Te===void 0&&(Te=new Pt,Te.layers.enable(le),Te.viewport=new it,U[le]=Te),Te.matrix.fromArray(Ee.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(Ee.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Se.x,Se.y,Se.width,Se.height),le===0&&(M.matrix.copy(Te.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),_e===!0&&M.cameras.push(Te)}}for(let ce=0;ce<v.length;ce++){const _e=_[ce],le=v[ce];_e!==null&&le!==void 0&&le.update(_e,$,c||o)}Z&&Z(H,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}const ie=new ld;ie.setAnimationLoop(ee),this.setAnimationLoop=function(H){Z=H},this.dispose=function(){}}}function F0(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,sd(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,_,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,v,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Kt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Kt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p).envMap;if(v&&(m.envMap.value=v,m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const _=r._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Kt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function O0(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(v,_){const b=_.program;n.uniformBlockBinding(v,b)}function c(v,_){let b=i[v.id];b===void 0&&(g(v),b=u(v),i[v.id]=b,v.addEventListener("dispose",m));const L=_.program;n.updateUBOMapping(v,L);const w=e.render.frame;s[v.id]!==w&&(h(v),s[v.id]=w)}function u(v){const _=d();v.__bindingPointIndex=_;const b=r.createBuffer(),L=v.__size,w=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,L,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,b),b}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(v){const _=i[v.id],b=v.uniforms,L=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let w=0,A=b.length;w<A;w++){const U=Array.isArray(b[w])?b[w]:[b[w]];for(let M=0,T=U.length;M<T;M++){const k=U[M];if(f(k,w,M,L)===!0){const j=k.__offset,J=Array.isArray(k.value)?k.value:[k.value];let D=0;for(let F=0;F<J.length;F++){const z=J[F],q=x(z);typeof z=="number"||typeof z=="boolean"?(k.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,j+D,k.__data)):z.isMatrix3?(k.__data[0]=z.elements[0],k.__data[1]=z.elements[1],k.__data[2]=z.elements[2],k.__data[3]=0,k.__data[4]=z.elements[3],k.__data[5]=z.elements[4],k.__data[6]=z.elements[5],k.__data[7]=0,k.__data[8]=z.elements[6],k.__data[9]=z.elements[7],k.__data[10]=z.elements[8],k.__data[11]=0):(z.toArray(k.__data,D),D+=q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,j,k.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,_,b,L){const w=v.value,A=_+"_"+b;if(L[A]===void 0)return typeof w=="number"||typeof w=="boolean"?L[A]=w:L[A]=w.clone(),!0;{const U=L[A];if(typeof w=="number"||typeof w=="boolean"){if(U!==w)return L[A]=w,!0}else if(U.equals(w)===!1)return U.copy(w),!0}return!1}function g(v){const _=v.uniforms;let b=0;const L=16;for(let A=0,U=_.length;A<U;A++){const M=Array.isArray(_[A])?_[A]:[_[A]];for(let T=0,k=M.length;T<k;T++){const j=M[T],J=Array.isArray(j.value)?j.value:[j.value];for(let D=0,F=J.length;D<F;D++){const z=J[D],q=x(z),Y=b%L;Y!==0&&L-Y<q.boundary&&(b+=L-Y),j.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=b,b+=q.storage}}}const w=b%L;return w>0&&(b+=L-w),v.__size=b,v.__cache={},this}function x(v){const _={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(_.boundary=4,_.storage=4):v.isVector2?(_.boundary=8,_.storage=8):v.isVector3||v.isColor?(_.boundary=16,_.storage=12):v.isVector4?(_.boundary=16,_.storage=16):v.isMatrix3?(_.boundary=48,_.storage=48):v.isMatrix4?(_.boundary=64,_.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),_}function m(v){const _=v.target;_.removeEventListener("dispose",m);const b=o.indexOf(_.__bindingPointIndex);o.splice(b,1),r.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function p(){for(const v in i)r.deleteBuffer(i[v]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class gd{constructor(e={}){const{canvas:t=Uf(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let h;n!==null?h=n.getContextAttributes().alpha:h=o;const f=new Uint32Array(4),g=new Int32Array(4);let x=null,m=null;const p=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=at,this._useLegacyLights=!1,this.toneMapping=oi,this.toneMappingExposure=1;const _=this;let b=!1,L=0,w=0,A=null,U=-1,M=null;const T=new it,k=new it;let j=null;const J=new Me(0);let D=0,F=t.width,z=t.height,q=1,Y=null,K=null;const Z=new it(0,0,F,z),ee=new it(0,0,F,z);let ie=!1;const H=new Za;let $=!1,ce=!1,_e=null;const le=new Ce,Ee=new ge,Se=new C,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ge(){return A===null?q:1}let O=n;function ut(S,N){for(let V=0;V<S.length;V++){const W=S[V],G=t.getContext(W,N);if(G!==null)return G}return null}try{const S={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wa}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",I,!1),t.addEventListener("webglcontextcreationerror",ae,!1),O===null){const N=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&N.shift(),O=ut(N,S),O===null)throw ut(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Le,Fe,X,ve,Ue,E,y,B,re,te,se,Ae,fe,me,Ie,He,Q,Qe,ke,Be,we,pe,R,oe;function Re(){Le=new Yg(O),Fe=new Hg(O,Le,e),Le.init(Fe),pe=new I0(O,Le,Fe),X=new L0(O,Le,Fe),ve=new $g(O),Ue=new x0,E=new P0(O,Le,X,Ue,Fe,pe,ve),y=new Wg(_),B=new qg(_),re=new sp(O,Fe),R=new zg(O,Le,re,Fe),te=new Kg(O,re,ve,R),se=new tx(O,te,re,ve),ke=new ex(O,Fe,E),He=new Vg(Ue),Ae=new g0(_,y,B,Le,Fe,R,He),fe=new F0(_,Ue),me=new v0,Ie=new T0(Le,Fe),Qe=new kg(_,y,B,X,se,h,l),Q=new R0(_,se,Fe),oe=new O0(O,ve,Fe,X),Be=new Gg(O,Le,ve,Fe),we=new Zg(O,Le,ve,Fe),ve.programs=Ae.programs,_.capabilities=Fe,_.extensions=Le,_.properties=Ue,_.renderLists=me,_.shadowMap=Q,_.state=X,_.info=ve}Re();const xe=new U0(_,O);this.xr=xe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const S=Le.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Le.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(S){S!==void 0&&(q=S,this.setSize(F,z,!1))},this.getSize=function(S){return S.set(F,z)},this.setSize=function(S,N,V=!0){if(xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=S,z=N,t.width=Math.floor(S*q),t.height=Math.floor(N*q),V===!0&&(t.style.width=S+"px",t.style.height=N+"px"),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(F*q,z*q).floor()},this.setDrawingBufferSize=function(S,N,V){F=S,z=N,q=V,t.width=Math.floor(S*V),t.height=Math.floor(N*V),this.setViewport(0,0,S,N)},this.getCurrentViewport=function(S){return S.copy(T)},this.getViewport=function(S){return S.copy(Z)},this.setViewport=function(S,N,V,W){S.isVector4?Z.set(S.x,S.y,S.z,S.w):Z.set(S,N,V,W),X.viewport(T.copy(Z).multiplyScalar(q).floor())},this.getScissor=function(S){return S.copy(ee)},this.setScissor=function(S,N,V,W){S.isVector4?ee.set(S.x,S.y,S.z,S.w):ee.set(S,N,V,W),X.scissor(k.copy(ee).multiplyScalar(q).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(S){X.setScissorTest(ie=S)},this.setOpaqueSort=function(S){Y=S},this.setTransparentSort=function(S){K=S},this.getClearColor=function(S){return S.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor.apply(Qe,arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha.apply(Qe,arguments)},this.clear=function(S=!0,N=!0,V=!0){let W=0;if(S){let G=!1;if(A!==null){const ye=A.texture.format;G=ye===ju||ye===Xu||ye===Wu}if(G){const ye=A.texture.type,Ne=ye===ai||ye===ni||ye===Xa||ye===bi||ye===Hu||ye===Vu,ze=Qe.getClearColor(),Ve=Qe.getClearAlpha(),Ke=ze.r,We=ze.g,je=ze.b;Ne?(f[0]=Ke,f[1]=We,f[2]=je,f[3]=Ve,O.clearBufferuiv(O.COLOR,0,f)):(g[0]=Ke,g[1]=We,g[2]=je,g[3]=Ve,O.clearBufferiv(O.COLOR,0,g))}else W|=O.COLOR_BUFFER_BIT}N&&(W|=O.DEPTH_BUFFER_BIT),V&&(W|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",I,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),me.dispose(),Ie.dispose(),Ue.dispose(),y.dispose(),B.dispose(),se.dispose(),R.dispose(),oe.dispose(),Ae.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",he),xe.removeEventListener("sessionend",Pe),_e&&(_e.dispose(),_e=null),be.stop()};function ne(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function I(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const S=ve.autoReset,N=Q.enabled,V=Q.autoUpdate,W=Q.needsUpdate,G=Q.type;Re(),ve.autoReset=S,Q.enabled=N,Q.autoUpdate=V,Q.needsUpdate=W,Q.type=G}function ae(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ue(S){const N=S.target;N.removeEventListener("dispose",ue),Oe(N)}function Oe(S){De(S),Ue.remove(S)}function De(S){const N=Ue.get(S).programs;N!==void 0&&(N.forEach(function(V){Ae.releaseProgram(V)}),S.isShaderMaterial&&Ae.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,V,W,G,ye){N===null&&(N=Te);const Ne=G.isMesh&&G.matrixWorld.determinant()<0,ze=Ci(S,N,V,W,G);X.setMaterial(W,Ne);let Ve=V.index,Ke=1;if(W.wireframe===!0){if(Ve=te.getWireframeAttribute(V),Ve===void 0)return;Ke=2}const We=V.drawRange,je=V.attributes.position;let mt=We.start*Ke,Zt=(We.start+We.count)*Ke;ye!==null&&(mt=Math.max(mt,ye.start*Ke),Zt=Math.min(Zt,(ye.start+ye.count)*Ke)),Ve!==null?(mt=Math.max(mt,0),Zt=Math.min(Zt,Ve.count)):je!=null&&(mt=Math.max(mt,0),Zt=Math.min(Zt,je.count));const Tt=Zt-mt;if(Tt<0||Tt===1/0)return;R.setup(G,W,ze,V,Ve);let Cn,dt=Be;if(Ve!==null&&(Cn=re.get(Ve),dt=we,dt.setIndex(Cn)),G.isMesh)W.wireframe===!0?(X.setLineWidth(W.wireframeLinewidth*Ge()),dt.setMode(O.LINES)):dt.setMode(O.TRIANGLES);else if(G.isLine){let Je=W.linewidth;Je===void 0&&(Je=1),X.setLineWidth(Je*Ge()),G.isLineSegments?dt.setMode(O.LINES):G.isLineLoop?dt.setMode(O.LINE_LOOP):dt.setMode(O.LINE_STRIP)}else G.isPoints?dt.setMode(O.POINTS):G.isSprite&&dt.setMode(O.TRIANGLES);if(G.isBatchedMesh)dt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)dt.renderInstances(mt,Tt,G.count);else if(V.isInstancedBufferGeometry){const Je=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,So=Math.min(V.instanceCount,Je);dt.renderInstances(mt,Tt,So)}else dt.render(mt,Tt)};function qe(S,N,V){S.transparent===!0&&S.side===Mn&&S.forceSinglePass===!1?(S.side=Kt,S.needsUpdate=!0,wi(S,N,V),S.side=zn,S.needsUpdate=!0,wi(S,N,V),S.side=Mn):wi(S,N,V)}this.compile=function(S,N,V=null){V===null&&(V=S),m=Ie.get(V),m.init(),v.push(m),V.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),S!==V&&S.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights(_._useLegacyLights);const W=new Set;return S.traverse(function(G){const ye=G.material;if(ye)if(Array.isArray(ye))for(let Ne=0;Ne<ye.length;Ne++){const ze=ye[Ne];qe(ze,V,G),W.add(ze)}else qe(ye,V,G),W.add(ye)}),v.pop(),m=null,W},this.compileAsync=function(S,N,V=null){const W=this.compile(S,N,V);return new Promise(G=>{function ye(){if(W.forEach(function(Ne){Ue.get(Ne).currentProgram.isReady()&&W.delete(Ne)}),W.size===0){G(S);return}setTimeout(ye,10)}Le.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Xe=null;function lt(S){Xe&&Xe(S)}function he(){be.stop()}function Pe(){be.start()}const be=new ld;be.setAnimationLoop(lt),typeof self<"u"&&be.setContext(self),this.setAnimationLoop=function(S){Xe=S,xe.setAnimationLoop(S),S===null?be.stop():be.start()},xe.addEventListener("sessionstart",he),xe.addEventListener("sessionend",Pe),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(N),N=xe.getCamera()),S.isScene===!0&&S.onBeforeRender(_,S,N,A),m=Ie.get(S,v.length),m.init(),v.push(m),le.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),H.setFromProjectionMatrix(le),ce=this.localClippingEnabled,$=He.init(this.clippingPlanes,ce),x=me.get(S,p.length),x.init(),p.push(x),It(S,N,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(Y,K),this.info.render.frame++,$===!0&&He.beginShadows();const V=m.state.shadowsArray;if(Q.render(V,S,N),$===!0&&He.endShadows(),this.info.autoReset===!0&&this.info.reset(),Qe.render(x,S),m.setupLights(_._useLegacyLights),N.isArrayCamera){const W=N.cameras;for(let G=0,ye=W.length;G<ye;G++){const Ne=W[G];Xt(x,S,Ne,Ne.viewport)}}else Xt(x,S,N);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),S.isScene===!0&&S.onAfterRender(_,S,N),R.resetDefaultState(),U=-1,M=null,v.pop(),v.length>0?m=v[v.length-1]:m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function It(S,N,V,W){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||H.intersectsSprite(S)){W&&Se.setFromMatrixPosition(S.matrixWorld).applyMatrix4(le);const Ne=se.update(S),ze=S.material;ze.visible&&x.push(S,Ne,ze,V,Se.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||H.intersectsObject(S))){const Ne=se.update(S),ze=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Se.copy(S.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),Se.copy(Ne.boundingSphere.center)),Se.applyMatrix4(S.matrixWorld).applyMatrix4(le)),Array.isArray(ze)){const Ve=Ne.groups;for(let Ke=0,We=Ve.length;Ke<We;Ke++){const je=Ve[Ke],mt=ze[je.materialIndex];mt&&mt.visible&&x.push(S,Ne,mt,V,Se.z,je)}}else ze.visible&&x.push(S,Ne,ze,V,Se.z,null)}}const ye=S.children;for(let Ne=0,ze=ye.length;Ne<ze;Ne++)It(ye[Ne],N,V,W)}function Xt(S,N,V,W){const G=S.opaque,ye=S.transmissive,Ne=S.transparent;m.setupLightsView(V),$===!0&&He.setGlobalState(_.clippingPlanes,V),ye.length>0&&ss(G,ye,N,V),W&&X.viewport(T.copy(W)),G.length>0&&en(G,N,V),ye.length>0&&en(ye,N,V),Ne.length>0&&en(Ne,N,V),X.buffers.depth.setTest(!0),X.buffers.depth.setMask(!0),X.buffers.color.setMask(!0),X.setPolygonOffset(!1)}function ss(S,N,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;const ye=Fe.isWebGL2;_e===null&&(_e=new un(1,1,{generateMipmaps:!0,type:Le.has("EXT_color_buffer_half_float")?Tn:ai,minFilter:Si,samples:ye?4:0})),_.getDrawingBufferSize(Ee),ye?_e.setSize(Ee.x,Ee.y):_e.setSize(io(Ee.x),io(Ee.y));const Ne=_.getRenderTarget();_.setRenderTarget(_e),_.getClearColor(J),D=_.getClearAlpha(),D<1&&_.setClearColor(16777215,.5),_.clear();const ze=_.toneMapping;_.toneMapping=oi,en(S,V,W),E.updateMultisampleRenderTarget(_e),E.updateRenderTargetMipmap(_e);let Ve=!1;for(let Ke=0,We=N.length;Ke<We;Ke++){const je=N[Ke],mt=je.object,Zt=je.geometry,Tt=je.material,Cn=je.group;if(Tt.side===Mn&&mt.layers.test(W.layers)){const dt=Tt.side;Tt.side=Kt,Tt.needsUpdate=!0,os(mt,V,W,Zt,Tt,Cn),Tt.side=dt,Tt.needsUpdate=!0,Ve=!0}}Ve===!0&&(E.updateMultisampleRenderTarget(_e),E.updateRenderTargetMipmap(_e)),_.setRenderTarget(Ne),_.setClearColor(J,D),_.toneMapping=ze}function en(S,N,V){const W=N.isScene===!0?N.overrideMaterial:null;for(let G=0,ye=S.length;G<ye;G++){const Ne=S[G],ze=Ne.object,Ve=Ne.geometry,Ke=W===null?Ne.material:W,We=Ne.group;ze.layers.test(V.layers)&&os(ze,N,V,Ve,Ke,We)}}function os(S,N,V,W,G,ye){S.onBeforeRender(_,N,V,W,G,ye),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),G.onBeforeRender(_,N,V,W,S,ye),G.transparent===!0&&G.side===Mn&&G.forceSinglePass===!1?(G.side=Kt,G.needsUpdate=!0,_.renderBufferDirect(V,N,W,G,S,ye),G.side=zn,G.needsUpdate=!0,_.renderBufferDirect(V,N,W,G,S,ye),G.side=Mn):_.renderBufferDirect(V,N,W,G,S,ye),S.onAfterRender(_,N,V,W,G,ye)}function wi(S,N,V){N.isScene!==!0&&(N=Te);const W=Ue.get(S),G=m.state.lights,ye=m.state.shadowsArray,Ne=G.state.version,ze=Ae.getParameters(S,G.state,ye,N,V),Ve=Ae.getProgramCacheKey(ze);let Ke=W.programs;W.environment=S.isMeshStandardMaterial?N.environment:null,W.fog=N.fog,W.envMap=(S.isMeshStandardMaterial?B:y).get(S.envMap||W.environment),Ke===void 0&&(S.addEventListener("dispose",ue),Ke=new Map,W.programs=Ke);let We=Ke.get(Ve);if(We!==void 0){if(W.currentProgram===We&&W.lightsStateVersion===Ne)return as(S,ze),We}else ze.uniforms=Ae.getUniforms(S),S.onBuild(V,ze,_),S.onBeforeCompile(ze,_),We=Ae.acquireProgram(ze,Ve),Ke.set(Ve,We),W.uniforms=ze.uniforms;const je=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(je.clippingPlanes=He.uniform),as(S,ze),W.needsLights=_n(S),W.lightsStateVersion=Ne,W.needsLights&&(je.ambientLightColor.value=G.state.ambient,je.lightProbe.value=G.state.probe,je.directionalLights.value=G.state.directional,je.directionalLightShadows.value=G.state.directionalShadow,je.spotLights.value=G.state.spot,je.spotLightShadows.value=G.state.spotShadow,je.rectAreaLights.value=G.state.rectArea,je.ltc_1.value=G.state.rectAreaLTC1,je.ltc_2.value=G.state.rectAreaLTC2,je.pointLights.value=G.state.point,je.pointLightShadows.value=G.state.pointShadow,je.hemisphereLights.value=G.state.hemi,je.directionalShadowMap.value=G.state.directionalShadowMap,je.directionalShadowMatrix.value=G.state.directionalShadowMatrix,je.spotShadowMap.value=G.state.spotShadowMap,je.spotLightMatrix.value=G.state.spotLightMatrix,je.spotLightMap.value=G.state.spotLightMap,je.pointShadowMap.value=G.state.pointShadowMap,je.pointShadowMatrix.value=G.state.pointShadowMatrix),W.currentProgram=We,W.uniformsList=null,We}function ci(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=js.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function as(S,N){const V=Ue.get(S);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function Ci(S,N,V,W,G){N.isScene!==!0&&(N=Te),E.resetTextureUnits();const ye=N.fog,Ne=W.isMeshStandardMaterial?N.environment:null,ze=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ct,Ve=(W.isMeshStandardMaterial?B:y).get(W.envMap||Ne),Ke=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,We=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),je=!!V.morphAttributes.position,mt=!!V.morphAttributes.normal,Zt=!!V.morphAttributes.color;let Tt=oi;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Tt=_.toneMapping);const Cn=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,dt=Cn!==void 0?Cn.length:0,Je=Ue.get(W),So=m.state.lights;if($===!0&&(ce===!0||S!==M)){const tn=S===M&&W.id===U;He.setState(W,S,tn)}let ft=!1;W.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==So.state.version||Je.outputColorSpace!==ze||G.isBatchedMesh&&Je.batching===!1||!G.isBatchedMesh&&Je.batching===!0||G.isInstancedMesh&&Je.instancing===!1||!G.isInstancedMesh&&Je.instancing===!0||G.isSkinnedMesh&&Je.skinning===!1||!G.isSkinnedMesh&&Je.skinning===!0||G.isInstancedMesh&&Je.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Je.instancingColor===!1&&G.instanceColor!==null||Je.envMap!==Ve||W.fog===!0&&Je.fog!==ye||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==He.numPlanes||Je.numIntersection!==He.numIntersection)||Je.vertexAlphas!==Ke||Je.vertexTangents!==We||Je.morphTargets!==je||Je.morphNormals!==mt||Je.morphColors!==Zt||Je.toneMapping!==Tt||Fe.isWebGL2===!0&&Je.morphTargetsCount!==dt)&&(ft=!0):(ft=!0,Je.__version=W.version);let ui=Je.currentProgram;ft===!0&&(ui=wi(W,N,G));let pl=!1,wr=!1,Eo=!1;const Dt=ui.getUniforms(),di=Je.uniforms;if(X.useProgram(ui.program)&&(pl=!0,wr=!0,Eo=!0),W.id!==U&&(U=W.id,wr=!0),pl||M!==S){Dt.setValue(O,"projectionMatrix",S.projectionMatrix),Dt.setValue(O,"viewMatrix",S.matrixWorldInverse);const tn=Dt.map.cameraPosition;tn!==void 0&&tn.setValue(O,Se.setFromMatrixPosition(S.matrixWorld)),Fe.logarithmicDepthBuffer&&Dt.setValue(O,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Dt.setValue(O,"isOrthographic",S.isOrthographicCamera===!0),M!==S&&(M=S,wr=!0,Eo=!0)}if(G.isSkinnedMesh){Dt.setOptional(O,G,"bindMatrix"),Dt.setOptional(O,G,"bindMatrixInverse");const tn=G.skeleton;tn&&(Fe.floatVertexTextures?(tn.boneTexture===null&&tn.computeBoneTexture(),Dt.setValue(O,"boneTexture",tn.boneTexture,E)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}G.isBatchedMesh&&(Dt.setOptional(O,G,"batchingTexture"),Dt.setValue(O,"batchingTexture",G._matricesTexture,E));const To=V.morphAttributes;if((To.position!==void 0||To.normal!==void 0||To.color!==void 0&&Fe.isWebGL2===!0)&&ke.update(G,V,ui),(wr||Je.receiveShadow!==G.receiveShadow)&&(Je.receiveShadow=G.receiveShadow,Dt.setValue(O,"receiveShadow",G.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(di.envMap.value=Ve,di.flipEnvMap.value=Ve.isCubeTexture&&Ve.isRenderTargetTexture===!1?-1:1),wr&&(Dt.setValue(O,"toneMappingExposure",_.toneMappingExposure),Je.needsLights&&pt(di,Eo),ye&&W.fog===!0&&fe.refreshFogUniforms(di,ye),fe.refreshMaterialUniforms(di,W,q,z,_e),js.upload(O,ci(Je),di,E)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(js.upload(O,ci(Je),di,E),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Dt.setValue(O,"center",G.center),Dt.setValue(O,"modelViewMatrix",G.modelViewMatrix),Dt.setValue(O,"normalMatrix",G.normalMatrix),Dt.setValue(O,"modelMatrix",G.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const tn=W.uniformsGroups;for(let Ao=0,dh=tn.length;Ao<dh;Ao++)if(Fe.isWebGL2){const ml=tn[Ao];oe.update(ml,ui),oe.bind(ml,ui)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ui}function pt(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function _n(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(S,N,V){Ue.get(S.texture).__webglTexture=N,Ue.get(S.depthTexture).__webglTexture=V;const W=Ue.get(S);W.__hasExternalTextures=!0,W.__hasExternalTextures&&(W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||Le.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,N){const V=Ue.get(S);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(S,N=0,V=0){A=S,L=N,w=V;let W=!0,G=null,ye=!1,Ne=!1;if(S){const Ve=Ue.get(S);Ve.__useDefaultFramebuffer!==void 0?(X.bindFramebuffer(O.FRAMEBUFFER,null),W=!1):Ve.__webglFramebuffer===void 0?E.setupRenderTarget(S):Ve.__hasExternalTextures&&E.rebindTextures(S,Ue.get(S.texture).__webglTexture,Ue.get(S.depthTexture).__webglTexture);const Ke=S.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Ne=!0);const We=Ue.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(We[N])?G=We[N][V]:G=We[N],ye=!0):Fe.isWebGL2&&S.samples>0&&E.useMultisampledRTT(S)===!1?G=Ue.get(S).__webglMultisampledFramebuffer:Array.isArray(We)?G=We[V]:G=We,T.copy(S.viewport),k.copy(S.scissor),j=S.scissorTest}else T.copy(Z).multiplyScalar(q).floor(),k.copy(ee).multiplyScalar(q).floor(),j=ie;if(X.bindFramebuffer(O.FRAMEBUFFER,G)&&Fe.drawBuffers&&W&&X.drawBuffers(S,G),X.viewport(T),X.scissor(k),X.setScissorTest(j),ye){const Ve=Ue.get(S.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+N,Ve.__webglTexture,V)}else if(Ne){const Ve=Ue.get(S.texture),Ke=N||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ve.__webglTexture,V||0,Ke)}U=-1},this.readRenderTargetPixels=function(S,N,V,W,G,ye,Ne){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ze=Ue.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Ne!==void 0&&(ze=ze[Ne]),ze){X.bindFramebuffer(O.FRAMEBUFFER,ze);try{const Ve=S.texture,Ke=Ve.format,We=Ve.type;if(Ke!==an&&pe.convert(Ke)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const je=We===Tn&&(Le.has("EXT_color_buffer_half_float")||Fe.isWebGL2&&Le.has("EXT_color_buffer_float"));if(We!==ai&&pe.convert(We)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(We===On&&(Fe.isWebGL2||Le.has("OES_texture_float")||Le.has("WEBGL_color_buffer_float")))&&!je){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-W&&V>=0&&V<=S.height-G&&O.readPixels(N,V,W,G,pe.convert(Ke),pe.convert(We),ye)}finally{const Ve=A!==null?Ue.get(A).__webglFramebuffer:null;X.bindFramebuffer(O.FRAMEBUFFER,Ve)}}},this.copyFramebufferToTexture=function(S,N,V=0){const W=Math.pow(2,-V),G=Math.floor(N.image.width*W),ye=Math.floor(N.image.height*W);E.setTexture2D(N,0),O.copyTexSubImage2D(O.TEXTURE_2D,V,0,0,S.x,S.y,G,ye),X.unbindTexture()},this.copyTextureToTexture=function(S,N,V,W=0){const G=N.image.width,ye=N.image.height,Ne=pe.convert(V.format),ze=pe.convert(V.type);E.setTexture2D(V,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment),N.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,W,S.x,S.y,G,ye,Ne,ze,N.image.data):N.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,W,S.x,S.y,N.mipmaps[0].width,N.mipmaps[0].height,Ne,N.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,W,S.x,S.y,Ne,ze,N.image),W===0&&V.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),X.unbindTexture()},this.copyTextureToTexture3D=function(S,N,V,W,G=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ye=S.max.x-S.min.x+1,Ne=S.max.y-S.min.y+1,ze=S.max.z-S.min.z+1,Ve=pe.convert(W.format),Ke=pe.convert(W.type);let We;if(W.isData3DTexture)E.setTexture3D(W,0),We=O.TEXTURE_3D;else if(W.isDataArrayTexture||W.isCompressedArrayTexture)E.setTexture2DArray(W,0),We=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,W.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,W.unpackAlignment);const je=O.getParameter(O.UNPACK_ROW_LENGTH),mt=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Zt=O.getParameter(O.UNPACK_SKIP_PIXELS),Tt=O.getParameter(O.UNPACK_SKIP_ROWS),Cn=O.getParameter(O.UNPACK_SKIP_IMAGES),dt=V.isCompressedTexture?V.mipmaps[G]:V.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,dt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,dt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,S.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,S.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,S.min.z),V.isDataTexture||V.isData3DTexture?O.texSubImage3D(We,G,N.x,N.y,N.z,ye,Ne,ze,Ve,Ke,dt.data):V.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(We,G,N.x,N.y,N.z,ye,Ne,ze,Ve,dt.data)):O.texSubImage3D(We,G,N.x,N.y,N.z,ye,Ne,ze,Ve,Ke,dt),O.pixelStorei(O.UNPACK_ROW_LENGTH,je),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,mt),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Zt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Tt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Cn),G===0&&W.generateMipmaps&&O.generateMipmap(We),X.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?E.setTextureCube(S,0):S.isData3DTexture?E.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?E.setTexture2DArray(S,0):E.setTexture2D(S,0),X.unbindTexture()},this.resetState=function(){L=0,w=0,A=null,X.reset(),R.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===qa?"display-p3":"srgb",t.unpackColorSpace=nt.workingColorSpace===mo?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===at?Mi:Ku}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Mi?at:Ct}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class B0 extends gd{}B0.prototype.isWebGL1Renderer=!0;class Qa{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Me(e),this.near=t,this.far=n}clone(){return new Qa(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class k0 extends st{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class xd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=wa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=gn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Bt=new C;class Kr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Sn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Sn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Sn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Sn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),i=rt(i,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Wt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Kr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class _d extends Qt{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Me(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let qi;const Dr=new C,Yi=new C,Ki=new C,Zi=new ge,Nr=new ge,vd=new Ce,Ls=new C,Ur=new C,Ps=new C,Nc=new ge,na=new ge,Uc=new ge;class z0 extends st{constructor(e=new _d){if(super(),this.isSprite=!0,this.type="Sprite",qi===void 0){qi=new Ot;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new xd(t,5);qi.setIndex([0,1,2,0,2,3]),qi.setAttribute("position",new Kr(n,3,0,!1)),qi.setAttribute("uv",new Kr(n,2,3,!1))}this.geometry=qi,this.material=e,this.center=new ge(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Yi.setFromMatrixScale(this.matrixWorld),vd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ki.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Yi.multiplyScalar(-Ki.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Is(Ls.set(-.5,-.5,0),Ki,o,Yi,i,s),Is(Ur.set(.5,-.5,0),Ki,o,Yi,i,s),Is(Ps.set(.5,.5,0),Ki,o,Yi,i,s),Nc.set(0,0),na.set(1,0),Uc.set(1,1);let a=e.ray.intersectTriangle(Ls,Ur,Ps,!1,Dr);if(a===null&&(Is(Ur.set(-.5,.5,0),Ki,o,Yi,i,s),na.set(0,1),a=e.ray.intersectTriangle(Ls,Ps,Ur,!1,Dr),a===null))return;const l=e.ray.origin.distanceTo(Dr);l<e.near||l>e.far||t.push({distance:l,point:Dr.clone(),uv:on.getInterpolation(Dr,Ls,Ur,Ps,Nc,na,Uc,new ge),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Is(r,e,t,n,i,s){Zi.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Nr.x=s*Zi.x-i*Zi.y,Nr.y=i*Zi.x+s*Zi.y):Nr.copy(Zi),r.copy(e),r.x+=Nr.x,r.y+=Nr.y,r.applyMatrix4(vd)}const Fc=new C,Oc=new it,Bc=new it,G0=new C,kc=new Ce,Ds=new C,ia=new An,zc=new Ce,ra=new Qr;class bd extends Yt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=yl,this.bindMatrix=new Ce,this.bindMatrixInverse=new Ce,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Xn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ds),this.boundingBox.expandByPoint(Ds)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new An),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ds),this.boundingSphere.expandByPoint(Ds)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ia.copy(this.boundingSphere),ia.applyMatrix4(i),e.ray.intersectsSphere(ia)!==!1&&(zc.copy(i).invert(),ra.copy(e.ray).applyMatrix4(zc),!(this.boundingBox!==null&&ra.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ra)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new it,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===yl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===$h?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Oc.fromBufferAttribute(i.attributes.skinIndex,e),Bc.fromBufferAttribute(i.attributes.skinWeight,e),Fc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Bc.getComponent(s);if(o!==0){const a=Oc.getComponent(s);kc.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(G0.copy(Fc).applyMatrix4(kc),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class ro extends st{constructor(){super(),this.isBone=!0,this.type="Bone"}}class H0 extends yt{constructor(e=null,t=1,n=1,i,s,o,a,l,c=vt,u=vt,d,h){super(null,o,a,l,c,u,i,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Gc=new Ce,V0=new Ce;class xo{constructor(e=[],t=[]){this.uuid=gn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ce)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ce;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:V0;Gc.multiplyMatrices(a,t[s]),Gc.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new xo(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new H0(t,e,e,an,On);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new ro),this.bones.push(o),this.boneInverses.push(new Ce().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Pa extends Wt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const $i=new Ce,Hc=new Ce,Ns=[],Vc=new Xn,W0=new Ce,Fr=new Yt,Or=new An;class X0 extends Yt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Pa(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,W0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$i),Vc.copy(e.boundingBox).applyMatrix4($i),this.boundingBox.union(Vc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new An),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$i),Or.copy(e.boundingSphere).applyMatrix4($i),this.boundingSphere.union(Or)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Fr.geometry=this.geometry,Fr.material=this.material,Fr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Or.copy(this.boundingSphere),Or.applyMatrix4(n),e.ray.intersectsSphere(Or)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,$i),Hc.multiplyMatrices(n,$i),Fr.matrixWorld=Hc,Fr.raycast(e,Ns);for(let o=0,a=Ns.length;o<a;o++){const l=Ns[o];l.instanceId=s,l.object=this,t.push(l)}Ns.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Pa(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class el extends Qt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Me(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Wc=new C,Xc=new C,jc=new Ce,sa=new Qr,Us=new An;class _o extends st{constructor(e=new Ot,t=new el){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Wc.fromBufferAttribute(t,i-1),Xc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Wc.distanceTo(Xc);e.setAttribute("lineDistance",new wt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Us.copy(n.boundingSphere),Us.applyMatrix4(i),Us.radius+=s,e.ray.intersectsSphere(Us)===!1)return;jc.copy(i).invert(),sa.copy(e.ray).applyMatrix4(jc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new C,u=new C,d=new C,h=new C,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,o.start),v=Math.min(g.count,o.start+o.count);for(let _=p,b=v-1;_<b;_+=f){const L=g.getX(_),w=g.getX(_+1);if(c.fromBufferAttribute(m,L),u.fromBufferAttribute(m,w),sa.distanceSqToSegment(c,u,h,d)>l)continue;h.applyMatrix4(this.matrixWorld);const U=e.ray.origin.distanceTo(h);U<e.near||U>e.far||t.push({distance:U,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let _=p,b=v-1;_<b;_+=f){if(c.fromBufferAttribute(m,_),u.fromBufferAttribute(m,_+1),sa.distanceSqToSegment(c,u,h,d)>l)continue;h.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(h);w<e.near||w>e.far||t.push({distance:w,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const qc=new C,Yc=new C;class j0 extends _o{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)qc.fromBufferAttribute(t,i),Yc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+qc.distanceTo(Yc);e.setAttribute("lineDistance",new wt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class q0 extends _o{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class tl extends Qt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Me(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Kc=new Ce,Ia=new Qr,Fs=new An,Os=new C;class yd extends st{constructor(e=new Ot,t=new tl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fs.copy(n.boundingSphere),Fs.applyMatrix4(i),Fs.radius+=s,e.ray.intersectsSphere(Fs)===!1)return;Kc.copy(i).invert(),Ia.copy(e.ray).applyMatrix4(Kc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=h,x=f;g<x;g++){const m=c.getX(g);Os.fromBufferAttribute(d,m),Zc(Os,m,l,i,e,t,this)}}else{const h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=h,x=f;g<x;g++)Os.fromBufferAttribute(d,g),Zc(Os,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Zc(r,e,t,n,i,s,o){const a=Ia.distanceSqToPoint(r);if(a<t){const l=new C;Ia.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Y0{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let o;t?o=t:o=e*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const u=n[i],h=n[i+1]-u,f=(o-u)/h;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=t||(o.isVector2?new ge:new C);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new C,i=[],s=[],o=[],a=new C,l=new Ce;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new C)}s[0]=new C,o[0]=new C;let c=Number.MAX_VALUE;const u=Math.abs(i[0].x),d=Math.abs(i[0].y),h=Math.abs(i[0].z);u<=c&&(c=u,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),h<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Mt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Mt(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}const K0={triangulate:function(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Md(r,0,i,t,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c,u,d,h,f;if(n&&(s=e_(r,e,s,t)),r.length>80*t){a=c=r[0],l=u=r[1];for(let g=t;g<i;g+=t)d=r[g],h=r[g+1],d<a&&(a=d),h<l&&(l=h),d>c&&(c=d),h>u&&(u=h);f=Math.max(c-a,u-l),f=f!==0?32767/f:0}return Zr(s,o,t,a,l,f,0),o}};function Md(r,e,t,n,i){let s,o;if(i===d_(r,e,t,n)>0)for(s=e;s<t;s+=n)o=$c(s,r[s],r[s+1],o);else for(s=t-n;s>=e;s-=n)o=$c(s,r[s],r[s+1],o);return o&&vo(o,o.next)&&(Jr(o),o=o.next),o}function Ei(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(vo(t,t.next)||ht(t.prev,t,t.next)===0)){if(Jr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Zr(r,e,t,n,i,s,o){if(!r)return;!o&&s&&s_(r,n,i,s);let a=r,l,c;for(;r.prev!==r.next;){if(l=r.prev,c=r.next,s?$0(r,n,i,s):Z0(r)){e.push(l.i/t|0),e.push(r.i/t|0),e.push(c.i/t|0),Jr(r),r=c.next,a=c.next;continue}if(r=c,r===a){o?o===1?(r=J0(Ei(r),e,t),Zr(r,e,t,n,i,s,2)):o===2&&Q0(r,e,t,n,i,s):Zr(Ei(r),e,t,n,i,s,1);break}}}function Z0(r){const e=r.prev,t=r,n=r.next;if(ht(e,t,n)>=0)return!1;const i=e.x,s=t.x,o=n.x,a=e.y,l=t.y,c=n.y,u=i<s?i<o?i:o:s<o?s:o,d=a<l?a<c?a:c:l<c?l:c,h=i>s?i>o?i:o:s>o?s:o,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=f&&ar(i,a,s,l,o,c,g.x,g.y)&&ht(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function $0(r,e,t,n){const i=r.prev,s=r,o=r.next;if(ht(i,s,o)>=0)return!1;const a=i.x,l=s.x,c=o.x,u=i.y,d=s.y,h=o.y,f=a<l?a<c?a:c:l<c?l:c,g=u<d?u<h?u:h:d<h?d:h,x=a>l?a>c?a:c:l>c?l:c,m=u>d?u>h?u:h:d>h?d:h,p=Da(f,g,e,t,n),v=Da(x,m,e,t,n);let _=r.prevZ,b=r.nextZ;for(;_&&_.z>=p&&b&&b.z<=v;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&ar(a,u,l,d,c,h,_.x,_.y)&&ht(_.prev,_,_.next)>=0||(_=_.prevZ,b.x>=f&&b.x<=x&&b.y>=g&&b.y<=m&&b!==i&&b!==o&&ar(a,u,l,d,c,h,b.x,b.y)&&ht(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;_&&_.z>=p;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&ar(a,u,l,d,c,h,_.x,_.y)&&ht(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;b&&b.z<=v;){if(b.x>=f&&b.x<=x&&b.y>=g&&b.y<=m&&b!==i&&b!==o&&ar(a,u,l,d,c,h,b.x,b.y)&&ht(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function J0(r,e,t){let n=r;do{const i=n.prev,s=n.next.next;!vo(i,s)&&Sd(i,n,n.next,s)&&$r(i,s)&&$r(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),Jr(n),Jr(n.next),n=r=s),n=n.next}while(n!==r);return Ei(n)}function Q0(r,e,t,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&l_(o,a)){let l=Ed(o,a);o=Ei(o,o.next),l=Ei(l,l.next),Zr(o,e,t,n,i,s,0),Zr(l,e,t,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function e_(r,e,t,n){const i=[];let s,o,a,l,c;for(s=0,o=e.length;s<o;s++)a=e[s]*n,l=s<o-1?e[s+1]*n:r.length,c=Md(r,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(a_(c));for(i.sort(t_),s=0;s<i.length;s++)t=n_(i[s],t);return t}function t_(r,e){return r.x-e.x}function n_(r,e){const t=i_(r,e);if(!t)return e;const n=Ed(t,r);return Ei(n,n.next),Ei(t,t.next)}function i_(r,e){let t=e,n=-1/0,i;const s=r.x,o=r.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const h=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(h<=s&&h>n&&(n=h,i=t.x<t.next.x?t:t.next,h===s))return i}t=t.next}while(t!==e);if(!i)return null;const a=i,l=i.x,c=i.y;let u=1/0,d;t=i;do s>=t.x&&t.x>=l&&s!==t.x&&ar(o<c?s:n,o,l,c,o<c?n:s,o,t.x,t.y)&&(d=Math.abs(o-t.y)/(s-t.x),$r(t,r)&&(d<u||d===u&&(t.x>i.x||t.x===i.x&&r_(i,t)))&&(i=t,u=d)),t=t.next;while(t!==a);return i}function r_(r,e){return ht(r.prev,r,e.prev)<0&&ht(e.next,r,r.next)<0}function s_(r,e,t,n){let i=r;do i.z===0&&(i.z=Da(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,o_(i)}function o_(r){let e,t,n,i,s,o,a,l,c=1;do{for(t=r,r=null,s=null,o=0;t;){for(o++,n=t,a=0,e=0;e<c&&(a++,n=n.nextZ,!!n);e++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,a--):(i=n,n=n.nextZ,l--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,c*=2}while(o>1);return r}function Da(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function a_(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function ar(r,e,t,n,i,s,o,a){return(i-o)*(e-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(i-o)*(n-a)}function l_(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!c_(r,e)&&($r(r,e)&&$r(e,r)&&u_(r,e)&&(ht(r.prev,r,e.prev)||ht(r,e.prev,e))||vo(r,e)&&ht(r.prev,r,r.next)>0&&ht(e.prev,e,e.next)>0)}function ht(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function vo(r,e){return r.x===e.x&&r.y===e.y}function Sd(r,e,t,n){const i=ks(ht(r,e,t)),s=ks(ht(r,e,n)),o=ks(ht(t,n,r)),a=ks(ht(t,n,e));return!!(i!==s&&o!==a||i===0&&Bs(r,t,e)||s===0&&Bs(r,n,e)||o===0&&Bs(t,r,n)||a===0&&Bs(t,e,n))}function Bs(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ks(r){return r>0?1:r<0?-1:0}function c_(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Sd(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function $r(r,e){return ht(r.prev,r,r.next)<0?ht(r,e,r.next)>=0&&ht(r,r.prev,e)>=0:ht(r,e,r.prev)<0||ht(r,r.next,e)<0}function u_(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function Ed(r,e){const t=new Na(r.i,r.x,r.y),n=new Na(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function $c(r,e,t,n){const i=new Na(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Jr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Na(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function d_(r,e,t,n){let i=0;for(let s=e,o=t-n;s<t;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class nl{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return nl.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];Jc(e),Qc(n,e);let o=e.length;t.forEach(Jc);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Qc(n,t[l]);const a=K0.triangulate(n,i);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Jc(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function Qc(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class h_ extends Vt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class il extends Qt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Me(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=po,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class jn extends il{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ge(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Me(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Me(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Me(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class oa extends Qt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Me(16777215),this.specular=new Me(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=po,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class f_ extends Qt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Me(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Me(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=po,this.normalScale=new ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=ho,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function zs(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function p_(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function m_(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function eu(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function Td(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class ns{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class g_ extends ns{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ir,endingEnd:ir}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case rr:s=e,a=2*t-n;break;case Js:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case rr:o=e,l=2*n-t;break;case Js:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),x=g*g,m=x*g,p=-h*m+2*h*x-h*g,v=(1+h)*m+(-1.5-2*h)*x+(-.5+h)*g+1,_=(-1-f)*m+(1.5+f)*x+.5*g,b=f*m-f*x;for(let L=0;L!==a;++L)s[L]=p*o[u+L]+v*o[c+L]+_*o[l+L]+b*o[d+L];return s}}class Ad extends ns{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let h=0;h!==a;++h)s[h]=o[c+h]*d+o[l+h]*u;return s}}class x_ extends ns{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class wn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zs(t,this.TimeBufferType),this.values=zs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:zs(e.times,Array),values:zs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new x_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ad(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new g_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case qr:t=this.InterpolantFactoryMethodDiscrete;break;case gr:t=this.InterpolantFactoryMethodLinear;break;case Io:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return qr;case this.InterpolantFactoryMethodLinear:return gr;case this.InterpolantFactoryMethodSmooth:return Io}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&p_(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Io,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,h=d-n,f=d+n;for(let g=0;g!==n;++g){const x=t[d+g];if(x!==t[h+g]||x!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,h=o*n;for(let f=0;f!==n;++f)t[h+f]=t[d+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=gr;class Tr extends wn{}Tr.prototype.ValueTypeName="bool";Tr.prototype.ValueBufferType=Array;Tr.prototype.DefaultInterpolation=qr;Tr.prototype.InterpolantFactoryMethodLinear=void 0;Tr.prototype.InterpolantFactoryMethodSmooth=void 0;class wd extends wn{}wd.prototype.ValueTypeName="color";class Gn extends wn{}Gn.prototype.ValueTypeName="number";class __ extends ns{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)xt.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Hn extends wn{InterpolantFactoryMethodLinear(e){return new __(this.times,this.values,this.getValueSize(),e)}}Hn.prototype.ValueTypeName="quaternion";Hn.prototype.DefaultInterpolation=gr;Hn.prototype.InterpolantFactoryMethodSmooth=void 0;class Ar extends wn{}Ar.prototype.ValueTypeName="string";Ar.prototype.ValueBufferType=Array;Ar.prototype.DefaultInterpolation=qr;Ar.prototype.InterpolantFactoryMethodLinear=void 0;Ar.prototype.InterpolantFactoryMethodSmooth=void 0;class Ti extends wn{}Ti.prototype.ValueTypeName="vector";class br{constructor(e,t=-1,n,i=ja){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=gn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(b_(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(wn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=m_(l);l=eu(l,1,u),c=eu(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Gn(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let h=i[d];h||(i[d]=h=[]),h.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,f,g,x){if(f.length!==0){const m=[],p=[];Td(f,m,p,g),m.length!==0&&x.push(new d(h,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const f={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let x=0;x<h[g].morphTargets.length;x++)f[h[g].morphTargets[x]]=-1;for(const x in f){const m=[],p=[];for(let v=0;v!==h[g].morphTargets.length;++v){const _=h[g];m.push(_.time),p.push(_.morphTarget===x?1:0)}i.push(new Gn(".morphTargetInfluence["+x+"]",m,p))}l=f.length*o}else{const f=".bones["+t[d].name+"]";n(Ti,f+".position",h,"pos",i),n(Hn,f+".quaternion",h,"rot",i),n(Ti,f+".scale",h,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function v_(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Gn;case"vector":case"vector2":case"vector3":case"vector4":return Ti;case"color":return wd;case"quaternion":return Hn;case"bool":case"boolean":return Tr;case"string":return Ar}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function b_(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=v_(r.type);if(r.times===void 0){const t=[],n=[];Td(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const ri={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class y_{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}}const M_=new y_;class Vn{constructor(e){this.manager=e!==void 0?e:M_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Vn.DEFAULT_MATERIAL_NAME="__DEFAULT";const Nn={};class S_ extends Error{constructor(e,t){super(e),this.response=t}}class rl extends Vn{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ri.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Nn[e]!==void 0){Nn[e].push({onLoad:t,onProgress:n,onError:i});return}Nn[e]=[],Nn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Nn[e],d=c.body.getReader(),h=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=h?parseInt(h):0,g=f!==0;let x=0;const m=new ReadableStream({start(p){v();function v(){d.read().then(({done:_,value:b})=>{if(_)p.close();else{x+=b.byteLength;const L=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let w=0,A=u.length;w<A;w++){const U=u[w];U.onProgress&&U.onProgress(L)}p.enqueue(b),v()}})}}});return new Response(m)}else throw new S_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(h);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{ri.add(e,c);const u=Nn[e];delete Nn[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{const u=Nn[e];if(u===void 0)throw this.manager.itemError(e),c;delete Nn[e];for(let d=0,h=u.length;d<h;d++){const f=u[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class E_ extends Vn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ri.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Yr("img");function l(){u(),ri.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class Cd extends Vn{constructor(e){super(e)}load(e,t,n,i){const s=new yt,o=new E_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class bo extends st{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Me(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const aa=new Ce,tu=new C,nu=new C;class sl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ge(512,512),this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Za,this._frameExtents=new ge(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;tu.setFromMatrixPosition(e.matrixWorld),t.position.copy(tu),nu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nu),t.updateMatrixWorld(),aa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(aa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(aa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class T_ extends sl{constructor(){super(new Pt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=xr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ol extends bo{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(st.DEFAULT_UP),this.updateMatrix(),this.target=new st,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new T_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const iu=new Ce,Br=new C,la=new C;class A_ extends sl{constructor(){super(new Pt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ge(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Br.setFromMatrixPosition(e.matrixWorld),n.position.copy(Br),la.copy(n.position),la.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(la),n.updateMatrixWorld(),i.makeTranslation(-Br.x,-Br.y,-Br.z),iu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(iu)}}class so extends bo{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new A_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class w_ extends sl{constructor(){super(new ts(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Rd extends bo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(st.DEFAULT_UP),this.updateMatrix(),this.target=new st,this.shadow=new w_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class C_ extends bo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ur{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class R_ extends Vn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ri.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return ri.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),ri.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});ri.add(e,l),s.manager.itemStart(e)}}class Ld{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ru(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ru();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ru(){return(typeof performance>"u"?Date:performance).now()}class L_{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){xt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;xt.multiplyQuaternionsFlat(e,o,e,t,e,n),xt.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const al="\\[\\]\\.:\\/",P_=new RegExp("["+al+"]","g"),ll="[^"+al+"]",I_="[^"+al.replace("\\.","")+"]",D_=/((?:WC+[\/:])*)/.source.replace("WC",ll),N_=/(WCOD+)?/.source.replace("WCOD",I_),U_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ll),F_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ll),O_=new RegExp("^"+D_+N_+U_+F_+"$"),B_=["material","materials","bones","map"];class k_{constructor(e,t,n){const i=n||tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class tt{constructor(e,t,n){this.path=t,this.parsedPath=n||tt.parseTrackName(t),this.node=tt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new tt.Composite(e,t,n):new tt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(P_,"")}static parseTrackName(e){const t=O_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);B_.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=tt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}tt.Composite=k_;tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};tt.prototype.GetterByBindingType=[tt.prototype._getValue_direct,tt.prototype._getValue_array,tt.prototype._getValue_arrayElement,tt.prototype._getValue_toArray];tt.prototype.SetterByBindingTypeAndVersioning=[[tt.prototype._setValue_direct,tt.prototype._setValue_direct_setNeedsUpdate,tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_array,tt.prototype._setValue_array_setNeedsUpdate,tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_arrayElement,tt.prototype._setValue_arrayElement_setNeedsUpdate,tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[tt.prototype._setValue_fromArray,tt.prototype._setValue_fromArray_setNeedsUpdate,tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class z_{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,a=new Array(o),l={endingStart:ir,endingEnd:ir};for(let c=0;c!==o;++c){const u=s[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=lf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,o=s/i,a=i/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case uf:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case ja:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(o),c[u].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===cf;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===af){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=rr,i.endingEnd=rr):(e?i.endingStart=this.zeroSlopeAtStart?rr:ir:i.endingStart=Js,t?i.endingEnd=this.zeroSlopeAtEnd?rr:ir:i.endingEnd=Js)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}}const G_=new Float32Array(1);class H_ extends Wn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==s;++d){const h=i[d],f=h.name;let g=u[f];if(g!==void 0)++g.referenceCount,o[d]=g;else{if(g=o[d],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const x=t&&t._propertyBindings[d].binding.parsedPath;g=new L_(tt.create(n,f,x),h.ValueTypeName,h.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[d]=g}a[d].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const d=a.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Ad(new Float32Array(2),new Float32Array(2),1,G_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?br.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=ja),l!==void 0){const d=l.actionByRoot[s];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const u=new z_(this,o,t,n);return this._bindAction(u,c),this._addInactiveAction(u,a,s),u}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?br.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class su{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Mt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wa);const ou={type:"change"},ca={type:"start"},au={type:"end"},Gs=new Qr,lu=new ei,V_=Math.cos(70*Rt.DEG2RAD);class W_ extends Wn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ri.ROTATE,MIDDLE:Ri.DOLLY,RIGHT:Ri.PAN},this.touches={ONE:Li.ROTATE,TWO:Li.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",Ie),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ie),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(ou),n.update(),s=i.NONE},this.update=function(){const R=new C,oe=new xt().setFromUnitVectors(e.up,new C(0,1,0)),Re=oe.clone().invert(),xe=new C,ne=new xt,I=new C,ae=2*Math.PI;return function(Oe=null){const De=n.object.position;R.copy(De).sub(n.target),R.applyQuaternion(oe),a.setFromVector3(R),n.autoRotate&&s===i.NONE&&j(T(Oe)),n.enableDamping?(a.theta+=l.theta*n.dampingFactor,a.phi+=l.phi*n.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let qe=n.minAzimuthAngle,Xe=n.maxAzimuthAngle;isFinite(qe)&&isFinite(Xe)&&(qe<-Math.PI?qe+=ae:qe>Math.PI&&(qe-=ae),Xe<-Math.PI?Xe+=ae:Xe>Math.PI&&(Xe-=ae),qe<=Xe?a.theta=Math.max(qe,Math.min(Xe,a.theta)):a.theta=a.theta>(qe+Xe)/2?Math.max(qe,a.theta):Math.min(Xe,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(u,n.dampingFactor):n.target.add(u),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&w||n.object.isOrthographicCamera?a.radius=Z(a.radius):a.radius=Z(a.radius*c),R.setFromSpherical(a),R.applyQuaternion(Re),De.copy(n.target).add(R),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,u.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let lt=!1;if(n.zoomToCursor&&w){let he=null;if(n.object.isPerspectiveCamera){const Pe=R.length();he=Z(Pe*c);const be=Pe-he;n.object.position.addScaledVector(b,be),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Pe=new C(L.x,L.y,0);Pe.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),lt=!0;const be=new C(L.x,L.y,0);be.unproject(n.object),n.object.position.sub(be).add(Pe),n.object.updateMatrixWorld(),he=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;he!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(he).add(n.object.position):(Gs.origin.copy(n.object.position),Gs.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Gs.direction))<V_?e.lookAt(n.target):(lu.setFromNormalAndCoplanarPoint(n.object.up,n.target),Gs.intersectPlane(lu,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),lt=!0);return c=1,w=!1,lt||xe.distanceToSquared(n.object.position)>o||8*(1-ne.dot(n.object.quaternion))>o||I.distanceToSquared(n.target)>0?(n.dispatchEvent(ou),xe.copy(n.object.position),ne.copy(n.object.quaternion),I.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Qe),n.domElement.removeEventListener("pointerdown",E),n.domElement.removeEventListener("pointercancel",B),n.domElement.removeEventListener("wheel",se),n.domElement.removeEventListener("pointermove",y),n.domElement.removeEventListener("pointerup",B),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Ie),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const o=1e-6,a=new su,l=new su;let c=1;const u=new C,d=new ge,h=new ge,f=new ge,g=new ge,x=new ge,m=new ge,p=new ge,v=new ge,_=new ge,b=new C,L=new ge;let w=!1;const A=[],U={};let M=!1;function T(R){return R!==null?2*Math.PI/60*n.autoRotateSpeed*R:2*Math.PI/60/60*n.autoRotateSpeed}function k(R){const oe=Math.abs(R*.01);return Math.pow(.95,n.zoomSpeed*oe)}function j(R){l.theta-=R}function J(R){l.phi-=R}const D=function(){const R=new C;return function(Re,xe){R.setFromMatrixColumn(xe,0),R.multiplyScalar(-Re),u.add(R)}}(),F=function(){const R=new C;return function(Re,xe){n.screenSpacePanning===!0?R.setFromMatrixColumn(xe,1):(R.setFromMatrixColumn(xe,0),R.crossVectors(n.object.up,R)),R.multiplyScalar(Re),u.add(R)}}(),z=function(){const R=new C;return function(Re,xe){const ne=n.domElement;if(n.object.isPerspectiveCamera){const I=n.object.position;R.copy(I).sub(n.target);let ae=R.length();ae*=Math.tan(n.object.fov/2*Math.PI/180),D(2*Re*ae/ne.clientHeight,n.object.matrix),F(2*xe*ae/ne.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(D(Re*(n.object.right-n.object.left)/n.object.zoom/ne.clientWidth,n.object.matrix),F(xe*(n.object.top-n.object.bottom)/n.object.zoom/ne.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function q(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Y(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function K(R,oe){if(!n.zoomToCursor)return;w=!0;const Re=n.domElement.getBoundingClientRect(),xe=R-Re.left,ne=oe-Re.top,I=Re.width,ae=Re.height;L.x=xe/I*2-1,L.y=-(ne/ae)*2+1,b.set(L.x,L.y,1).unproject(n.object).sub(n.object.position).normalize()}function Z(R){return Math.max(n.minDistance,Math.min(n.maxDistance,R))}function ee(R){d.set(R.clientX,R.clientY)}function ie(R){K(R.clientX,R.clientX),p.set(R.clientX,R.clientY)}function H(R){g.set(R.clientX,R.clientY)}function $(R){h.set(R.clientX,R.clientY),f.subVectors(h,d).multiplyScalar(n.rotateSpeed);const oe=n.domElement;j(2*Math.PI*f.x/oe.clientHeight),J(2*Math.PI*f.y/oe.clientHeight),d.copy(h),n.update()}function ce(R){v.set(R.clientX,R.clientY),_.subVectors(v,p),_.y>0?q(k(_.y)):_.y<0&&Y(k(_.y)),p.copy(v),n.update()}function _e(R){x.set(R.clientX,R.clientY),m.subVectors(x,g).multiplyScalar(n.panSpeed),z(m.x,m.y),g.copy(x),n.update()}function le(R){K(R.clientX,R.clientY),R.deltaY<0?Y(k(R.deltaY)):R.deltaY>0&&q(k(R.deltaY)),n.update()}function Ee(R){let oe=!1;switch(R.code){case n.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?J(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(0,n.keyPanSpeed),oe=!0;break;case n.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?J(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(0,-n.keyPanSpeed),oe=!0;break;case n.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?j(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(n.keyPanSpeed,0),oe=!0;break;case n.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?j(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):z(-n.keyPanSpeed,0),oe=!0;break}oe&&(R.preventDefault(),n.update())}function Se(R){if(A.length===1)d.set(R.pageX,R.pageY);else{const oe=pe(R),Re=.5*(R.pageX+oe.x),xe=.5*(R.pageY+oe.y);d.set(Re,xe)}}function Te(R){if(A.length===1)g.set(R.pageX,R.pageY);else{const oe=pe(R),Re=.5*(R.pageX+oe.x),xe=.5*(R.pageY+oe.y);g.set(Re,xe)}}function Ge(R){const oe=pe(R),Re=R.pageX-oe.x,xe=R.pageY-oe.y,ne=Math.sqrt(Re*Re+xe*xe);p.set(0,ne)}function O(R){n.enableZoom&&Ge(R),n.enablePan&&Te(R)}function ut(R){n.enableZoom&&Ge(R),n.enableRotate&&Se(R)}function Le(R){if(A.length==1)h.set(R.pageX,R.pageY);else{const Re=pe(R),xe=.5*(R.pageX+Re.x),ne=.5*(R.pageY+Re.y);h.set(xe,ne)}f.subVectors(h,d).multiplyScalar(n.rotateSpeed);const oe=n.domElement;j(2*Math.PI*f.x/oe.clientHeight),J(2*Math.PI*f.y/oe.clientHeight),d.copy(h)}function Fe(R){if(A.length===1)x.set(R.pageX,R.pageY);else{const oe=pe(R),Re=.5*(R.pageX+oe.x),xe=.5*(R.pageY+oe.y);x.set(Re,xe)}m.subVectors(x,g).multiplyScalar(n.panSpeed),z(m.x,m.y),g.copy(x)}function X(R){const oe=pe(R),Re=R.pageX-oe.x,xe=R.pageY-oe.y,ne=Math.sqrt(Re*Re+xe*xe);v.set(0,ne),_.set(0,Math.pow(v.y/p.y,n.zoomSpeed)),q(_.y),p.copy(v);const I=(R.pageX+oe.x)*.5,ae=(R.pageY+oe.y)*.5;K(I,ae)}function ve(R){n.enableZoom&&X(R),n.enablePan&&Fe(R)}function Ue(R){n.enableZoom&&X(R),n.enableRotate&&Le(R)}function E(R){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(R.pointerId),n.domElement.addEventListener("pointermove",y),n.domElement.addEventListener("pointerup",B)),ke(R),R.pointerType==="touch"?He(R):re(R))}function y(R){n.enabled!==!1&&(R.pointerType==="touch"?Q(R):te(R))}function B(R){Be(R),A.length===0&&(n.domElement.releasePointerCapture(R.pointerId),n.domElement.removeEventListener("pointermove",y),n.domElement.removeEventListener("pointerup",B)),n.dispatchEvent(au),s=i.NONE}function re(R){let oe;switch(R.button){case 0:oe=n.mouseButtons.LEFT;break;case 1:oe=n.mouseButtons.MIDDLE;break;case 2:oe=n.mouseButtons.RIGHT;break;default:oe=-1}switch(oe){case Ri.DOLLY:if(n.enableZoom===!1)return;ie(R),s=i.DOLLY;break;case Ri.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enablePan===!1)return;H(R),s=i.PAN}else{if(n.enableRotate===!1)return;ee(R),s=i.ROTATE}break;case Ri.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enableRotate===!1)return;ee(R),s=i.ROTATE}else{if(n.enablePan===!1)return;H(R),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(ca)}function te(R){switch(s){case i.ROTATE:if(n.enableRotate===!1)return;$(R);break;case i.DOLLY:if(n.enableZoom===!1)return;ce(R);break;case i.PAN:if(n.enablePan===!1)return;_e(R);break}}function se(R){n.enabled===!1||n.enableZoom===!1||s!==i.NONE||(R.preventDefault(),n.dispatchEvent(ca),le(Ae(R)),n.dispatchEvent(au))}function Ae(R){const oe=R.deltaMode,Re={clientX:R.clientX,clientY:R.clientY,deltaY:R.deltaY};switch(oe){case 1:Re.deltaY*=16;break;case 2:Re.deltaY*=100;break}return R.ctrlKey&&!M&&(Re.deltaY*=10),Re}function fe(R){R.key==="Control"&&(M=!0,document.addEventListener("keyup",me,{passive:!0,capture:!0}))}function me(R){R.key==="Control"&&(M=!1,document.removeEventListener("keyup",me,{passive:!0,capture:!0}))}function Ie(R){n.enabled===!1||n.enablePan===!1||Ee(R)}function He(R){switch(we(R),A.length){case 1:switch(n.touches.ONE){case Li.ROTATE:if(n.enableRotate===!1)return;Se(R),s=i.TOUCH_ROTATE;break;case Li.PAN:if(n.enablePan===!1)return;Te(R),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(n.touches.TWO){case Li.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;O(R),s=i.TOUCH_DOLLY_PAN;break;case Li.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ut(R),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&n.dispatchEvent(ca)}function Q(R){switch(we(R),s){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;Le(R),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;Fe(R),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;ve(R),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Ue(R),n.update();break;default:s=i.NONE}}function Qe(R){n.enabled!==!1&&R.preventDefault()}function ke(R){A.push(R.pointerId)}function Be(R){delete U[R.pointerId];for(let oe=0;oe<A.length;oe++)if(A[oe]==R.pointerId){A.splice(oe,1);return}}function we(R){let oe=U[R.pointerId];oe===void 0&&(oe=new ge,U[R.pointerId]=oe),oe.set(R.pageX,R.pageY)}function pe(R){const oe=R.pointerId===A[0]?A[1]:A[0];return U[oe]}n.domElement.addEventListener("contextmenu",Qe),n.domElement.addEventListener("pointerdown",E),n.domElement.addEventListener("pointercancel",B),n.domElement.addEventListener("wheel",se,{passive:!1}),document.addEventListener("keydown",fe,{passive:!0,capture:!0}),this.update()}}const Ji=new bt(0,0,0,"YXZ"),Qi=new C,X_={type:"change"},j_={type:"lock"},q_={type:"unlock"},cu=Math.PI/2;class Y_ extends Wn{constructor(e,t){super(),this.camera=e,this.domElement=t,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=K_.bind(this),this._onPointerlockChange=Z_.bind(this),this._onPointerlockError=$_.bind(this),this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return this.camera}getDirection(e){return e.set(0,0,-1).applyQuaternion(this.camera.quaternion)}moveForward(e){const t=this.camera;Qi.setFromMatrixColumn(t.matrix,0),Qi.crossVectors(t.up,Qi),t.position.addScaledVector(Qi,e)}moveRight(e){const t=this.camera;Qi.setFromMatrixColumn(t.matrix,0),t.position.addScaledVector(Qi,e)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function K_(r){if(this.isLocked===!1)return;const e=r.movementX||r.mozMovementX||r.webkitMovementX||0,t=r.movementY||r.mozMovementY||r.webkitMovementY||0,n=this.camera;Ji.setFromQuaternion(n.quaternion),Ji.y-=e*.002*this.pointerSpeed,Ji.x-=t*.002*this.pointerSpeed,Ji.x=Math.max(cu-this.maxPolarAngle,Math.min(cu-this.minPolarAngle,Ji.x)),n.quaternion.setFromEuler(Ji),this.dispatchEvent(X_)}function Z_(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(j_),this.isLocked=!0):(this.dispatchEvent(q_),this.isLocked=!1)}function $_(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}function uu(r,e){if(e===df)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Aa||e===Yu){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Aa)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class J_ extends Vn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new iv(t)}),this.register(function(t){return new hv(t)}),this.register(function(t){return new fv(t)}),this.register(function(t){return new pv(t)}),this.register(function(t){return new sv(t)}),this.register(function(t){return new ov(t)}),this.register(function(t){return new av(t)}),this.register(function(t){return new lv(t)}),this.register(function(t){return new nv(t)}),this.register(function(t){return new cv(t)}),this.register(function(t){return new rv(t)}),this.register(function(t){return new dv(t)}),this.register(function(t){return new uv(t)}),this.register(function(t){return new ev(t)}),this.register(function(t){return new mv(t)}),this.register(function(t){return new gv(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=ur.extractUrlBase(e);o=ur.resolveURL(c,this.path)}else o=ur.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new rl(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Pd){try{o[et.KHR_BINARY_GLTF]=new xv(e)}catch(d){i&&i(d);return}s=JSON.parse(o[et.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Lv(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],h=s.extensionsRequired||[];switch(d){case et.KHR_MATERIALS_UNLIT:o[d]=new tv;break;case et.KHR_DRACO_MESH_COMPRESSION:o[d]=new _v(s,this.dracoLoader);break;case et.KHR_TEXTURE_TRANSFORM:o[d]=new vv;break;case et.KHR_MESH_QUANTIZATION:o[d]=new bv;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Q_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const et={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class ev{constructor(e){this.parser=e,this.name=et.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Me(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Ct);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Rd(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new so(u),c.distance=d;break;case"spot":c=new ol(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,ti(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class tv{constructor(){this.name=et.KHR_MATERIALS_UNLIT}getMaterialType(){return ii}extendParams(e,t,n){const i=[];e.color=new Me(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Ct),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,at))}return Promise.all(i)}}class nv{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class iv{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ge(a,a)}return Promise.all(s)}}class rv{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class sv{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Me(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Ct)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,at)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class ov{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class av{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Me().setRGB(a[0],a[1],a[2],Ct),Promise.all(s)}}class lv{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class cv{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Me().setRGB(a[0],a[1],a[2],Ct),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,at)),Promise.all(s)}}class uv{constructor(e){this.parser=e,this.name=et.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class dv{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:jn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class hv{constructor(e){this.parser=e,this.name=et.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class fv{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class pv{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class mv{constructor(e){this.name=et.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,h,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(f),u,d,h,i.mode,i.filter),f})})}else return null}}class gv{constructor(e){this.name=et.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==sn.TRIANGLES&&c.mode!==sn.TRIANGLE_STRIP&&c.mode!==sn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,f=[];for(const g of d){const x=new Ce,m=new C,p=new xt,v=new C(1,1,1),_=new X0(g.geometry,g.material,h);for(let b=0;b<h;b++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,b),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,b),l.SCALE&&v.fromBufferAttribute(l.SCALE,b),_.setMatrixAt(b,x.compose(m,p,v));for(const b in l)if(b==="_COLOR_0"){const L=l[b];_.instanceColor=new Pa(L.array,L.itemSize,L.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&g.geometry.setAttribute(b,l[b]);st.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),f.push(_)}return u.isGroup?(u.clear(),u.add(...f),u):f[0]}))}}const Pd="glTF",kr=12,du={JSON:1313821514,BIN:5130562};class xv{constructor(e){this.name=et.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,kr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Pd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-kr,s=new DataView(e,kr);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===du.JSON){const c=new Uint8Array(e,kr+o,a);this.content=n.decode(c)}else if(l===du.BIN){const c=kr+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class _v{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=et.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=Ua[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=Ua[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[e.attributes[u]],f=dr[h.componentType];c[d]=f.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,h){i.decodeDracoFile(u,function(f){for(const g in f.attributes){const x=f.attributes[g],m=l[g];m!==void 0&&(x.normalized=m)}d(f)},a,c,Ct,h)})})}}class vv{constructor(){this.name=et.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class bv{constructor(){this.name=et.KHR_MESH_QUANTIZATION}}class Id extends ns{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,h=d*d,f=h*d,g=e*c,x=g-c,m=-2*f+3*h,p=f-h,v=1-m,_=p-h+d;for(let b=0;b!==a;b++){const L=o[x+b+a],w=o[x+b+l]*u,A=o[g+b+a],U=o[g+b]*u;s[b]=v*L+_*w+m*A+p*U}return s}}const yv=new xt;class Mv extends Id{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return yv.fromArray(s).normalize().toArray(s),s}}const sn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},dr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},hu={9728:vt,9729:jt,9984:Ta,9985:zu,9986:Xs,9987:Si},fu={33071:qt,33648:$s,10497:li},ua={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ua={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Jn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Sv={CUBICSPLINE:void 0,LINEAR:gr,STEP:qr},da={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ev(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new il({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:zn})),r.DefaultMaterial}function gi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ti(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Tv(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(h)}if(i){const h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(h)}if(s){const h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],h=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=h),r.morphTargetsRelative=!0,r})}function Av(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function wv(r){let e;const t=r.extensions&&r.extensions[et.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ha(t.attributes):e=r.indices+":"+ha(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+ha(r.targets[n]);return e}function ha(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Fa(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Cv(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Rv=new Ce;class Lv{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Q_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new Cd(this.options.manager):this.textureLoader=new R_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new rl(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return gi(s,a,i),ti(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[et.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(ur.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=ua[i.type],a=dr[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Wt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=ua[i.type],c=dr[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let x,m;if(f&&f!==d){const p=Math.floor(h/f),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let _=t.cache.get(v);_||(x=new c(a,p*f,i.count*f/u),_=new xd(x,f/u),t.cache.add(v,_)),m=new Kr(_,l,h%f/u,g)}else a===null?x=new c(i.count*l):x=new c(a,h,i.count*l),m=new Wt(x,l,g);if(i.sparse!==void 0){const p=ua.SCALAR,v=dr[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,L=new v(o[1],_,i.sparse.count*p),w=new c(o[2],b,i.sparse.count*l);a!==null&&(m=new Wt(m.array.slice(),m.itemSize,m.normalized));for(let A=0,U=L.length;A<U;A++){const M=L[A];if(m.setX(M,w[A*l]),l>=2&&m.setY(M,w[A*l+1]),l>=3&&m.setZ(M,w[A*l+2]),l>=4&&m.setW(M,w[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(s.samplers||{})[o.sampler]||{};return u.magFilter=hu[h.magFilter]||jt,u.minFilter=hu[h.minFilter]||Si,u.wrapS=fu[h.wrapS]||li,u.wrapT=fu[h.wrapT]||li,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const h=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(h,f){let g=h;t.isImageBitmapLoader===!0&&(g=function(x){const m=new yt(x);m.needsUpdate=!0,h(m)}),t.load(ur.resolveURL(d,s.path),g,void 0,f)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),d.userData.mimeType=o.mimeType||Cv(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[et.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[et.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[et.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new tl,Qt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new el,Qt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return il}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[et.KHR_MATERIALS_UNLIT]){const d=i[et.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new Me(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],Ct),a.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,at)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Mn);const u=s.alphaMode||da.OPAQUE;if(u===da.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===da.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==ii&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new ge(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==ii&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==ii){const d=s.emissiveFactor;a.emissive=new Me().setRGB(d[0],d[1],d[2],Ct)}return s.emissiveTexture!==void 0&&o!==ii&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,at)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),ti(d,s),t.associations.set(d,{materials:e}),s.extensions&&gi(i,d,s),d})}createUniqueName(e){const t=tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[et.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return pu(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=wv(c),d=i[u];if(d)o.push(d.promise);else{let h;c.extensions&&c.extensions[et.KHR_DRACO_MESH_COMPRESSION]?h=s(c):h=pu(new Ot,c,t),i[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?Ev(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let f=0,g=u.length;f<g;f++){const x=u[f],m=o[f];let p;const v=c[f];if(m.mode===sn.TRIANGLES||m.mode===sn.TRIANGLE_STRIP||m.mode===sn.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new bd(x,v):new Yt(x,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===sn.TRIANGLE_STRIP?p.geometry=uu(p.geometry,Yu):m.mode===sn.TRIANGLE_FAN&&(p.geometry=uu(p.geometry,Aa));else if(m.mode===sn.LINES)p=new j0(x,v);else if(m.mode===sn.LINE_STRIP)p=new _o(x,v);else if(m.mode===sn.LINE_LOOP)p=new q0(x,v);else if(m.mode===sn.POINTS)p=new yd(x,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&Av(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),ti(p,s),m.extensions&&gi(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return s.extensions&&gi(i,d[0],s),d[0];const h=new kn;s.extensions&&gi(i,h,s),t.associations.set(h,{meshes:e});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Pt(Rt.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ts(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ti(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const h=new Ce;s!==null&&h.fromArray(s.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new xo(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,h=i.channels.length;d<h;d++){const f=i.channels[d],g=i.samplers[f.sampler],x=f.target,m=x.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",v)),c.push(g),u.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const h=d[0],f=d[1],g=d[2],x=d[3],m=d[4],p=[];for(let v=0,_=h.length;v<_;v++){const b=h[v],L=f[v],w=g[v],A=x[v],U=m[v];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const M=n._createAnimationTracks(b,L,w,A,U);if(M)for(let T=0;T<M.length;T++)p.push(M[T])}return new br(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(f){f.isSkinnedMesh&&f.bind(h,Rv)});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new ro:c.length>1?u=new kn:c.length===1?u=c[0]:u=new st,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),ti(u,s),s.extensions&&gi(n,u,s),s.matrix!==void 0){const d=new Ce;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new kn;n.name&&(s.name=i.createUniqueName(n.name)),ti(s,n),n.extensions&&gi(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[h,f]of i.associations)(h instanceof Qt||h instanceof yt)&&d.set(h,f);return u.traverse(h=>{const f=i.associations.get(h);f!=null&&d.set(h,f)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Jn[s.path]===Jn.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(a);let c;switch(Jn[s.path]){case Jn.weights:c=Gn;break;case Jn.rotation:c=Hn;break;case Jn.position:case Jn.scale:c=Ti;break;default:switch(n.itemSize){case 1:c=Gn;break;case 2:case 3:default:c=Ti;break}break}const u=i.interpolation!==void 0?Sv[i.interpolation]:gr,d=this._getArrayFromAccessor(n);for(let h=0,f=l.length;h<f;h++){const g=new c(l[h]+"."+Jn[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Fa(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Hn?Mv:Id;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Pv(r,e,t){const n=e.attributes,i=new Xn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),a.normalized){const u=Fa(dr[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new C,l=new C;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const h=t.json.accessors[d.POSITION],f=h.min,g=h.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),h.normalized){const x=Fa(dr[h.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new An;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function pu(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Ua[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return nt.workingColorSpace!==Ct&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${nt.workingColorSpace}" not supported.`),ti(r,e),Pv(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Tv(r,e.targets,t):r})}/*!
fflate - fast JavaScript compression/decompression
<https://101arrowz.github.io/fflate>
Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
version 0.6.9
*/var mu=function(r){return URL.createObjectURL(new Blob([r],{type:"text/javascript"}))};try{URL.revokeObjectURL(mu(""))}catch{mu=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)}}var cn=Uint8Array,si=Uint16Array,Oa=Uint32Array,Dd=new cn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Nd=new cn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Iv=new cn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ud=function(r,e){for(var t=new si(31),n=0;n<31;++n)t[n]=e+=1<<r[n-1];for(var i=new Oa(t[30]),n=1;n<30;++n)for(var s=t[n];s<t[n+1];++s)i[s]=s-t[n]<<5|n;return[t,i]},Fd=Ud(Dd,2),Od=Fd[0],Dv=Fd[1];Od[28]=258,Dv[258]=28;var Nv=Ud(Nd,0),Uv=Nv[0],Ba=new si(32768);for(var ct=0;ct<32768;++ct){var Qn=(ct&43690)>>>1|(ct&21845)<<1;Qn=(Qn&52428)>>>2|(Qn&13107)<<2,Qn=(Qn&61680)>>>4|(Qn&3855)<<4,Ba[ct]=((Qn&65280)>>>8|(Qn&255)<<8)>>>1}var Wr=function(r,e,t){for(var n=r.length,i=0,s=new si(e);i<n;++i)++s[r[i]-1];var o=new si(e);for(i=0;i<e;++i)o[i]=o[i-1]+s[i-1]<<1;var a;if(t){a=new si(1<<e);var l=15-e;for(i=0;i<n;++i)if(r[i])for(var c=i<<4|r[i],u=e-r[i],d=o[r[i]-1]++<<u,h=d|(1<<u)-1;d<=h;++d)a[Ba[d]>>>l]=c}else for(a=new si(n),i=0;i<n;++i)r[i]&&(a[i]=Ba[o[r[i]-1]++]>>>15-r[i]);return a},is=new cn(288);for(var ct=0;ct<144;++ct)is[ct]=8;for(var ct=144;ct<256;++ct)is[ct]=9;for(var ct=256;ct<280;++ct)is[ct]=7;for(var ct=280;ct<288;++ct)is[ct]=8;var Bd=new cn(32);for(var ct=0;ct<32;++ct)Bd[ct]=5;var Fv=Wr(is,9,1),Ov=Wr(Bd,5,1),fa=function(r){for(var e=r[0],t=1;t<r.length;++t)r[t]>e&&(e=r[t]);return e},pn=function(r,e,t){var n=e/8|0;return(r[n]|r[n+1]<<8)>>(e&7)&t},pa=function(r,e){var t=e/8|0;return(r[t]|r[t+1]<<8|r[t+2]<<16)>>(e&7)},Bv=function(r){return(r/8|0)+(r&7&&1)},kv=function(r,e,t){(t==null||t>r.length)&&(t=r.length);var n=new(r instanceof si?si:r instanceof Oa?Oa:cn)(t-e);return n.set(r.subarray(e,t)),n},zv=function(r,e,t){var n=r.length;if(!n||t&&!t.l&&n<5)return e||new cn(0);var i=!e||t,s=!t||t.i;t||(t={}),e||(e=new cn(n*3));var o=function(_e){var le=e.length;if(_e>le){var Ee=new cn(Math.max(le*2,_e));Ee.set(e),e=Ee}},a=t.f||0,l=t.p||0,c=t.b||0,u=t.l,d=t.d,h=t.m,f=t.n,g=n*8;do{if(!u){t.f=a=pn(r,l,1);var x=pn(r,l+1,3);if(l+=3,x)if(x==1)u=Fv,d=Ov,h=9,f=5;else if(x==2){var _=pn(r,l,31)+257,b=pn(r,l+10,15)+4,L=_+pn(r,l+5,31)+1;l+=14;for(var w=new cn(L),A=new cn(19),U=0;U<b;++U)A[Iv[U]]=pn(r,l+U*3,7);l+=b*3;for(var M=fa(A),T=(1<<M)-1,k=Wr(A,M,1),U=0;U<L;){var j=k[pn(r,l,T)];l+=j&15;var m=j>>>4;if(m<16)w[U++]=m;else{var J=0,D=0;for(m==16?(D=3+pn(r,l,3),l+=2,J=w[U-1]):m==17?(D=3+pn(r,l,7),l+=3):m==18&&(D=11+pn(r,l,127),l+=7);D--;)w[U++]=J}}var F=w.subarray(0,_),z=w.subarray(_);h=fa(F),f=fa(z),u=Wr(F,h,1),d=Wr(z,f,1)}else throw"invalid block type";else{var m=Bv(l)+4,p=r[m-4]|r[m-3]<<8,v=m+p;if(v>n){if(s)throw"unexpected EOF";break}i&&o(c+p),e.set(r.subarray(m,v),c),t.b=c+=p,t.p=l=v*8;continue}if(l>g){if(s)throw"unexpected EOF";break}}i&&o(c+131072);for(var q=(1<<h)-1,Y=(1<<f)-1,K=l;;K=l){var J=u[pa(r,l)&q],Z=J>>>4;if(l+=J&15,l>g){if(s)throw"unexpected EOF";break}if(!J)throw"invalid length/literal";if(Z<256)e[c++]=Z;else if(Z==256){K=l,u=null;break}else{var ee=Z-254;if(Z>264){var U=Z-257,ie=Dd[U];ee=pn(r,l,(1<<ie)-1)+Od[U],l+=ie}var H=d[pa(r,l)&Y],$=H>>>4;if(!H)throw"invalid distance";l+=H&15;var z=Uv[$];if($>3){var ie=Nd[$];z+=pa(r,l)&(1<<ie)-1,l+=ie}if(l>g){if(s)throw"unexpected EOF";break}i&&o(c+131072);for(var ce=c+ee;c<ce;c+=4)e[c]=e[c-z],e[c+1]=e[c+1-z],e[c+2]=e[c+2-z],e[c+3]=e[c+3-z];c=ce}}t.l=u,t.p=K,t.b=c,u&&(a=1,t.m=h,t.d=d,t.n=f)}while(!a);return c==e.length?e:kv(e,0,c)},Gv=new cn(0),Hv=function(r){if((r[0]&15)!=8||r[0]>>>4>7||(r[0]<<8|r[1])%31)throw"invalid zlib data";if(r[1]&32)throw"invalid zlib data: preset dictionaries not supported"};function Vv(r,e){return zv((Hv(r),r.subarray(2,-4)),e)}var Wv=typeof TextDecoder<"u"&&new TextDecoder,Xv=0;try{Wv.decode(Gv,{stream:!0}),Xv=1}catch{}function kd(r,e,t){const n=t.length-r-1;if(e>=t[n])return n-1;if(e<=t[r])return r;let i=r,s=n,o=Math.floor((i+s)/2);for(;e<t[o]||e>=t[o+1];)e<t[o]?s=o:i=o,o=Math.floor((i+s)/2);return o}function jv(r,e,t,n){const i=[],s=[],o=[];i[0]=1;for(let a=1;a<=t;++a){s[a]=e-n[r+1-a],o[a]=n[r+a]-e;let l=0;for(let c=0;c<a;++c){const u=o[c+1],d=s[a-c],h=i[c]/(u+d);i[c]=l+u*h,l=d*h}i[a]=l}return i}function qv(r,e,t,n){const i=kd(r,n,e),s=jv(i,n,r,e),o=new it(0,0,0,0);for(let a=0;a<=r;++a){const l=t[i-r+a],c=s[a],u=l.w*c;o.x+=l.x*u,o.y+=l.y*u,o.z+=l.z*u,o.w+=l.w*c}return o}function Yv(r,e,t,n,i){const s=[];for(let d=0;d<=t;++d)s[d]=0;const o=[];for(let d=0;d<=n;++d)o[d]=s.slice(0);const a=[];for(let d=0;d<=t;++d)a[d]=s.slice(0);a[0][0]=1;const l=s.slice(0),c=s.slice(0);for(let d=1;d<=t;++d){l[d]=e-i[r+1-d],c[d]=i[r+d]-e;let h=0;for(let f=0;f<d;++f){const g=c[f+1],x=l[d-f];a[d][f]=g+x;const m=a[f][d-1]/a[d][f];a[f][d]=h+g*m,h=x*m}a[d][d]=h}for(let d=0;d<=t;++d)o[0][d]=a[d][t];for(let d=0;d<=t;++d){let h=0,f=1;const g=[];for(let x=0;x<=t;++x)g[x]=s.slice(0);g[0][0]=1;for(let x=1;x<=n;++x){let m=0;const p=d-x,v=t-x;d>=x&&(g[f][0]=g[h][0]/a[v+1][p],m=g[f][0]*a[p][v]);const _=p>=-1?1:-p,b=d-1<=v?x-1:t-d;for(let w=_;w<=b;++w)g[f][w]=(g[h][w]-g[h][w-1])/a[v+1][p+w],m+=g[f][w]*a[p+w][v];d<=v&&(g[f][x]=-g[h][x-1]/a[v+1][d],m+=g[f][x]*a[d][v]),o[x][d]=m;const L=h;h=f,f=L}}let u=t;for(let d=1;d<=n;++d){for(let h=0;h<=t;++h)o[d][h]*=u;u*=t-d}return o}function Kv(r,e,t,n,i){const s=i<r?i:r,o=[],a=kd(r,n,e),l=Yv(a,n,r,s,e),c=[];for(let u=0;u<t.length;++u){const d=t[u].clone(),h=d.w;d.x*=h,d.y*=h,d.z*=h,c[u]=d}for(let u=0;u<=s;++u){const d=c[a-r].clone().multiplyScalar(l[u][0]);for(let h=1;h<=r;++h)d.add(c[a-r+h].clone().multiplyScalar(l[u][h]));o[u]=d}for(let u=s+1;u<=i+1;++u)o[u]=new it(0,0,0);return o}function Zv(r,e){let t=1;for(let i=2;i<=r;++i)t*=i;let n=1;for(let i=2;i<=e;++i)n*=i;for(let i=2;i<=r-e;++i)n*=i;return t/n}function $v(r){const e=r.length,t=[],n=[];for(let s=0;s<e;++s){const o=r[s];t[s]=new C(o.x,o.y,o.z),n[s]=o.w}const i=[];for(let s=0;s<e;++s){const o=t[s].clone();for(let a=1;a<=s;++a)o.sub(i[s-a].clone().multiplyScalar(Zv(s,a)*n[a]));i[s]=o.divideScalar(n[0])}return i}function Jv(r,e,t,n,i){const s=Kv(r,e,t,n,i);return $v(s)}class Qv extends Y0{constructor(e,t,n,i,s){super(),this.degree=e,this.knots=t,this.controlPoints=[],this.startKnot=i||0,this.endKnot=s||this.knots.length-1;for(let o=0;o<n.length;++o){const a=n[o];this.controlPoints[o]=new it(a.x,a.y,a.z,a.w)}}getPoint(e,t=new C){const n=t,i=this.knots[this.startKnot]+e*(this.knots[this.endKnot]-this.knots[this.startKnot]),s=qv(this.degree,this.knots,this.controlPoints,i);return s.w!==1&&s.divideScalar(s.w),n.set(s.x,s.y,s.z)}getTangent(e,t=new C){const n=t,i=this.knots[0]+e*(this.knots[this.knots.length-1]-this.knots[0]),s=Jv(this.degree,this.knots,this.controlPoints,i,1);return n.copy(s[1]).normalize(),n}}let Ze,gt,Gt;class eb extends Vn{constructor(e){super(e)}load(e,t,n,i){const s=this,o=s.path===""?ur.extractUrlBase(e):s.path,a=new rl(this.manager);a.setPath(s.path),a.setResponseType("arraybuffer"),a.setRequestHeader(s.requestHeader),a.setWithCredentials(s.withCredentials),a.load(e,function(l){try{t(s.parse(l,o))}catch(c){i?i(c):console.error(c),s.manager.itemError(e)}},n,i)}parse(e,t){if(ob(e))Ze=new sb().parse(e);else{const i=Vd(e);if(!ab(i))throw new Error("THREE.FBXLoader: Unknown format.");if(xu(i)<7e3)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+xu(i));Ze=new rb().parse(i)}const n=new Cd(this.manager).setPath(this.resourcePath||t).setCrossOrigin(this.crossOrigin);return new tb(n,this.manager).parse(Ze)}}class tb{constructor(e,t){this.textureLoader=e,this.manager=t}parse(){gt=this.parseConnections();const e=this.parseImages(),t=this.parseTextures(e),n=this.parseMaterials(t),i=this.parseDeformers(),s=new nb().parse(i);return this.parseScene(i,s,n),Gt}parseConnections(){const e=new Map;return"Connections"in Ze&&Ze.Connections.connections.forEach(function(n){const i=n[0],s=n[1],o=n[2];e.has(i)||e.set(i,{parents:[],children:[]});const a={ID:s,relationship:o};e.get(i).parents.push(a),e.has(s)||e.set(s,{parents:[],children:[]});const l={ID:i,relationship:o};e.get(s).children.push(l)}),e}parseImages(){const e={},t={};if("Video"in Ze.Objects){const n=Ze.Objects.Video;for(const i in n){const s=n[i],o=parseInt(i);if(e[o]=s.RelativeFilename||s.Filename,"Content"in s){const a=s.Content instanceof ArrayBuffer&&s.Content.byteLength>0,l=typeof s.Content=="string"&&s.Content!=="";if(a||l){const c=this.parseImage(n[i]);t[s.RelativeFilename||s.Filename]=c}}}}for(const n in e){const i=e[n];t[i]!==void 0?e[n]=t[i]:e[n]=e[n].split("\\").pop()}return e}parseImage(e){const t=e.Content,n=e.RelativeFilename||e.Filename,i=n.slice(n.lastIndexOf(".")+1).toLowerCase();let s;switch(i){case"bmp":s="image/bmp";break;case"jpg":case"jpeg":s="image/jpeg";break;case"png":s="image/png";break;case"tif":s="image/tiff";break;case"tga":this.manager.getHandler(".tga")===null&&console.warn("FBXLoader: TGA loader not found, skipping ",n),s="image/tga";break;default:console.warn('FBXLoader: Image type "'+i+'" is not supported.');return}if(typeof t=="string")return"data:"+s+";base64,"+t;{const o=new Uint8Array(t);return window.URL.createObjectURL(new Blob([o],{type:s}))}}parseTextures(e){const t=new Map;if("Texture"in Ze.Objects){const n=Ze.Objects.Texture;for(const i in n){const s=this.parseTexture(n[i],e);t.set(parseInt(i),s)}}return t}parseTexture(e,t){const n=this.loadTexture(e,t);n.ID=e.id,n.name=e.attrName;const i=e.WrapModeU,s=e.WrapModeV,o=i!==void 0?i.value:0,a=s!==void 0?s.value:0;if(n.wrapS=o===0?li:qt,n.wrapT=a===0?li:qt,"Scaling"in e){const l=e.Scaling.value;n.repeat.x=l[0],n.repeat.y=l[1]}if("Translation"in e){const l=e.Translation.value;n.offset.x=l[0],n.offset.y=l[1]}return n}loadTexture(e,t){let n;const i=this.textureLoader.path,s=gt.get(e.id).children;s!==void 0&&s.length>0&&t[s[0].ID]!==void 0&&(n=t[s[0].ID],(n.indexOf("blob:")===0||n.indexOf("data:")===0)&&this.textureLoader.setPath(void 0));let o;const a=e.FileName.slice(-3).toLowerCase();if(a==="tga"){const l=this.manager.getHandler(".tga");l===null?(console.warn("FBXLoader: TGA loader not found, creating placeholder texture for",e.RelativeFilename),o=new yt):(l.setPath(this.textureLoader.path),o=l.load(n))}else if(a==="dds"){const l=this.manager.getHandler(".dds");l===null?(console.warn("FBXLoader: DDS loader not found, creating placeholder texture for",e.RelativeFilename),o=new yt):(l.setPath(this.textureLoader.path),o=l.load(n))}else a==="psd"?(console.warn("FBXLoader: PSD textures are not supported, creating placeholder texture for",e.RelativeFilename),o=new yt):o=this.textureLoader.load(n);return this.textureLoader.setPath(i),o}parseMaterials(e){const t=new Map;if("Material"in Ze.Objects){const n=Ze.Objects.Material;for(const i in n){const s=this.parseMaterial(n[i],e);s!==null&&t.set(parseInt(i),s)}}return t}parseMaterial(e,t){const n=e.id,i=e.attrName;let s=e.ShadingModel;if(typeof s=="object"&&(s=s.value),!gt.has(n))return null;const o=this.parseParameters(e,t,n);let a;switch(s.toLowerCase()){case"phong":a=new oa;break;case"lambert":a=new f_;break;default:console.warn('THREE.FBXLoader: unknown material type "%s". Defaulting to MeshPhongMaterial.',s),a=new oa;break}return a.setValues(o),a.name=i,a}parseParameters(e,t,n){const i={};e.BumpFactor&&(i.bumpScale=e.BumpFactor.value),e.Diffuse?i.color=new Me().fromArray(e.Diffuse.value).convertSRGBToLinear():e.DiffuseColor&&(e.DiffuseColor.type==="Color"||e.DiffuseColor.type==="ColorRGB")&&(i.color=new Me().fromArray(e.DiffuseColor.value).convertSRGBToLinear()),e.DisplacementFactor&&(i.displacementScale=e.DisplacementFactor.value),e.Emissive?i.emissive=new Me().fromArray(e.Emissive.value).convertSRGBToLinear():e.EmissiveColor&&(e.EmissiveColor.type==="Color"||e.EmissiveColor.type==="ColorRGB")&&(i.emissive=new Me().fromArray(e.EmissiveColor.value).convertSRGBToLinear()),e.EmissiveFactor&&(i.emissiveIntensity=parseFloat(e.EmissiveFactor.value)),e.Opacity&&(i.opacity=parseFloat(e.Opacity.value)),i.opacity<1&&(i.transparent=!0),e.ReflectionFactor&&(i.reflectivity=e.ReflectionFactor.value),e.Shininess&&(i.shininess=e.Shininess.value),e.Specular?i.specular=new Me().fromArray(e.Specular.value).convertSRGBToLinear():e.SpecularColor&&e.SpecularColor.type==="Color"&&(i.specular=new Me().fromArray(e.SpecularColor.value).convertSRGBToLinear());const s=this;return gt.get(n).children.forEach(function(o){const a=o.relationship;switch(a){case"Bump":i.bumpMap=s.getTexture(t,o.ID);break;case"Maya|TEX_ao_map":i.aoMap=s.getTexture(t,o.ID);break;case"DiffuseColor":case"Maya|TEX_color_map":i.map=s.getTexture(t,o.ID),i.map!==void 0&&(i.map.colorSpace=at);break;case"DisplacementColor":i.displacementMap=s.getTexture(t,o.ID);break;case"EmissiveColor":i.emissiveMap=s.getTexture(t,o.ID),i.emissiveMap!==void 0&&(i.emissiveMap.colorSpace=at);break;case"NormalMap":case"Maya|TEX_normal_map":i.normalMap=s.getTexture(t,o.ID);break;case"ReflectionColor":i.envMap=s.getTexture(t,o.ID),i.envMap!==void 0&&(i.envMap.mapping=Zs,i.envMap.colorSpace=at);break;case"SpecularColor":i.specularMap=s.getTexture(t,o.ID),i.specularMap!==void 0&&(i.specularMap.colorSpace=at);break;case"TransparentColor":case"TransparencyFactor":i.alphaMap=s.getTexture(t,o.ID),i.transparent=!0;break;case"AmbientColor":case"ShininessExponent":case"SpecularFactor":case"VectorDisplacementColor":default:console.warn("THREE.FBXLoader: %s map is not supported in three.js, skipping texture.",a);break}}),i}getTexture(e,t){return"LayeredTexture"in Ze.Objects&&t in Ze.Objects.LayeredTexture&&(console.warn("THREE.FBXLoader: layered textures are not supported in three.js. Discarding all but first layer."),t=gt.get(t).children[0].ID),e.get(t)}parseDeformers(){const e={},t={};if("Deformer"in Ze.Objects){const n=Ze.Objects.Deformer;for(const i in n){const s=n[i],o=gt.get(parseInt(i));if(s.attrType==="Skin"){const a=this.parseSkeleton(o,n);a.ID=i,o.parents.length>1&&console.warn("THREE.FBXLoader: skeleton attached to more than one geometry is not supported."),a.geometryID=o.parents[0].ID,e[i]=a}else if(s.attrType==="BlendShape"){const a={id:i};a.rawTargets=this.parseMorphTargets(o,n),a.id=i,o.parents.length>1&&console.warn("THREE.FBXLoader: morph target attached to more than one geometry is not supported."),t[i]=a}}}return{skeletons:e,morphTargets:t}}parseSkeleton(e,t){const n=[];return e.children.forEach(function(i){const s=t[i.ID];if(s.attrType!=="Cluster")return;const o={ID:i.ID,indices:[],weights:[],transformLink:new Ce().fromArray(s.TransformLink.a)};"Indexes"in s&&(o.indices=s.Indexes.a,o.weights=s.Weights.a),n.push(o)}),{rawBones:n,bones:[]}}parseMorphTargets(e,t){const n=[];for(let i=0;i<e.children.length;i++){const s=e.children[i],o=t[s.ID],a={name:o.attrName,initialWeight:o.DeformPercent,id:o.id,fullWeights:o.FullWeights.a};if(o.attrType!=="BlendShapeChannel")return;a.geoID=gt.get(parseInt(s.ID)).children.filter(function(l){return l.relationship===void 0})[0].ID,n.push(a)}return n}parseScene(e,t,n){Gt=new kn;const i=this.parseModels(e.skeletons,t,n),s=Ze.Objects.Model,o=this;i.forEach(function(l){const c=s[l.ID];o.setLookAtProperties(l,c),gt.get(l.ID).parents.forEach(function(d){const h=i.get(d.ID);h!==void 0&&h.add(l)}),l.parent===null&&Gt.add(l)}),this.bindSkeleton(e.skeletons,t,i),this.addGlobalSceneSettings(),Gt.traverse(function(l){if(l.userData.transformData){l.parent&&(l.userData.transformData.parentMatrix=l.parent.matrix,l.userData.transformData.parentMatrixWorld=l.parent.matrixWorld);const c=Gd(l.userData.transformData);l.applyMatrix4(c),l.updateWorldMatrix()}});const a=new ib().parse();Gt.children.length===1&&Gt.children[0].isGroup&&(Gt.children[0].animations=a,Gt=Gt.children[0]),Gt.animations=a}parseModels(e,t,n){const i=new Map,s=Ze.Objects.Model;for(const o in s){const a=parseInt(o),l=s[o],c=gt.get(a);let u=this.buildSkeleton(c,e,a,l.attrName);if(!u){switch(l.attrType){case"Camera":u=this.createCamera(c);break;case"Light":u=this.createLight(c);break;case"Mesh":u=this.createMesh(c,t,n);break;case"NurbsCurve":u=this.createCurve(c,t);break;case"LimbNode":case"Root":u=new ro;break;case"Null":default:u=new kn;break}u.name=l.attrName?tt.sanitizeNodeName(l.attrName):"",u.userData.originalName=l.attrName,u.ID=a}this.getTransformData(u,l),i.set(a,u)}return i}buildSkeleton(e,t,n,i){let s=null;return e.parents.forEach(function(o){for(const a in t){const l=t[a];l.rawBones.forEach(function(c,u){if(c.ID===o.ID){const d=s;s=new ro,s.matrixWorld.copy(c.transformLink),s.name=i?tt.sanitizeNodeName(i):"",s.userData.originalName=i,s.ID=n,l.bones[u]=s,d!==null&&s.add(d)}})}}),s}createCamera(e){let t,n;if(e.children.forEach(function(i){const s=Ze.Objects.NodeAttribute[i.ID];s!==void 0&&(n=s)}),n===void 0)t=new st;else{let i=0;n.CameraProjectionType!==void 0&&n.CameraProjectionType.value===1&&(i=1);let s=1;n.NearPlane!==void 0&&(s=n.NearPlane.value/1e3);let o=1e3;n.FarPlane!==void 0&&(o=n.FarPlane.value/1e3);let a=window.innerWidth,l=window.innerHeight;n.AspectWidth!==void 0&&n.AspectHeight!==void 0&&(a=n.AspectWidth.value,l=n.AspectHeight.value);const c=a/l;let u=45;n.FieldOfView!==void 0&&(u=n.FieldOfView.value);const d=n.FocalLength?n.FocalLength.value:null;switch(i){case 0:t=new Pt(u,c,s,o),d!==null&&t.setFocalLength(d);break;case 1:t=new ts(-a/2,a/2,l/2,-l/2,s,o);break;default:console.warn("THREE.FBXLoader: Unknown camera type "+i+"."),t=new st;break}}return t}createLight(e){let t,n;if(e.children.forEach(function(i){const s=Ze.Objects.NodeAttribute[i.ID];s!==void 0&&(n=s)}),n===void 0)t=new st;else{let i;n.LightType===void 0?i=0:i=n.LightType.value;let s=16777215;n.Color!==void 0&&(s=new Me().fromArray(n.Color.value).convertSRGBToLinear());let o=n.Intensity===void 0?1:n.Intensity.value/100;n.CastLightOnObject!==void 0&&n.CastLightOnObject.value===0&&(o=0);let a=0;n.FarAttenuationEnd!==void 0&&(n.EnableFarAttenuation!==void 0&&n.EnableFarAttenuation.value===0?a=0:a=n.FarAttenuationEnd.value);const l=1;switch(i){case 0:t=new so(s,o,a,l);break;case 1:t=new Rd(s,o);break;case 2:let c=Math.PI/3;n.InnerAngle!==void 0&&(c=Rt.degToRad(n.InnerAngle.value));let u=0;n.OuterAngle!==void 0&&(u=Rt.degToRad(n.OuterAngle.value),u=Math.max(u,1)),t=new ol(s,o,a,c,u,l);break;default:console.warn("THREE.FBXLoader: Unknown light type "+n.LightType.value+", defaulting to a PointLight."),t=new so(s,o);break}n.CastShadows!==void 0&&n.CastShadows.value===1&&(t.castShadow=!0)}return t}createMesh(e,t,n){let i,s=null,o=null;const a=[];return e.children.forEach(function(l){t.has(l.ID)&&(s=t.get(l.ID)),n.has(l.ID)&&a.push(n.get(l.ID))}),a.length>1?o=a:a.length>0?o=a[0]:(o=new oa({name:Vn.DEFAULT_MATERIAL_NAME,color:13421772}),a.push(o)),"color"in s.attributes&&a.forEach(function(l){l.vertexColors=!0}),s.FBX_Deformer?(i=new bd(s,o),i.normalizeSkinWeights()):i=new Yt(s,o),i}createCurve(e,t){const n=e.children.reduce(function(s,o){return t.has(o.ID)&&(s=t.get(o.ID)),s},null),i=new el({name:Vn.DEFAULT_MATERIAL_NAME,color:3342591,linewidth:1});return new _o(n,i)}getTransformData(e,t){const n={};"InheritType"in t&&(n.inheritType=parseInt(t.InheritType.value)),"RotationOrder"in t?n.eulerOrder=Hd(t.RotationOrder.value):n.eulerOrder="ZYX","Lcl_Translation"in t&&(n.translation=t.Lcl_Translation.value),"PreRotation"in t&&(n.preRotation=t.PreRotation.value),"Lcl_Rotation"in t&&(n.rotation=t.Lcl_Rotation.value),"PostRotation"in t&&(n.postRotation=t.PostRotation.value),"Lcl_Scaling"in t&&(n.scale=t.Lcl_Scaling.value),"ScalingOffset"in t&&(n.scalingOffset=t.ScalingOffset.value),"ScalingPivot"in t&&(n.scalingPivot=t.ScalingPivot.value),"RotationOffset"in t&&(n.rotationOffset=t.RotationOffset.value),"RotationPivot"in t&&(n.rotationPivot=t.RotationPivot.value),e.userData.transformData=n}setLookAtProperties(e,t){"LookAtProperty"in t&&gt.get(e.ID).children.forEach(function(i){if(i.relationship==="LookAtProperty"){const s=Ze.Objects.Model[i.ID];if("Lcl_Translation"in s){const o=s.Lcl_Translation.value;e.target!==void 0?(e.target.position.fromArray(o),Gt.add(e.target)):e.lookAt(new C().fromArray(o))}}})}bindSkeleton(e,t,n){const i=this.parsePoseNodes();for(const s in e){const o=e[s];gt.get(parseInt(o.ID)).parents.forEach(function(l){if(t.has(l.ID)){const c=l.ID;gt.get(c).parents.forEach(function(d){n.has(d.ID)&&n.get(d.ID).bind(new xo(o.bones),i[d.ID])})}})}}parsePoseNodes(){const e={};if("Pose"in Ze.Objects){const t=Ze.Objects.Pose;for(const n in t)if(t[n].attrType==="BindPose"&&t[n].NbPoseNodes>0){const i=t[n].PoseNode;Array.isArray(i)?i.forEach(function(s){e[s.Node]=new Ce().fromArray(s.Matrix.a)}):e[i.Node]=new Ce().fromArray(i.Matrix.a)}}return e}addGlobalSceneSettings(){if("GlobalSettings"in Ze){if("AmbientColor"in Ze.GlobalSettings){const e=Ze.GlobalSettings.AmbientColor.value,t=e[0],n=e[1],i=e[2];if(t!==0||n!==0||i!==0){const s=new Me(t,n,i).convertSRGBToLinear();Gt.add(new C_(s,1))}}"UnitScaleFactor"in Ze.GlobalSettings&&(Gt.userData.unitScaleFactor=Ze.GlobalSettings.UnitScaleFactor.value)}}}class nb{constructor(){this.negativeMaterialIndices=!1}parse(e){const t=new Map;if("Geometry"in Ze.Objects){const n=Ze.Objects.Geometry;for(const i in n){const s=gt.get(parseInt(i)),o=this.parseGeometry(s,n[i],e);t.set(parseInt(i),o)}}return this.negativeMaterialIndices===!0&&console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),t}parseGeometry(e,t,n){switch(t.attrType){case"Mesh":return this.parseMeshGeometry(e,t,n);case"NurbsCurve":return this.parseNurbsGeometry(t)}}parseMeshGeometry(e,t,n){const i=n.skeletons,s=[],o=e.parents.map(function(d){return Ze.Objects.Model[d.ID]});if(o.length===0)return;const a=e.children.reduce(function(d,h){return i[h.ID]!==void 0&&(d=i[h.ID]),d},null);e.children.forEach(function(d){n.morphTargets[d.ID]!==void 0&&s.push(n.morphTargets[d.ID])});const l=o[0],c={};"RotationOrder"in l&&(c.eulerOrder=Hd(l.RotationOrder.value)),"InheritType"in l&&(c.inheritType=parseInt(l.InheritType.value)),"GeometricTranslation"in l&&(c.translation=l.GeometricTranslation.value),"GeometricRotation"in l&&(c.rotation=l.GeometricRotation.value),"GeometricScaling"in l&&(c.scale=l.GeometricScaling.value);const u=Gd(c);return this.genGeometry(t,a,s,u)}genGeometry(e,t,n,i){const s=new Ot;e.attrName&&(s.name=e.attrName);const o=this.parseGeoNode(e,t),a=this.genBuffers(o),l=new wt(a.vertex,3);if(l.applyMatrix4(i),s.setAttribute("position",l),a.colors.length>0&&s.setAttribute("color",new wt(a.colors,3)),t&&(s.setAttribute("skinIndex",new Ka(a.weightsIndices,4)),s.setAttribute("skinWeight",new wt(a.vertexWeights,4)),s.FBX_Deformer=t),a.normal.length>0){const c=new $e().getNormalMatrix(i),u=new wt(a.normal,3);u.applyNormalMatrix(c),s.setAttribute("normal",u)}if(a.uvs.forEach(function(c,u){const d=u===0?"uv":`uv${u}`;s.setAttribute(d,new wt(a.uvs[u],2))}),o.material&&o.material.mappingType!=="AllSame"){let c=a.materialIndex[0],u=0;if(a.materialIndex.forEach(function(d,h){d!==c&&(s.addGroup(u,h-u,c),c=d,u=h)}),s.groups.length>0){const d=s.groups[s.groups.length-1],h=d.start+d.count;h!==a.materialIndex.length&&s.addGroup(h,a.materialIndex.length-h,c)}s.groups.length===0&&s.addGroup(0,a.materialIndex.length,a.materialIndex[0])}return this.addMorphTargets(s,e,n,i),s}parseGeoNode(e,t){const n={};if(n.vertexPositions=e.Vertices!==void 0?e.Vertices.a:[],n.vertexIndices=e.PolygonVertexIndex!==void 0?e.PolygonVertexIndex.a:[],e.LayerElementColor&&(n.color=this.parseVertexColors(e.LayerElementColor[0])),e.LayerElementMaterial&&(n.material=this.parseMaterialIndices(e.LayerElementMaterial[0])),e.LayerElementNormal&&(n.normal=this.parseNormals(e.LayerElementNormal[0])),e.LayerElementUV){n.uv=[];let i=0;for(;e.LayerElementUV[i];)e.LayerElementUV[i].UV&&n.uv.push(this.parseUVs(e.LayerElementUV[i])),i++}return n.weightTable={},t!==null&&(n.skeleton=t,t.rawBones.forEach(function(i,s){i.indices.forEach(function(o,a){n.weightTable[o]===void 0&&(n.weightTable[o]=[]),n.weightTable[o].push({id:s,weight:i.weights[a]})})})),n}genBuffers(e){const t={vertex:[],normal:[],colors:[],uvs:[],materialIndex:[],vertexWeights:[],weightsIndices:[]};let n=0,i=0,s=!1,o=[],a=[],l=[],c=[],u=[],d=[];const h=this;return e.vertexIndices.forEach(function(f,g){let x,m=!1;f<0&&(f=f^-1,m=!0);let p=[],v=[];if(o.push(f*3,f*3+1,f*3+2),e.color){const _=Hs(g,n,f,e.color);l.push(_[0],_[1],_[2])}if(e.skeleton){if(e.weightTable[f]!==void 0&&e.weightTable[f].forEach(function(_){v.push(_.weight),p.push(_.id)}),v.length>4){s||(console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),s=!0);const _=[0,0,0,0],b=[0,0,0,0];v.forEach(function(L,w){let A=L,U=p[w];b.forEach(function(M,T,k){if(A>M){k[T]=A,A=M;const j=_[T];_[T]=U,U=j}})}),p=_,v=b}for(;v.length<4;)v.push(0),p.push(0);for(let _=0;_<4;++_)u.push(v[_]),d.push(p[_])}if(e.normal){const _=Hs(g,n,f,e.normal);a.push(_[0],_[1],_[2])}e.material&&e.material.mappingType!=="AllSame"&&(x=Hs(g,n,f,e.material)[0],x<0&&(h.negativeMaterialIndices=!0,x=0)),e.uv&&e.uv.forEach(function(_,b){const L=Hs(g,n,f,_);c[b]===void 0&&(c[b]=[]),c[b].push(L[0]),c[b].push(L[1])}),i++,m&&(h.genFace(t,e,o,x,a,l,c,u,d,i),n++,i=0,o=[],a=[],l=[],c=[],u=[],d=[])}),t}getNormalNewell(e){const t=new C(0,0,0);for(let n=0;n<e.length;n++){const i=e[n],s=e[(n+1)%e.length];t.x+=(i.y-s.y)*(i.z+s.z),t.y+=(i.z-s.z)*(i.x+s.x),t.z+=(i.x-s.x)*(i.y+s.y)}return t.normalize(),t}getNormalTangentAndBitangent(e){const t=this.getNormalNewell(e),i=(Math.abs(t.z)>.5?new C(0,1,0):new C(0,0,1)).cross(t).normalize(),s=t.clone().cross(i).normalize();return{normal:t,tangent:i,bitangent:s}}flattenVertex(e,t,n){return new ge(e.dot(t),e.dot(n))}genFace(e,t,n,i,s,o,a,l,c,u){let d;if(u>3){const h=[];for(let m=0;m<n.length;m+=3)h.push(new C(t.vertexPositions[n[m]],t.vertexPositions[n[m+1]],t.vertexPositions[n[m+2]]));const{tangent:f,bitangent:g}=this.getNormalTangentAndBitangent(h),x=[];for(const m of h)x.push(this.flattenVertex(m,f,g));d=nl.triangulateShape(x,[])}else d=[[0,1,2]];for(const[h,f,g]of d)e.vertex.push(t.vertexPositions[n[h*3]]),e.vertex.push(t.vertexPositions[n[h*3+1]]),e.vertex.push(t.vertexPositions[n[h*3+2]]),e.vertex.push(t.vertexPositions[n[f*3]]),e.vertex.push(t.vertexPositions[n[f*3+1]]),e.vertex.push(t.vertexPositions[n[f*3+2]]),e.vertex.push(t.vertexPositions[n[g*3]]),e.vertex.push(t.vertexPositions[n[g*3+1]]),e.vertex.push(t.vertexPositions[n[g*3+2]]),t.skeleton&&(e.vertexWeights.push(l[h*4]),e.vertexWeights.push(l[h*4+1]),e.vertexWeights.push(l[h*4+2]),e.vertexWeights.push(l[h*4+3]),e.vertexWeights.push(l[f*4]),e.vertexWeights.push(l[f*4+1]),e.vertexWeights.push(l[f*4+2]),e.vertexWeights.push(l[f*4+3]),e.vertexWeights.push(l[g*4]),e.vertexWeights.push(l[g*4+1]),e.vertexWeights.push(l[g*4+2]),e.vertexWeights.push(l[g*4+3]),e.weightsIndices.push(c[h*4]),e.weightsIndices.push(c[h*4+1]),e.weightsIndices.push(c[h*4+2]),e.weightsIndices.push(c[h*4+3]),e.weightsIndices.push(c[f*4]),e.weightsIndices.push(c[f*4+1]),e.weightsIndices.push(c[f*4+2]),e.weightsIndices.push(c[f*4+3]),e.weightsIndices.push(c[g*4]),e.weightsIndices.push(c[g*4+1]),e.weightsIndices.push(c[g*4+2]),e.weightsIndices.push(c[g*4+3])),t.color&&(e.colors.push(o[h*3]),e.colors.push(o[h*3+1]),e.colors.push(o[h*3+2]),e.colors.push(o[f*3]),e.colors.push(o[f*3+1]),e.colors.push(o[f*3+2]),e.colors.push(o[g*3]),e.colors.push(o[g*3+1]),e.colors.push(o[g*3+2])),t.material&&t.material.mappingType!=="AllSame"&&(e.materialIndex.push(i),e.materialIndex.push(i),e.materialIndex.push(i)),t.normal&&(e.normal.push(s[h*3]),e.normal.push(s[h*3+1]),e.normal.push(s[h*3+2]),e.normal.push(s[f*3]),e.normal.push(s[f*3+1]),e.normal.push(s[f*3+2]),e.normal.push(s[g*3]),e.normal.push(s[g*3+1]),e.normal.push(s[g*3+2])),t.uv&&t.uv.forEach(function(x,m){e.uvs[m]===void 0&&(e.uvs[m]=[]),e.uvs[m].push(a[m][h*2]),e.uvs[m].push(a[m][h*2+1]),e.uvs[m].push(a[m][f*2]),e.uvs[m].push(a[m][f*2+1]),e.uvs[m].push(a[m][g*2]),e.uvs[m].push(a[m][g*2+1])})}addMorphTargets(e,t,n,i){if(n.length===0)return;e.morphTargetsRelative=!0,e.morphAttributes.position=[];const s=this;n.forEach(function(o){o.rawTargets.forEach(function(a){const l=Ze.Objects.Geometry[a.geoID];l!==void 0&&s.genMorphGeometry(e,t,l,i,a.name)})})}genMorphGeometry(e,t,n,i,s){const o=t.PolygonVertexIndex!==void 0?t.PolygonVertexIndex.a:[],a=n.Vertices!==void 0?n.Vertices.a:[],l=n.Indexes!==void 0?n.Indexes.a:[],c=e.attributes.position.count*3,u=new Float32Array(c);for(let g=0;g<l.length;g++){const x=l[g]*3;u[x]=a[g*3],u[x+1]=a[g*3+1],u[x+2]=a[g*3+2]}const d={vertexIndices:o,vertexPositions:u},h=this.genBuffers(d),f=new wt(h.vertex,3);f.name=s||n.attrName,f.applyMatrix4(i),e.morphAttributes.position.push(f)}parseNormals(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.Normals.a;let s=[];return n==="IndexToDirect"&&("NormalIndex"in e?s=e.NormalIndex.a:"NormalsIndex"in e&&(s=e.NormalsIndex.a)),{dataSize:3,buffer:i,indices:s,mappingType:t,referenceType:n}}parseUVs(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.UV.a;let s=[];return n==="IndexToDirect"&&(s=e.UVIndex.a),{dataSize:2,buffer:i,indices:s,mappingType:t,referenceType:n}}parseVertexColors(e){const t=e.MappingInformationType,n=e.ReferenceInformationType,i=e.Colors.a;let s=[];n==="IndexToDirect"&&(s=e.ColorIndex.a);for(let o=0,a=new Me;o<i.length;o+=4)a.fromArray(i,o).convertSRGBToLinear().toArray(i,o);return{dataSize:4,buffer:i,indices:s,mappingType:t,referenceType:n}}parseMaterialIndices(e){const t=e.MappingInformationType,n=e.ReferenceInformationType;if(t==="NoMappingInformation")return{dataSize:1,buffer:[0],indices:[0],mappingType:"AllSame",referenceType:n};const i=e.Materials.a,s=[];for(let o=0;o<i.length;++o)s.push(o);return{dataSize:1,buffer:i,indices:s,mappingType:t,referenceType:n}}parseNurbsGeometry(e){const t=parseInt(e.Order);if(isNaN(t))return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s",e.Order,e.id),new Ot;const n=t-1,i=e.KnotVector.a,s=[],o=e.Points.a;for(let d=0,h=o.length;d<h;d+=4)s.push(new it().fromArray(o,d));let a,l;if(e.Form==="Closed")s.push(s[0]);else if(e.Form==="Periodic"){a=n,l=i.length-1-a;for(let d=0;d<n;++d)s.push(s[d])}const u=new Qv(n,i,s,a,l).getPoints(s.length*12);return new Ot().setFromPoints(u)}}class ib{parse(){const e=[],t=this.parseClips();if(t!==void 0)for(const n in t){const i=t[n],s=this.addClip(i);e.push(s)}return e}parseClips(){if(Ze.Objects.AnimationCurve===void 0)return;const e=this.parseAnimationCurveNodes();this.parseAnimationCurves(e);const t=this.parseAnimationLayers(e);return this.parseAnimStacks(t)}parseAnimationCurveNodes(){const e=Ze.Objects.AnimationCurveNode,t=new Map;for(const n in e){const i=e[n];if(i.attrName.match(/S|R|T|DeformPercent/)!==null){const s={id:i.id,attr:i.attrName,curves:{}};t.set(s.id,s)}}return t}parseAnimationCurves(e){const t=Ze.Objects.AnimationCurve;for(const n in t){const i={id:t[n].id,times:t[n].KeyTime.a.map(lb),values:t[n].KeyValueFloat.a},s=gt.get(i.id);if(s!==void 0){const o=s.parents[0].ID,a=s.parents[0].relationship;a.match(/X/)?e.get(o).curves.x=i:a.match(/Y/)?e.get(o).curves.y=i:a.match(/Z/)?e.get(o).curves.z=i:a.match(/DeformPercent/)&&e.has(o)&&(e.get(o).curves.morph=i)}}}parseAnimationLayers(e){const t=Ze.Objects.AnimationLayer,n=new Map;for(const i in t){const s=[],o=gt.get(parseInt(i));o!==void 0&&(o.children.forEach(function(l,c){if(e.has(l.ID)){const u=e.get(l.ID);if(u.curves.x!==void 0||u.curves.y!==void 0||u.curves.z!==void 0){if(s[c]===void 0){const d=gt.get(l.ID).parents.filter(function(h){return h.relationship!==void 0})[0].ID;if(d!==void 0){const h=Ze.Objects.Model[d.toString()];if(h===void 0){console.warn("THREE.FBXLoader: Encountered a unused curve.",l);return}const f={modelName:h.attrName?tt.sanitizeNodeName(h.attrName):"",ID:h.id,initialPosition:[0,0,0],initialRotation:[0,0,0],initialScale:[1,1,1]};Gt.traverse(function(g){g.ID===h.id&&(f.transform=g.matrix,g.userData.transformData&&(f.eulerOrder=g.userData.transformData.eulerOrder))}),f.transform||(f.transform=new Ce),"PreRotation"in h&&(f.preRotation=h.PreRotation.value),"PostRotation"in h&&(f.postRotation=h.PostRotation.value),s[c]=f}}s[c]&&(s[c][u.attr]=u)}else if(u.curves.morph!==void 0){if(s[c]===void 0){const d=gt.get(l.ID).parents.filter(function(p){return p.relationship!==void 0})[0].ID,h=gt.get(d).parents[0].ID,f=gt.get(h).parents[0].ID,g=gt.get(f).parents[0].ID,x=Ze.Objects.Model[g],m={modelName:x.attrName?tt.sanitizeNodeName(x.attrName):"",morphName:Ze.Objects.Deformer[d].attrName};s[c]=m}s[c][u.attr]=u}}}),n.set(parseInt(i),s))}return n}parseAnimStacks(e){const t=Ze.Objects.AnimationStack,n={};for(const i in t){const s=gt.get(parseInt(i)).children;s.length>1&&console.warn("THREE.FBXLoader: Encountered an animation stack with multiple layers, this is currently not supported. Ignoring subsequent layers.");const o=e.get(s[0].ID);n[i]={name:t[i].attrName,layer:o}}return n}addClip(e){let t=[];const n=this;return e.layer.forEach(function(i){t=t.concat(n.generateTracks(i))}),new br(e.name,-1,t)}generateTracks(e){const t=[];let n=new C,i=new C;if(e.transform&&e.transform.decompose(n,new xt,i),n=n.toArray(),i=i.toArray(),e.T!==void 0&&Object.keys(e.T.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.T.curves,n,"position");s!==void 0&&t.push(s)}if(e.R!==void 0&&Object.keys(e.R.curves).length>0){const s=this.generateRotationTrack(e.modelName,e.R.curves,e.preRotation,e.postRotation,e.eulerOrder);s!==void 0&&t.push(s)}if(e.S!==void 0&&Object.keys(e.S.curves).length>0){const s=this.generateVectorTrack(e.modelName,e.S.curves,i,"scale");s!==void 0&&t.push(s)}if(e.DeformPercent!==void 0){const s=this.generateMorphTrack(e);s!==void 0&&t.push(s)}return t}generateVectorTrack(e,t,n,i){const s=this.getTimesForAllAxes(t),o=this.getKeyframeTrackValues(s,t,n);return new Ti(e+"."+i,s,o)}generateRotationTrack(e,t,n,i,s){let o,a;if(t.x!==void 0&&t.y!==void 0&&t.z!==void 0){const d=this.interpolateRotations(t.x,t.y,t.z,s);o=d[0],a=d[1]}n!==void 0&&(n=n.map(Rt.degToRad),n.push(s),n=new bt().fromArray(n),n=new xt().setFromEuler(n)),i!==void 0&&(i=i.map(Rt.degToRad),i.push(s),i=new bt().fromArray(i),i=new xt().setFromEuler(i).invert());const l=new xt,c=new bt,u=[];if(!a||!o)return new Hn(e+".quaternion",[],[]);for(let d=0;d<a.length;d+=3)c.set(a[d],a[d+1],a[d+2],s),l.setFromEuler(c),n!==void 0&&l.premultiply(n),i!==void 0&&l.multiply(i),d>2&&new xt().fromArray(u,(d-3)/3*4).dot(l)<0&&l.set(-l.x,-l.y,-l.z,-l.w),l.toArray(u,d/3*4);return new Hn(e+".quaternion",o,u)}generateMorphTrack(e){const t=e.DeformPercent.curves.morph,n=t.values.map(function(s){return s/100}),i=Gt.getObjectByName(e.modelName).morphTargetDictionary[e.morphName];return new Gn(e.modelName+".morphTargetInfluences["+i+"]",t.times,n)}getTimesForAllAxes(e){let t=[];if(e.x!==void 0&&(t=t.concat(e.x.times)),e.y!==void 0&&(t=t.concat(e.y.times)),e.z!==void 0&&(t=t.concat(e.z.times)),t=t.sort(function(n,i){return n-i}),t.length>1){let n=1,i=t[0];for(let s=1;s<t.length;s++){const o=t[s];o!==i&&(t[n]=o,i=o,n++)}t=t.slice(0,n)}return t}getKeyframeTrackValues(e,t,n){const i=n,s=[];let o=-1,a=-1,l=-1;return e.forEach(function(c){if(t.x&&(o=t.x.times.indexOf(c)),t.y&&(a=t.y.times.indexOf(c)),t.z&&(l=t.z.times.indexOf(c)),o!==-1){const u=t.x.values[o];s.push(u),i[0]=u}else s.push(i[0]);if(a!==-1){const u=t.y.values[a];s.push(u),i[1]=u}else s.push(i[1]);if(l!==-1){const u=t.z.values[l];s.push(u),i[2]=u}else s.push(i[2])}),s}interpolateRotations(e,t,n,i){const s=[],o=[];s.push(e.times[0]),o.push(Rt.degToRad(e.values[0])),o.push(Rt.degToRad(t.values[0])),o.push(Rt.degToRad(n.values[0]));for(let a=1;a<e.values.length;a++){const l=[e.values[a-1],t.values[a-1],n.values[a-1]];if(isNaN(l[0])||isNaN(l[1])||isNaN(l[2]))continue;const c=l.map(Rt.degToRad),u=[e.values[a],t.values[a],n.values[a]];if(isNaN(u[0])||isNaN(u[1])||isNaN(u[2]))continue;const d=u.map(Rt.degToRad),h=[u[0]-l[0],u[1]-l[1],u[2]-l[2]],f=[Math.abs(h[0]),Math.abs(h[1]),Math.abs(h[2])];if(f[0]>=180||f[1]>=180||f[2]>=180){const x=Math.max(...f)/180,m=new bt(...c,i),p=new bt(...d,i),v=new xt().setFromEuler(m),_=new xt().setFromEuler(p);v.dot(_)&&_.set(-_.x,-_.y,-_.z,-_.w);const b=e.times[a-1],L=e.times[a]-b,w=new xt,A=new bt;for(let U=0;U<1;U+=1/x)w.copy(v.clone().slerp(_.clone(),U)),s.push(b+U*L),A.setFromQuaternion(w,i),o.push(A.x),o.push(A.y),o.push(A.z)}else s.push(e.times[a]),o.push(Rt.degToRad(e.values[a])),o.push(Rt.degToRad(t.values[a])),o.push(Rt.degToRad(n.values[a]))}return[s,o]}}class rb{getPrevNode(){return this.nodeStack[this.currentIndent-2]}getCurrentNode(){return this.nodeStack[this.currentIndent-1]}getCurrentProp(){return this.currentProp}pushStack(e){this.nodeStack.push(e),this.currentIndent+=1}popStack(){this.nodeStack.pop(),this.currentIndent-=1}setCurrentProp(e,t){this.currentProp=e,this.currentPropName=t}parse(e){this.currentIndent=0,this.allNodes=new zd,this.nodeStack=[],this.currentProp=[],this.currentPropName="";const t=this,n=e.split(/[\r\n]+/);return n.forEach(function(i,s){const o=i.match(/^[\s\t]*;/),a=i.match(/^[\s\t]*$/);if(o||a)return;const l=i.match("^\\t{"+t.currentIndent+"}(\\w+):(.*){",""),c=i.match("^\\t{"+t.currentIndent+"}(\\w+):[\\s\\t\\r\\n](.*)"),u=i.match("^\\t{"+(t.currentIndent-1)+"}}");l?t.parseNodeBegin(i,l):c?t.parseNodeProperty(i,c,n[++s]):u?t.popStack():i.match(/^[^\s\t}]/)&&t.parseNodePropertyContinued(i)}),this.allNodes}parseNodeBegin(e,t){const n=t[1].trim().replace(/^"/,"").replace(/"$/,""),i=t[2].split(",").map(function(l){return l.trim().replace(/^"/,"").replace(/"$/,"")}),s={name:n},o=this.parseNodeAttr(i),a=this.getCurrentNode();this.currentIndent===0?this.allNodes.add(n,s):n in a?(n==="PoseNode"?a.PoseNode.push(s):a[n].id!==void 0&&(a[n]={},a[n][a[n].id]=a[n]),o.id!==""&&(a[n][o.id]=s)):typeof o.id=="number"?(a[n]={},a[n][o.id]=s):n!=="Properties70"&&(n==="PoseNode"?a[n]=[s]:a[n]=s),typeof o.id=="number"&&(s.id=o.id),o.name!==""&&(s.attrName=o.name),o.type!==""&&(s.attrType=o.type),this.pushStack(s)}parseNodeAttr(e){let t=e[0];e[0]!==""&&(t=parseInt(e[0]),isNaN(t)&&(t=e[0]));let n="",i="";return e.length>1&&(n=e[1].replace(/^(\w+)::/,""),i=e[2]),{id:t,name:n,type:i}}parseNodeProperty(e,t,n){let i=t[1].replace(/^"/,"").replace(/"$/,"").trim(),s=t[2].replace(/^"/,"").replace(/"$/,"").trim();i==="Content"&&s===","&&(s=n.replace(/"/g,"").replace(/,$/,"").trim());const o=this.getCurrentNode();if(o.name==="Properties70"){this.parseNodeSpecialProperty(e,i,s);return}if(i==="C"){const l=s.split(",").slice(1),c=parseInt(l[0]),u=parseInt(l[1]);let d=s.split(",").slice(3);d=d.map(function(h){return h.trim().replace(/^"/,"")}),i="connections",s=[c,u],ub(s,d),o[i]===void 0&&(o[i]=[])}i==="Node"&&(o.id=s),i in o&&Array.isArray(o[i])?o[i].push(s):i!=="a"?o[i]=s:o.a=s,this.setCurrentProp(o,i),i==="a"&&s.slice(-1)!==","&&(o.a=ga(s))}parseNodePropertyContinued(e){const t=this.getCurrentNode();t.a+=e,e.slice(-1)!==","&&(t.a=ga(t.a))}parseNodeSpecialProperty(e,t,n){const i=n.split('",').map(function(u){return u.trim().replace(/^\"/,"").replace(/\s/,"_")}),s=i[0],o=i[1],a=i[2],l=i[3];let c=i[4];switch(o){case"int":case"enum":case"bool":case"ULongLong":case"double":case"Number":case"FieldOfView":c=parseFloat(c);break;case"Color":case"ColorRGB":case"Vector3D":case"Lcl_Translation":case"Lcl_Rotation":case"Lcl_Scaling":c=ga(c);break}this.getPrevNode()[s]={type:o,type2:a,flag:l,value:c},this.setCurrentProp(this.getPrevNode(),s)}}class sb{parse(e){const t=new gu(e);t.skip(23);const n=t.getUint32();if(n<6400)throw new Error("THREE.FBXLoader: FBX version not supported, FileVersion: "+n);const i=new zd;for(;!this.endOfContent(t);){const s=this.parseNode(t,n);s!==null&&i.add(s.name,s)}return i}endOfContent(e){return e.size()%16===0?(e.getOffset()+160+16&-16)>=e.size():e.getOffset()+160+16>=e.size()}parseNode(e,t){const n={},i=t>=7500?e.getUint64():e.getUint32(),s=t>=7500?e.getUint64():e.getUint32();t>=7500?e.getUint64():e.getUint32();const o=e.getUint8(),a=e.getString(o);if(i===0)return null;const l=[];for(let h=0;h<s;h++)l.push(this.parseProperty(e));const c=l.length>0?l[0]:"",u=l.length>1?l[1]:"",d=l.length>2?l[2]:"";for(n.singleProperty=s===1&&e.getOffset()===i;i>e.getOffset();){const h=this.parseNode(e,t);h!==null&&this.parseSubNode(a,n,h)}return n.propertyList=l,typeof c=="number"&&(n.id=c),u!==""&&(n.attrName=u),d!==""&&(n.attrType=d),a!==""&&(n.name=a),n}parseSubNode(e,t,n){if(n.singleProperty===!0){const i=n.propertyList[0];Array.isArray(i)?(t[n.name]=n,n.a=i):t[n.name]=i}else if(e==="Connections"&&n.name==="C"){const i=[];n.propertyList.forEach(function(s,o){o!==0&&i.push(s)}),t.connections===void 0&&(t.connections=[]),t.connections.push(i)}else if(n.name==="Properties70")Object.keys(n).forEach(function(s){t[s]=n[s]});else if(e==="Properties70"&&n.name==="P"){let i=n.propertyList[0],s=n.propertyList[1];const o=n.propertyList[2],a=n.propertyList[3];let l;i.indexOf("Lcl ")===0&&(i=i.replace("Lcl ","Lcl_")),s.indexOf("Lcl ")===0&&(s=s.replace("Lcl ","Lcl_")),s==="Color"||s==="ColorRGB"||s==="Vector"||s==="Vector3D"||s.indexOf("Lcl_")===0?l=[n.propertyList[4],n.propertyList[5],n.propertyList[6]]:l=n.propertyList[4],t[i]={type:s,type2:o,flag:a,value:l}}else t[n.name]===void 0?typeof n.id=="number"?(t[n.name]={},t[n.name][n.id]=n):t[n.name]=n:n.name==="PoseNode"?(Array.isArray(t[n.name])||(t[n.name]=[t[n.name]]),t[n.name].push(n)):t[n.name][n.id]===void 0&&(t[n.name][n.id]=n)}parseProperty(e){const t=e.getString(1);let n;switch(t){case"C":return e.getBoolean();case"D":return e.getFloat64();case"F":return e.getFloat32();case"I":return e.getInt32();case"L":return e.getInt64();case"R":return n=e.getUint32(),e.getArrayBuffer(n);case"S":return n=e.getUint32(),e.getString(n);case"Y":return e.getInt16();case"b":case"c":case"d":case"f":case"i":case"l":const i=e.getUint32(),s=e.getUint32(),o=e.getUint32();if(s===0)switch(t){case"b":case"c":return e.getBooleanArray(i);case"d":return e.getFloat64Array(i);case"f":return e.getFloat32Array(i);case"i":return e.getInt32Array(i);case"l":return e.getInt64Array(i)}const a=Vv(new Uint8Array(e.getArrayBuffer(o))),l=new gu(a.buffer);switch(t){case"b":case"c":return l.getBooleanArray(i);case"d":return l.getFloat64Array(i);case"f":return l.getFloat32Array(i);case"i":return l.getInt32Array(i);case"l":return l.getInt64Array(i)}break;default:throw new Error("THREE.FBXLoader: Unknown property type "+t)}}}class gu{constructor(e,t){this.dv=new DataView(e),this.offset=0,this.littleEndian=t!==void 0?t:!0,this._textDecoder=new TextDecoder}getOffset(){return this.offset}size(){return this.dv.buffer.byteLength}skip(e){this.offset+=e}getBoolean(){return(this.getUint8()&1)===1}getBooleanArray(e){const t=[];for(let n=0;n<e;n++)t.push(this.getBoolean());return t}getUint8(){const e=this.dv.getUint8(this.offset);return this.offset+=1,e}getInt16(){const e=this.dv.getInt16(this.offset,this.littleEndian);return this.offset+=2,e}getInt32(){const e=this.dv.getInt32(this.offset,this.littleEndian);return this.offset+=4,e}getInt32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt32());return t}getUint32(){const e=this.dv.getUint32(this.offset,this.littleEndian);return this.offset+=4,e}getInt64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t&2147483648?(t=~t&4294967295,e=~e&4294967295,e===4294967295&&(t=t+1&4294967295),e=e+1&4294967295,-(t*4294967296+e)):t*4294967296+e}getInt64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getInt64());return t}getUint64(){let e,t;return this.littleEndian?(e=this.getUint32(),t=this.getUint32()):(t=this.getUint32(),e=this.getUint32()),t*4294967296+e}getFloat32(){const e=this.dv.getFloat32(this.offset,this.littleEndian);return this.offset+=4,e}getFloat32Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat32());return t}getFloat64(){const e=this.dv.getFloat64(this.offset,this.littleEndian);return this.offset+=8,e}getFloat64Array(e){const t=[];for(let n=0;n<e;n++)t.push(this.getFloat64());return t}getArrayBuffer(e){const t=this.dv.buffer.slice(this.offset,this.offset+e);return this.offset+=e,t}getString(e){const t=this.offset;let n=new Uint8Array(this.dv.buffer,t,e);this.skip(e);const i=n.indexOf(0);return i>=0&&(n=new Uint8Array(this.dv.buffer,t,i)),this._textDecoder.decode(n)}}class zd{add(e,t){this[e]=t}}function ob(r){const e="Kaydara FBX Binary  \0";return r.byteLength>=e.length&&e===Vd(r,0,e.length)}function ab(r){const e=["K","a","y","d","a","r","a","\\","F","B","X","\\","B","i","n","a","r","y","\\","\\"];let t=0;function n(i){const s=r[i-1];return r=r.slice(t+i),t++,s}for(let i=0;i<e.length;++i)if(n(1)===e[i])return!1;return!0}function xu(r){const e=/FBXVersion: (\d+)/,t=r.match(e);if(t)return parseInt(t[1]);throw new Error("THREE.FBXLoader: Cannot find the version number for the file given.")}function lb(r){return r/46186158e3}const cb=[];function Hs(r,e,t,n){let i;switch(n.mappingType){case"ByPolygonVertex":i=r;break;case"ByPolygon":i=e;break;case"ByVertice":i=t;break;case"AllSame":i=n.indices[0];break;default:console.warn("THREE.FBXLoader: unknown attribute mapping type "+n.mappingType)}n.referenceType==="IndexToDirect"&&(i=n.indices[i]);const s=i*n.dataSize,o=s+n.dataSize;return db(cb,n.buffer,s,o)}const ma=new bt,er=new C;function Gd(r){const e=new Ce,t=new Ce,n=new Ce,i=new Ce,s=new Ce,o=new Ce,a=new Ce,l=new Ce,c=new Ce,u=new Ce,d=new Ce,h=new Ce,f=r.inheritType?r.inheritType:0;if(r.translation&&e.setPosition(er.fromArray(r.translation)),r.preRotation){const T=r.preRotation.map(Rt.degToRad);T.push(r.eulerOrder||bt.DEFAULT_ORDER),t.makeRotationFromEuler(ma.fromArray(T))}if(r.rotation){const T=r.rotation.map(Rt.degToRad);T.push(r.eulerOrder||bt.DEFAULT_ORDER),n.makeRotationFromEuler(ma.fromArray(T))}if(r.postRotation){const T=r.postRotation.map(Rt.degToRad);T.push(r.eulerOrder||bt.DEFAULT_ORDER),i.makeRotationFromEuler(ma.fromArray(T)),i.invert()}r.scale&&s.scale(er.fromArray(r.scale)),r.scalingOffset&&a.setPosition(er.fromArray(r.scalingOffset)),r.scalingPivot&&o.setPosition(er.fromArray(r.scalingPivot)),r.rotationOffset&&l.setPosition(er.fromArray(r.rotationOffset)),r.rotationPivot&&c.setPosition(er.fromArray(r.rotationPivot)),r.parentMatrixWorld&&(d.copy(r.parentMatrix),u.copy(r.parentMatrixWorld));const g=t.clone().multiply(n).multiply(i),x=new Ce;x.extractRotation(u);const m=new Ce;m.copyPosition(u);const p=m.clone().invert().multiply(u),v=x.clone().invert().multiply(p),_=s,b=new Ce;if(f===0)b.copy(x).multiply(g).multiply(v).multiply(_);else if(f===1)b.copy(x).multiply(v).multiply(g).multiply(_);else{const k=new Ce().scale(new C().setFromMatrixScale(d)).clone().invert(),j=v.clone().multiply(k);b.copy(x).multiply(g).multiply(j).multiply(_)}const L=c.clone().invert(),w=o.clone().invert();let A=e.clone().multiply(l).multiply(c).multiply(t).multiply(n).multiply(i).multiply(L).multiply(a).multiply(o).multiply(s).multiply(w);const U=new Ce().copyPosition(A),M=u.clone().multiply(U);return h.copyPosition(M),A=h.clone().multiply(b),A.premultiply(u.invert()),A}function Hd(r){r=r||0;const e=["ZYX","YZX","XZY","ZXY","YXZ","XYZ"];return r===6?(console.warn("THREE.FBXLoader: unsupported Euler Order: Spherical XYZ. Animations and rotations may be incorrect."),e[0]):e[r]}function ga(r){return r.split(",").map(function(t){return parseFloat(t)})}function Vd(r,e,t){return e===void 0&&(e=0),t===void 0&&(t=r.byteLength),new TextDecoder().decode(new Uint8Array(r,e,t))}function ub(r,e){for(let t=0,n=r.length,i=e.length;t<i;t++,n++)r[n]=e[t]}function db(r,e,t,n){for(let i=t,s=0;i<n;i++,s++)r[s]=e[i];return r}function hb(r){const e=new Map,t=new Map,n=r.clone();return Wd(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Wd(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)Wd(r.children[n],e.children[n],t)}const xa={unitScale:1},_u={unitScale:.01},vu={mmaGym:{path:"modelos/Ring.glb"},bodybuilderArena:{path:"modelos/Ring 2.glb"},tysonRing:{path:"modelos/Ring 3.glb"},default:{path:"modelos/Ring.glb"}},bu={mma:{path:"modelos/MMA.fbx",rotation:new bt(0,Math.PI,0)},bodybuilder:{path:"modelos/Bodybuilder.fbx",rotation:new bt(0,Math.PI,0)},tyson:{path:"modelos/Tyson.fbx",rotation:new bt(0,Math.PI,0)},principal:{path:"modelos/Principal.fbx",rotation:new bt(0,Math.PI,0)},dummy:{path:"modelos/Dummy.glb"},bag:{path:"modelos/Punching Bag.fbx",rotation:new bt(-Math.PI/2,0,0)}};function fb(r){return r.isQuaternion===!0}function pb(r,e){e&&(fb(e)?r.quaternion.copy(e):r.rotation.copy(e))}function mb(r,e){const{unitScale:t,rotation:n}=e;t!==void 0&&r.scale.setScalar(t),pb(r,n)}class gb{constructor(e={}){Cr(this,"gltfLoader",new J_);Cr(this,"fbxLoader",new eb);Cr(this,"cache",new Map);this.hooks=e}async loadRing(e){const t=String(e),n=vu[t]??vu.default;return this.load(n.path,{unitScale:xa.unitScale,...n})}async loadFighter(e){const t=String(e),n=bu[t]??bu.tyson,i=n.path.toLowerCase().endsWith(".fbx")?_u:xa;return this.load(n.path,{...i,...n})}async load(e,t={}){if(!this.cache.has(e)){const n=this.getLoaderType(e),i=this.loadWithLoader(e,n).catch(s=>{var o,a;throw this.cache.delete(e),(a=(o=this.hooks).onError)==null||a.call(o,e,s),s});this.cache.set(e,i)}return this.cache.get(e).then(n=>this.cloneAndNormalize(n,e,t))}cloneAndNormalize(e,t,n){const i=this.cloneAsset(e.scene),o=this.getLoaderType(t)==="fbx"?_u:xa;mb(i,{...o,...n});const a=e.animations.map(l=>l.clone());return{scene:i,animations:a}}cloneAsset(e){return hb(e)}loadWithLoader(e,t){const n=t==="gltf"?this.gltfLoader:this.fbxLoader;return new Promise((i,s)=>{n.load(e,o=>{const a=o.scene??o,l=o.animations??[];i({scene:a,animations:l})},o=>{var a,l;o.total>0&&((l=(a=this.hooks).onProgress)==null||l.call(a,e,o.loaded/o.total))},o=>s(o))})}getLoaderType(e){return e.toLowerCase().endsWith(".fbx")?"fbx":"gltf"}}const Xd={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ai{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const xb=new ts(-1,1,1,-1,0,1);class _b extends Ot{constructor(){super(),this.setAttribute("position",new wt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new wt([0,2,0,0,2,0],2))}}const vb=new _b;class yo{constructor(e){this._mesh=new Yt(vb,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,xb)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class bb extends Ai{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Vt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=vr.clone(e.uniforms),this.material=new Vt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new yo(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class yu extends Ai{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class yb extends Ai{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Mb{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ge);this._width=n.width,this._height=n.height,t=new un(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Tn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new bb(Xd),this.copyPass.material.blending=En,this.clock=new Ld}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}yu!==void 0&&(o instanceof yu?n=!0:o instanceof yb&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ge);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Sb extends Ai{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Me}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const Eb={defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`};class Tb extends Ai{constructor(e,t,n){super(),this.scene=e,this.camera=t;const i=n.focus!==void 0?n.focus:1,s=n.aperture!==void 0?n.aperture:.025,o=n.maxblur!==void 0?n.maxblur:1;this.renderTargetDepth=new un(1,1,{minFilter:vt,magFilter:vt,type:Tn}),this.renderTargetDepth.texture.name="BokehPass.depth",this.materialDepth=new md,this.materialDepth.depthPacking=Zu,this.materialDepth.blending=En;const a=Eb,l=vr.clone(a.uniforms);l.tDepth.value=this.renderTargetDepth.texture,l.focus.value=i,l.aspect.value=t.aspect,l.aperture.value=s,l.maxblur.value=o,l.nearClip.value=t.near,l.farClip.value=t.far,this.materialBokeh=new Vt({defines:Object.assign({},a.defines),uniforms:l,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.uniforms=l,this.fsQuad=new yo(this.materialBokeh),this._oldClearColor=new Me}render(e,t,n){this.scene.overrideMaterial=this.materialDepth,e.getClearColor(this._oldClearColor);const i=e.getClearAlpha(),s=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this.renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=n.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this.fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(i),e.autoClear=s}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this.renderTargetDepth.setSize(e,t)}dispose(){this.renderTargetDepth.dispose(),this.materialDepth.dispose(),this.materialBokeh.dispose(),this.fsQuad.dispose()}}const Ab={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class wb extends Ai{constructor(){super();const e=Ab;this.uniforms=vr.clone(e.uniforms),this.material=new h_({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new yo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},nt.getTransfer(this._outputColorSpace)===ot&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Nu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Uu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ou?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Bu&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Cb={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Me(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class yr extends Ai{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ge(e.x,e.y):new ge(256,256),this.clearColor=new Me(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new un(s,o,{type:Tn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const h=new un(s,o,{type:Tn});h.texture.name="UnrealBloomPass.h"+d,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const f=new un(s,o,{type:Tn});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}const a=Cb;this.highPassUniforms=vr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Vt({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new ge(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Xd;this.copyUniforms=vr.clone(u.uniforms),this.blendMaterial=new Vt({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Ys,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Me,this.oldClearAlpha=1,this.basic=new ii,this.fsQuad=new yo(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ge(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=yr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=yr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Vt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ge(.5,.5)},direction:{value:new ge(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Vt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}yr.BlurDirectionX=new ge(1,0);yr.BlurDirectionY=new ge(0,1);const Rb={neon:{focus:8.5,aperture:.03,maxBlur:.015,rendererScale:1.1,bloom:{strength:.95,threshold:.24,radius:.22}},gimnasio:{focus:11,aperture:.02,maxBlur:.008,rendererScale:.95,bloom:{strength:.4,threshold:.3,radius:.15}},mmaGym:{focus:9.5,aperture:.024,maxBlur:.01,rendererScale:1,bloom:{strength:.55,threshold:.28,radius:.18}},ironShow:{focus:10.5,aperture:.018,maxBlur:.009,rendererScale:1.05,bloom:{strength:.8,threshold:.26,radius:.2}},championNight:{focus:8.8,aperture:.032,maxBlur:.016,rendererScale:1.08,bloom:{strength:1.05,threshold:.22,radius:.24}}};let xn=null,Ht=null,Lb=!1;function Pb(r){xn=r}function Ib(){!xn||!Ht||(xn.composer.removePass(Ht),Ht=null)}function Db(r,e){if(!xn)return;if(!r||Lb){Ib();return}const{composer:t,outputPass:n}=xn,i=xn.renderer.getSize(new ge);Ht?(Ht.strength=r.strength,Ht.threshold=r.threshold,Ht.radius=r.radius,Ht.setSize(i.x*e,i.y*e),t.passes.includes(Ht)||(t.removePass(n),t.addPass(Ht),t.addPass(n))):(Ht=new yr(new ge(i.x*e,i.y*e),r.strength,r.radius,r.threshold),t.removePass(n),t.addPass(Ht),t.addPass(n))}function Nb(r){var s;if(!xn)return;const{renderer:e,composer:t}=xn,n=e.getSize(new ge),i=Math.min(window.devicePixelRatio*r,2);e.setPixelRatio(i),(s=t.setPixelRatio)==null||s.call(t,i),t.setSize(n.x*r,n.y*r),Ht==null||Ht.setSize(n.x*r,n.y*r)}function Ub(r){if(!xn)return;const{bokehPass:e}=xn;e.uniforms.focus.value=r.focus,e.uniforms.aperture.value=r.aperture,e.uniforms.maxblur.value=r.maxBlur}function jd(r){if(!xn)return;const e=typeof r=="string"?Rb[r]:r;Ub(e),Nb(e.rendererScale),Db(e.bloom,e.rendererScale)}const ka={ringside:{id:"ringside",label:"Barrera",description:"Altura de cuerdas, primeros planos y sensación de esquina.",position:new C(0,2.6,9.2),lookAt:new C(0,1.8,0),fov:50},cinematic:{id:"cinematic",label:"Cinemática",description:"Ángulo lateral suave que resalta travelling y enfoque selectivo.",position:new C(-2.8,2.9,8.3),lookAt:new C(-.8,1.8,0),fov:48},aerial:{id:"aerial",label:"Aérea",description:"Plano superior con horizonte visible para ubicar el ring completo.",position:new C(.4,7.2,2.2),lookAt:new C(0,1.5,0),fov:54}},oo={cameraPreset:"ringside",cameraSensitivity:1,flashSettings:{frequency:.55,intensity:.8},travelAssist:!0,motionComfort:!1,masterVolume:.8,musicVolume:.75,sfxVolume:.9,highContrast:!1},qd="box9:settings";function Fb(r){return{...oo,...r,flashSettings:{...oo.flashSettings,...(r==null?void 0:r.flashSettings)??{}}}}function Mr(r=localStorage){try{const e=r.getItem(qd);if(!e)return{...oo};const t=JSON.parse(e);return Fb(t)}catch(e){return console.warn("No se pudieron leer las opciones de Box9. Se usarán los valores por defecto.",e),{...oo}}}function vn(r,e=localStorage){try{e.setItem(qd,JSON.stringify(r))}catch(t){console.warn("No se pudieron guardar las opciones de Box9.",t)}}let Fn=null,za=null;function Ob(){if(Fn!=null&&Fn.context)return Fn.context;const r=window.AudioContext||window.webkitAudioContext;if(!r)return null;const e=new r,t=e.createGain(),n=e.createGain(),i=e.createGain();return n.connect(t),i.connect(t),t.connect(e.destination),Fn={context:e,masterGain:t,musicGain:n,sfxGain:i},e}function Bb(){if(!Fn||!za)return;const{masterVolume:r,musicVolume:e,sfxVolume:t}=za;Fn.masterGain.gain.value=r,Fn.musicGain.gain.value=e,Fn.sfxGain.gain.value=t}function kb(r){za={masterVolume:r.masterVolume,musicVolume:r.musicVolume,sfxVolume:r.sfxVolume},Ob(),Bb()}const Xr={mma:{camera:new C(-3.5,2.8,8),lookAt:new C(-1.5,1.8,0),highlight:new C(-1.5,2.5,0)},bodybuilder:{camera:new C(0,3.1,8.5),lookAt:new C(0,1.8,0),highlight:new C(0,2.5,0)},tyson:{camera:new C(3.5,2.8,8),lookAt:new C(1.5,1.8,0),highlight:new C(1.5,2.5,0)},principal:{camera:new C(6,2.8,8.5),lookAt:new C(3.2,1.8,0),highlight:new C(3.2,2.5,0)}},zb={mma:{position:new C(-1.6,0,.8),rotation:new C(0,Math.PI/10,0)},bodybuilder:{position:new C(0,0,.9),rotation:new C(0,0,0)},tyson:{position:new C(1.6,0,.8),rotation:new C(0,-Math.PI/10,0)},principal:{position:new C(3.2,0,.8),rotation:new C(0,-Math.PI/6,0)}},Gb={backgroundColor:"#05070c",focus:10,aperture:.025,maxBlur:.01},hr={mmaGym:"mmaGym",bodybuilderArena:"ironShow",tysonRing:"championNight"},Hb={intro:{...hr},selection:{...hr},free:{...hr}},Vb=["mmaGym","bodybuilderArena","tysonRing"],Wb=["mma","bodybuilder","tyson","principal"];function Xb(r,e={}){const t=Xr[r];if(!t)return null;const n=e.distance??_a.distance,i=e.verticalOffset??_a.verticalOffset,s=e.lookAtLift??_a.lookAtLift,o=t.camera.clone().sub(t.lookAt).normalize(),a=t.lookAt.clone().add(o.multiplyScalar(n)).add(new C(0,i,0)),l=t.lookAt.clone().add(new C(0,s,0));return{camera:a,lookAt:l,highlight:t.highlight.clone()}}const _a={distance:1.35,verticalOffset:-.28,lookAtLift:.12},Yd=6,Kd=.18,Zd={mmaGym:{effectProfile:hr.mmaGym,selectionLight:{color:"#7ad8ff",intensity:1.45},accentLight:{color:"#9ad3ff",intensity:.85,distance:22},particles:{color:"#7ad8ff",size:.1}},bodybuilderArena:{effectProfile:hr.bodybuilderArena,selectionLight:{color:"#ffb55c",intensity:1.5},accentLight:{color:"#ffcf85",intensity:.92,distance:20},particles:{color:"#ffb55c",size:.12}},tysonRing:{effectProfile:hr.tysonRing,selectionLight:{color:"#ff6b81",intensity:1.6},accentLight:{color:"#ff9bad",intensity:1,distance:23},particles:{color:"#ff6b81",size:.11}}},Ga={frequency:.55,intensity:.8};class jb{constructor(e){Cr(this,"flashes",[]);this.scene=e,this.buildPool()}buildPool(){for(let n=0;n<90;n++){const i=Math.random()*Math.PI*2,s=8.5+Math.random()*4.5,o=2+Math.random()*3.2,a=(Math.random()-.5)*1.4,l=new Me("#ffcfa1").multiplyScalar(3.8+Math.random()*1.2),c=new _d({color:l,transparent:!0,opacity:0,depthWrite:!1,blending:Ys,fog:!0,toneMapped:!1}),u=new z0(c);u.position.set(Math.cos(i)*s+a,o,Math.sin(i)*s+a),u.scale.setScalar(.36+Math.random()*.22),u.layers.enable(1),this.scene.add(u),this.flashes.push({sprite:u,strength:0,baseColor:l})}}update(e,t){const n=this.getActivationCount(e,t.frequency);for(let s=0;s<n;s++)this.triggerFlash(t.intensity);const i=6+t.intensity*7;this.flashes.forEach(s=>{if(s.strength<=0)return;s.strength=Math.max(0,s.strength-e*i);const o=s.sprite.material;o.opacity=s.strength})}getActivationCount(e,t){const i=(1.5+t*16)*e,s=Math.floor(i),o=i-s;return s+(Math.random()<o?1:0)}triggerFlash(e){if(!this.flashes.length)return;const t=this.flashes[Math.floor(Math.random()*this.flashes.length)],n=t.sprite.material,i=.35+e*.95+Math.random()*.25;t.strength=Math.min(1.2,i),n.color.copy(t.baseColor).multiplyScalar(1+e*.9),n.opacity=t.strength}}let P=null;const ao=new Set,Sr=new gb({onProgress:(r,e)=>{ao.forEach(t=>{var n;return(n=t.onProgress)==null?void 0:n.call(t,r,e)})},onError:(r,e)=>{ao.forEach(t=>{var n;return(n=t.onError)==null?void 0:n.call(t,r,e)})}});let lo=0,co=0;function rs(r){var n,i;const e=Ft.getState().ring,t=((n=Hb[r])==null?void 0:n[e])??((i=Zd[e])==null?void 0:i.effectProfile);t&&jd(t)}function $d(r,e={}){if(!P)return;const t=Zd[r];if(!t)return;const{updateEffects:n=!0}=e;P.selectionLight&&(P.selectionLight.color.set(t.selectionLight.color),P.selectionLight.intensity=t.selectionLight.intensity);const i=qb();i&&(i.color.set(t.accentLight.color),i.intensity=t.accentLight.intensity,i.distance=t.accentLight.distance);const s=Yb();if(s){const o=s.material;o.color.set(t.particles.color),o.size=t.particles.size}n&&jd(t.effectProfile)}function qb(){if(!P)return null;if(!P.ringAccentLight){const r=new so("#ffffff",0,20,2);r.position.set(0,3.2,0),P.scene.add(r),P.ringAccentLight=r}return P.ringAccentLight}function Yb(){if(!P)return null;if(!P.ringHighlightParticles){const t=new Float32Array(360);for(let o=0;o<120;o++){const a=o/120*Math.PI*2,l=2.8+Math.random()*.6,c=.3+Math.random()*.35;t[o*3]=Math.cos(a)*l,t[o*3+1]=c,t[o*3+2]=Math.sin(a)*l}const n=new Ot;n.setAttribute("position",new wt(t,3));const i=new tl({size:.1,transparent:!0,opacity:.6,depthWrite:!1}),s=new yd(n,i);s.position.set(0,.2,0),P.scene.add(s),P.ringHighlightParticles=s}return P.ringHighlightParticles}function Kb(r){var t;if(!P)return;const e=ka[r]??ka.ringside;P.travelingCamera.position.copy(e.position),P.travelingCamera.lookAt(e.lookAt),P.travelingCamera.fov=e.fov,P.travelingCamera.updateProjectionMatrix(),P.freeCamera.position.copy(e.position),P.freeCamera.lookAt(e.lookAt),P.freeCamera.fov=Math.max(60,e.fov+6),P.freeCamera.updateProjectionMatrix(),(t=P.freeCamControls)==null||t.target.copy(e.lookAt)}function Zb(r){if(!P)return;ah();const e=Math.max(.25,r.cameraSensitivity),t=r.motionComfort?.72:1,n=.9+e*.6;P.freeCamControls&&(P.freeCamControls.rotateSpeed=.85*e,P.freeCamControls.zoomSpeed=.65+e*.45,P.freeCamControls.panSpeed=.75*e,P.freeCamControls.dampingFactor=r.motionComfort?.16:.1),P.pointerLockControls&&"pointerSpeed"in P.pointerLockControls&&(P.pointerLockControls.pointerSpeed=n),P.freeCamMoveSpeed=Yd*e*t,P.comfortMode=r.motionComfort,P.cameraShakeIntensity=Kd*(r.motionComfort?.35:1)*(.6+e*.4)}function Jd(r){P&&(Kb(r.cameraPreset),Zb(r),P.flashSettings={...P.flashSettings,...r.flashSettings},kb(r))}function Mo(){P&&P.animationFrame===null&&(P.clock.start(),P.animationFrame=requestAnimationFrame(Qd))}function $b(){P&&(P.animationFrame!==null&&(cancelAnimationFrame(P.animationFrame),P.animationFrame=null),lh(),P.clock.stop())}function Jb(){if(!P||P.cameraShakeIntensity<=0)return;const r=P.activeCamera;r.position.sub(P.cameraShakeOffset);const e=P.clock.elapsedTime,t=P.cameraShakeIntensity;P.cameraShakeOffset.set(Math.sin(e*3.2)*.04*t,Math.cos(e*2.4)*.03*t,0),r.position.add(P.cameraShakeOffset)}function Qb(r,e){const t=new gd({antialias:!0,alpha:!1});return t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(r.clientWidth,r.clientHeight),t.setClearColor(new Me(e)),r.appendChild(t.domElement),t}function ey(r){const e=new k0,t=new Me(r);return e.background=t,e.fog=new Qa(t.getHex(),8,32),e}function ty(r,e,t){const n=new Pt(60,r,.1,100);n.position.copy(e??new C(6,4,12)),n.lookAt(new C(0,1.5,0));const i=new Pt(75,r,.1,500);return i.position.copy(t??new C(0,2.5,6)),i.lookAt(new C(0,1.5,0)),{travelingCamera:n,freeCamera:i}}function ny(r,e,t,n,i,s){const o=new Mb(r),a=new Sb(e,t),{width:l,height:c}=r.getSize(new ge),u=new Tb(e,t,{focus:n,aperture:i,maxblur:s,width:l,height:c}),d=new wb;return o.addPass(a),o.addPass(u),o.addPass(d),{composer:o,renderPass:a,bokehPass:u,outputPass:d}}function iy(r,e={}){if(P)return P;const t={...Gb,...e},n=ey(t.backgroundColor),i=Qb(r,t.backgroundColor),{travelingCamera:s,freeCamera:o}=ty(r.clientWidth/r.clientHeight,e.travelingStart,e.freeCamStart),{composer:a,renderPass:l,bokehPass:c,outputPass:u}=ny(i,n,s,t.focus,t.aperture,t.maxBlur),d=Mr(),h=()=>qs();window.addEventListener("resize",h);const f=new ol("#7a9bff",1.4,18,Math.PI/6,.4,1.2);f.position.set(0,4,4),f.target.position.set(0,1.5,0),n.add(f),n.add(f.target);const g=new jb(n),x=ry();P={container:r,renderer:i,scene:n,composer:a,renderPass:l,bokehPass:c,outputPass:u,travelingCamera:s,freeCamera:o,freeCamControls:null,pointerLockControls:null,freeCamKeyState:{forward:!1,backward:!1,left:!1,right:!1},freeCamInputHandlers:null,pointerLockClickHandler:null,freeCamMoveSpeed:Yd,activeCamera:s,phase:"intro",selectionTarget:null,animationFrame:null,resizeHandler:h,resizeObserver:null,pendingResize:null,clock:new Ld,cameraShakeIntensity:Kd,cameraShakeOffset:new C,comfortMode:!1,selectionLight:f,audienceFlashSystem:g,flashSettings:{...Ga,...d.flashSettings},ringAccentLight:null,ringHighlightParticles:null,eventHandlers:x,ringModel:null,fighterModel:null,fighterMixer:null,fighterActions:{},activeFighterAction:null},Pb({renderer:i,composer:a,bokehPass:c,outputPass:u}),$d(Ft.getState().ring,{updateEffects:!1}),rs("intro"),Jd(d);const m=new ResizeObserver(()=>qs());m.observe(r),P.resizeObserver=m,qs();const p=Ft.getState(),v=++lo;Sr.loadRing(p.ring).then(b=>{v===lo&&nh(b.scene)}).catch(()=>{}),eh(p.ring);const _=++co;return Sr.loadFighter(p.character).then(b=>{_===co&&ih(b,p.character)}).catch(()=>{}),th(p.character),P}function cl(r){var e;P&&((e=P.activeCamera)==null||e.position.sub(P.cameraShakeOffset),P.cameraShakeOffset.set(0,0,0),P.activeCamera=r,P.renderPass.camera=r,P.bokehPass.camera=r)}function ry(){const e={"box9:start-selection":()=>Ha(),"box9:character-selected":t=>{const n=t.detail;n!=null&&n.character?(Ha(n.character),Mu(n.character)):Mu(Ft.getState().character)},"box9:freecam-change":t=>{const n=t.detail;ly(n==null?void 0:n.enabled)},"box9:chin-preview":t=>{const n=t.detail;cy(n==null?void 0:n.character)},"box9:selection-ended":()=>{var t,n;P&&(P.selectionTarget=null,(t=P.selectionLight)==null||t.position.set(0,4,4),(n=P.selectionLight)==null||n.target.position.set(0,1.5,0))},"box9:animation-toggle":t=>{const n=t.detail;n!=null&&n.active?Mo():$b()},"box9:ring-change":t=>{const n=t.detail,i=(n==null?void 0:n.ring)??Ft.getState().ring;Ft.getState().ring!==i&&Ft.setState({ring:i}),$d(i),rs((P==null?void 0:P.phase)??"intro"),gy(i),eh(i)},"box9:settings-changed":t=>{const n=t.detail;Jd(n??Mr())},"box9:flash-settings":t=>{if(!P)return;const n=t.detail;n!=null&&n.settings&&(P.flashSettings={...P.flashSettings,...n.settings})}};return Object.entries(e).forEach(([t,n])=>{window.addEventListener(t,n)}),e}function qs(){if(!P)return;const{renderer:r,container:e,travelingCamera:t,freeCamera:n,composer:i}=P,s=e.clientWidth,o=e.clientHeight;if(!s||!o){P.pendingResize===null&&(P.pendingResize=requestAnimationFrame(()=>{P&&(P.pendingResize=null,qs())}));return}r.setSize(s,o),t.aspect=s/o,t.updateProjectionMatrix(),n.aspect=s/o,n.updateProjectionMatrix(),i.setSize(s,o)}function Qd(r){var l,c;if(!P)return;const{composer:e,travelingCamera:t,phase:n,clock:i,freeCamControls:s}=P,o=i.getDelta(),a=i.elapsedTime;n==="intro"?(t.position.x=8*Math.cos(a*.25),t.position.z=8*Math.sin(a*.25),t.lookAt(0,1.5,0)):n==="selection"?P.selectionTarget?(t.position.lerp(P.selectionTarget.camera,.08),t.lookAt(P.selectionTarget.lookAt),P.selectionLight&&(P.selectionLight.position.lerp(P.selectionTarget.highlight,.12),P.selectionLight.target.position.lerp(P.selectionTarget.lookAt,.18),P.selectionLight.target.updateMatrixWorld())):(t.position.lerp(new C(0,3.5,8),.02),t.lookAt(0,1.75,0)):n==="free"&&(Ey(o),s==null||s.update(o)),(l=P.fighterMixer)==null||l.update(o),P.ringHighlightParticles&&(P.ringHighlightParticles.rotation.y+=o*.35),(c=P.audienceFlashSystem)==null||c.update(o,P.flashSettings),Jb(),e.render(),P.animationFrame=requestAnimationFrame(Qd)}function sy(r,e={}){const t=iy(r,e);t.phase="intro",cl(t.travelingCamera),rs("intro"),Mo()}function ul(){var r;P&&(P.phase="selection",cl(P.travelingCamera),rs("selection"),P.freeCamControls&&(P.freeCamControls.enabled=!1),lh(),(r=P.pointerLockControls)==null||r.unlock(),Mo(),P.selectionTarget||(P.selectionTarget={camera:Xr.mma.camera.clone(),lookAt:Xr.mma.lookAt.clone(),highlight:Xr.mma.highlight.clone()}))}function oy(){P&&(ah(),P.phase="free",rs("free"),cl(P.freeCamera),P.freeCamControls&&(P.freeCamControls.enabled=!0,P.freeCamControls.update()),Sy(),Mo())}function Ha(r){ul(),r&&dl(r)}function ay(r){const e=uo(r),t=Ft.getState();!t.ringOverride&&t.ring!==e&&(Ft.setState({ring:e,ringOverride:!1}),window.dispatchEvent(new CustomEvent("box9:ring-change",{detail:{ring:e}}))),dy(r),window.dispatchEvent(new CustomEvent("box9:character-confirmed",{detail:{character:r}}))}function ly(r){if(!P)return;r??P.phase!=="free"?oy():ul()}function cy(r){if(!P)return;const e=r??Ft.getState().character,t=Xb(e);t&&(ul(),P.selectionTarget=t,Ft.getState().freeCamera&&Ft.setState({freeCamera:!1}))}function dl(r){if(!P)return;_y(r);const e=Xr[r];P.selectionTarget={camera:e.camera.clone(),lookAt:e.lookAt.clone(),highlight:e.highlight.clone()}}function uy(r){dl(r),hl("idle"),P!=null&&P.selectionLight&&(P.selectionLight.intensity=1.35)}function dy(r){dl(r),hl("pose"),P!=null&&P.selectionLight&&(P.selectionLight.intensity=1.75)}function hy(r,e){return Sr.loadRing(r).then(n=>n.scene).finally(()=>{})}function fy(r,e){return Sr.loadFighter(r).finally(()=>{})}function py(r){return ao.add(r),()=>ao.delete(r)}function my(r){return py(r)}function eh(r){Vb.filter(t=>t!==r).forEach(t=>{Sr.loadRing(t).catch(()=>{})})}function th(r){Wb.filter(t=>t!==r).forEach(t=>{Sr.loadFighter(t).catch(()=>{})})}function gy(r){const e=++lo;hy(r).then(t=>{e===lo&&nh(t)}).catch(()=>{})}function Mu(r){const e=++co;oh(),fy(r).then(t=>{e===co&&ih(t,r)}).catch(()=>{}),th(r)}function nh(r){P&&(sh(P.ringModel),xy(r),P.scene.add(r),P.ringModel=r)}function ih(r,e){if(!P)return;oh(),sh(P.fighterModel);const{scene:t,animations:n}=r;rh(t,e),P.scene.add(t),P.fighterModel=t,My(t,n),hl("idle")}function xy(r){r.position.set(0,0,0)}function _y(r){P!=null&&P.fighterModel&&rh(P.fighterModel,r)}function rh(r,e){const t=zb[e];t&&(r.position.copy(t.position),r.rotation.set(t.rotation.x,t.rotation.y,t.rotation.z))}function sh(r,e=(P==null?void 0:P.scene)??null){!e||!r||(e.remove(r),vy(r))}function vy(r){r.traverse(e=>{var n;const t=e;t.isMesh&&((n=t.geometry)==null||n.dispose(),(Array.isArray(t.material)?t.material:[t.material]).forEach(s=>{var o;s&&(by(s),(o=s.dispose)==null||o.call(s))}))})}function by(r){["map","normalMap","roughnessMap","metalnessMap","aoMap","emissiveMap","lightMap","bumpMap","alphaMap","specularMap","envMap"].forEach(t=>{var i;const n=r==null?void 0:r[t];n&&(Array.isArray(n)?n.forEach(s=>{var o;return(o=s==null?void 0:s.dispose)==null?void 0:o.call(s)}):(i=n.dispose)==null||i.call(n))})}function oh(){var r,e;P&&(Object.values(P.fighterActions).forEach(t=>t==null?void 0:t.stop()),(r=P.fighterMixer)==null||r.stopAllAction(),P.fighterModel&&((e=P.fighterMixer)==null||e.uncacheRoot(P.fighterModel)),P.fighterMixer=null,P.fighterActions={},P.activeFighterAction=null)}function Su(r,e){const t=e.map(n=>n.toLowerCase());return r.find(n=>t.some(i=>n.name.toLowerCase().includes(i)))??null}function yy(){const r=new Gn(".rotation[y]",[0,1.5,3],[-.05,.05,-.05]),e=new Gn(".position[y]",[0,.6,1.2],[0,.08,0]),t=new br("fallbackIdle",3,[r]),n=new br("fallbackPose",1.2,[e]);return{idle:t,pose:n}}function My(r,e){if(!P)return;const t=new H_(r),{idle:n,pose:i}=yy(),s=Su(e,["idle","rest","breath"])??n,o=Su(e,["pose","victory","taunt","intro"])??i;P.fighterMixer=t,P.fighterActions={},P.activeFighterAction=null,s&&(P.fighterActions.idle=t.clipAction(s)),o&&(P.fighterActions.pose=t.clipAction(o))}function hl(r){if(!(P!=null&&P.fighterMixer))return;const e=P.fighterActions[r];e&&(Object.values(P.fighterActions).forEach(t=>{t&&t!==e&&t.stop()}),e.reset().play(),P.activeFighterAction=e)}function ah(){if(P){if(!P.freeCamControls){const r=new W_(P.freeCamera,P.renderer.domElement);r.enableDamping=!0,r.target.set(0,1.5,0),r.enabled=!1,P.freeCamControls=r}if(!P.pointerLockControls){const r=new Y_(P.freeCamera,P.renderer.domElement);r.addEventListener("lock",()=>{P&&P.freeCamControls&&(P.freeCamControls.enabled=!1)}),r.addEventListener("unlock",()=>{P&&(P.freeCamControls&&(P.freeCamControls.enabled=!0),P.freeCamKeyState={forward:!1,backward:!1,left:!1,right:!1})}),P.pointerLockControls=r}}}function Sy(){if(!P||P.freeCamInputHandlers)return;const r=t=>{switch(t.key.toLowerCase()){case"w":P.freeCamKeyState.forward=!0;break;case"s":P.freeCamKeyState.backward=!0;break;case"a":P.freeCamKeyState.left=!0;break;case"d":P.freeCamKeyState.right=!0;break}},e=t=>{switch(t.key.toLowerCase()){case"w":P.freeCamKeyState.forward=!1;break;case"s":P.freeCamKeyState.backward=!1;break;case"a":P.freeCamKeyState.left=!1;break;case"d":P.freeCamKeyState.right=!1;break}};if(window.addEventListener("keydown",r),window.addEventListener("keyup",e),P.freeCamInputHandlers={keydown:r,keyup:e},!P.pointerLockClickHandler){const t=()=>{var n;return(n=P==null?void 0:P.pointerLockControls)==null?void 0:n.lock()};P.renderer.domElement.addEventListener("click",t),P.pointerLockClickHandler=t}}function lh(){var r;P&&(P.freeCamInputHandlers&&(window.removeEventListener("keydown",P.freeCamInputHandlers.keydown),window.removeEventListener("keyup",P.freeCamInputHandlers.keyup),P.freeCamInputHandlers=null),P.pointerLockClickHandler&&(P.renderer.domElement.removeEventListener("click",P.pointerLockClickHandler),P.pointerLockClickHandler=null),(r=P.pointerLockControls)==null||r.unlock(),P.freeCamKeyState={forward:!1,backward:!1,left:!1,right:!1})}function Ey(r){if(!(P!=null&&P.pointerLockControls)||!P.pointerLockControls.isLocked)return;const{freeCamKeyState:e,pointerLockControls:t}=P,i=P.freeCamMoveSpeed*r;e.forward&&t.moveForward(i),e.backward&&t.moveForward(-i),e.left&&t.moveRight(-i),e.right&&t.moveRight(i)}const rn=[{id:"mma",name:"MMA",weight:"84 kg",reach:"193 cm",speed:"Versátil",personality:"Competidor táctico, mezcla derribos con boxeo limpio y lee cada distancia."},{id:"bodybuilder",name:"Bodybuilder",weight:"102 kg",reach:"185 cm",speed:"Potente",personality:"Fuerza bruta y presencia dominante, avanza firme buscando golpes demoledores."},{id:"tyson",name:"Tyson",weight:"97 kg",reach:"180 cm",speed:"Explosiva",personality:"Agresividad pura, combina desplazamientos bajos con ganchos veloces al mentón."},{id:"principal",name:"Principal",weight:"94 kg",reach:"188 cm",speed:"Precisa",personality:"Boxeador técnico de la vieja escuela, mantiene el centro del ring y castiga con combinaciones limpias."}];function ch(r){return rn.find(e=>e.id===r)??rn[0]}function Ty(r=Ft,e={}){let t=rn.findIndex(v=>v.id===r.getState().character);t===-1&&(t=0);let n=null,i=null,s=0,o=0;const a=v=>(v%rn.length+rn.length)%rn.length,l=(v,_="idle")=>{var A,U;const b=r.getState(),L=uo(v),w=Lt(b.progress);return Lu(v,w)?(!b.ringOverride&&b.ring!==L&&(r.setState({ring:L,ringOverride:!1}),window.dispatchEvent(new CustomEvent("box9:ring-change",{detail:{ring:L}}))),t=rn.findIndex(M=>M.id===v),r.setState({character:v}),_==="pose"?(ay(v),(A=e.onConfirmSelection)==null||A.call(e,v)):(uy(v),(U=e.onIdle)==null||U.call(e,v)),!0):(window.dispatchEvent(new CustomEvent("box9:character-locked",{detail:{character:v,reason:ya(v,w)}})),!1)},c=v=>{const _=a(t+v),b=rn[_].id;l(b,"idle")&&(t=_)},u=()=>{const v=rn[t];l(v.id,"pose")&&r.setState({selectionStarted:!1})},d=v=>{const _=r.getState();if(!_.selectionStarted&&(v.key==="Enter"||v.key===" ")){v.preventDefault(),f();return}_.selectionStarted&&(v.key==="ArrowLeft"?(v.preventDefault(),c(-1)):v.key==="ArrowRight"?(v.preventDefault(),c(1)):v.key==="Enter"&&(v.preventDefault(),u()))},h=()=>{var b,L,w,A,U;const v=(b=navigator.getGamepads)==null?void 0:b.call(navigator),_=n!==null?v==null?void 0:v[n]:v==null?void 0:v.find(M=>M);if(_){n=_.index;const M=performance.now(),T=_.axes[0]<-.4||((L=_.buttons[14])==null?void 0:L.pressed),k=_.axes[0]>.4||((w=_.buttons[15])==null?void 0:w.pressed),j=((A=_.buttons[0])==null?void 0:A.pressed)||((U=_.buttons[9])==null?void 0:U.pressed);if(!r.getState().selectionStarted&&j){f(),o=M;return}T&&M-s>220?(c(-1),s=M):k&&M-s>220&&(c(1),s=M),j&&M-o>300&&(u(),o=M)}r.getState().selectionStarted&&(i=requestAnimationFrame(h))},f=()=>{var _;const v=rn[t].id;r.setState({selectionStarted:!0,character:v}),Ha(v),(_=e.onStartSelection)==null||_.call(e,v),l(v,"idle"),i===null&&(i=requestAnimationFrame(h))},g=()=>{f()},x=v=>{const _=v.detail;if(!_)return;l(_.character,"idle")&&(t=rn.findIndex(L=>L.id===_.character))},m=()=>{const v=r.getState(),_=rn.findIndex(b=>b.id===v.character);_!==-1&&(t=_),!v.selectionStarted&&i!==null&&(cancelAnimationFrame(i),i=null)};window.addEventListener("keydown",d),window.addEventListener("box9:start-selection",g),window.addEventListener("box9:character-selected",x);const p=r.subscribe(m);return()=>{window.removeEventListener("keydown",d),window.removeEventListener("box9:start-selection",g),window.removeEventListener("box9:character-selected",x),i!==null&&cancelAnimationFrame(i),p()}}const Ay={title:"Entradas web y bundle",items:[{label:"index.html",detail:"Punto de entrada principal para la app basada en Vite."},{label:"box9.html",detail:"Carga el bundle compilado de BOX9."},{label:"Cyber_boxing.html, Mocap.html, Neon_Fight.html, sacobox5.html, sacobox6.html, sacobox7.html, sacobox8.html",detail:"Páginas HTML adicionales de experiencias o pruebas."},{label:"public/box9.js",detail:"Bundle JavaScript generado por build a partir de `src/box9`."}]},wy={title:"Código fuente de BOX9",items:[{label:"src/box9/index.ts",detail:"Inicialización de la app y arranque de la escena."},{label:"src/box9/scene.ts",detail:"Construcción de la escena 3D y flujos de cámara."},{label:"src/box9/assets.ts",detail:"Gestor de assets que define rings y luchadores."},{label:"src/box9/effects.ts",detail:"Efectos visuales asociados al combate."},{label:"src/box9/state.ts",detail:"Tipos y estado compartido (IDs de luchadores y ring incluidos)."},{label:"src/box9/progression.ts",detail:"Lógica de progresión del combate y rondas."},{label:"src/box9/selection.ts",detail:"Flujo de selección de luchador y entorno."},{label:"src/box9/ui.ts",detail:"Componentes de UI y HUD."}]},Cy={title:"Documentación",items:[{label:"docs/box9/rfc.md",detail:"Especificación funcional de BOX9."},{label:"docs/box9/test-plan.md",detail:"Plan de pruebas asociado a BOX9."},{label:"docs/sacobox7_spec.md",detail:'Especificación para la experiencia "sacobox7".'}]},Ry={title:"Modelos 3D",items:[{label:"modelos/Ring.glb",detail:"Ring/arena GLB."},{label:"modelos/Ring 2.glb",detail:"Ring alternativo GLB."},{label:"modelos/Ring 3.glb",detail:"Ring alternativo GLB."},{label:"modelos/MMA.fbx",detail:"Modelo FBX luchador MMA (rotación PI en Y)."},{label:"modelos/Bodybuilder.fbx",detail:"Modelo FBX Bodybuilder (rotación PI en Y)."},{label:"modelos/Principal.fbx",detail:"Modelo FBX Principal (rotación PI en Y)."},{label:"modelos/Dummy.glb",detail:"Modelo GLB Dummy."},{label:"modelos/Bolsa.glb",detail:"Modelo GLB de bolsa."},{label:"modelos/Tyson.fbx",detail:"Modelo FBX Tyson (rotado PI en Y)."},{label:"modelos/Punching Bag.fbx",detail:"Modelo FBX de punching bag (rotado −PI/2 en X)."},{label:"modelos/Training Dummy.fbx",detail:"Modelo FBX de dummy de entrenamiento."},{label:"modelos/Guantes_Amateur.obj",detail:"Modelo OBJ de guantes amateur."},{label:"modelos/Guantes_PRO/mesh.obj",detail:"Modelo OBJ guantes pro."},{label:"modelos/Guantes_PRO/mesh.mtl",detail:"Materiales MTL guantes pro."},{label:"modelos/Guantes_PRO/mesh.obj.mtl",detail:"Material auxiliar de mapeo MTL."},{label:"modelos/Guantes_PRO/tex_0.jpg",detail:"Textura de guantes pro."},{label:"modelos/Guantes_PRO/tex_1.jpg",detail:"Textura de guantes pro."}]},Ly={title:"Animaciones",items:[{label:"Ataque",detail:"Boxing.fbx, Hook.fbx, Illegal Elbow Punch.fbx, Jab Cross.fbx, Lead Jab.fbx, Punching Bag.fbx"},{label:"Daño",detail:"Big Kidney Hit.fbx, Head Hit.fbx, Light Hit To Head.fbx, Medium Hit To Head.fbx, Reaction.fbx, Receive Uppercut To The Face.fbx, Taking Punch.fbx"},{label:"Caídas",detail:"Convulsing.fbx, Fall Flat.fbx, Fall Over.fbx, Getting Up.fbx, Knocked Down.fbx, Laying.fbx, Livershot Knockdown.fbx, Shoulder Hit And Fall.fbx, Situp To Idle.fbx"},{label:"Defensa",detail:"Dodging.fbx, Left Block.fbx"},{label:"Descanso",detail:"Action Idle To Fight Idle.fbx, Arm Stretching.fbx, Pointing Forward.fbx"},{label:"Movimiento",detail:"Walk back.fbx, Walking.fbx"}]},Py={title:"Texturas",items:[{label:"internal_ground_ao_texture.jpeg",detail:"Suelo/escenario."},{label:"Boxing_Gloves_BUMP.jpg",detail:"Bump de guantes."},{label:"Boxing_Gloves_Leather_Tan.jpg",detail:"Textura de cuero guantes."},{label:"BodyBuilder.jpeg",detail:"Textura de personaje BodyBuilder."},{label:"MMA.jpeg",detail:"Textura de personaje MMA."},{label:"Tyson.jpeg",detail:"Textura de personaje Tyson."},{label:"Training Dummy_albedo.jpeg",detail:"Albedo de dummy."},{label:"Training Dummy_albedo.jpg",detail:"Albedo de dummy (variante)."},{label:"Training Dummy_AO.jpeg",detail:"Ambient occlusion dummy."},{label:"Training Dummy_AO.jpg",detail:"Ambient occlusion dummy (variante)."},{label:"Training Dummy_metallic.jpeg",detail:"Mapa metallic dummy."},{label:"Training Dummy_metallic.jpg",detail:"Mapa metallic dummy (variante)."},{label:"Training Dummy_normal.png",detail:"Normal map dummy."},{label:"Training Dummy_roughness.jpeg",detail:"Roughness dummy."},{label:"Training Dummy_roughness.jpg",detail:"Roughness dummy (variante)."}]},Iy={title:"Sonidos",items:[{label:"Golpes",detail:"golpe_1.mp3, golpe_2.mp3, golpe_3.mp3, golpe_4.mp3, golpe_5.mp3, golpe_7.mp3, golpe_8.mp3, golpe_9.mp3, golpe_10.mp3"},{label:"Efectos ambientales",detail:"campana.mp3, cuenta_atras.wav, impacto_grave.wav, respira.wav"},{label:"Público",detail:"publico_intro.wav, publico_enojado.wav, publico_victoria.wav"},{label:"Voces/gritos",detail:"grito_1.wav, grito_2.wav, grito_3.wav, hombre_grita.wav"}]},Dy={title:"Mapeo del gestor de assets",items:[{label:"Ring por defecto",detail:"mmaGym → modelos/Ring.glb; bodybuilderArena → modelos/Ring 2.glb; tysonRing → modelos/Ring 3.glb"},{label:"Luchadores",detail:"mma → modelos/MMA.fbx (PI en Y); bodybuilder → modelos/Bodybuilder.fbx (PI en Y); tyson → modelos/Tyson.fbx (PI en Y); principal → modelos/Principal.fbx (PI en Y); dummy → modelos/Dummy.glb; bag → modelos/Punching Bag.fbx (-PI/2 en X)"},{label:"Escalado",detail:"GLB escala 1; FBX escala 0.01 con clonación de mallas esqueléticas."}]},Ny=[Ay,wy,Cy,Ry,Ly,Py,Iy,Dy],Uy=[{id:"seleccion",title:"Modo campaña",description:"Elige rival, ring y activa el travelling guiado del combate.",hint:"Disponible siempre"},{id:"bolsa",title:"Bolsa de golpeo",description:"Monta la bolsa de boxeo para calentar y practicar combinaciones.",hint:"Perfecto para probar animaciones"},{id:"dummy",title:"Dummy secreto",description:"Sparring de precisión para guantes negros/dorados y rutas secretas.",hint:"Requiere desbloquear el set secreto"}];function Fy(){window.dispatchEvent(new CustomEvent("box9:open-gloves"))}function Oy(r){window.dispatchEvent(new CustomEvent("box9:mode-selected",{detail:{mode:r}}))}function By(r,e){const t=document.createElement("div");t.className="box9-mode-overlay";const n=document.createElement("div");n.className="box9-mode-layout";const i=document.createElement("div");i.className="box9-mode-header";const s=document.createElement("h1");s.textContent="Neon Boxing · Modos";const o=document.createElement("p");o.textContent="Elige cómo quieres entrar: campaña, bolsa o el dummy secreto.",o.className="box9-mode-subtitle",i.append(s,o);const a=document.createElement("div");a.className="box9-mode-grid";const l=new Map,c=new Map;Uy.forEach(p=>{const v=document.createElement("article");v.className="box9-mode-card";const _=document.createElement("h2");_.textContent=p.title;const b=document.createElement("p");b.textContent=p.description,b.className="box9-mode-description";const L=document.createElement("div");L.className="box9-mode-hint",L.textContent=p.hint;const w=document.createElement("span");w.className="box9-mode-lock",w.textContent="Bloqueado";const A=document.createElement("div");A.className="box9-mode-actions";const U=document.createElement("button");U.className="box9-button",U.textContent=p.id==="seleccion"?"Entrar al ring":"Activar modo",U.addEventListener("click",()=>{const M=Lt(r.getState().progress);p.id==="dummy"&&!M.unlocks.secreto||(Oy(p.id),e(p.id))}),A.appendChild(U),v.append(_,b,L,A,w),a.appendChild(v),l.set(p.id,U),c.set(p.id,v)});const u=document.createElement("aside");u.className="box9-mode-sidebar";const d=document.createElement("h3");d.textContent="Progresión";const h=document.createElement("p");h.className="box9-mode-meta";const f=document.createElement("strong");f.className="box9-mode-meta-value",h.append("Guante activo: ",f);const g=document.createElement("p");g.className="box9-mode-milestone";const x=document.createElement("button");x.className="box9-button box9-ghost",x.textContent="Ver guantes",x.addEventListener("click",()=>Fy()),u.append(d,h,g,x),n.append(i,a,u),t.appendChild(n);const m=p=>{const v=c.get("dummy"),_=l.get("dummy"),b=!p.unlocks.secreto;v&&_&&(v.classList.toggle("locked",b),_.disabled=b,_.textContent=b?"Bloqueado":"Probar dummy"),f.textContent=jr(p.activeGlove),g.textContent=Ws(p)};return m(Lt(r.getState().progress)),{overlay:t,update:m}}const Va={mmaGym:"Gimnasio MMA",bodybuilderArena:"Arena Bodybuilder",tysonRing:"Ring Tyson"},ky={mmaGym:"Octágono cerrado, rejas húmedas y presión constante cuerpo a cuerpo.",bodybuilderArena:"Arena luminosa con cadenas doradas, público cercano y golpes pesados.",tysonRing:"Ring oscuro con focos fríos, cuerdas tensas y ritmo agresivo a corta distancia."},va={mma:{href:"box10.html",label:"BOX 10 · MMA Sparring",description:"Octágono húmedo con clinch, sprawl y cámara pegada a las jaulas."},bodybuilder:{href:"box11.html",label:"BOX 11 · Golden Pump",description:"Sesión de hipertrofia con luz cálida, cadenas y repeticiones al fallo."},tyson:{href:"box12.html",label:"BOX 12 · Tyson POV",description:"POV pesado inspirado en Tyson con sombras, uppercuts y respiración cruda."},principal:{href:"box13.html",label:"BOX 13 · Bolsa Tyson",description:"Warmup guiado en saco con marcador simple y Tyson liderando el ritmo."}},zy={mma:"MMA",bodybuilder:"Bodybuilder",tyson:"Tyson",principal:"Principal"},Gy={mma:'MMA baja la guardia y asiente: "Buen timing, la jaula te espera cuando quieras."',bodybuilder:'El Bodybuilder respira hondo: "Ok, hoy fuiste más rápido. Mañana nos vemos en la banca."',tyson:'Tyson suelta una media sonrisa: "Aguantaste mi fuego. Sigue puliendo esa defensa."',principal:'El principal levanta las manos: "Clase suspendida. Has ganado esta ronda."'};function kt(r,e){window.dispatchEvent(new CustomEvent(`box9:${r}`,{detail:e}))}function Hy(){const r=document.createElement("style");r.textContent=`
    .box9-ui { position: absolute; inset: 0; pointer-events: none; font-family: 'Inter', system-ui, sans-serif; color: #e9ecf4; }
    .box9-high-contrast .box9-ui { color: #f9fbff; }
    .box9-high-contrast .box9-mode-overlay, .box9-high-contrast .box9-status, .box9-high-contrast .box9-option-row { background: rgba(0,0,0,0.72); border-color: rgba(255,255,255,0.25); }
    .box9-high-contrast .box9-button { box-shadow: 0 0 0 2px rgba(255,255,255,0.35); border-color: rgba(255,255,255,0.6); }
    .box9-mode-overlay { position: absolute; inset: 0; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent), #030508; display: flex; align-items: center; justify-content: center; pointer-events: auto; padding: 18px; }
    .box9-mode-layout { background: rgba(5,7,12,0.82); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px; box-shadow: 0 18px 60px rgba(0,0,0,0.42); width: min(1080px, 100%); display: grid; grid-template-columns: minmax(0, 2fr) minmax(280px, 340px); gap: 14px; }
    .box9-mode-header { grid-column: 1 / -1; display: grid; gap: 6px; }
    .box9-mode-header h1 { margin: 0; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 800; color: #f6f7fb; }
    .box9-mode-subtitle { margin: 4px 0 0; color: #b4bed4; }
    .box9-mode-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; align-self: center; }
    .box9-mode-card { position: relative; border: 1px solid rgba(255,255,255,0.1); background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(122,155,255,0.08)); border-radius: 12px; padding: 14px; display: grid; gap: 8px; min-height: 200px; box-shadow: 0 12px 40px rgba(0,0,0,0.38); }
    .box9-mode-card.locked { opacity: 0.6; border-style: dashed; }
    .box9-mode-card h2 { margin: 0; font-size: 16px; letter-spacing: 0.06em; text-transform: uppercase; }
    .box9-mode-description { margin: 0; color: #cbd3e8; line-height: 1.5; }
    .box9-mode-hint { color: #9aa3ba; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 700; }
    .box9-mode-actions { display: flex; justify-content: flex-end; margin-top: auto; }
    .box9-mode-card .box9-button { width: 100%; }
    .box9-mode-lock { position: absolute; top: 12px; right: 12px; padding: 6px 10px; border-radius: 999px; border: 1px solid rgba(255,107,129,0.6); background: rgba(255,107,129,0.18); color: #ffd4dc; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 800; font-size: 11px; display: none; }
    .box9-mode-card.locked .box9-mode-lock { display: inline-flex; align-items: center; gap: 6px; }
    .box9-mode-sidebar { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 14px; display: grid; gap: 10px; align-self: stretch; box-shadow: 0 12px 36px rgba(0,0,0,0.32); }
    .box9-mode-sidebar h3 { margin: 0; letter-spacing: 0.06em; text-transform: uppercase; color: #e9ecf4; }
    .box9-mode-meta { margin: 0; color: #cbd3e8; line-height: 1.5; }
    .box9-mode-meta-value { color: #f6f7fb; }
    .box9-mode-milestone { margin: 0; color: #dce2f5; line-height: 1.55; font-size: 14px; }
    .box9-ghost { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.18); color: #e9ecf4; box-shadow: none; }
    .box9-button:disabled { opacity: 0.55; cursor: not-allowed; box-shadow: none; }
    .box9-button { border: 1px solid #3f5cff; background: linear-gradient(135deg, #3f5cff, #7a9bff); color: #fff; border-radius: 10px; padding: 10px 16px; font-weight: 700; cursor: pointer; box-shadow: 0 10px 30px rgba(63, 92, 255, 0.3); transition: transform 120ms ease, box-shadow 120ms ease; }
    .box9-button:hover { transform: translateY(-1px); box-shadow: 0 14px 40px rgba(63, 92, 255, 0.35); }
    .box9-hud { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: space-between; pointer-events: none; padding: 16px; }
    .box9-row { display: flex; align-items: center; gap: 8px; }
    .box9-topbar { display: flex; justify-content: space-between; align-items: center; pointer-events: auto; }
    .box9-chip { border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); border-radius: 999px; padding: 8px 12px; cursor: pointer; transition: background 120ms ease, border-color 120ms ease; }
    .box9-chip.active { background: rgba(63, 92, 255, 0.18); border-color: #7a9bff; color: #fff; }
    .box9-chip.disabled { opacity: 0.55; cursor: not-allowed; border-style: dashed; }
    .box9-chip-label { font-weight: 700; font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; }
    .box9-status { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 10px 12px; display: flex; flex-direction: column; gap: 6px; pointer-events: auto; min-width: 220px; }
    .box9-status small { color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
    .box9-status strong { color: #f6f7fb; }
    .box9-progress-note { color: #b4bed4; font-size: 13px; line-height: 1.4; }
    .box9-warning { position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%); background: rgba(255, 107, 129, 0.16); border: 1px solid rgba(255, 107, 129, 0.45); color: #ffd4dc; padding: 10px 14px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); pointer-events: none; opacity: 0; transition: opacity 160ms ease; max-width: 520px; text-align: center; }
    .box9-dialogue { position: absolute; left: 50%; bottom: 74px; transform: translateX(-50%); background: rgba(34, 197, 94, 0.14); border: 1px solid rgba(34, 197, 94, 0.4); color: #d7ffe6; padding: 12px 16px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); pointer-events: none; opacity: 0; transition: opacity 160ms ease; max-width: 640px; display: grid; gap: 4px; text-align: center; backdrop-filter: blur(6px); }
    .box9-dialogue strong { letter-spacing: 0.06em; text-transform: uppercase; font-size: 12px; }
    .box9-dialogue.visible { opacity: 1; }
    .box9-cinematic { position: absolute; inset: 0; display: none; align-items: center; justify-content: center; padding: 18px; background: radial-gradient(circle at 50% 40%, rgba(122,155,255,0.12), rgba(3,5,8,0.9)); pointer-events: none; }
    .box9-cinematic.visible { display: flex; animation: box9CinematicFade 320ms ease; pointer-events: auto; }
    .box9-cinematic-panel { max-width: 520px; background: linear-gradient(135deg, rgba(7,10,18,0.92), rgba(10,14,24,0.95)); border: 1px solid rgba(122,155,255,0.45); border-radius: 16px; padding: 18px 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 60px rgba(122,155,255,0.2); display: grid; gap: 10px; text-align: center; }
    .box9-cinematic-badge { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(84,255,191,0.5); color: #c7ffe8; background: rgba(84,255,191,0.12); letter-spacing: 0.08em; font-weight: 800; text-transform: uppercase; }
    .box9-cinematic h3 { margin: 0; letter-spacing: 0.08em; text-transform: uppercase; color: #e9ecf4; }
    .box9-cinematic p { margin: 0; color: #dce2f5; line-height: 1.5; }
    .box9-cinematic .box9-button { justify-self: center; min-width: 180px; }
    @keyframes box9CinematicFade { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    .box9-fighter-card { background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 14px 16px; display: grid; gap: 8px; max-width: 320px; pointer-events: auto; box-shadow: 0 18px 50px rgba(0,0,0,0.45); }
    .box9-fighter-name { margin: 0; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 800; color: #e9ecf4; }
    .box9-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .box9-stat { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 10px; display: flex; flex-direction: column; gap: 4px; }
    .box9-stat small { color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; }
    .box9-stat strong { color: #f6f7fb; }
    .box9-fighter-personality { margin: 0; color: #b4bed4; line-height: 1.5; }
    .box9-fighter-meta { display: grid; gap: 6px; margin-top: 2px; }
    .box9-meta-item { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 10px; }
    .box9-meta-label { display: block; color: #9aa3ba; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; font-size: 11px; margin-bottom: 2px; }
    .box9-meta-copy { margin: 0; color: #cbd3e8; line-height: 1.45; }
    .box9-gym-panel { background: rgba(0,0,0,0.32); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 12px 14px; display: grid; gap: 8px; pointer-events: auto; box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
    .box9-gym-panel h4 { margin: 0; letter-spacing: 0.06em; text-transform: uppercase; color: #e9ecf4; font-size: 13px; }
    .box9-gym-panel p { margin: 0; color: #cbd3e8; line-height: 1.4; font-size: 13px; }
    .box9-gym-actions { display: flex; flex-wrap: wrap; gap: 8px; }
    .box9-gym-actions .box9-button { flex: 1; min-width: 180px; }
    .box9-gym-embed { display: none; border: 1px solid rgba(122,155,255,0.35); border-radius: 12px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.35); }
    .box9-gym-embed iframe { width: 100%; height: 320px; border: 0; background: #05070c; }
    .box9-modal-backdrop { position: absolute; inset: 0; background: rgba(3,5,8,0.65); display: none; align-items: center; justify-content: center; pointer-events: auto; }
    .box9-modal { background: #0c111d; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px; width: min(420px, 90vw); box-shadow: 0 18px 80px rgba(0,0,0,0.45); }
    .box9-modal h2 { margin: 0 0 12px; letter-spacing: 0.06em; text-transform: uppercase; }
    .box9-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
    .box9-field label { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #9aa3ba; font-weight: 700; }
    .box9-field select, .box9-field input[type="checkbox"] { padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); color: #fff; }
    .box9-modal-actions { display: flex; justify-content: flex-end; gap: 8px; }
    .box9-secondary { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: #e9ecf4; }
    .box9-options-backdrop { position: fixed; inset: 0; background: rgba(3,5,8,0.75); display: none; align-items: center; justify-content: center; pointer-events: auto; z-index: 20; }
    .box9-options-backdrop.visible { display: flex; }
    .box9-options-modal { background: linear-gradient(135deg, rgba(7,10,18,0.95), rgba(8,12,20,0.9)); border: 1px solid rgba(255,255,255,0.14); border-radius: 16px; padding: 18px; width: min(540px, 92vw); box-shadow: 0 20px 80px rgba(0,0,0,0.6); display: grid; gap: 12px; }
    .box9-option-intro { margin: 0; color: #cbd3e8; line-height: 1.5; }
    .box9-options-content { display: grid; gap: 12px; }
    .box9-option-row { display: flex; gap: 12px; align-items: center; justify-content: space-between; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); border-radius: 12px; padding: 12px 14px; }
    .box9-option-label { display: grid; gap: 4px; max-width: 60%; }
    .box9-option-title { font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: #e9ecf4; }
    .box9-option-description { margin: 0; color: #b4bed4; line-height: 1.45; }
    .box9-option-control { display: flex; justify-content: flex-end; flex: 1; }
    .box9-toggle { position: relative; display: inline-flex; width: 54px; height: 30px; border-radius: 999px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); cursor: pointer; transition: background 120ms ease, border-color 120ms ease; }
    .box9-toggle input { opacity: 0; width: 0; height: 0; }
    .box9-toggle-slider { position: absolute; inset: 3px; background: linear-gradient(135deg, #4b5563, #1f2937); border-radius: 999px; transition: transform 120ms ease, background 120ms ease; box-shadow: 0 6px 16px rgba(0,0,0,0.35); }
    .box9-toggle input:checked + .box9-toggle-slider { transform: translateX(22px); background: linear-gradient(135deg, #3f5cff, #7a9bff); }
    .box9-radio-list { display: grid; gap: 10px; flex: 1; }
    .box9-radio { display: grid; grid-template-columns: auto 1fr; gap: 6px 10px; align-items: center; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); }
    .box9-radio input { accent-color: #7a9bff; }
    .box9-radio strong { letter-spacing: 0.04em; text-transform: uppercase; color: #e9ecf4; }
    .box9-radio span { color: #cbd3e8; }
    .box9-slider { display: flex; align-items: center; gap: 10px; flex: 1; }
    .box9-slider input { flex: 1; accent-color: #7a9bff; }
    .box9-slider-value { padding: 6px 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.16); background: rgba(255,255,255,0.05); color: #e9ecf4; font-weight: 700; min-width: 64px; text-align: center; }
    .box9-options-footer { display: flex; justify-content: flex-end; }
    .box9-loading { position: absolute; inset: 0; display: none; align-items: center; justify-content: center; pointer-events: none; }
    .box9-loading-panel { background: rgba(5, 7, 12, 0.85); border: 1px solid rgba(122,155,255,0.35); border-radius: 12px; padding: 14px 16px; display: flex; flex-direction: column; gap: 8px; min-width: 240px; box-shadow: 0 10px 36px rgba(0,0,0,0.4); pointer-events: auto; }
    .box9-loading strong { letter-spacing: 0.06em; text-transform: uppercase; font-size: 12px; color: #e9ecf4; }
    .box9-progress { height: 8px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; border: 1px solid rgba(255,255,255,0.12); }
    .box9-progress-bar { height: 100%; width: 0; background: linear-gradient(135deg, #3f5cff, #7a9bff); transition: width 140ms ease; }
    .box9-error { color: #ffb7b7; font-size: 12px; }
    .box9-asset-list { display: grid; gap: 12px; max-height: min(60vh, 520px); overflow: auto; padding-right: 4px; }
    .box9-asset-section { border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); border-radius: 12px; padding: 12px 14px; }
    .box9-asset-section h3 { margin: 0 0 8px; letter-spacing: 0.06em; text-transform: uppercase; font-size: 13px; color: #e9ecf4; }
    .box9-asset-section ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
    .box9-asset-section li { color: #dce2f5; line-height: 1.4; font-size: 14px; }
    .box9-asset-section small { display: block; color: #9aa3ba; font-size: 12px; }
    .box9-dummy { position: absolute; inset: 0; display: none; align-items: center; justify-content: center; padding: 18px; background: radial-gradient(circle at 50% 20%, rgba(255,255,255,0.05), rgba(3,5,8,0.9)); pointer-events: auto; }
    .box9-dummy.visible { display: flex; }
    .box9-dummy-panel { width: min(1080px, 100%); background: rgba(5,7,12,0.92); border: 1px solid rgba(255,255,255,0.16); border-radius: 16px; box-shadow: 0 24px 80px rgba(0,0,0,0.55); display: grid; gap: 12px; padding: 16px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .box9-dummy-hero { display: grid; gap: 10px; }
    .box9-dummy-hero h2 { margin: 0; letter-spacing: 0.08em; text-transform: uppercase; color: #e9ecf4; }
    .box9-dummy-hero p { margin: 0; color: #cbd3e8; line-height: 1.5; }
    .box9-dummy-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(255,215,0,0.4); color: #ffe8a3; background: rgba(255,215,0,0.08); font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
    .box9-dummy-embed { width: 100%; height: 320px; border: 1px solid rgba(255,255,255,0.18); border-radius: 12px; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05); background: #05070c; }
    .box9-dummy-embed iframe { width: 100%; height: 100%; border: 0; background: #05070c; }
    .box9-dummy-controls { display: flex; gap: 8px; flex-wrap: wrap; }
    .box9-dummy-controls .box9-button { flex: 1; min-width: 180px; }
    .box9-dummy-progress { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 12px; display: grid; gap: 10px; }
    .box9-dummy-bar { position: relative; height: 12px; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; border: 1px solid rgba(255,255,255,0.14); }
    .box9-dummy-bar .indicator { position: absolute; top: 0; bottom: 0; width: 8px; background: linear-gradient(135deg, #7a9bff, #3f5cff); border-radius: 6px; box-shadow: 0 0 10px rgba(122,155,255,0.6); transform: translateX(-50%); left: calc(var(--progress, 0) * 100%); transition: left 60ms linear; }
    .box9-dummy-bar .window { position: absolute; top: 1px; bottom: 1px; width: 12px; background: rgba(84,255,191,0.3); border-radius: 6px; transform: translateX(-50%); left: calc(var(--window, 0) * 100%); border: 1px solid rgba(84,255,191,0.6); }
    .box9-dummy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
    .box9-dummy-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 10px; display: grid; gap: 6px; }
    .box9-dummy-card h4 { margin: 0; letter-spacing: 0.06em; text-transform: uppercase; color: #e9ecf4; }
    .box9-dummy-card p { margin: 0; color: #cbd3e8; line-height: 1.45; }
    .box9-dummy-score { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; font-weight: 700; color: #e9ecf4; }
    .box9-dummy-score span { padding: 6px 10px; border-radius: 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); }
    .box9-dummy-alert { padding: 10px 12px; border-radius: 12px; border: 1px solid rgba(255,215,0,0.35); background: rgba(255,215,0,0.08); color: #ffe8a3; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; text-align: center; }
    .box9-glove-modal { width: min(540px, 95vw); background: linear-gradient(135deg, rgba(12,17,29,0.96), rgba(16,23,42,0.92)); }
    .box9-glove-list { display: grid; gap: 10px; margin: 12px 0; }
    .box9-glove-card { border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); border-radius: 12px; padding: 12px; display: grid; gap: 6px; position: relative; overflow: hidden; }
    .box9-glove-card:before { content: ''; position: absolute; inset: 0; pointer-events: none; background: linear-gradient(135deg, rgba(63,92,255,0.08), rgba(122,155,255,0.05)); opacity: 0; transition: opacity 160ms ease; }
    .box9-glove-card.active:before { opacity: 1; }
    .box9-glove-card.locked { opacity: 0.6; border-style: dashed; }
    .box9-glove-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .box9-glove-title { margin: 0; font-size: 15px; letter-spacing: 0.06em; text-transform: uppercase; }
    .box9-glove-status { padding: 6px 10px; border-radius: 999px; font-size: 12px; letter-spacing: 0.06em; font-weight: 700; }
    .box9-glove-status.locked { background: rgba(255,107,129,0.16); color: #ffd4dc; border: 1px solid rgba(255,107,129,0.5); }
    .box9-glove-status.unlocked { background: rgba(63,92,255,0.16); color: #d8e2ff; border: 1px solid rgba(122,155,255,0.6); }
    .box9-glove-status.active { background: rgba(84,255,191,0.16); color: #c7ffe8; border: 1px solid rgba(84,255,191,0.6); }
    .box9-glove-condition { color: #cbd3e8; margin: 0; line-height: 1.5; position: relative; z-index: 1; }
    .box9-checklist { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 6px; }
    .box9-check-item { display: flex; gap: 8px; align-items: flex-start; color: #cbd3e8; font-size: 13px; line-height: 1.4; }
    .box9-check-icon { width: 18px; height: 18px; border-radius: 999px; border: 1px solid rgba(255,255,255,0.25); display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #9aa3ba; background: rgba(255,255,255,0.04); flex-shrink: 0; }
    .box9-check-item.done .box9-check-icon { background: rgba(84,255,191,0.16); border-color: rgba(84,255,191,0.5); color: #c7ffe8; }
    .box9-check-item.done { color: #d8e2ff; }
    .box9-progress-panel { background: rgba(0,0,0,0.32); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 14px 16px; display: grid; gap: 10px; max-width: 420px; pointer-events: auto; box-shadow: 0 18px 45px rgba(0,0,0,0.42); }
    .box9-progress-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
    .box9-progress-title { display: flex; flex-direction: column; gap: 4px; }
    .box9-progress-title strong { letter-spacing: 0.08em; text-transform: uppercase; font-size: 14px; }
    .box9-progress-title small { color: #9aa3ba; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 700; }
    .box9-progress-chip { padding: 8px 12px; border-radius: 999px; border: 1px solid rgba(122,155,255,0.4); background: rgba(63,92,255,0.14); color: #dce2f5; letter-spacing: 0.04em; font-weight: 800; text-transform: uppercase; }
    .box9-progress-wins { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
    .box9-progress-wins li { display: flex; align-items: center; justify-content: space-between; gap: 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 12px; color: #cbd3e8; font-size: 13px; }
    .box9-progress-wins small { color: #9aa3ba; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 700; }
    .box9-progress-milestone { margin: 0; color: #dce2f5; line-height: 1.5; font-size: 14px; }
    .box9-secret-progress { margin: 0; color: #c7ffe8; background: rgba(84,255,191,0.12); border: 1px solid rgba(84,255,191,0.4); padding: 10px 12px; border-radius: 10px; line-height: 1.5; font-weight: 700; }
    .box9-button.text { background: transparent; border-color: transparent; color: #cbd3e8; box-shadow: none; text-decoration: underline; padding-inline: 10px; }
    .box9-button:focus-visible { outline: 2px solid rgba(122,155,255,0.8); outline-offset: 2px; box-shadow: 0 0 0 4px rgba(122,155,255,0.25); }
    .box9-toggle input:focus-visible + .box9-toggle-slider { box-shadow: 0 0 0 3px rgba(122,155,255,0.35); }
    .box9-radio input:focus-visible { outline: 2px solid rgba(122,155,255,0.8); outline-offset: 2px; border-radius: 6px; }
    .box9-slider input:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(122,155,255,0.35); border-radius: 999px; }
    .box9-mode-grid button:focus-visible, .box9-mode-sidebar button:focus-visible { outline: 2px solid rgba(122,155,255,0.85); outline-offset: 2px; box-shadow: 0 0 0 4px rgba(122,155,255,0.2); }
    @media (max-width: 960px) {
      .box9-mode-layout { grid-template-columns: 1fr; }
      .box9-mode-sidebar { order: -1; }
      .box9-mode-card .box9-button { width: auto; }
    }
  `,document.head.appendChild(r)}function Vy(r,e,t){const n=document.createElement("div");n.className="box9-modal-backdrop";const i=document.createElement("div");i.className="box9-modal";const s=document.createElement("h2");s.textContent="Opciones de arena";const o=document.createElement("div");o.className="box9-field";const a=document.createElement("label");a.textContent="Ring";const l=document.createElement("select");Object.entries(Va).forEach(([k,j])=>{const J=document.createElement("option");J.value=k,J.textContent=j,l.appendChild(J)}),o.append(a,l);const c=document.createElement("div");c.className="box9-field";const u=document.createElement("label");u.textContent="Cámara libre";const d=document.createElement("input");d.type="checkbox",c.append(u,d);const h=document.createElement("div");h.className="box9-field";const f=document.createElement("label");f.textContent="Destellos en gradas";const g=document.createElement("input");g.type="range",g.min="0",g.max="1",g.step="0.01";const x=document.createElement("input");x.type="range",x.min="0",x.max="1",x.step="0.01";const m=document.createElement("div");m.className="box9-row",m.style.justifyContent="space-between";const p=document.createElement("small");p.textContent="Frecuencia",p.style.textTransform="uppercase",p.style.letterSpacing="0.08em",p.style.color="#9aa3ba";const v=document.createElement("small");v.textContent="Intensidad",v.style.textTransform="uppercase",v.style.letterSpacing="0.08em",v.style.color="#9aa3ba",m.append(p,v);const _=document.createElement("small");_.style.color="#cbd3e8";const b=document.createElement("small");b.style.color="#cbd3e8";const L=()=>{_.textContent=`${Math.round(parseFloat(g.value)*100)}%`,b.textContent=`${Math.round(parseFloat(x.value)*100)}%`},w=k=>{g.value=k.frequency.toString(),x.value=k.intensity.toString(),L()};g.addEventListener("input",L),x.addEventListener("input",L),w(t);const A=document.createElement("div");A.className="box9-row",A.style.justifyContent="space-between",A.append(_,b),h.append(f,m,g,A,x);const U=document.createElement("div");U.className="box9-modal-actions";const M=document.createElement("button");M.className="box9-button box9-secondary",M.textContent="Cerrar",M.addEventListener("click",()=>r());const T=document.createElement("button");return T.className="box9-button",T.textContent="Aplicar",T.addEventListener("click",()=>{const k={frequency:parseFloat(g.value),intensity:parseFloat(x.value)};e(l.value,d.checked,k),r()}),U.append(M,T),i.append(s,o,c,h,U),n.appendChild(i),{backdrop:n,ringSelect:l,freeCamToggle:d,setFlashSettings:w}}function Wy(){const r=document.createElement("div");r.className="box9-loading";const e=document.createElement("div");e.className="box9-loading-panel";const t=document.createElement("strong");t.textContent="Cargando assets";const n=document.createElement("div");n.className="box9-progress";const i=document.createElement("div");i.className="box9-progress-bar",n.appendChild(i);const s=document.createElement("div");return s.className="box9-error",s.style.display="none",e.append(t,n,s),r.appendChild(e),{overlay:r,progressBar:i,errorText:s}}function Xy(r){const e=document.createElement("div");e.className="box9-modal-backdrop";const t=document.createElement("div");t.className="box9-modal";const n=document.createElement("h2");n.textContent="Inventario de assets";const i=document.createElement("p");i.className="box9-progress-note",i.textContent="Listado de modelos, animaciones, texturas y sonidos disponibles en BOX9.";const s=document.createElement("div");s.className="box9-asset-list",Ny.forEach(l=>{const c=document.createElement("div");c.className="box9-asset-section";const u=document.createElement("h3");u.textContent=l.title;const d=document.createElement("ul");l.items.forEach(h=>{const f=document.createElement("li");if(f.textContent=h.label,h.detail){const g=document.createElement("small");g.textContent=h.detail,f.appendChild(g)}d.appendChild(f)}),c.append(u,d),s.appendChild(c)});const o=document.createElement("div");o.className="box9-modal-actions";const a=document.createElement("button");return a.className="box9-button box9-secondary",a.textContent="Cerrar",a.addEventListener("click",()=>r()),o.append(a),t.append(n,i,s,o),e.appendChild(t),{backdrop:e}}function jy(r){const e=document.createElement("div");e.className="box9-dummy";const t=document.createElement("div");t.className="box9-dummy-panel";const n=document.createElement("div");n.className="box9-dummy-hero";const i=document.createElement("div");i.className="box9-dummy-badge",i.textContent="Ruta secreta · Timing drills";const s=document.createElement("h2");s.textContent="Dummy de precisión";const o=document.createElement("p");o.textContent="Ritmos cortos, ventanas de impacto y combos encadenados. Practica el timing del set negro/dorado sobre un dummy inspirado en BOX8.";const a=document.createElement("div");a.className="box9-dummy-alert",a.textContent="Solo disponible con los guantes secretos activos.",n.append(i,s,o,a);const l=document.createElement("div");l.className="box9-dummy-embed";const c=document.createElement("iframe");c.src="sacobox8.html",c.title="BOX8 Dummy",c.loading="lazy",l.appendChild(c);const u=document.createElement("div");u.className="box9-dummy-controls";const d=document.createElement("button");d.className="box9-button",d.textContent="Iniciar reto de timing";const h=document.createElement("button");h.className="box9-button box9-secondary",h.textContent="Volver a BOX9";const f=document.createElement("div");f.className="box9-dummy-progress";const g=document.createElement("div");g.className="box9-progress-note",g.textContent="Pulsa Espacio cuando el indicador cruce las ventanas verdes.";const x=document.createElement("div");x.className="box9-dummy-bar";const m=document.createElement("div");m.className="indicator",x.appendChild(m);const p=[.18,.52,.82];p.forEach(le=>{const Ee=document.createElement("div");Ee.className="window",Ee.style.setProperty("--window",le.toString()),x.appendChild(Ee)});const v=document.createElement("div");v.className="box9-dummy-score";const _=document.createElement("span"),b=document.createElement("span"),L=document.createElement("span");v.append(_,b,L);const w=document.createElement("div");w.className="box9-dummy-grid",[{title:"Timing corto",copy:"Ciclos de 1.4s basados en la escena BOX8. Imagina que el dummy te devuelve el golpe."},{title:"Ventanas secretas",copy:"Tres ventanas verdes (jab, cross, upper). Pulsa en el centro para sumar precisión y mantener el ritmo."},{title:"Cadena final",copy:"Completa 9 impactos seguidos para marcar el drill. Reinicia si pierdes el pulso o rompes la racha."}].forEach(le=>{const Ee=document.createElement("div");Ee.className="box9-dummy-card";const Se=document.createElement("h4");Se.textContent=le.title;const Te=document.createElement("p");Te.textContent=le.copy,Ee.append(Se,Te),w.appendChild(Ee)}),f.append(g,x,v),u.append(d,h),t.append(n,l,u,f,w),e.appendChild(t);const U=1400,M=.07,T=9;let k=null,j=0,J=0,D=0,F=0,z=!1,q=!1;const Y=()=>{_.textContent=`Aciertos: ${J}/${T}`,b.textContent=`Racha: ${F}`,L.textContent=`Fallos: ${D}`},K=()=>{k!==null&&(cancelAnimationFrame(k),k=null)},Z=le=>{if(!q)return;const Ee=(le-j)%U,Se=Math.max(0,Math.min(1,Ee/U));m.style.setProperty("--progress",Se.toString()),k=requestAnimationFrame(Z)},ee=()=>{J=0,D=0,F=0,Y(),g.textContent="Pulsa Espacio cuando el indicador cruce las ventanas verdes.",j=performance.now(),q=!0,K(),k=requestAnimationFrame(Z)},ie=()=>{q=!1,K(),g.textContent="Drill completado: ritmo de dummy dominado. Puedes reiniciar para afinar más."},H=le=>{p.reduce((Se,Te)=>{const Ge=Math.min(Math.abs(le-Te),1-Math.abs(le-Te));return Ge<Se.diff?{diff:Ge,windowPosition:Te}:Se},{diff:Number.POSITIVE_INFINITY,windowPosition:p[0]}).diff<=M?(J+=1,F+=1,g.textContent="Timing limpio, mantén el flujo.",J>=T&&ie()):(D+=1,F=0,g.textContent="Te adelantaste o llegaste tarde. Respira y ajusta el ritmo."),Y()},$=le=>{if(!z||!q||le.code!=="Space"&&le.code!=="Enter")return;le.preventDefault();const Se=(performance.now()-j)%U/U;H(Se)};return d.addEventListener("click",()=>{q=!0,ee()}),h.addEventListener("click",()=>{z=!1,q=!1,K(),e.classList.remove("visible"),document.removeEventListener("keydown",$),r()}),{overlay:e,open:()=>{z||(z=!0,e.classList.add("visible"),ee(),document.addEventListener("keydown",$))},close:()=>{z=!1,q=!1,K(),e.classList.remove("visible"),document.removeEventListener("keydown",$),r()}}}function uh(r,e){return r==="entrenamiento"?!0:r==="amateur"?e.unlocks.amateur:r==="pro"?e.unlocks.pro:e.unlocks.secreto}function qy(r,e){return r==="entrenamiento"?"Guantes base disponibles desde el inicio de la campaña.":r==="amateur"?`Entrenamiento: gana a MMA (${e.wins.entrenamiento.mma}/1) y Bodybuilder (${e.wins.entrenamiento.bodybuilder}/1) con guantes base.`:r==="pro"?`Reto Tyson: derrótalo con los guantes amateur (${e.wins.amateur.tyson}/1) para conseguir el set PRO.`:`Ruta secreta: vence con guantes PRO a MMA (${e.wins.pro.mma}/1), Bodybuilder (${e.wins.pro.bodybuilder}/1) y Tyson (${e.wins.pro.tyson}/1).`}function Yy(r,e){const t=[{level:"entrenamiento",condition:"Guantes base disponibles desde el inicio de la campaña."},{level:"amateur",condition:"Gana a MMA y Bodybuilder con los guantes de entrenamiento para desbloquearlos."},{level:"pro",condition:"Derrota a Tyson usando los guantes amateur para conseguir el set PRO."},{level:"secreto",condition:"Vence nuevamente a MMA, Bodybuilder y Tyson con los guantes PRO para revelar el set secreto."}],n=document.createElement("div");n.className="box9-modal-backdrop";const i=document.createElement("div");i.className="box9-modal box9-glove-modal";const s=document.createElement("h2");s.textContent="Progresión de guantes";const o=document.createElement("p");o.className="box9-progress-note",o.textContent="Revisa qué set está activo, qué necesitas para desbloquear cada nivel y sigue la ruta secreta.";const a=document.createElement("div");a.className="box9-glove-list";const l=new Map;t.forEach(d=>{const h=document.createElement("div");h.className="box9-glove-card",h.dataset.level=d.level;const f=document.createElement("div");f.className="box9-glove-header";const g=document.createElement("h3");g.className="box9-glove-title",g.textContent=jr(d.level);const x=document.createElement("span");x.className="box9-glove-status locked",x.textContent="Bloqueado",f.append(g,x);const m=document.createElement("p");m.className="box9-glove-condition",m.textContent=d.condition;const p=document.createElement("div");p.className="box9-row";const v=document.createElement("button");v.className="box9-button box9-secondary",v.textContent="Activar",v.addEventListener("click",()=>{v.disabled||e(d.level)}),p.appendChild(v);const _=document.createElement("small");_.className="box9-progress-note",h.append(f,m,p,_),a.appendChild(h),l.set(d.level,{card:h,status:x,selectButton:v,condition:m,stateCopy:_})});const c=document.createElement("div");c.className="box9-modal-actions";const u=document.createElement("button");return u.className="box9-button box9-secondary",u.textContent="Cerrar",u.addEventListener("click",()=>r()),c.append(u),i.append(s,o,a,c),n.appendChild(i),{backdrop:n,update:d=>{t.forEach(h=>{const f=l.get(h.level);if(!f)return;const g=uh(h.level,d),x=d.activeGlove===h.level,m=jr(h.level);f.card.classList.toggle("active",x),f.card.classList.toggle("locked",!g),f.status.className="box9-glove-status "+(x?"active":g?"unlocked":"locked"),f.status.textContent=x?"Activo":g?"Desbloqueado":"Bloqueado",f.selectButton.disabled=!g||x,f.selectButton.textContent=x?`${m} equipados`:`Equipar ${m}`,f.selectButton.style.display=g&&!x?"":"none",f.stateCopy.textContent=x?`${m} activos`:g?`${m} desbloqueados`:`${m} bloqueados`,f.condition.textContent=qy(h.level,d)})}}}function Ky(r,e,t,n,i,s,o){const a=document.createElement("div");a.className="box9-hud";let l=Lt(r.getState().progress),c=!1,u=r.getState().character;const d=document.createElement("div");d.className="box9-topbar";const h=document.createElement("div");h.className="box9-status";const f=document.createElement("div"),g=document.createElement("small");g.textContent="Ring";const x=document.createElement("strong");f.append(g,x);const m=document.createElement("div"),p=document.createElement("small");p.textContent="Guantes";const v=document.createElement("strong");m.append(p,v);const _=document.createElement("div"),b=document.createElement("small");b.textContent="Cámara";const L=document.createElement("strong");_.append(b,L),h.append(f,m,_);const w=document.createElement("div");w.className="box9-row";const A=document.createElement("button");A.className="box9-button box9-secondary",A.textContent="Cam. libre",A.addEventListener("click",()=>{c=!1,n()});const U=document.createElement("button");U.className="box9-button box9-secondary",U.textContent="Cam. mentón",U.title="Coloca la cámara debajo del mentón para una vista POV.",U.addEventListener("click",()=>{c=!0,i(),lt(l)});const M=document.createElement("button");M.className="box9-button box9-secondary",M.textContent="Registrar victoria",M.title="Marca al rival actual como derrotado para desbloquear progresión.",M.addEventListener("click",()=>{const he=r.getState().character;Pu(he)});const T=document.createElement("button");T.className="box9-button",T.textContent="Opciones",T.addEventListener("click",()=>e());const k=document.createElement("button");k.className="box9-button",k.textContent="Assets",k.addEventListener("click",()=>t());const j=document.createElement("button");j.className="box9-button",j.textContent="Guantes",j.addEventListener("click",()=>s()),w.append(A,U,M,T,k,j),d.append(h,w);const J=document.createElement("div");J.className="box9-row";const D=document.createElement("small");D.textContent="Fichas",D.style.textTransform="uppercase",D.style.letterSpacing="0.1em",D.style.color="#9aa3ba",D.style.fontWeight="700",J.appendChild(D);const F=document.createElement("div");F.className="box9-row",F.style.flexWrap="wrap";const z=he=>{F.querySelectorAll(".box9-chip").forEach(be=>{be.classList.toggle("active",be.dataset.character===he)})};Object.entries(zy).forEach(([he,Pe])=>{const be=document.createElement("div");be.className="box9-chip";const It=document.createElement("span");It.className="box9-chip-label",It.textContent=Pe,be.appendChild(It),be.addEventListener("click",()=>{const Xt=he;if(!Lu(Xt,l)){window.dispatchEvent(new CustomEvent("box9:character-locked",{detail:{character:Xt,reason:ya(Xt,l)}}));return}c=!1,z(Xt),o(Xt)}),be.dataset.character=he,F.appendChild(be)}),J.appendChild(F);const q=document.createElement("div");q.className="box9-fighter-card";const Y=document.createElement("h3");Y.className="box9-fighter-name",Y.textContent="MMA";const K=document.createElement("div");K.className="box9-stat-grid";const Z=document.createElement("div");Z.className="box9-stat";const ee=document.createElement("small");ee.textContent="Peso";const ie=document.createElement("strong");Z.append(ee,ie);const H=document.createElement("div");H.className="box9-stat";const $=document.createElement("small");$.textContent="Alcance";const ce=document.createElement("strong");H.append($,ce);const _e=document.createElement("div");_e.className="box9-stat";const le=document.createElement("small");le.textContent="Velocidad";const Ee=document.createElement("strong");_e.append(le,Ee),K.append(Z,H,_e),q.append(Y,K);const Se=document.createElement("p");Se.className="box9-fighter-personality",Se.textContent="Competidor táctico, mezcla derribos con boxeo limpio y lee cada distancia.",q.appendChild(Se);const Te=document.createElement("div");Te.className="box9-fighter-meta";const Ge=document.createElement("div");Ge.className="box9-meta-item";const O=document.createElement("small");O.className="box9-meta-label",O.textContent="Gimnasio";const ut=document.createElement("p");ut.className="box9-meta-copy",Ge.append(O,ut);const Le=document.createElement("div");Le.className="box9-meta-item";const Fe=document.createElement("small");Fe.className="box9-meta-label",Fe.textContent="Ring";const X=document.createElement("p");X.className="box9-meta-copy",Le.append(Fe,X),Te.append(Ge,Le),q.appendChild(Te);const ve=document.createElement("div");ve.className="box9-progress-note",ve.textContent="Completa las peleas base para desbloquear a Tyson y los guantes secretos.";const Ue=document.createElement("ul");Ue.className="box9-checklist";const E=[{id:"amateur",element:document.createElement("li"),label:he=>`Base completada: MMA (${he.wins.entrenamiento.mma}/1) y Bodybuilder (${he.wins.entrenamiento.bodybuilder}/1) con guantes de entrenamiento.`,done:he=>he.unlocks.amateur},{id:"tyson",element:document.createElement("li"),label:he=>`Desafío Tyson: repite las victorias con guantes amateur (MMA ${he.wins.amateur.mma}/1, Bodybuilder ${he.wins.amateur.bodybuilder}/1) para abrir el combate.`,done:he=>he.unlocks.tyson},{id:"pro",element:document.createElement("li"),label:he=>`Guantes PRO: vence a Tyson con guantes amateur (${he.wins.amateur.tyson}/1).`,done:he=>he.unlocks.pro},{id:"secreto",element:document.createElement("li"),label:he=>`Ruta secreta: gana con guantes PRO a MMA (${he.wins.pro.mma}/1), Bodybuilder (${he.wins.pro.bodybuilder}/1) y Tyson (${he.wins.pro.tyson}/1).`,done:he=>he.unlocks.secreto}];E.forEach(he=>{he.element.className="box9-check-item";const Pe=document.createElement("span");Pe.className="box9-check-icon";const be=document.createElement("span");he.element.append(Pe,be),he.icon=Pe,he.text=be,Ue.appendChild(he.element)});const y=document.createElement("div");y.className="box9-progress-note",y.style.fontSize="12px";const B=document.createElement("div");B.className="box9-row",B.style.justifyContent="space-between";const re=document.createElement("small"),te=document.createElement("small"),se=document.createElement("small"),Ae=document.createElement("small");[re,te,se,Ae].forEach(he=>{he.style.color="#b4bed4",he.style.fontWeight="700",he.style.letterSpacing="0.06em"}),B.append(re,te,se,Ae),q.append(ve,Ue,y,B);const fe=document.createElement("div");fe.className="box9-gym-panel";const me=document.createElement("h4");me.textContent="Gimnasio alterno";const Ie=document.createElement("p");Ie.textContent="Abre la variante de gimnasio asociada al rival seleccionado.";const He=document.createElement("div");He.className="box9-gym-actions";const Q=document.createElement("button");Q.className="box9-button",Q.textContent="Abrir gimnasio",Q.addEventListener("click",()=>{const he=va[r.getState().character];he&&window.open(he.href,"_blank","noopener,noreferrer")});let Qe=!1;const ke=document.createElement("button");ke.className="box9-button box9-secondary",ke.textContent="Abrir en iframe";const Be=document.createElement("div");Be.className="box9-gym-embed";const we=document.createElement("iframe");we.title="Vista de gimnasio alterno",Be.appendChild(we);const pe=he=>{const Pe=new URL(he,window.location.href).href;(!we.src||we.src!==Pe)&&(we.src=Pe)},R=he=>{he&&pe(he),Qe=!0,Be.style.display="block",ke.textContent="Cerrar iframe"},oe=()=>{Qe=!1,Be.style.display="none",ke.textContent="Abrir en iframe"};openBagScene=()=>{const he=new URL("bolsa.html",window.location.href).href;R(he),r.getState().selectionStarted||r.setState({selectionStarted:!0}),kt("start-selection",{mode:"bolsa"})},ke.addEventListener("click",()=>{const he=va[r.getState().character];he&&(pe(he.href),Qe?oe():R())}),He.append(Q,ke),fe.append(me,Ie,He,Be);const Re=document.createElement("div");Re.className="box9-progress-panel";const xe=document.createElement("div");xe.className="box9-progress-header";const ne=document.createElement("div");ne.className="box9-progress-title";const I=document.createElement("strong");I.textContent="Panel de progreso";const ae=document.createElement("small");ae.textContent="Resumen de campaña",ne.append(I,ae);const ue=document.createElement("span");ue.className="box9-progress-chip",ue.textContent="Guantes activos",xe.append(ne,ue);const Oe=document.createElement("ul");Oe.className="box9-progress-wins";const De=[{id:"mma",label:"MMA",total:document.createElement("span")},{id:"bodybuilder",label:"Bodybuilder",total:document.createElement("span")},{id:"tyson",label:"Tyson",total:document.createElement("span")},{id:"principal",label:"Principal",total:document.createElement("span")}];De.forEach(he=>{const Pe=document.createElement("li"),be=document.createElement("small");be.textContent=he.label,he.total.className="box9-progress-counter",he.total.textContent="0 victorias",Pe.append(be,he.total),Oe.appendChild(Pe)});const qe=document.createElement("p");qe.className="box9-secret-progress";const Xe=document.createElement("p");Xe.className="box9-progress-milestone",Xe.textContent=Ws(Lt(r.getState().progress)),Re.append(xe,Oe,qe,Xe),a.append(d,J,q,fe,Re);const lt=he=>{const Pe=r.getState(),be=he??Lt(Pe.progress);l=be,Pe.character!==u&&(c=!1,u=Pe.character),Pe.freeCamera&&c&&(c=!1),x.textContent=Va[Pe.ring];const It=Pe.freeCamera?"Libre":c?"POV mentón":"Viaje guiado";L.textContent=It,v.textContent=jr(be.activeGlove),ue.textContent=jr(be.activeGlove);const Xt=ch(Pe.character);Y.textContent=Xt.name,ie.textContent=Xt.weight,ce.textContent=Xt.reach,Ee.textContent=Xt.speed,Se.textContent=Xt.personality;const ss=uo(Pe.character);X.textContent=`${Va[ss]} · ${ky[ss]}`,z(Pe.character);const en=va[Pe.character],os=me.dataset.variantId;en?(me.textContent=`Gimnasio alterno · ${en.label}`,Ie.textContent=en.description,me.dataset.variantId=Pe.character,ut.textContent=`${en.label} · ${en.description}`,Q.disabled=!1,ke.disabled=!1,os!==Pe.character?oe():Qe&&we.src!==new URL(en.href,window.location.href).href&&pe(en.href)):(me.textContent="Gimnasio alterno",Ie.textContent="Selecciona un rival para ver su entorno asociado.",Q.disabled=!0,ke.disabled=!0,oe()),re.textContent=`Entrenamiento → MMA: ${be.wins.entrenamiento.mma} · Bodybuilder: ${be.wins.entrenamiento.bodybuilder} · Principal: ${be.wins.entrenamiento.principal}`,te.textContent=`Amateur → MMA: ${be.wins.amateur.mma} · Bodybuilder: ${be.wins.amateur.bodybuilder} · Principal: ${be.wins.amateur.principal}`,se.textContent=`PRO → MMA: ${be.wins.pro.mma} · Bodybuilder: ${be.wins.pro.bodybuilder} · Tyson: ${be.wins.pro.tyson} · Principal: ${be.wins.pro.principal}`,Ae.textContent=`Secreto → MMA: ${be.wins.secreto.mma} · Bodybuilder: ${be.wins.secreto.bodybuilder} · Tyson: ${be.wins.secreto.tyson} · Principal: ${be.wins.secreto.principal}`,ve.textContent=Ws(be),Xe.textContent=Ws(be),De.forEach(pt=>{const _n=be.wins.entrenamiento[pt.id]+be.wins.amateur[pt.id]+be.wins.pro[pt.id]+be.wins.secreto[pt.id];pt.total.textContent=`${_n} ${_n===1?"victoria":"victorias"}`});const wi=["mma","bodybuilder","tyson"],ci=be.wins.pro,as=wi.filter(pt=>ci[pt]>0).length;qe.textContent=be.unlocks.secreto?"Ruta secreta completada: dummy secreto habilitado.":`Ruta secreta con guantes PRO: ${as}/3 · MMA ${ci.mma}/1 · Bodybuilder ${ci.bodybuilder}/1 · Tyson ${ci.tyson}/1.`,E.forEach(pt=>{const _n=pt.done(be);pt.element.classList.toggle("done",_n),pt.icon&&(pt.icon.textContent=_n?"✔":"•"),pt.text&&(pt.text.textContent=pt.label(be))});const Ci=ya("tyson",be);y.textContent=!be.unlocks.tyson&&Ci?Ci:"",y.style.display=!be.unlocks.tyson&&Ci?"block":"none",F.querySelectorAll(".box9-chip").forEach(pt=>{const _n=pt.dataset.character,S=_n==="tyson"&&!be.unlocks.tyson,N=_n==="tyson"?Ci:null;pt.classList.toggle("disabled",S),pt.title=S?N??"Desbloquéalo ganando las peleas base.":""})};return{hud:a,update:lt,ringValue:x,cameraValue:L,freeCamButton:A}}function Zy(r,e=Ft){Hy(),window.box9RegisterWin=X=>Pu(X);let t=!1,n=null;const i=Mr();let s={...Ga,...i.flashSettings};const o=X=>{s={...Ga,...X.flashSettings},r.classList.toggle("box9-high-contrast",X.highContrast),kt("flash-settings",{settings:s})},a=document.createElement("div");a.className="box9-ui",o(i);const{overlay:l,progressBar:c,errorText:u}=Wy(),d=new Map;let h=null;const f=()=>{if(h!==null&&(window.clearTimeout(h),h=null),d.size===0){l.style.display="none",u.style.display="none",c.style.width="0%";return}const X=Array.from(d.values()),ve=X.reduce((Ue,E)=>Ue+E,0)/X.length;c.style.width=`${Math.round(ve*100)}%`,l.style.display="flex"},g=()=>{h===null&&(h=window.setTimeout(()=>{d.clear(),f()},450))};my({onProgress:(X,ve)=>{d.set(X,ve),u.style.display="none",f(),Array.from(d.values()).every(Ue=>Ue>=1)&&g()},onError:X=>{d.delete(X),u.textContent=`No se pudo cargar ${X}.`,u.style.display="block",l.style.display="flex"}}),window.addEventListener("box9:settings-changed",X=>{const ve=X.detail??Mr();o(ve)});const{overlay:x,update:m}=By(e,X=>{const ve=Lt(e.getState().progress);if(X==="dummy"){n==null||n(ve);return}X!=="bolsa"&&(e.setState({selectionStarted:!0}),kt("start-selection",{mode:X}))}),p=Array.from(document.querySelectorAll("[data-box9-help]")),v=Array.from(document.querySelectorAll("[data-box9-card]")),{backdrop:_,ringSelect:b,freeCamToggle:L,setFlashSettings:w}=Vy(()=>{_.style.display="none"},(X,ve,Ue)=>{const E=uo(e.getState().character),y=X!==E;s=Ue,e.setState({ring:X,ringOverride:y,freeCamera:ve}),kt("ring-change",{ring:X}),kt("freecam-change",{enabled:ve}),kt("flash-settings",{settings:s})},s),{backdrop:A}=Xy(()=>{A.style.display="none"}),{backdrop:U,update:M}=Yy(()=>{U.style.display="none"},X=>{const ve=Lt(e.getState().progress);if(!uh(X,ve))return;const Ue=Lt({...ve,activeGlove:X});e.setState({progress:Ue})}),{hud:T,update:k}=Ky(e,()=>{const X=e.getState();b.value=X.ring,L.checked=X.freeCamera,w(s),_.style.display="flex"},()=>{A.style.display="flex"},()=>{const X=!e.getState().freeCamera;e.setState({freeCamera:X}),kt("freecam-change",{enabled:X})},()=>{const X=e.getState();X.freeCamera&&(e.setState({freeCamera:!1}),kt("freecam-change",{enabled:!1})),kt("chin-preview",{character:X.character})},()=>{const X=Lt(e.getState().progress);M(X),U.style.display="flex"},X=>{e.setState({character:X}),kt("character-selected",{character:X})}),{overlay:j,open:J}=jy(()=>{t=!1,D()});n=X=>{(X??Lt(e.getState().progress)).unlocks.secreto&&(t=!0,D(),J())};const D=(X=e.getState())=>{x.style.display=!t&&!X.selectionStarted?"flex":"none",T.style.display=!t&&X.selectionStarted?"flex":"none"},F=X=>{const ve=X.detail;n==null||n(ve==null?void 0:ve.progress)},z=()=>{};window.addEventListener("box9:open-dummy-scene",F),window.addEventListener("box9:start-bag-mode",z);const q=document.createElement("div");q.className="box9-warning",a.appendChild(q);const Y=document.createElement("div");Y.className="box9-dialogue";const K=document.createElement("strong");K.textContent="Victoria registrada";const Z=document.createElement("p");Z.textContent="Tu rival comenta algo sobre la derrota.",Z.style.margin="0",Y.append(K,Z),a.appendChild(Y);const ee=document.createElement("div");ee.className="box9-cinematic";const ie=document.createElement("div");ie.className="box9-cinematic-panel";const H=document.createElement("div");H.className="box9-cinematic-badge",H.textContent="Guantes PRO";const $=document.createElement("h3");$.textContent="Entrega de guantes";const ce=document.createElement("p");ce.textContent="Tyson te tiende el set PRO. El cuero brilla mientras lo ajusta en tus muñecas.";const _e=document.createElement("button");_e.className="box9-button",_e.textContent="Equipar y seguir",ie.append(H,$,ce,_e),ee.appendChild(ie),a.appendChild(ee);let le=null;const Ee=X=>{const ve=ch(X);K.textContent=`${ve.name} derrotado`,Z.textContent=Gy[X]??"Victoria registrada.",Y.classList.add("visible"),le!==null&&window.clearTimeout(le),le=window.setTimeout(()=>{Y.classList.remove("visible"),le=null},2600)};let Se=null;const Te=()=>{ee.classList.remove("visible"),Se!==null&&(window.clearTimeout(Se),Se=null)},Ge=()=>{ee.classList.add("visible"),Se!==null&&window.clearTimeout(Se),Se=window.setTimeout(()=>{ee.classList.remove("visible"),Se=null},3200)};_e.addEventListener("click",Te);let O=null;const ut=X=>{q.textContent=X,q.style.opacity="1",O!==null&&window.clearTimeout(O),O=window.setTimeout(()=>{q.style.opacity="0",O=null},2200)};window.addEventListener("box9:character-locked",X=>{const ve=X.detail;ve!=null&&ve.character&&ut(ve.reason??"Necesitas más victorias para desbloquear este combate.")}),window.addEventListener("box9:fight-win",X=>{const ve=X.detail;ve!=null&&ve.opponent&&Ee(ve.opponent)});let Le=Lt(e.getState().progress),Fe=e.getState().selectionStarted;e.subscribe(X=>{const ve=Lt(X.progress);!Le.unlocks.pro&&ve.unlocks.pro&&Ge(),m(ve),D(X),k(ve),M(ve),X.selectionStarted!==Fe&&(kt("animation-toggle",{active:X.selectionStarted}),!X.selectionStarted&&Fe&&kt("selection-ended"),Fe=X.selectionStarted),p.forEach(E=>{const y=X.selectionStarted||t;E.style.display=y?"none":"",E.toggleAttribute("aria-hidden",y)}),v.forEach(E=>{const y=X.selectionStarted&&!t;E.style.display=y?"":"none",E.toggleAttribute("aria-hidden",!y)}),Le=ve}),a.append(x,T,_,A,U,l,j),r.appendChild(a),Ty(e,{onStartSelection:X=>{},onConfirmSelection:X=>{kt("character-selected",{character:X}),kt("animation-toggle",{active:!1})},onIdle:X=>{kt("character-selected",{character:X})}})}let Vs=null;function mn(r){window.dispatchEvent(new CustomEvent("box9:settings-changed",{detail:r}))}function bn(r){return`${Math.round(r*100)}%`}function Eu(r){return`${r.toFixed(2)}x`}function fl(r,e){const t=document.createElement("div");t.className="box9-option-row";const n=document.createElement("div");n.className="box9-option-label";const i=document.createElement("div");if(i.className="box9-option-title",i.textContent=r,n.appendChild(i),e){const s=document.createElement("p");s.className="box9-option-description",s.textContent=e,n.appendChild(s)}return t.appendChild(n),{row:t,labelEl:i}}function ba(r,e,t,n){const{row:i}=fl(r,e),s=document.createElement("label");s.className="box9-toggle";const o=document.createElement("input");o.type="checkbox",o.checked=t;const a=document.createElement("span");a.className="box9-toggle-slider",s.append(o,a),o.addEventListener("change",()=>n(o.checked));const l=document.createElement("div");return l.className="box9-option-control",l.appendChild(s),i.appendChild(l),{row:i,input:o}}function $y(r,e,t,n,i){const{row:s}=fl(r,e),o=document.createElement("div");return o.className="box9-radio-list",t.forEach(a=>{const l=document.createElement("label");l.className="box9-radio";const c=document.createElement("input");c.type="radio",c.name="box9-camera-preset",c.value=a.value,c.checked=a.value===n;const u=document.createElement("strong");u.textContent=a.title;const d=document.createElement("span");d.textContent=a.copy??"",c.addEventListener("change",()=>{c.checked&&i(a.value)}),l.append(c,u,d),o.appendChild(l)}),s.appendChild(o),{row:s,list:o}}function tr(r,e,t,n,i,s,o,a){const{row:l}=fl(r,e),c=document.createElement("div");c.className="box9-slider";const u=document.createElement("input");u.type="range",u.min=String(n),u.max=String(i),u.step=String(s),u.value=String(t);const d=document.createElement("span");return d.className="box9-slider-value",d.textContent=o(t),u.addEventListener("input",()=>{const h=Number.parseFloat(u.value);d.textContent=o(h),a(h)}),c.append(u,d),l.appendChild(c),{row:l,input:u,valueBadge:d}}function Jy(){if(Vs)return Vs;let r=Mr();mn(r);const e=document.createElement("div");e.className="box9-options-backdrop";const t=document.createElement("div");t.className="box9-options-modal";const n=document.createElement("h2");n.textContent="Opciones de BOX 9";const i=document.createElement("p");i.className="box9-option-intro",i.textContent="Ajusta cámara, apoyo de viaje guiado y flashes de público en vivo.";const s=document.createElement("button");s.type="button",s.className="box9-button box9-secondary",s.textContent="Cerrar";const o=Object.values(ka).map(b=>({value:b.id,title:b.label,copy:b.description})),a=$y("Cámara","Define el punto de vista base para los recorridos guiados.",o,r.cameraPreset,b=>{r={...r,cameraPreset:b},vn(r),mn(r)}),l=tr("Sensibilidad de cámara","Define la velocidad de rotación y respuesta de la cámara libre.",r.cameraSensitivity,.3,1.7,.05,Eu,b=>{r={...r,cameraSensitivity:b},vn(r),mn(r)}),c=ba("Viaje asistido","Activa la guía de movimientos para evitar cambios bruscos de cámara.",r.travelAssist,b=>{r={...r,travelAssist:b},vn(r),mn(r)}),u=ba("Modo antináuseas","Suaviza sacudidas y reduce la velocidad para disminuir el mareo.",r.motionComfort,b=>{r={...r,motionComfort:b},vn(r),mn(r)}),d=tr("Frecuencia de flashes","Controla la cadencia de flashes en el público.",r.flashSettings.frequency,0,1,.05,bn,b=>{r={...r,flashSettings:{...r.flashSettings,frequency:b}},vn(r),mn(r)}),h=tr("Intensidad de flashes","Determina el brillo máximo de cada ráfaga.",r.flashSettings.intensity,0,1,.05,bn,b=>{r={...r,flashSettings:{...r.flashSettings,intensity:b}},vn(r),mn(r)}),f=tr("Volumen maestro","Ajusta el volumen global de la experiencia.",r.masterVolume,0,1,.05,bn,b=>{r={...r,masterVolume:b},vn(r),mn(r)}),g=tr("Volumen música","Equilibra la música de ambiente con los efectos de pelea.",r.musicVolume,0,1,.05,bn,b=>{r={...r,musicVolume:b},vn(r),mn(r)}),x=tr("Volumen SFX","Controla golpes, campanas y respiración.",r.sfxVolume,0,1,.05,bn,b=>{r={...r,sfxVolume:b},vn(r),mn(r)}),m=ba("Alto contraste","Activa textos y contornos más definidos para facilitar la lectura.",r.highContrast,b=>{r={...r,highContrast:b},vn(r),mn(r)}),p=document.createElement("div");p.className="box9-options-content",p.append(a.row,l.row,c.row,u.row,d.row,h.row,f.row,g.row,x.row,m.row);const v=document.createElement("div");v.className="box9-options-footer",v.appendChild(s),t.append(n,i,p,v),e.appendChild(t);const _=()=>{e.classList.remove("visible"),e.setAttribute("aria-hidden","true")};return s.addEventListener("click",_),e.addEventListener("click",b=>{b.target===e&&_()}),t.addEventListener("click",b=>b.stopPropagation()),document.body.appendChild(e),Vs={open:()=>{r=Mr(),a.list.querySelectorAll('input[type="radio"]').forEach(b=>b.checked=b.value===r.cameraPreset),l.input.value=String(r.cameraSensitivity),c.input.checked=r.travelAssist,u.input.checked=r.motionComfort,d.input.value=String(r.flashSettings.frequency),h.input.value=String(r.flashSettings.intensity),f.input.value=String(r.masterVolume),g.input.value=String(r.musicVolume),x.input.value=String(r.sfxVolume),m.input.checked=r.highContrast,d.valueBadge.textContent=bn(r.flashSettings.frequency),h.valueBadge.textContent=bn(r.flashSettings.intensity),l.valueBadge.textContent=Eu(r.cameraSensitivity),f.valueBadge.textContent=bn(r.masterVolume),g.valueBadge.textContent=bn(r.musicVolume),x.valueBadge.textContent=bn(r.sfxVolume),e.classList.add("visible"),e.setAttribute("aria-hidden","false")},close:_,getSettings:()=>r},Vs}function nr(r){const e=document.querySelector(r);if(!e)throw new Error(`No se encontró el elemento obligatorio "${r}".`);return e}function Tu(){const r=nr("[data-box9-hero]"),e=nr("[data-box9-start]"),t=nr("[data-box9-options]"),n=nr("#box9-experience"),i=nr("#canvas-container"),s=nr("#box9-ui-root"),o=yh(Ft);o.setState({progress:Lt(o.getState().progress)}),_h(o);const a=Jy();let l=!1,c=!1;const u=()=>{l||(Zy(s,o),l=!0),r.style.display="none",n.style.display="block"},d=()=>{c||(c=!0,sy(i))},h=()=>{u()},f=()=>{u(),a.open()};e.addEventListener("click",h),t.addEventListener("click",f);const g=(x="seleccion")=>{const m=Lt(o.getState().progress);switch(u(),x){case"seleccion":{d(),window.dispatchEvent(new CustomEvent("box9:start-selection",{detail:{progress:m,unlocks:m.unlocks}}));break}case"bolsa":{d(),window.dispatchEvent(new CustomEvent("box9:start-bag-mode",{detail:{progress:m,unlocks:m.unlocks}}));break}case"dummy":{d(),window.dispatchEvent(new CustomEvent("box9:open-dummy-scene",{detail:{progress:m,unlocks:m.unlocks}}));break}}};window.addEventListener("box9:mode-selected",x=>{const m=x.detail;g((m==null?void 0:m.mode)??"seleccion")}),window.addEventListener("box9:start-selection",()=>{u(),d()})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Tu,{once:!0}):Tu();
