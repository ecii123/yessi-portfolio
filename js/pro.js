document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PRELOADER ---
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        setTimeout(() => { preloader.style.display = 'none'; }, 700);
    }, 1500);

    // --- 2. Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const target = e.target;
            const isTextElement = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes(target.tagName);
            const isInsideLinkOrButton = target.closest('a') || target.closest('button');

            if (target.id === 'case-study-modal') {
                cursorDot.style.opacity = '0';
                cursorOutline.style.opacity = '0';
            } else if (isTextElement && !isInsideLinkOrButton) {
                cursorDot.style.opacity = '0';
                cursorOutline.style.opacity = '0';
            } else {
                cursorDot.style.opacity = '1';
                cursorOutline.style.opacity = '1';
            }

            const posX = e.clientX;
            const posY = e.clientY;
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 300, fill: "forwards" });
        });
    }

    // --- 3. Navbar, Progress & Scroll Spy ---
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-blue-600');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-blue-600');
            }
        });

        if (window.scrollY > 30) navbar.classList.add('nav-scrolled');
        else navbar.classList.remove('nav-scrolled');

        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        scrollProgress.style.width = `${totalScroll / windowHeight * 100}%`;
    });

    // --- 4. Typewriter ---
    const roles = [
        "Frontend Developer.",
        "Mobile Developer.",
        "Officer Development Program.",
        "Software Developer.",
        "Fullstack Developer."
    ];

    const typeTarget = document.getElementById('typewriter');
    let roleIndex = 0; let charIndex = 0; let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typeTarget.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typeTarget.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true; typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; typingSpeed = 400;
        }
        setTimeout(typeEffect, typingSpeed);
    }
    setTimeout(typeEffect, 2000);

    // --- 5. Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

    revealElements.forEach(el => observer.observe(el));
    setTimeout(() => {
        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('active');
        });
    }, 1600);

    // --- [PERBAIKAN 3] Skill Bars — Animasi muncul saat scroll ---
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                // Reset dulu ke 0, lalu animate ke target
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = typeof targetWidth === 'string' && targetWidth.includes('%')
                        ? targetWidth
                        : targetWidth + '%';
                }, 100);
                skillBarObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => {
        const originalWidth = bar.style.width;
        bar.setAttribute('data-width', originalWidth);
        bar.style.width = '0%';
        skillBarObserver.observe(bar);
    });

    // --- 6. 3D Tilt ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; const y = e.clientY - rect.top;
            const centerX = rect.width / 2; const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });
    });

});

// --- 7. CASE STUDY DATA (STAR Method) ---
// [PERBAIKAN 4] Ditambah data untuk portfolio-app dan kedai-kopi
const caseStudiesData = {
    'simba-mobile': {
        title: 'SIMBA Mobile Application',
        situation: 'The campus needed a mobile-friendly system for real-time tracking of student violations, merit points, and academic counseling to replace inefficient manual processes.',
        task: 'As the Scrum Team Leader and Mobile Developer, I was tasked with delivering a fully functional Android application within a strict 5-month timeline, mirroring the capabilities of the web portal.',
        action: 'As Scrum Leader, I maintained comprehensive project documentation—from planning to execution—in Coda and provided consistent progress reports to the Project Manager (PM). I strictly monitored individual tasks against the sprint timeline, conducted thorough reviews of my team\'s deliverables to ensure quality, and proactively held regular check-ins to identify bottlenecks and provide actionable solutions. Technically, I drove the core Kotlin development to ensure a highly adaptive mobile UI.',
        result: 'Successfully deployed a smooth, user-centric Android application that significantly enhanced navigation and efficiency, while maintaining a perfectly aligned and productive development team throughout the timeline.'
    },
    'simba-web': {
        title: 'SIMBA Web Portal',
        situation: 'There was a lack of a centralized digital platform to efficiently track student mentoring, counseling, and merit/violation points in real-time.',
        task: 'Acting as both Scrum Team Leader and Frontend Developer, my goal was to lead the team to build an interactive, modern, and accessible web portal from scratch.',
        action: 'I orchestrated the Agile workflow by centralizing all sprint planning and execution details in Coda, ensuring transparent milestone reporting to the PM. I actively tracked the team\'s progress against our deadlines, evaluated their work to ensure it met project requirements, and held frequent check-ins to resolve any technical or workflow constraints quickly. Simultaneously, I spearheaded the frontend development using Laravel and JavaScript.',
        result: 'Delivered a robust web system on schedule, improving data management visibility and providing an optimal user experience, all while fostering a well-coordinated and block-free development environment.'
    },
    'sita': {
        title: 'SITA (Sistem Informasi Tingkat Akhir)',
        situation: 'The Final Project (Tugas Akhir) process lacked a streamlined platform, causing administrative bottlenecks for students, supervisors, examiners, and coordinators.',
        task: 'As the Scrum Leader, Web Designer, and Frontend Developer, I had to effectively lead the team to design and develop a complete management system in just one month.',
        action: 'To conquer the aggressive 1-month deadline, I established a strict operational rhythm. I documented all tasks in Coda, reported directly to the PM, and closely monitored the team\'s daily workload. I rigorously reviewed their outputs for quality and provided immediate, hands-on solutions whenever they faced blockers. On the technical front, I designed the UI in Figma and developed the frontend using Laravel Blade.',
        result: 'Delivered the complete project within the tight deadline, vastly improving process visibility and earning a prestigious "A" grade for project excellence, proving my capability to lead under pressure.'
    },
    'portfolio-app': {
        title: 'My Portfolio Android App',
        situation: 'As a mobile developer, I needed a hands-on personal project to deepen my understanding of modern Android development patterns beyond academic coursework, while also creating a living showcase of my skills.',
        task: 'As the sole developer, I designed and built a full personal portfolio app from scratch — including UI design, architecture decisions, and implementation — entirely on my own.',
        action: 'I adopted Jetpack Compose as the UI framework to learn declarative Android development firsthand. I structured the app with a clean navigation flow — home, skills, and project detail screens — and made all components fully responsive across different screen sizes by leveraging Compose\'s flexible layout system.',
        result: 'Successfully shipped a polished, fully functional Android portfolio app that demonstrates real-world Jetpack Compose skills, responsive design, and personal initiative outside of team or classroom settings.'
    },
    'kedai-kopi': {
        title: 'Kedai Kopi Senja — Online Ordering Site',
        situation: 'Small local coffee shops often lack an accessible digital presence, making it difficult for customers to browse menus, place orders, or make table reservations without calling in.',
        task: 'As the sole web developer, I was responsible for designing and building a complete online ordering website from start to finish, using it also as a practical exercise in Laravel Blade templating.',
        action: 'I built the site using Laravel Blade for server-side rendering, creating a clean and intuitive UI that displays the full menu with categories, supports online order submissions, and allows customers to book a table. I focused on keeping the interface minimal and mobile-friendly, using plain HTML and CSS for performance.',
        result: 'Delivered a fully functional coffee shop website with a clean, warm aesthetic that demonstrates end-to-end web development skills — from routing and templating to frontend styling — in a real-world product scenario.'
    }
};

