(function () {
    const $ = q => document.querySelector(q);//se eu quiser posso usar o $ para nao ter que escrever o document.queryselector//

    function convertPeriod(mil){         //Converte de milisegundos o tempo de periodo para segundos//
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000)/1000);

        return `${min}m e ${sec}s`;
    };
function renderGarage () {           // vai renderizar os carros//
    const garage = getGarage();
    $("#garage").innerHTML = "";
    garage.forEach(c => addCarToGarage(c)) //A cada carro na garagem ele vai chamar esta função e vai enviar o carro que chegou aqui para ele, enviar cada carro para o row//
};



function addCarToGarage(car) {
    const row = document.createElement("tr");// este tr é o mesmo que isso <tr></tr> no html

    //abaixo vamos por os objetos para aparecer no leyauto conforme forem sendo cadastrados o ` á para concatenar as variaveis//
    row.innerHTML = ` 
        <td>${car.name}</td> 
        <td>${car.licence}</td>
        <td data-time="${car.time}">${new Date(car.time)
                    .toLocaleString("pt-BR", {
                        hour: "numeric", minute: "numeric" // Deixa horario no modo brasil e customizado//
                     })}</td>
        
        <td>
            <button class="delete">x</button>
        </td>

        `;

    document.querySelector("#garage").appendChild(row);// Aqui é como se fosse um push do elemento filho criado acima da linha 18 a 31 para dentro da tag body
    };

    function checkOut(info){ // as informações do veiculo são array em que o 0 veiculo 1 placa 2 horario 3 ação //
        let period = new Date()- new Date(info[2].dataset.time);   //O new date ja vai converter a data //vai pegar o periodo em que o veiculo ficou// O new date vai deixar no padrão de hroas que precisa//
        period = convertPeriod(period); // COnverte o perido de milisegundos para segundos//

        const licence = info[1].textContent;
        const msg = `O veículo ${info[0].textContent} de placa ${licence} permanceu estacionado por ${period}           
        Deseja encerrar ?`; // Vai dizer o tempo em que o veiculo permaneceu estacionado//
        
        if(!confirm(msg)) return; // retorna a menssagem se realmente vai querer excluir o veiculo do patio //
        
        const garage = getGarage().filter(c => c.licence !== licence); //ele filtra todos os carros do patio e retorna todos com exeção dos que tem a placa license igual a do carro excluido //
        localStorage.garage = JSON.stringify(garage); //vai retornar os carros retronados do filtro que não foram excluidos para o storage e vai converter de JSOn para string //
        
        console.log(licence, garage);

        renderGarage();
    }


    const getGarage =() =>localStorage.garage ? JSON.parse(localStorage.garage) : [];   //uma função com arow function para não ter qur ficar escrevendo o mesmo codigo toda hora//// se não existir ele vai trazer um array vazio siginifica que não há nenhum carro no patio // aqui é um ternario ele vai procurar garage se não existir ele vai criar um novo e vai retornalo com um json vai transformar um objeto em uma string um texto. no local storage ele le texto o parse e para depois usar no java script ele precisa voltar a ser um objeto//ele é um return implicito//
        
    renderGarage();   //deixalo proximo ao clique para ficar mais facil a leitura//  vai chamaar os carros apos o reflesh todos aparecerão na tela //   
    document.querySelector("#send").addEventListener("click", e => {
        const name = document.querySelector("#name").value
        const licence = document.querySelector("#licence").value;
        
        if(!name || !licence) { // mostrar que os campos não podem ficar vazios//
            alert("Os campos são obrigatórios!");
            return;
        }

        const card = {name, licence, time: new Date() }// newDatevai trazer a hora real do cadastro//

        const garage = getGarage();// se não existir ele vai trazer um array vazio siginifica que não há nenhum carro no patio // aqui é um ternario ele vai procurar garage se não existir ele vai criar um novo e vai retornalo com um json vai transformar um objeto em uma string um texto. no local storage ele le texto o parse e para depois usar no java script ele precisa voltar a ser um objeto//
        garage.push(card); //pushar o objeto car e por dentro da garagem//
        
        localStorage.garage = JSON.stringify(garage); // vai salvar o objeto como texto jason no storage ou banco de dados.
        //console.log(garage);//

        addCarToGarage(card); // Aqui é chamada a função para aparecer os nomes preenchidos no leyout//

        document.querySelector("#name").value = "";
        document.querySelector("#licence").value = "";  //vai apagar no campo de cadastro apos clicar no registrar////com a vareavel dentro da função ela não fica exposta para o usuario no console do navegador////o usuario só terá acesso pelo html//
    
    
    });  
    
   $("#garage").addEventListener("click", e => {    // vai mapear o item que esta sendo escolhido para deletar e vai deletalo//
     if(e.target.className = "delete")             //O target vai mostrar exatamente o x que esta sendo clicado.
    checkOut(e.target.parentElement.parentElement.cells);        //parente element vai buscar o elemento paarente pai se acresentar maus um ele vai buscar o parente do parente//
    });
})();