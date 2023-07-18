import {FC} from "react";
import {Image} from "react-bootstrap";
import loading from "../../../assets/img/loading.gif"

type Props = {
    width?: number;
    height?: number;
}
export const Loading: FC = ({width = 200, height = 200,}: Props) => {
    return <Image src={loading} width={width} height={height}/>
}