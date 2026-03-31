// ============================================================
//  attractors.js — Attractor library, noise, color, recipes
// ============================================================

// Shared output buffer — avoids array allocation per call
const _out = new Float64Array(3);

// --- Attractor Definitions ---
// fn writes to _out[0,1,2] instead of returning array

const ATTRACTORS = {

    lorenz: {
        name: 'Lorenz',
        fn: (x,y,z,p) => { _out[0]=p.s*(y-x); _out[1]=x*(p.r-z)-y; _out[2]=x*y-p.b*z; },
        defaults: { s:10, r:28, b:2.667 },
        randomize: () => ({ s:8+Math.random()*6, r:24+Math.random()*10, b:2+Math.random()*2 }),
        spawn: () => { _out[0]=(Math.random()-0.5)*4; _out[1]=(Math.random()-0.5)*4; _out[2]=20+Math.random()*10; },
        scale: 0.018, dt: 0.003, cam: 50
    },

    rossler: {
        name: 'Rössler',
        fn: (x,y,z,p) => { _out[0]=-(y+z); _out[1]=x+p.a*y; _out[2]=p.b+z*(x-p.c); },
        defaults: { a:0.2, b:0.2, c:5.7 },
        randomize: () => ({ a:0.1+Math.random()*0.2, b:0.1+Math.random()*0.2, c:4+Math.random()*4 }),
        spawn: () => { _out[0]=(Math.random()-0.5)*6; _out[1]=(Math.random()-0.5)*6; _out[2]=Math.random()*0.5; },
        scale: 0.028, dt: 0.012, cam: 30
    },

    chen: {
        name: 'Chen',
        fn: (x,y,z,p) => { _out[0]=p.a*(y-x); _out[1]=(p.c-p.a)*x-x*z+p.c*y; _out[2]=x*y-p.b*z; },
        defaults: { a:35, b:3, c:28 },
        randomize: () => ({ a:30+Math.random()*10, b:2+Math.random()*3, c:25+Math.random()*8 }),
        spawn: () => { const s=Math.random()>0.5?1:-1; _out[0]=s*(3+Math.random()*5); _out[1]=s*(3+Math.random()*5); _out[2]=18+Math.random()*8; },
        scale: 0.016, dt: 0.0008, cam: 60
    },

    halvorsen: {
        name: 'Halvorsen',
        fn: (x,y,z,p) => { _out[0]=-p.a*x-4*y-4*z-y*y; _out[1]=-p.a*y-4*z-4*x-z*z; _out[2]=-p.a*z-4*x-4*y-x*x; },
        defaults: { a:1.89 },
        randomize: () => ({ a:1.4+Math.random()*0.8 }),
        spawn: () => { const o=[[-5.5,0,1.5],[1.5,-5.5,0],[0,1.5,-5.5]][(Math.random()*3)|0]; _out[0]=o[0]+(Math.random()-0.5)*3; _out[1]=o[1]+(Math.random()-0.5)*3; _out[2]=o[2]+(Math.random()-0.5)*3; },
        scale: 0.038, dt: 0.004, cam: 22
    },

    thomas: {
        name: 'Thomas',
        fn: (x,y,z,p) => { _out[0]=Math.sin(y)-p.b*x; _out[1]=Math.sin(z)-p.b*y; _out[2]=Math.sin(x)-p.b*z; },
        defaults: { b:0.208186 },
        randomize: () => ({ b:0.15+Math.random()*0.1 }),
        spawn: () => { _out[0]=(Math.random()-0.5)*4; _out[1]=(Math.random()-0.5)*4; _out[2]=(Math.random()-0.5)*4; },
        scale: 0.14, dt: 0.04, cam: 8
    },

    sprottB: {
        name: 'Sprott B',
        fn: (x,y,z,p) => { _out[0]=p.a*y*z; _out[1]=x-p.b*y; _out[2]=1-x*y; },
        defaults: { a:0.4, b:1.2 },
        randomize: () => ({ a:0.3+Math.random()*0.3, b:0.8+Math.random()*0.8 }),
        spawn: () => { _out[0]=(Math.random()-0.5)*2; _out[1]=(Math.random()-0.5)*2; _out[2]=(Math.random()-0.5)*2; },
        scale: 0.18, dt: 0.008, cam: 6
    },

    dadras: {
        name: 'Dadras',
        fn: (x,y,z,p) => { _out[0]=y-p.a*x+p.b*y*z; _out[1]=p.c*y-x*z+z; _out[2]=p.d*x*y-p.e*z; },
        defaults: { a:3, b:2.7, c:1.7, d:2, e:9 },
        randomize: () => ({ a:2+Math.random()*2, b:2+Math.random()*1.5, c:1+Math.random()*1.5, d:1.5+Math.random()*1, e:7+Math.random()*4 }),
        spawn: () => { _out[0]=(Math.random()-0.5)*8; _out[1]=(Math.random()-0.5)*8; _out[2]=(Math.random()-0.5)*8; },
        scale: 0.04, dt: 0.006, cam: 12
    },

    aizawa: {
        name: 'Aizawa',
        fn: (x,y,z,p) => { _out[0]=(z-p.b)*x-p.d*y; _out[1]=p.d*x+(z-p.b)*y; _out[2]=p.c+p.a*z-z*z*z/3-(x*x+y*y)*(1+p.e*z)+p.f*z*x*x*x; },
        defaults: { a:0.95, b:0.7, c:0.6, d:3.5, e:0.25, f:0.1 },
        randomize: () => ({ a:0.8+Math.random()*0.3, b:0.5+Math.random()*0.4, c:0.4+Math.random()*0.4, d:3+Math.random()*1, e:0.15+Math.random()*0.2, f:0.05+Math.random()*0.1 }),
        spawn: () => { _out[0]=0.1+(Math.random()-0.5)*0.2; _out[1]=(Math.random()-0.5)*0.2; _out[2]=(Math.random()-0.5)*0.2; },
        scale: 0.2, dt: 0.008, cam: 5
    },

    noseHoover: {
        name: 'Nose-Hoover',
        fn: (x,y,z,p) => { _out[0]=y; _out[1]=-x+y*z; _out[2]=p.a-y*y; },
        defaults: { a:1.5 },
        randomize: () => ({ a:1+Math.random()*1 }),
        spawn: () => { _out[0]=(Math.random()-0.5)*2; _out[1]=(Math.random()-0.5)*2; _out[2]=(Math.random()-0.5)*2; },
        scale: 0.15, dt: 0.01, cam: 8
    },

    fourWing: {
        name: 'Four-Wing',
        fn: (x,y,z,p) => { _out[0]=p.a*x+y*z; _out[1]=p.b*x+p.c*y-x*z; _out[2]=-z-x*y; },
        defaults: { a:0.2, b:0.01, c:-0.4 },
        randomize: () => ({ a:0.1+Math.random()*0.2, b:0.005+Math.random()*0.015, c:-0.6+Math.random()*0.3 }),
        spawn: () => { _out[0]=(Math.random()-0.5)*2; _out[1]=(Math.random()-0.5)*2; _out[2]=(Math.random()-0.5)*2; },
        scale: 0.12, dt: 0.015, cam: 10
    }
};

