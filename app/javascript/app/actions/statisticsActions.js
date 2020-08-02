export const TYPES = {
  FETCH_STATISTICS: 'statistics/FETCH_STATISTICS',
  FETCH_STATISTICS_SUCCESS: 'statistics/FETCH_STATISTICS_SUCCESS',
  TOGGLE_STATISTICS_MODAL: 'statistics/TOGGLE_STATISTICS_MODAL',
}

export const fetchStatistics = () => ({
  type: TYPES.FETCH_STATISTICS,
})

export const fetchStatisticsSuccess = (statistics) => ({
  type: TYPES.FETCH_STATISTICS_SUCCESS,
  payload: statistics,
})

export const toggleStatisticsModal = () => ({
  type: TYPES.TOGGLE_STATISTICS_MODAL,
})
