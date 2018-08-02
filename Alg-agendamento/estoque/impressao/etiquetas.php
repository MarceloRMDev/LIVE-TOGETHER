<?php
session_start();
require_once("../../_funcoes/funcoes.php");
//require_once("../../_funcoes/_classes/html2pdf/html2fpdf.php");
require_once("code13.php");
//require_once("../../_funcoes/_classes/barcodes/classBarraC.php");

$query = $_SESSION['produtos'];
//$busca = mysql_query($query);

// Variaveis de Tamanho

$mesq = "5"; // Margem Esquerda (mm)
$mdir = "5"; // Margem Direita (mm)
$msup = "12"; // Margem Superior (mm)
$leti = "72"; // Largura da Etiqueta (mm)
$aeti = "27"; // Altura da Etiqueta (mm)
$ehet = "3,2"; // Espa�o horizontal entre as Etiquetas (mm)
//$pdf=new FPDF('P','mm','Letter'); // Cria um arquivo novo tipo carta, na vertical.
//$pdf=new HTML2FPDF('P','mm','Letter');
$pdf = new PDF();

$pdf->Open(); // inicia documento
$pdf->AddPage(); // adiciona a primeira pagina
$pdf->SetMargins('5','12,7'); // Define as margens do documento
$pdf->SetAuthor("Jonas Ferreira"); // Define o autor
$pdf->SetFont('helvetica','',7); // Define a fonte
$pdf->SetDisplayMode(100, 'continuous'); //define o nivel de zoom do documento PDF

$coluna = 0;
$linha = 0;

//MONTA A ARRAY PARA ETIQUETAS
$resultado = execute_query($query);
while ($line = $resultado->fetchRow()) 
{		 			
	  $cod_produto  = $line[0];
	  $nome_produto  = $line[1];
	  $descricao  = $line[2];
	  $qtde  = $line[3];
	  $unidade = $line[4];
	  $valor  = $line[5];	
	  $nome_marca = $line[6];	
	  $nome_categoria = $line[7];
	  $valorcompra = $line[8];
	  $nomefornecedor = $line[9];
	  $cod_barras = $line[10];
	  $valor = valorparaousuario_new($valor);
	  
if($linha == "10") {
$pdf->AddPage();
$linha = 0;
}

if($coluna == "3") { // Se for a terceira coluna
$coluna = 0; // $coluna volta para o valor inicial
$linha = $linha +1; // $linha � igual ela mesma +1
}

if($linha == "10") { // Se for a �ltima linha da p�gina
$pdf->AddPage(); // Adiciona uma nova p�gina
$linha = 0; // $linha volta ao seu valor inicial
}

$posicaoV = $linha * $aeti;
$posicaoH = $coluna * $leti;

if($coluna == "0") { // Se a coluna for 0
$somaH = $mesq; // Soma Horizontal � apenas a margem da esquerda inicial
} else { // Sen�o
$somaH = $mesq+$posicaoH; // Soma Horizontal � a margem inicial mais a posi��oH
}

if($linha =="0") { // Se a linha for 0
$somaV = $msup; // Soma Vertical � apenas a margem superior inicial
} else { // Sen�o
$somaV = $msup+$posicaoV; // Soma Vertical � a margem superior inicial mais a posi��oV
}

//$bar = new WBarCode($cod_produto);// Instancia classe que retorna o c�digo de barras 

$pdf->Text($somaH,$somaV,$nome_produto); // Imprime o nome da pessoa de acordo com as coordenadas
$pdf->Text($somaH,$somaV+4,$nome_marca); // Imprime o endere�o da pessoa de acordo com as coordenadas
$pdf->Text($somaH,$somaV+8,$valor); // Imprime a localidade da pessoa de acordo com as coordenadas
//$pdf->Text($somaH,$somaV+12,$cep); // Imprime o cep da pessoa de acordo com as coordenadas
//$pdf->Image($somaH,$somaV+12,new barCodeGenrator($cod_produto,0,'hello.gif')); // Imprime o c�digo de barras de acordo com a coordenada

/*$fp = fopen("sample.php","r");
$strContent = fread($fp, filesize("sample.php"));
fclose($fp);
$pdf->WriteHTML("<img src='barras.php?codigo=123'/>");*/
//$pdf->EAN13($somaH,$somaV+6,$cod_barras);
$coluna = $coluna+1;
}

$pdf->Output();
?>