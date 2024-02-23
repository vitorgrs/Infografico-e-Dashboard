from flask import Flask, request, jsonify
import os
os.environ["OPENBLAS_NUM_THREADS"] = "1"
import subprocess
import gspread
import pandas as pd
from flask_cors import CORS  

app = Flask(__name__)
CORS(app, resources={r"/executar": {"origins": "*"}})


client = gspread.service_account(filename='credentials.json')


@app.route('/executar', methods=['GET', 'POST'])
def executar_codigo():
    try:
        selected_value = request.args.get('selectedValue')
        print(selected_value)
        if selected_value == 'Produto01':
            resultado = subprocess.check_output(['python', '-c', 'from modules.extrator import opcao1; print(opcao1())'])
            return resultado
        elif selected_value == 'Produto02':
            resultado = subprocess.check_output(['python', '-c', 'from modules.extrator import opcao2; print(opcao2())'])
            return resultado
        elif selected_value == 'Produto03':
            resultado = subprocess.check_output(['python', '-c', 'from modules.extrator import opcao3; print(opcao3())'])
            return resultado
        else:
            return jsonify({"error": "Opcao invalida"}), 400  
            
    except Exception as e:
        app.logger.error(f"Erro ao executar o código: {str(e)}")
        return jsonify({"error": str(e)}), 500  

if __name__ == '__main__':
   app.run(debug=True, port=5002)
