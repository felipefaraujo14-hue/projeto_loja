document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.querySelectorAll("input")[0].value;
        const email = document.querySelectorAll("input")[1].value;
        const cpf = document.querySelectorAll("input")[2].value;
        const telefone = document.querySelectorAll("input")[3].value;
        const endereco = document.querySelectorAll("input")[4].value;
        const cidade = document.querySelectorAll("input")[5].value;
        const estado = document.querySelector("select").value;
        const senha = document.querySelectorAll("input")[6].value;

        if (
            nome === "" ||
            email === "" ||
            cpf === "" ||
            telefone === "" ||
            endereco === "" ||
            cidade === "" ||
            senha === ""
        ) {
            alert("Preencha todos os campos!");
            return;
        }

        const usuario = {
            nome: nome,
            email: email,
            cpf: cpf,
            telefone: telefone,
            endereco: endereco,
            cidade: cidade,
            estado: estado,
            senha: senha
        };

        localStorage.setItem("usuarioCadastrado", JSON.stringify(usuario));
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    });
});