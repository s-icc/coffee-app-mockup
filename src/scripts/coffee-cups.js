import * as THREE from 'three';
import gsap from 'gsap';

const colors = { latte: '#9a6e54', matcha: '#819774', cold: '#a8664c' };
const cream = '#f5ecde';

function makeBadge() {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 512;
  const context = canvas.getContext('2d');
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  const image = new Image(); image.src = '/broonic-round.png';
  image.onload = () => { context.clearRect(0, 0, 512, 512); context.save(); context.beginPath(); context.arc(256, 256, 245, 0, Math.PI * 2); context.clip(); context.drawImage(image, 0, 0, 512, 512); context.restore(); texture.needsUpdate = true; };
  return texture;
}

function createCup(tone, type) {
  const cup = new THREE.Group();
  const iced = type === 'Iced' || tone === 'cold';
  const ceramic = new THREE.MeshPhysicalMaterial({ color: cream, roughness: .68, clearcoat: .08 });
  const plastic = new THREE.MeshPhysicalMaterial({ color: '#fff8ea', transparent: true, opacity: .28, roughness: .1, metalness: .02, transmission: .2, depthWrite: false, side: THREE.DoubleSide });
  const body = new THREE.Mesh(new THREE.LatheGeometry([
    new THREE.Vector2(0, -1.1), new THREE.Vector2(.41, -1.1), new THREE.Vector2(.48, -.99),
    new THREE.Vector2(.65, .72), new THREE.Vector2(.66, .82), new THREE.Vector2(.59, .84),
  ], 64), iced ? plastic : ceramic);
  cup.add(body);
  if (iced) {
    const liquid = new THREE.Mesh(new THREE.CylinderGeometry(.58, .43, 1.35, 64), new THREE.MeshPhysicalMaterial({ color: tone === 'matcha' ? '#82916e' : '#a9785c', transparent: true, opacity: .72, roughness: .3 }));
    liquid.position.y = -.37; cup.add(liquid);
    const iceMaterial = new THREE.MeshPhysicalMaterial({ color: '#fffaf0', transparent: true, opacity: .45, roughness: .05 });
    for (const [x,y,z,angle] of [[-.2,.27,.1,.3],[.18,.28,-.1,-.2],[0,.49,.2,.6]]) {
      const ice = new THREE.Mesh(new THREE.BoxGeometry(.27,.24,.24), iceMaterial); ice.position.set(x,y,z); ice.rotation.z = angle; cup.add(ice);
    }
    const lidMaterial = new THREE.MeshPhysicalMaterial({ color: '#f7f3eb', transparent: true, opacity: .65, roughness: .12, side: THREE.DoubleSide });
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(.71,.69,.11,64), lidMaterial); lid.position.y = .88; cup.add(lid);
    const straw = new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,1.37,16), new THREE.MeshStandardMaterial({ color: '#251d1b', roughness: .4 }));
    straw.position.set(.15,1.52,.09); straw.rotation.z = -.16; cup.add(straw);
  } else {
    const coffee = new THREE.Mesh(new THREE.CircleGeometry(.57,64), new THREE.MeshStandardMaterial({ color: tone === 'matcha' ? '#819774' : '#9c6749', roughness: .55 }));
    coffee.rotation.x = -Math.PI/2; coffee.position.y = .835; cup.add(coffee);
    const crema = new THREE.Mesh(new THREE.TorusGeometry(.37,.08,12,64),new THREE.MeshStandardMaterial({color:'#dbc19e',roughness:.7}));
    crema.rotation.x = Math.PI/2; crema.position.y = .842; cup.add(crema);
  }
  const rim = new THREE.Mesh(new THREE.TorusGeometry(.64,.045,12,64), iced ? new THREE.MeshPhysicalMaterial({color:'#fff8ee',transparent:true,opacity:.8,roughness:.16}) : ceramic);
  rim.rotation.x = Math.PI/2; rim.position.y = .83; cup.add(rim);
  if (!iced) {
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(.59,.55,.52,64,1,true),new THREE.MeshStandardMaterial({color:colors[tone]||colors.latte,roughness:.9}));
    sleeve.position.y = -.11; cup.add(sleeve);
  }
  const badge = new THREE.Mesh(new THREE.PlaneGeometry(iced ? .7 : .72, iced ? .7 : .72), new THREE.MeshBasicMaterial({map:makeBadge(),transparent:true,side:THREE.DoubleSide}));
  badge.position.set(0,iced ? -.23 : -.12,iced ? .61 : .61); cup.add(badge);
  cup.rotation.set(.1,-.2,-.065);
  return cup;
}

