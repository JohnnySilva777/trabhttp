$(document).ready(function () {
    $("body").tooltip({
        selector: '[data-toggle=tooltip]'
    });
    localStorage.setItem("auth", btoa('dev@fiap.com:qualquercoisa123'))
    localStorage.setItem("user_id", "1")
    user_Id = localStorage.getItem("user_id")
    var clube
    var headers = {
        "Authorization": "Basic " + localStorage.getItem("auth")
    };

    var Clubes = [];
    
    var meusClubes = [];

    var meusTipos = [];

    function carregarMeusClubes(url) {
        $.ajax({
            url: url,
            method: "GET",
            async: false,
            headers,
            beforeSend: function () {
                $("#layoutSidenav_content main").addClass("d-none")
                $(".loading").removeClass("d-none")
            },
            success: function (response) {
                res = response.results
                if(res.length<1 )
                    renderSemClube()
                for (let x in res) {
                    carregarClube(res[x].clube_id)
                    meusClubes.push(res[x])
                }
                if (response.next !== null)
                    carregarMeusClubes(response.next);
            }
        });
    }

    carregarTipos()
    carregarMeusClubes(`https://fiap-clube-api.herokuapp.com/usuarios/${localStorage.getItem("user_id")}/clubes`)

    function carregarTipos() {
        $.ajax({
            "url": `https://fiap-clube-api.herokuapp.com/clubes`,
            "method": "GET",
            headers,
            beforeSend: function () {
                $("#layoutSidenav_content main").addClass("d-none")
                $(".loading").removeClass("d-none")
            },
            success: function (response) {
                res = response.results
                for (let x in res) {
                    meusTipos.push(res[x].tipo)
                }
            }
        });
    }

    function carregarClube(clube_id) {
        $.ajax({
            "url": `https://fiap-clube-api.herokuapp.com/clubes/${clube_id}`,
            "method": "GET",
            headers,
            beforeSend: function () {
                $("#layoutSidenav_content main").addClass("d-none")
                $(".loading").removeClass("d-none")
            },
            success: function (response) {
                res = response
                for (let x in res) {
                    if (x !== localStorage.getItem("user_id")) {
                        Clubes.push(res[x])
                    } else {}
                }
                renderClubes(response);
            }
        })
    }

    $(document).on("click", ".btn-entrar", function () {
        let el = $(this);
        el.addClass("disabled");
        let id = el.data("id");
        $.ajax({
            "url": "https://fiap-clube-api.herokuapp.com/usuarioClubes/",
            "method": "POST",
            "data": {
                clube: id,
                usuario: localStorage.getItem("user_id"),
                ativo: true
            },
            headers,
            success: function (response) {
                alert("Bem vindo ao clube")
                $(".btn-group-" + response.clube).html(renderBtnsHtml(response.id, response.clube))
                el.removeClass("disabled");
            }
        });
    });


    $(document).on("click", ".btn-resenha", function () {
        let el = $(this);
        el.addClass("disabled");
        let id = $(this).data("id");
        alert("ESTOU EM DESENVOLVIMENTO AINDA ;D")
        el.removeClass("disabled");
        // Manda para a tela de resenha do clube
        // window.location = window.location.href + "/" + id
    });


    $(document).on("click", ".btn-sair", function (e) {
        let el = $(this);
        el.addClass("disabled");
        let id = el.data("id");
        let clube = meusClubes.find(x=> x.id == id);
        $.ajax({
            "url": "https://fiap-clube-api.herokuapp.com/usuarioClubes/" + id + "/",
            "method": "DELETE",
            "data": {
                clube: clube.clube_nome,
                usuario: localStorage.getItem("user_id")
            },
            headers,
            success: function (response) {
                alert("O clube fica triste com sua partida, até mais")
                $(".btn-group-" + clube.clube_nome).html(renderBtnEntrar(clube.clube_nome))
                el.removeClass("disabled");
                const removeIndex = meusClubes.findIndex( item => item.id === id );
                meusClubes.splice( removeIndex, 1 );
                if(Object.keys(meusClubes).length > 0)               
                    carregarClube(user_Id);
                else
                    renderSemClube()
            }
        });
    });


    $(document).on("click", ".ver-mais", function (e) {
        let el = $(this);
        el.addClass("disabled");
        let url = el.data("url");
        $.ajax({
            "url": url,
            "method": "GET",
            headers,
            success: function (response) {
                renderClubes(response)
                el.removeClass("disabled");
            }
        });
    });

    function renderSemClube(){ 
        alert("Cadastre um clube primeiro!")
    }

    function renderBtnEntrar(id) {
        return '<button class="btn btn-success btn-entrar fw-bold" type="button" data-id="' + id + '">' +
            '   <i class="fas fa-sign-in-alt d-inline" " data-toggle="tooltip" title="Entrar"></i>' +
            '   <span class="d-none d-sm-block">Entrar para grupo</span>' +
            '</button>';
    }

    function renderBtnsHtml(id, clube) {
        return '<button class="btn btn-outline-info btn-resenha fw-bold" type="button" data-id="' + id + '">' +
            '   <i class="fas fa-quote-right d-inline" " data-toggle="tooltip" title="Resenha"></i>' +
            '   <span class="d-none d-sm-block">Resenha</span>' +
            '</button>' +
            '<button class="btn btn-danger btn-sair fw-bold" type="button" data-clube="' + clube + '" data-id="' + id + '">' +
            '   <i class="fas fa-sign-out-alt d-inline" " data-toggle="tooltip" title="Sair"></i>' +
            '   <span class="d-none d-sm-block">Sair do grupo</span>' +
            '</button>';
    }

    function renderClubes(resp) {
        $(".loading").addClass("d-none")
        $("#layoutSidenav_content main").removeClass("d-none")
        let proximaPagina = resp.next;
        clube = meusClubes.find(x => x.clube_id == resp.id)
        tipo = resp.tipo == "L" ? "Livro" : resp.tipo == "F" ? "Filme" :
            resp.tipo == "A" ? "Anime" : "Jogo"
        let btnEntrar = renderBtnEntrar(clube.id);
        let btnsHtml = '';
        btnEntrar = '';
        btnsHtml = renderBtnsHtml(clube.id, clube.clube_nome)
        html = '' +
            '<div class="container-fluid px-4 ">' +
            '   <div class="row" id="' + clube.id + '">' +
            '       <div class="col-6">' +
            '           <h2 class="fs-3 d-inline">' + clube.clube_nome + '</h2><br>' +
            '           <span class="text-muted">(' + tipo + ')</span>' +
            '           <i class="mt-3 fas fa-info-circle text-primary" data-toggle="tooltip" title="' + resp.descricao + '"></i>' +
            '       </div>' +
            '       <div class="col-4">' +
            '           <div class="btn-group btn-group-' + clube.id + '">' +
            '               ' + btnEntrar +
            '               ' + btnsHtml +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '<hr class="clearfix"></div>';
        $(".div-clubes").append(html)

        if (proximaPagina) {
            $('.ver-mais').removeClass('d-none')
            $('.ver-mais').data('url', proximaPagina)
        } else {
            $('.ver-mais').addClass('d-none')
        }
        $("html, body").animate({
            scrollTop: $(document).height() - 1130
        }, 300);
    }
});