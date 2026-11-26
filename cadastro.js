
const SUPABASE_URL = "https://jehvctivofxtcwsypjgh.supabase.co";

const SUPABASE_KEY = "SUA_CHAVE_PUBLICAVEL";

const banco = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const formulario = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    if (!email || !senha) {
        mensagem.innerText = "Preencha todos os campos!";
        return;
    }

    mensagem.innerText = "Criando sua conta...";

    try {

        const { data, error } = await banco.auth.signUp({
            email: email,
            password: senha
        });

        console.log("RESPOSTA COMPLETA:", data);
        console.log("ERRO:", error);

        if (error) {
            mensagem.innerText = "Erro: " + error.message;
            return;
        }

        if (!data.user) {
            mensagem.innerText = "O Supabase não retornou um usuário.";
            return;
        }

        console.log("ID DO USUÁRIO:", data.user.id);
        console.log("EMAIL:", data.user.email);
        console.log("SESSÃO:", data.session);

        mensagem.innerText = data.session
            ? "Conta criada com sucesso!"
            : "Cadastro recebido! Verifique seu email para confirmar.";

        formulario.reset();

    } catch (erro) {

        console.error("ERRO INESPERADO:", erro);

        mensagem.innerText = "Erro ao conectar ao Supabase.";

    }

});
