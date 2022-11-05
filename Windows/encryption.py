import bcrypt

class Encrypt():
    def encrypt(self, password):
        password = bytes(password.encode('latin-1'))
        hashed = bcrypt.hashpw(password, bcrypt.gensalt())
        return hashed

    def compdb(self, password, hash):
        hash = bytes(hash.encode('latin-1'))
        password = bytes(password.encode('latin-1'))
        if bcrypt.hashpw(password, hash) == hash:
            return True
        else:
            return False