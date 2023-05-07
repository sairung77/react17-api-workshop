const initialState = {
    students: [],
    isLoading: false,
}

const reducer = (state = initialState, action) => {
    const allStudent = [...state.students];
    switch (action.type) {
        case 'GET_STUDENT_LISTS':
            return {
                ...state,
                students: action.payload
            }
        case 'DEL_STUDENT':
            return {
                ...state,
                students: state.students.filter(item => item.id !== action.payload)
            }
        case 'ADD_STUDENT':
            return {
                ...state,
                students: [action.payload, ...state.students]
            }
        case 'EDIT_SUDENT':
            const indexForEdit = allStudent.findIndex(item => item.id === action.payload.id);
            console.log('index for editing :', indexForEdit);
            allStudent[indexForEdit] = {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email
            }
            return {
                ...state,
                students: allStudent
            }
        case 'LOADING_START':
            return {
                ...state,
                isLoading: true
            }
        case 'LOADING_END':
            return {
                ...state,
                isLoading: false
            }
        default:
            break;
    }
    return state;
}
export default reducer;