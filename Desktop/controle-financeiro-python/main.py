import json
import csv
from datetime import datetime

ARQUIVO = "financeiro.json"

# =========================
# PERSISTÊNCIA
# =========================
def carregar_dados():
    try:
        with open(ARQUIVO, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def salvar_dados(dados):
    with open(ARQUIVO, "w", encoding="utf-8") as f:
        json.dump(dados, f, indent=4, ensure_ascii=False)

# =========================
# REGISTROS
# =========================
def registrar_entrada(dados):
    descricao = input("Descrição da entrada: ")
    categoria = input("Categoria: ")
    valor = float(input("Valor da entrada (R$): "))
    data = datetime.now().strftime("%d/%m/%Y")

    dados.append({
        "tipo": "entrada",
        "descricao": descricao,
        "categoria": categoria,
        "valor": valor,
        "data": data
    })

    salvar_dados(dados)
    print("✅ Entrada registrada com sucesso!")

def registrar_saida(dados):
    descricao = input("Descrição da saída: ")
    categoria = input("Categoria: ")
    valor = float(input("Valor da saída (R$): "))
    data = datetime.now().strftime("%d/%m/%Y")

    dados.append({
        "tipo": "saida",
        "descricao": descricao,
        "categoria": categoria,
        "valor": valor,
        "data": data
    })

    salvar_dados(dados)
    print("✅ Saída registrada com sucesso!")

# =========================
# CONSULTAS
# =========================
def mostrar_saldo(dados):
    saldo = 0

    for item in dados:
        if item["tipo"] == "entrada":
            saldo += item["valor"]
        else:
            saldo -= item["valor"]

    print(f"💰 Saldo atual: R$ {saldo:.2f}")

def mostrar_historico(dados):
    if not dados:
        print("Nenhum registro encontrado.")
        return

    print("\n--- HISTÓRICO FINANCEIRO ---")
    for i, item in enumerate(dados):
        sinal = "+" if item["tipo"] == "entrada" else "-"
        print(
            f"{i} | {item['data']} | {item['categoria']} | "
            f"{item['descricao']} | {sinal} R$ {item['valor']:.2f}"
        )

def filtrar_por_categoria(dados):
    categoria = input("Digite a categoria: ")

    encontrados = [
        item for item in dados
        if item["categoria"].lower() == categoria.lower()
    ]

    if not encontrados:
        print("Nenhum registro nessa categoria.")
        return

    print(f"\n--- REGISTROS DA CATEGORIA: {categoria} ---")
    for item in encontrados:
        sinal = "+" if item["tipo"] == "entrada" else "-"
        print(
            f"{item['data']} | {item['descricao']} | "
            f"{sinal} R$ {item['valor']:.2f}"
        )

def filtrar_por_mes(dados):
    mes = input("Digite o mês (MM): ")
    ano = input("Digite o ano (AAAA): ")

    encontrados = [
        item for item in dados
        if item["data"].endswith(f"{mes}/{ano}")
    ]

    if not encontrados:
        print("Nenhum registro nesse período.")
        return

    print(f"\n--- REGISTROS DE {mes}/{ano} ---")
    for item in encontrados:
        sinal = "+" if item["tipo"] == "entrada" else "-"
        print(
            f"{item['data']} | {item['categoria']} | "
            f"{item['descricao']} | {sinal} R$ {item['valor']:.2f}"
        )

# =========================
# RELATÓRIO
# =========================
def relatorio_gastos(dados):
    gastos = {}

    for item in dados:
        if item["tipo"] == "saida":
            categoria = item["categoria"]
            gastos[categoria] = gastos.get(categoria, 0) + item["valor"]

    if not gastos:
        print("Nenhum gasto registrado.")
        return

    print("\n--- RELATÓRIO DE GASTOS POR CATEGORIA ---")
    for categoria, total in gastos.items():
        print(f"{categoria}: R$ {total:.2f}")

# =========================
# EXPORTAÇÃO
# =========================
def exportar_csv(dados):
    if not dados:
        print("Nenhum dado para exportar.")
        return

    with open("financeiro.csv", "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Data", "Tipo", "Categoria", "Descrição", "Valor"])

        for item in dados:
            writer.writerow([
                item["data"],
                item["tipo"],
                item["categoria"],
                item["descricao"],
                item["valor"]
            ])

    print("📁 Arquivo financeiro.csv exportado com sucesso!")

# =========================
# MENU
# =========================
def menu():
    dados = carregar_dados()

    while True:
        print("\n--- CONTROLE FINANCEIRO ---")
        print("1 - Registrar entrada")
        print("2 - Registrar saída")
        print("3 - Ver saldo")
        print("4 - Ver histórico")
        print("5 - Filtrar por categoria")
        print("6 - Filtrar por mês")
        print("7 - Relatório de gastos")
        print("8 - Exportar para CSV")
        print("0 - Sair")

        opcao = input("Escolha: ")

        if opcao == "1":
            registrar_entrada(dados)
        elif opcao == "2":
            registrar_saida(dados)
        elif opcao == "3":
            mostrar_saldo(dados)
        elif opcao == "4":
            mostrar_historico(dados)
        elif opcao == "5":
            filtrar_por_categoria(dados)
        elif opcao == "6":
            filtrar_por_mes(dados)
        elif opcao == "7":
            relatorio_gastos(dados)
        elif opcao == "8":
            exportar_csv(dados)
        elif opcao == "0":
            break
        else:
            print("❌ Opção inválida")

menu()
