import { collection } from "firebase/firestore";
import { productConverter } from "@/types";
import { db } from "./clientApp";

export const productsCollection = collection(db, "inventory").withConverter(
	productConverter
);
