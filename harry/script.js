
const btnGo = document.getElementById('btn-go');
const content = document.getElementById('content');

const fetchAPICompleta = () =>{
    
    //requisitando api com fetch
    const result = fetch(`https://hp-api.onrender.com/api/characters`)
    //quando a api responde, converte pra json
    .then((res) => res.json())
    //retorna os dados do objeto de fato
    .then((data) => {
        console.log(data)
        return data;
    });

    return result;
}

//btnGo.addEventListener('click', async (event) => {

const updateContent = async () => {

    const result = await fetchAPICompleta();
    for(i = 0; i < result.length; i++){

        const newDiv = document.createElement('div');
        newDiv.classList.add('card');

        const newParagraph = document.createElement('p');
        newParagraph.innerHTML = `${JSON.stringify(result[i], undefined, 2)}`;
        
        if(result[i].image !== ""){
            const newImage = document.createElement('img');
            newImage.src = `${result[i].image}`;
            newImage.alt = `${result[i].name}`;

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

/*const characterId = document.getElementById('characterId');
const content = document.getElementById('content');
const image = document.getElementById('img');


const btnGo = document.getElementById('btn-go');


const fetchAPI = (value) =>{
    
    //requisitando api com fetch
    const result = fetch(`https://hp-api.onrender.com/api/character/${value}`)
    //quando a api responde, converte pra json
    .then((res) => res.json())
    //retorna os dados do objeto de fato
    .then((data) => {
        //console.log(data)
        return data[0];
    });

    return result;
}

/*const keys = ['name', 'species', 'gender', 'house', 'dateOfBirth', 'wand', 'alternate_names'];

const buildResult = (result) => {
    const newObject = {};
    keys.map((key) => document.getElementById)
}

btnGo.addEventListener('click', async (event) => {

    //Impede que a página atualize automaticamente
    event.preventDefault();

    const result = await fetchAPI(characterId.value);
    content.textContent = `${JSON.stringify(result, undefined, 2)}`;
    image.src = `${result.image}`

})*/