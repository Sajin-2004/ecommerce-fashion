const nodemailer = require('nodemailer');

const sendContactMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: process.env.ADMIN_EMAIL,
        //         pass: process.env.ADMIN_APP_PASSWORD
        //     }
        // });

        // // Email 1: To Admin
        // const adminMailOptions = {
        //     from: process.env.ADMIN_EMAIL,
        //     to: process.env.ADMIN_EMAIL,
        //     subject: `New Contact Form Message: ${subject}`,
        //     html: `
        //         <h3>New message from your ecommerce website contact form</h3>
        //         <p><strong>Name:</strong> ${name}</p>
        //         <p><strong>Email:</strong> ${email}</p>
        //         <p><strong>Subject:</strong> ${subject}</p>
        //         <p><strong>Message:</strong></p>
        //         <p>${message.replace(/\n/g, '<br>')}</p>
        //     `,
        //     replyTo: email
        // };

        // // Email 2: Auto Reply To User
        // const userMailOptions = {
        //     from: process.env.ADMIN_EMAIL,
        //     to: email,
        //     subject: 'Thank you for contacting FashionHub',
        //     html: `
        //         <p>Hello ${name},</p>
        //         <p>Thank you for reaching out to FashionHub.</p>
        //         <p>We have received your message and our team will respond as soon as possible.</p>
        //         <p>Best regards<br>FashionHub Support Team</p>
        //     `
        // };

        // // Send both emails sequentially
        // await transporter.sendMail(adminMailOptions);
        // await transporter.sendMail(userMailOptions);

        // Email feature disabled temporarily
        console.log(`Contact form received from ${name} (${email}): ${message}`);

        res.status(200).json({ message: "Message received successfully! We will contact you soon." });
    } catch (error) {
        console.error("Error processing contact message:", error);
        res.status(500).json({ message: "Failed to process message", error: error.message });
    }
};

module.exports = {
    sendContactMessage
};