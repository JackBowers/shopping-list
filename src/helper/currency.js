const formatPenceAsString = function(price){

    let pounds = "0"
    let pence = "00"

    if (price) {
        let number = price.toString();
        if (price < 10) {
            pence = "0" + number
        } else if (price < 100) {
            pence = number
        } else {
            pounds = number.slice(0, -2);
            pence = number.slice(-2);
        }
    }
    return `£${pounds}.${pence}`
}
export {formatPenceAsString}