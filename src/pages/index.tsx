import React from 'react';

import { GetStaticProps } from 'next';

import Kambing from '../assets/Kambing.jpg';
import { BlogGallery, IBlogGalleryProps } from '../blog/BlogGallery';
import Hero from '../hero/HeroHome';
import { Meta } from '../layout/Meta';
import { IPaginationProps } from '../pagination/Pagination';
import { Main } from '../templates/Main';
import { AppConfig } from '../utils/AppConfig';
import { getAllPosts } from '../utils/Content';

type IIndexProps = {
  postSlugs: string[];
  gallery: IBlogGalleryProps;
};

const Index = (props: IIndexProps) => (
  <Main
    meta={
      <Meta
        title="Homepage"
        description={AppConfig.description}
        image={Kambing.src}
        type="website"
      />
    }
  >
    <Hero postSlugs={props.postSlugs} />

    <BlogGallery
      posts={props.gallery.posts}
      pagination={props.gallery.pagination}
    />
  </Main>
);

export const getStaticProps: GetStaticProps<IIndexProps> = async () => {
  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'image',
    'description',
    'author',
  ]);

  const postSlugs: string[] = [];

  posts.forEach((post) => {
    postSlugs.push(post.slug);
  });

  const pagination: IPaginationProps = {};

  if (posts.length > AppConfig.pagination_size) {
    pagination.next = '/page2';
  }

  const gallery: IBlogGalleryProps = {
    posts: posts.slice(0, AppConfig.pagination_size),
    pagination,
  };
  return {
    props: {
      postSlugs,
      gallery,
    },
  };
};

export default Index;
