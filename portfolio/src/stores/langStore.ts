import { ref, type Ref } from 'vue';
import text_fr from '../lang/fr.json';


function getTexts(lang: string): Ref {
    switch (lang) {
        case 'fr':
            return ref(text_fr);
        default:
            return ref(text_fr);
    }
}

export const useLangStore = () => {
    const lang = ref('fr');
    const texts = getTexts(lang.value);

    function setLang(newLang: string): void {
        lang.value = newLang;
        texts.value = getTexts(newLang).value;
    }

    return { lang, texts, setLang };
};