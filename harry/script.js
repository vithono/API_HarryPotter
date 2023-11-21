const content = document.getElementById('content');
const cardContainer = document.querySelector('.card-container');

const fetchAPICompleta = async () => {
    try {
        const response = await fetch(`https://hp-api.onrender.com/api/characters`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
};

const updateContent = async () => {
    const result = await fetchAPICompleta();
    result.forEach((character) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        if (character.image !== "") {
            const newImage = document.createElement('img');
            newImage.src = character.image;
            newImage.alt = character.name;
            cardFront.appendChild(newImage);
        } else {
            const noImageText = document.createElement('p');
            noImageText.textContent = "No image available";
            cardFront.appendChild(noImageText);
        }

        const characterInfo = document.createElement('div');
        characterInfo.innerHTML = `
            <h1>${character.name}</h1>
            <h3>Casa: ${character.house}</h3>
            <h3>Espécie: ${character.species}</h3>
            <h3>Data de nascimento:<br> ${character.dateOfBirth}</h3>
            <!-- Aqui eu selecione as informações que eu quero -->
        `;
        cardBack.appendChild(characterInfo);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        newDiv.appendChild(cardInner);
        cardContainer.appendChild(newDiv); // Adiciona o card no contêiner
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    await updateContent();
});
