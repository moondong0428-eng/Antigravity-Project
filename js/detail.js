document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = parseInt(params.get('id')); // IDs are numbers in our data
    const container = document.getElementById('detail-container');

    // Check if projectData is loaded
    if (!window.projectData) {
        container.innerHTML = '<p class="error">Project data not found.</p>';
        return;
    }

    const project = window.projectData.find(p => p.id === projectId);

    if (project) {
        container.innerHTML = `
            <div class="detail-info">
                <h1 class="detail-title">${project.title}</h1>
                <p class="detail-meta">${project.location} | ${project.category.toUpperCase()}</p>
            </div>
            <div class="detail-images-container">
                ${project.images.map(item => {
            if (Array.isArray(item)) {
                return `<div class="detail-image-row">
                            ${item.map(img => `<div class="detail-image-wrapper half"><img src="${img}" alt="${project.title}" class="detail-image"></div>`).join('')}
                        </div>`;
            } else {
                return `<div class="detail-image-wrapper"><img src="${item}" alt="${project.title}" class="detail-image"></div>`;
            }
        }).join('')}
            </div>
            <div class="detail-info">
                <div class="detail-desc">
                    <p>${project.description}</p>
                    <p>
                        <!-- Example placeholder for more extended content -->
                        본 프로젝트는 ${project.location} 지역의 특성과 환경을 고려하여 설계되었습니다.
                        자연과의 조화, 사용자 중심의 공간 구성을 최우선으로 하여
                        디자인 노을만의 철학을 담아냈습니다.
                        시간이 지날수록 가치가 더해지는 공간을 지향합니다.
                    </p>
                </div>
                <a href="index.html#projects" class="back-btn">Back to Projects</a>
            </div>
        `;
        // Initialize Lightbox
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const detailImages = document.querySelectorAll('.detail-image');

        detailImages.forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        // Close Lightbox on click
        lightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    } else {
        container.innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <h2>Project not found</h2>
                <p>The project you are looking for does not exist.</p>
                <a href="index.html#projects" class="back-btn">Return to Projects</a>
            </div>
        `;
    }
});
