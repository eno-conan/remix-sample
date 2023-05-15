import { V2_MetaFunction } from '@remix-run/node';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const meta: V2_MetaFunction = () => [{ title: "一覧表示" }];
export default function List() {

    const [displayWay, setDisplayWay] = useState<number>(0);

    const items = [
        {
            id: 1,
            title: 'Item 1',
            description: 'Description of Item 1',
            imageUrl: 'https://placekitten.com/100/100',
        },
        {
            id: 2,
            title: 'Item 2',
            description: 'Description of Item 2',
            imageUrl: 'https://placekitten.com/100/100',
        },
        {
            id: 3,
            title: 'Item 3',
            description: 'Description of Item 2',
            imageUrl: 'https://placekitten.com/100/100',
        },
        {
            id: 4,
            title: 'Item 2',
            description: 'Description of Item 2',
            imageUrl: 'https://placekitten.com/100/100',
        },
        {
            id: 5,
            title: 'Item 2',
            description: 'Description of Item 2',
            imageUrl: 'https://placekitten.com/100/100',
        },
        {
            id: 6,
            title: 'Item 2',
            description: 'Description of Item 2',
            imageUrl: 'https://placekitten.com/100/100',
        },
        {
            id: 7,
            title: 'Item 2',
            description: 'Description of Item 2',
            imageUrl: 'https://placekitten.com/100/100',
        },
        // 他のアイテムをここに追加
    ];

    const switchDisplayWay = () => {
        if (displayWay === 0) {
            setDisplayWay(1);
        } else {
            setDisplayWay(0);
        }
    }

    return (
        <>
            <main className="bg-gray-100 sm:items-center sm:justify-center mt-20 pb-10">
                <button className="mt-4 mx-4 text-xl bg-green-300" onClick={() => switchDisplayWay()}>表示形式切り替え</button>
                <div className="mt-4 mx-4" onClick={() => switchDisplayWay()}>画像と説明 / 画像のみ に切り替えができます</div>
                {/* TODO:切り替えるときにアニメーションとか入れたい */}
                {displayWay === 0 ?
                    <div className="grid grid-cols-3 gap-4 mt-4 mx-4">
                        {items.slice(0, 20).map((item) => (
                            <Link key={item.id} to={`/`}>
                                <div className="flex items-center bg-white shadow-md p-4 cursor-pointer">
                                    <div className="w-20 mr-4">
                                        <img src={item.imageUrl} alt="Item" className="w-full rounded-md" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-bold text-lg mb-2">{item.title}</div>
                                        <div className="text-gray-500">{item.description}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    :
                    <div className="grid grid-cols-6 gap-2 mt-4 mx-4">
                        {items.slice(0, 20).map((item) => (
                            <Link key={item.id} to={`/`}>
                                <div className="w-full mr-4">
                                    <img src={item.imageUrl} alt="Item" className="w-full rounded-md" />
                                </div>
                            </Link>
                        ))}
                    </div>
                }
            </main>
        </>
    );

}