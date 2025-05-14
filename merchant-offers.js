document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const loadingElement = document.getElementById('loading');
    const merchantInfoElement = document.getElementById('merchant-info');
    const errorMessageElement = document.getElementById('error-message');
    const merchantNameHeader = document.getElementById('merchant-name-header');
    const offersListElement = document.querySelector('.offers-list');
    
    // Get merchant ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const merchantId = urlParams.get('merchant');
    
    // If no merchant ID, show error
    if (!merchantId) {
        showError();
        return;
    }
    
    // Fetch merchant info and offers (simulated for MVP)
    fetchMerchantData(merchantId);
    
    // Functions
    function fetchMerchantData(merchantId) {
        // For MVP, simulate loading merchant info
        setTimeout(() => {
            // Simulate merchant data (in real app, this would come from an API)
            const merchantData = {
                id: merchantId,
                name: 'Portofino Restaurante & Bar',
                imageUrl: 'https://cloudfront.osimages.us/eyJidWNrZXQiOiJvZmVydGEtdXBsb2Fkcy1wcm9kIiwia2V5IjoicGljdHVyZXNcL25ld19vZmZlcl9pbWFnZXNcL2RlYTJlMTE1MTdkNGNmMzM4NzJmYzg1YTY3NjE5NTgxLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjQ4LCJmaXQiOiJjb3ZlciIsImhlaWdodCI6MzYzfX19',
                offers: [
                    {
                        id: 'offer1',
                        name: 'Menú Ejecutivo',
                        description: 'Consume $30 en comidas y bebidas en Portofino Restaurante & Bar.',
                        imageUrl: 'https://cloudfront.osimages.us/eyJidWNrZXQiOiJvZmVydGEtdXBsb2Fkcy1wcm9kIiwia2V5IjoicGljdHVyZXNcL25ld19vZmZlcl9pbWFnZXNcL2RlYTJlMTE1MTdkNGNmMzM4NzJmYzg1YTY3NjE5NTgxLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjQ4LCJmaXQiOiJjb3ZlciIsImhlaWdodCI6MzYzfX19'
                    },
                    {
                        id: 'offer2',
                        name: 'Brunch para Dos',
                        description: 'Disfruta de un brunch completo para dos personas incluyendo bebidas y postre en Portofino Restaurante & Bar.',
                        imageUrl: 'https://cloudfront.osimages.us/eyJidWNrZXQiOiJvZmVydGEtdXBsb2Fkcy1wcm9kIiwia2V5IjoicGljdHVyZXNcL25ld19vZmZlcl9pbWFnZXNcL2RlYTJlMTE1MTdkNGNmMzM4NzJmYzg1YTY3NjE5NTgxLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjQ4LCJmaXQiOiJjb3ZlciIsImhlaWdodCI6MzYzfX19'
                    }
                ]
            };
            
            // Display merchant information and offers
            displayMerchantInfo(merchantData);
        }, 1000);
    }
    
    function displayMerchantInfo(merchant) {
        // Set merchant name in header
        if (merchantNameHeader) {
            merchantNameHeader.textContent = merchant.name || '';
        }
        
        // Display offers
        displayOffers(merchant.offers);
        
        // Show merchant info section
        loadingElement.style.display = 'none';
        merchantInfoElement.style.display = 'block';
    }
    
    function displayOffers(offers) {
        // Clear any existing offers
        offersListElement.innerHTML = '';
        
        // Add each offer
        offers.forEach(offer => {
            const offerElement = document.createElement('div');
            offerElement.className = 'offer-item';
            offerElement.dataset.offerId = offer.id;
            
            offerElement.innerHTML = `
                <img class="offer-image" src="${offer.imageUrl}" alt="${offer.name}">
                <div class="offer-content">
                    <h3 class="offer-name">${offer.name}</h3>
                    <p class="offer-description-short">${offer.description}</p>
                </div>
            `;
            
            // Add click event to navigate to voucher selection page
            offerElement.addEventListener('click', () => {
                window.location.href = `voucher-selection.html?offer=${offer.id}`;
            });
            
            offersListElement.appendChild(offerElement);
        });
    }
    
    function showError() {
        loadingElement.style.display = 'none';
        errorMessageElement.style.display = 'block';
    }
}); 