Configuration Required
PayPal Setup
To enable live payments, update the 
.env
 file with your PayPal credentials:

File: 
.env

# Replace with your actual PayPal Client ID
# Get it from: https://developer.paypal.com/
REACT_APP_PAYPAL_CLIENT_ID=your_actual_client_id_here
# Tax rate (currently set to 16%)
REACT_APP_TAX_RATE=0.16
Steps to get PayPal Client ID:

Go to PayPal Developer Dashboard
Log in with your PayPal account
Navigate to "Apps & Credentials"
Create a new app or use existing one
Copy the "Client ID" for Sandbox (testing) or Live (production)
Paste it in the 
.env
 file
IMPORTANT

Sandbox vs Production

Use Sandbox Client ID for testing (payments won't be real)
Use Live Client ID for production (real payments)
Never commit the 
.env
 file to version control