const ATTRACTOR_KEYS = Object.keys(ATTRACTORS);


// ============================================================
//  Simplex 3D Noise
// ============================================================
const F3 = 1/3, G3 = 1/6;
const GRAD3S = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
const _sp = new Uint8Array(512), _sp12 = new Uint8Array(512);
(function(){
    const p = new Uint8Array(256);
    for(let i=0;i<256;i++) p[i]=i;
    let s=31337;
    for(let i=255;i>0;i--){ s=(s*48271)%2147483647; const j=s%(i+1); const t=p[i];p[i]=p[j];p[j]=t; }
    for(let i=0;i<512;i++){_sp[i]=p[i&255];_sp12[i]=_sp[i]%12;}
})();

function simplex3(xin,yin,zin){
    const s=(xin+yin+zin)*F3;
    const i=Math.floor(xin+s),j=Math.floor(yin+s),k=Math.floor(zin+s);
    const t=(i+j+k)*G3;
    const x0=xin-(i-t),y0=yin-(j-t),z0=zin-(k-t);
    let i1,j1,k1,i2,j2,k2;
    if(x0>=y0){if(y0>=z0){i1=1;j1=0;k1=0;i2=1;j2=1;k2=0;}else if(x0>=z0){i1=1;j1=0;k1=0;i2=1;j2=0;k2=1;}else{i1=0;j1=0;k1=1;i2=1;j2=0;k2=1;}}
    else{if(y0<z0){i1=0;j1=0;k1=1;i2=0;j2=1;k2=1;}else if(x0<z0){i1=0;j1=1;k1=0;i2=0;j2=1;k2=1;}else{i1=0;j1=1;k1=0;i2=1;j2=1;k2=0;}}
    const x1=x0-i1+G3,y1=y0-j1+G3,z1=z0-k1+G3;
    const x2=x0-i2+2*G3,y2=y0-j2+2*G3,z2=z0-k2+2*G3;
    const x3=x0-1+3*G3,y3=y0-1+3*G3,z3=z0-1+3*G3;
    const ii=i&255,jj=j&255,kk=k&255;
    let n0=0,n1=0,n2=0,n3=0;
    let t0=0.6-x0*x0-y0*y0-z0*z0;
    if(t0>0){t0*=t0;const gi=_sp12[ii+_sp[jj+_sp[kk]]];n0=t0*t0*(GRAD3S[gi][0]*x0+GRAD3S[gi][1]*y0+GRAD3S[gi][2]*z0);}
    let t1=0.6-x1*x1-y1*y1-z1*z1;
    if(t1>0){t1*=t1;const gi=_sp12[ii+i1+_sp[jj+j1+_sp[kk+k1]]];n1=t1*t1*(GRAD3S[gi][0]*x1+GRAD3S[gi][1]*y1+GRAD3S[gi][2]*z1);}
    let t2=0.6-x2*x2-y2*y2-z2*z2;
    if(t2>0){t2*=t2;const gi=_sp12[ii+i2+_sp[jj+j2+_sp[kk+k2]]];n2=t2*t2*(GRAD3S[gi][0]*x2+GRAD3S[gi][1]*y2+GRAD3S[gi][2]*z2);}
    let t3=0.6-x3*x3-y3*y3-z3*z3;
    if(t3>0){t3*=t3;const gi=_sp12[ii+1+_sp[jj+1+_sp[kk+1]]];n3=t3*t3*(GRAD3S[gi][0]*x3+GRAD3S[gi][1]*y3+GRAD3S[gi][2]*z3);}
    return 32*(n0+n1+n2+n3);
}

