import React from 'react';

import { format } from 'date-fns';
import Link from 'next/link';

type IBlogCardProps = {
  slug: string;
  title: string;
  description: string;
  author?: string;
  date: string;
  image: string;
};

const BlogCard = (props: IBlogCardProps) => {
  return (
    <div key={props.slug} className="mb-3 ">
      <Link href="/posts/[slug]" as={`/posts/${props.slug}`}>
        <a className="grid grid-cols-6 gap-x-7 md:space-y-4 md:flex md:flex-col h-full">
          <img
            src={props.image}
            alt={`${props.title} image`}
            className="w-full h-36 md:h-56 object-cover col-span-3"
          />
          <div className="flex flex-col justify-between col-span-3 h-full">
            <div className="">
              <h2 className="font-medium font-subheader text-xl md:text-3xl grow md:grow-0">
                {props.title}
              </h2>
              <p
                className="hidden md:block font-body  text-base font-normal mt-1"
                style={{ minHeight: '1.125rem' }}
              >
                {props.description}
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-2">
              <span className="text-sm">By {props.author || 'Anonymous'}</span>
              <div className="text-sm">
                {props.date
                  ? format(new Date(props.date), 'd LLL yyyy')
                  : 'Unknown Date'}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export { BlogCard };
