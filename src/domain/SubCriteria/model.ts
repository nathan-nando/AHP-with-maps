import {criteria} from "../Criteria/model";

export type subCriteria = {
    timbulan_sampah?: timbulanSampah,
    jarak_tpa?: jarakTPA,
    jarak_pemukiman?: jarakPemukiman,
    jarak_sungai?: jarakSungai,
    partisipasi_masyarakat?: partisipasiMasyarakat,
    cakupan_rumah?: cakupanRumah,
    aksesibilitas?: aksesibilitas
}

export type subCriteriaCR = {
    timbulan_sampah?: boolean,
    jarak_tpa?: boolean,
    jarak_pemukiman?: boolean,
    jarak_sungai?: boolean,
    partisipasi_masyarakat?: boolean,
    cakupan_rumah?: boolean,
    aksesibilitas?: boolean
}

export type timbulanSampah = {
    pairwise:criteria,
    pusat_kota:number,
    daerah_komersil: number
    daerah_perumahan_teratur: number
    industri:number
    jalan:number
    daerah_perumahan_tidak_teratur:number

}

export type jarakTPA = {
    pairwise:criteria,
    pelayanan_intensif: number,
    pelayanan_menengah:number,
    pelayanan_rendah:number
}

export type jarakPemukiman = {
    pairwise:criteria,
    jarak1: number,
    jarak2: number,
    jarak3: number,
    jarak4: number,
    jarak5: number,

}

export type jarakSungai = {
    pairwise:criteria,
    sangat_layak:number,
    layak:number,
    cukup_layak:number,
    kurang_layak:number,
    tidak_layak:number,
}

export type partisipasiMasyarakat = {
    pairwise:criteria,
    partisipasi1:number
    partisipasi2:number
    partisipasi3:number
    partisipasi4:number
    partisipasi5:number
}

export type cakupanRumah = {
    pairwise:criteria,
    cakupan1:number,
    cakupan2:number,
    cakupan3:number,
    cakupan4:number,
    cakupan5:number,
}

export type aksesibilitas = {
    pairwise:criteria,
    sangat_layak:number,
    layak:number,
    tidak_layak:number,
}