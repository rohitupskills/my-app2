import {
    builder,
    BuilderComponent,
    BuilderContent,
    useIsPreviewing,
  } from "@builder.io/react";
  import Head from "next/head";
  import DefaultErrorPage from "next/error";
import React from "react";
  
  builder.init('74ed7c25315f4892855411d96f05c3ee');
  
  function BlogArticle({ article }) {
    const isPreviewing = useIsPreviewing();
    if (!article && !isPreviewing) {
      return (
        <>
          <Head>
            <meta name="robots" content="noindex" />
          </Head>
          <DefaultErrorPage statusCode={404} />
        </>
      );
    }
  
    return (
      // Wrapping the structured data in BuilderContent allows
      // it to update in real time as your custom fields are edited in the
      // Visual Editor
      <BuilderContent
        content={article}
        options={{ includeRefs: true }}
        model="blog-article"
      >
        {(content) => (
          <React.Fragment>
            <Head>
              {/* Render meta tags from custom field */}
              <title>{content?.data.title}</title>
              <meta name="description" content={content?.data.blurb} />
              <meta name="og:image" content={content?.data.image} />
            </Head>
  
            <div>
              <div>{content?.data.title}</div>
              {/* Render the Builder drag/drop'd content */}
              <BuilderComponent
                name="blog-article"
                content={content}
                options={{ includeRefs: true }}
              />
            </div>
          </React.Fragment>
        )}
      </BuilderContent>
    );
  }
  
  export async function getStaticProps({ params }) {
    const article = await builder
      .get("blog-article", {
        // Include references, like our `author` ref
        options: { includeRefs: true },
        query: {
          // Get the specific article by handle
          "data.handle": params.handle,
        },
      })
      .promise();
  
    return {
      props: {
        article,
      },
    };
  }
  
  export async function getStaticPaths() {
    return {
      // Optionally, use builder.getAll() to fetch all paths,
      // or just allow fallback: true to render any path
      paths: [],
      fallback: true,
    };
  }
  
  export default BlogArticle;
  