const expertApprovedTemplate = (firstName, lastName) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Access Approved - Medical Pramarsh</title>
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
                Welcome to Medical Pramarsh
            </div>
            <div class="body">
                <p>Dear ${firstName || "Doctor"} ${lastName || ""},</p>
                <p>
                    Congratulations! Your account as an <span class="highlight">Expert Reviewer</span> has been successfully approved by our admin team.
                </p>
                <p>
                    You now have access to review patients' medical reports and provide professional advice.
                </p>
                <p>
                    Please log in to your dashboard to begin reviewing assigned reports.
                </p>
               <a href="http://localhost:5173/dashboard/home" class="cta">Go to Dashboard</a>
                <p>Thank you for being a part of <strong>Medical Pramarsh</strong>. Your expertise makes a difference.</p>
            </div>
            <div class="support">
                For any queries or technical support, please contact us at 
                <a href="mailto:support@medicalpramarsh.com">support@medicalpramarsh.com</a>.
            </div>
        </div>
    </body>
    </html>`;
};

module.exports = expertApprovedTemplate;
