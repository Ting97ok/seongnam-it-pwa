'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import {sendNotification, subscribeUser} from '../actions'
import {api} from "@/lib/axios";

type UserType = {
  key: string
  value: string
}

type JobGroup = {
  key: string
  value: string
}

type JobPosition = {
  key: string
  value: string
  group: string
}

type YearOfExperience = {
  key: number | ''
  value: string
}

const USER_TYPES: UserType[] = [
  { key: '', value: '선택' },
  { key: 'STUDENT', value: '학생' },
  { key: 'WORKER', value: '직장인' },
  { key: 'FREELANCER', value: '프리랜서' },
  { key: 'JOB_SEEKER', value: '취준생' },
  { key: 'OTHER', value: '기타' }
]

const JOB_GROUPS: JobGroup[] = [
  { key: '', value: '선택' },
  { key: 'DEVELOPMENT', value: '개발' },
  { key: 'DESIGN', value: '디자인' },
  { key: 'PLANNING', value: '기획' },
  { key: 'MARKETING', value: '마케팅' },
  { key: 'ETC', value: '기타' }
]

const JOB_POSITIONS: JobPosition[] = [
  // 개발 직군
  { key: '', value: '선택', group: '' },
  { key: 'FRONT_END_DEVELOPER', value: '프론트엔드 개발자', group: 'DEVELOPMENT' },
  { key: 'BACK_END_DEVELOPER', value: '서버/백엔드 개발자', group: 'DEVELOPMENT' },
  { key: 'FULL_STACK_DEVELOPER', value: '풀스택 개발자', group: 'DEVELOPMENT' },
  { key: 'SOFTWARE_ENGINEER', value: '소프트웨어 엔지니어', group: 'DEVELOPMENT' },
  { key: 'IOS_DEVELOPER', value: 'iOS 개발자', group: 'DEVELOPMENT' },
  { key: 'ANDROID_DEVELOPER', value: 'Android 개발자', group: 'DEVELOPMENT' },
  { key: 'DEV_OPS_ENGINEER', value: 'DevOps 엔지니어', group: 'DEVELOPMENT' },
  { key: 'SECURITY_ENGINEER', value: '보안 엔지니어', group: 'DEVELOPMENT' },
  { key: 'BLOCKCHAIN_DEVELOPER', value: '블록체인 개발자', group: 'DEVELOPMENT' },
  { key: 'MACHINE_LEARNING_AI_ENGINEER', value: '머신러닝/AI 엔지니어', group: 'DEVELOPMENT' },
  { key: 'DATA_ENGINEER', value: '데이터 엔지니어', group: 'DEVELOPMENT' },
  { key: 'QA_ENGINEER', value: 'QA 엔지니어', group: 'DEVELOPMENT' },
  { key: 'HW_EMBEDDED_DEVELOPER', value: 'HW/임베디드 개발자', group: 'DEVELOPMENT' },
  { key: 'GAME_DEVELOPER', value: '게임 개발자', group: 'DEVELOPMENT' },
  { key: 'INFRA_ENGINEER', value: '인프라 엔지니어', group: 'DEVELOPMENT' },
  { key: 'ARCHITECTURE_ENGINEER', value: '아키텍처 엔지니어', group: 'DEVELOPMENT' },
  { key: 'ETC_DEVELOPER', value: '기타', group: 'DEVELOPMENT' },

  // 디자인 직군
  { key: 'PRODUCT_DESIGNER', value: '프로덕트 디자이너', group: 'DESIGN' },
  { key: 'WEB_DESIGNER', value: '웹 디자이너', group: 'DESIGN' },
  { key: 'UI_GUI_DESIGNER', value: 'UI/GUI 디자이너', group: 'DESIGN' },
  { key: 'UX_DESIGNER', value: 'UX 디자이너', group: 'DESIGN' },
  { key: 'BI_BX_DESIGNER', value: 'BI/BX 디자이너', group: 'DESIGN' },
  { key: 'ETC_DESIGNER', value: '기타', group: 'DESIGN' },

  // 기획 직군
  { key: 'SERVICE_PLANNER', value: '서비스 기획자', group: 'PLANNING' },
  { key: 'PM_PO_PLANNER', value: 'PM/PO', group: 'PLANNING' },
  { key: 'PRODUCT_PLANNER', value: '상품 기획자/MD', group: 'PLANNING' },
  { key: 'ETC_PLANNER', value: '기타', group: 'PLANNING' },

  // 마케팅 직군
  { key: 'DIGITAL_MARKETER', value: '디지털 마케터', group: 'MARKETING' },
  { key: 'CONTENT_MARKETER', value: '콘텐츠 마케터', group: 'MARKETING' },
  { key: 'PERFORMANCE_MARKETER', value: '퍼포먼스 마케터', group: 'MARKETING' },

  // 기타 직군
  { key: 'ETC', value: '기타', group: 'ETC' }
]

