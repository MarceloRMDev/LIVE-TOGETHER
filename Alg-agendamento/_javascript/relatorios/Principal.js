main.addFunction("initPrincipal()");

var principal;
function initPrincipal(){
	principal = new Principal();
}

function Principal(){
	
	/*Calendar.setup({
		inputField     :    "inicio",     // id do campo de texto
		 ifFormat     :     "%d/%m/%Y",     // formato da data que se escreva no campo de texto
		 button     :    "lancador"     // o id do bot�o que lan�ar� o calend�rio
	}); */	
	
	/*
		A��es de escolha de situa��es.
	*/
	$("link-categorias").onclick = function() {
		$("categorias-box").style.visibility = "visible";
	}
	
	$("ok-categorias-box").onclick = function() {
		$("categorias-box").style.visibility = "hidden";
	}
	
}