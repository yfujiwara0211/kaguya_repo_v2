'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation"; // 追加

import ModanOffice from "./modan_office_cordinate.png";

const Recommend = () => {
    const [id, setId] = useState(null);
    const [category, setCategory] = useState(null);
    const router = useRouter(); // 追加

    // idとcategoryのセットアップはここで行う

    const handleItemClick = (id, category) => {
        setId(id);
        setCategory(category);
        console.log(id, category);
        // ここでページ遷移
        router.push(`/login/home/recommend/list?id=${id}&category=${category}`);
    };

    return (
        <div className='flex-1'>
            <div className='my-4 items-center justify-between mx-auto max-w-4xl'>
                <div className='m-2'>
                  <div className='flex items-center justify-between font-extrabold'>
                    <div className='m-2 text-2xl '>
                        <h1>レコメンドオフィスイメージ</h1>
                        <div>モダンオフィスコーディネート</div>
                    </div>
                  </div>
                  <div className='flex w-full h-full justify-between mx-auto'>
                      <div className='w-2/3 h-full'>
                          <div className='m-2'>
                              <Image src={ModanOffice} alt="ModanOffice" className='w-full rounded-lg' />
                          </div>
                      </div>
                      <div className='w-1/3 h-full'>
                        <div className='m-2'>
                        <div className='grid grid-cols-2 grid-rows-4 gap-6'>
                            <div onClick={() => handleItemClick(1, '執務室用デスク')} className='bg-gray-200 hover:bg-gray-400 hover:text-white py-2 sm:py-6 md:py-10 lg:py-12 rounded-lg flex items-center justify-center'>
                                <div className='text-center'>執務室<br />デスク</div>
                            </div>
                            <div onClick={() => handleItemClick(2, '執務室用チェア')} className='bg-gray-200 hover:bg-gray-400 hover:text-white py-2 sm:py-6 md:py-10 lg:py-12 rounded-lg flex items-center justify-center'>
                                <div className='text-center'>執務室<br />チェア</div>
                            </div>
                            <div onClick={() => handleItemClick(3, '会議室用デスク')} className='bg-gray-200 hover:bg-gray-400 hover:text-white py-2 sm:py-6 md:py-10 lg:py-12 rounded-lg flex items-center justify-center'>
                                <div className='text-center'>会議室<br />デスク</div>
                            </div>
                            <div onClick={() => handleItemClick(4, '会議室用デスク')} className='bg-gray-200 hover:bg-gray-400 hover:text-white py-2 sm:py-6 md:py-10 lg:py-12 rounded-lg flex items-center justify-center'>
                                <div className='text-center'>会議用<br />チェア</div>
                            </div>
                            <div onClick={() => handleItemClick(5, 'テレブース')} className='bg-gray-200 hover:bg-gray-400 hover:text-white py-2 sm:py-6 md:py-10 lg:py-12 rounded-lg flex items-center justify-center'>
                                <div className='text-center'>テレブース</div>
                            </div>
                            <div onClick={() => handleItemClick(6, 'カフェブース')} className='bg-gray-200 hover:bg-gray-400 hover:text-white py-2 sm:py-6 md:py-10 lg:py-12 rounded-lg flex items-center justify-center'>
                                <div className='text-center'>カフェブース</div>
                            </div>
                            <div onClick={() => handleItemClick(7, 'キャビネット')} className='bg-gray-200 hover:bg-gray-400 hover:text-white py-2 sm:py-6 md:py-10 lg:py-12 rounded-lg flex items-center justify-center'>
                                <div className='text-center'>キャビネット</div>
                            </div>
                            <div onClick={() => handleItemClick(8, '会議スペース')} className='bg-gray-200 hover:bg-gray-400 hover:text-white py-2 sm:py-6 md:py-10 lg:py-12 rounded-lg flex items-center justify-center'>
                                <div className='text-center'>会議スペース</div>
                            </div>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default Recommend;
