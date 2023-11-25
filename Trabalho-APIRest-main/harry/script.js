const content = document.getElementById('content');
const cardContainer = document.querySelector('.card-container');
const perfilContainer = document.querySelector('.perfil-container');


const fetchAPICompletaSeleciona = (value) =>{
    
    const result = fetch(value)
    .then((res) => res.json())
    .then((data) => {
        return data;
    });

    return result;
}

const updateContent = async () => {
    
    const result = await fetchAPICompletaSeleciona(`https://hp-api.onrender.com/api/characters`);
    
    result.forEach((character) => {
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
            <h3>Casa: ${character.house}</p>
            <h3>Espécie: ${character.species}</p>
            <h3>Data de nascimento:<br> ${character.dateOfBirth}</h3>
            <button id="abrir">Perfil</button>
        `;
        cardBack.appendChild(characterInfo);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        newDiv.appendChild(cardInner);
        cardContainer.appendChild(newDiv);

        const fechar = document.createElement('button');
        fechar.id = "fechar";
        fechar.innerText = 'Fechar';
        fechar.style.display = 'none';

        function houseHogwarts(house){
            if(house.toLowerCase() == "hufflepuff"){
                document.getElementById('house').src = "Hufflepuff.png"

            }else if(house.toLowerCase() == "gryffindor"){
                document.getElementById('house').src = "Gryffindor.png"

            }else if(house.toLowerCase() == "ravenclaw"){
                document.getElementById('house').src =  "Ravenclaw.png"

            }else if(house.toLowerCase() == "slytherin"){
                document.getElementById('house').src = "Slytherin.png"

            }else{
                document.getElementById('house').src = ""
            }
        }


        characterInfo.querySelector('#abrir').addEventListener('click', function() {

            var perfilAberto = document.querySelector('.perfil');
            if (perfilAberto) {
                perfilContainer.removeChild(perfilAberto);
            }

                // Crie o perfil e o botão de fechar dentro do ouvinte de eventos do botão 'abrir'
                if(document.querySelectorAll("#perfil" + character.id).length < 1){
                    const perfil = document.createElement('section');
                    perfil.id = "perfil" + character.id;
                    perfil.classList.add('perfil');

                    perfil.innerHTML = `
                        <div class="dados">           
                        <h1>${character.name}</h1> 
                        <p>${character.wizard ? "Wizard" : "Muggle"}</p>      
                        <div class="casa"><img id="house" src=""></img><p>${character.house}</p></div>
                        </div>
                        ${character.alternate_names ? `<p><span>Nomes Alternativos:</span>${character.alternate_names}</p>` : ""}
                        ${character.species ? `<p><span>Espécie:</span> ${character.species}</p>` : ""}
                        ${character.gender ? `<p><span>Gênero:</span> ${character.gender}</p>` : ""}
                        ${character.dateOfBirth ? `<p><span>Data de nascimento:</span> ${character.dateOfBirth}</p>` : ""}
                        ${character.ancestry ? `<p><span>Ancestralidade:</span> ${character.ancestry}</p>` : ""}
                        ${character.wand.wood ? `<p><span>Varinha:</span> ${character.wand.wood + "|" + character.wand.core}</p>` : ""}
                        ${character.patronus ? `<p><span>Patronous:</span> ${character.patronus}</p>` : ""}
                    `;
                    
                    perfilContainer.appendChild(perfil);
                    perfil.appendChild(fechar);
                    fechar.style.display = 'block';
                    perfil.style.display = 'block';
                    houseHogwarts(character.house);


            // Adicione o ouvinte de eventos ao botão 'fechar'
            perfil.querySelector('#fechar').addEventListener('click', function() {
                // Remova o perfil quando o botão 'fechar' é clicado
                perfilContainer.removeChild(perfil);

            });
        }
        });
        
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    await updateContent();
});
