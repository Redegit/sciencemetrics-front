from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="dist")

# Отдача статических файлов (JS, CSS, изображения)
@app.route("/assets/<path:path>")
def serve_static(path):
    return send_from_directory("dist/assets", path)

# Главная страница и все остальные пути → index.html
@app.route("/")
def serve():
    return send_from_directory("dist", "index.html")

@app.route("/<path:path>")
def serve_all(path):
    return send_from_directory("dist", "index.html")

if __name__ == "__main__":
    app.run(debug=True)