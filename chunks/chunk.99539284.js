import{i,m as c,a as p}from"./chunk.1bf47f54.js";const m=await fetch("../locations-by-latlong.json"),r=await m.json(),d=s=>{s.setView([-28,24.5],6)},j=i("map",d);Object.entries(r).forEach(([s,o])=>{const t=o.reduce((n,a)=>({...n,[a.name]:[...n[a.name]||[],a]}),{});c(s.split(","),{icon:p}).addTo(j).bindPopup(Object.entries(t).map(([n,a])=>`<p>${n} - ${a.map(e=>`<a href="../trials/${e.caseId}/">#${e.caseId}</a>`).join(", ")}</p>`).join(""))});
