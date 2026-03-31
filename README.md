# Attractor Engine: High-Performance Chaotic Systems Visualizer

A real-time, browser-based generative art engine that simulates and visualizes complex strange attractors. [cite_start]This project combines mathematical precision with high-performance rendering techniques to create hypnotic, interactive point-cloud animations[cite: 2].

--
## 🚀 Overview
[cite_start]The **Attractor Engine** is designed to handle tens of thousands of particles moving through non-linear dynamical systems[cite: 2]. It features seamless "morphing" between different mathematical recipes, interactive mouse-driven spatial deformation, and a post-processing pipeline for RGB splitting effects.

### Key Mathematical Models
The engine includes a library of classic and complex attractors[cite: 2]:
* **Lorenz & Rössler:** The foundations of chaos theory[cite: 2].
* **Aizawa & Dadras:** Complex, spherical, and organic structures[cite: 2].
* **Chen, Halvorsen, & Thomas:** Highly symmetric and multi-wing systems[cite: 2].
* **Sprott B & Four-Wing:** Minimalist yet unpredictable flow[cite: 2].

---

## 🛠️ Technical Features

### 1. High-Performance Rendering Pipeline
To maintain high frame rates while simulating thousands of particles, the engine utilizes several optimization strategies:
* **Uint32 Decay Pass:** Manipulates 4-channel pixel data as single 32-bit integers to drastically reduce memory overhead during trail decay.
* **Tile-Based Dirty Decay:** Divides the canvas into tiles to skip calculations for "black" regions, only updating tiles where particles are currently active.
* **Adaptive Noise Budget:** Dynamically adjusts noise calculation intervals based on current performance.
* **Tiered Particle Morphing:** During transitions, the engine prioritizes integration steps to maintain visual fluidity.

### 2. Generative Ecosystem
* [cite_start]**Procedural Recipes:** Every "scene" is a randomized combination of an attractor, a noise shape (FBM, Ridge, Marble, etc.), and a generated color palette[cite: 2].
* [cite_start]**Color Theory:** Palettes are generated using specific harmonic strategies including Analogous, Complementary, Triadic, and Monochromatic-plus-Accent[cite: 2].
* [cite_start]**Domain Warping:** Uses noise to warp the spatial coordinates of the attractors, creating organic, smoke-like textures[cite: 2].

### 3. Interactive Physics
* [cite_start]**Spatial Deformation:** Mouse interaction introduces local 3D deformations, including noise displacement, rotation around the cursor axis, and scale pulsing[cite: 2].
* **RGB Splitting:** Particles nearing the end of their "life" or moving at high velocities undergo an RGB delay effect where color channels separate.

---

## 💻 Tech Stack
* [cite_start]**Languages:** JavaScript (Engine), Python (Mathematical Prototyping)[cite: 1].
* [cite_start]**Libraries:** NumPy, SciPy (for ODE integration prototypes)[cite: 1].
* **Graphics:** Canvas 2D API (with Uint32 optimization) and CSS 3D.

---

## 🔧 Installation & Usage
The core engine runs directly in the browser via `engine.html`. [cite_start]For the Python-based mathematical prototypes[cite: 1]:

1.  **Environment Setup:**
    ```powershell
    # Create a virtual environment
    python -m venv venv
    .\venv\Scripts\activate
    ```

2.  **Dependencies:**
    [cite_start]Install the required libraries for the Duffing Oscillator and ODE integration scripts[cite: 1].
    ```powershell
    pip install numpy scipy matplotlib
    ```

3.  **Run the Engine:**
    Open `engine.html` in a modern web browser (optimized for Windows 11 environments).
