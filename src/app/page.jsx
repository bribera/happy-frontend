import Annonce from "@/components/Annonce";
import CoursTablePrograme from "@/components/CoursTablePrograme";
import DerniereActualite from "@/components/DerniereActualite";
import ListFormation from "@/components/ListFormation";
import SlideImageHeader from "@/components/SlideImageHeader";
import SlideTemoignage from "@/components/SlideTemoignage";

export default function Home() {
  return (
    <div className="bg">
      <div className="relative  pt-42 lg:pt-28 px-6 ">
       <SlideImageHeader />
       <Annonce />
       <ListFormation />
       <DerniereActualite />
       <CoursTablePrograme />
       <SlideTemoignage />
      </div>
    </div>
  );
}
