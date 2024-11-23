class ParticlesBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('particles-background');
        document.querySelector('.hero').prepend(this.canvas);
        this.gl = this.canvas.getContext('webgl2');
        this.time = 0;
        this.particles = [];
        this.numParticles = 500; // Increased number of particles
        
        this.init();
        this.animate();
        this.handleResize();
    }

    init() {
        const vertexSource = `#version 300 es
            in vec2 position;
            in float size;
            in float alpha;
            uniform float time;
            
            out float vAlpha;
            
            void main() {
                vAlpha = alpha;
                gl_Position = vec4(position, 0.0, 1.0);
                gl_PointSize = size;
            }
        `;

        const fragmentSource = `#version 300 es
            precision highp float;
            in float vAlpha;
            out vec4 fragColor;
            
            void main() {
                float dist = length(gl_PointCoord - vec2(0.8));
                if (dist > 0.5) discard;
                float glow = 0.9 * (1.0 - dist * 2.0);
                fragColor = vec4(0.0, 1.0, 0.615, vAlpha * glow);
            }
        `;

        // Create and compile shaders
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertexSource);
        this.gl.compileShader(vertexShader);

        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragmentSource);
        this.gl.compileShader(fragmentShader);

        // Create program
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, vertexShader);
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.linkProgram(this.program);
        this.gl.useProgram(this.program);

        // Initialize particles with staggered starting positions
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * 2 - 1,                    // Full width spread
                y: -1.2 + Math.random() * 2.4,              // Staggered height start
                size: Math.random() * 3 + 1,                // Slightly smaller particles
                speed: Math.random() * 0.0015 + 0.001,      // Slightly slower speed
                alpha: Math.random() * 0.5 + 0.5,
                wobble: Math.random() * 2 * Math.PI
            });
        }

        // Create buffers
        this.positionBuffer = this.gl.createBuffer();
        this.sizeBuffer = this.gl.createBuffer();
        this.alphaBuffer = this.gl.createBuffer();

        // Get attribute locations
        this.positionLocation = this.gl.getAttribLocation(this.program, 'position');
        this.sizeLocation = this.gl.getAttribLocation(this.program, 'size');
        this.alphaLocation = this.gl.getAttribLocation(this.program, 'alpha');
        this.timeLocation = this.gl.getUniformLocation(this.program, 'time');

        // Enable attributes
        this.gl.enableVertexAttribArray(this.positionLocation);
        this.gl.enableVertexAttribArray(this.sizeLocation);
        this.gl.enableVertexAttribArray(this.alphaLocation);

        // Enable blending
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

    updateParticles() {
        const positions = [];
        const sizes = [];
        const alphas = [];

        this.particles.forEach(particle => {
            // Update position
            particle.y += particle.speed;
            particle.x += Math.sin(particle.wobble + this.time) * 0.0005; // Reduced X-axis movement
            particle.wobble += 0.01; // Slower wobble

            // Reset particle if it reaches 1/3 of the height
            if (particle.y > 0.4) { // Changed from 1.2 to 0.4 (about 1/3 of the height)
                particle.y = -1.2;
                particle.x = Math.random() * 2 - 1;
                particle.alpha = Math.random() * 0.5 + 0.5;
                particle.size = Math.random() * 3 + 1;
                particle.speed = Math.random() * 0.0015 + 0.001;
            }

            // Add to arrays
            positions.push(particle.x, particle.y);
            sizes.push(particle.size);
            alphas.push(particle.alpha * (1 - (particle.y + 1.2) / 1.6)); // Fade out as they rise
        });

        // Update buffers
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sizeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(sizes), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.sizeLocation, 1, this.gl.FLOAT, false, 0, 0);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.alphaBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(alphas), this.gl.STATIC_DRAW);
        this.gl.vertexAttribPointer(this.alphaLocation, 1, this.gl.FLOAT, false, 0, 0);
    }

    handleResize() {
        const resize = () => {
            const { width, height } = this.canvas.parentElement.getBoundingClientRect();
            this.canvas.width = width * window.devicePixelRatio;
            this.canvas.height = height * window.devicePixelRatio;
            this.canvas.style.width = `${width}px`;
            this.canvas.style.height = `${height}px`;
            this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        };

        window.addEventListener('resize', resize);
        resize();
    }

    render() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.time += 0.016;
        this.gl.uniform1f(this.timeLocation, this.time);
        
        this.updateParticles();
        this.gl.drawArrays(this.gl.POINTS, 0, this.numParticles);
    }

    animate() {
        this.render();
        requestAnimationFrame(() => this.animate());
    }
} 