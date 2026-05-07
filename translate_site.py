import os
import re
import json
from openai import OpenAI

client = OpenAI()

LANGUAGES = {
    "en": "English",
    "es": "Spanish",
    "fr": "French",
    "hi": "Hindi",
    "bn": "Bengali",
    "ru": "Russian",
    "ja": "Japanese"
}

def translate_text(text, target_lang):
    prompt = f"Translate the following HTML/JS content to {target_lang}. Keep all HTML tags, attributes, and JavaScript code structure intact. Only translate the visible text content and relevant meta tags. Do not translate URLs or technical identifiers.\n\nContent:\n{text}"
    
    response = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "You are a professional translator specializing in web localization. Maintain the tone and style of the original content."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    return response.choices[0].message.content

def process_files():
    base_dir = "/home/ubuntu/cosmicai_site"
    pt_dir = os.path.join(base_dir, "pt-br")
    
    files_to_translate = [f for f in os.listdir(pt_dir) if f.endswith(".html")]
    
    for lang_code, lang_name in LANGUAGES.items():
        print(f"Translating to {lang_name}...")
        lang_dir = os.path.join(base_dir, lang_code)
        os.makedirs(lang_dir, exist_ok=True)
        
        for filename in files_to_translate:
            print(f"  Processing {filename}...")
            with open(os.path.join(pt_dir, filename), 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Update relative paths for subdirectories
            translated_content = translate_text(content, lang_name)
            
            # Post-processing: fix asset paths if necessary
            # Since files are in subfolders, assets/ should be ../assets/
            translated_content = translated_content.replace('href="assets/', 'href="../assets/')
            translated_content = translated_content.replace('src="assets/', 'src="../assets/')
            translated_content = translated_content.replace('href="index.html"', 'href="index.html"') # Keep local
            
            # Fix links to other pages to stay within the same language folder
            pages = ["horoscope.html", "blog.html", "about.html", "contact.html", "privacy-policy.html", "terms-of-use.html"]
            for page in pages:
                translated_content = translated_content.replace(f'href="{page}"', f'href="{page}"')
            
            # Update lang attribute
            translated_content = re.sub(r'lang="pt-BR"', f'lang="{lang_code}"', translated_content)
            
            with open(os.path.join(lang_dir, filename), 'w', encoding='utf-8') as f:
                f.write(translated_content)

if __name__ == "__main__":
    # We will also need a translated version of script.js for each language or a dynamic one
    # For simplicity, let's create a translations.js and modify script.js to use it
    process_files()
