'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Home() {
  const [nickname, setNickname] = useState('')
  const [pushToken, setPushToken] = useState('')
  const [permission, setPermission] = useState('default')

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('이 브라우저는 알림을 지원하지 않습니다.')
      return
    }

    try {
      const permission = await Notification.requestPermission()
      setPermission(permission)

      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY' // 실제 키로 교체 필요
        })

        setPushToken(JSON.stringify(subscription))
      }
    } catch (error) {
      console.error('알림 권한 요청 실패:', error)
    }
  }

  const sendTestNotification = () => {
    if (!nickname) {
      alert('닉네임을 입력해주세요.')
      return
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('성남 IT 정보 교류 스터디', {
        body: `환영합니다 ${nickname} 님!`,
        icon: '/icon512_rounded.png'
      })
    }
  }

  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">성남 IT 정보 교류 스터디</h1>
            <p className="text-gray-600 mt-2">PWA 테스트 애플리케이션</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">닉네임 / 분야 / 지역</Label>
              <Input
                  id="nickname"
                  placeholder="예: 최대현 / 백엔드 / 은행동"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {permission !== 'granted' && (
                  <Button
                      className="w-full"
                      onClick={requestNotificationPermission}
                  >
                    알림 권한 요청
                  </Button>
              )}

              <Button
                  className="w-full"
                  onClick={sendTestNotification}
                  disabled={!nickname || permission !== 'granted'}
              >
                테스트 알림 보내기
              </Button>
            </div>
          </div>

          {pushToken && (
              <div className="mt-4">
                <Label>푸시 토큰</Label>
                <div className="mt-2 p-2 bg-gray-100 rounded text-sm break-all">
                  {pushToken}
                </div>
              </div>
          )}
        </div>
      </main>
  )
}