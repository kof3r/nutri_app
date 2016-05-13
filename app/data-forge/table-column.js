/**
 * Created by gordan on 13.05.16..
 */

module.exports = [function() {

    class TableColumn{
        constructor(header, filter) {
            this.header = header;
            this.filter = filter;
        }
    }

    return TableColumn;
}];