import {api} from "../../api/api";
import {endpoint} from "../../api/endpoint";

type matrix = {}

class CriteriaServices {
    getCriteria() {
        return api.get(endpoint.criteria)
    }

    updateCriteria(payload: matrix) {
        return api.patch(endpoint.criteria, payload)
    }
}

export const criteriaServices = new CriteriaServices();
