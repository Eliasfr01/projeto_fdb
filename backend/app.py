from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import psycopg2.extras

# Inicialize a aplicação Flask
app = Flask(__name__)
CORS(app)

# Função para criar conexões com o banco de dados
def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        dbname='trabalhoFinal',
        user='postgres',
        password='159357'
    )
    return conn

# Rota de login
@app.route('/login', methods=['POST'])
def login():
    # Pegue os dados do request JSON
    username = request.json.get('username')
    password = request.json.get('password')
    user_type = request.json.get('user_type')

    # Conecte-se ao banco de dados
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    
    # Tente encontrar o usuário no banco de dados
    cursor.execute('SELECT * FROM usuario WHERE nome_usuario = %s AND senha_usuario = %s AND tipo_usuario = %s', 
                   (username, password, user_type))
    user = cursor.fetchone()
    
    cursor.close()
    conn.close()

    # Verifique se o usuário foi encontrado
    if user:
        # Se encontrado, retorne uma resposta de sucesso
        return jsonify({'message': 'Login successful', 'user': dict(user)}), 200
    else:
        # Se não encontrado, retorne uma resposta de erro
        return jsonify({'error': 'Invalid username, password, or user type'}), 401

# Rota de teste para verificar se a aplicação está funcionando
@app.route('/')
def index():
    return "Hello, World!"

# Inicie a aplicação
if __name__ == '__main__':
    app.run(debug=True)
