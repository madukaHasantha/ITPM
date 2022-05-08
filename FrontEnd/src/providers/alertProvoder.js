import React, { useContext, createContext, useState } from "react";
import "./css/custom-alert.css";

const alertContext = createContext();

export default function useAlert() {
	return useContext(alertContext);
}
export function AlertProvider({ children }) {
	/*
	 * Alert prop {msg:"alert message",timeout:"5",type:"error"}
	 * types =[error, success,warning]
	 */
	const [customAlert, setcustomAlert] = useState(null);
	// const [alertTimeOut, setalertTimeOut] = useState(null);

	if (customAlert && customAlert.timeout) {
		setTimeout(() => {
			setcustomAlert(null);
		}, customAlert.timeout);
	}

	const values = { customAlert, setcustomAlert };
	return (
		<alertContext.Provider value={values}>
			{customAlert && <div className={"cus-alert alert-" + customAlert.type}>{customAlert.msg}</div>}
			{children}
		</alertContext.Provider>
	);
}
