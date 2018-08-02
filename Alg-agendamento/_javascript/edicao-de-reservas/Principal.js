main.addFunction("initPrincipal()");

var principal;
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
	
	Calendar.setup({
		inputField     :    "datareserva",     // id do campo de texto
		 ifFormat     :     "%d/%m/%Y",     // formato da data que se escreva no campo de texto
		 button     :    "lancador"     // o id do bot�o que lan�ar� o calend�rio
	}); 	

	$("datareserva").onblur = function()
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
	
	
	$("verificar").style.display = "none";

	//--
	var disponibilidade = 1;
	var inseriuDisponibilidade = false;
	$("datareserva").onchange = function(){
		
		$("verificar").style.display = "";
		
		if(inseriuDisponibilidade == false)
		{
			var fSet = document.createElement("fieldset");
			disponibilidade = null;
			inseriuDisponibilidade = true;		
		}
		
		
	}
	
	$("turno").onchange = function(){
		
		$("verificar").style.display = "";

		if(inseriuDisponibilidade == false)
		{
			var fSet = document.createElement("fieldset");
			disponibilidade = null;
			inseriuDisponibilidade = true;		
		}		
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
				var valor = xmldoc.getElementsByTagName('valor').item(0);
				
				disponibilidade = valor.firstChild.data;
				var fSet = document.createElement("fieldset");	
				fSet.setAttribute("id", "cepajax");
				
				if(disponibilidade == 1)
				{
					fSet.innerHTML = "<label>&nbsp;<b>Dispon�vel!</b></label>";											
					
				}else{					

					fSet.innerHTML = "<label>&nbsp;<b>N�o dispon�vel!</b></label>";			
					
				}
				
				var cid = $('cepajax');
				if(cid != null)
				{     					
					//cid.parentNode.removeChild(cid);					
				}		
				$("disponibilidade").innerHTML = "";
				$("disponibilidade").appendChild(fSet);
				
						
            } else {
                alert('There was a problem with the request.');
            }
        }

    }	

	
	$("verificar").onclick = function()		
	{
		if($("datareserva").value == "" || $("datareserva").value == "undefined")
		{
			
			if($("turno").value == "" || $("turno").value == "null")
			{
				alert("Informe uma data para reserva e selecione um turno!");
				$("datareserva").focus();
			}else{				
				alert("Informe uma data para reserva!");
				$("datareserva").focus();
			}
			
		}else if($("turno").value = "" || $("turno").value == "null")
		{
			alert("Selecione um turno!");
			$("turno").focus();
			
		}else{
			
			///CHAMA A FUN��O AJAX Q CHAMA O PHP Q VAI VERIFICAR A DISPONIBILIDADE...
			
			var optAtual = $("turno").options[$("turno").selectedIndex];
			turnoAtual = optAtual.value;			
			if(turnoAtual == "null"){
				alert("Selecione um turno!");
				return false;
			}
			
			preLoadImg = new Image();
			preLoadImg.src = "./../_images/estrutura/loader.gif";
			$("disponibilidade").innerHTML = "<table width='120px'><center><br><font size=1>Aguarde, consultando...</font><br><img src='./../_images/estrutura/loader.gif'></center></table>";
			
			//busco os dados...			
			makeRequest('ajax/disponibilidade.php?turno='+optAtual.value+'&data='+$("datareserva").value);		
			produtosExcluidos[turnoAtual] = optAtual;		
			return false;
		
		}
		
	}
	/*
		A��es do bot�o salvar...
	*/
	$("submit-button").onclick = function(){
		//fa�o a verifica��o se foi verificado a disponibilidade
		if(disponibilidade == null){
			alert("Voc� dever� verificar a disponibilidade antes de registrar a reserva!");
			$("verificar").focus();
			return false;
		}else if(disponibilidade == 0)
		{
			alert("Selecione uma data com per�odo dispon�vel para concluir sua reserva!");
			$("verificar").focus();
			return false;
		}else if($("numpessoas").value < 25 || $("numpessoas").value > 50)
		{
			alert("O n�mero de pessoas n�o pode ser menor que 25 e maior que 50.");
			$("numpessoas").value = "";			
			$("numpessoas").focus();
			return false;
		}
	}
	
}// JavaScript Document