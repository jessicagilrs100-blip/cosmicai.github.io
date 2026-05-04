function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.setAttribute('placeholder', translations[lang][key]);
        }
    });

    // Update meta tags
    if (translations[lang]) {
        document.title = translations[lang].site_title;
        document.querySelector('meta[name="description"]')?.setAttribute('content', translations[lang].site_description);
        document.querySelector('meta[name="keywords"]')?.setAttribute('content', translations[lang].meta_keywords);
    }

    localStorage.setItem('preferred-language', lang);
    document.documentElement.lang = lang;
}

document.getElementById('language-select').addEventListener('change', (e) => {
    updateLanguage(e.target.value);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferred-language') || 'pt-BR';
    const select = document.getElementById('language-select');
    if (select) {
        select.value = savedLang;
        updateLanguage(savedLang);
    }
});
