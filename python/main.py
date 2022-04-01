from services.Mysql import Mysql
import os
import pandas as pd
import time

mysql = Mysql('root','123', 'localhost', 'bdhireit')

mysql.connect()

df = pd.read_csv("./arquivos/perfil200.csv",sep=",")
df = df.values.tolist()

for teste in df:
  time.sleep(0.5)
  mysql.insert(teste)
  print(teste)




#mysql.insert(teste)