// Highlight active navigation link on load
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.pathname === window.location.pathname) {
        link.classList.add('active');
    }
});

/* 
 * OPTIONAL: Client-side Markdown Rendering
 * Uncomment below to render .md files directly in-browser using marked.js
 * Requires adding <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script> to head
 */

async function renderMarkdown(containerId, rawUrl) {
    try {
        const response = await fetch(rawUrl);
        if (!response.ok) throw new Error('Failed to load markdown');
        const md = await response.text();
        document.getElementById(containerId).innerHTML = marked.parse(md);
    } catch (err) {
        document.getElementById(containerId).innerHTML = '<p class="error">⚠️ Failed to render note.</p>';
        console.error(err);
    }
}

