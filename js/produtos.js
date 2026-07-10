// Importando os produtos do arquivo lista_produtos.js
import { produtos } from './lista_produtos.js'

const sectionCards = document.querySelector('#cards')

const ListarProdutos = () => {

    if (!sectionCards) return

    sectionCards.innerHTML = ''

    const produtosExibir = typeof ID_SECAO !== 'undefined'
            ? produtos.filter(produto => produto.id_secao === ID_SECAO)
            : produtos

    produtosExibir.forEach((elem) => {

        const divCard = document.createElement('div')
        divCard.classList.add('card')

        // ajusta o caminho da imagem
        const caminhoImagem = typeof ID_SECAO !== 'undefined'
        ? '../' + elem.caminho_imagem
        : elem.caminho_imagem

        const imgCard = document.createElement('img')
        imgCard.src = caminhoImagem
        imgCard.alt = elem.descricao_produto

        const pCard = document.createElement('p')
        pCard.textContent = elem.descricao_produto

        const h2Card = document.createElement('h2')
        h2Card.textContent =
            `R$ ${parseFloat(elem.valor_unitario)
                .toFixed(2)
                .replace('.', ',')}`

        const btnCard = document.createElement('button')
        btnCard.classList.add('btn-add')
        btnCard.textContent = 'Adicionar'

        btnCard.addEventListener('click', () => {
            adicionarCarrinho(
                btnCard,
                elem.id_produto,
                elem.descricao_produto,
                elem.valor_unitario
            )
        })

        divCard.appendChild(imgCard)
        divCard.appendChild(pCard)
        divCard.appendChild(h2Card)
        divCard.appendChild(btnCard)

        sectionCards.appendChild(divCard)
    })
}

ListarProdutos()