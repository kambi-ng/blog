import React from 'react';

import { format } from 'date-fns';
import Link from 'next/link';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { PostItems } from '../utils/Content';

export type IBlogGalleryProps = {
  posts: PostItems[];
  pagination: IPaginationProps;
};

const BlogGallery = (props: IBlogGalleryProps) => {
  return (
    <section className="bg-black-300 py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {props.posts.map((elt) => {
            return (
              <div key={elt.slug} className="mb-3 ">
                <Link href="/posts/[slug]" as={`/posts/${elt.slug}`}>
                  <a className="grid grid-cols-6 gap-x-7 md:space-y-4 md:flex md:flex-col h-full">
                    <img
                      src={elt.image}
                      alt={`${elt.title} image`}
                      className="w-full h-36 md:h-56 object-cover col-span-3"
                    />
                    <div className="flex flex-col justify-between col-span-3 h-full">
                      <div className="">
                        <h2 className="font-medium font-subheader text-xl md:text-3xl grow md:grow-0">
                          {elt.title}
                        </h2>
                        <p
                          className="hidden md:block font-body  text-base font-normal mt-1"
                          style={{ minHeight: '1.125rem' }}
                        >
                          {elt.description}
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between mt-2">
                        <span className="text-sm">
                          By {elt.author || 'Anonymous'}
                        </span>
                        <div className="text-sm">
                          {format(new Date(elt.date), 'd LLL yyyy')}
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <Pagination
            previous={props.pagination.previous}
            next={props.pagination.next}
          />
        </div>
      </div>
    </section>
  );
};

export { BlogGallery };
