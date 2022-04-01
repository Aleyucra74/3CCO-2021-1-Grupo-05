n <- 200
id <- 1:200
fku <- 1:200

set.seed(9090)
extrovertido = ((round(rnorm(n, 20, 5.1), 0) / 40) * 100)
summary(extrovertido)

set.seed(8080)
emocional = ((round(rnorm(n, 20, 5.1), 0) / 40) * 100)
summary(emocional)

set.seed(7060)
empatia = ((round(rnorm(n, 20, 5.1), 0) / 40) * 100)
summary(empatia)

set.seed(6060)
cauteloso = ((round(rnorm(n, 20, 5.1), 0) / 40) * 100)
summary(cauteloso)

set.seed(4050)
intelecto = ((round(rnorm(n, 20, 5.1), 0) / 40) * 100)
summary(intelecto)

perfil = data.frame(
  id,
  fku,
  extrovertido,
  emocional,
  empatia,
  cauteloso,
  intelecto)

write.table(
  perfil, file = "perfil200.csv",
  sep = ",", col.names = TRUE, row.names = FALSE, fileEncoding = "UTF-8"
)
