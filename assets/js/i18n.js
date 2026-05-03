function updateContent(lang) {
    const translation = translations[lang] || translations['pt-BR'];
    
    // Update Title
    document.title = translation.title;
    
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translation[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation[key];
            } else {
                element.innerText = translation[key];
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Save preference
    localStorage.setItem('preferred-lang', lang);
}

function initLanguage() {
    const savedLang = localStorage.getItem('preferred-lang');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = savedLang || (translations[navigator.language] ? navigator.language : (translations[browserLang] ? browserLang : 'pt-BR'));
    
    updateContent(defaultLang);

    // Add event listeners to language selectors if they exist
    document.querySelectorAll('.lang-select').forEach(select => {
        select.value = defaultLang;
        select.addEventListener('change', (e) => {
            updateContent(e.target.value);
        });
    });
}

document.addEventListener('DOMContentLoaded', initLanguage);
