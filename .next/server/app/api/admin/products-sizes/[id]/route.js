"use strict";(()=>{var e={};e.id=4831,e.ids=[4831],e.modules={53524:e=>{e.exports=require("@prisma/client")},58802:e=>{e.exports=require("bcrypt")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},39491:e=>{e.exports=require("assert")},14300:e=>{e.exports=require("buffer")},6113:e=>{e.exports=require("crypto")},82361:e=>{e.exports=require("events")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},63477:e=>{e.exports=require("querystring")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},59796:e=>{e.exports=require("zlib")},21669:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>q,originalPathname:()=>v,patchFetch:()=>_,requestAsyncStorage:()=>f,routeModule:()=>h,serverHooks:()=>x,staticGenerationAsyncStorage:()=>y,staticGenerationBailout:()=>g});var s={};t.r(s),t.d(s,{DELETE:()=>m,PUT:()=>w});var a=t(10884),i=t(16132),n=t(21040),o=t(75450),u=t(87839);async function d(e,r){return await u._B.productSize.update({...r,where:{id:e}})}var p=t(11780),c=t(94020),l=t(95798);async function m(e,{params:{id:r}}){var t;let s=await (0,c.getServerSession)(o.a);return s?await (0,p.sm)({where:{id:s.user.id}})?(await (t=Number(r),u._B.productSize.delete({where:{id:t}})),l.Z.json({message:"Сохранено"})):l.Z.json({message:"Forbidden"},{status:403}):l.Z.json({message:"Unauthorized"},{status:401})}async function w(e,{params:{id:r}}){let t=await (0,c.getServerSession)(o.a);if(!t)return l.Z.json({message:"Unauthorized"},{status:401});if(!await (0,p.sm)({where:{id:t.user.id}}))return l.Z.json({message:"Forbidden"},{status:403});let s=await e.json();return await d(Number(r),{data:s}),l.Z.json({message:"Сохранено"})}let h=new a.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/admin/products-sizes/[id]/route",pathname:"/api/admin/products-sizes/[id]",filename:"route",bundlePath:"app/api/admin/products-sizes/[id]/route"},resolvedPagePath:"/home/artem/www/dinomeat/app/api/admin/products-sizes/[id]/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:f,staticGenerationAsyncStorage:y,serverHooks:x,headerHooks:q,staticGenerationBailout:g}=h,v="/api/admin/products-sizes/[id]/route";function _(){return(0,n.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:y})}},75450:(e,r,t)=>{t.d(r,{a:()=>u});var s=t(87839),a=t(11780),i=t(77592),n=t(39448),o=t(56742);let u={adapter:(0,i.N)(s._B),providers:[(0,o.Z)({clientId:"51753302",clientSecret:process.env.VK_SECRET}),(0,n.Z)({id:"credentials",name:"Credentials",credentials:{email:{label:"email",type:"email",required:!0},password:{label:"пароль",type:"password",required:!0}},async authorize(e,r){if(void 0===e)return null;let{email:t,password:s}=e,i=await (0,a.FH)({where:{email:t}});return i&&null!==i.password&&await (0,a.oH)(s,i.password)?(i.password=null,i):null}})],callbacks:{signIn:async({user:e,account:r,profile:t,email:s,credentials:a})=>(null!==r&&(e&&"string"==typeof r.email&&(e.email=r.email,delete r.email),void 0!==r.user_id&&null!==r.user_id&&delete r.user_id),!0),jwt:async({token:e,user:r})=>(r&&(e.id=r.id,e.phone=r.phone),e),session:async({session:e,token:r})=>(r&&e.user&&(e.user.id=r.id,e.user.phone=r.phone),e),redirect:async({url:e,baseUrl:r})=>e.startsWith("/")?`${r}${e}`:new URL(e).origin===r?e:r},session:{strategy:"jwt"}}},87839:(e,r,t)=>{t.d(r,{WZ:()=>s,_B:()=>i,nC:()=>o,sB:()=>n});var s,a=t(53524);let i=new a.PrismaClient;function n(e){return e instanceof a.Prisma.PrismaClientKnownRequestError}function o(e){return"P2002"===e.code?1:0}!function(e){e[e.unknown=0]="unknown",e[e.unique=1]="unique"}(s||(s={}))},36416:(e,r,t)=>{t.d(r,{o:()=>s});function s({page:e,limit:r,count:t,maxPages:s=11}){let a=Math.ceil(t/r),i=1,n=a;if(a>s){let r=Math.floor(s/2),t=e-r,o=e+r;1!=(i=(t<1?1:t)-(o>a?o-a:0))&&(i+=2),(n=(o>a?a:o)+(t<1?1-t:0))!==a&&(n-=2)}return{page:e,last:a,first:1,start:i,end:n,previous:e>1?e-1:1,next:e<a?e+1:a,total:t}}},11780:(e,r,t)=>{t.d(r,{FH:()=>u,Nq:()=>c,PF:()=>m,oH:()=>d,s5:()=>p,sm:()=>l,y1:()=>o});var s=t(58802),a=t.n(s),i=t(87839),n=t(36416);async function o(e){let r={...e};"string"==typeof r.password&&(r.password=await a().hash(r.password,10));let t=await i._B.user.create({data:r}),s={...t};return s.password=null,s}async function u(e){return await i._B.user.findFirst(e)}async function d(e,r){return await a().compare(e,r)}async function p({page:e=1}){let r=await i._B.user.findMany({skip:(e-1)*50,take:50,orderBy:{id:"desc"}}),t=await i._B.user.count();return{users:r,pagination:(0,n.o)({page:e,limit:50,count:t})}}async function c(e,r){return await i._B.user.update({data:r,where:{id:e}})}async function l(e){return((await u(e))?.isAdmin||!1)??!1}async function m(e){return await i._B.user.findFirstOrThrow({select:{id:!0,name:!0,email:!0,phone:!0},where:{id:e}})}}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[3271,3559,8107],()=>t(21669));module.exports=s})();