import axios from "axios";
import { locations } from "../../routes/server";
import { GET_LOCATIONS, GET_ERRORS } from "./types";

export const getLocations = () => dispatch => {
    axios
        .get(`${locations}?size=30`)
        .then(response => {
            const { locations } = response.data;
            dispatch({
                type: GET_LOCATIONS,
                payload: locations
            })
        })
        .catch(error => {
            if (error.message === "Network Error") {
				dispatch({
					type: GET_ERRORS,
					payload: { message: error.message },
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: error.response.data,
				});
			}
        })
}