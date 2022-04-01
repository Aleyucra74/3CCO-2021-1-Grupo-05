n <- 200
id <- 1:200

set.seed(2050)
notaSoftSkill = round(rnorm(n, 51, 16.5), 0)
summary(notaSoftSkill)

set.seed(1050)
fkUsuario = round(rnorm(10, 2, 3), 0)
summary(fkUsuario)

set.seed(8080)
fkSoftskill = round(rnorm(n, 3, 0.75), 0)
summary(fkSoftskill)

softskill_usuario = data.frame(
  id,
  notaSoftSkill,
  fkSoftskill,
  fkUsuario
)

write.table(
  softskill_usuario, file = "softskill_usuario.csv",
  sep = ",", col.names = TRUE, row.names = FALSE, fileEncoding = "UTF-8"
)

