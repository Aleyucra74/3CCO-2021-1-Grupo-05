import Title from "components/listaFreelancers/Title";
import "../../assets/styles/freelancer.css";

export default function Header() {
  return (
    <div className="relative bg-gray-100">
        <div className="text-gray-600">
          <Title heading="Dashboard"></Title>
          <hr className="title-hr ml-auto mr-auto"/>
        </div>
      </div>
  );
}
