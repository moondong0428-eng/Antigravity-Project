document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            let target = null;
            try {
                target = document.querySelector(href);
            } catch (err) {
                // Ignore invalid selectors or special hashes like #projects-landscape
            }

            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation styles to sections
    document.querySelectorAll('section > .container').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(section);
    });

    // Dynamic Project Rendering
    const projectGrid = document.getElementById('project-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');

    function renderProjects(category) {
        projectGrid.innerHTML = '';
        const projects = window.projectData || [];

        // Sort projects by ID descending (newest first)
        const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

        const filteredProjects = category === 'all'
            ? sortedProjects.slice(0, 3)
            : sortedProjects.filter(p => p.category === category);

        if (filteredProjects.length === 0) {
            projectGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No projects found in this category.</p>';
            return;
        }

        filteredProjects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.innerHTML = `
                <div class="project-image" style="background-image: url('${project.images[0]}'); background-size: cover; background-position: center;"></div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.location}</p>
                    <p class="project-desc">${project.description}</p>
                </div>
            `;
            projectGrid.appendChild(projectItem);

            // Add click event to navigate to detail page
            projectItem.style.cursor = 'pointer';
            projectItem.addEventListener('click', () => {
                window.location.href = `project-detail.html?id=${project.id}`;
            });
        });
    }

    // Initial Render - Check for Hash
    function handleHashChange() {
        const hash = window.location.hash;
        const headerHeight = document.querySelector('header').offsetHeight;

        if (hash === '#projects-landscape') {
            document.querySelector('.tab-btn[data-category="landscape"]').click();
            const section = document.getElementById('projects');
            const top = section.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: top, behavior: 'smooth' });
        } else if (hash === '#projects-environment') {
            document.querySelector('.tab-btn[data-category="environment"]').click();
            const section = document.getElementById('projects');
            const top = section.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: top, behavior: 'smooth' });
        } else if (hash === '#projects') {
            renderProjects('all');
            const section = document.getElementById('projects');
            const top = section.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: top, behavior: 'smooth' });
        } else {
            // Default render if no hash or unrelated hash
            renderProjects('all');
        }
    }

    // Run on load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Tab Click Event
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            renderProjects(category);
        });
    });
});
