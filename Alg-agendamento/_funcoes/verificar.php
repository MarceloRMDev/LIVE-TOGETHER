<?
include("funcoes.php");

function verifica_login($login,$senha,$id)
{	
	$conn = conecta_banco();
	
	if($id > 0)
	{
		$sql="SELECT usu_usuario,usu_login FROM usuarios WHERE usu_usuario='$id' LIMIT 1";
	}
	else
	{
		$sql="SELECT usu_usuario,usu_login FROM usuarios WHERE usu_senha='" . anti_sql_injection($senha) . "' AND usu_login = '" . anti_sql_injection($login) . "' LIMIT 1";
	}
	
	$resultado = $conn->query($sql);
	//Obt�m o n�mero de linhas resultantes
    $num_regs = $resultado->numRows();
     if ($num_regs == 0) 
	 { 
		 //N�o localizou o usu�rio no sistema
		 $cod_usuario = 0;
		 
	 }
     else
	 { 		
	  //Caso n�o passe nada como par�metro na fun��o fetchRow, ela retorna na ordem em que o select foi constru�do	 	 

		 	while ($linha = $resultado->fetchRow()) 
			{		 			
				  $cod_usuario  = $linha[0];
				  $login = utf8_decode($linha[1]);
				  $permissao = $linha[2];					  
   			}			
	 }	 
	 $resultado->free();
	 $conn->disconnect();
	 
	 return $cod_usuario;
}

/*function esta_logado($id)
{	
	$conn = conecta_banco();
	
	$sql="SELECT usu_usuario FROM usuarios WHERE usu_usuario='$id' LIMIT 1";
	
	$resultado = $conn->query($sql);
	//Obt�m o n�mero de linhas resultantes
    $num_regs = $resultado->NumRows();
     if ($num_regs == 0) 
	 { 
		 //N�o localizou o usu�rio no sistema
		 $cod_usuario = 0;
		 
	 }
     else
	 { 		
	  //Caso n�o passe nada como par�metro na fun��o fetchRow, ela retorna na ordem em que o select foi constru�do	 	 

		 	while ($linha = $resultado->fetchRow()) 
			{		 			
				  $cod_usuario  = $linha[0];
				  $login = 	 $linha[1];
				  $permissao = $linha[2];					  
   			}			
	 }	 
	 $resultado->free();
	 $conn->disconnect();
	 
	 return $cod_usuario;
}*/

?>





