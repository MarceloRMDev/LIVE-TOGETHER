<?
session_start();
require_once("../_funcoes/funcoes.php");
echo "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html id='clientes-cadastro' class='clientes' xmlns='http://www.w3.org/1999/xhtml'>";

include("../componentes/head.php");

echo "<script src='../_javascript/cadastro-de-fornecedores/Principal.js' type='text/javascript'></script>\n";

echo "</head>";
echo "<body>";

include("../componentes/cabecalho.php");

$cod = $_GET['cod'];
$conn = conecta_banco();

/// BUSCANDO DADOS PESSOAIS ////
$sql = "SELECT	pes_nome, for_tipodepessoa, for_estahativo, for_observacoes, for_cpf, for_cnpj, for_inscricao_rg, for_razaosocial, for_contato, for_endereco, for_con_comercial, for_con_residencial, for_con_celular, for_con_email from pessoas".
		" inner join fornecedores on for_fornecedor = pes_pessoa and pes_pessoa = '$cod'";
		
$resultado = $conn->query($sql);			
while ($linha = $resultado->fetchRow()) 
{		 			
		  $nome_fornecedor  = $linha[0];
		  $tipodefornecedor  = $linha[1];
		  $situacao  = $linha[2];
		  $observacoes = $linha[3];   	
		  $cpf = $linha[4];
		  $cnpj = $linha[5];
		  $inscricao = $linha[6];
		  $razaosocial = $linha[7];	     
		  $contato = $linha[8];
		  $cod_endereco = $linha[9];
		  $comercial = $linha[10];
		  $residencial = $linha[11];
		  $celular = $linha[12];
		  $email = $linha[13];			  
} 			
/// BUSCANDO DADOS DE ENDERE�O///		 
$sql = "SELECT	end_endereco, end_cep, end_logradouro, end_numero, end_complemento, end_bairro, end_estado, end_cidade ". 
				"FROM	enderecos ". 						
				"WHERE end_endereco = '$cod_endereco'";	
							
	$resultado = $conn->query($sql);			
	while ($linha = $resultado->fetchRow()) 
	{		 			
			  $cod_endereco  = $linha[0];
			  $cep  = $linha[1];
			  $logradouro  = $linha[2];
			  $numero  = $linha[3];
			  $complemento  = $linha[4];			  
			  $bairro  = $linha[5];			 
			  $com_cod_estado  = $linha[6];				  			  
			  $com_cod_cidade  = $linha[7];			 			
	}

?>
<div id="menu-secao">
	<li>
		<a href="../_funcoes/controller.php?opcao=home-fornecedores" class="fornecedores">Fornecedores</a>
		Fornecedores > Edi��o
	</li>
</div>

<div id="sub-menu">	
	<li>
		<a href="../_funcoes/controller.php?opcao=home-fornecedores">Listagem de Fornecedores</a>
		<a href="../_funcoes/controller.php?opcao=cadastro-de-fornecedores">Cadastro de Fornecedores</a>		
	</li>
</div>

<form id="form-fornecedores" name="form-fornecedores" class="form-auto-validated" action="update-fornecedores.php" method="post" enctype="multipart/form-data">
<input type="hidden" name="cod" value='<? echo $cod; ?>' />      
<input type="hidden" name="cod_endereco" value='<? echo $cod_endereco; ?>' />      
 <h3>
        Fornecedor
      </h3>
      <fieldset>
        <legend>
          Tipo de Fornecedor
        </legend>

        <fieldset>
          <fieldset class='fisica'>
            <label class='fisica'>
			<? 
			if($tipodefornecedor =="F")
			{	$checked_fisica = "checked='checked'";
			}?>
              <input name='tipoDeFornecedor' value='fisica' class='radio' type='radio' <? echo $checked_fisica; ?>/>
              Pessoa F�sica
            </label>
          </fieldset>
          <fieldset class='juridica'>
            <label class='juridica'>
			<? 
			if($tipodefornecedor =="J")
			{	$checked_juridica = "checked='checked'";

			}?>
              <input name='tipoDeFornecedor' value='juridica' class='radio' type='radio' <? echo $checked_juridica; ?> />
              Pessoa Jur�dica
            </label>
          </fieldset>
        </fieldset>
      </fieldset>
      <fieldset id='campos-fisica'>
        <fieldset>
          <fieldset class='pesNome validate=notnull onsubmit:notnull'>

            <label for='pesNome'>
              Nome
            </label>
            <input id='pesNome' maxlength='256' name='pesNome' class='validate=notnull onsubmit:notnull' type='text' value='<? echo $nome_fornecedor; ?>' />
          </fieldset>
          <fieldset class='pesfCpf validate=cpf-null cpf-mask'>
            <label for='pesfCpf'>
              CPF
            </label>
            <input id='pesfCpf' maxlength='14' name='pesfCpf' class='validate=cpf-null cpf-mask' type='text' value='<? echo $cpf; ?>' />

          </fieldset>
          <fieldset class='pesfRg'>
            <label for='pesfRg'>
              RG
            </label>
            <input id='pesfRg' maxlength='16' name='pesfRg' type='text' value='<? echo $inscricao; ?>' />
          </fieldset>
        </fieldset>
      </fieldset>

      <fieldset id='campos-juridica'>
        <fieldset>
          <fieldset class='pesNomeFantasia validate=notnull onsubmit:notnull'>
            <label for='pesNomeFantasia'>
              Nome Fantasia
            </label>
            <input id='pesNomeFantasia' maxlength='256' name='pesNomeFantasia' class='validate=notnull onsubmit:notnull' type='text' value='<? echo $nome_fornecedor; ?>'/>
          </fieldset>
          <fieldset class='pesjRazaosocial'>

            <label for='pesjRazaosocial'>
              Raz�o Social
            </label>
            <input id='pesjRazaosocial' maxlength='256' name='pesjRazaosocial' type='text' value='<? echo $razaosocial; ?>' />
          </fieldset>
          <fieldset class='pesjNomepessoacontato'>
            <label for='pesjNomepessoacontato'>
              Pessoas para contato
            </label>
            <input id='pesjNomepessoacontato' maxlength='40' name='pesjNomepessoacontato' type='text' value='<? echo $contato; ?>' />

          </fieldset>
        </fieldset>
        <fieldset>
          <fieldset class='pesjCnpj cnpj-mask validate=cnpj-null'>
            <label for='pesjCnpj'>
              CNPJ
            </label>
            <input id='pesjCnpj' maxlength='18' name='pesjCnpj' class='cnpj-mask validate=cnpj-null' type='text' value='<? echo $cnpj; ?>' />
          </fieldset>

          <fieldset class='pesjInscricaoestadual numbers-only'>
            <label for='pesjInscricaoestadual'>
              Inscri��o Estadual
            </label>
            <input id='pesjInscricaoestadual' maxlength='10' name='pesjInscricaoestadual' class='numbers-only' type='text' value='<? echo $inscricao; ?>' />
          </fieldset>
        </fieldset>
      </fieldset>
      <fieldset>

        <legend>
          Situa��o
        </legend>
        <fieldset>
		<?
		if($situacao == "S")
		{
		 	$ativo = "checked='checked'";
		}else{ $inativo = "checked='checked'";}
		?>
          <fieldset class='ativo'>		  
            <label class='ativo'>
              <input name='situacao' value='S' class='radio' type='radio' <? echo $ativo;?> />
              Ativo
            </label>
          </fieldset>

          <fieldset class='inativo'>
            <label class='inativo'>
              <input name='situacao' value='N' class='radio' type='radio' <? echo $inativo;?> />
              Inativo
            </label>
          </fieldset>
        </fieldset>
      </fieldset>
      <fieldset>

        <fieldset>
          <fieldset class='forObservacoes'>
            <label for='forObservacoes'>
              Observa��es
            </label>
            <textarea id='forObservacoes' name='forObservacoes'><? echo $observacoes; ?></textarea>
          </fieldset>
        </fieldset>
      </fieldset>

     <h3>
	Endere�o
