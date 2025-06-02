exports.resetPasswordLink = (firstName, lastName, url) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset = "UTF-8">
        <title>Password Reset Link</title>
        <style>
            body{
               background-color: #ffffff;
               font-family:Arial, sans-serif;
               font-size:16px;
               line-height:1.4;
               color:#333333;
               margin:0;
               padding:0;
            }

            .container {
                max-width:600px;
                margin:0 auto;
                padding:20px;
                text-align:center;
            }

            .logo {
                max-width:200px;
                margin-bottom:20px;

            }

            .message {
               font-size:18px;
               font-weight:bold;
               margin-bottom:20px;
            }

            .body {
               font-size:16px;
               margin-bottom:20px;
            }

            .support {
                font-size:14px;
                color:#999999;
                margin-top:20px;
            }

            .highlight {
             font-weight:bold;
            }

            .name {
              font-size:22px;
              font-weight:bold;
              margin-bottom:18px
            }
            
            .url{
                color: #ffffff;               
                background-color: #FF0000;    
                cursor: pointer;              
                padding: 6px 12px;             
                border-radius: 6px;           
                text-decoration: none;  
            }
        </style>
         
    </head>

    <body>
        <div class="container">
           <a href="https://medicalpramarsh.com"><img class="logo"
           src="" alt="Medical Pramarsh Logo">  
           </a>
           <div class="name">Medical Pramarsh</div>
           <div class="message">Password Reset Link </div>
           <div class="body">
               <p>Dear ${firstName} ${lastName},</p>
               <p> 
                 We’ve received your request to reset your password. Please click the link below to complete the reset. 
               </p>
               <p><a class="url" href="${url}">Reset Password Link</a></p>
           </div>
           <div class="support">
              <p>This link is valid for a single use and expires in 24 hours.</p>
             <p>Please ignore this email if you did not initiate this change. If you need additional assistance, please contact
              <a href="mailto:info@medicalpramarsh.com">info@medicalpramarsh.com</a>
             </p>
           </div>
        </div>
    </body>

    </html>
    `
}