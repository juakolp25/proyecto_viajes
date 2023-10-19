import Sucrip from "../component/Home/sucrip";
import MainImage from "../component/Home/mainImage.js";
import Navbar from "../component/Home/navbar";
import Banner from "../component/Home/banner";
import Footer from "../component/Home/footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <div className="container">
        <MainImage />
        <Sucrip />
      </div>
      <Footer />
    </>
  );
};

export default Home;