</h3>     
        <fieldset>
        <fieldset>
        <fieldset class='logradouro onsubmit:notnull'>
            <label for='logradouro'>
              Logradouro
            </label>
            <input id='logradouro' maxlength='40' name='logradouro' class='onsubmit:notnull' type='text'  value="<?=$logradouro?>"/>
          </fieldset>  
          <fieldset class='numero onsubmit:notnull'>
            <label for='numero'>
              N�mero
            </label>
            <input id='numero' maxlength='7' name='numero' class='onsubmit:notnull' type='text'  value="<?=$numero?>"/>
          </fieldset> 
          </fieldset> 
          <fieldset>
          <fieldset class='complemento'>
            <label for='complemento'>
              Complemento
            </label>
            <input id='complemento' maxlength='60' name='complemento' type='text' value="<?=$complemento?>" />
          </fieldset>              
        <fieldset class='bairro onsubmit:notnull' >
            <label for='bairro'>
              Bairro
            </label>
            <input id='bairro' maxlength='40' name='bairro' class='onsubmit:notnull' type='text'  value="<?=$bairro?>"/>
          </fieldset>              
        </fieldset>
        <fieldset>
        <fieldset class='cep onsubmit:notnull'>
            <label for='cep'>
              Cep
            </label>
            <input id='cep' maxlength='8' name='cep' class='onsubmit:notnull numbers-only' type='text' value="<?=$cep?>" />				
          </fieldset>   
         <div id='cid-estado'>
		 </div>
         </fieldset>
      </fieldset>
      <h3>
        Contatos
      </h3>
      <fieldset>
        <fieldset>
          <fieldset class='conComercial telefone-ddd-mask'>
            <label for='conComercial'>
              Telefone comercial
            </label>
            <input id='conComercial' name='conComercial' class='telefone-ddd-mask' type='text' value='<? echo $comercial; ?>' />

          </fieldset>
          <fieldset class='conCelular telefone-ddd-mask'>
            <label for='conCelular'>
              Telefone celular
            </label>
            <input id='conCelular' name='conCelular' class='telefone-ddd-mask' type='text' value='<? echo $celular; ?>' />
          </fieldset>		 
		  </fieldset>
		  <fieldset>
		   <fieldset class='conComercial telefone-ddd-mask'>
            <label for='conComercial'>
              Telefone residencial
            </label>
            <input id='conResidencial' name='conResidencial' class='telefone-ddd-mask' type='text' value='<? echo $residencial; ?>' />

          </fieldset>
          <fieldset class='conEmail'>
            <label for='conEmail'>
              E-mail
            </label>
            <input id='conEmail' name='conEmail' type='text' value='<? echo $email; ?>'/>
          </fieldset>		 
        </fieldset>
      </fieldset>	
<fieldset class="buttons">
<input value="Cancelar" class="reset action:../_funcoes/controller.php?opcao=home-fornecedores" type="reset">
<input type="submit" id='submit-button' value="Salvar" class="bt">
</fieldset>
</form>
</body>
</html>
