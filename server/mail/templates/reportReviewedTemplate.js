const reportReviewedTemplate = (firstName, lastName) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Report Reviewed - Medical Pramarsh</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
            
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }

            .message {
                font-size: 20px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #0a7cff;
            }

            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }

            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }

            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }

            .highlight {
                font-weight: bold;
                color: #2e7d32;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="message">
                Your Report Has Been Reviewed
            </div>
            <div class="body">
                <p>Dear ${firstName || "user"} ${lastName || "user"}  ,</p>
                <p>
                    We would like to inform you that your medical report has been reviewed by one of our expert doctors.
                    You can <span class="highlight">check the details in your dashboard</span>.
                </p>
                <p>
                    If needed, the expert may also call you for further discussion. Please stay available; they will reach out to you when they are free.
                </p>
               <a href="http://localhost:5173/dashboard/home" class="cta">Go to Dashboard</a>
                <p>Thank you for choosing <strong>Medical Pramarsh</strong>. We care about your health.</p>
            </div>
            <div class="support">
                For any queries or assistance, please contact us at 
                <a href="mailto:info@medicalpramarsh.com">info@medicalpramarsh.com</a>.
            </div>
        </div>
    </body>
    </html>`;
};

module.exports = reportReviewedTemplate;
