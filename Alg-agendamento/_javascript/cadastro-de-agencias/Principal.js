main.addFunction("initPrincipal()");

var principal;
function initPrincipal(){
	principal = new Principal();
}

function Principal(){
	
	var contatoAtual = "null";
	var contatoExcluidas = Array();
	var selectAtual = "null";
	
	 
	
	function addContato() {      
				
		table1 = document.getElementById("tabela");
		var linha = table1.insertRow(1);
		//Inser��o de Celulas
		var coluna1 = linha.insertCell(-1);
		//Definindo o estilo para a c�lula
		coluna1.className = "par";
		//Definindo o conte�do para a c�lula
		coluna1.innerHTML = "<input name='contato[]' class='checkbox to_check_checkAll' type='checkbox'>";	
		
		coluna1 = linha.insertCell(-1);
		coluna1.className = "col-1";
		coluna1.innerHTML = "<input name='nomecontato[]' class='onsubmit:notnull' type='text'>";
		
		coluna1 = linha.insertCell(-1);
		coluna1.className = "col-2";
		coluna1.innerHTML = "<input name='fonecontato[]' class='onsubmit:notnull telefone-ddd-mask' type='text'>";
		
		coluna1 = linha.insertCell(-1);
		coluna1.className = "col-3";
		coluna1.innerHTML = "<input name='emailcontato[]' class='onsubmit:notnull' type='text'>";

    }	

	
	$("adicionar-contato").onclick = function()
	{
		
		addContato();		
		usuariosExcluidas[usuarioAtual] = optAtual;		
		return false;
	}
	$("excluir-contato").onclick = function()
	{
		var inputs = document.getElementsByTagName("input");
		for(var i = 0; i < inputs.length; i++)
		{	
		    if(inputs[i].name == "contato[]")
			{
				if(inputs[i].checked)
				{	
					if(confirm("Tem certeza que deseja excluir?"))
					{
						removerLinha(inputs[i]);						
					}
				}
			}
		}
	}
	
	
	// Fun��o respons�vel em receber um objeto e extrair as informa��es necess�rias para a remo��o da linha.
	function removerLinha(obj) {			
			// Capturamos a refer�ncia da TR (linha) pai do objeto
			var objTR = obj.parentNode.parentNode;
			// Capturamos a refer�ncia da TABLE (tabela) pai da linha
			var objTable = objTR.parentNode;
			// Capturamos o �ndice da linha
			var indexTR = objTR.rowIndex;
			// Chamamos o m�todo de remo��o de linha nativo do JavaScript, passando como par�metro o �ndice da linha  
			var table1 = document.getElementById("tabela")
			//objTable.deleteRow(indexTR);
			table1.deleteRow(indexTR);		
	 } 
}