let frete = 0;

function adicionarCarrinho(id, nome, preco, imagem){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let produto = carrinho.find(p => p.id == id);
    if(produto){

        produto.quantidade++;

    }else{

        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1

        });

    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");

}

function mostrarCarrinho(){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let lista = document.getElementById("listaCarrinho");
    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach((produto, indice)=>{

        let subtotal = produto.preco * produto.quantidade;
        total += subtotal;
        lista.innerHTML += `

        <div class="item">
            <img src="${produto.imagem}" width="120">
            <div class="dados">
                <h2>${produto.nome}</h2>

                <p><strong>Preço:</strong> R$ ${produto.preco.toFixed(2)}</p>
                <label>Quantidade:</label>
                <input
                    type="number"
                    min="1"
                    value="${produto.quantidade}"
                    onchange="alterarQuantidade(${indice}, this.value)"
                >
                <p><strong>Subtotal:</strong> R$ ${subtotal.toFixed(2)}</p>
                <button onclick="removerItem(${indice})">
                    Remover
                </button>
            </div>
        </div>

        <hr>

        `;

    });
    document.getElementById("valorProdutos").innerHTML =
        "R$ " + total.toFixed(2);
    document.getElementById("valorFrete").innerHTML =
        "R$ " + frete.toFixed(2);
    document.getElementById("valorFinal").innerHTML =
        "R$ " + (total + frete).toFixed(2);

}


function alterarQuantidade(indice, quantidade){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    quantidade = parseInt(quantidade);
    if(quantidade < 1){
        quantidade = 1;
    }

    carrinho[indice].quantidade = quantidade;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarCarrinho();

}

function removerItem(indice){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(indice,1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarCarrinho();

}

function calcularFrete(){

    let cep = document.getElementById("cep").value;
    if(cep.trim() == ""){
        alert("Digite um CEP.");
        return;
    }

    frete = 20;
    mostrarCarrinho();
}


function finalizarCompra(){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    if(carrinho.length == 0){
        alert("Seu carrinho está vazio.");
        return;

    }

    alert("Compra realizada com sucesso!");
    localStorage.removeItem("carrinho");
    mostrarCarrinho();

}