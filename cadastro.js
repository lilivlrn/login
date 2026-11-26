
// ========================================
// 1. CONEXÃO COM SUPABASE
// ========================================

const SUPABASE_URL = "https://nwijkikhscguygidebew.supabase.co";

const SUPABASE_KEY = "sb_publishable_mVAydUc29ZIk3Zizql2waA_XTXk2_0Z";

const banco = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ========================================
// 2. ELEMENTOS DO HTML
// ========================================

const formulario = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("btnCadastrar");


// ========================================
// 3. EVENTO DE CADASTRO
// ========================================

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    // Captura os dados
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // Validação
    if (!email || !senha) {
        mensagem.innerText = "Preencha todos os campos!";
        return;
    }

    if (senha.length < 6) {
        mensagem.innerText = "A senha precisa ter pelo menos 6 caracteres!";
        return;
    }

    // Bloqueia o botão durante o cadastro
    botao.disabled = true;
    botao.innerText = "Cadastrando...";

    mensagem.innerText = "Criando sua conta...";

    try {

        // ========================================
        // 4. CADASTRO NO SUPABASE AUTH
        // ========================================

        const { data, error } = await banco.auth.signUp({

            email: email,

            password: senha

        });

        // ========================================
        // 5. VERIFICA ERROS
        // ========================================

        if (error) {

            console.error("Erro Supabase:", error);

            mensagem.innerText = "Erro: " + error.message;

            return;
        }

        // Verifica se o usuário foi retornado
        if (!data.user) {

            mensagem.innerText = "Não foi possível criar a conta.";

            return;
        }

        // ========================================
        // 6. CADASTRO CONCLUÍDO
        // ========================================

        if (data.session) {

            mensagem.innerText =
                "Cadastro realizado com sucesso! Você já pode entrar.";

        } else {

            mensagem.innerText =
                "Conta criada! Confira seu email para confirmar o cadastro.";

        }

        console.log("Usuário criado:", data.user.id);

        formulario.reset();

    } catch (erro) {

        console.error("Erro inesperado:", erro);

        mensagem.innerText =
            "Erro de conexão com o Supabase.";

    } finally {

        botao.disabled = false;
        botao.innerText = "Cadastrar";

    }

});
