import {api} from "../../../api/api";
import {endpoint} from "../../../api/endpoint";

export class CalculateServices{
    fetchPoint(id:string){
        return api.get(`${endpoint.point}/${id}`)
    }

    getScores(id:string){
        return api.get(`${endpoint.scores}/${id}`)
    }

    calculateScores(id:string){
        return api.get(`${endpoint.scores}/calculate/${id}`)
    }
}

export const calculateServices = new CalculateServices();