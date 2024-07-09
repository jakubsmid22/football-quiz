/*<div class="card" style="width: 21rem;">
                    <img src="..." class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title text-center">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <div class="row">
                        <div class="col-6 mb-3">
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        <div class="col-6  mb-3">
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        <div class="col-6">
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                        <div class="col-6">
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                      </div>
                    </div>
                  </div>*/

const questionContainer = document.getElementById("question");
const scoreE = document.getElementById("score");
let score = JSON.parse(localStorage.getItem("score")) || 0;
scoreE.textContent = score;

const updateScore = () => {
    localStorage.setItem("score", JSON.stringify(score));
    scoreE.textContent = score;
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
    alertPlaceholder.innerHTML = "";
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const loadQuestion = async () => {
    questionContainer.innerHTML = "";
    const response = await fetch("data.json");
    const data = await response.json();
    const dataArray = Object.values(data)
    const randomIndex = Math.floor(Math.random() * dataArray[0].length);
    const question = dataArray[0][randomIndex];

    console.log(question.text);

    const img = document.createElement("img");
    img.src = question.img;
    img.classList.add("card-img-top");
    img.alt = "Promiňte obrázek nelze načíst";
    questionContainer.append(img);

    const cardBody = document.createElement("div");
    cardBody.classList = ("card-body d-flex flex-column justify-content-between mt-3");

    const cardTitle = document.createElement("h5");
    cardTitle.classList = "card-title text-center";
    cardTitle.textContent = question.text;
    cardBody.append(cardTitle);

    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.textContent = question.text;

    const answers = document.createElement("div");
    answers.classList.add("row");
    
    question.answers.forEach((answer, i) => {
        const answerContainer = document.createElement("div");
        i <= 1 ? answerContainer.classList.add("col-6", "mb-3") : answerContainer.classList.add("col-6");

        const answerE = document.createElement("button");
        answerE.classList = "btn btn-primary w-100";
        answerE.textContent = answer.text;

        answerE.addEventListener("click", () => {
            if (answer.isCorrect) {
                score++;
                appendAlert('Správně!', 'success')
            }
            else {
                score--;
                appendAlert("Špatně!", "danger");
            }

            updateScore();
            loadQuestion();
        })

        answerContainer.append(answerE);

        answers.append(answerContainer);
    })

    cardBody.append(answers);
    questionContainer.append(cardBody);
}

loadQuestion(); 