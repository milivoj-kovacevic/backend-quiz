import makes from './constants'

export const validateVehicle = (vehicle) => {
    if (!makes[vehicle.make]) {
        return `Invalid vehicle make: ${vehicle.make}`
    }
    if (!makes[vehicle.make].includes(vehicle.model)) {
        return `Invalid make [${vehicle.model}] for model [${vehicle.model}]`
    }
    return null
}