$(document).ready(function() {



    function dataAno() {
        return new Date().getFullYear();
    }
    $("#data").text(dataAno())

    function cardapiohtml(response) {

        arr = [];

        var concatString = '';
        for (let i = 0; i < response.length; i++) {

            if (!response.categoria) {
                const element = response;

                var converterString = parseFloat(response[i].valorfinal);
                var convertidoMoeda = converterString.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                });

                var a = `<div class="item-mainmenu m-b-36">
                            <div class="flex-w flex-b m-b-3">
                                <a href="#" class="name-item-mainmenu txt21">
                                    ${element[i].nome}
                                </a>

                                <div class="line-item-mainmenu bg3-pattern"></div>

                                <div class="price-item-mainmenu txt22">
                                    ${convertidoMoeda}
                                </div>
                            </div>

                            <span class="info-item-mainmenu txt23">
                                ${response[i].descricao}
                            </span>
                        </div>
                        `

                concatString += a;
            }

        }

        return concatString;

    }

    function cardapio(res) {
        i = 0;

        res.forEach(element => {

            if (element.categoria) {
                var cardapio = `
                    <div class="col-sm-5">
                        <div class="wrap-item-mainmenu p-b-22">
                            <h3 class="tit-mainmenu tit10 p-b-25">${element.categoria}</h3>
                            ${cardapiohtml(element[i++])}	
                        </div>
                    </div>
                    `
            }

            $('#cardapio').append(cardapio);
        });

    }
    // 
    function imagensEspaco(res) {

        res.forEach(el => {
            var img = `
            
                <div class="item-gallery isotope-item bo-rad-10 hov-img-zoom ${el.tipo}">
                    <img src="${el.src}" alt="fotos do estabelecimento" />
                    <div class="overlay-item-gallery trans-0-4 flex-c-m">
                        <a class="btn-show-gallery flex-c-m fa fa-search" href="${el.src}" data-lightbox="gallery"></a>
                    </div>
                </div>
            
            `
            $("#espacoImg").append(img);
        });
        var $topeContainer = $('.isotope-grid');
        $(window).on('load', function() {
            var $grid = $topeContainer.each(function() {

                $(this).isotope({
                    itemSelector: '.isotope-item',
                    percentPosition: true,
                    layoutMode: 'masonry',
                    animationEngine: 'best-available',
                    masonry: {
                        columnWidth: '.isotope-item'
                    },
                    // initLayout: false,
                });

            });

            // $grid.isotope('on', 'arrangeComplete');
            // $grid.isotope();

        });

    };



    $.getJSON('./imagens.json', (res) => {
        imagensEspaco(res);
    });
    $.getJSON('./produtos.json', (res) => {
        cardapio(res)
    });

    function iniciarIsotope() {
        var $topeContainer = $('.isotope-grid');
        var $grid = $topeContainer.each(function() {

            $(this).isotope({
                itemSelector: '.isotope-item',
                percentPosition: true,
                layoutMode: 'masonry',
                animationEngine: 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                },
                initLayout: false,
            });

        });

        $grid.on('arrangeComplete', function(item) {

            // console.log(item);
        });
        return $grid.isotope();
    }


});