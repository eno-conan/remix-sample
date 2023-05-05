import { useState } from "react";
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";

interface IProps {
    initState: boolean;
}


{/* お気に入りに登録されていない場合は、塗りつぶしなしのGoodマークを表示 */ }
export default function GoodButton(props: IProps) {
    const [checked, setChecked] = useState<boolean>(props.initState);
    const switchGoodOrNot = () => {
        setChecked(checked => !checked); //https://qiita.com/penpen22/items/f2924bcf2ffaeb3ea30b
    };
    return <>
        {checked ?
            <button aria-label="BsHandThumbsUpFill" data-testid="BsHandThumbsUpFill">
                <BsHandThumbsUpFill size={"2rem"} onClick={switchGoodOrNot} />
            </button>
            :
            <button aria-label="BsHandThumbsUp" data-testid="BsHandThumbsUp">
                <BsHandThumbsUp size={"2rem"} onClick={switchGoodOrNot} />
            </button>
        }
    </>;
}
