import {api} from "../../../api/api";
import {endpoint} from "../../../api/endpoint";
import {subCriteria} from "../../../domain/SubCriteria/model";

class SubCriteriaServices{
    getSubCriteria(){
        return api.get(endpoint.subCriteria)
    }

    updateSubCriteria(payload:subCriteria){
        return api.patch(endpoint.subCriteria, payload)
    }

    checkConsistencySubCriteria(mode:string){
        return api.get(`${endpoint.subCriteria}/check/${mode}"`)
    }
}

export const subCriteriaServices = new SubCriteriaServices();