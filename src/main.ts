const campoNome = document.querySelector<HTMLInputElement>('#campoNome');
const campoEmail = document.querySelector<HTMLInputElement>('#campoEmail');
const campoTelefone = document.querySelector<HTMLInputElement>('#campoTelefone');
const campoDataNascimento = document.querySelector<HTMLInputElement>('#campoDataNascimento');
const formulario = document.querySelector<HTMLFormElement>('#formulario');
const paragrafo = document.querySelector<HTMLParagraphElement>('#mensagemUsuario');

if (campoNome && paragrafo) {
    campoNome.oninput = function() {
        const valorDigitado = campoNome.value;
        paragrafo.textContent = 'Olá ' + valorDigitado + ', envie seu cadastro!';
    };
}

function validarCampoNome(): boolean {
    if (campoNome && campoNome.value.trim() === '') {
        alert('O campo Nome não pode ficar vazio.');
        return false;
    }
    return true;
}

function validarCampoEmail(): boolean {
    if (campoEmail) {
        const valorDigitado = campoEmail.value;
        if (!valorDigitado.includes('@')) {
            alert('E-mail inválido! Por favor, insira um e-mail válido.');
            return false;
        }
    }
    return true;
}

function validarCampoTelefone(): boolean {
    if (campoTelefone) {
        const valorDigitado = campoTelefone.value.replace(/\D/g, '');
        if (valorDigitado.length < 10 || valorDigitado.length > 11) {
            alert('Telefone inválido! Deve conter entre 10 e 11 dígitos.');
            return false;
        }
    }
    return true;
}

function validarCampoDataNascimento(): boolean {
    if (campoDataNascimento && campoDataNascimento.value === '') {
        alert('Por favor, insira sua data de nascimento.');
        return false;
    }
    return true;
}

if (campoNome) {
    campoNome.onblur = validarCampoNome;
}

if (campoEmail) {
    campoEmail.onblur = validarCampoEmail;
}

if (campoTelefone) {
    campoTelefone.onblur = validarCampoTelefone;
}

if (campoDataNascimento) {
    campoDataNascimento.onblur = validarCampoDataNascimento;
}

if (formulario) {
    formulario.onsubmit = function(event) {
        const nomeValido = validarCampoNome();
        const emailValido = validarCampoEmail();
        const telefoneValido = validarCampoTelefone();
        const dataNascimentoValida = validarCampoDataNascimento();

        if (!nomeValido || !emailValido || !telefoneValido || !dataNascimentoValida) {
            event.preventDefault();
        } else {
            alert('Formulário enviado com sucesso!');
            formulario.reset();
        }
    };
}
