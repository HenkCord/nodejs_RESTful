module.exports = {
    /**
     * ModelHelpers.options(options)
     * Проверяет и настраивает свойства объекта options:
     * options.limit - количество записей на одной странице
     * options.page - выбранная страница
     * options.offset - начало вывода записей (с 0, количество 30)
     *
     * @param {Object} options
     * @return {Object} options
     */
    options: function (options) {
        //количество записей на одной странице
        options.limit = options.limit >= 0 ? options.limit : 30;
        //страница
        options.page = options.page >= 1 ? options.page : 1;
        //начало вывода записей (с 0, количество 30)
        options.offset = options.offset && options.offset >= 0
            ? options.offset
            : options.limit * options.page - options.limit;

        return options;
    }
};