import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { fragmentShader, vertexShader } from './shaders';
import { galaxy, sphere, text, torusKnot, tunnel, waveField } from './shapes';

// Where the particle field sits, and which shape it takes, for each section.
// `mobile` overrides apply when the viewport is portrait.
const LAYOUTS = {
  top: { morph: 0, pos: [1.9, 0.05, 0], rot: [0, 0, 0], scale: 1, opacity: 1, mobile: { pos: [0, 1.05, -0.6], scale: 0.78 } },
  work: { morph: 3, pos: [0, -1.7, -1.2], rot: [0.3, 0, 0], scale: 1, opacity: 0.45, mobile: { pos: [0, -1.4, -2] } },
  about: { morph: 1, pos: [-2.4, 0, -0.6], rot: [0, 0, 0], scale: 1, opacity: 0.55, mobile: { pos: [0, 0.4, -1.4], scale: 0.85 } },
  experience: { morph: 2, pos: [0.4, -0.4, -1.2], rot: [0.95, 0, 0.18], scale: 1, opacity: 0.45, mobile: { pos: [0, 0, -2] } },
  process: { morph: 4, pos: [0, 0, 0], rot: [0, 0, 0], scale: 1, opacity: 0.5, mobile: { scale: 0.8 } },
  services: { morph: 1, pos: [2.3, 0.2, -0.8], rot: [0.4, 0, 0], scale: 0.9, opacity: 0.45, mobile: { pos: [0, 0.8, -2] } },
  testimonials: { morph: 2, pos: [0, 0, -2.2], rot: [1.25, 0, 0], scale: 1.1, opacity: 0.5, mobile: { scale: 0.8 } },
  faq: { morph: 0, pos: [-2.6, -0.3, -1.4], rot: [0, 0, 0], scale: 0.8, opacity: 0.4, mobile: { pos: [0, -1.6, -2.4], scale: 0.7 } },
  contact: { morph: 5, pos: [1.7, -0.75, -0.6], rot: [0, -0.25, 0], scale: 0.85, opacity: 0.55, mobile: { pos: [0, -1.5, -1.4], rot: [0, 0, 0], scale: 0.55 } },
  footer: { morph: 5, pos: [1.7, 0.05, -0.6], rot: [0, -0.25, 0], scale: 0.85, opacity: 0.45, mobile: { pos: [0, 0.6, -1.4], rot: [0, 0, 0], scale: 0.55 } },
};

const damp = (current, target, lambda, dt) => current + (target - current) * (1 - Math.exp(-lambda * dt));

export class ParticleScene {
  constructor(canvas, { reducedMotion = false } = {}) {
    this.canvas = canvas;
    this.reducedMotion = reducedMotion;
    this.section = 'top';
    this.pointer = new Vector2(0, 0);
    this.pointerActive = false;
    this.pointerEnergy = 0;
    this.velocity = 0;
    this.mouseWorld = new Vector3();
    this.time = 0;
    this.last = performance.now();
    this.disposed = false;
    this.ready = false;

    this.renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setClearColor(0x000000, 0);
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(40, 1, 0.1, 100);
    this.camera.position.set(0, 0, 7);

    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  async init() {
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const weak = (navigator.hardwareConcurrency || 8) <= 4;
    const count = small || weak ? 7000 : 16000;

    const family = '"Inter Tight Variable", "Inter Tight", system-ui, sans-serif';
    try {
      await Promise.race([
        document.fonts.load(`800 120px ${family}`),
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
    } catch {
      // Fall back to whatever font canvas resolves; the shape still reads.
    }
    if (this.disposed) return;

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(sphere(count), 3));
    geometry.setAttribute('aKnot', new BufferAttribute(torusKnot(count), 3));
    geometry.setAttribute('aGalaxy', new BufferAttribute(galaxy(count), 3));
    geometry.setAttribute('aWave', new BufferAttribute(waveField(count), 3));
    geometry.setAttribute('aTunnel', new BufferAttribute(tunnel(count), 3));
    geometry.setAttribute('aText', new BufferAttribute(text(count, 'KS', 5.4, family), 3));
    const random = new Float32Array(count * 4);
    for (let i = 0; i < random.length; i++) random[i] = Math.random();
    geometry.setAttribute('aRandom', new BufferAttribute(random, 4));

    this.material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMorph: { value: 0 },
        uTransition: { value: this.reducedMotion ? 0 : 1 },
        uVelocity: { value: 0 },
        uSize: { value: small ? 26 : 22 },
        uPixelRatio: { value: this.renderer.getPixelRatio() },
        uMouse: { value: new Vector3(99, 99, 0) },
        uMouseStrength: { value: 0 },
        uOpacity: { value: 0 },
        uColor: { value: new Color('#ece8df') },
        uAccent: { value: new Color('#ff5a1f') },
      },
    });

