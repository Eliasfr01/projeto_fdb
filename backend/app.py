from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import psycopg2.extras

# Inicialize a aplicação Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)


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
    turma_data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO cadeira (id_cadeira, nome_cadeira, semestre_pertence, max_discentes, creditos, id_professor)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (turma_data['codigo'],turma_data['nome'], turma_data['semestre_pertence'], turma_data['max_discentes'],
              turma_data['creditos'], turma_data['id_professor']))
        conn.commit()
        return jsonify({'message': 'Turma adicionada com sucesso!'}), 201
    except Exception as e:
        conn.rollback()
        print(f"An error occurred: {e}")
        return jsonify({'error': 'Falha ao adicionar turma'}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/turmas/<int:id_cadeira>', methods=['PUT'])
def update_turma(id_cadeira):
    turma_data = request.get_json()

    # Verifique se todos os campos necessários estão presentes
    required_fields = ['nome_cadeira', 'semestre_pertence', 'max_discentes', 'creditos', 'id_professor']
    if not all(key in turma_data for key in required_fields):
        return jsonify({'error': 'Dados incompletos'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Atualizar a turma com os novos dados recebidos do cliente
        cursor.execute("""
            UPDATE cadeira
            SET nome_cadeira = %s, semestre_pertence = %s, max_discentes = %s, creditos = %s, id_professor = %s
            WHERE id_cadeira = %s
        """, (
            turma_data['nome_cadeira'],
            turma_data['semestre_pertence'],
            turma_data['max_discentes'],
            turma_data['creditos'],
            turma_data['id_professor'],
            id_cadeira
        ))

        conn.commit()
        if cursor.rowcount == 0:
            return jsonify({'error': 'Turma não encontrada'}), 404

        return jsonify({'message': 'Turma atualizada com sucesso'}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()


@app.route('/turmas/<int:id_cadeira>', methods=['DELETE'])
def delete_turma(id_cadeira):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM cadeira WHERE id_cadeira = %s", (id_cadeira,))
        conn.commit()
        if cursor.rowcount == 0:
            return jsonify({'error': 'Turma não encontrada'}), 404
        return jsonify({'message': 'Turma excluída com sucesso!'}), 200
    except Exception as e:
        conn.rollback()
        print(f"An error occurred: {e}")
        return jsonify({'error': 'Falha ao excluir turma'}), 500
    finally:
        cursor.close()
        conn.close()
    
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

@app.route('/alunos', methods=['GET'])
def get_alunos():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    try:
        cursor.execute("SELECT matricula, nome, sobrenome FROM aluno")
        alunos_db = cursor.fetchall()
        alunos = [{'nome': f"{aluno['nome']} {aluno['sobrenome']}", 'matricula': aluno['matricula']} for aluno in alunos_db]
        return jsonify(alunos)
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
