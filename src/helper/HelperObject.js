export default {
    /**
     * @param {Object[]} objList - The list of object that you want to modify.
     * @param {string} key - The object key that you want to change it value.
     * @param {(string|number|boolean)} value - The value you want to inject to selected key.
     * @returns {Object[]} - Modified list of object from objList.
     */
    pushObjBulk: (objList, key, value) => {
        for(var i = 0; i < objList.length; i++) {
            objList[i][key] = value
            if(objList[i].Children.length > 0){
                for(var j = 0; j < objList[i].Children.length; j++) {
                    objList[i].Children[j][key] = value
                }
            }
        }
        return objList
    },

    /**
     * @param {Object} obj - Object to get all the keys.
     */
    getObjKeys: (obj) => {
        if ( !obj ) {
            return []
        }
        var keys = []
        for (var key in obj) {
            keys.push(key)
        }
        return keys
    },
}