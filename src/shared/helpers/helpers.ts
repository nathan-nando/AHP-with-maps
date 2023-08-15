export const helpers = () => {
};


export const nameSubCriteria = ["Timbulan Sampah",
    "Jarak TPA",
    "Jarak Pemukiman",
    "Jarak Sungai",
    "Partisipasi Masyarakat",
    "Cakupan Rumah",
    "Aksesibilitas",]
export const titleTable =
    [
        "No",
        "Nama",
        "Timbulan Sampah",
        "Jarak TPA",
        "Jarak Pemukiman",
        "Jarak Sungai",
        "Partisipasi Masyarakat",
        "Cakupan Rumah",
        "Aksesibilitas",
    ]

export const titleTablePoint =
    [
        "No",
        "Timbulan Sampah",
        "Jarak TPA",
        "Jarak Pemukiman",
        "Jarak Sungai",
        "Partisipasi Masyarakat",
        "Cakupan Rumah",
        "Aksesibilitas",
    ]

export const removeUnderScore = (str : string) : string =>{
    return str.replace(/_/g, " ")
}