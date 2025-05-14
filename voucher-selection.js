document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const loadingElement = document.getElementById('loading');
    const offerInfoElement = document.getElementById('offer-info');
    const errorMessageElement = document.getElementById('error-message');
    const merchantNameHeader = document.getElementById('merchant-name-header');
    const vouchersListElement = document.querySelector('.vouchers-list');
    const backButton = document.getElementById('back-btn');
    
    // Get offer ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const offerId = urlParams.get('offer');
    
    // If no offer ID, show error
    if (!offerId) {
        showError();
        return;
    }
    
    // Fetch offer info and vouchers (simulated for MVP)
    fetchOfferData(offerId);
    
    // Set back button click event
    backButton.addEventListener('click', () => {
        // In a real app, this would go back to the merchant offers page with the correct merchant ID
        window.location.href = `merchant-offers.html?merchant=merchant1`;
    });
    
    // Functions
    function fetchOfferData(offerId) {
        // For MVP, simulate loading offer info
        setTimeout(() => {
            // Simulate offer data (in real app, this would come from an API)
            let offerData;
            
            if (offerId === 'offer1') {
                offerData = {
                    id: offerId,
                    name: 'Menú Ejecutivo',
                    merchantName: 'Portofino Restaurante & Bar',
                    description: 'Consume $30 en comidas y bebidas en Portofino Restaurante & Bar.',
                    imageUrl: 'https://cloudfront.osimages.us/eyJidWNrZXQiOiJvZmVydGEtdXBsb2Fkcy1wcm9kIiwia2V5IjoicGljdHVyZXNcL25ld19vZmZlcl9pbWFnZXNcL2RlYTJlMTE1MTdkNGNmMzM4NzJmYzg1YTY3NjE5NTgxLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjQ4LCJmaXQiOiJjb3ZlciIsImhlaWdodCI6MzYzfX19',
                    vouchers: [
                        {
                            id: 'voucher1',
                            code: '5629233-1',
                            purchaseDate: '12/01/2023',
                            expiryDate: '12/01/2024',
                            valueProposition: 'Paga $20 y recibe $40 en crédito'
                        },
                        {
                            id: 'voucher2',
                            code: '5629233-2',
                            purchaseDate: '15/01/2023',
                            expiryDate: '15/01/2024',
                            valueProposition: 'Menú completo fijo por $30'
                        }
                    ]
                };
            } else {
                offerData = {
                    id: offerId,
                    name: 'Brunch para Dos',
                    merchantName: 'Portofino Restaurante & Bar',
                    description: 'Disfruta de un brunch completo para dos personas incluyendo bebidas y postre en Portofino Restaurante & Bar.',
                    imageUrl: 'https://cloudfront.osimages.us/eyJidWNrZXQiOiJvZmVydGEtdXBsb2Fkcy1wcm9kIiwia2V5IjoicGljdHVyZXNcL25ld19vZmZlcl9pbWFnZXNcL2RlYTJlMTE1MTdkNGNmMzM4NzJmYzg1YTY3NjE5NTgxLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjQ4LCJmaXQiOiJjb3ZlciIsImhlaWdodCI6MzYzfX19',
                    vouchers: [
                        {
                            id: 'voucher3',
                            code: '5629234-1',
                            purchaseDate: '20/01/2023',
                            expiryDate: '20/01/2024',
                            valueProposition: 'Paga $45 y recibe $90 en crédito'
                        },
                        {
                            id: 'voucher4',
                            code: '5629234-2',
                            purchaseDate: '22/01/2023',
                            expiryDate: '22/01/2024',
                            valueProposition: 'Brunch Premium por $60'
                        }
                    ]
                };
            }
            
            // Display offer information and vouchers
            displayOfferInfo(offerData);
        }, 1000);
    }
    
    function displayOfferInfo(offer) {
        // Set merchant name in header
        if (merchantNameHeader) {
            merchantNameHeader.textContent = offer.merchantName || '';
        }
        
        // Display vouchers, passing the merchant name
        displayVouchers(offer.vouchers, offer.merchantName);
        
        // Show offer info section
        loadingElement.style.display = 'none';
        offerInfoElement.style.display = 'block';
    }
    
    function displayVouchers(vouchers, merchantName) {
        // Clear any existing vouchers
        vouchersListElement.innerHTML = '';
        
        // Add each voucher
        vouchers.forEach(voucher => {
            const voucherElement = document.createElement('div');
            voucherElement.className = 'voucher-item';
            voucherElement.dataset.voucherId = voucher.id;
            
            voucherElement.innerHTML = `
                <div class="voucher-content-small">
                    <div class="voucher-value-proposition">
                        <span class="proposition-tag">${voucher.valueProposition}</span>
                    </div>
                    <p class="voucher-description-short">
                        <strong>Fecha de compra:</strong> ${voucher.purchaseDate}<br>
                        <strong>Fecha de expiración:</strong> ${voucher.expiryDate}
                    </p>
                    <button class="voucher-cta-btn">Canjear</button>
                    <div class="voucher-code-bottom">Cupón #${voucher.code}</div>
                </div>
            `;
            
            // Add the voucher element to the list
            vouchersListElement.appendChild(voucherElement);
            
            // Get the CTA button inside this voucher
            const ctaButton = voucherElement.querySelector('.voucher-cta-btn');
            
            // Add click event to the CTA button
            ctaButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Stop event from bubbling to parent
                window.location.href = `redeem.html?voucher=${voucher.id}`;
            });
            
            // Add click event to the rest of the voucher card
            voucherElement.addEventListener('click', () => {
                window.location.href = `redeem.html?voucher=${voucher.id}`;
            });
        });
    }
    
    function showError() {
        loadingElement.style.display = 'none';
        errorMessageElement.style.display = 'block';
    }
}); 