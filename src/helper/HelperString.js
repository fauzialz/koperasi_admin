export default {
    /**
     * @param {string} string - String you give to capitalize.
     */
    toCapital: (string) => {
        string = string
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, function(str){ 
                return str.toUpperCase() 
            })
        return string
    }
}