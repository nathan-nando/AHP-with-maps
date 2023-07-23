import {score} from "../Scores/model";
import {finalScore} from "../FinalScores/model";

export type alternative = {
    id?:string,
    cakupan_rumah?: number,
    aksesibilitas?: string,
    jarak_pemukiman?: number,
    jarak_sungai?: string,
    jarak_tpa?: string,
    latitude?: number,
    longitude?: number,
    name?: string,
    partisipasi_masyarakat?: number,
    timbulan_sampah?: string
    scores?: score
    final_scores?: finalScore
}