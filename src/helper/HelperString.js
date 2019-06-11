export default {
    toCapital: (string) => {
        string = string
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, function(str){ 
                return str.toUpperCase() 
            })
        return string
    }
}