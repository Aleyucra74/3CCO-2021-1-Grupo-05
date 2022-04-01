import ServicesNavbar from "components/ServicesNavbar";
import Header from "../components/listaFreelancers/Header.js";
import FreelaListSection from "../components/listaFreelancers/FreelaListSection.js";
import "../assets/styles/notfound.css";
import { useEffect } from "react";
import { render } from "react-dom";
import Button from "@material-tailwind/react/Button";
import { Link } from "react-router-dom";
export default function NotFound() {
    useEffect(() => {
        document.querySelector('body').style.backgroundColor = 'currentColor';
    }, []);
  return (
    <>
<figure>
	<div class="sad-mac"></div>
	<figcaption>
		<span class="sr-text">Error 404: Not Found</span>
		<span class="e" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="r" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="r" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="o" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="r" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="_4" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="_0" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="_4" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="n" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="o" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="t" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="f" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="o" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="u" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="n" style={{color:"var(--primaryColorDark)"}}></span>
		<span class="d" style={{color:"var(--primaryColorDark)"}}></span>
	</figcaption>
    <Link to="/">
        <Button className="mx-auto mt-12" size="lg" style={{backgroundColor:"var(--primaryColor)"}}>Home</Button>
    </Link>
</figure>
    </>
  );
}
