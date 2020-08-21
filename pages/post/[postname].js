import Link from "next/link";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

import Layout from "@components/Layout";
import getSlugs from "@utils/getSlugs";

export default function BlogPost({ siteTitle, frontmatter, markdownBody }) {
  if (!frontmatter) return <></>;

  return (
    <>
      <Layout pageTitle={`${siteTitle} | ${frontmatter.title}`}>
        <div className="back">
          ←{" "}
          <Link href="/">
            <a>Back to post list</a>
          </Link>
        </div>
        <article>
          <h1 className="title">{frontmatter.title}</h1>
          {frontmatter.hero_image && (
            <img
              src={frontmatter.hero_image}
              className="hero"
              alt={frontmatter.title}
            />
          )}
          <div className="articleText">
            <ReactMarkdown source={markdownBody} />
          </div>
        </article>
      </Layout>
      <style jsx>{`
.title {
font-size: 3em;
}
article :global(h1) {
font-size: 2em;
}
article :global(h2) {
font-size: 1.5em;
}
        article :global(ol > li),
        article :global(ul > li) {
          margin-bottom: 10px;
        }
        article :global(hr) {
          margin: 2em 0;
          border: solid 1px #eee;
        }
        article {
          width: 100%;
          max-width: 960px;
        }
        a {
          color: black;
          text-decoration: none;
        }
        a:visited {
          color: black;
        }
        h1 {
          font-size: 3rem;
        }
        h3 {
          font-size: 2rem;
        }
        .hero {
          width: 100%;
        }
        .back {
          width: 100%;
          max-width: 960px;
          color: black;
        }
        .articleText {
          line-height: 150%;
        }
        article :global(blockquote) {
          margin: 0;
          background: #f8f8f8;
          padding: 10px 15px;
          border-left: solid 5px #5d6dff;
          font-style: italic;
        }
        :global(blockquote) :global(p) {
          margin: 0;
        }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params;

  const content = await import(`../../posts/${postname}.md`);
  const config = await import(`../../siteconfig.json`);
  const data = matter(content.default);

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content
    }
  };
}

export async function getStaticPaths() {
  const blogSlugs = (context => {
    return getSlugs(context);
  })(require.context("../../posts", true, /\.md$/));

  const paths = blogSlugs.map(slug => `/post/${slug}`);

  return {
    paths, // An array of path names, and any params
    fallback: false // so that 404s properly appear if something's not matching
  };
}