// Fast 2-octave simplex for bulk particles
function simplex3_fast(x, y, z) {
    return simplex3(x, y, z) * 0.7 + simplex3(x * 2.1, y * 2.1, z * 2.1) * 0.3;
}


// ============================================================
//  Noise Shapes
// ============================================================
const NOISE_SHAPES = {

    fbm: {
        name: 'FBM',
        fn: (x,y,z,oct,freq,t) => {
            let v=0,a=1,f=freq,total=0;
            for(let o=0;o<oct;o++){v+=simplex3(x*f+t*0.3,y*f+t*0.2,z*f+t*0.15)*a;total+=a;a*=0.5;f*=2.1;}
            return v/total;
        },
        fnFast: (x,y,z,freq,t) => simplex3_fast(x*freq+t*0.3, y*freq+t*0.2, z*freq+t*0.15)
    },

    ridge: {
        name: 'Ridge',
        fn: (x,y,z,oct,freq,t) => {
            let v=0,a=1,f=freq,total=0;
            for(let o=0;o<oct;o++){v+=(1-Math.abs(simplex3(x*f+t*0.2,y*f+t*0.15,z*f+t*0.1)))*a;total+=a;a*=0.45;f*=2.2;}
            return v/total;
        },
        fnFast: (x,y,z,freq,t) => 1-Math.abs(simplex3_fast(x*freq+t*0.2, y*freq+t*0.15, z*freq+t*0.1))
    },

    turbulence: {
        name: 'Turbulence',
        fn: (x,y,z,oct,freq,t) => {
            let v=0,a=1,f=freq,total=0;
            for(let o=0;o<oct;o++){v+=Math.abs(simplex3(x*f+t*0.25,y*f+t*0.18,z*f+t*0.12))*a;total+=a;a*=0.5;f*=2.0;}
            return v/total;
        },
        fnFast: (x,y,z,freq,t) => Math.abs(simplex3_fast(x*freq+t*0.25, y*freq+t*0.18, z*freq+t*0.12))
    },

    warp: {
        name: 'Domain Warp',
        fn: (x,y,z,oct,freq,t) => {
            const wx=simplex3(x*freq+t*0.2,y*freq,z*freq)*2;
            const wy=simplex3(x*freq+5.1,y*freq+t*0.15+3.2,z*freq)*2;
            let v=0,a=1,f=freq,total=0;
            for(let o=0;o<oct;o++){v+=simplex3((x+wx)*f,(y+wy)*f,z*f)*a;total+=a;a*=0.5;f*=2.0;}
            return v/total;
        },
        fnFast: (x,y,z,freq,t) => {
            const wx=simplex3(x*freq+t*0.2,y*freq,z*freq);
            return simplex3((x+wx)*freq*2, y*freq*2, z*freq*2);
        }
    },

    cellular: {
        name: 'Cellular',
        fn: (x,y,z,oct,freq,t) => {
            const n1=simplex3(x*freq*2+t*0.2,y*freq*2,z*freq*2);
            const n2=simplex3(x*freq*3.7+5.1,y*freq*3.7+3.2+t*0.15,z*freq*3.7+7.8);
            return Math.min(1,(Math.abs(n1)+Math.abs(n2)*0.5)*1.3);
        },
        fnFast: (x,y,z,freq,t) => Math.abs(simplex3(x*freq*2+t*0.2, y*freq*2, z*freq*2))
    },

    marble: {
        name: 'Marble',
        fn: (x,y,z,oct,freq,t) => {
            let v=0,a=1,f=freq,total=0;
            for(let o=0;o<oct;o++){v+=simplex3(x*f+t*0.1,y*f,z*f)*a;total+=a;a*=0.5;f*=2.0;}
            return Math.sin(x*freq*4+v/total*6+t*0.3)*0.5+0.5;
        },
        fnFast: (x,y,z,freq,t) => Math.sin(x*freq*4+simplex3(x*freq+t*0.1,y*freq,z*freq)*3+t*0.3)*0.5+0.5
    }
};

