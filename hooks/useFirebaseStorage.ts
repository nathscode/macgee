import admin from "@/firebase/serverApp";

const useDeleteDirectory = (folderId: string) => {
	let success = false;
	const deletePhotos = async () => {
		const bucket = admin.storage().bucket();
		try {
			const [files] = await bucket.getFiles({
				prefix: `inventory/${folderId}`,
			});
			await Promise.all(files.map((file) => file.delete()));

			success = true;
		} catch (error) {
			success = false;
			console.error("Error deleting photos:", error);
		}
	};

	deletePhotos();
	return success;
};

export default useDeleteDirectory;
