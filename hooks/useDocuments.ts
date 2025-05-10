import { useState, useEffect } from "react";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/clientApp";

const useFetchDocuments = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const collectionRef = collection(db, "inventory");
				const q = query(collectionRef, orderBy("timestamp", "desc"));
				const qSnapshot = await getDocs(q);
				const fetchedData = qSnapshot.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				// @ts-ignore
				setData(fetchedData);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, isLoading, error };
};

export default useFetchDocuments;
