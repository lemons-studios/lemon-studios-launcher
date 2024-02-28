import "./rendermd.css";

import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import { Prism } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function RenderMarkdown({ text }) {
	return (
		<Markdown
			remarkPlugins={[remarkGfm, remarkBreaks, remarkEmoji]}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(.+)/.exec(className || "language-txt");
					return !inline && match ? (
						<Prism
							{...props}
							children={String(children).replace(/\n$/, "")}
							style={vscDarkPlus}
							language={match[1]}
							PreTag="div"
						/>
					) : (
						<code {...props} className={className}>
							{children}
						</code>
					);
				},
			}}
			children={text || "*No content*"}
			className="markdown"
		/>
	);
}