const YEARS_OF_EXPERIENCE: YearOfExperience[] = [
  { key: '', value: '선택' },
  { key: 0, value: '0년차' },
  { key: 1, value: '1년차' },
  { key: 2, value: '2년차' },
  { key: 3, value: '3년차' },
  { key: 4, value: '4년차' },
  { key: 5, value: '5년차' },
  { key: 6, value: '6년차' },
  { key: 7, value: '7년차' },
  { key: 8, value: '8년차' },
  { key: 9, value: '9년차' },
  { key: 10, value: '10년차 이상' }
]

type PushSubscriptionData = {
  endpoint: string
  expirationTime: number | null
  keys: {
    p256dh: string
    auth: string
  }
}

const getPositionsByGroup = (group: string): JobPosition[] => {
  return JOB_POSITIONS.filter(position => position.group === group)
}

export default function Page() {
  const [introduction, setIntroduction] = useState('')
  const [affiliation, setAffiliation] = useState(USER_TYPES[0].key)
  const [jobGroup, setJobGroup] = useState(JOB_GROUPS[0].key)
  const [jobTitle, setJobTitle] = useState('')
  const [experience, setExperience] = useState(YEARS_OF_EXPERIENCE[0].key)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [availablePositions, setAvailablePositions] = useState(getPositionsByGroup(JOB_GROUPS[0].key))

  useEffect(() => {
    const positions = getPositionsByGroup(jobGroup)
    setAvailablePositions(positions)
    if (positions.length > 0) {
      setJobTitle(positions[0].key)
    }
  }, [jobGroup])

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })
      const sub = await registration.pushManager.getSubscription()
    } catch (error) {
      console.error('Service worker registration failed:', error)
    }
  }

  async function subscribeToPush() {
    try {
      if (!name.trim()) {
        alert('이름을 입력해주세요.');
        return;
      }
      if (!location.trim()) {
        alert('지역을 입력해주세요.');
        return;
      }
      if (!affiliation) {
        alert('소속을 선택해주세요.');
        return;
      }
      if (!jobGroup) {
        alert('직군을 선택해주세요.');
        return;
      }
      if (!jobTitle) {
        alert('직무를 선택해주세요.');
        return;
      }
      if (experience === null || experience === undefined) {
        alert('경력을 선택해주세요.');
        return;
      }

      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        alert('알림을 허용해주세요!')
        return
      }
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      })
      // subscription JSON 가져오기
      const subJson = sub.toJSON()
      // subJson이 필요한 키를 가지고 있는지 확인
      if (!subJson.keys?.p256dh || !subJson.keys?.auth) {
        alert('Invalid subscription keys')
        throw new Error('Invalid subscription keys')
      }

      await api.post('/api/user/sign-up', {
        name,
        location,
        userType: affiliation,
        jobGroup,
        jobPosition: jobTitle,
        yearsOfExperience: experience,
        description: introduction,
        endpoint: sub.endpoint,
        expirationTime: sub.expirationTime ? new Date(sub.expirationTime).getTime() : null,
        p256dh: subJson.keys.p256dh,
        auth: subJson.keys.auth
      }).then(() => {
        alert('가입이 완료되었습니다!')
      })
      // PushSubscription을 일반 객체로 변환
      const subscriptionData: PushSubscriptionData = {
        endpoint: sub.endpoint,
        expirationTime: sub.expirationTime,
        keys: {
          p256dh: subJson.keys.p256dh,
          auth: subJson.keys.auth
        }
      }

      // 서버에 전송
      await subscribeUser(subscriptionData)
      sendTestNotification()
    } catch (error) {
      console.error('Failed to subscribe:', error)
    }
  }

  async function sendTestNotification() {
    try {
      await sendNotification(`${name}님, 환영합니다!`)
    } catch (error) {
      console.error('Failed to send notification:', error)
    }
  }

  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[375px] mx-auto">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-8">회원님 정보를 알려주세요</h1>

              <div className="flex flex-col gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-1">
                  <label className="px-0.5 flex items-center gap-2.5">
                    <span className="font-medium text-sm">이름</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-gray-200 rounded-md px-3 h-11 text-gray-900"
                      placeholder="이름을 입력해주세요"
                  />
                </div>

                {/* Region Field */}
                <div className="flex flex-col gap-1">
                  <label className="px-0.5 flex items-center gap-2.5">
                    <span className="font-medium text-sm">지역</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="border border-gray-200 rounded-md px-3 h-11 text-gray-900"
                      placeholder="지역을 입력해주세요"
                  />
                </div>

                {/* Affiliation Field */}
                <div className="flex flex-col gap-1">
                  <label className="px-0.5 flex items-center gap-2.5">
                    <span className="font-medium text-sm">소속</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                        value={affiliation}
                        onChange={(e) => setAffiliation(e.target.value)}
                        className="w-full border border-gray-200 rounded-md p-3 h-11 bg-white appearance-none pr-10"
                    >
                      {USER_TYPES.map((type) => (
                          <option key={type.key} value={type.key}>{type.value}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image src="/chevron_down.png" alt="select" width={24} height={24}/>
                    </div>
                  </div>
                </div>

                {/* Job Group Field */}
                <div className="flex flex-col gap-1">
                  <label className="px-0.5 flex items-center gap-2.5">
                    <span className="font-medium text-sm">직군</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                        value={jobGroup}
                        onChange={(e) => setJobGroup(e.target.value)}
                        className="w-full border border-gray-200 rounded-md p-3 h-11 bg-white appearance-none pr-10"
                    >
                      {JOB_GROUPS.map((group) => (
                          <option key={group.key} value={group.key}>{group.value}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image src="/chevron_down.png" alt="select" width={24} height={24}/>
                    </div>
                  </div>
                </div>

                {/* Job Title Field */}
                <div className="flex flex-col gap-1">
                  <label className="px-0.5 flex items-center gap-2.5">
                    <span className="font-medium text-sm">직무</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full border border-gray-200 rounded-md p-3 h-11 bg-white appearance-none pr-10"
                    >
                      {availablePositions.map((position) => (
                          <option key={position.key} value={position.key}>{position.value}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image src="/chevron_down.png" alt="select" width={24} height={24}/>
                    </div>
                  </div>
                </div>
                {/* Experience Field */}
                <div className="flex flex-col gap-1">
                  <label className="px-0.5 flex items-center gap-2.5">
                    <span className="font-medium text-sm">총 경력</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                        value={experience}
                        onChange={(e) => setExperience(Number(e.target.value))}
                        className="w-full border border-gray-200 rounded-md p-3 h-11 bg-white appearance-none pr-10"
                    >
                      {YEARS_OF_EXPERIENCE.map((year) => (
                          <option key={year.key} value={year.key}>{year.value}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Image src="/chevron_down.png" alt="select" width={24} height={24}/>
                    </div>
                  </div>
                </div>

                {/* Introduction Field */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center px-0.5">
                    <span className="font-medium text-sm">소개</span>
                    <span className="text-gray-500 text-sm">{introduction.length}/150</span>
                  </div>
                  <textarea
                      value={introduction}
                      onChange={(e) => setIntroduction(e.target.value)}
                      className="border border-gray-200 rounded-md p-3 h-[116px] resize-none"
                      maxLength={150}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="sticky bottom-0 w-full bg-white border-t border-gray-200">
          <div className="max-w-[375px] mx-auto p-4 bg-gradient-to-b from-transparent via-white to-white">
            <button
                onClick={subscribeToPush}
                className="w-full bg-blue-500 text-white rounded-md py-3.5 px-6 text-base font-medium">
              알림 활성화
            </button>
          </div>
        </div>
      </div>
  )
}