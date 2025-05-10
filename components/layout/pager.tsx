import Link from "next/link";

const Pager = ({ page, path }: { page: string; path: string }) => {
	return (
		<div className="pager">
			<div
				className="pager__image pager-overlay"
				style={{ backgroundImage: "url(/assets/images/hero/cover-top.jpg)" }}
			>
				<div className="content-wrapper">
					<div className="pager__text">
						<h2>{page}</h2>
						<nav>
							<ul>
								<li>
									<Link href="/">Home</Link>
								</li>
								<li>
									<Link href={path}>{page}</Link>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Pager;
