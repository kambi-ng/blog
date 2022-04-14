import React, { ReactNode } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'prismjs/themes/prism-tomorrow.min.css';

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
            @apply mb-6 font-body font-normal leading-7;
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

             {
              /* @apply border-b border-gray-800; */
            }
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
            @apply !bg-black-400 !p-4 !rounded-md;
          }

           {
            /* Code without pre is in main.css for now i have a headache */
          }
        `}
      </style>
    </div>
  );
};

export { Content };
