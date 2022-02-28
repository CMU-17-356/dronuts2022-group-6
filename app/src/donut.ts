import { ObjectId } from 'mongoose'
import { DonutModel } from '../schema/donutSchema'

interface Donut {
    name: string
    description: string
    price: number
    quantity_left: number
    weight: number
}

async function changeDonutQuantity(thisDonutID: any, numChange: number, add: boolean): Promise<any> {
    
    let thisDonut = await DonutModel.findById(thisDonutID)

    return new Promise((resolve, reject) => {
        try {
            if (add) {
                thisDonut.quantity_left += numChange
            } else {
                thisDonut.quantity_left -= numChange
            }

            thisDonut.save()
            //console.log(thisDonut)
            resolve(thisDonut)
        } catch (e) {
            console.log('donut change not working')
            reject(e)
        }
    })
}

export { Donut, changeDonutQuantity }
