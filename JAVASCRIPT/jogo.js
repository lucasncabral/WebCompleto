var timerId = null; // variavel que armazena a chamada da funcao timeOut

function iniciaJogo(){
	var url = window.location.search;

	var nivel_jogo = url.replace("?","");
	var tempo_segundos = 0;
	var qtde_baloes = 20;

	nivel_jogo = parseInt(nivel_jogo);
	switch(nivel_jogo){
		case 1:
			tempo_segundos = 5;
			qtde_baloes = 50;
			break;
		case 2:
			tempo_segundos = 60;
			qtde_baloes = 30;
			break;
		case 3:
			tempo_segundos = 30;
			qtde_baloes = 20;
			break;
		default:
			tempo_segundos = 10;
			qtde_baloes = 20;
			break;
	}

	document.getElementById("cronometro").innerHTML = tempo_segundos;

	criaBaloes(qtde_baloes);

	document.getElementById("baloesInteiros").innerHTML = qtde_baloes;
	document.getElementById("baloesEstourados").innerHTML = 0;

	contaTempo(tempo_segundos);
}

function criaBaloes(qtde_baloes){
	for (var i = 1; i <= qtde_baloes; i++) {
		var balao = document.createElement("img");
		balao.src = "img/balao_azul_pequeno.png"
		balao.style.margin = '10px';
		balao.id = 'b' + i;
		balao.onclick = function(){ estourar(this); };

		document.getElementById("cenario").appendChild(balao);
	}
}

function estourar(balao){
	var id_balao = balao.id;
	document.getElementById(id_balao).src = 'img/balao_azul_pequeno_estourado.png';
	document.getElementById(id_balao).setAttribute("onclick", "");
	pontuacao(-1);
}

function pontuacao(acao){
	var baloesInteiros = document.getElementById("baloesInteiros").innerHTML;
	var baloesEstourados = document.getElementById("baloesEstourados").innerHTML ;
	baloesInteiros = parseInt(baloesInteiros);
	baloesEstourados = parseInt(baloesEstourados);

	baloesInteiros += acao;
	baloesEstourados -= acao;

	document.getElementById("baloesInteiros").innerHTML = baloesInteiros;
	document.getElementById("baloesEstourados").innerHTML = baloesEstourados;

	situacaoJogo(baloesInteiros);
}

function situacaoJogo(baloesInteiros){
	if(baloesInteiros == 0){
		alert('Parabens');
		pararJogo();
	}
}

function pararJogo(){
		clearTimeout(timerId);
}

function gameOver(){
		alert("GameOver");
		remove_eventos_baloes();
}

function contaTempo(segundos){
	document.getElementById("cronometro").innerHTML = segundos;

	segundos--;
	if(segundos == -1) {
		gameOver();
		pararJogo();
		return false;
	}

	setTimeout("contaTempo(" + segundos + ")", 1000);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

