

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
const botao = formulario.querySelector('button[type="submit"]');


// ========================================
// 3. CADASTRO
// ========================================

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // ========================================
    // 4. VALIDAÇÕES
    // ========================================

    if (!email || !senha) {
        mensagem.innerText = "Preencha todos os campos!";
        return;
    }

    if (senha.length < 6) {
        mensagem.innerText = "A senha precisa ter pelo menos 6 caracteres!";
        return;
    }

    botao.disabled = true;
    botao.innerText = "Cadastrando...";

    mensagem.innerText = "Criando sua conta...";

    try {

        // ========================================
        // 5. CADASTRAR NO SUPABASE
        // ========================================

        const { data, error } = await banco.auth.signUp({
            email: email,
            password: senha
        });

        // ========================================
        // 6. VERIFICAR ERRO
        // ========================================

        if (error) {

            console.error("ERRO SUPABASE:", error);

            mensagem.innerText = "Erro ao cadastrar: " + error.message;

            return;
        }

        // ========================================
        // 7. VERIFICAR USUÁRIO
        // ========================================

        if (!data || !data.user) {

            mensagem.innerText = "O Supabase não retornou os dados do usuário.";

            console.error("Resposta:", data);

            return;
        }

        // ========================================
        // 8. CADASTRO CONCLUÍDO
        // ========================================

        console.log("ID:", data.user.id);
        console.log("EMAIL:", data.user.email);
        console.log("SESSÃO:", data.session);

        if (data.session) {

            mensagem.innerText =
                "Cadastro realizado com sucesso!";

        } else {

            mensagem.innerText =
                "Conta criada! Verifique seu email para confirmar.";

        }

        formulario.reset();

    } catch (erro) {

        console.error("ERRO INESPERADO:", erro);

        mensagem.innerText =
            "Erro ao conectar ao Supabase: " + erro.message;

    } finally {

        botao.disabled = false;
        botao.innerText = "Cadastrar";

    }

});

