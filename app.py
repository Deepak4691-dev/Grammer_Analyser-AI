from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/enhance", methods=["POST"])
def enhance():

    data = request.get_json()

    text = data.get("text", "")

    if not text.strip():
        return jsonify({
            "success": False,
            "message": "Please enter some text."
        })

    # Temporary response
    enhanced_text = (
        "Your text has been successfully received by the Flask backend.\n\n"
        "AI enhancement will be connected in the next step."
    )

    return jsonify({
        "success": True,
        "original": text,
        "enhanced": enhanced_text
    })


if __name__ == "__main__":
    app.run(debug=True)