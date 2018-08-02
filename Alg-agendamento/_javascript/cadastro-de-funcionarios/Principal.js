main.addFunction("initPrincipal()");

var principal;
var validator;
function initPrincipal(){
	principal = new Principal();
	//validator = new Validator();
}

function Principal(){
	
	new CombosEnderecoDinamico("endCep", "paiPais", "estEstado", "estNome", "cidCidade");
	new CombosEnderecoDinamico("endCobrancaCep", "paiCobrancaPais", "estCobrancaEstado", "estCobrancaNome", "cidCobrancaCidade");
	
	
	
	$("enderecoPadraoAba").className += " selecionada"; 
	$("enderecoCobranca").style.display = "none";

	//--
	
	$("enderecoPadraoAba").onclick = function(){
		$("enderecoPadrao").style.display = "";
		$("enderecoCobranca").style.display = "none";
		$("enderecoCobrancaAba").className = $("enderecoCobrancaAba").className.substring(0, $("enderecoCobrancaAba").className.length - " selecionada".length);
		this.className += " selecionada";
	}
	
	
	$("enderecoCobrancaAba").onclick = function(){
		$("enderecoPadrao").style.display = "none";
		$("enderecoCobranca").style.display = "";
		$("enderecoPadraoAba").className = $("enderecoPadraoAba").className.substring(0, $("enderecoPadraoAba").className.length - " selecionada".length);
		this.className += " selecionada";
	
}

/* _______________________________________________________________________________*/


	
/// fun��o chamada atrav�s de onBLur(), carrega via ajax endere�o pelo cep
   function getEndereco() {
			// Se o campo CEP n�o estiver vazio
			if($.trim($("#endCep").val()) != ""){
				/* 
					Para conectar no servi�o e executar o json, precisamos usar a fun��o
					getScript do jQuery, o getScript e o dataType:"jsonp" conseguem fazer o cross-domain, os outros
					dataTypes n�o possibilitam esta intera��o entre dom�nios diferentes
					Estou chamando a url do servi�o passando o par�metro "formato=javascript" e o CEP digitado no formul�rio
					http://cep.republicavirtual.com.br/web_cep.php?formato=javascript&cep="+$("#cep").val()
				*/
				$.getScript("http://cep.republicavirtual.com.br/web_cep.php?formato=javascript&cep="+$("#cep").val(), function(){
					// o getScript d� um eval no script, ent�o � s� ler!
					//Se o resultado for igual a 1
			  		if(resultadoCEP["resultado"]){
						// troca o valor dos elementos
						$("#endLogradouro").val(unescape(resultadoCEP["tipo_logradouro"])+": "+unescape(resultadoCEP["logradouro"]));
						$("#endBairro").val(unescape(resultadoCEP["bairro"]));
						$("#cidCidade").val(unescape(resultadoCEP["cidade"]));
						$("#estEstado").val(unescape(resultadoCEP["uf"]));
					}else{
						alert("Endere�o n�o encontrado");
					}
				});				
			}			
	}
}