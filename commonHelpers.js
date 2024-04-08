import{a as l,i as n}from"./assets/vendor-db34b893.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();async function c(s){try{return(await l.get("https://pixabay.com/api/",{params:{key:"43289261-b2f679df5fe28faf218337d96",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:15}})).data.hits}catch{throw new Error("Failed to fetch images from Pixabay API")}}function f(){const s=document.querySelector(".gallery");s.innerHTML=""}function d(s){const o=document.querySelector(".gallery");let i="";s.forEach(r=>{i+=`
      <a class="gallery__item" href="${r.largeImageURL}">
        <figure class="gallery__figure">
          <img class="gallery__img" src="${r.webformatURL}" alt="${r.tags}" loading="lazy">
          <figcaption class="gallery__figcaption">
            <div class="gallery__caption">Likes: ${r.likes}</div>
            <div class="gallery__caption">Views: ${r.views}</div>
            <div class="gallery__caption">Comments: ${r.comments}</div>
            <div class="gallery__caption">Downloads: ${r.downloads}</div>
          </figcaption>
        </figure>
      </a>`}),o.innerHTML=i}document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector("#search-form"),o=document.querySelector("#search-input"),i=document.querySelector(".loader");s.addEventListener("submit",async r=>{r.preventDefault();const e=o.value.trim();if(!e){n.error({title:"Error",message:"Please enter a search term",position:"topRight"});return}f(),i.classList.add("visible");try{const t=await c(e);t.length===0?n.info({title:"Info",message:"No images found. Please try again!",position:"topRight"}):d(t)}catch(t){console.error("Error fetching images:",t),n.error({title:"Error",message:"Failed to fetch images. Please try again later.",position:"topRight"})}finally{i.classList.remove("visible")}})});
//# sourceMappingURL=commonHelpers.js.map
