import axios from "axios";
import {
	Box,
	Cog,
	Contact,
	LayoutDashboard,
	Mail,
	Receipt,
	UserCircle2,
	UsersRound,
} from "lucide-react";

export const baseURL = process.env.NEXT_PUBLIC_APP_URL
	? `${process.env.NEXT_PUBLIC_APP_URL.trim()}/api`.replace(/^\/+/, "")
	: "/api";

export const apiClient = axios.create({
	baseURL,
});

export const categories = [
	"EXCAVATOR",
	"BULLDOZER",
	"DUMPER",
	"ROLLER",
	"LOADER",
	"TRUCK",
];
export const productTypes = ["TRUCK", "PART"];
export const conditionTypes = ["NEW", "USED"];

export const navLinks = [
	{
		url: "/dashboard",
		icon: <LayoutDashboard />,
		label: "Dashboard",
	},
	{
		url: "/dashboard/inventories",
		icon: <Receipt />,
		label: "inventory",
	},
	{
		url: "/dashboard/pos",
		icon: <Contact />,
		label: "pos",
	},
	{
		url: "/dashboard/quotes",
		icon: <Mail />,
		label: "quotes",
	},
	{
		url: "/dashboard/orders",
		icon: <Box />,
		label: "orders",
	},
	{
		url: "/dashboard/customers",
		icon: <UsersRound />,
		label: "Customers",
	},
];
