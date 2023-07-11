import Filtration from "@/components/Filtration/Filtration";
import Header from "@/components/Header/Header";
import Sorting from "@/components/Sorting/Sorting";
import Todos from "@/components/Todos/Todos";

export default function Home() {
  return (
    <>
      <Header />
      <Filtration />
      <Sorting />
      <Todos />
    </>
  );
}
