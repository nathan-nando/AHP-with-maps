export type inputOption = {
    value: string
    text: string
    selected?: boolean
    disabled?: boolean
}

export const optionTimbulanSampah: inputOption[] = [
    {
        value: "",
        text: "Silahkan pilih timbulan sampah",
        selected: true,
        disabled: true,
    },
    {value: "daerah di jalan protokol pusat kota", text: "Daerah di Jalan Protokol/ Pusat kota"},
    {value: "daerah komersil", text: "Daerah Komersil"},
    {value: "daerah perumahan teratur", text: "Daerah Perumahan Teratur"},
    {value: "daerah industri", text: "Daerah Industri"},
    {value: "jalan taman dan hutan kota", text: "Jalan, Taman, dan Hutan Kota"},
    {value: "daerah perumahan tidak teratur", text: "Daerah Perumahan Tidak Teratur"},
];

export const optionJarakSungai: inputOption[] = [
    {
        value: "",
        text: "Silahkan pilih keadaan jarak sungai",
        selected: true,
        disabled: true,
    },
    {
        value: "sangat layak",
        text: "Sangat Layak",
    },
    {
        value: "layak",
        text: "Layak",
    },
    {
        value: "cukup layak",
        text: "Cukup Layak",
    },
    {
        value: "kurang layak",
        text: "Kurang Layak",
    },
    {
        value: "tidak layak",
        text: "Tidak Layak",
    },
];

export const optionJarakTPA = [
    {
        value: "",
        text: "Silahkan pilih jarak alternatif menuju TPA",
        selected: true,
        disabled: true,
    },
    {
        value: "pelayanan intensif",
        text: "Pelayanan intensif",
    },
    {
        value: "pelayanan menengah",
        text: "Pelayanan menengah",
    },
    {
        value: "pelayanan rendah",
        text: "Pelayanan rendah",
    },
];

export const optionAksesibilitas: inputOption[] = [
    {
        value: "",
        text: "Silahkan pilih aksesibilitas",
        selected: true,
        disabled: true,
    },
    {
        value: "sangat layak",
        text: "Sangat Layak",
    },
    {
        value:
            "layak",
        text: "Layak",
    },
    {
        value:
            "tidak layak",
        text: "Tidak Layak",
    },
];