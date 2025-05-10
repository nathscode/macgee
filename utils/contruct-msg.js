function constructMsg(data, user) {
	const msg = `
        <div>
            <h1>Quotation request</h1>
            <p>This email contains information about a customer and the product to be purchased.</p>
            <h4>Product Information</h4>
            <ul>
                <li>Name: ${data.title}</li>
                <li>Type: ${data.type}</li>
            </ul>
            <h4>Customer information<h4>
            <ul>
                <li>Name: ${user.fullname}</li>
                <li>Contact: ${user.email}</li>
                <li>Message: ${user.message}</li>
            </ul>

        </div>
    
    `;

	return msg;
}

function constructContactMsg(data) {
	let msg = `
    <div>
            <h1>Contact Message</h1>
            <p>This email contains contact message from a customer.</p>
            <h4>Customer information<h4>
            <ul>
                <li>Name: ${data.fullname}</li>
                <li>Contact: ${data.email}</li>
                <li>Message: ${data.message}</li>
            </ul>

        </div>
    `;

	return msg;
}

export { constructMsg, constructContactMsg };
