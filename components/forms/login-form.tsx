"use client";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useMount from "@/hooks/use-mount";
import { LoginSchema, LoginSchemaInfer } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "../common/loading-button";
import { buttonVariants } from "../ui/button";
import { useToast } from "../ui/use-toast";
import placeholderImage from "/public/placeholder-image.png";

type Props = {};

const LoginForm = (props: Props) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const params = useSearchParams();
	const callback = params.get("callbackUrl");
	const { toast } = useToast();

	const isMounted = useMount();

	const form = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const isLoading = form.formState.isSubmitting;

	const { mutate: LoginFunc, isPending } = useMutation({
		mutationFn: async ({ email, password }: LoginSchemaInfer) => {
			const { data } = await axios.post("/api/auth/login", {
				email,
				password,
			});
			return data;
		},
	});

	const onSubmit = async (values: LoginSchemaInfer) => {
		LoginFunc(
			{
				email: values.email.toLowerCase(),
				password: values.password,
			},
			{
				onSuccess: (data) => {
					if (data.status == 200) {
						signIn("credentials", {
							email: values.email.toLowerCase(),
							password: values.password,
							callbackUrl: callback ?? "/dashboard",
							redirect: true,
						});
					}
				},
				onError: (err: any) => {
					if (err instanceof AxiosError) {
						if (err.response?.data?.status === 400) {
							return toast({
								title: "An error occurred.",
								description: `${err.response?.data?.errors?.message}`,
								variant: "destructive",
							});
						}
						if (err.response?.data?.status === 401) {
							return toast({
								title: "Unverified account",
								description: (
									<div className="mt-2 p-1">
										<p>{err.response?.data?.errors?.message}</p>
										<Link
											href={"/verify"}
											className={buttonVariants({
												variant: "default",
												size: "sm",
											})}
										>
											Click to verify
										</Link>
									</div>
								),
								duration: 9000,
								variant: "destructive",
							});
						}

						if (err.response?.data?.status === 404) {
							return toast({
								title: "Invalid credentials.",
								description: `${err.response.data?.errors?.message}`,
								variant: "destructive",
							});
						}
						toast({
							title: "There was an error",
							description: "Server error",
							variant: "destructive",
						});
					}
				},
			}
		);
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	if (!isMounted) {
		return null;
	}
	return (
		<div className="flex flex-col w-full">
			<div className="flex justify-center mb-4">
				<div className="relative shrink-0 w-[50px] sm:w-[80px] sm:h-[80px] h-[50px] overflow-hidden bg-slate-200 rounded-full">
					<Image
						className="object-contain w-full h-full rounded-full"
						src={"/assets/images/logo/macgee.jpeg" ?? placeholderImage}
						alt={"food"}
						fill
					/>
				</div>
			</div>
			<div className="bg-white text-black py-5 overflow-hidden w-full">
				<div className="flex items-start flex-col  w-full justify-start p-5">
					<h2 className="text-2xl font-semibold mb-5">Login</h2>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4  w-full"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
											Email
										</FormLabel>
										<FormControl>
											<Input
												type="email"
												disabled={isLoading}
												className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
												placeholder="Enter Email address"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<div className="relative">
											<FormControl>
												<Input
													type={showPassword ? "text" : "password"}
													placeholder="Enter your password"
													disabled={form.formState.isSubmitting}
													{...field}
												/>
											</FormControl>
											<span className="absolute top-[10px] right-3">
												<button
													type="button"
													onClick={togglePasswordVisibility}
												>
													{showPassword ? (
														<Eye className="h-5 w-5" />
													) : (
														<EyeOff className="w-5 h-5" />
													)}{" "}
												</button>
											</span>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-col pt-4">
								<LoadingButton
									type="submit"
									loading={isPending}
									variant={"brand"}
									className=" w-full"
								>
									Login
								</LoadingButton>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
