import axios from "axios";

const commentActions = {

    addComment: (data) => { // objeto con comentario nuevo y id del itinerario

        const token = localStorage.getItem('token');

        return async (dispatch, getState) => {

            if (data.comment !== '') {

                // const res = await axios.post('http://localhost:8000/api/tineraries/comment', { data }, {
                //     headers: {
                //         'Authorization': 'Bearer ' + token
                //     }
                // })
                const res = await axios.post('https://mytinerary-backend-aybar.herokuapp.com/api/tineraries/comment', { data }, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                
                return res
            }

            // else {
            //     dispatch({
            //         type: 'message',
            //         payload: {
            //             view: true,
            //             message: 'ingresa un comentario para guardarlo',
            //             success: false
            //         }
            //     })
            // }
        }
    },

    removeComment: (id) => { // id del comentario a eliminar

        const token = localStorage.getItem('token');

        return async (dispatch, getState) => {

            // const res = await axios.post(`http://localhost:8000/api/tineraries/comment/${id}`, {}, {
            //     headers: {
            //         'Authorization': 'Bearer ' + token
            //     }

            // })
            const res = await axios.post(`https://mytinerary-backend-aybar.herokuapp.com/api/tineraries/comment/${id}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }

            })
            
            return res
        }
    },

    modifyComment: (data) => { // objeto con comentario nuevo y id del comentario

        const token = localStorage.getItem('token');

        return async (dispatch, getState) => {

            // const res = await axios.put('http://localhost:8000/api/tineraries/comment', { data }, {
            //     headers: {
            //         'Authorization': 'Bearer ' + token
            //     }
            // })
            const res = await axios.put('https://mytinerary-backend-aybar.herokuapp.com/api/tineraries/comment', { data }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            
            return res
        }
    },

}

export default commentActions;