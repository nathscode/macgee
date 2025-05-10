import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { RoleType } from "@prisma/client";

export default withAuth(
	function middleware(req: NextRequestWithAuth) {
		const token = req?.nextauth.token;

		if (
			token?.user.role !== RoleType.ADMIN &&
			req.url.startsWith("/dashboard")
		) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
	}
);

export const config = {
	matcher: ["/dashboard/:path*"],
};
