let frete = 0;

function adicionarCarrinho(botao, id, nome, preco) {

    // Pega a imagem do card
    let card = botao.closest(".card");
    let imagem = card.querySelector("img").getAttribute("src");

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let produto = carrinho.find(p => p.id == id);

    if (produto) {
        produto.quantidade++;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

}

function mostrarCarrinho() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let lista = document.getElementById("listaCarrinho");

    if (!lista) return;

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, indice) => {

        let subtotal = produto.preco * produto.quantidade;
        total += subtotal;
        let caminhoImagem = produto.imagem;
        if (!caminhoImagem.startsWith("../")) {
            caminhoImagem = "../" + caminhoImagem;
        }

        lista.innerHTML += `
            <div class="item">

                <img src="${caminhoImagem}"
                     alt="${produto.nome}"
                     width="120"
                     onerror="this.src='../image/sem-imagem.png'">

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

    let valorProdutos = document.getElementById("valorProdutos");
    let valorFrete = document.getElementById("valorFrete");
    let valorFinal = document.getElementById("valorFinal");

    if (valorProdutos)
        valorProdutos.innerHTML = "R$ " + total.toFixed(2);

    if (valorFrete)
        valorFrete.innerHTML = "R$ " + frete.toFixed(2);

    if (valorFinal)
        valorFinal.innerHTML = "R$ " + (total + frete).toFixed(2);
}

function alterarQuantidade(indice, quantidade) {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    quantidade = parseInt(quantidade);

    if (isNaN(quantidade) || quantidade < 1) {
        quantidade = 1;
    }

    carrinho[indice].quantidade = quantidade;

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    mostrarCarrinho();
}

function removerItem(indice) {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.splice(indice, 1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    mostrarCarrinho();
}

function calcularFrete() {

    let cep = document.getElementById("cep").value;

    if (cep.trim() === "") {
        return;
    }

    frete = 20;

    mostrarCarrinho();
}

function finalizarCompra() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    alert("Compra realizada com sucesso!");

    localStorage.removeItem("carrinho");

    frete = 0;

    mostrarCarrinho();
}

// Carrega automaticamente o carrinho quando abrir a página
window.onload = function () {
    mostrarCarrinho();
};