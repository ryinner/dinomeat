exports.id=5512,exports.ids=[5512],exports.modules={5640:(e,t,n)=>{Promise.resolve().then(n.bind(n,91859)),Promise.resolve().then(n.t.bind(n,67490,23))},98243:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,53579,23)),Promise.resolve().then(n.t.bind(n,30619,23)),Promise.resolve().then(n.t.bind(n,81459,23)),Promise.resolve().then(n.t.bind(n,13456,23)),Promise.resolve().then(n.t.bind(n,50847,23)),Promise.resolve().then(n.t.bind(n,57303,23))},44556:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var a=n(53854),r=n(66044),i=n(52486),s=n(24599),o=n.n(s);function l({className:e,...t}){let n=`${o().icon} ${e}`;return a.jsx(i.G,{className:n,icon:r.r8p,...t})}},7200:(e,t,n)=>{"use strict";n.d(t,{Z:()=>l});var a=n(53854),r=n(78053),i=n(52486),s=n(24599),o=n.n(s);function l({className:e,...t}){let n=`${o().icon} ${e}`;return a.jsx(i.G,{className:n,icon:r.r6l,...t})}},70956:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>c});var a=n(53854),r=n(75548),i=n.n(r),s=n(51018),o=n(89268),l=n.n(o);function c({page:e,last:t,first:n,start:r,end:o,className:c}){let u=(0,s.usePathname)(),d=(0,s.useSearchParams)(),m=d.toString().replace(/page=[\w]/gi,"");if(t===n||0===t)return a.jsx(a.Fragment,{});let p=[];r!==n&&p.push({page:n},{page:"..."});for(let e=r;e<=o;e++)p.push({page:e});return t!==o&&p.push({page:"..."},{page:t}),a.jsx("div",{className:c,children:a.jsx("ul",{className:l().pagination,children:p.map(t=>a.jsx("li",{children:"string"==typeof t.page?a.jsx("span",{children:t.page}):a.jsx(i(),{className:`${l().pagination__link} ${t.page===e?l()["pagination__link--active"]:""}`,href:`${u}?page=${t.page}${m.trim()?`&${m}`:""}`,children:t.page})},t.page))})})}},91859:(e,t,n)=>{"use strict";n.r(t),n.d(t,{TheProviders:()=>s});var a=n(53854),r=n(66609),i=n(45166);function s({children:e}){return a.jsx(a.Fragment,{children:(0,a.jsxs)(r.SessionProvider,{children:[e,a.jsx(i.ToastContainer,{hideProgressBar:!0,theme:"dark",autoClose:3e3})]})})}n(45996)},61505:(e,t,n)=>{"use strict";n.d(t,{O:()=>r,R:()=>i});var a=n(34218);function r(e){let[t,n]=(0,a.useState)(e);return(0,a.useEffect)(()=>{n(()=>e)},[e]),[t,n]}function i(e,t){let[n,r]=(0,a.useState)(e),i=(0,a.useCallback)(e=>{e instanceof Function&&(e=e(n)),localStorage.setItem(t,JSON.stringify(e)),r(e)},[t,n]);return(0,a.useEffect)(()=>{try{r(JSON.parse(localStorage.getItem(t)??""))}catch{r(e)}},[e,t]),[n,i]}},75548:(e,t,n)=>{"use strict";e.exports=n(67490)},51018:(e,t,n)=>{"use strict";e.exports=n(27804)},18635:(e,t,n)=>{"use strict";n.d(t,{W:()=>r,r:()=>i});var a=n(45166);async function r(e,t={}){return new Promise(async(n,a)=>{e.includes("http")||(e="http://node.local"+e);try{let r=await fetch(e,t);r.ok?n(await r.json()):a(r)}catch(e){if(e instanceof Error&&"AbortError"!==e.name)throw e}})}async function i(...e){return new Promise(async(t,n)=>{let[i,s,o]=e;r(i,s).then(e=>{o?.withMessage&&(0,a.toast)(e.message??"Успешно"),t(e)}).catch(async e=>{if(404===e.status);else{let t=await e.json();(0,a.toast)(t.message)}})})}},9264:e=>{e.exports={background:"layout_background__ogNue",main:"layout_main__tsVQ4"}},24599:e=>{e.exports={icon:"Icon_icon__goJ4H"}},89268:e=>{e.exports={pagination:"Pagination_pagination__MQWKm",pagination__link:"Pagination_pagination__link__IT2AS","pagination__link--active":"Pagination_pagination__link--active__CNTkC"}},30452:e=>{e.exports={header:"ThePrivateHeader_header___ZbMU"}},94963:e=>{e.exports={nav:"ThePrivateNavigation_nav__s_hoj","nav-list":"ThePrivateNavigation_nav-list__jAP8K","nav-item":"ThePrivateNavigation_nav-item__qvQB0"}},72355:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>b});var a=n(4656),r=n(76983),i=n.n(r),s=n(75450),o=n(11780),l=n(94020),c=n(41412);async function u({children:e}){let t=await (0,l.getServerSession)(s.a);t||(0,c.redirect)("/");let n=await (0,o.FH)({where:{id:t.user.id}});return n&&n?.isAdmin||(0,c.redirect)("/"),a.jsx(a.Fragment,{children:e})}function d(){return a.jsx("footer",{})}n(3542);var m=n(30452),p=n.n(m),h=n(24353),g=n.n(h),f=n(94963),v=n.n(f);let _=[{label:"Пользователи",link:""},{label:"Категории",link:"/categories"},{label:"Параметры",link:"/properties"},{label:"Продукты",link:"/products"}];function w(){return a.jsx("nav",{className:v().nav,children:a.jsx("ul",{className:v()["nav-list"],children:_.map(e=>a.jsx("li",{children:a.jsx(g(),{className:v()["nav-item"],href:"/admin"+e.link,children:e.label})},e.label))})})}function x(){return a.jsx("header",{className:p().header,children:a.jsx(w,{})})}var P=n(43100);n(43440);var y=n(9264),j=n.n(y);function b({children:e}){return a.jsx("html",{lang:"ru",className:j().background,children:a.jsx("body",{className:i().className,children:a.jsx(P.h,{children:(0,a.jsxs)(u,{children:[a.jsx(x,{}),a.jsx("main",{className:j().main,children:e}),a.jsx(d,{})]})})})})}},69809:(e,t,n)=>{"use strict";n.d(t,{ZP:()=>l});var a=n(95153);let r=(0,a.createProxy)(String.raw`/home/artem/www/dinomeat/components/Pagination/Pagination.tsx`),{__esModule:i,$$typeof:s}=r,o=r.default,l=o},43100:(e,t,n)=>{"use strict";n.d(t,{h:()=>o});var a=n(95153);let r=(0,a.createProxy)(String.raw`/home/artem/www/dinomeat/components/TheProviders/TheProviders.tsx`),{__esModule:i,$$typeof:s}=r;r.default;let o=(0,a.createProxy)(String.raw`/home/artem/www/dinomeat/components/TheProviders/TheProviders.tsx#TheProviders`)},75450:(e,t,n)=>{"use strict";n.d(t,{a:()=>l});var a=n(87839),r=n(11780),i=n(77592),s=n(39448),o=n(56742);let l={adapter:(0,i.N)(a._B),providers:[(0,o.Z)({clientId:"51753302",clientSecret:process.env.VK_SECRET}),(0,s.Z)({id:"credentials",name:"Credentials",credentials:{email:{label:"email",type:"email",required:!0},password:{label:"пароль",type:"password",required:!0}},async authorize(e,t){if(void 0===e)return null;let{email:n,password:a}=e,i=await (0,r.FH)({where:{email:n}});return i&&null!==i.password&&await (0,r.oH)(a,i.password)?(i.password=null,i):null}})],callbacks:{signIn:async({user:e,account:t,profile:n,email:a,credentials:r})=>(null!==t&&(e&&"string"==typeof t.email&&(e.email=t.email,delete t.email),void 0!==t.user_id&&null!==t.user_id&&delete t.user_id),!0),jwt:async({token:e,user:t})=>(t&&(e.id=t.id,e.phone=t.phone),e),session:async({session:e,token:t})=>(t&&e.user&&(e.user.id=t.id,e.user.phone=t.phone),e),redirect:async({url:e,baseUrl:t})=>e.startsWith("/")?`${t}${e}`:new URL(e).origin===t?e:t},session:{strategy:"jwt"}}},87839:(e,t,n)=>{"use strict";n.d(t,{WZ:()=>a,_B:()=>i,nC:()=>o,sB:()=>s});var a,r=n(53524);let i=new r.PrismaClient;function s(e){return e instanceof r.Prisma.PrismaClientKnownRequestError}function o(e){return"P2002"===e.code?1:0}!function(e){e[e.unknown=0]="unknown",e[e.unique=1]="unique"}(a||(a={}))},36416:(e,t,n)=>{"use strict";function a({page:e,limit:t,count:n,maxPages:a=11}){let r=Math.ceil(n/t),i=1,s=r;if(r>a){let t=Math.floor(a/2),n=e-t,o=e+t;1!=(i=(n<1?1:n)-(o>r?o-r:0))&&(i+=2),(s=(o>r?r:o)+(n<1?1-n:0))!==r&&(s-=2)}return{page:e,last:r,first:1,start:i,end:s,previous:e>1?e-1:1,next:e<r?e+1:r,total:n}}n.d(t,{o:()=>a})},11780:(e,t,n)=>{"use strict";n.d(t,{FH:()=>l,Nq:()=>d,PF:()=>p,oH:()=>c,s5:()=>u,sm:()=>m,y1:()=>o});var a=n(58802),r=n.n(a),i=n(87839),s=n(36416);async function o(e){let t={...e};"string"==typeof t.password&&(t.password=await r().hash(t.password,10));let n=await i._B.user.create({data:t}),a={...n};return a.password=null,a}async function l(e){return await i._B.user.findFirst(e)}async function c(e,t){return await r().compare(e,t)}async function u({page:e=1}){let t=await i._B.user.findMany({skip:(e-1)*50,take:50,orderBy:{id:"desc"}}),n=await i._B.user.count();return{users:t,pagination:(0,s.o)({page:e,limit:50,count:n})}}async function d(e,t){return await i._B.user.update({data:t,where:{id:e}})}async function m(e){return((await l(e))?.isAdmin||!1)??!1}async function p(e){return await i._B.user.findFirstOrThrow({select:{id:!0,name:!0,email:!0,phone:!0},where:{id:e}})}},57481:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});var a=n(31323);let r=e=>{let t=(0,a.fillMetadataSegment)(".",e.params,"favicon.ico");return[{type:"image/x-icon",sizes:"16x16",url:t+""}]}},4998:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});var a=n(31323);let r=e=>{let t=(0,a.fillMetadataSegment)(".",e.params,"icon.png");return[{type:"image/png",sizes:"32x32",url:t+"?d655f4a34c95ecf1"}]}},43440:()=>{}};