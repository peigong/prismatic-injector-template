uiCore.filter("objectSort", function() {
    var listSort = function(list, field) {
        if (list == undefined) {
            return
        }
        ;
        for (var i = 0; i < list.length - 1; i++) {
            for (var j = 0; j < list.length - i - 1; j++) {
                if (list[j][field] > list[j + 1][field]) {
                    var temp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = temp;
                }
            }
        }
        return list;
    }
    ;
    return listSort;
});
