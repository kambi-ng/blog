import React, { ReactNode } from 'react';
import 'highlight.js/styles/base16/material.css';

type IContentProps = {
  children: ReactNode;
};

const Content = (props: IContentProps) => {
  return (
    <div className="content">
      {props.children}

      <style jsx>
        {`
          .content :global(*) {
            @apply break-words;
          }

          .content :global(p) {
            @apply font-body font-normal leading-7;
          }

          .content :global(p) + :global(p) {
            @apply mt-4;
          }

          .content :global(ul) {
            @apply my-6 list-disc ml-4;
          }

          .content :global(ol) {
            @apply my-6 list-decimal ml-4;
          }

          .content :global(h1),
          .content :global(h2),
          .content :global(h3),
          .content :global(h4),
          .content :global(h5) {
            @apply font-subheader font-medium italic mt-4 mb-2;
          }

          .content :global(h2) {
            @apply text-4xl;
          }

          .content :global(h3) {
            @apply text-3xl;
          }
          .content :global(h4) {
            @apply text-2xl;
          }
          .content :global(h5) {
            @apply text-xl;
          }

          .content :global(a) {
            @apply border-b text-gray-600 border-gray-600;
          }

          .content :global(blockquote) {
            @apply border-l pl-4 text-gray-200/80 border-gray-600;
          }

          .content :global(pre) {
            overflow: auto;
          }

          .content :global(pre) {
            @apply p-6 rounded-md !bg-black-400 my-3;
          }

          .content :global(img) {
            @apply rounded-md;
          }

          .content :global(iframe) {
            @apply w-full aspect-video my-2 rounded-md;
          }
        `}
      </style>
    </div>
  );
};

export { Content };
