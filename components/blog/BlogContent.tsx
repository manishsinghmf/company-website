import type { ReactNode } from 'react';

import type { BlogContentBlock } from '@/types/blog';

interface BlogContentProps {
  content: BlogContentBlock[];
}

export default function BlogContent({
  content,
}: BlogContentProps) {
  return (
    <div className="space-y-6 text-base leading-8 text-slate-700 sm:text-lg">
      {content.map((block, blockIndex) => {
        if (block.type !== 'paragraph') {
          return null;
        }

        return (
          <p key={blockIndex}>
            {block.children.map((child, childIndex) => {
              let text: ReactNode = child.text;

              if (child.bold) {
                text = <strong>{text}</strong>;
              }

              if (child.italic) {
                text = <em>{text}</em>;
              }

              if (child.underline) {
                text = <u>{text}</u>;
              }

              if (child.strikethrough) {
                text = <s>{text}</s>;
              }

              return <span key={childIndex}>{text}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}