import {api} from "../../../api/api";
import {endpoint} from "../../../api/endpoint";

class FinalScoreServices{
    getFinalScores(id:string){
        return api.get(`${endpoint.finalScores}/${id}`)
    }

    calculateFinalScores(id:string){
        return api.get(`${endpoint.finalScores}/calculate/${id}`)
    }
}

export const finalScoreServices = new FinalScoreServices()