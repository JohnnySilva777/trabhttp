var headers = {
    "Authorization": "Basic " + btoa(localStorage.getItem("user") + ':' + localStorage.getItem("password"))
};

var mockResult = `{
    "count": 28,
    "next": "https://fiap-clube-api.herokuapp.com/clubes/?page=2",
    "previous": null,
    "results": [
        {
            "id": 1,
            "nome": "Clube do livro",
            "descricao": "Primeiro clube do livro",
            "tipo": "L"
        },
        {
            "id": 2,
            "nome": "A bússola de Ouro",
            "descricao": "Romance inglês de fantasia escrito por Philip Pullman, originalmente publicado em Julho de 1995",
            "tipo": "L"
        },
        {
            "id": 3,
            "nome": "A Origem",
            "descricao": "A Origem foi desenvolvido baseando-se na noção de \\"dividir um espaço de sonhos\\".",
            "tipo": "F"
        },
        {
            "id": 4,
            "nome": "Vinicius Shiguemori Shirakawabe",
            "descricao": "teste",
            "tipo": "L"
        },
        {
            "id": 5,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        },
        {
            "id": 6,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        },
        {
            "id": 7,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        },
        {
            "id": 8,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        },
        {
            "id": 9,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        },
        {
            "id": 10,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        }
    ]
}`;

$(document).ready(function () {

    $("body").tooltip({selector: '[data-toggle=tooltip]'});

    localStorage.setItem("user", "dev")
    localStorage.setItem("password", "dev.123")
    renderClubes(mockResult);

    $.ajax({
        "url": "https://fiap-clube-api.herokuapp.com/clubes",
        "method": "GET",
        headers,
        success: function (response) {
            renderClubes(response)
        }
    });

});

function showModal() {
    $("body").append('<div class="modalWindow"/>');
    $.mobile.showPageLoadingMsg();
    setTimeout('hideModal()', 2000);
}

function hideModal() {
    $(".modalWindow").remove();
    $.mobile.hidePageLoadingMsg();
}

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
    $.ajax({
        "url": url,
        "method": "GET",
        headers,
        success: function (response) {
            renderClubes(response)
        }
    });
    var mockResult2 = `{
    "count": 28,
    "next": null,
    "previous": "https://fiap-clube-api.herokuapp.com/clubes",
    "results": [
        {
            "id": 1,
            "nome": "Clube do livro",
            "descricao": "Primeiro clube do livro",
            "tipo": "L"
        },
        {
            "id": 2,
            "nome": "A bússola de Ouro",
            "descricao": "Romance inglês de fantasia escrito por Philip Pullman, originalmente publicado em Julho de 1995",
            "tipo": "L"
        },
        {
            "id": 3,
            "nome": "A Origem",
            "descricao": "A Origem foi desenvolvido baseando-se na noção de \\"dividir um espaço de sonhos\\".",
            "tipo": "F"
        },
        {
            "id": 4,
            "nome": "Vinicius Shiguemori Shirakawabe",
            "descricao": "teste",
            "tipo": "L"
        },
        {
            "id": 5,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        },
        {
            "id": 6,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        },
        {
            "id": 7,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        },
        {
            "id": 8,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        },
        {
            "id": 9,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        },
        {
            "id": 10,
            "nome": "Clube do Shiguemori",
            "descricao": "Primeiro clube do Shiguemori",
            "tipo": "L"
        }
    ]
}`;
    $("#layoutSidenav_content main").addClass("d-none")
    $(".loading").removeClass("d-none")
    setTimeout(function () {
        $(".loading").addClass("d-none")
        $("#layoutSidenav_content main").removeClass("d-none")
        renderClubes(mockResult2);
    }, 3000);
});

function renderClubes(response) {
    let resp = JSON.parse(response);
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
