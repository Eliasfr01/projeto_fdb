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
    
@app.route('/turmas', methods=['GET'])
def get_cadeiras():
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
                # A consulta junta a tabela 'cadeira' com a tabela 'professor' 
                # para obter o nome do professor correspondente ao 'id_professor'.
                cursor.execute("""
                    SELECT c.id_cadeira, c.nome_cadeira, c.semestre_pertence, 
                           c.max_discentes, c.creditos, p.nome as nome_professor
                    FROM cadeira c
                    INNER JOIN professor p ON c.id_professor = p.id_professor
                """)
                cadeiras = cursor.fetchall()
                return jsonify([dict(cadeira) for cadeira in cadeiras])
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500
    
@app.route('/turmas', methods=['POST'])
def add_turma():
    # ...
    try:
        # ...
        cursor.execute("""
            INSERT INTO cadeira (nome_cadeira, semestre_pertence, max_discentes, creditos, id_professor)
            VALUES (%s, %s, %s, %s, %s)
        """, (turma_data['nome'], turma_data['semestre_pertence'], turma_data['max_discentes'],
              turma_data['creditos'], turma_data['professorId']))
        # ...
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': str(e)}), 500
    
@app.route('/professores', methods=['GET'])
def get_professores():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    try:
        cursor.execute("SELECT id_professor, nome FROM professor")
        professores = cursor.fetchall()
        return jsonify([dict(professor) for professor in professores])
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500
    finally:
        cursor.close()
        conn.close()

# Rota de teste para verificar se a aplicação está funcionando
@app.route('/')
def index():
    return "Hello, World!"

# Inicie a aplicação
if __name__ == '__main__':
    app.run(debug=True)
