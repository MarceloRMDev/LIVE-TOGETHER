main.addFunction("initPrincipal()");

var principal;
function initPrincipal(){
	principal = new Principal();	
}

function Principal(){
	
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
	
	
	function trocaAction()
	{
		var empresa = document.getElementById("empresa");
		empresa.onchange = function()
		{
			empresa = empresa.options[empresa.selectedIndex];
		
			if(empresa.value != "null")
			{
				document.forms[0].action = "impressao-empresa.php";
			}
		}
	}
	new trocaAction();
}
			