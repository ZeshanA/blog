import Layout from "@components/Layout";

const About = ({ title, description, ...props }) => {
  return (
    <>
      <style jsx>
        {`
          h1 {
            margin-bottom: 0;
          }
          h2 {
            font-weight: normal;
            color: #666;
            font-size: 18px;
          }
          p {
            max-width: 50ch;
            line-height: 150%;
            color: #666;
          }
          a {
            font-weight: bold;
          }
        `}
      </style>

      <Layout pageTitle={`${title} | About`} description={description}>
        <h1 className="title">Welcome to Thoughts On...</h1>
        <h2>A blog by Zeshan Amjad </h2>

        <p className="description">
          Hi, I'm Zeshan. I'm an Associate at Morgan Stanley Investment
          Management. In this blog, I hope to share my thoughts on things like
          career development, software engineering, design and finance.
        </p>

        <p>
          <a href="https://twitter.com/zshnamjd">Follow me on Twitter</a>
        </p>
      </Layout>
    </>
  );
};

export default About;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  return {
    props: {
      title: configData.default.title,
      description: configData.default.description
    }
  };
}
