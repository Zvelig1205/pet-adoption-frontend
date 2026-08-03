import request from "../utils/request";

export function getUnadoptedPets() {

    return request.get(
        "/pets/hall"
    );

}

export function getPetById(id) {

    return request.get(
        `/pets/${id}`
    );

}

export function getMyPets() {

    return request.get(
        "/users/my/pets"
    );

}

export function getMyPetDetail(id) {

    return request.get(
        `/users/my/pets/${id}`
    );

}

export function adoptPet(id) {

    return request.post(
        `/pets/${id}/adopt`
    );

}
export function abandonPet(id) {

    return request.delete(
        `/pets/${id}/adopt`
    );

}

