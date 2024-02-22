import gspread
import pandas as pd

client = gspread.service_account(filename='credentials.json')

def opcao1():
    geraCsv('Produto_1')

def opcao2():
    geraCsv('Produto_2')

def opcao3():
    geraCsv('Produto_3')

def geraCsv(planilha_nome):
    planilha = client.open(planilha_nome)

    paginas = [
        ('tabela 1',1),
        ('tabela 2',2),
        ('tabela 3',3),
        ('tabela 4',4),
        ('tabela 5',5)
    ]

    for (nome_pagina, tabela) in paginas:
        planilha_selecionada = planilha.worksheet(nome_pagina)
        dados_completos = planilha_selecionada.get_all_values()
        df = pd.DataFrame(dados_completos)
        df.to_csv(f'./data/dados_csv/tabela{tabela}.csv', index=False)
        with open(f'./data/dados_csv/tabela{tabela}.csv', 'r') as arquivo:
            linhas = arquivo.readlines()[1:]
        with open(f'./data/dados_csv/tabela{tabela}.csv', 'w') as arquivo:
            arquivo.writelines(linhas)

    print(f"Dados da {planilha_nome} exportados para o arquivo CSV com sucesso.")
