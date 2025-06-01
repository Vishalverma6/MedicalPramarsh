const twilio = require("twilio");
require("dotenv").config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsAppTemplateMessage = async (contactNumber) => {
    try {

        // Add country code if missing - assuming +91 for example
        if (!contactNumber.startsWith('+')) {
            contactNumber = '+91' + contactNumber;
        }

        const message = await client.messages.create({
            from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER,
            to: 'whatsapp:' + contactNumber,
            contentSid: 'HX28abd67e69ef94b8e0afe211ad71609b',
        })
        console.log("phone", contactNumber);

        console.log("WhatsApp message Sent:", message.sid);
    }
    catch (error) {
        console.error("failed to send WhatsApp message:", error.message);
    }
}

module.exports = sendWhatsAppTemplateMessage;