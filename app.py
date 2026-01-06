from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

high_score = 0

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/score", methods=["POST"])
def score():
    global high_score
    data = request.json
    score = data.get("score", 0)

    if score > high_score:
        high_score = score

    return jsonify({
        "your_score": score,
        "high_score": high_score
    })

if __name__ == "__main__":
    app.run(debug=True)
