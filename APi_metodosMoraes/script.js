let colecaoMidia = [];

async function carregarCatalogo(){
    const container_card = document.getElementById('catalago-grid');
    container_card.innerhtml = "<p> Carregando itens, aguarde.</p>";

    try{
        const resposta = await fetch('dados.json');
        if(!resposta.ok) throw new Error("Erro ao buscar os dados");

        colecaoMidia = await resposta.json();
    } catch(erro){
        container_card.innerHTML = `<p style="color: #ef4444;">
                                    Erro ao carregar catálogo: %{erro.message}</p>`;
    }
}

function renderizarGrid(lista){
    const container_card = document.getElementById('catalago-grid');
    container_card.innerHTML = "";

    if(lista.length === 0){
        container_card.innerHTML = `<p class = "info"> Nenhum item cadastrado nesta categoria</p>`;
        return;
    }
}

document.addEventListener('DOMContentLoaded', carregarCatalogo);