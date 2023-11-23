const content = document.getElementById('content');
const cardContainer = document.querySelector('.card-container');
const wizardCheckbox = document.getElementById('wizard');

const fetchAPICompleta = async () =>{
    
    try {
        //requisitando api com fetch
        const result = await fetch(`https://hp-api.onrender.com/api/characters`)//quando a api responde, converte pra json
        .then((res) => res.json())
        //retorna os dados do objeto de fato
        .then((data) => {
            console.log(data)
            return data;
        });
        return result;
    } catch (error) {
        throw error;
    }
}

const keys = ['name', 'alternate_names', 'species', 'gender', 'house', 'dateOfBirth',
'wizard', 'ancestry', 'eyeColour', 'hairColour', 'wand', 'patronus', 
'hogwartsStudent',  'hogwartsStaff', 'actor', 'alive'];

const newKeys = {
    name: 'Nome',
    alternate_names: 'Nomes Alternativos',
    species: 'Espécie',
    gender: 'Gênero',
    house: 'Casa ed Hogwarts',
    episode: 'Episódios',
    dateOfBirth: 'Data de Nascimento',
    wizard: 'É bruxo?',
    ancestry: 'Ancestralidade', 
    eyeColour: 'Cor dos olhos',
    hairColour: 'Cor do cabelo',
    wand: 'Varinha', 
    patronus: 'Patronous', 
    hogwartsStudent: 'Estudante de Hogwarts?',
    hogwartsStaff: 'Funcionário de Hogwarts?',
    actor: 'Ator',
    alive: 'Atualmente vivo?'
};

const buildResult = (result) => {
    
    return keys.map((key) => document.getElementById(key))
    .map((elem) => {

        if(wizardCheckbox === true){

            if((Array.isArray(result[elem.name])) === true){
                
                const numerosDaUrl = result[elem.name].map(url => {
                    const partesDaUrl = url.split('/');
                    return partesDaUrl[partesDaUrl.length - 1];
                });

                passa = numerosDaUrl.join(', ');

            }else if(elem.name === 'origin'){
                passa = result[elem.name].name;
            }else{
                passa = result[elem.name];
            }

            //cria um elemento parágrafo
            const newElem = document.createElement('p');
            //elem.name recebe(:) valor
            newElem.innerHTML = `${newKeys[elem.name]}: ${passa}`;
            //coloca o parágrafo como filho de content
            content.appendChild(newElem);
        }
    });

}

const updateContent = async () =>{

    const result = await fetchAPICompleta();

   buildResult(result);
}

/*
const updateContent = async () => {

    const result = await fetchAPICompleta();

    for(const character of result){
        
        const newDiv = document.createElement('div');
        newDiv.classList.add('card');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        const newImage = document.createElement('img');
        if (character.image !== "") {
            newImage.src = character.image;
        }else{
            newImage.src = 'harry.png';
        }

        newImage.alt = character.name;
        cardFront.appendChild(newImage);

        const characterInfo = document.createElement('div');
        characterInfo.innerHTML = `
            <h1>${character.name}</h1>
            <h3>Casa: ${character.house}</h3>
            <h3>Espécie: ${character.species}</h3>
            <h3>Data de nascimento:<br> ${character.dateOfBirth}</h3>
            `;

        cardBack.appendChild(characterInfo);
    
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        newDiv.appendChild(cardInner);
        cardContainer.appendChild(newDiv); // Adiciona o card no contêiner
    }
};*/

document.addEventListener('DOMContentLoaded', async () => {
    await updateContent();
});
