from flask import Flask, request, jsonify
from langchain_community.llms import LlamaCpp
from langchain.chains import ConversationalRetrievalChain
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.schema import Document
import os



app = Flask(__name__)

# Configuração do modelo Llama
llm = LlamaCpp(model_path="path/to/llama2_model.bin")  # Ajuste o caminho do modelo Llama

# Configuração do armazenamento vetorial para LangChain
def configurar_base_de_conhecimento(notas):
    # Criar documentos com as notas para embasamento da IA
    documentos = [ 
        Document(
            page_content=f"A matéria '{materia}' teve a nota {nota}. "
                         f"Avalie como melhorar nesta área.",
            metadata={"materia": materia, "nota": nota}
        )
        for materia, nota in notas.items()
    ]
    
    # Usar embeddings para criar um índice FAISS
    embeddings = OpenAIEmbeddings()  # Configure com suas chaves se usar o OpenAI
    base_vetorial = FAISS.from_documents(documentos, embeddings)
    return base_vetorial

@app.route('/configurar', methods=['POST'])
def configurar_ia():
    """
    Inicializa a base de conhecimento com as notas enviadas.
    Formato esperado:
    {
        "notas": {
            "Matemática": 7.5,
            "História": 5.0,
            "Física": 9.0
        }
    }
    """
    data = request.json
    notas = data.get("notas")

    if not notas:
        return jsonify({"error": "Notas não fornecidas"}), 400

    # Configurar a base de conhecimento
    global chain
    base_vetorial = configurar_base_de_conhecimento(notas)
    chain = ConversationalRetrievalChain(llm=llm, retriever=base_vetorial.as_retriever())
    
    return jsonify({"message": "Base de conhecimento configurada com sucesso!"})

@app.route('/perguntar', methods=['POST'])
def perguntar():
    """
    Endpoint para interagir com a IA.
    Formato esperado:
    {
        "pergunta": "O que posso melhorar em Matemática?"
    }
    """
    data = request.json
    pergunta = data.get("pergunta")

    if not pergunta:
        return jsonify({"error": "Pergunta não fornecida"}), 400

    if 'chain' not in globals():
        return jsonify({"error": "Base de conhecimento não configurada"}), 500

    # Obter resposta da IA
    resposta = chain.run(pergunta)
    return jsonify({"resposta": resposta})

if __name__ == '__main__':
    app.run(debug=True)
