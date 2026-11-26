
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

const formulario = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");
const botao = formulario.querySelector('button[type="submit"]');


// ========================================
// 3. EVENTO DE LOGIN
// ========================================

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // ========================================
    // 4. VALIDAR CAMPOS
    // ========================================

    if (!email || !senha) {
        mensagem.innerText = "Preencha todos os campos!";
        return;
    }

    botao.disabled = true;
    botao.innerText = "Entrando...";

    mensagem.innerText = "Verificando seus dados...";

    try {

        // ========================================
        // 5. AUTENTICAÇÃO
        // ========================================

        const { data, error } = await banco.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) {
            console.error("Erro no login:", error);

            if (error.message === "Invalid login credentials") {
                mensagem.innerText = "Email ou senha incorretos!";
            } else {
                mensagem.innerText = "Erro ao entrar: " + error.message;
            }

            return;
        }

        // ========================================
        // 6. CONFIRMAR SESSÃO
        // ========================================

        if (!data.session || !data.user) {
            mensagem.innerText = "Não foi possível iniciar sua sessão!";
            return;
        }

        mensagem.innerText = "Login realizado! Redirecionando...";

        // ========================================
        // 7. REDIRECIONAR
        // ========================================

        setTimeout(function() {
            window.location.href = "inicio.html";
        }, 1000);

    } catch (erro) {

        console.error("Erro inesperado:", erro);

        mensagem.innerText = "Erro ao conectar ao Supabase!";

    } finally {

        botao.disabled = false;
        botao.innerText = "Entrar";

    }

});