const NOISE_KEYS = Object.keys(NOISE_SHAPES);


// ============================================================
//  Color Palette Generator
// ============================================================
function hsl2rgb(h,s,l){
    h=((h%360)+360)%360;
    const c=(1-Math.abs(2*l-1))*s;
    const x=c*(1-Math.abs((h/60)%2-1));
    const m=l-c/2;
    let r,g,b;
    if(h<60){r=c;g=x;b=0;}else if(h<120){r=x;g=c;b=0;}else if(h<180){r=0;g=c;b=x;}
    else if(h<240){r=0;g=x;b=c;}else if(h<300){r=x;g=0;b=c;}else{r=c;g=0;b=x;}
    return [(r+m)*255,(g+m)*255,(b+m)*255];
}

function generatePalette(){
    const strategy=(Math.random()*4)|0;
    const baseHue=Math.random()*360;
    const anchors=[];
    switch(strategy){
        case 0: for(let i=0;i<4;i++) anchors.push(hsl2rgb(baseHue+i*25-30,0.6+Math.random()*0.3,0.4+Math.random()*0.3)); break;
        case 1: anchors.push(hsl2rgb(baseHue,0.7,0.45)); anchors.push(hsl2rgb(baseHue+30,0.6,0.55)); anchors.push(hsl2rgb(baseHue+180,0.7,0.45)); anchors.push(hsl2rgb(baseHue+210,0.6,0.55)); break;
        case 2: for(let i=0;i<3;i++) anchors.push(hsl2rgb(baseHue+i*120,0.6+Math.random()*0.3,0.4+Math.random()*0.25)); anchors.push(hsl2rgb(baseHue+60,0.4,0.7)); break;
        case 3: for(let i=0;i<3;i++) anchors.push(hsl2rgb(baseHue,0.3+i*0.2,0.3+i*0.15)); anchors.push(hsl2rgb(baseHue+180+Math.random()*60-30,0.8,0.55)); break;
    }
    return { anchors, strategy:['analogous','complementary','triadic','mono+accent'][strategy], baseHue:baseHue|0 };
}

