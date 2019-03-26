export default {
    pushObjBulk: (objList, key, value) => {
        for(var i = 0; i < objList.length; i++) {
            objList[0][key] = value
            if(objList[i].Children.length > 0){
                for(var j = 0; j < objList[i].Children.length; j++) {
                    objList[i].Children[j][key] = value
                }
            }
        }
        return objList
    }
}