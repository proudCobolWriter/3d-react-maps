import type { FC } from "react";
import { Link } from "react-router-dom";

// Assets

import reactLogo from "../assets/react.svg";

const Header: FC = () => (
	<nav className="header">
		<Link
			to="https://react.dev/"
			target="_blank"
			className={"prevent-select prevent-drag"}
		>
			<img src={reactLogo} className="logo react-logo" alt="React logo" />
		</Link>
		<Link to="/" reloadDocument={true} className={"prevent-select"}>
			Home
		</Link>
		<Link to="/rat" reloadDocument={true} className={"prevent-select"}>
			Rat
		</Link>
	</nav>
);

export default Header;
