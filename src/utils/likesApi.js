import tokenService from "./tokenService";

const BASE_URL = "/api/"

export function create(postId) {
    return fetch(`${BASE_URL}posts/${postsId}/likes`, {
        method: 'POST',
        headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			//this is how we grab the token from local storage
		}
    }).then(res => {
        if(res.ok) return res.json()
        throw new Error('Error creating a like, check server terminal')
    })
}

export function deleteLike(likeId) {
    return fetch(`likes/${likeId}`, {
        method: 'DELETE',
        headers: {
			Authorization: "Bearer " + tokenService.getToken() 
			//this is how we grab the token from local storage
		}

        
    }).then(res => {
        if(res.ok) return res.json()
        throw new Error('Error deleting a like, check server terminal')
    })
}