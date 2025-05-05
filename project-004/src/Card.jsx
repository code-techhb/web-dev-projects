import Header from "./Header";
import Avatar from "./Avatar";
import Bio from "./Bio";
const Card = () => {
  return (
    <article className="cardContainer">
      <Avatar />
      <Header />
      <Bio />
    </article>
  );
};

export default Card;
