document.addEventListener('DOMContentLoaded', () => {
    const toolGrid = document.getElementById('latest-tools');
    const filterContainer = document.querySelector('.filter-grid');
    const toggleIcon = document.getElementById('icon');

    toggleIcon.onclick = function () {
        document.body.classList.toggle("dark-theme");
        if (document.body.classList.contains("dark-theme")) {
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        } else {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        }
    }
    

    // Définir une map pour les icônes FontAwesome en fonction des catégories
    const iconMap = {
        'Text': 'fa-solid fa-file-alt',
        'Image': 'fa-solid fa-image',
        'Video': 'fa-solid fa-video',
        'Chatbot': 'fa-solid fa-comments',
        'Productivity': 'fa-solid fa-tasks',
        'Design': 'fa-solid fa-paint-brush',
        'Marketing': 'fa-solid fa-bullhorn',
        'Audio': 'fa-solid fa-microphone-alt',
        'Transcription': 'fa-solid fa-keyboard',
        'Development': 'fa-solid fa-laptop-code',
        'Code': 'fa-solid fa-code',
        'Data': 'fa-solid fa-database',
        'Automation': 'fa-solid fa-robot',
        'Artificial Intelligence': 'fa-solid fa-brain',
        'Analytics': 'fa-solid fa-chart-column',
        'Website': 'fa-solid fa-globe',
        'Resume': 'fa-solid fa-file',
        'Maths': 'fa-solid fa-calculator',
        'SEO': 'fa-solid fa-timeline',
        'Logo': 'fa-solid fa-font-awesome',
        'Ads': 'fa-solid fa-rectangle-ad',
    };

    fetch('data/tools.json')
        .then(response => response.json())
        .then(tools => {
            // Afficher les 10 derniers outils
            const latestTools = tools.slice(-8).reverse(); // Les 10 derniers outils

            // Générer la grille des outils
            toolGrid.innerHTML = latestTools.map(tool => `
                <div class="tool-card" data-tool-id="${tool.id}">
                    <div class="logo-container">
                        <img src="assets/images/tools/${tool.image}" alt="${tool.name}">
                        <h3>${tool.name}</h3>
                    </div>
                    <p>${tool.description}</p>
                    <div class="categories">
                        ${tool.category.map(cat => `
                            <div class="category">
                                <i class="${iconMap[cat] || 'fa-solid fa-tag'}"></i>
                                <span>${cat.replace('-', ' ')}</span>
                            </div>
                        `).join('')}
                    </div>
                    <a href="${tool.link}" target="_blank">Discover</a>
                </div>
            `).join('');

            // Générer les filtres
            const allCategories = new Set();
            tools.forEach(tool => {
                tool.category.forEach(cat => allCategories.add(cat));
            });

            filterContainer.innerHTML = Array.from(allCategories).map(cat => `
                <div class="filter">
                    <i class="${iconMap[cat] || 'fa-solid fa-tag'}"></i>
                    <span>${cat}</span>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error loading tools:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const mainShareBtn = document.getElementById('share-btn');
    const mainShareCards = document.getElementById('share-cards');
    const footerShareBtn = document.getElementById('footer-share-btn');
    const footerShareCards = document.getElementById('footer-share-cards');

    function toggleShareCards(shareBtn, shareCards) {
        if (shareCards.classList.contains('show')) {
            shareCards.classList.remove('show');
            setTimeout(() => {
                shareCards.style.display = 'none';
            }, 300); // Duration should match CSS transition duration
        } else {
            shareCards.style.display = 'flex';
            setTimeout(() => {
                shareCards.classList.add('show');
            }, 10); // Small delay to trigger transition
        }
    }

    mainShareBtn.addEventListener('click', () => {
        toggleShareCards(mainShareBtn, mainShareCards);
    });

    footerShareBtn.addEventListener('click', () => {
        toggleShareCards(footerShareBtn, footerShareCards);
    });
});

const cursorDot =  document.querySelector("[data-cursor-dot]");
const cursorOutline =  document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {

    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`,
    }, { duration: 500, fill: "forwards"})
})

document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    const contactForm = document.getElementById('contact-form');

    newsletterForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;

        try {
            const response = await fetch('https://n8n-d3q7.onrender.com/webhook/a25a8be3-4816-4f1b-8d9a-18259d1746b2', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            if (response.ok) {
                alert('Success! Your email has been added to the newsletter.');
            } else {
                alert('There was an error. Please try again.');
                console.log('Response status:', response.status);
                console.log('Response text:', await response.text());
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });

    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const name = contactForm.querySelector('input[placeholder="Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Email"]').value;
        const message = contactForm.querySelector('textarea').value;

        try {
            const response = await fetch('https://n8n-d3q7.onrender.com/webhook/contact-form-webhook-id', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, email: email, message: message })
            });

            if (response.ok) {
                alert('Thank you for contacting us. We will get back to you soon.');
            } else {
                alert('There was an error. Please try again.');
                console.log('Response status:', response.status);
                console.log('Response text:', await response.text());
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const logoScrollWrapper = document.getElementById('logo-scroll-wrapper');

    // Liste des noms de fichiers des logos
    const logos = [
        'sintraai.png',
        'elevenlabs.png',
        'durable.png',
        'synthesys.png',
        'shuffll.png',
        'fliki.png',
        'descript.png',
        'veed.png',
        'imagica.png',
        'adcreative.png',
        'adcreative.jpeg',
        'plai.png',
        'madgicx.png',
        'leap.png',
        'adcopy.png',
        'tldv.png',
        'vidiq.png',
        'semrush.png',
        'phind.png',
        'ideogram.png',
        'brandmark.png',
        'logoai.png',
        'safurai.png',
        'replit.png',
        'baloonary.png',
        'dixweb.png',
        'chatfuel.png',
        'dialogflow.png',
        'pebblely.png',
        'pebblely.webp',
        'clearscope.png',
        'wordstream.png',
        'quillbot.png',
        'respell.png',
        'alliai.png',
        'getmind.png',
        'coze.png',
        'textfx.png',
        'copilot.png',
        'monica.png',
        'gemini.png',
        'framer.png',
        'bubble.png',
        'syllaby.png',
        'heygen.png',
        'jasperai.png',
        'claudai.png',
        'mockyai.png',
        'imvideo.png',
        'claidai.png',
        'hireflow.png',
        'huggingface.png',
        'gptexcel.png',
        'freepik.png',
        'kittl.png',
        'gamma.png',
        'leonardo.png',
        'videotoblog.png',
        'podcastle.png',
        'mindgrasp.png',
        'lumalabs.png',
        'simplified.png',
        'photoeditor.png',
        'kuasarvideo.png',
        'kickresume.png',
        'taskade.png',
        'chatbase.png',
        'popai.png',
        'hootsuite.png',
        'grammarly.png',
        'midjourney.png',
        'midjourney.jpeg',
        'dalle.png',
        'chatgpt.png',
        // Ajoutez d'autres noms de fichiers ici
    ];

    // Générer dynamiquement les balises <img> pour chaque logo
    logos.forEach(logo => {
        const img = document.createElement('img');
        img.src = `assets/images/tools/${logo}`;
        img.alt = `${logo} Logo`;
        img.classList.add('tool-logo');
        logoScrollWrapper.appendChild(img);
    });
});
