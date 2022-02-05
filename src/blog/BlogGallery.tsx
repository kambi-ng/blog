import React from 'react';

import { format } from 'date-fns';
import Link from 'next/link';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { PostItems } from '../utils/Content';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const BlogGallery = (props: IBlogGalleryProps) => (
  <>
    <div className="grid grid-cols-3 gap-8">
      {props.posts.map((elt) => {
        return (
          <div key={elt.slug} className="mb-3 flex flex-col justify-between">
            <Link href="/posts/[slug]" as={`/posts/${elt.slug}`}>
              <a className="shadow-lg rounded-lg space-y-2 ">
                <img src={elt.image} className="rounded-t-lg" />
                <div className="px-4 py-6 space-y-1">
                  <h2 className="font-bold">{elt.title}</h2>
                  <div>{format(new Date(elt.date), 'd LLL yyyy')}</div>
                  <p>{elt.description}</p>
                </div>
              </a>
            </Link>
          </div>
        );
      })}
    </div>

    <Pagination
      previous={props.pagination.previous}
      next={props.pagination.next}
    />
  </>
);

export { BlogGallery };
