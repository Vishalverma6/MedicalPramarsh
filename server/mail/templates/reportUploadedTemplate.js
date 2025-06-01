const reportUploadedTemplate = (doctorFirstName, doctorLastName, reportType) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8" />
      <title>New Report Uploaded - Medical Pramarsh</title>
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
              New Medical Report Uploaded
          </div>
          <div class="body">
              <p>Dear Dr. ${doctorFirstName || "Doctor"} ${doctorLastName || ""},</p>
              <p>
                  A new <span class="highlight">${reportType || "medical"}</span> report has been uploaded on the platform.
              </p>
              <p>
                  Please <span class="highlight">log in to your dashboard</span> to review the report when you have free time.
              </p>
              <a href="https://medicalpramarsh.com/dashboard/home" class="cta">Go to Dashboard</a>
              <p>Thank you for your continuous support and dedication.</p>
          </div>
          <div class="support">
              For any queries or assistance, please contact us at
              <a href="mailto:info@medicalpramarsh.com">info@medicalpramarsh.com</a>.
          </div>
      </div>
  </body>
  </html>`;
};

module.exports = reportUploadedTemplate;
