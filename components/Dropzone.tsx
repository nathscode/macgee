"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

function Dropzone() {
	const [selectedImages, setSelectedImages] = useState([]);
	const onDrop = useCallback((acceptedFiles) => {
		setSelectedImages(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);

	const removeImage = (id) => {
		selectedImages.splice(index, id);
	};

	const { getRootProps, getInputProps } = useDropzone({ onDrop });
	const selected_images = selectedImages?.map((file, idx) => (
		<div className="flex flex-col" key={idx}>
			<div className="mb-5">
				<Image
					className="inline-flex rounded-md"
					src={file.preview}
					height={200}
					width={200}
					alt=""
				/>
			</div>
			<div>
				<button className="mt-4" type="button" onClick={() => removeImage(idx)}>
					delete
				</button>
			</div>
		</div>
	));

	return (
		<div>
			<div {...getRootProps()}>
				<input {...getInputProps()} />

				<p>Drop the files here ...</p>
			</div>
			<div className="flex flex-wrap justify-start gap-3 my-4">
				{selected_images}
			</div>
		</div>
	);
}

export { Dropzone, selectedImages };
