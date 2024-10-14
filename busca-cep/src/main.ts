const rua = document.querySelector<HTMLInputElement>('#rua')!;
const cidade = document.querySelector<HTMLInputElement>('#cidade')!;
const estado = document.querySelector<HTMLInputElement>('#estado')!;
const cepInput = document.querySelector<HTMLInputElement>('#cep')!;

function buscaEndereco(cep: string): Promise<any> { 
    return new Promise((resolve, reject) => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    reject('CEP não encontrado');
                } else {
                    resolve(data);
                }
            })
            .catch(() => {
                reject('Erro ao buscar o endereço');
            });
    });
}

function preencherCamposEndereco(endereco: { logradouro: string, localidade: string, uf: string }) {
    rua.value = endereco.logradouro;
    cidade.value = endereco.localidade;
    estado.value = endereco.uf;
}

async function buscarEPreencherEndereco(cep: string) {
    try {
        const endereco = await buscaEndereco(cep);
        preencherCamposEndereco(endereco);
    } catch (error) {
        alert(error);
    }
}

cepInput.addEventListener('blur', () => {
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.length === 8) {
        buscarEPreencherEndereco(cep);
    } else {
        alert('CEP inválido');
    }
});
