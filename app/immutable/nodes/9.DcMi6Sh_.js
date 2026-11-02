const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../chunks/DDQqcI1E.js","../chunks/XKyaHtl9.js"])))=>i.map(i=>d[i]);
import{r as e}from"../chunks/XKyaHtl9.js";import{$ as t,D as n,F as r,J as i,R as a,U as o,V as s,Y as c,b as l,et as u,h as d,k as f,o as p,rt as m,s as h,x as g}from"../chunks/sH835yLk.js";import"../chunks/D8RwEQkQ.js";import{t as _}from"../chunks/Cyt8LZpN.js";import"../chunks/BPVwp-J3.js";import{n as v}from"../chunks/N2UBLLdM.js";import{t as y}from"../chunks/P1Au40s-.js";import{t as b}from"../chunks/CRzLMJPS.js";var x=f(`<div class="mx-auto max-w-6xl px-4"><div class="h-[34rem] rounded-md font-normal"></div></div>`);function S(f,S){u(S,!1);let C=i(),w,T={};g(async()=>{let t=await b(()=>import(`../chunks/DDQqcI1E.js`).then(t=>e(t.default)),__vite__mapDeps([0,1]),import.meta.url);w=t.map(r(C)).setView([51.53443,9.93228],5),t.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{attribution:`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}).addTo(w);let n=y;for(let[e,t]of n){let n=v(t.project.places),r=e.split(`/`).pop().replace(/\.json$/,``),i=`${_(`/entry`)}/#${r}`;for(let e of n){let n=e.coordinates.lat.split(`.`)[0]+e.coordinates.lng.split(`.`)[0];if(T[n])T[n].projects.push({title:t.project.title,url:i});else{let r={lat:e.coordinates.lat,lng:e.coordinates.lng,projects:[{title:t.project.title,url:i}]};T[n]=r}}}for(let[,e]of Object.entries(T)){let n=e.projects.map(e=>`<a
							href=${e.url}
							class="font-fira">${e.title}</a
						>`).join(`<hr class="my-1.5" />`),r=t.divIcon({html:`
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 48">
					<path
						d="m1 16 15 30 15-30a8 8 0 0 0-30 0Z"
						stroke-width="2"
						stroke="#06F"
						fill="#06F"
						fill-opacity=".4"
					/>
					<circle cx="16" cy="16" r="10" fill="#FFF" stroke="#06F" />
					<text
						text-anchor="middle"
						x="16"
						y="20"
						fill="rgba(0, 0, 0,1)">${e.projects.length}</text
					>
				</svg>
				`,className:`font-fira text-[13px]`,iconSize:[32,48],iconAnchor:[16,48]});t.marker([e.lat,e.lng],{icon:r}).addTo(w).bindPopup(n,{maxHeight:250,maxWidth:250})}}),l(()=>{w&&w.remove()}),p();var E=x();d(`w85nl5`,e=>{a(()=>{s.title=`Closing the Gap in Non-Latin-Script Data – Map`})});var D=o(E);h(D,e=>c(C,e),()=>r(C)),m(E),n(f,E),t()}export{S as component};