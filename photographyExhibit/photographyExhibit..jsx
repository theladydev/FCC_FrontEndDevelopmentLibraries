
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.subheading').textContent;
            const description = this.querySelector('.description').textContent;
            console.log(`📸 ${title}: ${description}`);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    console.log('🖼️ Photography Exhibit loaded successfully!');
});