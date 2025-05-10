"use client";
import { useState, useEffect } from "react";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { useCacheQuery } from "./useCacheQuery";
import type { Query } from "firebase/firestore";

type UseCollection<T> = {
	data: T[] | null;
	loading: boolean;
};

type DataWithRef<T> = (T & { createdBy: string })[];

export type UseCollectionOptions = {
	allowNull?: boolean;
	disabled?: boolean;
	preserve?: boolean;
};

export function useCollection<T>(
	query: Query<T>,
	options: {
		allowNull?: boolean;
		disabled?: boolean;
		preserve?: boolean;
	}
): UseCollection<T>;

export function useCollection<T>(
	query: Query<T>,
	options?: UseCollectionOptions
): UseCollection<T>;

export function useCollection<T>(
	query: Query<T>,
	options?: UseCollectionOptions
): UseCollection<T> {
	const [data, setData] = useState<T[] | null>(null);
	const [loading, setLoading] = useState(true);

	const cachedQuery = useCacheQuery(query);

	const { allowNull, disabled, preserve } = options ?? {};

	useEffect(() => {
		if (disabled) {
			setLoading(false);
			return;
		}

		if (!preserve && data) {
			setData(null);
			setLoading(true);
		}
		const unsubscribe = onSnapshot(cachedQuery, (snapshot) => {
			const data = snapshot.docs.map((dock) =>
				dock.data({ serverTimestamps: "estimate" })
			);

			if (allowNull && !data.length) {
				setData(null);
				setLoading(false);
				return;
			} else {
				setData(data);
				setLoading(false);
			}
		});

		return unsubscribe;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cachedQuery, disabled]);

	return { data, loading };
}
