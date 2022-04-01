n <- 200
id <- 1:200

set.seed(9090)
tecnologia = round(rnorm(n, 5, 1.5), 0)
summary(tecnologia)

tecnologia <- factor(tecnologia, levels = c(1,2,3,4,5,6,7,8,9,10), 
                    labels = c('Java','Springboot','MySQL', 'SQL Server', 'React',
                               'C#','C++','C', 'R', 'Python'))

set.seed(8080)
softskill = round(rnorm(n, 3, 0.75), 0)
summary(softskill)

softskill <- factor(softskill, levels = c(1,2,3,4,5), 
                      labels = c('Aberto para experiência',
                                 'Conscienciosidade','Extroversão', 
                                 'Instabilidade Emocional', 'Amabilidade'))


tecnologia_softskill = data.frame(
  id,
  tecnologia,
  softskill
  )


write.table(
  tecnologia_softskill, file = "tecnologia_perfil.csv",
  sep = ",", col.names = TRUE, row.names = FALSE, fileEncoding = "UTF-8"
)

