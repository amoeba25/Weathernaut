import { FaGithub } from "react-icons/fa6";

const Heading = () => {
  return (
    <div className="heading flex justify-between text-4xl">
      <h1 className="text-left text-azure-radiance-900 font-semibold">
        Weathernaut
      </h1>
      <a href="https://github.com/amoeba25/Weathernaut" target="_blank">
        <FaGithub />
      </a>
    </div>
  );
};

export default Heading;