    this.geometry = geometry;
    this.points = new Points(geometry, this.material);
    this.points.frustumCulled = false;
    this.scene.add(this.points);

    const layout = this.layout();
    this.points.position.set(...layout.pos);
    this.points.rotation.set(...layout.rot);
    this.points.scale.setScalar(layout.scale);

    this.ready = true;
    this.last = performance.now();
    this.renderer.setAnimationLoop(this.tick);
  }

  layout() {
    const base = LAYOUTS[this.section] ?? LAYOUTS.top;
    const portrait = this.width / this.height < 0.9;
    return portrait && base.mobile ? { ...base, ...base.mobile } : base;
  }

  setSection(key) {
    if (LAYOUTS[key]) this.section = key;
  }

  setPointer(x, y) {
    const dx = x - this.pointer.x;
    const dy = y - this.pointer.y;
    this.pointerEnergy = Math.min(1.6, this.pointerEnergy + Math.hypot(dx, dy) * 4);
    this.pointer.set(x, y);
    this.pointerActive = true;
  }

  releasePointer() {
    this.pointerActive = false;
  }

  setVelocity(v) {
    this.velocity = Math.min(1.5, Math.abs(v) / 40);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    if (this.material) this.material.uniforms.uPixelRatio.value = this.renderer.getPixelRatio();
  }

  projectPointer() {
    const v = new Vector3(this.pointer.x, this.pointer.y, 0.5).unproject(this.camera);
    const dir = v.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    return this.camera.position.clone().add(dir.multiplyScalar(distance));
  }

  tick() {
    const now = performance.now();
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;

    const u = this.material.uniforms;
    const layout = this.layout();
    const speed = this.reducedMotion ? 0.2 : 1;
    this.time += dt * speed;
    u.uTime.value = this.time;

    u.uMorph.value = damp(u.uMorph.value, layout.morph, this.reducedMotion ? 6 : 1.8, dt);
    u.uOpacity.value = damp(u.uOpacity.value, layout.opacity, 2.2, dt);
    u.uVelocity.value = damp(u.uVelocity.value, this.reducedMotion ? 0 : this.velocity, 3, dt);
    this.velocity = damp(this.velocity, 0, 2, dt);

    const p = this.points;
    p.position.x = damp(p.position.x, layout.pos[0], 2, dt);
    p.position.y = damp(p.position.y, layout.pos[1], 2, dt);
    p.position.z = damp(p.position.z, layout.pos[2], 2, dt);
    p.rotation.x = damp(p.rotation.x, layout.rot[0], 2, dt);
    p.rotation.y = damp(p.rotation.y, layout.rot[1] + Math.sin(this.time * 0.1) * 0.25, 2, dt);
    p.rotation.z = damp(p.rotation.z, layout.rot[2], 2, dt);
    p.scale.setScalar(damp(p.scale.x, layout.scale, 2, dt));

    this.camera.position.x = damp(this.camera.position.x, this.pointer.x * 0.35, 2.5, dt);
    this.camera.position.y = damp(this.camera.position.y, this.pointer.y * 0.25, 2.5, dt);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();

    const target = this.projectPointer();
    this.mouseWorld.lerp(target, 1 - Math.exp(-10 * dt));
    u.uMouse.value.copy(this.mouseWorld);
    this.pointerEnergy = damp(this.pointerEnergy, 0, 1.4, dt);
    const strength = this.pointerActive ? 0.55 + this.pointerEnergy * 0.6 : 0;
    u.uMouseStrength.value = damp(u.uMouseStrength.value, strength, 4, dt);

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    window.removeEventListener('resize', this.resize);
    this.renderer.setAnimationLoop(null);
    this.geometry?.dispose();
    this.material?.dispose();
    this.renderer.dispose();
  }
}
