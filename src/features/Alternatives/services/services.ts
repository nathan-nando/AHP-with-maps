import {api} from "../../../api/api";
import {endpoint} from "../../../api/endpoint";
import {alternative} from "../../../domain/Alternatives/model";
import {requestCreateAlternative} from "../../../domain/Alternatives/dto";

export class AlternativeServices{
    getAlternativesByID(id:string) {
        return api.get(`${endpoint.alternative}/collection/${id}`)
    }

    getAlternativeByID(id: string) {
        return api.get(`${endpoint.alternative}/${id}`)
    }

    createAlternative(payload: requestCreateAlternative) {
        return api.post(endpoint.alternative, payload)
    }

    updateAlternative(payload: alternative) {
        return api.patch(endpoint.alternative, payload)
    }

    deleteAlternative(id:string){
        return api.delete(`${endpoint.alternative}/${id}`)
    }
}

export const alternativeServices = new AlternativeServices();