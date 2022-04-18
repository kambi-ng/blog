import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { AppConfig } from '../utils/AppConfig';
import { addTrailingSlash } from '../utils/Url';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  image?: string;
  date?: string;
  modified_date?: string;
  author?: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  let host: string;
  if (typeof window !== 'undefined') {
    host = window.location.host;
  } else host = router.basePath;

  let modifiedDate = '';
  if (props.modified_date) {
    modifiedDate = `${props.modified_date}`;
  }
  let date = '';
  if (props.date) {
    date = `${props.date}`;
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
        <title>{`${props.title} | ${AppConfig.site_name}`}</title>
        <meta
          property="og:description"
          content={props.description}
          key="desc"
        />

        <meta name="description" content={props.description} key="desc" />
        <meta property="og:image" content={host + props.image} />
        <meta property="og:site_name" content={AppConfig.site_name} />
        <meta
          property="og:title"
          content={`${props.title} | ${AppConfig.site_name}`}
        />
        <meta property="og:type" content={props.type} />
        {props.type === 'article' && (
          <>
            <meta
              property="article:published_time"
              content={new Date(date).toISOString()}
            />
            <meta
              property="article:modified_time"
              content={new Date(modifiedDate).toISOString()}
            />
            <meta property="article:author" content={props.author} />

            <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `
          {
            "description": "${
              props.description ? props.description : AppConfig.description
            }",
            "author": {
              "@type": "Person",
              "name": "${AppConfig.author}"
            },
            "@type": "BlogPosting",
            "url": "${AppConfig.url}${router.basePath}${addTrailingSlash(
                  router.asPath
                )}",
            "publisher": {
              "@type": "Organization",
              "logo": {
                "@type": "ImageObject",
                "url": "${AppConfig.url}${
                  router.basePath
                }/assets/images/logo.png"
              },
              "name": "${AppConfig.author}"
            },
            "headline": "${props.title} | ${AppConfig.site_name}",
            "image": ["${AppConfig.url}${router.basePath}${props.image}"],
            "datePublished": "${new Date(date).toISOString()}",
            "dateModified": "${new Date(modifiedDate).toISOString()}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "${AppConfig.url}${router.basePath}${addTrailingSlash(
                  router.asPath
                )}"
            },
            "@context": "http://schema.org"
          }`,
              }}
              key="ldjson"
            />
          </>
        )}
      </Head>
    </>
  );
};

export { Meta };
