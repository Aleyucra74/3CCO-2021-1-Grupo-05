import _ from "lodash";

export const categories = ["Extroversion", "Agreeableness", "Conscientiousness", "Emotional Stability", "Openness"];

export const rawQuestions = [
  { question: "Eu sou interessado nas pessoas.", category: "Agreeableness", score: "1" },
  { question: "Me simpatizo com os sentimentos dos outros.", category: "Agreeableness", score: "1" },
  { question: "Tenha um coração mole.", category: "Agreeableness", score: "1" },
  { question: "Reserve um tempo para os outros.", category: "Agreeableness", score: "1" },
  { question: "Sinto as emoções dos outros.", category: "Agreeableness", score: "1" },
  { question: "Faço as pessoas se sentirem à vontade.", category: "Agreeableness", score: "1" },
  { question: "Me informo sobre o bem-estar dos outros.", category: "Agreeableness", score: "1" },
  { question: "Sai como confortar os outros.", category: "Agreeableness", score: "1" },
  { question: "Amo crianças.", category: "Agreeableness", score: "1" },
  { question: "Estou me dando bem com quase todo mundo.", category: "Agreeableness", score: "1" },
  { question: "Tenho sempre o que dizer", category: "Agreeableness", score: "1" },
  { question: "Mostro minha gratidão.", category: "Agreeableness", score: "1" },
  { question: "Sempre penso nos outros.", category: "Agreeableness", score: "1" },
  { question: "Amo ajudar os outros.", category: "Agreeableness", score: "1" },
  { question: "Não estou interessado nos problemas de outras pessoas.", category: "Agreeableness", score: "-1" },
  { question: "Não me preocupo com os outros.", category: "Agreeableness", score: "-1" },
  { question: "Não estou realmente interessado nos outros.", category: "Agreeableness", score: "-1" },
  { question: "Sou difícil de lidar.", category: "Agreeableness", score: "-1" },
  { question: "Sou indiferente aos sentimentos dos outros.", category: "Agreeableness", score: "-1" },
  { question: "Sempre estou preparado.", category: "Conscientiousness", score: "1" },
  { question: "Presto atenção aos detalhes.", category: "Conscientiousness", score: "1" },
  { question: "Faço as tarefas imediatamente.", category: "Conscientiousness", score: "1" },
  { question: "Gosto de me organizar.", category: "Conscientiousness", score: "1" },
  { question: "Siga um cronograma.", category: "Conscientiousness", score: "1" },
  { question: "Sou exigente no meu trabalho.", category: "Conscientiousness", score: "1" },
  { question: "Faço as coisas de acordo com um plano.", category: "Conscientiousness", score: "1" },
  { question: "Continuo até que tudo esteja perfeito.", category: "Conscientiousness", score: "1" },
  { question: "Faça planos e sempre cumpro.", category: "Conscientiousness", score: "1" },
  { question: "Amo ter tudo em ordem.", category: "Conscientiousness", score: "1" },
  { question: "Gosto de arrumar.", category: "Conscientiousness", score: "1" },
  { question: "Sempre perco as coisas.", category: "Conscientiousness", score: "-1" },
  { question: "Faço muita bagunça.", category: "Conscientiousness", score: "-1" },
  { question: "Muitas vezes esqueço de colocar as coisas de volta em seus devidos lugares.", category: "Conscientiousness", score: "-1" },
  { question: "Evito meus deveres.", category: "Conscientiousness", score: "-1" },
  { question: "Terceirizo meus deveres.", category: "Conscientiousness", score: "-1" },
  { question: "Eu procrastino.", category: "Conscientiousness", score: "-1" },
  { question: "Faço as coisas pela metade.", category: "Conscientiousness", score: "-1" },
  { question: "É difícil começar a trabalhar.", category: "Conscientiousness", score: "-1" },
  { question: "Deixo uma bagunça meu quarto.", category: "Conscientiousness", score: "-1" },
  { question: "Fico relaxado a maior parte do tempo.", category: "Emotional Stability", score: "1" },
  { question: "Raramente me sinto triste.", category: "Emotional Stability", score: "1" },
  { question: "Não me incomodo facilmente com as coisas.", category: "Emotional Stability", score: "1" },
  // { question: "Rarely get irritated.", category: "Emotional Stability", score: "1" },
  { question: "Raramente fico bravo.", category: "Emotional Stability", score: "1" },
  { question: "Me estresso facilmente.", category: "Emotional Stability", score: "-1" },
  { question: "Me preocupo facilmente", category: "Emotional Stability", score: "-1" },
  { question: "Me perturbo facilmente.", category: "Emotional Stability", score: "-1" },
  { question: "Fico bravo facilmente.", category: "Emotional Stability", score: "-1" },
  // { question: "Change my mood a lot.", category: "Emotional Stability", score: "-1" },
  { question: "Tenho mudanças de humor frequentes.", category: "Emotional Stability", score: "-1" },
  { question: "Me irrito facilmente.", category: "Emotional Stability", score: "-1" },
  { question: "Muitas vezes me sinto triste.", category: "Emotional Stability", score: "-1" },
  // { question: "Get angry easily.", category: "Emotional Stability", score: "-1" },
  { question: "Fico em pânico rapidamente.", category: "Emotional Stability", score: "-1" },
  { question: "Me sinto ameaçado facilmente.", category: "Emotional Stability", score: "-1" },
  { question: "Fico dominado por emoções.", category: "Emotional Stability", score: "-1" },
  { question: "Me ofendo facilmente.", category: "Emotional Stability", score: "-1" },
  { question: "Me apego aos meus problemas.", category: "Emotional Stability", score: "-1" },
  // { question: "Grumble about things.", category: "Emotional Stability", score: "-1" },
  { question: "Eu sou a alma da festa.", category: "Extroversion", score: "1" },
  { question: "Me sinto confortável perto de pessoas.", category: "Extroversion", score: "1" },
  { question: "Tenho iniciativa para começar conversas.", category: "Extroversion", score: "1" },
  { question: "Converse com muitas pessoas diferentes.", category: "Extroversion", score: "1" },
  { question: "Não se importa de ser o centro das atenções.", category: "Extroversion", score: "1" },
  { question: "Faço amigos facilmente.", category: "Extroversion", score: "1" },
  { question: "Assumo o controle.", category: "Extroversion", score: "1" },
  { question: "Sai como cativar as pessoas.", category: "Extroversion", score: "1" },
  { question: "Sinto-me à vontade com as pessoas.", category: "Extroversion", score: "1" },
  { question: "Sou hábil em lidar com situações sociais.", category: "Extroversion", score: "1" },
  { question: "Não falo muito.", category: "Extroversion", score: "-1" },
  { question: "Me mantenho escondido.", category: "Extroversion", score: "-1" },
  { question: "Tenho sempre pouco a dizer.", category: "Extroversion", score: "-1" },
  { question: "Não gosto de chamar atenção.", category: "Extroversion", score: "-1" },
  { question: "Sou quieto perto de pessoas estranhas.", category: "Extroversion", score: "-1" },
  { question: "Acho difícil abordar outras pessoas.", category: "Extroversion", score: "-1" },
  { question: "Frequentemente sento-me desconfortável na presença de outros.", category: "Extroversion", score: "-1" },
  { question: "Reprimo meus sentimentos.", category: "Extroversion", score: "-1" },
  { question: "Sou uma pessoa privada.", category: "Extroversion", score: "-1" },
  { question: "Espero que outros liderem o caminho.", category: "Extroversion", score: "-1" },
  { question: "Tenho um vocabulário rico.", category: "Openness", score: "1" },
  { question: "Tenho uma imaginação fértil.", category: "Openness", score: "1" },
  { question: "Tenho ótimas ideias.", category: "Openness", score: "1" },
  { question: "Sou rápido para entender as coisas.", category: "Openness", score: "1" },
  { question: "Uso palavras difíceis.", category: "Openness", score: "1" },
  { question: "Passo algum tempo refletindo sobre as coisas.", category: "Openness", score: "1" },
  { question: "Sou cheio de ideias.", category: "Openness", score: "1" },
  { question: "Levo a conversa para um nível mais alto.", category: "Openness", score: "1" },
  { question: "Entendo as coisas rapidamente.", category: "Openness", score: "1" },
  { question: "Posso lidar com muitas informações.", category: "Openness", score: "1" },
  { question: "Adoro pensar em novas maneiras de fazer as coisas.", category: "Openness", score: "1" },
  { question: "Adoro ler algo desafiador.", category: "Openness", score: "1" },
  { question: "Sou bom em muitas coisas.", category: "Openness", score: "1" },
  { question: "Tenho dificuldade em entender ideias abstratas.", category: "Openness", score: "-1" },
  { question: "Não estou interessado em ideias abstratas.", category: "Openness", score: "-1" },
  { question: "Não tenho uma boa imaginação.", category: "Openness", score: "-1" },
  { question: "Tento evitar pessoas complexas.", category: "Openness", score: "-1" },
  { question: "Tenho dificuldade em imaginar coisas.", category: "Openness", score: "-1" },
  { question: "Evito uma leitura difícil.", category: "Openness", score: "-1" },
  { question: "Não investigo profundamente um assunto.", category: "Openness", score: "-1" },
];

