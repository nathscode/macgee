import checkIsAdmin from "@/actions/checkIsAdmin";
import getCurrentUser from "@/actions/getCurrentUser";
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
	const isAdmin = await checkIsAdmin();
	const isAuthenticated = await getCurrentUser();

	if (!isAuthenticated) {
		return redirect("/login");
	}

	if (!isAdmin) {
		return redirect("/");
	}
	return (
		<div className="flex max-lg:flex-col text-grey-1">
			<LeftSideBar />
			<TopBar />
			<div className="md:pl-[250px] flex-1">{children}</div>
		</div>
	);
};
export default MainLayout;
