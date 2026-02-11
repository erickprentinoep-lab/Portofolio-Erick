import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll (Lenis)
const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Custom Cursor Logic
const cursor = document.querySelector('#cursor');
const cursorBlur = document.querySelector('#cursor-blur');

if (window.innerWidth > 1024) {
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
        gsap.to(cursorBlur, {
            x: e.clientX - 48,
            y: e.clientY - 48,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    // Hover Scaling
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 3, backgroundColor: 'white', mixBlendMode: 'difference' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, backgroundColor: '#00f5ff', mixBlendMode: 'normal' });
        });
    });
}

// Hero Reveal Animation
const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.5 } });

tl.set('#hero-divider-1', { rotation: -35 })
    .set('#hero-divider-2', { rotation: 35 })
    .to(['#hero-divider-1', '#hero-divider-2'], { scaleX: 1, duration: 2, stagger: 0.2, ease: 'power4.inOut' })
    .to('#hero-center-logo', { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, "-=1")
    .to('#hero-left', { opacity: 1, x: 0, y: 0 }, "-=1.2")
    .to('#hero-right', { opacity: 1, x: 0, y: 0 }, "-=1.4")
    .to('#hero-cta-center', { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }, "-=0.8")
    .from('#navbar', { y: -100, opacity: 0 }, "-=1");

// Scroll Animations for Sections
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
    });
});

// Staggered reveal for About Bento Grid items
gsap.from('.glass-card', {
    scrollTrigger: {
        trigger: '#about',
        start: "top 70%",
    },
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power1.out'
});


// Skill Terminal reveal
gsap.from('#skills .bg-black\\/80', {
    scrollTrigger: {
        trigger: '#skills',
        start: "top 70%",
    },
    opacity: 0,
    scaleX: 0,
    transformOrigin: "left",
    duration: 1,
    stagger: 0.3,
    ease: 'expo.out'
});

console.log("EP-LAB Portfolio initialized successfully.");
