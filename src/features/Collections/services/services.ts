import {api} from "../../../api/api";
import {endpoint} from "../../../api/endpoint";
import {requestCreateCollection} from "../../../domain/Collections/dto";
import {collection} from "../../../domain/Collections/model";

class CollectionsServices {
    getCollections() {
        return api.get(endpoint.collection)
    }

    getCollectionByID(id: string) {
        return api.get(`${endpoint.collection}/${id}`)
    }

    createCollections(payload: requestCreateCollection) {
        return api.post(endpoint.collection, payload)
    }

    updateCollections(payload: collection) {
        return api.patch(endpoint.collection, payload)
    }

    deleteCollection(id:string){
        return api.delete(`${endpoint.collection}/${id}`)
    }
}

export const collectionServices = new CollectionsServices();