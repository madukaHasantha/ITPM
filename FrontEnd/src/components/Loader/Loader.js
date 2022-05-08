import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
	return (
		<div style={{ width: "100%" }}>
			<Spinner animation="grow" />
		</div>
	);
}

export default Loader;
