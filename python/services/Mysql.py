import mysql.connector

class Mysql:
    def __init__(self, user, password, host, database):
        self.user = user
        self.password = password
        self.host = host
        self.database = database
        self.mysql = None
        self.cursor = None

    def connect(self):
        try:
            self.mysql = mysql.connector.connect(user=self.user, password=self.password, host=self.host, database=self.database)
            print(self.mysql)
            self.cursor = self.mysql.cursor()
        except Exception as err:
            print(err)
            raise

    def insert(self, values):
        print(values)
        print("data",values[0])
        query = (
            "insert into personalidade_porc(id_personalidade_porc,fk_usuario,extrovertido,emocional,empatia,cauteloso,intelecto) values(null,1,%s,%s,%s,%s,%s);"
        )
        try:
            print('Inserindo Valores')
            self.cursor.execute(query,(values[2],values[3],values[4],values[5],values[6]))
            self.mysql.commit()
        except Exception as err:
            print(err)
            self.mysql.rollback()
            self.close()
