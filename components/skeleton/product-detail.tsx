import { PlaceholderImage } from "@/components/PlaceholderImage";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps
	extends React.ComponentPropsWithoutRef<typeof Card> {}

export function ContentSkeleton({
	className,
	...props
}: ProductCardSkeletonProps) {
	return (
		<div className="flex flex-col w-full">
			<div className="flex items-center justify-between mb-10">
				<div className="justify-start">
					<Skeleton className="h-6 w-1/2" />
				</div>
				<div className="justify-end">
					<Skeleton className="h-10 w-32" />
				</div>
			</div>
			<div className="flex flex-wrap flex-1 justify-between w-full">
				<div className="w-full md:w-1/2">
					<Card
						className={cn("h-full overflow-hidden rounded-sm", className)}
						{...props}
					>
						<CardHeader className="p-0">
							<AspectRatio ratio={4 / 3}>
								<PlaceholderImage className="rounded-none" isSkeleton asChild />
							</AspectRatio>
						</CardHeader>
					</Card>
				</div>
				<div className="w-full md:w-1/2">
					<Skeleton className="h-4 w-1/2" />
				</div>
			</div>
		</div>
	);
}
