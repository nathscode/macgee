import validator from "validator"
import { sendMail } from "../../utils/transporter"
import { constructContactMsg } from "../../utils/contruct-msg"

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { fullname, email, message } = req.body

			if (validator.isEmpty(fullname)) {
				return res.status(401).json({ status: false, message: "Please, enter your name" })
			} else if (!validator.isAlpha(fullname, "en-US", { ignore: " " })) {
				return res.status(401).json({ status: false, message: "Invalid name character" })
			}

			if (!validator.isEmail(email)) {
				return res.status(401).json({ status: false, message: "Invalid E-mail address" })
			}

			if (validator.isEmpty(message) || !validator.isAlphanumeric(message, "en-US", { ignore: " " })) {
				return res.status(401).json({ status: false, message: "Invalid characters in message" })
			}

			const msg = constructContactMsg({ fullname, email, message })

			await sendMail(msg)

			res.status(200).json({ status: true, message: "Message sent" })
		} catch (error) {
			console.log(error.message)
			res.status(500).json({ status: false, message: "An error occured" })
		}
	} else {
		res.status(401).json({ status: false, message: "Invalid request method" })
	}
}

export default handler
