import { useContext, useEffect, useState } from "react"
import { QuoteModalContext } from "../pages/_app"
import machines from "../data/machines.json"
import { toast } from "react-hot-toast"
import { TailSpin } from "react-loader-spinner"

function QuoteModal() {
	const [items, setItems] = useState([])
	const {
		quoteModalState,
		hideModal,
		data,
		setType,
		setId,
		setEmail,
		setFullname,
		setMessage,
		setIsLoading,
		isLoading,
		resetModal,
		hasSelectedProduct,
		unsetIsLoading,
	} = useContext(QuoteModalContext)
	const types = [...new Set(machines.map((machine) => machine.type))]
	useEffect(() => {
		if (data.type.trim() !== "") {
			const newItems = machines.filter((i) => i.type === data.type)
			setItems(newItems)
		}
	}, [data.type])

	async function handleSubmit(e) {
		e.preventDefault()
		setIsLoading()
		try {
			const response = await fetch("/api/get-quote", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...data }),
			})

			const { status, message } = await response.json()

			if (status === true) {
				toast.success(message)
				resetModal()
			} else {
				throw new Error(message)
			}
		} catch (error) {
			unsetIsLoading()
			toast.error("Something went wrong")
		}
	}

	return (
		<>
			{quoteModalState && (
				<div className='quote__modal'>
					<button onClick={() => hideModal()} className='quote__modal--close'>
						&times;
					</button>
					<div className='contact__form-box'>
						<form onSubmit={handleSubmit} method='post'>
							{hasSelectedProduct === true ? (
								<div className='full'>
									<div className='split-two'>
										<p>Product category: {data.type}</p>
									</div>
									<div className='split-two'>
										<p>Product Name: {data.title}</p>
									</div>
								</div>
							) : (
								<div className='full'>
									<div className='split-two'>
										<select value={data.type} onChange={setType}>
											<option disabled value=''>
												{" "}
												-- Category --{" "}
											</option>
											{types.map((type) => (
												<option key={type} value={type}>
													{type}
												</option>
											))}
										</select>
									</div>
									<div className='split-two'>
										<select value={data.id} onChange={setId}>
											<option disabled value=''>
												{" "}
												-- Item --{" "}
											</option>
											{items.map((i) => (
												<option key={i.id} value={i.id}>
													{i.title}
												</option>
											))}
										</select>
									</div>
								</div>
							)}
							<div className='full'>
								<div className='split-two'>
									<input value={data.fullname} onChange={setFullname} type='text' placeholder='Enter full name' />
								</div>
								<div className='split-two'>
									<input value={data.email} onChange={setEmail} type='text' placeholder='Enter email address' />
								</div>
							</div>
							<div className='full'>
								<textarea
									value={data.message}
									onChange={setMessage}
									cols={30}
									rows={10}
									placeholder='Enter message (Optional)'
								/>
							</div>
							<div>
								<button disabled={isLoading} type='submit' className='site-button site-button-primary'>
									{isLoading ? <TailSpin color='#fff' height={20} width={20} /> : "Get Quote"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default QuoteModal
