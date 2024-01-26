import type { FC } from "react";
import { Helmet } from "react-helmet-async";

// Metadata

const { type, title, description } = {
	type: "a",
	title: "a",
	description: "a",
};

const NotFoundPage: FC = () => (
	<>
		<Helmet>
			<title>Oops! 404</title>
			<meta property="og:type" content={type} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
		</Helmet>
		<h1>404!</h1>
	</>
);

export default NotFoundPage;
