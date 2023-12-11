"use strict";(()=>{var e={};e.id=6885,e.ids=[6885],e.modules={53524:e=>{e.exports=require("@prisma/client")},58802:e=>{e.exports=require("bcrypt")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},56421:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>x,originalPathname:()=>_,patchFetch:()=>q,requestAsyncStorage:()=>f,routeModule:()=>m,serverHooks:()=>g,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>B});var n={};r.r(n),r.d(n,{GET:()=>w,PUT:()=>y});var a=r(10884),i=r(16132),s=r(21040),o=r(75450),u=r(48705),d=r(16247),c=r(11780),p=r(94020),l=r(95798);async function w(e,{params:t}){let r=await (0,p.getServerSession)(o.a);if(!r)return l.Z.json({message:"Unauthorized"},{status:401});if(!await (0,c.sm)({where:{id:r.user.id}}))return l.Z.json({message:"Forbidden"},{status:403});let{id:n}=t,a=await (0,d.WJ)({id:Number(n)}),i=await (0,u.CP)();return l.Z.json({code:200,product:a,categories:i})}async function y(e,{params:t}){let r=await (0,p.getServerSession)(o.a);if(!r)return l.Z.json({message:"Unauthorized"},{status:401});if(!await (0,c.sm)({where:{id:r.user.id}}))return l.Z.json({message:"Forbidden"},{status:403});let n=await e.json(),{id:a}=t;return await (0,d.nM)(Number(a),n),l.Z.json({message:"Обновлено",product:await (0,d.WJ)({id:Number(a)})},{status:200})}let m=new a.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/admin/products/[id]/route",pathname:"/api/admin/products/[id]",filename:"route",bundlePath:"app/api/admin/products/[id]/route"},resolvedPagePath:"/home/artem/www/dinomeat/app/api/admin/products/[id]/route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:f,staticGenerationAsyncStorage:h,serverHooks:g,headerHooks:x,staticGenerationBailout:B}=m,_="/api/admin/products/[id]/route";function q(){return(0,s.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:h})}},75450:(e,t,r)=>{r.d(t,{a:()=>u});var n=r(87839),a=r(11780),i=r(77592),s=r(39448),o=r(56742);let u={adapter:(0,i.N)(n._B),providers:[(0,o.Z)({clientId:"51753302",clientSecret:process.env.VK_SECRET}),(0,s.Z)({id:"credentials",name:"Credentials",credentials:{email:{label:"email",type:"email",required:!0},password:{label:"пароль",type:"password",required:!0}},async authorize(e,t){if(void 0===e)return null;let{email:r,password:n}=e,i=await (0,a.FH)({where:{email:r}});return i&&null!==i.password&&await (0,a.oH)(n,i.password)?(i.password=null,i):null}})],callbacks:{signIn:async({user:e,account:t,profile:r,email:n,credentials:a})=>(null!==t&&(e&&"string"==typeof t.email&&(e.email=t.email,delete t.email),void 0!==t.user_id&&null!==t.user_id&&delete t.user_id),!0),jwt:async({token:e,user:t})=>(t&&(e.id=t.id,e.phone=t.phone),e),session:async({session:e,token:t})=>(t&&e.user&&(e.user.id=t.id,e.user.phone=t.phone),e),redirect:async({url:e,baseUrl:t})=>e.startsWith("/")?`${t}${e}`:new URL(e).origin===t?e:t},session:{strategy:"jwt"}}},87839:(e,t,r)=>{r.d(t,{WZ:()=>n,_B:()=>i,nC:()=>o,sB:()=>s});var n,a=r(53524);let i=new a.PrismaClient;function s(e){return e instanceof a.Prisma.PrismaClientKnownRequestError}function o(e){return"P2002"===e.code?1:0}!function(e){e[e.unknown=0]="unknown",e[e.unique=1]="unique"}(n||(n={}))},48705:(e,t,r)=>{r.d(t,{CP:()=>s,k4:()=>o,k5:()=>i,yr:()=>u});var n=r(87839),a=r(36416);async function i({page:e=1}){let t=await n._B.category.findMany({skip:(e-1)*50,take:50,orderBy:{id:"desc"}}),r=await n._B.category.count();return{categories:t,pagination:(0,a.o)({page:e,limit:50,count:r})}}async function s(e){return n._B.category.findMany(e)}async function o(e){return await n._B.category.create({data:e})}async function u(e,t){return await n._B.category.update({data:t,where:{id:e}})}},36416:(e,t,r)=>{r.d(t,{o:()=>n});function n({page:e,limit:t,count:r,maxPages:n=11}){let a=Math.ceil(r/t),i=1,s=a;if(a>n){let t=Math.floor(n/2),r=e-t,o=e+t;1!=(i=(r<1?1:r)-(o>a?o-a:0))&&(i+=2),(s=(o>a?a:o)+(r<1?1-r:0))!==a&&(s-=2)}return{page:e,last:a,first:1,start:i,end:s,previous:e>1?e-1:1,next:e<a?e+1:a,total:r}}},16247:(e,t,r)=>{r.d(t,{Fv:()=>o,GJ:()=>c,WJ:()=>u,nM:()=>s,ry:()=>i,yC:()=>d});var n=r(87839),a=r(36416);async function i(e){let t=await n._B.product.create({data:{...e}});return t}async function s(e,t){let r=await n._B.product.update({...t,where:{id:e}});return r}async function o({page:e=1}){let t=await n._B.product.findMany({skip:(e-1)*50,take:50,orderBy:{id:"desc"}}),r=await n._B.product.count();return{products:t,pagination:(0,a.o)({page:e,limit:50,count:r})}}async function u({id:e}){let t=await n._B.product.findFirst({include:{images:{include:{image:!0}},seo:{include:{seo:!0}}},where:{id:e}}),r=await n._B.property.findMany({include:{products:{include:{value:!0},where:{productId:e}},values:!0}}),a=await n._B.size.findMany({include:{products:{where:{productId:e}}}});return{...t,properties:r,sizes:a}}function d({query:e}){return n._B.product.findMany({where:{OR:[{name:{contains:e}},{article:{contains:e}}],published:!0},take:10})}function c(e,t){return n._B.productSize.create({data:{sizeId:t,productId:e}})}},11780:(e,t,r)=>{r.d(t,{FH:()=>u,Nq:()=>p,PF:()=>w,oH:()=>d,s5:()=>c,sm:()=>l,y1:()=>o});var n=r(58802),a=r.n(n),i=r(87839),s=r(36416);async function o(e){let t={...e};"string"==typeof t.password&&(t.password=await a().hash(t.password,10));let r=await i._B.user.create({data:t}),n={...r};return n.password=null,n}async function u(e){return await i._B.user.findFirst(e)}async function d(e,t){return await a().compare(e,t)}async function c({page:e=1}){let t=await i._B.user.findMany({skip:(e-1)*50,take:50,orderBy:{id:"desc"}}),r=await i._B.user.count();return{users:t,pagination:(0,s.o)({page:e,limit:50,count:r})}}async function p(e,t){return await i._B.user.update({data:t,where:{id:e}})}async function l(e){return((await u(e))?.isAdmin||!1)??!1}async function w(e){return await i._B.user.findFirstOrThrow({select:{id:!0,name:!0,email:!0,phone:!0},where:{id:e}})}}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[3271,3559,8107],()=>r(56421));module.exports=n})();