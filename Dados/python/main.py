import csv
import MySQLdb
import pyodbc

hostnameLocal = 'localhost'
usernameLocal = 'root'
passwordLocal = 'gomes'
databaseLocal = 'bdHireIT'

hostname = 'hireit.database.windows.net'
username = 'adminlocal'
password = '#Gfgrupo5'
database = 'bdHireIt'
stringConexao = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER='+hostname+';DATABASE='+database+';UID='+username+';PWD='+ password

def selectBuscas(conexao, where) :
    cur = conexao.cursor()

    cur.execute(f'SELECT * FROM buscas WHERE tipo = {where}')
    listaBuscas = []

    for busca in cur.fetchall() :
        listaBuscas.append(busca)
        print(busca)
    
    return listaBuscas

def updateBuscas(conexao, where) :
    cur = conexao.cursor()

    cur.execute(f'UPDATE buscas SET quantidade = 0 WHERE tipo = {where}')

def insertBuscas(conexao):
    cursor = conexao.cursor()
    
    for linha in listaBuscas:
        tecnologia = linha[1]
        quantidade = linha[2]
        tipo = linha[3]
        query = "INSERT INTO buscas VALUES (null, %s, %s, %s)"
        cursor.execute(query, (tecnologia, quantidade, tipo))
    

myConnection = pyodbc.connect(stringConexao)
myConnectionLocal = MySQLdb.connect(host=hostnameLocal, user=usernameLocal, passwd=passwordLocal, db=databaseLocal)

listaBuscas = selectBuscas(myConnection,"'Oferta'")
updateBuscas(myConnection, "'Oferta'")
insertBuscas(myConnectionLocal)

myConnection.commit()
myConnectionLocal.commit()

myConnection.close()
myConnectionLocal.close()

with open('../R/tecnologias_oferta_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["id", "tecnologias", "quantidade","tipo"])
    for linha in listaBuscas:
        writer.writerow(linha)

myConnection = pyodbc.connect(stringConexao)
myConnectionLocal = MySQLdb.connect(host=hostnameLocal, user=usernameLocal, passwd=passwordLocal, db=databaseLocal)

listaBuscas = []
listaBuscas = selectBuscas(myConnection,"'Demanda'")
updateBuscas(myConnection, "'Demanda'")
insertBuscas(myConnectionLocal)

myConnection.commit()
myConnectionLocal.commit()

myConnection.close()
myConnectionLocal.close()

with open('../R/tecnologias_demanda_data.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["id", "tecnologias", "quantidade","tipo"])
    for linha in listaBuscas:
        writer.writerow(linha)