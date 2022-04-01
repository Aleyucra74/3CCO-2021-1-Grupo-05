import Container from "components/login/Container";
import { Divider } from "semantic-ui-react";
import ScoreChart from "components/ScoreChart";
import { useScores } from "components/Score";

export default function ChartSection() {
  return (
    <>
      <section className="bg-white-100 w-full mt-8">
        <div className="container">
          <Divider hidden />
          <ScoreChart scores={useScores()} style={{ margin: "auto" }} />
          <Divider hidden />
        </div>
      </section>
    </>
  );
}
