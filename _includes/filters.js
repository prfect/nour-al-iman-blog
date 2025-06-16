/**
 * Filtres personnalisés pour Eleventy
 * Ces filtres sont utilisés dans les templates pour formater les données
 */

const { DateTime } = require("luxon");

// Filtre pour convertir une chaîne arabe en slug
function arabicSlug(str) {
  if (!str) return '';
  
  // Table de correspondance pour les caractères arabes
  const arabicToLatinMap = {
    'ا': 'a', 'أ': 'a', 'إ': 'e', 'آ': 'a',
    'ب': 'b', 'ت': 't', 'ث': 'th',
    'ج': 'j', 'ح': 'h', 'خ': 'kh',
    'د': 'd', 'ذ': 'th',
    'ر': 'r', 'ز': 'z',
    'س': 's', 'ش': 'sh',
    'ص': 's', 'ض': 'd',
    'ط': 't', 'ظ': 'z',
    'ع': 'a', 'غ': 'gh',
    'ف': 'f', 'ق': 'q',
    'ك': 'k', 'ل': 'l',
    'م': 'm', 'ن': 'n',
    'ه': 'h', 'ة': 'a',
    'و': 'w', 'ي': 'y', 'ى': 'a',
    'ء': '',
    // Voyelles arabes à ignorer
    'َ': '', 'ُ': '', 'ِ': '', 'ّ': '', 'ْ': '', 'ٌ': '', 'ٍ': '', 'ً': ''
  };
  
  // Translittération des caractères arabes
  let latinized = '';
  for (let i = 0; i < str.length; i++) {
    if (arabicToLatinMap[str[i]]) {
      latinized += arabicToLatinMap[str[i]];
    } else {
      latinized += str[i];
    }
  }
  
  // Convertir en slug standard
  return latinized
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Supprimer les caractères spéciaux
    .replace(/\s+/g, '-') // Remplacer les espaces par des tirets
    .replace(/--+/g, '-') // Éviter les tirets multiples
    .trim() // Supprimer les espaces au début et à la fin
    .replace(/^-+/, '') // Supprimer les tirets au début
    .replace(/-+$/, ''); // Supprimer les tirets à la fin
}

// Filtre pour formater les dates
function formatDate(dateObj) {
  if (!dateObj) return '';
  
  const date = new Date(dateObj);
  
  // Formats des mois et jours en arabe
  const arabicMonths = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  
  // Convertir les chiffres en arabe
  function toArabicDigits(num) {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().replace(/[0-9]/g, match => arabicDigits[match]);
  }
  
  const day = toArabicDigits(date.getDate());
  const month = arabicMonths[date.getMonth()];
  const year = toArabicDigits(date.getFullYear());
  
  return `${day} ${month} ${year}`;
}

// Filtrer les posts par catégorie
function filterByCategory(posts, category) {
  if (!posts || !category) return [];
  
  return posts.filter(post => post.data.category === category);
}

// Exclure le post actuel des posts connexes
function excludeCurrentPost(posts, currentUrl) {
  if (!posts || !currentUrl) return [];
  
  return posts.filter(post => post.url !== currentUrl);
}

// Limiter le nombre de posts
function limitPosts(posts, limit) {
  if (!posts) return [];
  
  return posts.slice(0, limit);
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("slug", arabicSlug);
  eleventyConfig.addFilter("formatDate", formatDate);
  eleventyConfig.addFilter("filterByCategory", filterByCategory);
  eleventyConfig.addFilter("excludeCurrentPost", excludeCurrentPost);
  eleventyConfig.addFilter("limit", limitPosts);
};
