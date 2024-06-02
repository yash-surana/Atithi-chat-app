const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const csv = require('csv-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/send-invites', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
    const emailContent = req.body.emailContent;
    const recipients = [];

    try {
        const image = req.files['image'][0];
        const csvFile = req.files['file'][0];

        fs.createReadStream(csvFile.path)
            .pipe(csv())
            .on('data', (row) => {
                if (row.email) {
                    recipients.push({ name: row.name, email: row.email });
                }
            })
            .on('end', async () => {
                fs.unlinkSync(csvFile.path); // Remove the CSV file after reading

                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'dhruvi1267.be21@chitkarauniversity.edu.in',
                        pass: 'nnpk xidl uynk afqz'
                    }
                });

                for (const recipient of recipients) {
                    let mailOptions = {
                        from: 'dhruvi1267.be21@chitkarauniversity.edu.in',
                        to: recipient.email,
                        subject: 'Invitation',
                        html: `
                            <html>
                            <head>
                                <style>
                                    /* Add your CSS styles here */
                                    body {
                                        font-family: Arial, sans-serif;
                                        background-color: #f0f0f0;
                                        padding: 20px;
                                    }
                                    .container {
                                        background-color: #ffffff;
                                        padding: 30px;
                                        border-radius: 10px;
                                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                    }
                                    h1 {
                                        color: #861E27;
                                    }
                                    p {
                                        color: #333333;
                                        font-size: 16px;
                                    }
                                    img {
                                        max-width: 100%;
                                        height: auto;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <h1>Invitation</h1>
                                    <p>Dear ${recipient.name},</p>
                                    <p>${emailContent}</p>
                                    <img src="cid:image" alt="Invitation Image">
                                </div>
                            </body>
                            </html>
                        `,
                        attachments: [
                            {
                                filename: image.originalname,
                                path: image.path,
                                cid: 'image' // Set Content-ID for embedding image in HTML
                            }
                        ]
                    };

                    await transporter.sendMail(mailOptions);
                }

                res.status(200).send('Emails sent successfully!');
            });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).send('Error sending emails');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
