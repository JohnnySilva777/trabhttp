var headers = {
    "Authorization": "Basic " + btoa(localStorage.getItem("user") + ':' + localStorage.getItem("password"))
};

$(document).ready(function () {

    $("body").tooltip({selector: '[data-toggle=tooltip]'});

    localStorage.setItem("user", "dev")
    localStorage.setItem("password", "dev.123")

    $.ajax({
        "url": "https://fiap-clube-api.herokuapp.com/clubes",
        "method": "GET",
        headers,
        success: function (response) {
            renderClubes(response)
        }
    });

});

$(document).on("click", ".btn-login", function () {
    let id = $(this).data("id");
    console.log(id);
    // $.ajax({
    //     "url": "https://fiap-clube-api.herokuapp.com/clubes",
    //     "method": "GET",
    //     headers,
    //     success: function (response) {
    //         renderClubes(response)
    //     }
    // });
});


$(document).on("click", ".ver-mais", function () {
    let url = $(this).data("url");
    $("#layoutSidenav_content main").addClass("d-none")
    $(".loading").removeClass("d-none")

    $.ajax({
        "url": url,
        "method": "GET",
        headers,
        success: function (response) {
            setTimeout(function () {
                $(".loading").addClass("d-none")
                $("#layoutSidenav_content main").removeClass("d-none")
                renderClubes(response)
            }, 1);
        }
    });

});

function renderClubes(resp) {
    let proximaPagina = resp.next;
    for (var x in resp.results) {
        clube = resp.results[x];
        tipo = 'livro'
        if (clube.tipo === 'F') {
            tipo = 'filme'
        }
        html = '' +
            '<div class="container-fluid px-4">' +
            '   <div class="row">' +
            '       <div class="col-6">' +
            '           <h2 class="fs-3 d-inline">' + clube.nome + '</h2><br>' +
            '           <span class="text-muted">(' + tipo + ')</span>' +
            '           <i class="mt-3 fas fa-info-circle text-primary" data-toggle="tooltip" title="' + clube.descricao + '"></i>' +
            '       </div>' +
            '       <div class="col-4">' +
            '           <button class="m-3 btn btn-success btn-login fw-bold" type="button" data-id="' + clube.id + '">' +
            '               <i class="fas fa-sign-in-alt d-inline" " data-toggle="tooltip" title="Entrar"></i>' +
            '               <span class="d-none d-sm-block">Entrar para grupo</span>' +
            '           </button>' +
            '       </div>' +
            '   </div>' +
            '</div>';
        $(".div-clubes").append(html)
    }

    if (proximaPagina) {
        $('.ver-mais').removeClass('d-none')
        $('.ver-mais').data('url', proximaPagina)
    } else {
        $('.ver-mais').addClass('d-none')
    }

}
