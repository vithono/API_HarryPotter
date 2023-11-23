const characterName = document.getElementById('characterName');
const btnGo = document.getElementById('btn-go');
const content = document.getElementById('content');


const fetchAPICompleta = async () =>{
    
    try {
        //requisitando api com fetch
        const result = await fetch(`https://hp-api.onrender.com/api/characters`)//quando a api responde, converte pra json
        .then((res) => res.json())
        //retorna os dados do objeto de fato
        .then((data) => {
            return data;
        });

        return result;
    } catch (error) {
        console.error('Erro ao obter dados da API:', error);
        throw error;
    }
}

//btnGo.addEventListener('click', async (event) => {

const keys = ['name', 'alternate_names', 'species', 'gender', 'house', 'dateOfBirth',
'wizard', 'ancestry', 'eyeColour', 'hairColour', 'wand', 'patronus', 
'hogwartsStudent',  'hogwartsStaff', 'actor', 'alive'];

const newKeys = {
    name: 'Nome',
    alternate_names: 'Nomes Alternativos',
    species: 'Espécie',
    gender: 'Gênero',
    house: 'Casa de Hogwarts',
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

const updateContent = async () => {

    const result = await fetchAPICompleta();

    
    for(const character of result){

        const newDiv = document.createElement('div');
        newDiv.classList.add('card');

        const newParagraph = document.createElement('p');
        newParagraph.innerHTML = `${character.name}`;
        
        if(character.image !== ""){
            const newImage = document.createElement('img');
            newImage.src = `${character.image}`;
            newImage.alt = `${character.name}`;

            newDiv.appendChild(newImage);
        }

        newDiv.appendChild(newParagraph);
        content.appendChild(newDiv);
    }
}



// Chama a função automaticamente quando a página é carregada
document.addEventListener('DOMContentLoaded', async () => {
    await updateContent();
});