$(document).ready(function () {
    $("#layoutSidenav_content main").addClass("d-none")
    $(".loading").removeClass("d-none")
    $("body").tooltip({selector: '[data-toggle=tooltip]'});
    localStorage.setItem("auth", btoa('dev:dev.123'))
    localStorage.setItem("user_id", "1")

    var headers = {
        "Authorization": "Basic " + localStorage.getItem("auth")
    };

    carregarResenhas();

    function carregarResenhas() {
        var url = new URL(window.location.href);
        var idResenha = url.searchParams.get("grupo");

        $.ajax({
            "url": "https://fiap-clube-api.herokuapp.com/clube/"+ idResenha +"/stories/",
            "method": "GET",
            headers,
            success: function (response) {
                renderResenhas(response)
            }
        });
    }

    function renderResenhas(resp) {
        let IdUserLogado = localStorage.getItem("user_id")
        $(".loading").addClass("d-none")
        $("#layoutSidenav_content main").removeClass("d-none")
        console.log(IdUserLogado);
        console.log(IdUserLogado);
        for (var x in resp.results) {
            resenha = resp.results[x];
            if(resenha.usuario_id == IdUserLogado){
                html = '' +
                    '<div class="container-resenha darker">' +
                    '<p>' + resenha.usuario_nome + '</p>' +
                    '<p>' + resenha.texto + '</p>' +
                    '<span className="time-left">' + resenha.data + '</span>' +
                    '</div>';
            } else {
                html = '' +
                    '<div class="container-resenha">' +
                    '<p>' + resenha.usuario_nome + '</p>' +
                    '<p>' + resenha.texto + '</p>' +
                    '<span className="time-left">' + resenha.data + '</span>' +
                    '</div>';
            }

            $(".div-resenhas").append(html)
        }

        $("html, body").animate({scrollTop: $(document).height() - 1130}, 300);
    }

    $(document).on("click", ".enviarResenha", function () {
        var url = new URL(window.location.href);
        var idGrupo = url.searchParams.get("grupo");
        var todayDate = new Date().toISOString().slice(0, 10);
        console.log(todayDate);
        $.ajax({
            "url": "https://fiap-clube-api.herokuapp.com/stories/",
            "method": "POST",
            headers,
            "data": {
                clube: idGrupo,
                usuario: localStorage.getItem("user_id"),
                texto: $('#escreverResenha').val(),
                data: todayDate,
            },
            beforeSend: function () {
                $("#layoutSidenav_content main").addClass("d-none")
                $(".loading").removeClass("d-none")
            },
            success: function (response) {
                window.location = window.location.href
            }
        });
    });
});
