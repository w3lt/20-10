// Hiển thị lời cảm ơn với hiệu ứng pháo hoa và confetti
function showThanks() {
    const thankYouMessage = document.getElementById('thankyou');
    thankYouMessage.classList.remove('hidden');
    thankYouMessage.classList.add('fade-in');
    
    // Tạo hiệu ứng pháo hoa
    startFireworks();

    // Tạo hiệu ứng confetti
    startConfetti();
}

// Pháo hoa (giả lập bằng canvas)
function startFireworks() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 100;

    function createParticle() {
        const x = Math.random() * canvas.width;   // Tọa độ x ngẫu nhiên
        const y = canvas.height;  // Bắt đầu từ phía dưới màn hình
        const radius = Math.random() * 5 + 1;     // Bán kính ngẫu nhiên từ 1 đến 6
        const dx = (Math.random() - 0.5) * 10;    // Vận tốc ngang ngẫu nhiên
        const dy = -Math.random() * 10 - 5;       // Vận tốc dọc hướng lên

        return {
            x: x,
            y: y,
            radius: radius,
            dx: dx,
            dy: dy,
            alpha: 1,  // Độ trong suốt để tạo hiệu ứng tàn pháo hoa
            color: 'rgba(' + Math.floor(Math.random() * 255) + ',' + 
                               Math.floor(Math.random() * 255) + ',' + 
                               Math.floor(Math.random() * 255) + ', 1)',
            update: function() {
                // Cập nhật tọa độ
                this.x += this.dx;
                this.y += this.dy;
                this.alpha -= 0.02;  // Giảm độ trong suốt theo thời gian

                // Vẽ pháo hoa lên canvas
                this.draw();
            },
            draw: function() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color.replace('1)', `${this.alpha})`);  // Sử dụng độ trong suốt
                ctx.fill();
                ctx.closePath();
            }
        };
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa canvas

        // Cập nhật và vẽ các hạt
        particles.forEach((particle, index) => {
            particle.update();

            // Loại bỏ hạt khi alpha (độ trong suốt) quá thấp
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        // Nếu số lượng hạt ít hơn giới hạn, tạo thêm hạt
        if (particles.length < particleCount) {
            particles.push(createParticle());
        }

        requestAnimationFrame(animateParticles); // Vẽ lại khung hình
    }

    animateParticles();  // Bắt đầu animation
}

// Hiệu ứng confetti
function startConfetti() {
    const confettiSettings = { target: 'confettiCanvas', max: 150, size: 1.2, animate: true };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}
