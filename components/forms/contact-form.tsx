"use client";
import { ContactSchema, ContactSchemaInfer } from "@/lib/validators/customer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

// Define validation schema

const ContactForm = () => {
	const { toast } = useToast();

	const form = useForm<ContactSchemaInfer>({
		resolver: zodResolver(ContactSchema),
		defaultValues: {
			fullname: "",
			email: "",
			message: "",
		},
	});

	const { mutate: submitContactForm, isPending } = useMutation({
		mutationFn: async (data: ContactSchemaInfer) => {
			const response = await axios.post("/api/send-message", data);
			return response.data;
		},
		onSuccess: () => {
			toast({
				title: "Message sent successfully!",
				description: "We'll get back to you soon.",
			});
			form.reset();
		},
		onError: (error: any) => {
			toast({
				title: "Error sending message",
				description: error.response?.data?.message || "Please try again later.",
				variant: "destructive",
			});
		},
	});

	const onSubmit = (data: ContactSchemaInfer) => {
		submitContactForm(data);
	};

	return (
		<div className="contact__inner">
			<div className="contact__form-box">
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="full">
						<div className="split-two">
							<input
								{...form.register("fullname")}
								disabled={isPending}
								placeholder="Enter full name"
							/>
							{form.formState.errors.fullname && (
								<p className="text-red-500 text-sm mt-1">
									{form.formState.errors.fullname.message}
								</p>
							)}
						</div>
						<div className="split-two">
							<input
								{...form.register("email")}
								disabled={isPending}
								placeholder="Enter email address"
							/>
							{form.formState.errors.email && (
								<p className="text-red-500 text-sm mt-1">
									{form.formState.errors.email.message}
								</p>
							)}
						</div>
					</div>
					<div className="full">
						<textarea
							{...form.register("message")}
							disabled={isPending}
							cols={30}
							rows={10}
							placeholder="Enter message"
						/>
						{form.formState.errors.message && (
							<p className="text-red-500 text-sm mt-1">
								{form.formState.errors.message.message}
							</p>
						)}
					</div>
					<div>
						<button
							disabled={isPending}
							type="submit"
							className="site-button site-button-primary"
						>
							{isPending ? (
								<Loader2 size={16} className="animate-spin" />
							) : (
								"Send Message"
							)}
						</button>
					</div>
				</form>
			</div>
			<div className="contact__info">
				<div className="contact__info__item">
					<div className="contact__info__item--icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
						>
							<path fill="none" d="M0 0h24v24H0z" />
							<path d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
						</svg>
					</div>
					<div className="contact__info__item--text">
						<h3>Osubi, Delta State. </h3>
						<p>Km 6, osubi-airport road, Osubi, Delta state, Nigeria.</p>
					</div>
				</div>
				<div className="contact__info__item">
					<div className="contact__info__item--icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
						>
							<path fill="none" d="M0 0h24v24H0z" />
							<path d="M21 16.42v3.536a1 1 0 0 1-.93.998c-.437.03-.794.046-1.07.046-8.837 0-16-7.163-16-16 0-.276.015-.633.046-1.07A1 1 0 0 1 4.044 3H7.58a.5.5 0 0 1 .498.45c.023.23.044.413.064.552A13.901 13.901 0 0 0 9.35 8.003c.095.2.033.439-.147.567l-2.158 1.542a13.047 13.047 0 0 0 6.844 6.844l1.54-2.154a.462.462 0 0 1 .573-.149 13.901 13.901 0 0 0 4 1.205c.139.02.322.042.55.064a.5.5 0 0 1 .449.498z" />
						</svg>
					</div>
					<div className="contact__info__item--text">
						<h3>
							<a href="tel:+2347035846669">07035846669</a>
						</h3>
						<p>Mon to Fri 8am to 6pm</p>
					</div>
				</div>
				<div className="contact__info__item">
					<div className="contact__info__item--icon">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width={24}
							height={24}
						>
							<path fill="none" d="M0 0h24v24H0z" />
							<path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z" />
						</svg>
					</div>
					<div className="contact__info__item--text">
						<h3>
							<a href="mailto:enquiry@macgeeequipment.com">
								enquiry@macgeeequipment.com
							</a>
						</h3>
						<p>Send us your query anytime!</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
