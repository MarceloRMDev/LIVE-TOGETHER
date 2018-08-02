main.addFunction("initPrincipal()");

var principal;
function initPrincipal(){
	principal = new Principal();
}

function Principal(){

	/*
		A��es de escolha de situa��es.
	*/
	$("link-situacoes").onclick = function() {
		$("situacoes-box").style.visibility = "visible";
	}
	
	$('ok-situacoes-box').onclick = function() {
		$("situacoes-box").style.visibility = "hidden";
	}
	
	
	
	Calendar.setup({
		inputField     :    "inicio",     // id do campo de texto
		 ifFormat     :     "%d/%m/%Y",     // formato da data que se escreva no campo de texto
		 button     :    "lancador"     // o id do bot�o que lan�ar� o calend�rio
	}); 	
	
	Calendar.setup({
		inputField     :    "fim",     // id do campo de texto
		 ifFormat     :     "%d/%m/%Y",     // formato da data que se escreva no campo de texto
		 button     :    "launcher"     // o id do bot�o que lan�ar� o calend�rio
	}); 	
	
	var inputs = document.getElementsByTagName("input");	

	for(var i = 0; i < inputs.length; i++)
	{	
		if(inputs[i].id == "imprimir-reservas"){				
			inputs[i].onclick = function()
			{				
				var classes = this.className.split(" ");
				for(var j = 0; j < classes.length; j++){
					if(classes[j].substring(0, "action:".length) == "action:")
					{												
							window.open(classes[j].substring("action:".length));																			
					}
				}				
			}
		}
	}
	
}