function openCaseStudy(projectId) {
    const data = caseStudiesData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-situation').textContent = data.situation;
    document.getElementById('modal-task').textContent = data.task;
    document.getElementById('modal-action').textContent = data.action;
    document.getElementById('modal-result').textContent = data.result;

    const modal = document.getElementById('case-study-modal');
    const modalBox = document.getElementById('modal-content-box');

    document.body.style.overflow = 'hidden';
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('modal-active');
        modalBox.classList.add('modal-box-active');
    }, 10);
}

function closeCaseStudy() {
    const modal = document.getElementById('case-study-modal');
    const modalBox = document.getElementById('modal-content-box');

    modal.classList.remove('modal-active');
    modalBox.classList.remove('modal-box-active');
    document.body.style.overflow = '';

    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

document.getElementById('case-study-modal').addEventListener('click', function (e) {
    if (e.target === this) closeCaseStudy();
});

// --- 8. EXPERIENCE TABS ---
function switchTab(tabId, clickedButton) {
    const allContents = document.querySelectorAll('.exp-content');
    allContents.forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('animate-tab-fade');
    });

    const allButtons = document.querySelectorAll('.exp-tab');
    allButtons.forEach(btn => {
        btn.classList.remove('active', 'text-blue-600', 'bg-blue-50');
        btn.classList.add('text-slate-500');
    });

    const targetContent = document.getElementById(tabId);
    targetContent.classList.remove('hidden');
    targetContent.style.opacity = '0';
    targetContent.style.transform = 'translateY(10px)';

    setTimeout(() => {
        targetContent.style.transition = 'all 0.5s ease';
        targetContent.style.opacity = '1';
        targetContent.style.transform = 'translateY(0)';
    }, 10);

    clickedButton.classList.add('active', 'text-blue-600', 'bg-blue-50');
    clickedButton.classList.remove('text-slate-500');
}

// --- 9. COPY EMAIL ---
// [PERBAIKAN 5] Update copyEmail agar cocok dengan footer baru
function copyEmail() {
    const email = "ysitanggang096@gmail.com";
    const tooltip = document.getElementById('copy-tooltip');

    navigator.clipboard.writeText(email).then(() => {
        tooltip.style.opacity = "1";
        setTimeout(() => {
            tooltip.style.opacity = "0";
        }, 2000);
    }).catch(() => {
        // Fallback untuk browser yang tidak support clipboard API
        const el = document.createElement('textarea');
        el.value = email;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        tooltip.style.opacity = "1";
        setTimeout(() => { tooltip.style.opacity = "0"; }, 2000);
    });
}
// --- 10. CERTIFICATE CAROUSEL & FULLSCREEN LOGIC ---
let currentCert = 0;
const certTrack = document.getElementById('cert-track');
const certSlides = document.querySelectorAll('.cert-slide');
const dotsContainer = document.getElementById('cert-dots');
const totalCerts = certSlides.length;
let autoPlayInterval;

