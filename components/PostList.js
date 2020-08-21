import Link from "next/link";

export default function PostList({ posts }) {
  if (posts === "undefined") return null;

  return (
    <div>
      <style jsx>{`
        ul {
          list-style: none;
          font-size: 1.5rem;
          padding-left: 0;
          text-align: center;
        }

        li {
          margin-bottom: 1.5rem;
        }
      `}</style>
      {!posts && <div>No posts!</div>}
      <ul>
        {posts &&
          posts.map(post => {
            return (
              <li key={post.slug}>
                <Link href={{ pathname: `/post/${post.slug}` }}>
                  <a>{post?.frontmatter?.title} →</a>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