export function createSelection() {
  const groups = _.groupBy(rawQuestions, (question) => question.category);
  const zipped = _.zip(..._.values(groups));
  return _.flatten(zipped).filter((x) => !_.isUndefined(x));
}

export const questions = createSelection();

export const keywords = {
  Extroversion: ["Socially engaged", "Enthusiastic", "Assertive", "Full of energy", "Breadthful"],
  Agreeableness: [
    "Considerate",
    "Trustworthy",
    "Trusting",
    "Concerned with the well-being of others",
    "Seeks group harmony",
  ],
  Conscientiousness: ["Disciplined", "Dutiful", "Reliable", "Less spontaneous", "Focused", "Stubborn"],
  Openness: ["Unpredictable", "Pursues experiences", "Open-minded", "Curious", "Spontaneous"],
  "Emotional Stability": ["Calm", "Less easily upset", "Less pessimistic"],
};

export function personalize(question) {
  return `${question}`;
}

export function categoryTotal(category) {
  return questions.filter((x) => x.category === category).reduce((acc, _) => acc + 5, 0);
}

export function score(questionResults) {
  const defaultScores = _.fromPairs(categories.map((category) => [category, []]));
  const sorted = _.merge(
    defaultScores,
    _.groupBy(questionResults, (result) => result.category)
  );
  const maxValues = _.fromPairs(categories.map((category) => [category, categoryTotal(category)]));
  const totals = {};
  categories.forEach((category) => {
    totals[category] = Math.trunc(
      (100 * sorted[category].reduce((acc, answer) => acc + answer.score, 0)) / maxValues[category]
    );
  });
  return totals;
}

export default {
  categories,
  questions,
  keywords,
  personalize,
  score,
  categoryTotal,
};
