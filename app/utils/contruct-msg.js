function constructMsg(data, user) {
	let spec = ""

	for (const info in data.specification) {
		spec += `<li>${info}: ${data.specification[info]}</li>`
	}

	const msg = `
        <div>
            <h1>Quotation request</h1>
            <p>This email contains information about a customer and the product to be purchased.</p>
            <h4>Product Information</h4>
            <ul>
                <li>Name: ${data.title}</li>
                <li>Type: ${data.type}</li>
                <li>DESC: ${data.description}</li>
                <li>
                    <h4>Specification</h4>
                    <ul>${spec}</ul>
                </li>

            </ul>
            <h4>Customer information<h4>
            <ul>
                <li>Name: ${user.fullname}</li>
                <li>Contact: ${user.email}</li>
                <li>Message: ${user.message}</li>
            </ul>

        </div>
    
    `

	return msg
}

export { constructMsg }
