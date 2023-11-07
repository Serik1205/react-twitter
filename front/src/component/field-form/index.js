import { useState } from "react";
import "./index.css";

export default function Component({ placeholder, button, onSubmit }) {
	const [value, setValue] = useState("");
	const hadleChange = (e) => setValue(e.target.value);
	const hadleSubmit = () => {
		if (value.length === 0) return null;
		if (onSubmit) {
			onSubmit(value);
		} else {
			throw new Error("onSubmit props is undefined")
		}
		setValue("");
	};
	const isDisabled = value.length === 0;
	return (
		<div className="field-form">
			<textarea
				onChange={hadleChange}
				value={value}
				rows={2}
				placeholder={placeholder}
				className="field-form__field"
			></textarea>
			<button
				disabled={isDisabled}
				onClick={hadleSubmit}
				className="field-form__button"
			>
				{button}
			</button>
		</div>
	);
}