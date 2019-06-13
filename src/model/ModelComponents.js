class StoreModel {
    /**
     * @param {Object} object - Store data in object.
     * */
    constructor(object) {
        this.Name = object.Name
        this.Address = object.Address
        this.Telephone = object.Telephone
        this.Email = object.Email
    }
}

/**
 * @param {Object} object - Store data in object.
 */
var storeModel = (object) => {
    let newStore = {
        Name : object.Name,
        Address : object.Address,
        Telephone : object.Telephone,
        Email : object.Email
    }
    return newStore
}

export {
    StoreModel,
    storeModel,
}