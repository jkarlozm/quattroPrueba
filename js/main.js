$(document).ready(function(){
	$('#flecha').on('click', function(e){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('#about').offset().top
		}, 1000);
	});

	/*
		Animación de desplazamiento al dar clic en alguna de las opciones del menú 
		para ir a la sección correspondiente.
	*/

	$('#home').on('click', function(e){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('#welcome').offset().top
		}, 1000);
	});

	$('#acerca').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('#about').offset().top
		}, 1000);
	});

	$('#servicios').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('#services').offset().top
		}, 1000);
	});

	$('#contacto').on('click', function(e){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('#contact').offset().top
		}, 1000);
	});

	// Botón volver arriba
	$(function (){
		$(window).scroll(function () {
			if ($(this).scrollTop() > 800) {
				$("#irarriba").fadeIn();
			} else{
				$("#irarriba").fadeOut();
			}
		});		
	});

	$("#flechaArriba").on('click', function (e){
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('#about').offset().top
		}, 1000);
	});

	// Tamaño letra
	$('.mensaje').fitText(1.2, {minFontSize: '15px', maxFontSize: '30px'});
	$('.subtitulos').fitText(1.2, {minFontSize: '40px', maxFontSize: '55px'});

	// Validación de campos de formulario de comunicacion
	$('#name').change(validarNombre);
	$('#email').change(validarEmail);
	$("#message").change(validarMensaje);

	if($('#name').val() != '' || $('#email').val() != '' || $('#message').val() != ''){
		validarNombre();
		validarEmail();
		validarMensaje();
	}
	
	function validarNombre(){
		if ( $("#name").val() == null || $("#name").val().length == 0 || /^\s+$/.test( $("#name").val() ) ) {
			$("#iconInput").remove();
			$("#name").parent().removeClass("has-success").addClass("has-warning has-feedback");
			$("#name").parent().append("<span id='iconInput' class='glyphicon glyphicon-remove-circle form-control-feedback'></span>");		
			return false;
		}
		else{
			$("#iconInput").remove();
			$("#name").parent().removeClass("has-warning").addClass("has-success has-feedback");
			$("#name").parent().append("<span id='iconInput' class='glyphicon glyphicon-ok-circle form-control-feedback'></span>");
			return true;
		}
	}

	function validarEmail() {
		//Validar campos formulario contacto
		if ( !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test( $("#email").val() ) || $("#email").val() == null || $("#email").val().length == 0 || /^\s+$/.test( $("#email").val() ) ) {
			$("#iconInput1").remove();
			$("#email").parent().removeClass("has-success").addClass("has-warning has-feedback");
			$("#email").parent().append("<span id='iconInput1' class='glyphicon glyphicon-remove-circle form-control-feedback'></span>");		
			return false;
		}
		else{
			$("#iconInput1").remove();
			$("#email").parent().removeClass("has-warning").addClass("has-success has-feedback");
			$("#email").parent().append("<span id='iconInput1' class='glyphicon glyphicon-ok-circle form-control-feedback'></span>");
			return true;
		}
	};

	function validarMensaje() {
		//Validar campos formulario contacto
		if ( $("#message").val() == null || $("#message").val().length == 0 || /^\s+$/.test( $("#message").val() ) ) {
			$("#iconInput3").remove();
			$("#message").parent().removeClass("has-success").addClass("has-warning has-feedback");
			$("#message").parent().append("<span id='iconInput3' class='glyphicon glyphicon-remove-circle form-control-feedback'></span>");		
			return false;
		}
		else{
			$("#iconInput3").remove();
			$("#message").parent().removeClass("has-warning").addClass("has-success has-feedback");
			$("#message").parent().append("<span id='iconInput3' class='glyphicon glyphicon-ok-circle form-control-feedback'></span>");
			return true;
		}
	};

	$("#enviarMensaje").click(function () {
		if( validarNombre() && validarEmail() && validarMensaje() ) {
			$.ajax({
				type: "POST",
				url: "lib/mail.php",
				data: {name: $("#name").val(), email: $("#email").val(), msj: $("#message").val()},
				success: function(response){
					switch(response){
						case "1":
							$("#mensajeAlerta").append('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><i class="glyphicon glyphicon-ok-circle"></i> Mensaje Enviado</div>');
							$("#formContacto")[0].reset();
							$("#iconInput, #iconInput1, #iconInput2, #iconInput3").remove();
							$("#name, #email, #message").parent().removeClass("has-success");
							break;
						case "2":
							$("#mensajeAlerta").append('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><i class="glyphicon glyphicon-remove-circle"></i> El Mensaje no se a podido enviar</div>');
							break;						
					}
				}
			});
		}
		else{
			validarNombre();
			validarEmail();			
			validarMensaje();
			$("#mensajeAlerta").append('<div class="alert alert-dismissible alert-warning" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <i class="glyphicon glyphicon-remove-circle"></i> Hay campos vacios</div>');
		}
	});

});