function createFood(name) {
  const group = new THREE.Group();
  const pastry = new THREE.MeshStandardMaterial({color:'#bf8249',roughness:.88});
  const baked = new THREE.MeshStandardMaterial({color:'#e5b87a',roughness:.85});
  const filling = new THREE.MeshStandardMaterial({color:name.includes('Pistachio')?'#a7ae78':'#f1dec3',roughness:.82});
  if (name.includes('roll')) {
    const roll = new THREE.Mesh(new THREE.TorusGeometry(.67,.31,24,72),pastry); roll.rotation.x = .48; group.add(roll);
    const middle = new THREE.Mesh(new THREE.TorusGeometry(.5,.14,18,72),filling); middle.rotation.x = .48; middle.position.z = .15; group.add(middle);
    const core = new THREE.Mesh(new THREE.SphereGeometry(.22,24,16),baked); core.scale.z=.45; core.position.z=.27; group.add(core);
  } else if (name.includes('cookie')) {
    const cookie = new THREE.Mesh(new THREE.CylinderGeometry(.83,.8,.2,64),pastry); cookie.rotation.x=.3; group.add(cookie);
    for (let i=0;i<12;i++) { const dot=new THREE.Mesh(new THREE.SphereGeometry(.07,12,8),filling); const angle=i*2.4; dot.position.set(Math.cos(angle)*(.2+(i%3)*.18),.13,Math.sin(angle)*(.2+(i%3)*.18)); group.add(dot); }
  } else {
    const breadShape = new THREE.CylinderGeometry(.78,.78,.18,3);
    const bottom = new THREE.Mesh(breadShape,baked); bottom.rotation.set(.2,.42,.15); bottom.position.y=-.2; group.add(bottom);
    const greens = new THREE.Mesh(new THREE.CylinderGeometry(.74,.74,.08,3),new THREE.MeshStandardMaterial({color:'#628051',roughness:.9})); greens.rotation.copy(bottom.rotation); greens.position.y=-.07; group.add(greens);
    const top = new THREE.Mesh(breadShape,pastry); top.rotation.copy(bottom.rotation); top.position.y=.06; group.add(top);
  }
  return group;
}

function createSyrup() {
  const bottle=new THREE.Group();
  const glass=new THREE.MeshPhysicalMaterial({color:'#9d6041',transparent:true,opacity:.8,roughness:.12,clearcoat:.9});
  const body=new THREE.Mesh(new THREE.CylinderGeometry(.42,.45,1.45,48),glass); bottle.add(body);
  const neck=new THREE.Mesh(new THREE.CylinderGeometry(.18,.2,.4,32),glass); neck.position.y=.91; bottle.add(neck);
  const cap=new THREE.Mesh(new THREE.CylinderGeometry(.23,.23,.2,32),new THREE.MeshStandardMaterial({color:'#301b19'})); cap.position.y=1.19; bottle.add(cap);
  const label=new THREE.Mesh(new THREE.PlaneGeometry(.65,.65),new THREE.MeshBasicMaterial({map:makeBadge(),transparent:true})); label.position.z=.44; bottle.add(label);
  return bottle;
}

export function mountCupPreview(host, tone = 'latte', type = 'Hot', name = '') {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'}); }
  catch { return () => {}; }
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1,2)); renderer.setClearColor(0x000000,0); renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.replaceChildren(renderer.domElement); host.classList.add('is-ready');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35,1,.1,100); camera.position.set(0,.3,5.6); camera.lookAt(0,.3,0);
  scene.add(new THREE.HemisphereLight('#fffaf0','#76533e',2.4));
  const key = new THREE.DirectionalLight('#ffffff',3.2); key.position.set(-3,5,5); scene.add(key);
  const fill = new THREE.DirectionalLight('#ead0b2',1.3); fill.position.set(3,2,-2); scene.add(fill);
  const cup = type === 'Food' ? createFood(name) : type === 'Add-on' ? createSyrup() : createCup(tone,type); scene.add(cup);
  const render = () => renderer.render(scene,camera);
  const resize = () => { const rect = host.getBoundingClientRect(); if (!rect.width || !rect.height) return; renderer.setSize(rect.width,rect.height,false); camera.aspect = rect.width/rect.height; camera.updateProjectionMatrix(); render(); };
  const observer = new ResizeObserver(resize); observer.observe(host); resize();
  let frame, active = true, dragging = false, moved = false, startX = 0, startY = 0;
  const loop = () => { if (!active) return; render(); frame = requestAnimationFrame(loop); }; loop();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const floatTween = reduced ? null : gsap.to(cup.position,{y:.11,duration:2.4,repeat:-1,yoyo:true,ease:'sine.inOut'});
  const move = event => {
    const rect = host.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    if (dragging) moved = moved || Math.abs(event.clientX-startX)+Math.abs(event.clientY-startY)>6;
    gsap.to(cup.rotation,{x:.1-y*.5,y:-.2+x*1.5,duration:dragging?.12:.55,ease:'power2.out',overwrite:true});
  };
  const down = event => { dragging = true; moved = false; startX = event.clientX; startY = event.clientY; host.setPointerCapture?.(event.pointerId); };
  const up = () => { dragging = false; if (moved) { const link=host.closest('a'); if (link) link.addEventListener('click',e=>e.preventDefault(),{once:true,capture:true}); } };
  const leave = () => { if (!dragging) gsap.to(cup.rotation,{x:.1,y:-.2,duration:.8,ease:'power2.out',overwrite:true}); };
  host.addEventListener('pointermove',move); host.addEventListener('pointerdown',down); host.addEventListener('pointerup',up); host.addEventListener('pointerleave',leave);
  return () => { active=false; cancelAnimationFrame(frame); observer.disconnect(); floatTween?.kill(); gsap.killTweensOf(cup.rotation); cup.traverse(object => { if (!object.isMesh) return; object.geometry?.dispose(); for (const material of [object.material].flat()) { material?.map?.dispose(); material?.dispose(); } }); renderer.dispose(); host.removeEventListener('pointermove',move); host.removeEventListener('pointerdown',down); host.removeEventListener('pointerup',up); host.removeEventListener('pointerleave',leave); host.replaceChildren(); host.classList.remove('is-ready'); };
}

export function mountCoffeeCups() {
  document.querySelectorAll('[data-cup-3d]').forEach(host => mountCupPreview(host,host.dataset.tone,host.dataset.type));
}
