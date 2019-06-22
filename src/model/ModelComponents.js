export default {

    /**
     * @param {Object} object - Store data in object.
     */
    Store : (object) => {
        let newStore = {
            Name : object.Name,
            Address : object.Address,
            Telephone : object.Telephone,
            Email : object.Email
        }
        return newStore
    }
}