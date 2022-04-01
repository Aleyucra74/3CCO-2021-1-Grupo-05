import Card from "@material-tailwind/react/Card";
import CardImage from "@material-tailwind/react/CardImage";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";
import H6 from "@material-tailwind/react/Heading6";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import StatusCard from "components/landing/StatusCard";
import Image from "@material-tailwind/react/Image";
import Logistic from "assets/img/logistic-image.png";
import InteligenciaEmocional from "assets/img/inteligencia-emocional-image.png";
import Amabilidade from "assets/img/amabilidade-2-image.png";
import Extroversao from "assets/img/extoversao-4-image.png";
import Openess from "assets/img/extroversao-image.png";

export default function InfoSection() {
  return (
    <>
      <section className="pt-20 pb-20 bg-white-100">
        <div className="container mx-auto px-4">
          <div className="container-progress">
            <div className="items-center mt-5">
              <div className="overflow-hidden flex flex-wrap">
                <div className="float-left" style={{ width: "15%" }}>
                  <Image
                    src={Logistic}
                    rounded={false}
                    raised={false}
                    alt="Image"
                    style={{ height: "11rem", position: "relative", top:"50%", transform: "translateY(-50%)" }}
                  />
                </div>
                <div className="float-right" style={{ width: "85%" }}>
                  <Card>
                    <CardBody>
                      <H6 color="gray">1- Conscienciosidade</H6>
                      <Paragraph color="blueGray">
                        É a tendência para mostrar autodisciplina, orientação
                        para os deveres e para atingir os objetivos. Este traço
                        mostra uma preferência pelo comportamento planejado em
                        vez do espontâneo. No geral, influencia a maneira como
                        controlamos e dirigimos os nossos impulsos. Pessoas com
                        esse traço dominante são mais rígidas em relação a
                        qualquer eventual quebra de valores.
                      </Paragraph>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="overflow-hidden mt-8 flex flex-wrap">
                <div className="float-left" style={{ width: "15%" }}>
                  <Image
                    src={InteligenciaEmocional}
                    rounded={false}
                    raised={false}
                    alt="Image"
                    style={{ height: "11rem", position: "relative", top:"50%", transform: "translateY(-50%)" }}
                  />
                </div>
                <div className="float-right" style={{ width: "85%" }}>
                  <Card>
                    <CardBody>
                      <H6 color="gray">2- Estabilidade emocional</H6>
                      <Paragraph color="blueGray">
                        Pessoas com pontuação alta em estabilidade emocional
                        (baixa em neuroticismo) em um teste reagem menos
                        emocionalmente e são menos facilmente perturbadas. Eles
                        tendem a ser emocionalmente estáveis, calmos e não
                        experimentam sentimentos negativos. O fato de essas
                        pessoas não sentirem sentimentos negativos não significa
                        que vivenciem muitos sentimentos positivos.
                      </Paragraph>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="overflow-hidden mt-8 flex flex-wrap">
                <div className="float-left" style={{ width: "15%" }}>
                  <Image
                    src={Amabilidade}
                    rounded={false}
                    raised={false}
                    alt="Image"
                    style={{ height: "11rem", position: "relative", top:"50%", transform: "translateY(-50%)" }}
                  />
                </div>
                <div className="float-right" style={{ width: "85%" }}>
                  <Card>
                    <CardBody>
                      <H6 color="gray">3- Amabilidade</H6>
                      <Paragraph color="blueGray">
                        Uma pessoa com um alto nível de amabilidade em um teste
                        de personalidade geralmente é calorosa, amigável e
                        diplomática. Eles geralmente têm uma visão otimista da
                        natureza humana e se dão bem com os outros. Uma pessoa
                        com pontuação baixa em agradabilidade pode colocar seus
                        próprios interesses acima dos dos outros. Eles tendem a
                        ser distantes, hostis e não cooperativos.
                      </Paragraph>
                    </CardBody>
                  </Card>
                </div>
              </div>{" "}
              <div className="overflow-hidden mt-8 flex flex-wrap">
                <div className="float-left" style={{ width: "15%" }}>
                  <Image
                    src={Extroversao}
                    rounded={false}
                    raised={false}
                    alt="Image"
                    style={{ height: "11rem", position: "relative", top:"50%", transform: "translateY(-50%)" }}
                  />
                </div>
                <div className="float-right" style={{ width: "85%" }}>
                  <Card>
                    <CardBody>
                      <H6 color="gray">4- Extroversão</H6>
                      <Paragraph color="blueGray">
                        Os extrovertidos, usualmente, são aquelas pessoas cheias
                        de energia, entusiastas e voltadas para a ação. Por
                        outro lado, os introvertidos não têm a exuberância
                        social e os níveis de atividade dos extrovertidos. Eles
                        tendem a parecer calmos, ponderados e menos envolvidos
                        com o mundo social. Os introvertidos necessitam de menos
                        estímulos e de mais tempo sozinhos do que os
                        extrovertidos, mas isso não deve ser confundido com
                        timidez ou depressão. Eles podem ser bastante ativos e
                        enérgicos em outros campos que não o do relacionamento
                        social.
                      </Paragraph>
                    </CardBody>
                  </Card>
                </div>
              </div>{" "}
              <div className="overflow-hidden mt-8 flex flex-wrap">
                <div className="float-left" style={{ width: "15%" }}>
                  <Image
                    src={Openess}
                    rounded={false}
                    raised={false}
                    alt="Image"
                    style={{ height: "11rem", position: "relative", top:"50%", transform: "translateY(-50%)" }}
                  />
                </div>
                <div className="float-right" style={{ width: "85%" }}>
                  <Card>
                    <CardBody>
                      <H6 color="gray">5- Aberto para experiências</H6>
                      <Paragraph color="blueGray">
                        Geralmente, as pessoas que apresentam esse fator como
                        dominante são imaginativas, criativas, curiosas,
                        apreciadoras da arte e sensíveis à beleza. Essas pessoas
                        tendem a levar em conta os seus sentimentos e a terem
                        opiniões não convencionais. Por outro lado, aqueles que
                        têm uma menor abertura para experiências costumam ter
                        interesses mais convencionais e tradicionais. Eles
                        preferem o simples, claro e óbvio ao complexo, ambíguo e
                        sutil. Além disso, podem ver as artes e as ciências com
                        suspeitas, achá-las “desinteressantes” e não gostarem de
                        correr riscos.
                      </Paragraph>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