function samplePalette(palette,t){
    t=Math.max(0,Math.min(1,t));
    const n=palette.anchors.length;
    const idx=t*(n-1);
    const i=Math.min(idx|0,n-2);
    const f=idx-i;
    const a=palette.anchors[i],b=palette.anchors[i+1];
    return [(a[0]+f*(b[0]-a[0]))|0, (a[1]+f*(b[1]-a[1]))|0, (a[2]+f*(b[2]-a[2]))|0];
}

// Lerp two palettes
function lerpPalette(palA, palB, t) {
    const n = Math.min(palA.anchors.length, palB.anchors.length);
    const anchors = [];
    for (let i = 0; i < n; i++) {
        const a = palA.anchors[i], b = palB.anchors[i];
        anchors.push([a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t]);
    }
    return { anchors, strategy: t < 0.5 ? palA.strategy : palB.strategy, baseHue: 0 };
}


// ============================================================
//  Mouse Deformation — randomized on each mouseenter
// ============================================================
const DEFORM_TYPES = ['noise', 'rotate', 'scale', 'noise+rotate', 'noise+scale', 'rotate+scale', 'all'];

let mouseDeform = null;

function randomizeMouseDeform() {
    const type = DEFORM_TYPES[(Math.random() * DEFORM_TYPES.length) | 0];
    const hasNoise = type.includes('noise') || type === 'all';
    const hasRotate = type.includes('rotate') || type === 'all';
    const hasScale = type.includes('scale') || type === 'all';

    mouseDeform = {
        type,
        radius: 4 + Math.random() * 10,
        falloff: 1 + Math.random() * 2,
        // Noise displacement
        noiseActive: hasNoise,
        noiseStrength: 1 + Math.random() * 4,
        noiseFreq: 0.3 + Math.random() * 1.2,
        noiseSpeed: 0.3 + Math.random() * 1.5,
        noiseOctaves: 1 + (Math.random() * 2) | 0,
        // Rotation around mouse point
        rotateActive: hasRotate,
        rotateAxis: [(Math.random()-0.5)*2, (Math.random()-0.5)*2, (Math.random()-0.5)*2], // random axis
        rotateSpeed: 0.5 + Math.random() * 3,
        rotateAngleMax: 0.3 + Math.random() * 1.2, // radians
        // Scale from mouse center
        scaleActive: hasScale,
        scaleMin: 0.3 + Math.random() * 0.5,
        scaleMax: 1.2 + Math.random() * 1.5,
        scalePulseSpeed: 0.5 + Math.random() * 2
    };

    // Normalize rotation axis
    const ra = mouseDeform.rotateAxis;
    const rLen = Math.sqrt(ra[0]*ra[0]+ra[1]*ra[1]+ra[2]*ra[2]) || 1;
    ra[0]/=rLen; ra[1]/=rLen; ra[2]/=rLen;
}

// Initialize first deform config
randomizeMouseDeform();


// ============================================================
//  Recipe Generator
// ============================================================
function generateRecipe(excludeKey) {
    let attractorKey;
    do { attractorKey = ATTRACTOR_KEYS[(Math.random()*ATTRACTOR_KEYS.length)|0]; }
    while (attractorKey === excludeKey && ATTRACTOR_KEYS.length > 1);

    const attractor = ATTRACTORS[attractorKey];
    const noiseKey = NOISE_KEYS[(Math.random()*NOISE_KEYS.length)|0];
    const noise = NOISE_SHAPES[noiseKey];

    return {
        attractor: { key: attractorKey, def: attractor, params: attractor.randomize() },
        noise: { key: noiseKey, def: noise, octaves: 2+(Math.random()*3)|0, frequency: 0.3+Math.random()*0.7 },
        palette: generatePalette(),
        particles: 30000+(Math.random()*15000)|0,
        trailDecay: 0.72+Math.random()*0.15,
        rgbDelay: { maxOffset: 3+Math.random()*5, noiseFreq: 0.8+Math.random()*1.2 },
        lifeRange: [1.5+Math.random()*1, 4+Math.random()*5]
    };
}
