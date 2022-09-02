import validator from "validator"
import machines from "../../data/machines.json"
import { sendMail } from "../../utils/transporter"
import { constructMsg } from "../../utils/contruct-msg"

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const { type, id, fullname, email, message } = req.body

			if (!Number(id)) {
				return res.status(401).json({ status: false, message: "Select a product" })
			}

			if (validator.isEmpty(type)) {
				return res.status(401).json({ status: false, message: "Select a product" })
			}

			if (validator.isEmpty(fullname)) {
				return res.status(401).json({ status: false, message: "Please, enter your name" })
			} else if (!validator.isAlpha(fullname, "en-US", { ignore: " " })) {
				return res.status(401).json({ status: false, message: "Invalid name character" })
			}

			if (!validator.isEmail(email)) {
				return res.status(401).json({ status: false, message: "Invalid E-mail address" })
			}

			if (!validator.isEmpty(message) && !validator.isAlphanumeric(message, "en-US", { ignore: " " })) {
				return res.status(401).json({ status: false, message: "Invalid characters in message" })
			}

			const quoteData = machines.filter((item) => item.id === Number(id))[0]

			if (!quoteData) {
				return res.status(404).json({ status: false, message: "No data found" })
			}

			const msg = constructMsg(quoteData, { fullname, email, message })

			await sendMail(msg)

			res.status(200).json({ status: true, message: "Quotation request sent" })
		} catch (error) {
			console.log(error.message)
			res.status(500).json({ status: false, message: "An error occured" })
		}
	} else {
		res.status(401).json({ status: false, message: "Invalid request method" })
	}
}

export default handler
