import { V2_MetaFunction } from '@remix-run/node';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const meta: V2_MetaFunction = () => [{ title: "一覧表示" }];
export default function List() {

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

    return (
        <>
            <main className="bg-gray-100 sm:items-center sm:justify-center mt-20 pb-10">


                {/* TODO:切り替えるときにアニメーションとか入れたい */}
                <div className="grid grid-cols-2 gap-4 mt-2 mx-2">
                    {items.slice(0, 20).map((item) => (
                        <Link key={item.id} to={`/`}>
                            <div className="flex items-center bg-white shadow-md p-2 cursor-pointer mx-2">
                                <div className="flex-1">
                                    <img src={item.imageUrl} alt="Item" className="w-full rounded-md" />
                                </div>
                                <div className="hidden md:block ml-2">
                                    <div className="font-bold text-lg mb-2">{item.title}</div>
                                    <div className="text-gray-500">{item.description}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );

}