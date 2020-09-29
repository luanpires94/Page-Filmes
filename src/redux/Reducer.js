const SET_MOVIES = './SET_MOVIES';
const SET_SERIES = './SET_SERIES';

export const initialState = {
    results: [],
    tv: [],
};

// Reducer
export default function (state = initialState, action) {
	switch (action.type) {
	case SET_MOVIES:
        return {...state,
            results: action.info,
        }
	case SET_SERIES:
        return {...state,
            tv: action.info,
        }
	default:
		return state;
	}
}

export const updateMovies = info => {
  return {
    type: SET_MOVIES,
    info: info,
  }
}

export const updateSeries = info => {
  return {
    type: SET_SERIES,
    info: info,
  }
}