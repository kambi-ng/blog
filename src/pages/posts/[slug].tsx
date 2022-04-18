import React from 'react';

import { format } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';

import { Content } from '../../content/Content';
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { getAllPosts, getPostBySlug } from '../../utils/Content';
import { markdownToHtml } from '../../utils/Markdown';

type IPostUrl = {
  slug: string;
};

type IPostProps = {
  title: string;
  description: string;
  date: string;
  modified_date: string;
  image: string;
  content: string;
  author?: string;
};

const DisplayPost = (props: IPostProps) => {
  return (
    <Main
      meta={
        <Meta
          title={props.title}
          description={props.description}
          image={props.image}
          date={props.date}
          modified_date={props.modified_date}
          type="article"
          author={props.author}
        />
      }
    >
      <div className="container grid grid-cols-6 md:grid-cols-12 py-16">
        <article className="col-span-6 md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-10">
          <img
            src={props.image}
            alt={`${props.title}'s Image`}
            className="w-full h-96 object-cover"
          />
          <h1 className="md:text-center font-semibold  mt-8 font-header text-5xl capitalize">
            {props.title}
          </h1>
          <div className="text-xl font-light md:text-center w-full mt-2 text-gray-100">
            By {props.author || 'Anonymous'}
          </div>
          <div className="md:text-center font-light text-base  mb-8 mt-2 text-gray-100">
            {format(new Date(props.date), 'LLLL d, yyyy')}
          </div>

          <Content>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: props.content }}
            />
          </Content>
        </article>
      </div>
    </Main>
  );
};

export const getStaticPaths: GetStaticPaths<IPostUrl> = async () => {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IPostProps, IPostUrl> = async ({
  params,
}) => {
  const post = getPostBySlug(params!.slug, [
    'title',
    'description',
    'date',
    'modified_date',
    'image',
    'content',
    'slug',
    'author',
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      title: post.title,
      description: post.description,
      date: post.date,
      modified_date: post.modified_date || post.date,
      image: post.image,
      author: post.author || 'Anonymous',
      content,
    },
  };
};

export default DisplayPost;
