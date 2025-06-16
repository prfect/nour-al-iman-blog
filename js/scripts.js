// Enhanced JavaScript for accessibility features and animations
document.addEventListener('DOMContentLoaded', function() {
    // Font size controls
    const smallFont = document.querySelector('.font-size-small');
    const mediumFont = document.querySelector('.font-size-medium');
    const largeFont = document.querySelector('.font-size-large');
    
    if (smallFont && mediumFont && largeFont) {
        smallFont.addEventListener('click', function() {
            document.body.style.fontSize = '0.9rem';
            savePreference('fontSize', '0.9rem');
        });
        
        mediumFont.addEventListener('click', function() {
            document.body.style.fontSize = '1rem';
            savePreference('fontSize', '1rem');
        });
        
        largeFont.addEventListener('click', function() {
            document.body.style.fontSize = '1.2rem';
            savePreference('fontSize', '1.2rem');
        });
    }
    
    // Language toggle (simplified for demo)
    const langToggle = document.querySelector('.language-toggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            if (document.body.style.direction === 'ltr') {
                document.body.style.direction = 'rtl';
                langToggle.textContent = 'English / العربية';
                savePreference('direction', 'rtl');
            } else {
                document.body.style.direction = 'ltr';
                langToggle.textContent = 'العربية / English';
                savePreference('direction', 'ltr');
            }
        });
    }
    
    // Dark mode toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle input');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.classList.add('dark-mode');
                savePreference('darkMode', 'true');
            } else {
                document.documentElement.classList.remove('dark-mode');
                savePreference('darkMode', 'false');
            }
        });
    }
    
    // Animation for articles on scroll
    const articles = document.querySelectorAll('article');
    const animateOnScroll = function() {
        articles.forEach(article => {
            const articlePosition = article.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (articlePosition < screenPosition) {
                article.classList.add('animate-fade-in');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Load user preferences
    function loadPreferences() {
        // Pour une implémentation complète, utilisez localStorage ou cookies
        // Voici une version simplifiée pour la démo
        const savedFontSize = getPreference('fontSize') || '1rem';
        const savedDirection = getPreference('direction') || 'rtl';
        const savedDarkMode = getPreference('darkMode') || 'false';
        
        // Apply saved preferences
        document.body.style.fontSize = savedFontSize;
        
        if (savedDirection === 'ltr') {
            document.body.style.direction = 'ltr';
            if (langToggle) langToggle.textContent = 'العربية / English';
        }
        
        if (savedDarkMode === 'true') {
            document.documentElement.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.checked = true;
        }
    }
    
    // Function to save user preferences (using sessionStorage for demo)
    function savePreference(key, value) {
        try {
            sessionStorage.setItem('nourAlIman_' + key, value);
        } catch (e) {
            console.log('Preference could not be saved:', e);
        }
    }
    
    // Function to get user preferences
    function getPreference(key) {
        try {
            return sessionStorage.getItem('nourAlIman_' + key);
        } catch (e) {
            return null;
        }
    }
    
    // Load saved preferences
    loadPreferences();
    
    // Prayer times API - Aladhan API for Oujda, Morocco
    async function updatePrayerTimes() {
        const prayerTimesContainer = document.querySelector('.prayer-times');
        if (!prayerTimesContainer) return;
        
        try {
            // Get current date
            const today = new Date();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            
            // Coordinates for Oujda, Morocco
            const latitude = 34.68;
            const longitude = -1.9;
            
            const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=3`;
            
            // Show loading state
            prayerTimesContainer.innerHTML = '<p style="text-align: center;">جاري تحميل مواقيت الصلاة...</p>';
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.code === 200) {
                // Get today's prayer times
                const dayOfMonth = today.getDate() - 1; // API uses 0-based index
                const todayPrayers = data.data[dayOfMonth].timings;
                
                // Format prayer times
                const prayerTimes = {
                    'الفجر': formatTime(todayPrayers.Fajr),
                    'الشروق': formatTime(todayPrayers.Sunrise),
                    'الظهر': formatTime(todayPrayers.Dhuhr),
                    'العصر': formatTime(todayPrayers.Asr),
                    'المغرب': formatTime(todayPrayers.Maghrib),
                    'العشاء': formatTime(todayPrayers.Isha)
                };
                
                // Create HTML for prayer times
                let prayerTimesHTML = '<ul class="prayer-times-list">';
                for (const [prayer, time] of Object.entries(prayerTimes)) {
                    prayerTimesHTML += `<li><span class="prayer-name">${prayer}</span><span class="prayer-time">${time}</span></li>`;
                }
                prayerTimesHTML += '</ul>';
                
                prayerTimesContainer.innerHTML = prayerTimesHTML;
            } else {
                throw new Error('Failed to fetch prayer times');
            }
        } catch (error) {
            console.error('Error fetching prayer times:', error);
            prayerTimesContainer.innerHTML = '<p style="text-align: center;">تعذر تحميل مواقيت الصلاة. يرجى المحاولة لاحقاً.</p>';
        }
    }
    
    // Format time from API (remove timezone info)
    function formatTime(timeString) {
        return timeString.split(' ')[0];
    }
    
    // Update prayer times
    updatePrayerTimes();
    
    // Hijri date converter
    function updateHijriDate() {
        const hijriDateElement = document.querySelector('.hijri-date');
        if (!hijriDateElement) return;
        
        try {
            // Get current date
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            
            // API for Hijri date conversion
            const url = `https://api.aladhan.com/v1/gToH/${day}-${month}-${year}`;
            
            // Fetch Hijri date
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.code === 200) {
                        const hijri = data.data.hijri;
                        const hijriDate = `${hijri.day} ${hijri.month.ar} ${hijri.year} هـ`;
                        hijriDateElement.textContent = hijriDate;
                    } else {
                        throw new Error('Failed to fetch Hijri date');
                    }
                })
                .catch(error => {
                    console.error('Error fetching Hijri date:', error);
                    hijriDateElement.textContent = 'تعذر تحميل التاريخ الهجري';
                });
        } catch (error) {
            console.error('Error in Hijri date function:', error);
            hijriDateElement.textContent = 'تعذر تحميل التاريخ الهجري';
        }
    }
    
    // Update Hijri date
    updateHijriDate();
    
    // Featured content slideshow
    let currentSlide = 0;
    const slides = document.querySelectorAll('.featured-slide');
    const slideIndicators = document.querySelectorAll('.slide-indicator');
    
    function showSlide(index) {
        if (slides.length > 0) {
            slides.forEach(slide => slide.style.display = 'none');
            slideIndicators.forEach(indicator => indicator.classList.remove('active'));
            
            slides[index].style.display = 'block';
            slideIndicators[index].classList.add('active');
            currentSlide = index;
        }
    }
    
    function nextSlide() {
        if (slides.length > 0) {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    }
    
    // Initialize slideshow if elements exist
    if (slides.length > 0 && slideIndicators.length > 0) {
        showSlide(0);
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Add click event for indicators
        slideIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });
    }
    
    // Search form validation
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            const searchInput = this.querySelector('.search-input');
            if (searchInput && searchInput.value.trim() === '') {
                event.preventDefault();
                alert('الرجاء إدخال كلمة للبحث');
            }
        });
    }
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && !isValidEmail(emailInput.value)) {
                event.preventDefault();
                alert('الرجاء إدخال بريد إلكتروني صحيح');
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
});
