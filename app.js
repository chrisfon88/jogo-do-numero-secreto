// Dica: Ctrl + l limpa do console do navegador

// Criação das variáveis | Observe que a primeira variável se trata de uma lista vazia
let listaDeNumerosSorteados = [];
let numeroLimiteDaLista = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;

// AS duas variáveis (titulo e paragrafo) a seguir, no presente caso, podem ser substituidas pela função exibirTextoNaTela

//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // aqui esta sendo utilizada uma extensão que está no html que vem do site resposivevoice.org
    // speak = literalmente diga isso | utilizará a tag texto com a configuração para língua disponível no ResposiveVoice
    //rate = propriedade da fala
    //Para execução correta, utilize o navegador Google Chrome e não esqueça de adicionar no arquivo html a API key do ResposiveVoice
    // insira "?key=" mais a chave API no lugar de "YOUR_API_KEY" na seguinte linha:
    //<script src="https://code.responsivevoice.org/responsivevoice.js?key=YOUR_API_KEY"></script>
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// função feita somente para chamar o texto inicial do jogo
function exibirMensagemInicial() {
   // chama a função exibirTextoNaTela colocando a tag mais o texto que aparecerá nesta tag
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); 
}

exibirMensagemInicial();

function verificarChute() {
    // o .value é colocado para que o valor que foi colocado lá dentro pelo usuário seja resgatado
    let chute = document.querySelector('input').value;
    
    // use if e else para determinar as mensagens que apareceram diretamente no hmtl para as condições verdadeiras e falsas
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        // na variável palavraTentativas, você pode ler o código como:
        // se tentativas for maior que 1, será 'verdadeiro' exibirá 'tentativas', caso contrário, exibirá 'tentativa'
        let palavraTentativas = tentativa > 1 ? 'tentativas' : 'tentativa';
        // na variável mensagemTentativas use crase para abrir e fechar o conteúdo da mensagem
        let mensagemTentativas = `Você descobriu o número secreto com ` + tentativa + ` ` + palavraTentativas + ` !`;
        exibirTextoNaTela('p', mensagemTentativas);
        // para ativar o botão reiniar após acertar o número do jogo, como este está desabilitado no html (o 'document')
        // é preciso chamar este botão pelo seu ID (através do 'getElementById') que no caso se chama 'reiniciar'
        // e solicitar que seja removido o atributo ('removeAttribute') que o está desabilitando - 'diabled'
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        // 'tentativa++' é o mesmo que 'tentativa + 1', servindo para contar o número de tentativas do usuário
        tentativa++;
        // chama a função limparCampo
        limparCampo();
    }
}
// ao escrever function e escolher a segunda opção com a seta para baixo e clicar em enter, já é criada a função
function gerarNumeroAleatorio() {
    // retorna um número inteiro (parseInt)
    // Math.random() se trata de um número aleatório entre mais que 0 e menor que 1
    // no caso deste código, este número aleatório será multiplicado por 10 + 1, ou seja, o número gerado será entre 1 e 10.
    let numeroEscolhido = parseInt(Math.random() * numeroLimiteDaLista + 1);
    // length = se refere ao tamanho da lista (array)
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    // Se por acaso a variavel for igual ao tamanho limite da lista
    if (quantidadeDeElementosNaLista == numeroLimiteDaLista) {
        // a lista de números será zerada
        listaDeNumerosSorteados = [];
    }

    //includes = verifica se o elemento está na lista | Observação é um método exclusivo do JavaScript
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // a ação a seguir se chama recursão, ou seja, uma função que chama ela própria novamente
        return gerarNumeroAleatorio();
    } else {
        // push = adiciona o item ao final da lista | Em outras linguagens pode ter outro nome
        listaDeNumerosSorteados.push(numeroEscolhido);
        // O console.log serve para chegar no Console do Navegador o comportamento do código
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}
// função para limpar o campo onde o número estava digitado entre cada tentativa
function limparCampo() {
    chute = document.querySelector('input');
    // o value se encontra aqui no código para que ele o valor seja limpo, ou seja, fique vazio ''
    chute.value = '';
}

// função
// lembre-se que é preciso nomear o botão no html
//  código no html: <button onclick="reiniciarJogo()" id="reiniciar" class="container__botao" disabled>Novo jogo</button>
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    //chama a função limparCampo
    limparCampo();
    // inicia a variável tentativa em 1
    tentativa = 1;
    // chama a função exibirMensagemInicial
    exibirMensagemInicial();
    // faz com que no arquivo html o ID 'reiniciar' (que é pertence ao botão) atrive o atributo 'disabled' para desabilitar o botão
    document.getElementById('reiniciar').setAttribute('disabled', true);
}