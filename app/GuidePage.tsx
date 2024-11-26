'use client'
import {useEffect, useState} from "react";
import Image from 'next/image'


export function GuidePage() {
  const [isIOS, setIsIOS] = useState(false)
  const [isChrome, setIsChrome] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
    setIsChrome(/CriOS/.test(navigator.userAgent));
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);
  return (
      <div className="bg-[#ffffff] flex flex-col gap-0 items-start justify-start relative overflow-hidden">
        <div className="bg-[#ffffff] pt-10 pb-12 flex flex-col gap-8 items-center justify-start self-stretch shrink-0 relative">
          {/* Title Section */}
          <div className="pr-5 pl-5 flex flex-col gap-8 items-start justify-start self-stretch shrink-0 relative">
            <div
                className="text-theme-ink-dark text-center font-heading-title-1-2832-font-family text-heading-title-1-2832-font-size leading-heading-title-1-2832-line-height font-heading-title-1-2832-font-weight relative">
              홈화면에 앱을 추가하세요!
            </div>
          </div>

          {/* Cards Section */}
          <div className="pr-5 pl-5 flex flex-col gap-5 items-center justify-center self-stretch shrink-0 relative">
            {/* Card 1 */}
            <div
                className="bg-[#ffffff] rounded-[20px] p-5 flex flex-col gap-3 items-center justify-start self-stretch shrink-0 relative"
                style={{
                  boxShadow: "0px 0px 2px 0px rgba(79, 94, 113, 0.12), 0px 2px 4px 0px rgba(79, 94, 113, 0.11), 0px 4px 8px 0px rgba(79, 94, 113, 0.1)"
                }}
            >
              <div className="flex flex-row gap-2 items-center justify-start self-stretch shrink-0 relative">
                <div
                    className="bg-theme-product-light rounded-[99px] p-2.5 flex flex-col gap-2.5 items-center justify-center shrink-0 w-7 h-7 relative">
                  <div
                      className="text-theme-product-normal text-center font-text-normal-bold-1420-font-family text-text-normal-bold-1420-font-size leading-text-normal-bold-1420-line-height font-text-normal-bold-1420-font-weight relative self-stretch flex items-start justify-start">
                    1
                  </div>
                </div>
                <span className="title-span">브라우저 {isChrome ? '상단' : '하단'}에 있는 <b>공유 버튼</b> 탭</span>
              </div>
              <Image
                  width={310} height={80}
                  src={isChrome ? "/Image1.png" : "/Image4.png"}
                  alt="Step 1"/>
            </div>

            {/* Card 2 */}
            <div
                className="bg-[#ffffff] rounded-[20px] p-5 flex flex-col gap-3 items-center justify-start self-stretch shrink-0 relative"
                style={{
                  boxShadow: "0px 0px 2px 0px rgba(79, 94, 113, 0.12), 0px 2px 4px 0px rgba(79, 94, 113, 0.11), 0px 4px 8px 0px rgba(79, 94, 113, 0.1)"
                }}
            >
              <div className="flex flex-row gap-2 items-center justify-start self-stretch shrink-0 relative">
                <div
                    className="bg-theme-product-light rounded-[99px] p-2.5 flex flex-col gap-2.5 items-center justify-center shrink-0 w-7 h-7 relative">
                  <div
                      className="text-theme-product-normal text-center font-text-normal-bold-1420-font-family text-text-normal-bold-1420-font-size leading-text-normal-bold-1420-line-height font-text-normal-bold-1420-font-weight relative self-stretch flex items-start justify-start">
                    2
                  </div>
                </div>
                <span className="title-span"><b>홈화면에 추가</b> 선택 </span>
              </div>
              <Image
                  width={310} height={80}
                  src="/Image2.png"
                  alt="Step 1"/>
            </div>

            {/* Card 3 */}
            <div
                className="bg-[#ffffff] rounded-[20px] p-5 flex flex-col gap-3 items-center justify-start self-stretch shrink-0 relative"
                style={{
                  boxShadow: "0px 0px 2px 0px rgba(79, 94, 113, 0.12), 0px 2px 4px 0px rgba(79, 94, 113, 0.11), 0px 4px 8px 0px rgba(79, 94, 113, 0.1)"
                }}
            >
              <div className="flex flex-row gap-2 items-center justify-start self-stretch shrink-0 relative">
                <div
                    className="bg-theme-product-normal rounded-[99px] p-2.5 flex flex-col gap-2.5 items-center justify-center shrink-0 w-7 h-7 relative">
                  <div
                      className="text-theme-white text-center font-text-normal-bold-1420-font-family text-text-normal-bold-1420-font-size leading-text-normal-bold-1420-line-height font-text-normal-bold-1420-font-weight relative self-stretch flex items-center justify-center">
                    3
                  </div>
                </div>
                <span className="title-span">추가된 <b>앱 실행</b></span>
              </div>
              <Image
                  width={310} height={92}
                  src="/Image3.png"
                  alt="Step 1"/>
              {/* iPhone Preview */}
            </div>
          </div>
        </div>
      </div>
  )
}