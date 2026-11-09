// Simplex noise by Ashima Arts / Stefan Gustavson (MIT).
const noise = /* glsl */ `
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0)) +
    i.y + vec4(0.0, i1.y, i2.y, 1.0)) +
    i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

export const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uTransition;
uniform float uVelocity;
uniform float uSize;
uniform float uPixelRatio;
uniform vec3 uMouse;
uniform float uMouseStrength;

attribute vec3 aKnot;
attribute vec3 aGalaxy;
attribute vec3 aWave;
attribute vec3 aTunnel;
attribute vec3 aText;
attribute vec4 aRandom;

varying float vAlpha;
varying float vAccent;

${noise}

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float weight(float i) {
  return clamp(1.0 - abs(uMorph - i), 0.0, 1.0);
}

void main() {
  float t = uTime;

  vec3 sphere = position;
  float n = snoise(sphere * 0.85 + vec3(0.0, t * 0.22, 0.0));
  sphere += normalize(sphere) * n * 0.3;
  sphere.xz *= rot(t * 0.08);

  vec3 knot = aKnot;
  knot.xy *= rot(t * 0.12);
  knot.xz *= rot(t * 0.06);

  vec3 galaxy = aGalaxy;
  galaxy.xz *= rot(t * 0.22 / (0.6 + length(galaxy.xz)));

  vec3 wave = aWave;
  wave.y += sin(wave.x * 0.9 + t * 0.9) * 0.28
          + cos(wave.z * 1.2 + t * 0.7) * 0.22
          + snoise(vec3(wave.xz * 0.35, t * 0.15)) * 0.35;

  vec3 tube = aTunnel;
  tube.z = mod(tube.z + t * (1.4 + uVelocity * 5.0), 14.0) - 11.0;
  tube.xy *= rot(t * 0.05 + tube.z * 0.04);
  float tubeFade = smoothstep(-11.0, -7.0, tube.z) * (1.0 - smoothstep(1.0, 3.0, tube.z));

  vec3 glyph = aText;
  glyph.z += snoise(vec3(glyph.xy * 1.5, t * 0.4)) * 0.12;

  float w0 = weight(0.0);
  float w1 = weight(1.0);
  float w2 = weight(2.0);
  float w3 = weight(3.0);
  float w4 = weight(4.0);
  float w5 = weight(5.0);
  vec3 pos = sphere * w0 + knot * w1 + galaxy * w2 + wave * w3 + tube * w4 + glyph * w5;

  float between = sin(fract(uMorph) * 3.14159265) * uTransition;
  vec3 q = pos * 0.6 + t * 0.2;
  vec3 drift = vec3(
    snoise(q + aRandom.x * 10.0),
    snoise(q + 31.7),
    snoise(q + 71.3)
  );
  pos += drift * (between * 1.2 + uVelocity * 0.3) * (0.4 + aRandom.y);

  vec4 world = modelMatrix * vec4(pos, 1.0);
  vec2 away = world.xy - uMouse.xy;
  float dist = length(away);
  float force = (1.0 - smoothstep(0.0, 1.35, dist)) * uMouseStrength;
  world.xy += normalize(away + 0.0001) * force * 0.6;
  world.z += force * 0.45;

  vec4 mv = viewMatrix * world;
  gl_Position = projectionMatrix * mv;

  float size = uSize * (0.35 + aRandom.y * 0.9) * uPixelRatio;
  gl_PointSize = min(size / -mv.z, 14.0 * uPixelRatio);

  float depthFade = 1.0 - smoothstep(6.0, 16.0, -mv.z);
  vAlpha = (0.35 + aRandom.z * 0.65) * depthFade * mix(1.0, tubeFade, w4) * (1.0 + force * 0.8);
  vAccent = clamp(step(0.91, aRandom.w) + force * 0.9, 0.0, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uAccent;
uniform float uOpacity;

varying float vAlpha;
varying float vAccent;

void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.05, d);
  vec3 color = mix(uColor, uAccent, vAccent);
  gl_FragColor = vec4(color, a * vAlpha * uOpacity);
}
`;
