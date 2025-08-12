document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const loadingElement = document.getElementById('loading');
    const voucherInfoElement = document.getElementById('voucher-info');
    const errorMessageElement = document.getElementById('error-message');
    const redeemedMessageElement = document.getElementById('redeemed-message');
    const voucherNameElement = document.getElementById('voucher-name');
    const voucherDescriptionElement = document.getElementById('voucher-description');
    const voucherExpiryElement = document.getElementById('voucher-expiry');
    const confirmationCodeElement = document.getElementById('confirmation-code');
    const voucherImageElement = document.getElementById('voucher-image');
    const voucherLocationElement = document.getElementById('voucher-location');
    const redemptionDatetimeElement = document.getElementById('redemption-datetime');
    const redeemedDealTextElement = document.getElementById('redeemed-deal-text');
    
    // Store voucher data globally so we can access it in the success message
    let currentVoucherData = null;
    
    // Buttons and modals
    const redeemBtn = document.getElementById('redeem-btn');
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmBtn = document.getElementById('confirm-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const timerModal = document.getElementById('timer-modal');
    const countdownElement = document.getElementById('countdown');
    const cancelTimerBtn = document.getElementById('cancel-timer-btn');
    // Info modal (auto on load)
    const infoModal = document.getElementById('info-modal');
    const infoCloseBtn = document.getElementById('info-close-btn');
    const infoXBtn = document.getElementById('info-x-btn');
    
    // Get voucher token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const voucherToken = urlParams.get('voucher');
    
    // If no voucher token, show error
    if (!voucherToken) {
        showError();
        return;
    }
    
    // Fetch voucher info (simulated for MVP)
    fetchVoucherInfo(voucherToken);
    
    // Show info modal on load to explain no visible QR and gifting policy
    if (infoModal) {
        infoModal.style.display = 'flex';
    }

    // Event listeners
    redeemBtn.addEventListener('click', () => {
        showConfirmationModal();
    });
    
    confirmBtn.addEventListener('click', () => {
        hideConfirmationModal();
        startRedemptionProcess();
    });
    
    cancelBtn.addEventListener('click', () => {
        hideConfirmationModal();
    });
    
    cancelTimerBtn.addEventListener('click', () => {
        cancelRedemption();
    });
    
    if (infoCloseBtn) {
        infoCloseBtn.addEventListener('click', () => {
            infoModal.style.display = 'none';
        });
    }
    if (infoXBtn) {
        infoXBtn.addEventListener('click', () => {
            infoModal.style.display = 'none';
        });
    }
    
    // Functions
    function fetchVoucherInfo(token) {
        // For MVP, simulate loading voucher info
        setTimeout(() => {
            // Simulate voucher data (in real app, this would come from an API)
            const voucherData = {
                id: token,
                code: "5629233-1", // We'll keep this for internal tracking but not display it
                name: 'Portofino',
                description: 'Consume $30 en comidas y bebidas en Portofino Restaurante & Bar.',
                expiry: '2030-01-01',
                location: 'Portofino',
                imageUrl: 'https://cloudfront.osimages.us/eyJidWNrZXQiOiJvZmVydGEtdXBsb2Fkcy1wcm9kIiwia2V5IjoicGljdHVyZXNcL25ld19vZmZlcl9pbWFnZXNcL2RlYTJlMTE1MTdkNGNmMzM4NzJmYzg1YTY3NjE5NTgxLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjQ4LCJmaXQiOiJjb3ZlciIsImhlaWdodCI6MzYzfX19',
                isRedeemed: false
            };
            
            // Store voucher data globally
            currentVoucherData = voucherData;
            
            // Display voucher information
            displayVoucherInfo(voucherData);
        }, 1000);
    }
    
    function displayVoucherInfo(voucher) {
        if (voucher.isRedeemed) {
            // If voucher is already redeemed, show redeemed message
            showRedeemedMessage(voucher.code);
            return;
        }
        
        // Display voucher information
        voucherNameElement.textContent = voucher.name;
        voucherDescriptionElement.textContent = voucher.description;
        voucherExpiryElement.textContent = formatDate(voucher.expiry);
        
        // Set additional voucher details
        if (voucherLocationElement) voucherLocationElement.textContent = voucher.location;
        
        // Set voucher image if available
        if (voucherImageElement && voucher.imageUrl) {
            voucherImageElement.src = voucher.imageUrl;
            voucherImageElement.alt = voucher.name;
        }
        
        // Show voucher info section
        loadingElement.style.display = 'none';
        voucherInfoElement.style.display = 'block';
        
        // Force a reflow to ensure the layout updates
        window.setTimeout(function() {
            if (voucherInfoElement.scrollHeight > voucherInfoElement.clientHeight) {
                // Add bottom padding to ensure the content is scrollable
                document.querySelector('.voucher-content').style.paddingBottom = '30px';
            }
        }, 100);
    }
    
    function showError() {
        loadingElement.style.display = 'none';
        errorMessageElement.style.display = 'block';
    }
    
    function showConfirmationModal() {
        confirmationModal.style.display = 'flex';
    }
    
    function hideConfirmationModal() {
        confirmationModal.style.display = 'none';
    }
    
    function startRedemptionProcess() {
        timerModal.style.display = 'flex';
        
        let timeLeft = 5;
        const totalTime = 5;
        countdownElement.textContent = timeLeft;
        
        // Reset and show progress bar
        const progressBar = document.getElementById('progress-bar');
        progressBar.style.width = '0%';
        
        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = timeLeft;
            
            // Update progress bar
            const progressPercentage = 100 - (timeLeft / totalTime * 100);
            progressBar.style.width = `${progressPercentage}%`;
            
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                completeRedemption();
            }
        }, 1000);
        
        // Store interval ID for cancellation
        window.countdownInterval = countdownInterval;
    }
    
    function cancelRedemption() {
        clearInterval(window.countdownInterval);
        timerModal.style.display = 'none';
    }
    
    function completeRedemption() {
        // Hide timer modal
        timerModal.style.display = 'none';
        
        // Hide voucher info
        voucherInfoElement.style.display = 'none';
        
        // Update voucher as redeemed (in a real app, this would call an API)
        // For MVP, just show the redeemed message
        const voucherCode = voucherToken;
        
        // Capture redemption datetime
        const now = new Date();
        const formattedDate = formatRedemptionDate(now);
        
        // Show redemption message with date/time
        showRedeemedMessage(voucherCode, formattedDate);
    }
    
    function showRedeemedMessage(voucherCode, formattedDate) {
        confirmationCodeElement.textContent = voucherCode;
        
        if (redemptionDatetimeElement && formattedDate) {
            redemptionDatetimeElement.textContent = formattedDate;
        }
        
        // Display the deal information that was redeemed
        if (redeemedDealTextElement && currentVoucherData) {
            redeemedDealTextElement.textContent = currentVoucherData.description;
        }
        
        redeemedMessageElement.style.display = 'block';
        
        // In a real app, update voucher status in database
        console.log('Voucher redeemed:', voucherCode, 'at', formattedDate);
    }
    
    function formatRedemptionDate(date) {
        // Format date in Spanish format: 23 de Noviembre de 2023, 14:35:22
        const options = { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        
        return date.toLocaleDateString('es-ES', options);
    }
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
}); 