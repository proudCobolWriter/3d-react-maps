import { type FC } from "react";
import { Helmet } from "react-helmet-async";

import { Scene, Loader } from "../components";

// Metadata

const { type, title, description } = {
	type: "a",
	title: "a",
	description: "a",
};

const Home: FC = () => {
	return (
		<>
			<Helmet>
				<title>{import.meta.env.VITE_APP_TITLE}</title>
				<meta property="og:type" content={type} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={description} />
			</Helmet>
			<Loader />
			<Scene />
		</>
	);
};

export default Home;
