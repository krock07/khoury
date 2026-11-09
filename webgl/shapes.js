// Each generator fills a Float32Array of `count * 3` positions so every shape
// can be stored as a parallel attribute and blended on the GPU.

const TAU = Math.PI * 2;

export function sphere(count, radius = 1.55) {
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const shell = radius * (0.96 + Math.random() * 0.08);
    out[i * 3] = Math.cos(theta) * r * shell;
    out[i * 3 + 1] = y * shell;
    out[i * 3 + 2] = Math.sin(theta) * r * shell;
  }
  return out;
}

export function torusKnot(count, p = 2, q = 3, radius = 1.15, tube = 0.36) {
  const out = new Float32Array(count * 3);
  const point = (t) => {
    const r = radius * (2 + Math.cos(q * t)) * 0.5;
    return [r * Math.cos(p * t), r * Math.sin(p * t), radius * Math.sin(q * t) * 0.5];
  };
  for (let i = 0; i < count; i++) {
    const t = Math.random() * TAU;
    const a = point(t);
    const b = point(t + 0.001);
    const tangent = normalize([b[0] - a[0], b[1] - a[1], b[2] - a[2]]);
    const normal = normalize(cross(tangent, [0, 0, 1]));
    const binormal = cross(tangent, normal);
    const angle = Math.random() * TAU;
    const rr = tube * Math.sqrt(Math.random());
    const c = Math.cos(angle) * rr;
    const s = Math.sin(angle) * rr;
    out[i * 3] = a[0] + normal[0] * c + binormal[0] * s;
    out[i * 3 + 1] = a[1] + normal[1] * c + binormal[1] * s;
    out[i * 3 + 2] = a[2] + normal[2] * c + binormal[2] * s;
  }
  return out;
}

export function galaxy(count, radius = 3.2, arms = 3) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.pow(Math.random(), 1.6) * radius;
    const arm = ((i % arms) / arms) * TAU;
    const twist = r * 1.35;
    const spread = 0.38 * (1 - r / radius) + 0.08;
    out[i * 3] = Math.cos(arm + twist) * r + gaussian() * spread;
    out[i * 3 + 1] = gaussian() * spread * 0.45;
    out[i * 3 + 2] = Math.sin(arm + twist) * r + gaussian() * spread;
  }
  return out;
}

export function waveField(count, width = 11, depth = 7) {
  const out = new Float32Array(count * 3);
  const cols = Math.ceil(Math.sqrt(count * (width / depth)));
  const rows = Math.ceil(count / cols);
  for (let i = 0; i < count; i++) {
    const cx = i % cols;
    const cz = Math.floor(i / cols);
    out[i * 3] = (cx / (cols - 1) - 0.5) * width;
    out[i * 3 + 1] = 0;
    out[i * 3 + 2] = (cz / (rows - 1) - 0.5) * depth;
  }
  return out;
}

export function tunnel(count, radius = 2.6, length = 14) {
  const out = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = Math.random() * TAU;
    const r = radius * (0.75 + Math.random() * 0.5);
    out[i * 3] = Math.cos(a) * r;
    out[i * 3 + 1] = Math.sin(a) * r;
    out[i * 3 + 2] = Math.random() * length;
  }
  return out;
}

export function text(count, label = 'KS', width = 5.2, fontFamily = 'sans-serif') {
  const out = new Float32Array(count * 3);
  const canvas = document.createElement('canvas');
  const w = 1024;
  const h = 512;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `800 380px ${fontFamily}`;
  ctx.fillText(label, w / 2, h / 2 + 10);

  const data = ctx.getImageData(0, 0, w, h).data;
  const pixels = [];
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (data[(y * w + x) * 4 + 3] > 128) pixels.push(x, y);
    }
  }

  const scale = width / w;
  const total = pixels.length / 2;
  for (let i = 0; i < count; i++) {
    const idx = total ? Math.floor(Math.random() * total) * 2 : 0;
    const px = pixels[idx] ?? w / 2;
    const py = pixels[idx + 1] ?? h / 2;
    out[i * 3] = (px - w / 2) * scale + (Math.random() - 0.5) * 0.02;
    out[i * 3 + 1] = -(py - h / 2) * scale + (Math.random() - 0.5) * 0.02;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.35;
  }
  return out;
}

function gaussian() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}

function normalize([x, y, z]) {
  const l = Math.hypot(x, y, z) || 1;
  return [x / l, y / l, z / l];
}

function cross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
