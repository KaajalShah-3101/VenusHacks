import { useEffect, useState } from "react";
import Nor from "./Nor";

export default function FlyingNor() {
const [t, setT] = useState(0);
const [trail, setTrail] = useState([]);

useEffect(() => {
let start = null;


function animate(timestamp) {
  if (!start) start = timestamp;

  const progress = Math.min((timestamp - start) / 4000, 1);
  setT(progress);

  const pos = getPath(progress);

  // ✨ sparkle trail
  setTrail((prev) => [
    ...prev.slice(-120),
    { ...pos, id: Math.random() }
  ]);

  if (progress < 1) {
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);


}, []);

// 🌍 RESPONSIVE PATH (scales to screen)
function getPath(t) {
const width = window.innerWidth;
const height = window.innerHeight;


const x = width * (0.05 + 0.55 * t); // horizontal movement
const y =
  height * (0.05 + 0.75 * t) + // vertical movement
  height * 0.15 * Math.sin(t * Math.PI * 1.5); // floaty curve

return { x, y };


}

const pos = getPath(t);

return (
<div
style={{
position: "absolute",
top: 0,
left: 0,
pointerEvents: "none",
zIndex: 9999, // 🔥 ensures it overlays everything
}}
>
{/* ✨ Sparkle trail */}
{trail.map((p) => (
<div
key={p.id}
style={{
position: "absolute",
transform: `translate(${p.x}px, ${p.y}px)`,
width: 6,
height: 6,
background: "gold",
borderRadius: "50%",
opacity: 0.8,
animation: "sparkleFade 0.8s forwards",
filter: "blur(1px)",
}}
/>
))}


  {/* 🐝 Flying Nor */}
  <div
    style={{
      transform: `translate(${pos.x}px, ${pos.y}px)`,
      transition: "transform 0.05s linear",
      filter: "drop-shadow(0 0 6px gold)", // ✨ glow effect
    }}
  >
    <Nor size={80} />
  </div>
</div>


);
}
