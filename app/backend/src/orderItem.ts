interface orderItem{
    getSubtotalWeight: () => number
    getSubtotal: () => number
}

function newOrderItem(donutID: string, quantity: number, orderID: string): orderItem{

    return{
        getSubtotalWeight: function (): number{
            return quantity * price
        },
        getSubtotal: function (): number{
            return quantity * price
        }
    }
}