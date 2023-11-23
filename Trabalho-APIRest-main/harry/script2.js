const characterName = document.getElementById('characterName');
const content = document.getElementById('content');
const image = document.getElementById('img');
const conteinerResult = document.getElementById('result-style');

//Captura os botões
const btnGo = document.getElementById('btn-go');
const btnReset = document.getElementById('btn-reset');

const fetchAPICompleta = async () => {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        throw error;
    }
};

const fetchAPI = async (value) => {
    try {
        const response = await fetch(`https://hp-api.onrender.com/api/character/${value}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        throw error;
    }
};

const keys = ['name', 'alternate_names', 'species', 'gender', 'house', 'dateOfBirth',
'wizard', 'ancestry', 'wand', 'patronus'];

const newKeys = {
    name: 'Nome',
    alternate_names: 'Nomes Alternativos',
    species: 'Espécie',
    gender: 'Gênero',
    house: 'Casa de Hogwarts',
    dateOfBirth: 'Data de Nascimento',
    wizard: 'É bruxo?',
    ancestry: 'Ancestralidade', 
    wand: 'Varinha', 
    patronus: 'Patronous', 
};


const buildResult = (pessoa) => {

    return keys.map((key) => document.getElementById(key))
    .map((elem) => {

        if(elem.checked === true){
            //cria um elemento parágrafo
            const newElem = document.createElement('p');
            //elem.name recebe(:) valor
            newElem.innerHTML = `${newKeys[elem.name]}: ${pessoa[elem.name]}`;
            //coloca o parágrafo como filho de content
            content.appendChild(newElem);
        }
    });
}
btnGo.addEventListener('click', async (event) => {
    event.preventDefault();

    if (characterName.value === '') {
        return content.innerHTML = 'Faça um filtro, por favor';
    }

    const resultCompleto = await fetchAPICompleta();

    const simplifiedData = resultCompleto.map(character => {
        return {
            nome: character.name,
            id: character.id
        };
    });

    let pessoaID;

    for (const character of simplifiedData) {
        if (character.nome === characterName.value) {
            pessoaID = character.id;
            break;
        }
    }

    const result = await fetchAPI(pessoaID);

    if (content.firstChild !== null) {
        content.innerHTML = '';
    }

    conteinerResult.className = 'result-style';
    image.src = `${result.image}`;
    buildResult(result);
});

btnReset.addEventListener('click', () => location.reload());