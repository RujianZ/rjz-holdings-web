import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h2 className="text-2xl md:text-3xl leading-tight tracking-tight mt-8 first:mt-0">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h3 className="text-xl md:text-2xl leading-tight tracking-tight mt-8 first:mt-0">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-lg leading-tight mt-6 first:mt-0">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="text-base leading-relaxed">{children}</p>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-foreground underline decoration-border decoration-1 underline-offset-4 hover:decoration-accent hover:text-accent transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="flex flex-col gap-2 list-disc pl-5 marker:text-muted-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="flex flex-col gap-2 list-decimal pl-5 marker:text-muted-foreground">
        {children}
      </ol>
    ),
    code: ({ children }) => (
      <code className="font-mono text-[0.875em] text-accent border-b border-accent/40">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="border border-border bg-muted p-4 overflow-x-auto text-sm font-mono leading-relaxed">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l border-accent pl-4 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="hairline my-2" />,
    ...components,
  };
}
