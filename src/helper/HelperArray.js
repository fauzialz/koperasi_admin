export default {
    seqArray : (length, margin = 0) => {
        if (!length) {
            return
        }
        let arr = []
        for (let i = 0; i < length; i++){
            arr.push(i+margin)
        }
        return arr
    },
    seqArrayAdvanced : (length, first = 0, delta = 1) => {
        if (!length) {
            return
        }
        let arr = []
        let number = first
        for (let i = 0; i < length; i++) {
            arr.push(number)
            number += delta
        }
        return arr
    }
}