function adicionarCarrinho(id, nome, preco){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push({
        id: id,
        nome: nome,
        preco: preco
    });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert("Produto adicionado!");
}


function mostrarCarrinho(){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let lista = document.getElementById("listaCarrinho");

    let total = 0;

    lista.innerHTML = "";

    carrinho.forEach((produto, indice)=>{

        total += produto.preco;

        lista.innerHTML += `
            <div class="item">
                <h3>${produto.nome}</h3>
                <p>R$ ${produto.preco.toFixed(2)}</p>

                <button onclick="removerItem(${indice})">
                    Remover
                </button>

                <hr>
            </div>
        `;
    });

    document.getElementById("total").innerHTML =
        "Total: R$ " + total.toFixed(2);
}

function removerItem(indice){

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.splice(indice,1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    mostrarCarrinho();
}