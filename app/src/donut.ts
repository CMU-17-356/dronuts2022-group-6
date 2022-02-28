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

    if (add) {
        thisDonut.quantity_left += Number(numChange)
    } else {
        thisDonut.quantity_left -= numChange
    }

    await thisDonut.save()

    return new Promise((resolve, reject) => {
        try {
            //console.log(thisDonut)
            resolve(thisDonut)
        } catch (e) {
            console.log('donut change not working')
            reject(e)
        }
    })
}

export { Donut, changeDonutQuantity }
