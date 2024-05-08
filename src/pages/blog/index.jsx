import { builder } from "@builder.io/react";
import {Link } from 'react-router-dom';
import React from "react";
builder.init('74ed7c25315f4892855411d96f05c3ee');

const ARTICLES_PER_PAGE = 30;

function Blog({ articles, pageNumber }) {
  return (
    <div>
      {articles.map((item) => (
        <Link href={`/blog/${item.data.handle}`}>
          <div css={{ overflow: "hidden", width: 300 }}>
            <div css={{ width: 300, height: 200, display: "block" }}>
              <img src={item.data.image} />
            </div>
            {item.data.title}
            {item.data.description}
          </div>
        </Link>
      ))}
      <div css={{ padding: 20, width: 300, margin: 'auto', display: 'flex' }}>
        {pageNumber > 1 && (
          <a href={`/blog/page/${pageNumber - 1}`}>
            ‹ Previous page
          </a>
        )}

        {articles.length > ARTICLES_PER_PAGE && (
          <a href={`/blog/page/${pageNumber + 1}`}>
            Next page ›
          </a>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ query }) {
  // Get the page number from the path or query parameter
  // In this example we are hardcoding it as 1
  const pageNumber = 1;
  const articles = await builder.getAll("blog-article", {
    // Include references, like the `author` ref
    options: { includeRefs: true },
    // For performance, don't pull the `blocks` (the full blog entry content)
    // when listing
    omit: "data.blocks",
    limit: ARTICLES_PER_PAGE,
    offset: (pageNumber - 1) * ARTICLES_PER_PAGE,
  });

  return { props: { articles, pageNumber }};
}

export default Blog;
