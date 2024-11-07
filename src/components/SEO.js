import { Helmet } from "react-helmet-async";

function SEO({ title }) {
  return (
    <Helmet>
      <title>{title ? `${title} | Weather Claus` : "Weather Claus"}</title>
    </Helmet>
  );
}

export default SEO;