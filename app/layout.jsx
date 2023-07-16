import "./globals.css";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="overflow-hidden">{children}</body>
		</html>
	);
}
