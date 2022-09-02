import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
	host: process.env.SMTP_SERVER,
	port: process.env.SMTP_PORT,
	secure: true, // true for 465, false for other ports
	auth: {
		user: process.env.SMTP_USER, // generated ethereal user
		pass: process.env.SMTP_PASS, // generated ethereal password
	},
})

async function sendMail(data) {
	// console.log(process.env.SMTP_SERVER, "env")
	try {
		await transporter.sendMail({
			from: "Albert Duro <slyboydon2@gmail.com>", // sender address
			to: "slyboydon1@gmail.com", // list of receivers
			subject: "Quotation Request", // Subject line
			// text: "Hello world?", // plain text body
			html: data, // html body
		})

		// console.log("Message sent: %s", info)
	} catch (error) {
		throw new Error(error)
	}
}

export { sendMail }
