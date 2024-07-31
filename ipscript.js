// ipTracking.js

(function() {
    // Function to collect and send IP address
    async function collectIPAddress() {
        // Fetch the user's IP address using ipify
        let ipAddress;
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            ipAddress = data.ip;
        } catch (error) {
            console.error('Error fetching IP address:', error);
            return; // Exit if fetching IP fails
        }

        // Prepare data to send
        const dataToSend = {
            ipAddress: ipAddress,
        };

        // Send data to the server
        try {
            const serverResponse = await fetch('https://cookies-server-d3ky.onrender.com/api/store-ip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await serverResponse.json();
            console.log('IP tracking result:', result.message);
        } catch (error) {
            console.error('Error sending data to server:', error);
        }
    }

    // Call the function when the document is fully loaded
    window.onload = collectIPAddress;
})();
