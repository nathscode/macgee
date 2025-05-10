"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/Modal";

import Button from "@/components/ui/Button";

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	loading,
}) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Modal
			title="Are you sure?"
			description="This action cannot be undone."
			isOpen={isOpen}
			onClose={onClose}
		>
			<div className="flex items-center justify-end w-full pt-6 space-x-2">
				{/* @ts-ignore */}
				<Button disabled={loading} variant="outline" onClick={onClose}>
					Cancel
				</Button>
				{/* @ts-ignore */}
				<Button
					type="button"
					variant="danger"
					className="p-2 rounded-md"
					size="sm"
					disabled={loading}
					onClick={onConfirm}
				>
					Continue
				</Button>
			</div>
		</Modal>
	);
};
