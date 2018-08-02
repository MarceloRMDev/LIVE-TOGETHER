/**
	Classe principal do sistema.
	�nico arquivo contendo um window.onload().
	Dever� ser importando por todas as p�ginas do sistema.
*/

var main = new Main(); //objeto principal, ao qual dever�o ser adicionadas as fun��es

//objeto principal
function Main(){
	var funcoes; //lista de fun��es a serem executadas
	var cont;
	
	//"construtor"
	this.init = function(){
		funcoes = Array();
		cont = 0;
	}

	
	//adiciona uma fun��o � lista de execu��o
	this.addFunction = function(nome){
		funcoes[cont] = nome;
		cont++;
	}
	
	//executa as tarefas
	this.execute = function(){
		for(var i = 0; i < funcoes.length; i++){
//			alert(funcoes[i]);
			eval(funcoes[i]);
		}
	}
	
	//processamento...
	this.init();
}


/**
	 _________________________
	|                         |
	| M�todo main dos scripts |
	|_________________________|
*/
window.onload = function(){
	main.execute(); //somente chama todas as fun��es carregadas para execu��o
}