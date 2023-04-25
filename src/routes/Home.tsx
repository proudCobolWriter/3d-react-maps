import React, { type FC } from "react";
import { Helmet } from "react-helmet-async";

// Assets //

import reactLogo from "../assets/react.svg";
import "../App.css";

const Home: FC = () => {
	const [count, setCount] = React.useState(0);

	return (
		<>
			<Helmet>
				<title>Test</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg+xml+x-icon" href="/favicon.ico" />
			</Helmet>
			<div>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
};

export default Home;