// 1. GENERATE DOTS SECARA DINAMIS (DENGAN UKURAN LEBIH KECIL)
if(dotsContainer && totalCerts > 0) {
    dotsContainer.innerHTML = ''; // Bersihkan kontainer
    for (let i = 0; i < totalCerts; i++) {
        const dot = document.createElement('button');
        // Ukuran diubah jadi h-2 w-2 agar rapi walau jumlahnya banyak
        dot.className = `cert-dot h-2 rounded-full transition-all outline-none mx-1 ${i === 0 ? 'bg-blue-600 w-6' : 'bg-slate-300 hover:bg-slate-400 w-2'}`;
        dot.onclick = () => goToCert(i);
        dotsContainer.appendChild(dot);
    }
}

function updateCarousel() {
    if(!certTrack) return;
    certTrack.style.transform = `translateX(-${currentCert * 100}%)`;
    
    // Update warna dan ukuran Dot aktif
    const allDots = document.querySelectorAll('.cert-dot');
    allDots.forEach((dot, index) => {
        if(index === currentCert) {
            dot.className = 'cert-dot h-2 rounded-full transition-all outline-none mx-1 bg-blue-600 w-6';
        } else {
            dot.className = 'cert-dot h-2 rounded-full transition-all outline-none mx-1 bg-slate-300 hover:bg-slate-400 w-2';
        }
    });
}

function nextCert() {
    if(totalCerts === 0) return;
    currentCert = (currentCert + 1) % totalCerts;
    updateCarousel();
}

function prevCert() {
    if(totalCerts === 0) return;
    currentCert = (currentCert - 1 + totalCerts) % totalCerts;
    updateCarousel();
    resetAutoPlay();
}

function goToCert(index) {
    currentCert = index;
    updateCarousel();
    resetAutoPlay();
}

// Logika perputaran otomatis (Auto-Play)
function startAutoPlay() {
    if(!certTrack || totalCerts <= 1) return;
    autoPlayInterval = setInterval(nextCert, 4000); 
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Mengontrol perilaku Hover (Berhenti saat ditunjuk kursor)
// --- INITIALIZATION & INTERSECTION OBSERVER ---
const carouselContainer = document.getElementById('cert-carousel-container');
const carouselViewport = document.getElementById('carousel-viewport');

if (carouselContainer && carouselViewport) {
    // Gunakan IntersectionObserver untuk mendeteksi kapan bagian sertifikat masuk ke layar
    const certObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Ketika seksi sertifikat mulai terlihat di layar pengguna
            if (entry.isIntersecting) {
                // FORCE RESET: Pastikan slider dipaksa kembali ke indeks 0 (Oracle)
                currentCert = 0;
                updateCarousel();
                
                // Mulai putaran otomatis HANYA setelah user sampai di bagian ini
                startAutoPlay();
                
                // Unobserve agar tidak terus-menerus mereset ke awal saat user scroll naik-turun
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Aktif ketika 20% dari komponen sertifikat sudah terlihat di layar

    // Jalankan pengamat pada kontainer sertifikat
    certObserver.observe(carouselContainer);

    // Fitur berhenti otomatis saat kursor masuk ke dalam area card tetap dipertahankan
    carouselViewport.addEventListener('mouseenter', stopAutoPlay);
    
    // Fitur berjalan kembali saat kursor keluar dari area card
    carouselViewport.addEventListener('mouseleave', startAutoPlay);
}

// --- FULLSCREEN LIGHTBOX LOGIC ---
function openCertModal(fileUrl, fileType) {
    const modal = document.getElementById('cert-modal');
    const contentBox = document.getElementById('cert-modal-content');
    
    if(!contentBox) return;
    contentBox.innerHTML = ''; 
    
    if (fileType === 'pdf') {
        contentBox.innerHTML = `
            <iframe src="${fileUrl}#toolbar=0&navpanes=0" 
                    class="w-full h-full rounded-lg shadow-2xl pointer-events-auto bg-white" 
                    frameborder="0">
            </iframe>`;
    } else {
        contentBox.innerHTML = `
            <img src="${fileUrl}" 
                 class="max-w-full max-h-full rounded-lg shadow-2xl pointer-events-auto object-contain">`;
    }
    
    document.body.style.overflow = 'hidden'; 
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('cert-modal-active');
        contentBox.classList.add('cert-img-active');
    }, 10);
}

function closeCertModal(e, force = false) {
    if (force || e.target.id === 'cert-modal') {
        const modal = document.getElementById('cert-modal');
        const contentBox = document.getElementById('cert-modal-content');
        
        modal.classList.remove('cert-modal-active');
        if(contentBox) contentBox.classList.remove('cert-img-active');
        document.body.style.overflow = ''; 
        
        setTimeout(() => {
            modal.classList.add('hidden');
            if(contentBox) contentBox.innerHTML = '';
        }, 300);
    }
}