;(function ($) {
    window.onload = function() {
        let $added_block = '<div class="some-block">Some block</div>'; // Вставляемый блок
        let $figure_coloring = $('.field-items figure'); // Элементы, между которыми надо вставить.
        let $delay = 400; // Задержка перемещения блока при ресайзе.

        add_block($figure_coloring, $added_block);

        let resize_func = delay_before_add_block(function() {
            add_block($figure_coloring, $added_block)
        }, $delay);

        $(window).on('resize', resize_func);

        // Задержка перед запуском функции
        function delay_before_add_block(func, wait, immediate) {
            let timeout;
            return function() {
                let context = this, args = arguments;
                let later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                let callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }

        // Добавление блока после нескольких избражений с сохранением адаптивности
        function add_block($figure_coloring, $added_block) {
            $('.some-block').remove();
            let main_offset = 0, counter = 0;

            $.each($figure_coloring, function (i, elm) {
                let elm_offset = elm.offsetTop;
                if (main_offset !== elm_offset) {
                    main_offset = elm_offset;
                    counter++;

                    // Вставка после 2 строки элементов
                    if (counter === 3) {
                        $(elm).before($added_block)
                    }
                }
            });
        }
    };
}(jQuery)) ;