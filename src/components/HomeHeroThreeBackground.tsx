import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Live Three.js hero background (same idea as a pre-rendered loop “video”, but runs in WebGL). */
class GreenHeroScene {
  container: HTMLDivElement;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer | null = null;
  particles: THREE.Points | null = null;
  objects: Array<{
    mesh: THREE.Mesh;
    vx: number;
    vy: number;
    vz: number;
  }> = [];
  animationId: number | null = null;
  resizeObserver: ResizeObserver | null = null;
  baseZ = 50;
  onResize: () => void;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.onResize = () => this.syncSize();
    this.init();
  }

  init() {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    const bg = 0x06180c;
    this.scene.background = new THREE.Color(bg);

    this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    this.camera.position.z = this.baseZ;

    if (!window.WebGLRenderingContext) {
      console.warn("WebGL is not supported in this browser/environment.");
      return;
    }

    try {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch (error) {
      console.warn("Unable to create WebGL renderer for hero background.", error);
      return;
    }

    // Prevent stacked canvases during fast remount/HMR cycles.
    if (this.container.firstChild) {
      this.container.replaceChildren();
    }

    this.renderer.setSize(w, h);
    this.renderer.setClearColor(bg, 1);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.domElement.className = "pointer-events-none block h-full w-full";
    this.container.appendChild(this.renderer.domElement);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const l1 = new THREE.PointLight(0x79c72c, 1.2);
    l1.position.set(100, 80, 60);
    this.scene.add(l1);

    const l2 = new THREE.PointLight(0x4ade80, 0.65);
    l2.position.set(-90, -70, 50);
    this.scene.add(l2);

    const l3 = new THREE.PointLight(0x22c55e, 0.4);
    l3.position.set(0, 40, -60);
    this.scene.add(l3);

    this.createParticles();
    this.createCubes();
    this.createSpheres();
    this.createTorus();

    this.resizeObserver = new ResizeObserver(() => this.syncSize());
    this.resizeObserver.observe(this.container);

    this.animate();
  }

  syncSize() {
    if (!this.renderer) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w < 1 || h < 1) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  createParticles() {
    const geo = new THREE.BufferGeometry();
    const count = 380;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 220;
      pos[i + 1] = (Math.random() - 0.5) * 220;
      pos[i + 2] = (Math.random() - 0.5) * 220;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.55,
      color: 0x79c72c,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
    });
    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);
  }

  createCubes() {
    const geo = new THREE.BoxGeometry(3, 3, 3);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x4c9141,
      emissive: 0x14532d,
      transparent: true,
      opacity: 0.28,
      wireframe: true,
    });

    const c1 = new THREE.Mesh(geo, mat);
    c1.position.set(-30, 15, 0);
    this.scene.add(c1);
    this.objects.push({ mesh: c1, vx: 0.018, vy: 0.01, vz: 0.014 });

    const c2 = new THREE.Mesh(geo, mat.clone());
    c2.position.set(30, -15, 0);
    this.scene.add(c2);
    this.objects.push({ mesh: c2, vx: -0.014, vy: 0.018, vz: -0.01 });
  }

  createSpheres() {
    const geo = new THREE.IcosahedronGeometry(5, 4);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x86efac,
      emissive: 0x14532d,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    });

    const s1 = new THREE.Mesh(geo, mat);
    s1.position.set(-40, -20, -20);
    this.scene.add(s1);
    this.objects.push({ mesh: s1, vx: 0.01, vy: -0.014, vz: 0.018 });

    const s2 = new THREE.Mesh(geo, mat.clone());
    s2.position.set(40, 20, -20);
    this.scene.add(s2);
    this.objects.push({ mesh: s2, vx: -0.018, vy: 0.01, vz: 0.014 });
  }

  createTorus() {
    const geo = new THREE.TorusGeometry(8, 2, 16, 32);
    const mat = new THREE.MeshPhongMaterial({
      color: 0x4ade80,
      emissive: 0x166534,
      transparent: true,
      opacity: 0.22,
      wireframe: true,
    });

    const t = new THREE.Mesh(geo, mat);
    t.position.set(0, 0, -30);
    this.scene.add(t);
    this.objects.push({ mesh: t, vx: 0.005, vy: 0.007, vz: 0 });
  }

  animate() {
    if (!this.renderer) return;
    this.animationId = requestAnimationFrame(() => this.animate());

    const scrollRatio = Math.min(window.scrollY / window.innerHeight, 1);
    this.camera.position.z = this.baseZ - scrollRatio * 18;

    if (this.particles) {
      this.particles.rotation.x += 0.00008;
      this.particles.rotation.y += 0.00015;
    }

    const t = Date.now() * 0.001;
    this.objects.forEach((obj, i) => {
      obj.mesh.rotation.x += obj.vx;
      obj.mesh.rotation.y += obj.vy;
      obj.mesh.rotation.z += obj.vz;
      obj.mesh.position.x += Math.sin(t + i) * 0.018;
      obj.mesh.position.y += Math.cos(t + i * 0.7) * 0.018;
      obj.mesh.position.z += Math.sin(t + i * 0.5) * 0.009;
    });

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.renderer?.domElement.parentNode) {
      this.container.removeChild(this.renderer.domElement);
    }
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const mat = object.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat?.dispose();
        }
      });
    }
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer = null;
    }
  }
}

export function HomeHeroThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<GreenHeroScene | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    sceneRef.current = new GreenHeroScene(el);
    return () => {
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 min-h-[22rem] w-full"
      aria-hidden="true"
    />
  );
}
