(function () {
    const $ = q => document.querySelector(q);//se eu quiser posso usar o $ para nao ter que escrever o document.queryselector//

function renderGarage () {           // vai renderizar os carros//
    const garage = getGarage();

    garage.forEach(c => addCarToGarage(c)) //A cada carro na garagem ele vai chamar esta função e vai enviar o carro que chegou aqui para ele, enviar cada carro para o row//
}



function addCarToGarage(car) {
    const row = document.createElement("tr");// este tr é o mesmo que isso <tr></tr> no html

    //abaixo vamos por os objetos para aparecer no leyauto conforme forem sendo cadastrados o ` á para concatenar as variaveis//
    row.innerHTML = ` 
        <td>${car.name}</td> 
        <td>${car.licence}</td>
        <td>${new Date(car.time)
                    .toLocaleString("pt-BR", {
                        hour: "numeric", minute: "numeric" // Deixa horario no modo brasil e customizado//
                     })}</td>
        
        <td>
            <button class="delete">X</button>
        </td>

        `;

    document.querySelector("#garage").appendChild(row);
    };


    const getGarage =() =>localStorage.garage ? JSON.parse(localStorage.garage) : [];   //uma função com arow function para não ter qur ficar escrevendo o mesmo codigo toda hora//// se não existir ele vai trazer um array vazio siginifica que não há nenhum carro no patio // aqui é um ternario ele vai procurar garage se não existir ele vai criar um novo e vai retornalo com um json vai transformar um objeto em uma string um texto. no local storage ele le texto o parse e para depois usar no java script ele precisa voltar a ser um objeto//
        
    renderGarage();   //deixalo proximo ao clique para ficar mais facil a leitura//  vai chamaar os carros apos o reflesh todos aparecerão na tela //   
    document.querySelector("#send").addEventListener("click", e => {
        const name = document.querySelector("#name").value
        const licence = document.querySelector("#licence").value;
        
        if(!name || !licence) { // mostrar que os campos não podem ficar vazios//
            alert("Os campos são obrigatórios!");
            return;
        }

        const car = {name, licence, time: new Date() }// newDatevai trazer a hora real do cadastro//

        const garage = getGarage();// se não existir ele vai trazer um array vazio siginifica que não há nenhum carro no patio // aqui é um ternario ele vai procurar garage se não existir ele vai criar um novo e vai retornalo com um json vai transformar um objeto em uma string um texto. no local storage ele le texto o parse e para depois usar no java script ele precisa voltar a ser um objeto//
        garage.push(car); //pushar o objeto car e por dentro da garagem//
        
        localStorage.garage = JSON.stringify(garage); // vai salvar o objeto como texto jason no storage ou banco de dados.
        //console.log(garage);//

        addCarToGarage(car);

        document.querySelector("#name").value = "";
        document.querySelector("#licence").value = "";  //vai apagar no campo de cadastro apos clicar no registrar////com a vareavel dentro da função ela não fica expostao para o usuario no console do navegador////o usuario só terá acesso pelo html//
    
    
    });  
    
   $("#garage").addEventListener("click", e => {    // vai mapear o item que esta sendo escolhido para deletar e vai deletalo//
        console.log(e.target.parentElement.parentElement);        //parente element vai buscar o elemento paarente pai se acresentar maus um ele vai buscar o parente do parente//
    })
                                            
})();