import type { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => (
	<div className="header">
		<Link to="/">Home</Link>
	</div>
);

export default Header;
