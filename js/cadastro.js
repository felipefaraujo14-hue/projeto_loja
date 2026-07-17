document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const cpf = document.getElementById("cpf");
    const telefone = document.getElementById("telefone");
    const cep = document.getElementById("cep");
    const logradouro = document.getElementById("logradouro");
    const bairro = document.getElementById("bairro");
    const cidade = document.getElementById("cidade");
    const estado = document.getElementById("estado");
    const senha = document.getElementById("senha");

    // busca cep pela api
    cep.addEventListener("blur", async () => {
        let cepLimpo = cep.value.replace(/\D/g, "");

        if (cepLimpo.length !== 8) {
            alert("Digite um CEP válido com 8 números.");
            return;
        }

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const dados = await resposta.json();

            if (dados.erro) {
                alert("CEP não encontrado!");
                return;
            }

            logradouro.value = dados.logradouro || "";
            bairro.value = dados.bairro || "";
            cidade.value = dados.localidade || "";
            estado.value = dados.uf || "";
        } catch (erro) {
            console.error("Erro ao consultar CEP:", erro);
            alert("Erro ao buscar CEP.");
        }
    });

    // CADASTRO
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        if (
            nome.value.trim() === "" ||
            email.value.trim() === "" ||
            cpf.value.trim() === "" ||
            telefone.value.trim() === "" ||
            cep.value.trim() === "" ||
            logradouro.value.trim() === "" ||
            bairro.value.trim() === "" ||
            cidade.value.trim() === "" ||
            estado.value.trim() === "" ||
            senha.value.trim() === ""
        ) {
            alert("Preencha todos os campos!");
            return;
        }

        const usuario = {
            nome: nome.value,
            email: email.value,
            cpf: cpf.value,
            telefone: telefone.value,
            endereco: {
                cep: cep.value,
                logradouro: logradouro.value,
                bairro: bairro.value,
                cidade: cidade.value,
                estado: estado.value
            },
            senha: senha.value
        };

        localStorage.setItem("usuarioCadastrado", JSON.stringify(usuario));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    });
});