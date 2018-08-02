main.addFunction("initPrincipal()");

var principal, subtotal;
function initPrincipal(){
	principal = new Principal();	
}

function Principal(){
	
	/////FORMATA O VALOR EM MOEDA//////
	Number.prototype.formatMoney = function(c, d, t){
    var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
    + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
	//_________________________________________________//

	$("data").onblur = function()
	{
		
		var paramDate = this.value.split("/");
		var date = new Date(paramDate[2], paramDate[1], paramDate[0]);
		if(date == "Invalid Date")
		{						
			/*
				Se for uma data inv�lida, processo para o auto-complete.
			*/
			var dataAtual = new Date();
			
			if(paramDate[0] == "" || paramDate[0] == null) {
				paramDate[0] = dataAtual.getDate();
			}
			
			paramDate[2] = dataAtual.getFullYear();
			
			//se o m�s tiver vazio...
			if(paramDate[1] == "" || paramDate[1] == null) {
				if(paramDate[0] < dataAtual.getDate()) { //se o dia for maior que hoje...
					
					paramDate[1] = dataAtual.getMonth() + 2;
				}
				else {
					paramDate[1] = dataAtual.getMonth() + 1;
				}
			}
			else if(paramDate[1] < dataAtual.getMonth()) {
				paramDate[2]++;
			}
			
			//tento simplesmente substituir o ano digitado pelo ano atual
			var tentativa = new Date(paramDate[2], paramDate[1] - 1, paramDate[0]);
			if(tentativa == "Invalid Date") {
				
			}
			else {
				//deu certo!
				autoPreenche(tentativa, this);							
			}
		}
	}	
	/*
		Auto preenche o campo passado com a data passada.
	*/
	var autoPreenche = function(data, campo) {
		campo.value = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
	}
	
	var produtoAtual = "null";
	var produtosExcluidos = Array();
	var selectAtual = "null";

	var http_request = false;	
	function makeRequest(url)
	{
	    http_request = false;
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new XMLHttpRequest();
            if (http_request.overrideMimeType) {
                http_request.overrideMimeType('text/xml');
                // See note below about this line
            }
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!http_request) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        http_request.onreadystatechange = alertContents;
        http_request.open('GET', url, true);
        http_request.send(null);
    }

    function alertContents() {
        if (http_request.readyState == 4) {
            if (http_request.status == 200) {				
				var xmldoc = http_request.responseXML;
				var cod = xmldoc.getElementsByTagName('cod').item(0);
				var nome = xmldoc.getElementsByTagName('nome').item(0);
				var valor = xmldoc.getElementsByTagName('valor').item(0);
				var unidade = xmldoc.getElementsByTagName('unidade').item(0);
				var custo = xmldoc.getElementsByTagName('custo').item(0);
				table1 = document.getElementById("tabela");
				var linha = table1.insertRow(1);
				//Inser��o de Celulas
				var coluna1 = linha.insertCell(-1);
				//Definindo o estilo para a c�lula
				coluna1.className = "par";
				//Definindo o conte�do para a c�lula
				coluna1.innerHTML = "<input name='produto[]' value='"+cod.firstChild.data+"' class='checkbox to_check_checkAll' type='checkbox'><input name='produto_[]' value='"+cod.firstChild.data+"' type='hidden'>";	
				
				coluna1 = linha.insertCell(-1);
				coluna1.className = "col-1";
				coluna1.innerHTML = nome.firstChild.data;
				
				coluna1 = linha.insertCell(-1);
				coluna1.className = "col-2";
				coluna1.innerHTML = custo.firstChild.data;
				
				coluna1 = linha.insertCell(-1);
				coluna1.className = "col-3";
				coluna1.innerHTML = "<input name='valor[]' id='"+cod.firstChild.data+"' value='"+valor.firstChild.data+"' type='text' class='onsubmit:notnull input moeda'>/"+unidade.firstChild.data;
				
				coluna1 = linha.insertCell(-1);
				coluna1.className = "col-4";
				coluna1.innerHTML = "<input name='quantidade[]' id='"+cod.firstChild.data+"' value='1' class='onsubmit:notnull input' type='text'>";
				
				coluna1 = linha.insertCell(-1);
				coluna1.className = "col-5";
				coluna1.innerHTML = "<input name='subtotal[]' id='"+cod.firstChild.data+"' value='"+valor.firstChild.data+"' class='onsubmit:notnull input' type='text'>";
				new subTotal();
				new total();
				new NumberFormat();
						
            } else {
                alert('There was a problem with the request.');
            }
        }

    }	
	$("adicionar-produto").onclick = function()
	{
		var optAtual = $("produtos").options[$("produtos").selectedIndex];
		produtoAtual = optAtual.value;			
		if(produtoAtual == "null"){
			alert("Selecione um produto!");
			return false;
		}		
		makeRequest('ajax/produtos.php?cod='+optAtual.value);		
		produtosExcluidos[produtoAtual] = optAtual;		
		return false;
	}
	$("excluir-produto").onclick = function()
	{
		var inputs = document.getElementsByTagName("input");
		for(var i = 0; i < inputs.length; i++)
		{	
		    if(inputs[i].name == "produto[]")
			{
				if(inputs[i].checked)
				{	
					if(confirm("Tem certeza que deseja excluir?"))
					{
						removerLinha(inputs[i]);
						new total();
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

	function total()
	{
		var subtotal = document.getElementsByName("subtotal[]");
		var total = 0.00;
		var aux;
		for(var x=0;x<subtotal.length;x++)
		{							
			aux = subtotal[x].value;
			aux = aux.replace(".","");						
			aux = aux.replace(/,/,".");	
			aux = aux*1;
			total = total+aux;
		}
		//alert(total);
		var totalfield = document.getElementById("total");
		total = total.formatMoney();
		totalfield.value = total;
		totalfield.onclick = function()
		{
			totalfield.blur();
		}
		//alert(totalfield.value)
	}
	
	function subTotal()
	{
		var inputs = document.getElementsByTagName("input");
		var pit;
		var cod;
		for(var i = 0; i < inputs.length; i++)
		{	
		    if(inputs[i].name == "quantidade[]")
			{
				inputs[i].onkeyup = function()
				{		
					cod = this.id;
					var qtd = this.value;
					var valor = document.getElementById(cod).value;
					
					valor = valor.replace(".","");						
					valor = valor.replace(/,/,".");					
					
					if(qtd != '')
					{					
						var valornovo = qtd * valor;						
						valornovo = valornovo.formatMoney();
					/*	var subtotal = document.getElementsByName("subtotal[]");
						for(var x=0;x<subtotal.length;x++)
						{							
							if(subtotal[x].id == cod)
							{								
								subtotal[x].value = valornovo;									
							}
						}*/
						//var subtotal = this.next('.col-4',1);
						var campos = this.ancestors();
						var td = campos[0];
						var tdsubtotal = td.next('.col-5');
						var subtotal = tdsubtotal.descendants();
						//alert(subtotal[0].value);
						subtotal[0].value = valornovo;
						new total();						
					}
				}
			}
			if(inputs[i].name == "valor[]")
			{
				inputs[i].onkeyup = function()
				{		
					cod = this.id;
					var qtd = document.getElementById(cod).value;
					var valor = this.value;
					
					valor = valor.replace(".","");						
					valor = valor.replace(/,/,".");					
					
					if(qtd != '')
					{					
						var valornovo = qtd * valor;						
						valornovo = valornovo.formatMoney();
						var subtotal = document.getElementsByName("subtotal[]");
						for(var x=0;x<subtotal.length;x++)
						{							
							if(subtotal[x].id == cod)
							{								
								subtotal[x].value = valornovo;									
							}
						}
						new total();
					}
				}
			}
		}
	}
	new subTotal();	
	
	$("descontoa").style.display = "";	
	$("nparcelas").style.display = "";	
	$("juros").style.display = "";	
	var inputs = document.getElementsByTagName("input");
	var avista, aprazo;
	var cont = 0;
	for(var i = 0; i < inputs.length; i++){		
		if(inputs[i].getAttribute("type") == "checkbox" && inputs[i].getAttribute("name") == "condPagamento[]")
		{					
			if(inputs[i].value == 1)
				avista = inputs[i];
			else if(inputs[i].value == 2)
				aprazo = inputs[i];			
			else if(inputs[i].value == 3)
				cjuros = inputs[i];
		}
	}
	
	avista.onclick = function()
	{		
		if(this.checked){
			$("descontoa").style.display = "";				
		}else{
			$("descontoa").style.display = "none";
		}
	}
	
	aprazo.onclick = function()
	{
		if(this.checked)
		{
			$("nparcelas").style.display = "";					
		}else{
			$("nparcelas").style.display = "none";	
		}
	}
	cjuros.onclick = function()
	{
		if(this.checked)
		{
			$("juros").style.display = "";					
		}else{
			$("juros").style.display = "none";	
		}
	}
}// JavaScript Document