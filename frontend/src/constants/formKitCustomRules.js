import streets from '../jsons files/streets.json'
import streetsWithoutPLchars from '../jsons files/streetsWithoutPLchars.json'

export const formKitStreetRule = (e) => {
  const locationValue = e.value

  const isStreetExist = streets.findIndex(street => street == locationValue.toLowerCase())
  const isStreetWithoutPLcharsExist = streetsWithoutPLchars.findIndex(street => street == locationValue.toLowerCase())

  return isStreetExist !== -1 || isStreetWithoutPLcharsExist !== -1
}