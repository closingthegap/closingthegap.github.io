import{_ as $}from"../chunks/C1FmrZbK.js";import{s as k,n as u,o as E,b as F,d as D}from"../chunks/DnlpFiKk.js";import{S as I,i as P,d as l,a as _,b as S,k as v,l as L,g as M,c as x,e as w,j as V,h as y}from"../chunks/BCobgH-w.js";import{b as O}from"../chunks/CRHY8fE_.js";import{f as T}from"../chunks/BzKIv0RX.js";import{e as z}from"../chunks/CS_KNjmO.js";function A(c){let n,o,e;return{c(){n=V(),o=y("div"),e=y("div"),this.h()},l(t){L("svelte-1w6dn8w",document.head).forEach(l),n=M(t),o=x(t,"DIV",{class:!0});var p=w(o);e=x(p,"DIV",{class:!0}),w(e).forEach(l),p.forEach(l),this.h()},h(){document.title="Closing the Gap in Non-Latin-Script Data – Map",v(e,"class","h-[34rem] rounded-md font-normal"),v(o,"class","mx-auto max-w-6xl px-4")},m(t,a){_(t,n,a),_(t,o,a),S(o,e),c[1](e)},p:u,i:u,o:u,d(t){t&&(l(n),l(o)),c[1](null)}}}function C(c,n,o){let e,t;const a={};E(async()=>{const i=await $(()=>import("../chunks/DTmlu4rB.js").then(s=>s.l),[],import.meta.url);t=i.map(e).setView([51.53443,9.93228],5),i.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(t);const b=z;for(const[s,r]of b){const f=T(r.project.places),d=s.split("/").pop().replace(/\.json$/,""),g=`${O}/entry/#${d}`;for(const m of f){const h=m.coordinates.lat.split(".")[0]+m.coordinates.lng.split(".")[0];if(a[h])a[h].projects.push({title:r.project.title,url:g});else{const j={lat:m.coordinates.lat,lng:m.coordinates.lng,projects:[{title:r.project.title,url:g}]};a[h]=j}}}for(const[,s]of Object.entries(a)){const r=s.projects.map(d=>`<a
							href=${d.url}
							class="font-fira">${d.title}</a
						>`).join('<hr class="my-1.5" />'),f=i.divIcon({html:`
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
						fill="rgba(0, 0, 0,1)">${s.projects.length}</text
					>
				</svg>
				`,className:"font-fira text-[13px]",iconSize:[32,48],iconAnchor:[16,48]});i.marker([s.lat,s.lng],{icon:f}).addTo(t).bindPopup(r,{maxHeight:250,maxWidth:250})}}),F(()=>{t&&t.remove()});function p(i){D[i?"unshift":"push"](()=>{e=i,o(0,e)})}return[e,p]}class U extends I{constructor(n){super(),P(this,n,C,A,k,{})}}export{U as component};
