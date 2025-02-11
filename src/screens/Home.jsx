import Counter from "../components/counter";
import MovieCard from "../components/MovieCard";
import Status from "../components/status";
import KitchenView from "../components/svg_viewer";
import testImage from "../assets/test2.jpg";
import ThreeSixtyViewer from "../components/threejs_test";
import PanoramaViewer from "../components/paranoma_test";

function HomePage() {
  return (
    <>
      {/* <img src={testImage} width={400} /> */}
      {/* <ThreeSixtyViewer imageUrl="https://pannellum.org/images/alma.jpg" /> */}
      {/* <ThreeSixtyViewer imageUrl={testImage} /> */}
      {/* <MovieCard movie={{ name: "Terminator" }} />
      <MovieCard movie={{ name: "Dictator" }} />
      {/* <KitchenView /> */}
      {/* <Counter /> */}
      {/* <Status /> */}

      <PanoramaViewer image={testImage} />
    </>
  );
}

export default HomePage;
