import os
import json
from supabase import create_client
from datetime import datetime

# Conexión segura usando las claves que guardaste
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

def fetch_portfolio():
    # Descarga tu cartera de Supabase
    response = supabase.table('portfolio_assets').select("*").execute()
    return response.data

def run_simulation(assets):
    print("🤖 Buscando noticias para:", [a['ticker'] for a in assets])
    
    # AQUÍ SIMULAMOS LA IA (Para probar que funciona la conexión)
    # Mañana conectaremos Perplexity/GPT real aquí.
    return [
        {
            "ticker": "NVDA",
            "headline": "NVIDIA sube por demanda de chips H100",
            "summary": "Analistas prevén un Q1 fuerte.",
            "sentiment": "Positive",
            "category": "Market"
        },
        {
            "ticker": "SPY",
            "headline": "El S&P 500 espera datos de inflación",
            "summary": "Mercado cauto ante anuncio de la FED.",
            "sentiment": "Neutral",
            "category": "Macro"
        }
    ]

def save_news(news_list):
    for n in news_list:
        data = {
            "ticker": n['ticker'],
            "headline": n['headline'],
            "summary": n['summary'],
            "sentiment_score": n['sentiment'],
            "category": n['category'],
            "created_at": datetime.now().isoformat()
        }
        supabase.table('daily_intelligence').insert(data).execute()
    print(f"✅ Guardadas {len(news_list)} noticias en Supabase.")

if __name__ == "__main__":
    try:
        my_assets = fetch_portfolio()
        news = run_simulation(my_assets)
        save_news(news)
    except Exception as e:
        print(f"❌ Error: {e}")