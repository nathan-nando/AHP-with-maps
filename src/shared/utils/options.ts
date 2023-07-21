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
    {value: "jaringan jalan", text: "Jaringan Jalan"},
    {value: "perumahan", text: "Perumahan"},
    {value: "fasilitas komersial", text: "Fasilitas Komersial"},
    {value: "fasilitas Umum", text: "Fasilitas Umum"},
    {value: "fasilitas Sosial", text: "Fasilitas Sosial"},
    {value: "ruang Terbuka", text: "Ruang Terbuka"},
];

export const optionJarakSungai: inputOption[] = [
    {
        value: "",
        text: "Silahkan pilih keadaan jarak sungai",
        selected: true,
        disabled: true,
    },
    {
        value: "lokasi memenuhi peli banjir",
        text: "Lokasi memenuhi peli banjir",
    },
    {
        value: "lokasi memenuhi sebagian peli banjir",
        text: "Lokasi memenuhi sebagian peli banjir",
    },
    {
        value: "lokasi tidak memenuhi peli banjir",
        text: "Lokasi tidak memenuhi peli banjir",
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
        value: "Alternatif berada di jangkauan layanan TPA",
        text: "Alternatif berada di jangkauan layanan TPA",
    },
    {
        value: "Alternatif berada di batas terjauh jangkauan layanan TPA",
        text: "Alternatif berada di batas terjauh jangkauan layanan TPA",
    },
    {
        value: "Alternatif tidak berada di jangkauan TPA",
        text: "Alternatif tidak berada di jangkauan TPA",
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
        value: "Kondisi jalan bagus dan bisa dilewati kendaraan pengangkut sampah",
        text: "Kondisi jalan bagus dan bisa dilewati kendaraan pengangkut sampah",
    },
    {
        value:
            "Kondisi jalan bagus, tetapi tidak bisa dilewati kendaraan pengangkut sampah atau jalan tidak bagus, tetapi bisa dilewati kendaraan pengangkut sampah",
        text: "Kondisi jalan bagus, tetapi tidak bisa dilewati kendaraan pengangkut sampah atau jalan tidak bagus, tetapi bisa dilewati kendaraan pengangkut sampah",
    },
    {
        value:
            "Kondisi jalan tidak bagus dan tidak bisa dilewati kendaraan pengangkut sampah",
        text: "Kondisi jalan tidak bagus dan tidak bisa dilewati kendaraan pengangkut sampah",
    },
];