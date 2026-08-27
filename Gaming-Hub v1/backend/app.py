from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = Flask(__name__)
CORS(app)

RAWG_API_KEY = os.getenv("RAWG_API_KEY")


@app.route("/api/games")
def get_games():

    search = request.args.get("search", "")
    ordering = request.args.get("ordering", "")
    page_size = request.args.get("page_size", "")

    url = "https://api.rawg.io/api/games"

    params = {
        "key": RAWG_API_KEY
    }

    if search:
        params["search"] = search

    if ordering:
        params["ordering"] = ordering

    if page_size:
        params["page_size"] = page_size

    response = requests.get(url, params=params)

    return jsonify(response.json())


@app.route("/api/games/<int:game_id>")
def get_game_details(game_id):

    url = f"https://api.rawg.io/api/games/{game_id}"

    params = {
        "key": RAWG_API_KEY
    }

    response = requests.get(url, params=params)

    return jsonify(response.json())


@app.route("/api/games/<int:game_id>/screenshots")
def get_screenshots(game_id):

    url = f"https://api.rawg.io/api/games/{game_id}/screenshots"

    params = {
        "key": RAWG_API_KEY
    }

    response = requests.get(url, params=params)

    return jsonify(response.json())


if __name__ == "__main__":
    app.run(debug=True)