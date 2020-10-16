const getAddressString = (addressComponents, formattedAddress) => {
  // Use addressComponents to return a formatted address that includes less information than formattedAddress from the API
  const addressComponentsToInclude = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    postal_town: 'long_name',
  }
  const streetNumberBeforeAddress = !isNaN(formattedAddress.charAt(0))
  const sortOrder = streetNumberBeforeAddress
    ? ['street_number', 'route', 'locality', 'postal_town']
    : ['route', 'street_number', 'locality', 'postal_town']

  const address = addressComponents
    .sort(
      (a, b) => sortOrder.indexOf(a.types[0]) - sortOrder.indexOf(b.types[0])
    )
    .map(
      (addressComponent) =>
        addressComponent[addressComponentsToInclude[addressComponent.types[0]]]
    )
    .filter(Boolean)

  return address.length > 2
    ? address.slice(0, -1).join(' ') + ', ' + address.slice(-1)
    : address.join(', ')
}

export default getAddressString
