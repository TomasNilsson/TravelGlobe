const getStatisticsState = (state) => state.statistics

export const getNumberOfTrips = (state) =>
  getStatisticsState(state).numberOfTrips

export const getNumberOfVisitedCountries = (state) =>
  getStatisticsState(state).numberOfVisitedCountries

export const getNumberOfDaysTravelling = (state) =>
  getStatisticsState(state).numberOfDaysTravelling

export const getNumberOfPlacesLived = (state) =>
  getStatisticsState(state).numberOfPlacesLived

export const getTravelPartnersTopList = (state) =>
  getStatisticsState(state).travelPartnersTopList

export const getIsStatisticsModalOpen = (state) =>
  getStatisticsState(state).isModalOpen
