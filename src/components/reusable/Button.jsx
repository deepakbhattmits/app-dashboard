/** @format */

const Button = ({ border, variant, size, children }) => (
	<button className={`${border.split('-').join(' ')} ${variant} ${size}`}>
		{children}
	</button>
);
export default Button;
