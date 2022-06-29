import React from 'react';

import { Pagination, IPaginationProps } from '../pagination/Pagination';
import { PostItems } from '../utils/Content';
import { BlogCard } from './BlogCard';

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
              <BlogCard
                key={elt.id}
                title={elt.title}
                date={elt.date}
                description={elt.description}
                image={elt.image}
                slug={elt.slug}
                author={elt.author}
              />
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
