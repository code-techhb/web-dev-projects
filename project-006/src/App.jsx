import StarRating from "./Components/StarRating";
import "./index.css";

const App = () => {
  return (
    <div className="appContainer">
      <StarRating maxRating={10} strokeColor="black" />
      <StarRating
        color="greenyellow"
        strokeColor="white"
        size={30}
        maxRating={5}
        defaultRating={3}
        messages={["Terrible", "Bad", "Okay", "Good", "Great"]}
      />
    </div>
  );
};

export default App;
