import {api} from "../../../api/api";
import {endpoint} from "../../../api/endpoint";

class CollectionsServices {
    getCollections() {
        return api.get(endpoint.collection)
    }

    getCollectionByID(id: string) {
        return api.get(`${endpoint.collection}/${id}`)
    }

    createCollections() {
        return api.post(endpoint.collection)
    }

    updateCollections() {
        return api.patch(endpoint.collection)
    }
}

export const collectionServices = new CollectionsServices();