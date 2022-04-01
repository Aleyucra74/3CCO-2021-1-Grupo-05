library(tm)
library(wordcloud2)
library(readr)
library(dplyr)

setwd("D:/Github/3CCO-2021-1-Grupo-05/Dados/R")
tecnologias_csv = read_csv("tecnologias_oferta_data.csv")

tecnologias.corpus = Corpus(VectorSource(tecnologias_csv$tecnologias))

tdm = TermDocumentMatrix(tecnologias.corpus) %>%
  as.matrix()
df = data.frame(tech = tecnologias_csv$tecnologias, freq = tecnologias_csv$quantidade)

uxc.colors = c("#d4d4d4", "#7ACDF1", "#885EE1", "#216AD9")
uxc.background = "#262626"

library(extrafont)

wordcloud2(df, 
           color = rep_len(uxc.colors, nrow(df)), 
           backgroundColor = uxc.background,
           fontFamily = "Fira code",
           size = 1,
           rotateRatio = 0,
           shuffle = 1)