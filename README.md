# Voucher Redemption System (MVP)

This is a simple MVP implementation of a QR code voucher redemption system. It simulates the process of scanning a QR code and redeeming a voucher.

## Features

- Simulates QR code scan via URL parameter
- Displays voucher information
- Confirmation process before redemption
- 5-second countdown timer with cancellation option
- Success message with confirmation code

## How to Use

1. Open `index.html` in your browser
2. Click on the "Simular escaneo QR" button to simulate scanning a QR code
3. View the voucher details
4. Click "Canjear" to start the redemption process
5. Confirm your intention to redeem
6. Wait for the 5-second countdown or cancel if needed
7. See the success message with confirmation code

## Technical Details

The MVP consists of:
- HTML files for the UI
- CSS for styling
- JavaScript for the redemption logic

All redemption logic is client-side only, with no backend dependencies for the MVP.

## Notes for Future Implementation

For a production version, you would need to:
1. Implement actual QR code scanning
2. Connect to a backend API for voucher validation and status updates
3. Add authentication and security features
4. Implement proper error handling and edge cases 