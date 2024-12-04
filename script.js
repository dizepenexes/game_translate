$(document).ready(function () {
    const words = [
        { word: "Age", translation: "вік" },
        { word: "Brother", translation: "брат" },
        { word: "Friend", translation: "друг" },
        { word: "Water", translation: "вода" },
        { word: "Coffee", translation: "кава" },
        { word: "Tea", translation: "чай" },
        { word: "Milk", translation: "молоко" },
        { word: "Bread", translation: "хліб" },
        { word: "Fish", translation: "риба" },
        { word: "Fruit", translation: "фрукт" },
        { word: "Room", translation: "кімната" },
        { word: "Plane", translation: "літак" },
        { word: "Car", translation: "автомобіль" },
    ];

    let currentStep = 0;
    let correct = 0;
    let incorrect = 0;
    let remainingWords = [...words];

    function updateWord() {
        if (remainingWords.length === 0) {
            showModal();
            return;
        }

        const randomIndex = Math.floor(Math.random() * remainingWords.length);
        const selectedWord = remainingWords.splice(randomIndex, 1)[0];
        $("#word").text(selectedWord.word);
        $("#translation").val("").focus();
    }

    function updateProgress() {
        $("#step").text(currentStep);
        $("#correct").text(correct);
        $("#incorrect").text(incorrect);
    }

    function showModal() {
        $("#result").text(`${correct} правильних перекладів із ${currentStep}`);
        $("#modal").removeClass("hidden");
    }

    function disableCheckButton() {
        $("#check").prop("disabled", true);
        $("#check").text("Гра завершена");
    }

    function resetGame() {
        currentStep = 0;
        correct = 0;
        incorrect = 0;
        remainingWords = [...words];
        updateProgress();
        updateWord();
        $("#check").prop("disabled", false);
        $("#check").text("Перевірити");
        $("#modal").addClass("hidden");
    }

    $("#translation").on("input", function () {
        $(this).val($(this).val().toLowerCase());
    });

    $("#check").click(function () {
        const input = $("#translation").val().trim();
        const currentWord = $("#word").text();
        const expected = words.find(w => w.word === currentWord).translation;

        if (input === expected) {
            correct++;
        } else {
            incorrect++;
        }

        if (currentStep < 10) {
            currentStep++;
            updateProgress();
            updateWord();
        }

        if (currentStep === 10) {
            disableCheckButton();
            showModal();
        }
    });

    $("#statistics").click(showModal);

    $("#close-modal").click(function () {
        $("#modal").addClass("hidden");
    });

    $("#restart").click(function () {
        resetGame();
    });

    updateWord();
    updateProgress();
});
