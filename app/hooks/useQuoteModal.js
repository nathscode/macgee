import { useReducer } from "react"
import machines from "../data/machines.json"

const initialState = {
	show: false,
	data: {
		type: "",
		id: "",
		fullname: "",
		email: "",
		message: "",
		title: "",
	},
	isLoading: false,
	hasSelectedProduct: false,
}

function reducer(state, action) {
	switch (action.type) {
		case "SHOW_MODAL":
			return { ...state, show: true }
		case "HIDE_MODAL":
			return { ...state, show: false }
		case "SET_TYPE":
			return { ...state, data: { ...state.data, type: action.payload } }
		case "SET_ID":
			return { ...state, data: { ...state.data, id: action.payload } }
		case "SET_IS_LOADING":
			return { ...state, isLoading: true }
		case "UNSET_IS_LOADING":
			return { ...state, isLoading: false }
		case "SET_EMAIL":
			return { ...state, data: { ...state.data, email: action.payload } }
		case "SET_FULLNAME":
			return { ...state, data: { ...state.data, fullname: action.payload } }
		case "SET_MESSAGE":
			return { ...state, data: { ...state.data, message: action.payload } }
		case "SHOW_MODAL_WITH_PRODUCT":
			return {
				...state,
				hasSelectedProduct: true,
				show: true,
				data: { ...state.data, id: action.payload.id, type: action.payload.type, title: action.payload.title },
			}
		case "RESET":
			return initialState
		default:
			return state
	}
}

function useQuoteModal() {
	const [state, dispatch] = useReducer(reducer, initialState)

	return {
		quoteModalState: state.show,
		data: state.data,
		isLoading: state.isLoading,
		hasSelectedProduct: state.hasSelectedProduct,
		quoteModalDispatch: dispatch,
		hideModal: () => dispatch({ type: "HIDE_MODAL" }),
		showModal: () => dispatch({ type: "SHOW_MODAL" }),
		setType: (e) => dispatch({ type: "SET_TYPE", payload: e.target.value }),
		setId: (e) => dispatch({ type: "SET_ID", payload: e.target.value }),
		setEmail: (e) => dispatch({ type: "SET_EMAIL", payload: e.target.value }),
		setFullname: (e) => dispatch({ type: "SET_FULLNAME", payload: e.target.value }),
		setMessage: (e) => dispatch({ type: "SET_MESSAGE", payload: e.target.value }),
		setIsLoading: () => dispatch({ type: "SET_IS_LOADING" }),
		unsetIsLoading: () => dispatch({ type: "UNSET_IS_LOADING" }),
		resetModal: () => dispatch({ type: "RESET" }),
		showModalWithProduct: (id, type, title) => dispatch({ type: "SHOW_MODAL_WITH_PRODUCT", payload: { id, type, title } }),
	}
}

export default useQuoteModal
