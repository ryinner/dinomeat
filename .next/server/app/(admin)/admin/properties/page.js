(()=>{var e={};e.id=5633,e.ids=[5633],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},58802:e=>{"use strict";e.exports=require("bcrypt")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},71017:e=>{"use strict";e.exports=require("path")},63477:e=>{"use strict";e.exports=require("querystring")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},44518:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>c,originalPathname:()=>p,pages:()=>d,routeModule:()=>m,tree:()=>u});var i=r(67096),n=r(16132),s=r(37284),a=r.n(s),o=r(32564),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let u=["",{children:["(admin)",{children:["admin",{children:["properties",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,16281)),"/home/artem/www/dinomeat/app/(admin)/admin/properties/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,72355)),"/home/artem/www/dinomeat/app/(admin)/admin/layout.tsx"]}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e),async e=>(await Promise.resolve().then(r.bind(r,4998))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,9291,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e),async e=>(await Promise.resolve().then(r.bind(r,4998))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/home/artem/www/dinomeat/app/(admin)/admin/properties/page.tsx"],p="/(admin)/admin/properties/page",c={require:r,loadChunk:()=>Promise.resolve()},m=new i.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/(admin)/admin/properties/page",pathname:"/admin/properties",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},13131:(e,t,r)=>{Promise.resolve().then(r.bind(r,70956)),Promise.resolve().then(r.bind(r,41266))},62939:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var i=r(53854);r(34218);var n=r(10892),s=r.n(n);function a({children:e,className:t,...r}){let n=`${s().button} ${t??""}`;return i.jsx("button",{className:n,...r,children:e})}},20457:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var i=r(53854),n=r(78053),s=r(52486),a=r(24599),o=r.n(a);function l({className:e,...t}){let r=`${o().icon} ${e}`;return i.jsx(s.G,{className:r,icon:n.Xcf,...t})}},18622:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var i=r(53854),n=r(78053),s=r(52486),a=r(24599),o=r.n(a);function l({className:e,...t}){let r=`${o().icon} ${e}`;return i.jsx(s.G,{className:r,icon:n.Vui,...t})}},41266:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>v});var i=r(53854),n=r(44556),s=r(7200),a=r(61505),o=r(18635),l=r(34218),u=r(62939),d=r(20457),p=r(18622),c=r(67154),m=r.n(c);function x({value:e,onUpdate:t,onRemove:r}){let[n,a]=(0,l.useState)(!1),[u,c]=(0,l.useState)(e.value);return i.jsx("div",{className:m().value,children:n?(0,i.jsxs)(i.Fragment,{children:[i.jsx("input",{value:u,onInput:e=>{e.target instanceof HTMLInputElement&&c(e.target.value)}})," ",i.jsx(s.Z,{onClick:()=>{(0,o.r)(`/api/admin/values/${e.id}`,{method:"PUT",body:JSON.stringify({value:u})},{withMessage:!0}).then(()=>{a(!1),t({...e,value:u})})}})]}):(0,i.jsxs)(i.Fragment,{children:[e.value," ",i.jsx(d.Z,{onClick:()=>{a(!0)}})," ",i.jsx(p.Z,{onClick:()=>{(0,o.r)(`/api/admin/values/${e.id}`,{method:"DELETE"},{withMessage:!0}).then(()=>{r(e)})}})]})})}function h({property:e,onUpdate:t}){let[r,a]=(0,l.useState)(!1),[p,c]=(0,l.useState)(e.name),[m,h]=(0,l.useState)(null),v=r=>{(0,o.r)(`/api/admin/properties/${e.id}`,{method:"PUT",body:JSON.stringify(r)},{withMessage:!0}).then(e=>{a(!1),t(e.property)})},j=r=>{t({...e,values:e.values.map(e=>e.id===r.id?r:e)})},g=r=>{t({...e,values:e.values.filter(e=>e.id!==r.id)})};return(0,i.jsxs)("tr",{children:[i.jsx("td",{children:e.id}),i.jsx("td",{children:r?i.jsx("input",{value:p,onInput:e=>{e.target instanceof HTMLInputElement&&c(e.target.value)}}):e.name}),(0,i.jsxs)("td",{children:[e.values.map(e=>i.jsx(x,{value:e,onUpdate:j,onRemove:g},e.id)),null===m?i.jsx(n.Z,{onClick:e=>{h("")}}):(0,i.jsxs)(i.Fragment,{children:[i.jsx("input",{value:m,onInput:e=>{h(e.target.value)}})," ",i.jsx(s.Z,{onClick:()=>{(0,o.W)(`/api/admin/properties/${e.id}`,{method:"PUT",body:JSON.stringify({values:{create:[{value:m}]}})}).then(e=>{h(null),t(e.property)})}})]})]}),i.jsx("td",{children:i.jsx(u.Z,{onClick:()=>{v({isFilter:!e.isFilter})},children:e.isFilter?"Убрать":"Добавить"})}),i.jsx("td",{children:r?i.jsx(s.Z,{onClick:()=>{v({name:p})}}):i.jsx(d.Z,{onClick:()=>{a(!0)}})})]})}function v({properties:e}){let[t,r]=(0,a.O)(e),[u,d]=(0,l.useState)(null),p=e=>{r(()=>t.map(t=>t.id===e.id?e:t))};return(0,i.jsxs)("table",{children:[i.jsx("thead",{children:(0,i.jsxs)("tr",{children:[i.jsx("th",{style:{width:"5%"},children:"Id"}),i.jsx("th",{style:{width:"30%"},children:"Наименование"}),i.jsx("th",{style:{width:"50%"},children:"Значения"}),i.jsx("th",{style:{width:"10%"},children:"В фильтре"}),i.jsx("th",{style:{width:"5%"},children:null===u?i.jsx(n.Z,{onClick:()=>{null===u&&d("")}}):(0,i.jsxs)(i.Fragment,{children:[i.jsx("input",{value:u,onInput:e=>{e.target instanceof HTMLInputElement&&d(e.target.value)}}),i.jsx(s.Z,{onClick:()=>{(0,o.r)("/api/admin/properties",{method:"POST",body:JSON.stringify({name:u})},{withMessage:!0}).then(e=>{r([e.property,...t]),d(null)})}})]})})]})}),i.jsx("tbody",{children:t.map(e=>i.jsx(h,{property:e,onUpdate:p},e.id))})]})}},10892:e=>{e.exports={button:"Button_button__OFOdO"}},67154:e=>{e.exports={value:"ValuePin_value__1MOIR"}},16281:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c,metadata:()=>p});var i=r(4656),n=r(69809),s=r(95153);let a=(0,s.createProxy)(String.raw`/home/artem/www/dinomeat/components/Private/Properties/PropertiesTable.tsx`),{__esModule:o,$$typeof:l}=a,u=a.default;var d=r(66374);let p={title:"Параметры",description:"Страница редактирования параметров"};async function c({searchParams:e}){let{properties:t,pagination:r}=await (0,d.aO)({page:Number(e.page??1)});return(0,i.jsxs)(i.Fragment,{children:[i.jsx(u,{properties:t}),i.jsx(n.ZP,{...r})]})}},66374:(e,t,r)=>{"use strict";r.d(t,{G3:()=>s,aO:()=>o,bv:()=>a});var i=r(87839),n=r(36416);async function s(e){return await i._B.property.create({data:e,include:{values:!0}})}async function a(e,t){return await i._B.property.update({data:t,where:{id:e},include:{values:!0}})}async function o({page:e=1}){let t=await i._B.property.findMany({skip:(e-1)*50,take:50,orderBy:{id:"desc"},include:{values:!0}}),r=await i._B.property.count();return{properties:t,pagination:(0,n.o)({page:e,limit:50,count:r})}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[3271,3559,6673,2802,2198,5512],()=>r(44518));module.exports=i})();