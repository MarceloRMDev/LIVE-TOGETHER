$().ready(function() {

	$("#cancelar-impressao").click(function(){
		if(confirm("Realmente deseja cancelar a impress�o?"))
			window.close();
	});

});