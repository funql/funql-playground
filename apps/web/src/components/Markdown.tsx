import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import {cn} from "@workspace/ui/lib/utils";
import {ComponentProps} from "react";

type MarkdownProps = {
  className?: string,
  text?: string,
} & Omit<ComponentProps<typeof ReactMarkdown>, "children">

export default function Markdown({
  className,
  text,
  ...props
}: MarkdownProps) {
  return (
    <div
      className={cn(
        "prose dark:prose-invert",
        className
      )}
    >
      <ReactMarkdown
        {...props}
        remarkPlugins={[remarkGfm, ...(props.remarkPlugins || [])]}
        rehypePlugins={[rehypeSanitize, ...(props.rehypePlugins || [])]}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}