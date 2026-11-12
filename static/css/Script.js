const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const statusMessage = document.getElementById("statusMessage");


// WORD COUNT

textInput.addEventListener("input", function () {

    const text = textInput.value.trim();

    if (text === "") {
        wordCount.textContent = "0 words";
        return;
    }

    const words = text.split(/\s+/);

    wordCount.textContent =
        words.length + " words";
});


// TOOL BUTTONS

const toolButtons =
    document.querySelectorAll(".tool-btn");


toolButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const text = textInput.value.trim();

        if (text === "") {

            alert(
                "Please enter some academic text first."
            );

            return;
        }


        const action =
            button.getAttribute("data-action");


        enhanceText(text, action);

    });

});


// GET SELECTED MODEL

function getSelectedModel() {

    const selected =
        document.querySelector(
            'input[name="model"]:checked'
        );

    return selected.value;
}


// SEND TO FLASK

async function enhanceText(text, action) {

    const model = getSelectedModel();

    statusMessage.textContent =
        "⏳ Processing your text...";


    try {

        const response = await fetch(
            "/enhance",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    text: text,

                    action: action,

                    model: model

                })

            }
        );


        const data =
            await response.json();


        if (!data.success) {

            statusMessage.textContent =
                data.message;

            return;
        }


        // SINGLE RESULT

        if (data.enhanced) {

            document.getElementById(
                "singleResult"
            ).textContent =
                data.enhanced;

        }


        // OPENAI

        if (data.openai) {

            document.getElementById(
                "openaiResult"
            ).textContent =
                data.openai;

        }


        // GEMINI

        if (data.gemini) {

            document.getElementById(
                "geminiResult"
            ).textContent =
                data.gemini;

        }


        // HUGGING FACE

        if (data.huggingface) {

            document.getElementById(
                "huggingfaceResult"
            ).textContent =
                data.huggingface;

        }


        statusMessage.textContent =
            "✓ Enhancement completed";


    } catch (error) {

        console.error(error);

        statusMessage.textContent =
            "❌ Unable to process the request.";

    }

}


// COPY RESULT

document
    .getElementById("copyBtn")
    .addEventListener("click", function () {

        const text =
            document.getElementById(
                "singleResult"
            ).textContent;


        navigator.clipboard.writeText(text);

        this.textContent = "✓ Copied";

        setTimeout(() => {

            this.textContent = "📋 Copy";

        }, 1500);

    });