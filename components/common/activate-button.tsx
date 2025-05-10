"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "../modals/confIrmModal";

type Props = {
	slug: string | null;
	isActive: boolean | null;
};

const ActivateButton = ({ slug, isActive }: Props) => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { toast } = useToast();
	const { mutate, isPending: isLoading } = useMutation({
		mutationFn: async () => {
			const { data } = await axios.patch(`/api/product/${slug}/activate`, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return data;
		},
		onSuccess: () => {
			router.refresh();
			queryClient.invalidateQueries({
				queryKey: ["productActivate", slug],
			});
			toast({
				description: "Successful",
			});
		},
		onError: (err: any) => {
			if (err instanceof AxiosError) {
				if (err.response?.data?.status === 401) {
					return toast({
						title: "An error occurred.",
						description: `${err.response?.data?.errors?.message}`,
						variant: "destructive",
					});
				}
				if (err.response?.data?.status === 400) {
					return toast({
						title: "An error occurred.",
						description: `${err.response?.data?.errors?.message}`,
						variant: "destructive",
					});
				}

				if (err.response?.status === 403) {
					return toast({
						title: "Unauthorized request.",
						description: `${err.response.data?.errors?.message}`,
						variant: "destructive",
					});
				}
				if (err.response?.status === 404) {
					return toast({
						title: "Agent not found.",
						description: `${err.response.data?.errors?.message}`,
						variant: "destructive",
					});
				}
				if (err.response?.status === 405) {
					return toast({
						title: "Method not allowed.",
						description: `${err.response.data?.errors?.message}`,
						variant: "destructive",
					});
				}
				toast({
					title: "There was an error",
					description: "Server error, contact admin",
					variant: "destructive",
				});
			}
		},
	});

	const onProductActivate = () => {
		mutate();
	};
	return (
		<div className="w-full">
			{isActive ? (
				<ConfirmModal
					description="You're about to deactivate this product"
					onConfirm={onProductActivate}
				>
					<Button
						variant="ghost"
						className="w-full p-0 pl-2 h-0 justify-start "
						size="lg"
						disabled={isLoading}
					>
						Deactivate
					</Button>
				</ConfirmModal>
			) : (
				<ConfirmModal
					description="You're about to activate this product"
					onConfirm={onProductActivate}
				>
					<Button
						variant="ghost"
						className="w-full p-0 pl-2 h-0 justify-start"
						size="lg"
						disabled={isLoading}
					>
						Activate
					</Button>
				</ConfirmModal>
			)}
		</div>
	);
};

export default ActivateButton;
