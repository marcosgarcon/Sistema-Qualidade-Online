document.addEventListener('DOMContentLoaded', () => {
    const pecaForm = document.getElementById('peca-form');
    const pecasTableBody = document.querySelector('#pecas-table tbody');

    // Carregar peças do localStorage ao iniciar
    let pecas = JSON.parse(localStorage.getItem('pecas')) || [];
    pecas.forEach(peca => addPecaToTable(peca));

    pecaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const novaPeca = {
            codigo: document.getElementById('codigo-peca').value,
            descricao: document.getElementById('descricao-peca').value,
            revisao: document.getElementById('revisao-peca').value,
            id: Date.now() // ID único para facilitar a exclusão
        };
        
        addPecaToTable(novaPeca);
        
        // Salvar no localStorage
        pecas.push(novaPeca);
        localStorage.setItem('pecas', JSON.stringify(pecas));
        
        pecaForm.reset();
    });

    function addPecaToTable(peca) {
        const row = pecasTableBody.insertRow();
        row.setAttribute('data-id', peca.id);
        row.innerHTML = `
            <td>${peca.codigo}</td>
            <td>${peca.descricao}</td>
            <td>${peca.revisao}</td>
            <td><button class="delete-btn">Excluir</button></td>
        `;
    }

    // Lógica de exclusão
    pecasTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const row = e.target.closest('tr');
            const id = Number(row.getAttribute('data-id'));
            
            // Remove da tabela
            row.remove();
            
            // Remove do array e atualiza o localStorage
            pecas = pecas.filter(p => p.id !== id);
            localStorage.setItem('pecas', JSON.stringify(pecas));
        }
    });
});
