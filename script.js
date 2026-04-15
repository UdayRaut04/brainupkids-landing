/* ============================================
   BrainUp Kids — Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // === Floating Particles ===
    const particlesContainer = document.getElementById('particles');
    const colors = ['#6C63FF', '#FF6B6B', '#FFD93D', '#4ECDC4', '#A78BFA', '#F472B6'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        particlesContainer.appendChild(particle);

        // Remove and recreate for continuous effect
        setTimeout(() => {
            particle.remove();
            createParticle();
        }, (duration + delay) * 1000);
    }

    // Create initial particles
    for (let i = 0; i < 20; i++) {
        createParticle();
    }

    // === Navbar Scroll Effect ===
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === Mobile Menu ===
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // === Counter Animation ===
    const statItems = document.querySelectorAll('.stat-item');

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const numberEl = element.querySelector('.stat-number');
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            numberEl.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                numberEl.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // === Intersection Observer for Animations ===
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If it's a stat item, animate counter
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target);
                }

                // Stagger level cards
                if (entry.target.classList.contains('level-card')) {
                    const level = entry.target.getAttribute('data-level');
                    const delays = { beginner: 0, intermediate: 200, advanced: 400 };
                    entry.target.style.transitionDelay = `${delays[level] || 0}ms`;
                }

                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.step-card, .level-card, .stat-item, .fade-in').forEach(el => {
        fadeObserver.observe(el);
    });

    // === Video Player ===
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const courseVideo = document.getElementById('courseVideo');
    const playButton = document.getElementById('playButton');

    if (playButton) {
        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            handleVideoPlay();
        });
    }

    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', handleVideoPlay);
    }

    function handleVideoPlay() {
        videoPlaceholder.classList.add('hidden');
        courseVideo.classList.remove('hidden');
        courseVideo.play();
    }

    // === Testimonials Slider ===
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentTestimonial = index;
    }

    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(next);
    }

    // Auto-rotate testimonials
    function startTestimonialRotation() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            showTestimonial(parseInt(dot.getAttribute('data-index')));
            startTestimonialRotation();
        });
    });

    startTestimonialRotation();

    // === FAQ Accordion ===
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all
            faqItems.forEach(faq => faq.classList.remove('open'));

            // Toggle current
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // === Confetti for Trophy ===
    const confettiContainer = document.getElementById('confettiContainer');
    if (confettiContainer) {
        const confettiColors = ['#6C63FF', '#FF6B6B', '#FFD93D', '#4ECDC4', '#A78BFA', '#F472B6'];

        for (let i = 0; i < 20; i++) {
            const piece = document.createElement('div');
            piece.classList.add('confetti-piece');
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            const left = Math.random() * 200 - 100;
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 3;
            const size = Math.random() * 6 + 4;

            piece.style.cssText = `
                background: ${color};
                left: calc(50% + ${left}px);
                top: 0;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;

            confettiContainer.appendChild(piece);
        }
    }

    // === Smooth scroll for anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // === Active nav link highlighting ===
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--primary)';
                    }
                });
            }
        });
    });

    // === Tilt effect on hero banner ===
    const heroBanner = document.getElementById('heroBanner');
    if (heroBanner && window.innerWidth > 768) {
        heroBanner.addEventListener('mousemove', (e) => {
            const rect = heroBanner.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            heroBanner.querySelector('.banner-wrapper').style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        heroBanner.addEventListener('mouseleave', () => {
            heroBanner.querySelector('.banner-wrapper').style.transform = '';
        });
    }

    // === Typing effect on hero subtitle ===
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalHTML = heroSubtitle.innerHTML;
        heroSubtitle.style.opacity = '1';
    }

    // === Enrollment Form ===
    const enrollmentForm = document.getElementById('enrollmentForm');
    const enrollSubmitBtn = document.getElementById('enrollSubmitBtn');
    const RAZORPAY_URL = 'https://pages.razorpay.com/pl_SayQUTxuv2wxFN/view';

    if (enrollmentForm) {
        const fields = {
            parentName: {
                el: document.getElementById('parentName'),
                errorEl: document.getElementById('parentNameError'),
                validate: (val) => {
                    if (!val.trim()) return 'Please enter parent\'s name';
                    if (val.trim().length < 2) return 'Name must be at least 2 characters';
                    return '';
                }
            },
            studentName: {
                el: document.getElementById('studentName'),
                errorEl: document.getElementById('studentNameError'),
                validate: (val) => {
                    if (!val.trim()) return 'Please enter student\'s name';
                    if (val.trim().length < 2) return 'Name must be at least 2 characters';
                    return '';
                }
            },

            mobileNumber: {
                el: document.getElementById('mobileNumber'),
                errorEl: document.getElementById('mobileNumberError'),
                wrapper: document.querySelector('.phone-input-wrapper'),
                validate: (val) => {
                    if (!val.trim()) return 'Please enter mobile number';
                    if (!/^[0-9]{10}$/.test(val.trim())) return 'Please enter a valid 10-digit number';
                    return '';
                }
            }
        };

        // Real-time validation on blur
        Object.keys(fields).forEach(key => {
            const field = fields[key];
            const inputEl = field.el;
            inputEl.addEventListener('blur', () => validateField(key));
            inputEl.addEventListener('input', () => {
                // Clear error on input
                const targetEl = key === 'mobileNumber' ? field.wrapper : inputEl;
                if (targetEl) {
                    targetEl.classList.remove('input-error');
                }
                inputEl.classList.remove('input-error');
                field.errorEl.textContent = '';
            });
        });

        // Only allow digits in mobile field
        fields.mobileNumber.el.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });

        function validateField(key) {
            const field = fields[key];
            const error = field.validate(field.el.value);
            const targetEl = key === 'mobileNumber' ? field.wrapper : field.el;

            if (error) {
                field.errorEl.textContent = error;
                if (targetEl) targetEl.classList.add('input-error');
                field.el.classList.add('input-error');
                if (targetEl) targetEl.classList.remove('input-success');
                field.el.classList.remove('input-success');
                return false;
            } else {
                field.errorEl.textContent = '';
                if (targetEl) targetEl.classList.remove('input-error');
                field.el.classList.remove('input-error');
                if (targetEl) targetEl.classList.add('input-success');
                field.el.classList.add('input-success');
                return true;
            }
        }

        function validateAll() {
            let isValid = true;
            Object.keys(fields).forEach(key => {
                if (!validateField(key)) isValid = false;
            });
            return isValid;
        }

        enrollmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (!validateAll()) {
                // Scroll to first error
                const firstError = enrollmentForm.querySelector('.input-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                return;
            }

            // Collect data
            const enrollmentData = {
                parentName: fields.parentName.el.value.trim(),
                studentName: fields.studentName.el.value.trim(),

                mobile: '+91' + fields.mobileNumber.el.value.trim(),
                enrolledAt: new Date().toISOString()
            };

            // Save to localStorage
            const enrollments = JSON.parse(localStorage.getItem('brainupkids_enrollments') || '[]');
            enrollments.push(enrollmentData);
            localStorage.setItem('brainupkids_enrollments', JSON.stringify(enrollments));

            // Show loading state
            enrollSubmitBtn.classList.add('loading');
            enrollSubmitBtn.querySelector('span').textContent = '⏳ Redirecting to payment...';

            // Redirect to Razorpay after brief delay
            setTimeout(() => {
                window.open(RAZORPAY_URL, '_blank');
                // Reset button after redirect
                setTimeout(() => {
                    enrollSubmitBtn.classList.remove('loading');
                    enrollSubmitBtn.querySelector('span').textContent = '🚀 Enroll & Pay ₹499';
                }, 2000);
            }, 800);
        });
    }

    console.log('🧠 BrainUp Kids — Ready to make learning fun!');
});
