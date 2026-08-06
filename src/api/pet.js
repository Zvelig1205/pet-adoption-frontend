import request from "../utils/request";

export function getUnadoptedPets(page, size) {

    return request.get(
        "/pets/hall",
        {
            params: {
                page: page,
                size: size
            }
        }
    );

}

export function getPetById(id) {

    return request.get(
        `/pets/${id}`
    );

}

export function getMyPets(page, size) {

    return request.get(
        "/users/my/pets",
        {
            params: {
                page: page,
                size: size
            }
        }
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

