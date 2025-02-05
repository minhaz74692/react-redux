import Counter from "../components/counter";
import MovieCard from "../components/MovieCard";
import Status from "../components/status";

function HomePage() {
  return (
    <>
         <MovieCard movie={{name: "Terminator"}}/>
         <MovieCard movie={{name: "Dictator"}}/>
         <Counter />
         <Status />
    </>
  ) 
}

export default HomePage;
