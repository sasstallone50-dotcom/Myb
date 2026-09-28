document.querySelector('#year').textContent=new Date().getFullYear();

// Paint the introduction red first, then white while it travels up the screen.
const textBlocks=document.querySelectorAll('.scroll-colour');
for(const block of textBlocks){
  const text=block.textContent;block.setAttribute('aria-label',text);
  const fragment=document.createDocumentFragment();
  text.split(/(\s+)/).forEach(part=>{if(!part.trim())return fragment.append(document.createTextNode(part));const word=document.createElement('span');word.className='scroll-word';word.textContent=part;word.setAttribute('aria-hidden','true');fragment.append(word)});
  block.replaceChildren(fragment);
}
const clamp=value=>Math.min(1,Math.max(0,value));let queued=false;
function paintIntro(){queued=false;const viewport=innerHeight;textBlocks.forEach(block=>{const progress=clamp((viewport*.93-block.getBoundingClientRect().top)/(viewport*.45));const words=block.querySelectorAll('.scroll-word');words.forEach((word,index)=>{const offset=words.length>1?index/(words.length-1)*.25:0;const appear=clamp((progress-offset)/.18);const white=clamp((progress-offset-.18)/.48);word.style.setProperty('--word-opacity',appear.toFixed(3));word.style.setProperty('--word-g',String(Math.round(55+189*white)));word.style.setProperty('--word-b',String(Math.round(72+169*white)));word.style.setProperty('--word-y',`${((1-appear)*12).toFixed(1)}px`)})})}
function requestPaint(){if(!queued){queued=true;requestAnimationFrame(paintIntro)}}
addEventListener('scroll',requestPaint,{passive:true});addEventListener('resize',requestPaint,{passive:true});paintIntro();
