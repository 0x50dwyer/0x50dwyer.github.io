document.addEventListent('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main-content');
    const tocList = document.getElementById('toc-list');

    if (!mainContent || !tocList) {
        return;
    }

    const headings = mainContent.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${headings.id}`;
    a.textContent = headings.textContent;
    li.appendChild(a);

    tocList.appendChild(li);
});