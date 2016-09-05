module.exports = {
    /**
     * ModelHelpers.options(options)
     * Проверяет и настраивает свойства объекта options:
     * options.limit - количество записей на одной странице
     * options.page - выбранная страница
     * options.offset - начало вывода записей (с 0, количество 30)
     * options.column - выводимые колонки записей (по умолчанию: *)
     * @param {Object} options
     * @return {Object} options
     * @param {Function} cb
     */
    options: function (options, cb) {
        //количество записей на одной странице
        options.limit = options.limit >= 0 ? options.limit : 30;
        //страница
        options.page = options.page >= 1 ? options.page : 1;
        //начало вывода записей (с 0, количество 30)
        options.offset = options.offset && options.offset >= 0
            ? options.offset
            : options.limit * options.page - options.limit;
        //Разрешонные для отоборажения столбцы
        options.column = options.column ? options.column : "*";
        //Вызов функции
        options.callback = typeof cb == "function" ? cb : function(){};
        return options;
    }
};