import { Link, useRouteError } from "react-router-dom";
import Team from "../components/team";
import Gallery from "../components/gallery";
import Info from "../components/info";
import TopPart from "../components/top-part";
import BottomPart from "../components/bottom-part";
import Footer from "../components/footer";
import Judges from "../components/judges.jsx";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='h-screen'>
      <TopPart />
      <Info />
      <Gallery />
      
      <Judges />
      <BottomPart />
      <Footer />
    </div>
  );
}
