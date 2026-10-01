let colecaoMidia = [];

async function carregarCatalogo() {
    const container_card = document.getElementById('catalogo-grid');
    container_card.innerHTML = "<p>Carregando itens, aguarde.</p>";

    try {
        const resposta = await fetch('dados.json');
        if (!resposta.ok) throw new Error("Erro ao buscar os dados");

        colecaoMidia = await resposta.json();
        renderizarGrid(colecaoMidia);
    } catch (erro) {
        // Correção 1: Troca de %{erro.message} para ${erro.message}
        container_card.innerHTML = `<p style="color: #ef4444;">
                                    Erro ao carregar catálogo: ${erro.message}</p>`;
    }
}

function renderizarGrid(lista) {
    const container_card = document.getElementById('catalogo-grid');
    container_card.innerHTML = "";

    if (lista.length === 0) {
        container_card.innerHTML = `<p class="info">Nenhum item cadastrado nesta categoria</p>`;
        return;
    }

    lista.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        // Validação extra para evitar erro se 'nota' não for um número válido
        const notaFormatada = typeof item.nota === 'number' ? item.nota.toFixed(1) : (item.nota || 'N/A');

        card.innerHTML = `
        ${item.capa ? `<img src="${item.capa}" alt="${item.titulo}" class="capa-midia">` : ''}
        <div> 
            <span class="tag-categoria">${item.categoria}</span>
            <h3>${item.titulo}</h3>
            <p class="info">Plataforma: ${item.plataforma}</p>
            <p class="info">Nota: <span class="nota">${notaFormatada}</span></p>
            <p class="info">Status: <strong>${item.status}</strong></p>
        </div>
        `;

        // Correção 2: Nome da variável corrigido de 'conteiner_card' para 'container_card'
        container_card.appendChild(card);
    });
}

// Executa as funções ao carregar o DOM
document.addEventListener('DOMContentLoaded', carregarCatalogo);