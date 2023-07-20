import {api} from "../../../api/api";
import {endpoint} from "../../../api/endpoint";
import {criteria} from "../../../domain/Criteria/model";

class CriteriaServices {
    getCriteria() {
        return api.get(endpoint.criteria)
    }

    updateCriteria(payload: criteria) {
        return api.patch(endpoint.criteria, payload)
    }

    checkConsistency(){
        return api.get(`${endpoint.criteria}/check`)
    }
}

export const criteriaServices = new CriteriaServices();
