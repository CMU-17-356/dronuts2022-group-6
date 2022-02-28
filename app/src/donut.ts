import { ObjectId } from "mongoose"
import { DonutModel } from "../schema/donutSchema"

interface Donut{
    name: string,
    description: string,
    price: number,
    quantity_left: number
    weight: number
}

async function changeDonutQuantity (thisDonutID: any, numChange: number, add: boolean): Promise<any>{
    const thisDonut = await DonutModel.findById({thisDonutID})

    return new Promise((resolve, reject) => {
        try{
            if (add){
                thisDonut.quantity_left += numChange
            }
            else {
                thisDonut.quantity_left -= numChange
            }
            
            thisDonut.save()
            resolve(thisDonut)
        }
        catch{
            console.log("donut change not working")
            reject("donut change adding bad")
        }
    })

}

export { Donut, changeDonutQuantity}