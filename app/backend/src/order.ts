interface order{
    getJSON: () => object
    makePayment: (orderID: string, paymentMethod: string) => object
    cancelOrder: (orderID: string) => boolean
    getGrandTotal: () => Number
}