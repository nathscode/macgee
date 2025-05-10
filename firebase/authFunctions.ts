import { signOut } from "firebase/auth";

import { auth } from "./clientApp";

export const loginWithEmaiAndPassword = async (
	email: string,
	password: string
) => {};

export const logout = () => signOut(auth);
