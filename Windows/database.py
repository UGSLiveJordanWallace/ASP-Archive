import mysql.connector
from encryption import Encrypt

mydb = mysql.connector.connect(user='bc775ee66e30b7', password='fcb659ba', host='us-cdbr-east-03.cleardb.com', database='heroku_3e2d5234dae34bd', auth_plugin='mysql_native_password')
c = mydb.cursor(buffered=True)

class DataBase():
    def login(self, password, email):
        try:
            c.execute(f"SELECT password FROM users WHERE email = '{email}'")

            for row in c:
                for column in row:
                    boolean_value = Encrypt().compdb(password, str(column))
                    print(boolean_value)
                    if boolean_value == True:
                        return True
                    else:
                        pass

            return False
        except Exception as e:
            print(f"Something went wrong + {e}")
            return f"Something went wrong: {e}"
