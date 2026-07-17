document.addEventListener("DOMContentLoaded", () => {

    const formLogin = document.getElementById("formLogin");

    formLogin.addEventListener("submit", (event) => {

        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const usuarioSalvo = localStorage.getItem("usuarioCadastrado");

        if (!usuarioSalvo) {
            alert("Nenhum usuário cadastrado. Crie uma conta primeiro!");
            window.location.href = "cadastro.html";
            return;
        }

        const usuario = JSON.parse(usuarioSalvo);

        if (email === usuario.email && senha === usuario.senha) {
            alert("Login realizado com sucesso!");
            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            window.location.href = "../index.html";
        } else {
            alert("Email ou senha incorretos!");
        }
    });
});



